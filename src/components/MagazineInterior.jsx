import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * MagazineInterior
 *
 * On open: cover shown in portrait → pickup animation (620ms) → book expands + 3D flip to spread 1
 * Keyboard: ArrowLeft / ArrowRight to flip, Esc to close
 * Dots: clickable to jump to any spread
 * Touch: swipe left/right to flip
 * Hint: "click to turn page" on first visit, first spread
 * a11y: aria-live, aria-label, aria-current on dots
 */
export default function MagazineInterior({ cover, onClose, playPageTurn }) {
  const pages = cover.interiorPages || []

  // 'cover' → auto-advance to 'open' → 'closing'
  const [phase,      setPhase]      = useState('cover')
  const [pageIndex,  setPageIndex]  = useState(0)
  const [displayIdx, setDisplayIdx] = useState(0)
  const [flipAnim,   setFlipAnim]   = useState(null)  // enter phase class
  const [exitDir,    setExitDir]    = useState(null)  // 'forward'|'backward'|null
  const [liveMsg,    setLiveMsg]    = useState('')
  const [showHint,   setShowHint]   = useState(
    () => pages.length > 1 && !localStorage.getItem('seenFlipHint')
  )
  const animLock    = useRef(false)
  const touchStartX = useRef(null)
  const [hoveredEdge, setHoveredEdge] = useState(null) // null | 'left' | 'right'

  // Pickup animation plays (bookZoomIn, 0.5s), then at 620ms expand + flip
  useEffect(() => {
    const t = setTimeout(() => setPhase('open'), 620)
    return () => clearTimeout(t)
  }, [])

  /* ── Close ── */
  const handleClose = useCallback(() => {
    if (phase === 'closing') return
    setPhase('closing')
    setTimeout(onClose, 550)
  }, [phase, onClose])

  /* ── Dismiss hint ── */
  const dismissHint = useCallback(() => {
    if (!showHint) return
    setShowHint(false)
    localStorage.setItem('seenFlipHint', '1')
  }, [showHint])

  /* ── Core flip logic ── */
  const doFlip = useCallback((fromIdx, toIdx) => {
    if (animLock.current) return false
    if (toIdx < 0 || toIdx >= pages.length) return false
    dismissHint()
    animLock.current = true
    playPageTurn?.()
    const dir = toIdx > fromIdx ? 'forward' : 'backward'

    // Phase 1 (0–360ms): exit overlay peels the turning half of old content;
    // base stays on old content (displayIdx unchanged)
    setExitDir(dir)

    // Phase 2 (170ms): switch slightly before exit finishes to hide re-render gap
    setTimeout(() => {
      setExitDir(null)
      setDisplayIdx(toIdx)
      setPageIndex(toIdx)
      setLiveMsg(`Spread ${toIdx + 1} of ${pages.length}`)
      setFlipAnim(`enter-${dir}`)
    }, 170)

    // Phase 3 (370ms): done (170 + 200ms for enter)
    setTimeout(() => {
      setFlipAnim(null)
      animLock.current = false
    }, 370)
    return true
  }, [pages.length, playPageTurn, dismissHint])

  const flip = useCallback((dir) => {
    const next = dir === 'forward' ? pageIndex + 1 : pageIndex - 1
    doFlip(pageIndex, next)
  }, [pageIndex, doFlip])

  const jumpTo = useCallback((idx) => {
    if (idx === pageIndex) return
    doFlip(pageIndex, idx)
  }, [pageIndex, doFlip])

  /* ── Keyboard nav ── */
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

  /* ── Touch / swipe ── */
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 50 || phase !== 'open') return
    flip(dx < 0 ? 'forward' : 'backward')
  }

  /* ── Click half of page ── */
  const handlePageClick = (e) => {
    if (phase !== 'open') return
    const rect = e.currentTarget.getBoundingClientRect()
    flip((e.clientX - rect.left) > rect.width / 2 ? 'forward' : 'backward')
  }

  /* ── Edge hover detection ── */
  const handlePageMouseMove = (e) => {
    if (phase !== 'open') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    if (pct < 0.2) setHoveredEdge('left')
    else if (pct > 0.8) setHoveredEdge('right')
    else setHoveredEdge(null)
  }

  const handlePageMouseLeave = () => setHoveredEdge(null)

  const canPrev  = pageIndex > 0
  const canNext  = pageIndex < pages.length - 1
  // During the enter phase, base clips to the static half so the enter overlay can animate its half
  const baseClip = flipAnim
    ? (flipAnim === 'enter-forward' ? 'inset(0 0 0 50%)' : 'inset(0 50% 0 0)')
    : 'none'
  const isOpen   = phase === 'open' || phase === 'closing'

  return (
    <div className={`mag-overlay${phase === 'closing' ? ' mag-overlay--closing' : ''}`} onClick={handleClose} role="dialog" aria-modal="true" aria-label={`${cover.masthead} magazine`}>

      {/* aria-live region */}
      <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        {liveMsg}
      </div>

      {/* ── Book container ── */}
      <div
        className={`mag-book ${isOpen ? 'mag-book--open' : ''}${phase === 'closing' ? ' mag-book--closing' : ''}`}
        style={{ perspective: '2200px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── 3D flipper ── */}
        <div className={`mag-flipper ${phase === 'open' || phase === 'closing' ? 'mag-flipper--flipped' : ''}`}>

          {/* Front face — full-bleed cover (portrait, shown on open) */}
          <div className="mag-face mag-face--front" aria-hidden={phase === 'open'}>
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

          {/* Back face — interior spreads */}
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
                {/* Base layer: static half (old during exit, new during enter) */}
                <div
                  className="mag-page-content"
                  style={{ clipPath: baseClip }}
                >
                  {pages[displayIdx]}
                </div>

                {/* Exit overlay: old content, only the turning half, animates away */}
                {exitDir && (
                  <div
                    className={`mag-page-content page-flip-exit-${exitDir}`}
                    style={{ position: 'absolute', inset: 0, zIndex: 6 }}
                  >
                    {pages[displayIdx]}
                  </div>
                )}

                {/* Enter overlay: new content, arriving half, animates in */}
                {flipAnim && (
                  <div
                    className={`mag-page-content page-flip-${flipAnim}`}
                    style={{ position: 'absolute', inset: 0, zIndex: 5 }}
                  >
                    {pages[displayIdx]}
                  </div>
                )}

                {/* Physical overlays */}
                <div className="mag-gutter"               aria-hidden="true" />
                <div className="mag-inner-shadow mag-inner-shadow--left"  aria-hidden="true" />
                <div className="mag-inner-shadow mag-inner-shadow--right" aria-hidden="true" />
                <div className="mag-top-glare"            aria-hidden="true" />

                {/* Nav chevrons — only visible when hovering the respective edge */}
                <div
                  className={`mag-nav-hint mag-nav-hint--left${canPrev && phase === 'open' && hoveredEdge === 'left' ? ' mag-nav-hint--visible' : ''}`}
                  aria-hidden="true"
                >
                  <span className="mag-nav-arrow">‹</span>
                </div>
                <div
                  className={`mag-nav-hint mag-nav-hint--right${canNext && phase === 'open' && hoveredEdge === 'right' ? ' mag-nav-hint--visible' : ''}`}
                  aria-hidden="true"
                >
                  <span className="mag-nav-arrow">›</span>
                </div>

                {/* First-visit flip hint */}
                {showHint && pageIndex === 0 && phase === 'open' && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: '28px',
                      right: '20px',
                      fontFamily: "'EB Garamond', serif",
                      fontStyle: 'italic',
                      fontSize: '10px',
                      color: 'rgba(90,70,50,0.65)',
                      letterSpacing: '0.08em',
                      animation: 'flipHintFade 3.5s ease forwards',
                      pointerEvents: 'none',
                      zIndex: 13,
                    }}
                  >
                    click to turn page →
                  </div>
                )}

                {/* Page dots — clickable */}
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

        {/* UI chrome — only when fully open */}
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

      {/* Keyboard + navigation hint */}
      {phase === 'open' && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'EB Garamond', serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.06em',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 9999,
            background: 'rgba(0,0,0,0.52)',
            backdropFilter: 'blur(6px)',
            borderRadius: '20px',
            padding: '7px 18px',
            maxWidth: 'calc(100vw - 40px)',
            boxSizing: 'border-box',
          }}
        >
          ← → to flip &nbsp;·&nbsp; click edges &nbsp;·&nbsp; Esc to close
        </div>
      )}
    </div>
  )
}
