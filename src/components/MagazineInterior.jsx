import { useState, useEffect, useRef, useCallback } from 'react'

export default function MagazineInterior({ cover, onClose, playPageTurn }) {
  const pages = cover.interiorPages || []

  const [phase,       setPhase]       = useState('cover')
  const [pageIndex,   setPageIndex]   = useState(0)
  const [displayIdx,  setDisplayIdx]  = useState(0)
  const [flipAnim,    setFlipAnim]    = useState(null)
  const [exitDir,     setExitDir]     = useState(null)
  const [liveMsg,     setLiveMsg]     = useState('')
  const [showHint,    setShowHint]    = useState(
    () => pages.length > 1 && !localStorage.getItem('seenFlipHint')
  )
  const [hoveredEdge, setHoveredEdge] = useState(null)
  const animLock    = useRef(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setPhase('open'), 620)
    return () => clearTimeout(t)
  }, [])

  const handleClose = useCallback(() => {
    if (phase === 'closing') return
    setPhase('closing')
    setTimeout(onClose, 550)
  }, [phase, onClose])

  const dismissHint = useCallback(() => {
    if (!showHint) return
    setShowHint(false)
    localStorage.setItem('seenFlipHint', '1')
  }, [showHint])

  const doFlip = useCallback((fromIdx, toIdx) => {
    if (animLock.current) return false
    if (toIdx < 0 || toIdx >= pages.length) return false
    dismissHint()
    animLock.current = true
    playPageTurn?.()
    const dir = toIdx > fromIdx ? 'forward' : 'backward'
    setExitDir(dir)
    setTimeout(() => {
      setExitDir(null)
      setDisplayIdx(toIdx)
      setPageIndex(toIdx)
      setLiveMsg(`Spread ${toIdx + 1} of ${pages.length}`)
      setFlipAnim(`enter-${dir}`)
    }, 170)
    setTimeout(() => {
      setFlipAnim(null)
      animLock.current = false
    }, 370)
    return true
  }, [pages.length, playPageTurn, dismissHint])

  const flip = useCallback((dir) => {
    doFlip(pageIndex, dir === 'forward' ? pageIndex + 1 : pageIndex - 1)
  }, [pageIndex, doFlip])

  const jumpTo = useCallback((idx) => {
    if (idx === pageIndex) return
    doFlip(pageIndex, idx)
  }, [pageIndex, doFlip])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { handleClose(); return }
      if (phase !== 'open') return
      if (e.key === 'ArrowRight') flip('forward')
      else if (e.key === 'ArrowLeft') flip('backward')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, flip, handleClose])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40 || phase !== 'open') return
    flip(dx < 0 ? 'forward' : 'backward')
  }

  const handlePageClick = (e) => {
    if (phase !== 'open') return
    const rect = e.currentTarget.getBoundingClientRect()
    flip((e.clientX - rect.left) > rect.width / 2 ? 'forward' : 'backward')
  }

  const handlePageMouseMove = (e) => {
    if (phase !== 'open') return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    if (pct < 0.2) setHoveredEdge('left')
    else if (pct > 0.8) setHoveredEdge('right')
    else setHoveredEdge(null)
  }
  const handlePageMouseLeave = () => setHoveredEdge(null)

  const canPrev  = pageIndex > 0
  const canNext  = pageIndex < pages.length - 1
  const baseClip = flipAnim
    ? (flipAnim === 'enter-forward' ? 'inset(0 0 0 50%)' : 'inset(0 50% 0 0)')
    : 'none'
  const isOpen = phase === 'open' || phase === 'closing'

  return (
    <div
      className={`mag-overlay${phase === 'closing' ? ' mag-overlay--closing' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cover.masthead} magazine`}
    >
      <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        {liveMsg}
      </div>

      <div
        className={`mag-book ${isOpen ? 'mag-book--open' : ''}${phase === 'closing' ? ' mag-book--closing' : ''}`}
        style={{ perspective: '2200px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className={`mag-flipper ${phase === 'open' || phase === 'closing' ? 'mag-flipper--flipped' : ''}`}>

          <div className="mag-face mag-face--front" aria-hidden={phase === 'open'} style={{ opacity: isOpen ? 0 : 1, transition: 'opacity 0s' }}>
            <img
              src={cover.photo}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: cover.objectPosition, display: 'block' }}
            />
            <div className="card-gradient" />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              padding: '14px 16px 0',
              fontFamily: "'VogueTTF', serif",
              fontSize: 'clamp(26px, 5vw, 52px)',
              color: '#fff',
              letterSpacing: '0.04em',
              lineHeight: 0.9,
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
              textAlign: 'center',
            }}>{cover.masthead}</div>
            <div className="card-issue">{cover.issue}</div>
          </div>

          <div className="mag-face mag-face--back">
            {pages.length > 0 ? (
              <div
                className="mag-page-area"
                onClick={handlePageClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseMove={handlePageMouseMove}
                onMouseLeave={handlePageMouseLeave}
                style={{ cursor: phase === 'open' ? 'pointer' : 'default' }}
              >
                <div className="mag-page-content" style={{ clipPath: baseClip, backfaceVisibility: 'hidden' }}>
                  {pages[displayIdx]}
                </div>

                {exitDir && (
                  <div className={`mag-page-content page-flip-exit-${exitDir}`} style={{ position: 'absolute', inset: 0, zIndex: 6, backfaceVisibility: 'hidden' }}>
                    {pages[displayIdx]}
                  </div>
                )}

                {flipAnim && (
                  <div className={`mag-page-content page-flip-${flipAnim}`} style={{ position: 'absolute', inset: 0, zIndex: 5, backfaceVisibility: 'hidden' }}>
                    {pages[displayIdx]}
                  </div>
                )}

                <div className="mag-gutter"                             aria-hidden="true" />
                <div className="mag-inner-shadow mag-inner-shadow--left"  aria-hidden="true" />
                <div className="mag-inner-shadow mag-inner-shadow--right" aria-hidden="true" />
                <div className="mag-top-glare"                         aria-hidden="true" />

                <div className={`mag-nav-hint mag-nav-hint--left${canPrev && phase === 'open' && hoveredEdge === 'left' ? ' mag-nav-hint--visible' : ''}`} aria-hidden="true">
                  <span className="mag-nav-arrow">‹</span>
                </div>
                <div className={`mag-nav-hint mag-nav-hint--right${canNext && phase === 'open' && hoveredEdge === 'right' ? ' mag-nav-hint--visible' : ''}`} aria-hidden="true">
                  <span className="mag-nav-arrow">›</span>
                </div>

                {showHint && pageIndex === 0 && phase === 'open' && (
                  <div aria-hidden="true" style={{
                    position: 'absolute', bottom: '28px', right: '20px',
                    fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
                    fontSize: '10px', color: 'rgba(90,70,50,0.65)',
                    letterSpacing: '0.08em', animation: 'flipHintFade 3.5s ease forwards',
                    pointerEvents: 'none', zIndex: 13,
                  }}>
                    swipe or click to turn page →
                  </div>
                )}

                <div className="mag-page-dots" role="tablist" aria-label="Navigate spreads">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      className={`mag-page-dot${i === pageIndex ? ' mag-page-dot--active' : ''}`}
                      onClick={e => { e.stopPropagation(); jumpTo(i) }}
                      aria-label={`Spread ${i + 1} of ${pages.length}`}
                      aria-current={i === pageIndex ? 'true' : undefined}
                      style={{ cursor: 'pointer', border: 'none', padding: 0, borderRadius: '50%', background: 'transparent' }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mag-coming-soon"><p>Coming soon.</p></div>
            )}
          </div>
        </div>

        {phase === 'open' && (
          <>
            <button className="mag-back-btn" onClick={handleClose} aria-label="Back to covers">
              ← back to covers
            </button>
            <div className="mag-issue-label" aria-hidden="true">
              {cover.masthead} &nbsp;·&nbsp; {cover.issue}
            </div>
          </>
        )}
      </div>

      {phase === 'open' && (
        <div aria-hidden="true" style={{
          position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)',
          fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
          fontSize: '13px', color: 'rgba(255,255,255,0.9)',
          letterSpacing: '0.06em', textAlign: 'center',
          pointerEvents: 'none', zIndex: 9999,
          background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(6px)',
          borderRadius: '20px', padding: '7px 18px',
          maxWidth: 'calc(100vw - 40px)', boxSizing: 'border-box',
          whiteSpace: 'nowrap',
        }}>
          {window.innerWidth <= 767
            ? 'swipe · tap edges · scroll to read'
            : 'swipe · tap edges · Esc to close'
          }
        </div>
      )}
    </div>
  )
}
