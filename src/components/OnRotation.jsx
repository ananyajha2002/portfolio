import { useState, useEffect, useRef } from 'react'

/* ── Movie data ───────────────────────────────────────── */
const MOVIES = [
  { title: 'The Intern',                      year: 2015, palette: ['#d8c19a','#3a2e22','#7a5d3e'],  poster: '/assets/the intern.jpg',                        posterPosition: 'center 25%' },
  { title: '17 Again',                        year: 2009, palette: ['#c4d4e8','#1a2a3a','#e8c4a0'],  poster: '/assets/17 again.jpg' },
  { title: 'Catch Me If You Can',             year: 2002, palette: ['#e8d4a0','#1a1a2e','#c43030'],  poster: '/assets/catch me if u can.jpg' },
  { title: 'Chak De India',                   year: 2007, palette: ['#e8a020','#1a3a1a','#ffffff'],  poster: '/assets/chak de india.jpg' },
  { title: 'Crazy Stupid Love',               year: 2011, palette: ['#1a1a1a','#c4a882','#e8d4c0'],  poster: '/assets/crazy stupid love.jpg' },
  { title: 'Good Will Hunting',               year: 1997, palette: ['#2d4a2d','#c4a06a','#1a1a1a'],  poster: '/assets/good will hunting.jpg' },
  { title: 'How to Lose a Guy in 10 Days',   year: 2003, palette: ['#f9d4e8','#c4176e','#f5f5f5'],  poster: '/assets/how to lose a guy in 10 days.jpeg' },
  { title: 'Kabhi Khushi Kabhie Gham',        year: 2001, palette: ['#d4af37','#1a0a2e','#c4956a'],  poster: '/assets/k3g.jpg' },
  { title: 'The Perks of Being a Wallflower', year: 2012, palette: ['#1a2a4a','#c4d4e8','#e8c4a0'],  poster: '/assets/perks of being a wallflower.webp' },
  { title: 'Philadelphia',                    year: 1993, palette: ['#1a1a1a','#c4c4c4','#3a3a3a'],  poster: '/assets/philadelphia.jpeg' },
  { title: 'The Social Network',              year: 2010, palette: ['#0a0a1a','#3a5a8a','#c4d4e8'],  poster: '/assets/the social network.jpg' },
  { title: 'Up',                              year: 2009, palette: ['#87ceeb','#e8c43a','#c43030'],  poster: '/assets/up.jpg' },
  { title: 'Wonder',                          year: 2017, palette: ['#87ceeb','#c4e8f0','#1a3a4a'],  poster: '/assets/wonder.jpg' },
]

/* ── Generated poster art ────────────────────────────── */
function PosterArt({ data, index }) {
  const p = data.palette

  const textLayer = (
    <>
      <div style={{
        position: 'absolute', top: '8%', left: '8%',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11, color: '#fff', mixBlendMode: 'difference',
        letterSpacing: '0.3em',
      }}>{data.year}</div>
      <div style={{
        position: 'absolute', bottom: '10%', left: '8%', right: '8%',
        fontFamily: '"Playfair Display", serif', fontWeight: 900,
        fontSize: 'clamp(13px, 2.2vw, 22px)', color: '#fff',
        textTransform: 'uppercase', mixBlendMode: 'difference',
        lineHeight: 1.05, letterSpacing: '0.05em',
      }}>{data.title}</div>
    </>
  )

  if (data.poster) {
    return (
      <div className="poster-fade" style={{
        position: 'absolute', inset: 0,
        background: `#0a0a0a url("${data.poster}") ${data.posterPosition || 'center'}/cover no-repeat`,
      }} />
    )
  }

  const variant = index % 4

  if (variant === 0) return (
    <div className="poster-fade" style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 40% 60%, ${p[0]} 0%, ${p[1]} 55%, ${p[2]} 100%)`,
    }}>{textLayer}</div>
  )
  if (variant === 1) return (
    <div className="poster-fade" style={{
      position: 'absolute', inset: 0,
      background: `repeating-linear-gradient(45deg, ${p[0]} 0px, ${p[0]} 20px, ${p[1]} 20px, ${p[1]} 40px, ${p[2]} 40px, ${p[2]} 60px)`,
    }}>{textLayer}</div>
  )
  if (variant === 2) return (
    <div className="poster-fade" style={{ position: 'absolute', inset: 0, background: p[1] }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '55%', height: '60%', background: p[0] }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '45%', height: '50%', background: p[2] }} />
      {textLayer}
    </div>
  )
  return (
    <div className="poster-fade" style={{ position: 'absolute', inset: 0, background: p[0] }}>
      <div style={{ position: 'absolute', inset: '12px', border: `3px solid ${p[1]}` }} />
      <div style={{ position: 'absolute', inset: '20px', border: `1px solid ${p[1]}`, opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p[2]}66 0%, transparent 60%)` }} />
      {textLayer}
    </div>
  )
}

/* ── Movie ticket ─────────────────────────────────────── */
function MovieTicket({ title, year, channel, total }) {
  const seatNo     = String((title.charCodeAt(0) * 7 + (title.charCodeAt(1) || 0)) % 26 + 1).padStart(2, '0')
  const seatLetter = String.fromCharCode(65 + (title.length % 8))
  const ticketNo   = String((title.length * 1093 + year) % 999999).padStart(6, '0')

  const stamp = { fontFamily: '"Helvetica Neue", Arial, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#7a4a2a' }
  const statLabel = { ...stamp, fontSize: 8, letterSpacing: '0.28em', marginBottom: 2, display: 'block' }
  const statValue = { fontFamily: '"VT323", monospace', fontSize: 22, color: '#1a1714', letterSpacing: '0.04em', display: 'block' }

  const paperTexture = {
    position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
    background: `
      repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 4px),
      radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.28) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.06) 0%, transparent 50%)
    `,
  }

  return (
    <div style={{
      display: 'flex',
      transform: 'rotate(-1.5deg)',
      filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5)) drop-shadow(0 1px 3px rgba(0,0,0,0.3))',
      marginTop: 36,
    }}>
      {/* Main stub */}
      <div style={{
        position: 'relative', background: '#f5e6c8',
        padding: '22px 28px 22px 32px', minWidth: 320, color: '#1a1714',
        borderRadius: '4px 0 0 4px',
        WebkitMaskImage: 'radial-gradient(circle at right center, transparent 9px, #000 10px)',
        maskImage: 'radial-gradient(circle at right center, transparent 9px, #000 10px)',
      }}>
        <div style={paperTexture} />
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed rgba(26,23,20,0.4)', paddingBottom: 10, marginBottom: 12 }}>
          <span style={stamp}>Admit One</span>
          <span style={stamp}>Cinéma A.J.</span>
          <span style={stamp}>No. {ticketNo}</span>
        </div>
        {/* Title */}
        <div style={{
          fontFamily: '"Bebas Neue", "Oswald", "Helvetica Neue", Impact, sans-serif',
          fontSize: 36, fontWeight: 900, lineHeight: 0.95,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          color: '#1a1714', marginBottom: 4,
        }}>{title}</div>
        {/* Subtitle */}
        <div style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: 15, color: '#5a3f28', marginBottom: 14 }}>
          ({year}) · Feature
        </div>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 12, borderTop: '1px dashed rgba(26,23,20,0.4)', paddingTop: 10 }}>
          {[
            { label: 'Channel', value: `${String(channel).padStart(2,'0')}/${String(total).padStart(2,'0')}` },
            { label: 'Row',     value: seatLetter },
            { label: 'Seat',    value: seatNo },
            { label: 'Time',    value: '20:30' },
          ].map(({ label, value }) => (
            <div key={label}>
              <span style={statLabel}>{label}</span>
              <span style={statValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Perforation */}
      <div style={{ width: 0, borderLeft: '1.5px dashed rgba(26,23,20,0.4)', margin: '4px 0', flexShrink: 0 }} />

      {/* Tear-off stub */}
      <div style={{
        position: 'relative', background: '#f5e6c8',
        padding: '22px 18px', minWidth: 84,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
        borderRadius: '0 4px 4px 0',
        WebkitMaskImage: 'radial-gradient(circle at left center, transparent 9px, #000 10px)',
        maskImage: 'radial-gradient(circle at left center, transparent 9px, #000 10px)',
      }}>
        <div style={paperTexture} />
        <div style={{ ...stamp, fontSize: 7, letterSpacing: '0.28em', textAlign: 'center' }}>On Rotation</div>
        <div style={{ fontFamily: '"Bebas Neue", Impact, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '0.06em', color: '#1a1714', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>Stub</div>
        <div style={{ fontFamily: '"VT323", monospace', fontSize: 14, color: '#1a1714' }}>{ticketNo}</div>
      </div>
    </div>
  )
}

/* ── Remote button ────────────────────────────────────── */
function RemBtn({ style, onClick, children }) {
  return (
    <button
      onMouseDown={e => { e.currentTarget.style.filter = 'brightness(0.65)' }}
      onMouseUp={e => { e.currentTarget.style.filter = '' }}
      onMouseLeave={e => { e.currentTarget.style.filter = '' }}
      onClick={onClick}
      style={{
        border: 'none', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        userSelect: 'none', transition: 'filter 0.08s',
        fontFamily: '"JetBrains Mono", monospace',
        ...style,
      }}
    >{children}</button>
  )
}

/* ── Remote ───────────────────────────────────────────── */
function Remote({ onAction, on, idx }) {
  const dark = {
    background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
    borderRadius: 6,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 4px rgba(0,0,0,0.5)',
    color: 'rgba(255,255,255,0.85)', fontSize: 13,
    width: 36, height: 30,
  }
  const grey = {
    background: 'linear-gradient(180deg, #4a4a4a 0%, #2e2e2e 100%)',
    borderRadius: 6,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 4px rgba(0,0,0,0.5)',
    color: 'rgba(255,255,255,0.7)', fontSize: 10,
    letterSpacing: '0.1em', height: 26, flex: 1,
  }
  const transport = { ...dark, width: 26, height: 24, fontSize: 11 }
  const row = (children, gap = 6) => (
    <div style={{ display: 'flex', gap, justifyContent: 'center', alignItems: 'center' }}>{children}</div>
  )

  return (
    <div style={{
      width: 170, flexShrink: 0,
      background: 'linear-gradient(180deg, #2a2a2a 0%, #0d0d0d 100%)',
      borderRadius: 18, padding: 14,
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.08), 0 24px 48px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.5)',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {/* Brand */}
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, letterSpacing: '0.4em', color: '#5a5a5a', textAlign: 'center', textTransform: 'uppercase' }}>Remote</div>

      {/* Power */}
      {row(
        <RemBtn onClick={() => onAction('power')} style={{
          width: 36, height: 36, borderRadius: 18,
          background: 'linear-gradient(180deg, #c0392b 0%, #8b1a1a 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 3px 8px rgba(0,0,0,0.5)',
          color: '#fff', fontSize: 16,
        }}>⏻</RemBtn>
      )}

      {/* Number grid 1-9 */}
      {[0, 1, 2].map(rowIdx => (
        <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
          {[1, 2, 3].map(col => {
            const n = rowIdx * 3 + col
            return <RemBtn key={n} onClick={() => onAction(`num:${n}`)} style={{ ...dark, width: '100%' }}>{n}</RemBtn>
          })}
        </div>
      ))}
      {row(<RemBtn onClick={() => onAction('num:10')} style={{ ...dark, width: 36 }}>0</RemBtn>)}

      {/* DVR / INFO */}
      {row(<><RemBtn onClick={() => onAction('dvr')}  style={grey}>DVR</RemBtn><RemBtn onClick={() => onAction('info')} style={grey}>INFO</RemBtn></>)}
      {/* BACK / EXIT */}
      {row(<><RemBtn onClick={() => onAction('back')} style={grey}>BACK</RemBtn><RemBtn onClick={() => onAction('exit')} style={grey}>EXIT</RemBtn></>)}

      {/* D-pad */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 108, height: 108 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)', boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.6)' }} />
          <RemBtn onClick={() => onAction('up')}    style={{ position: 'absolute', top: 0,    left: '25%', width: '50%', height: '40%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>▲</RemBtn>
          <RemBtn onClick={() => onAction('down')}  style={{ position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '40%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>▼</RemBtn>
          <RemBtn onClick={() => onAction('left')}  style={{ position: 'absolute', left: 0,   top: '25%', width: '40%', height: '50%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>◀</RemBtn>
          <RemBtn onClick={() => onAction('right')} style={{ position: 'absolute', right: 0,  top: '25%', width: '40%', height: '50%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>▶</RemBtn>
          <RemBtn onClick={() => onAction('ok')} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(180deg, #4a4a4a 0%, #2e2e2e 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.85)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 11 }}>OK</RemBtn>
        </div>
      </div>

      {/* MENU / GUIDE */}
      {row(<><RemBtn onClick={() => onAction('menu')}  style={grey}>MENU</RemBtn><RemBtn onClick={() => onAction('guide')} style={grey}>GUIDE</RemBtn></>)}

      {/* VOL + CH */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {[{ label: 'VOL', up: 'vol+', dn: 'vol-' }, { label: 'CH', up: 'right', dn: 'left' }].map(({ label, up, dn }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <RemBtn onClick={() => onAction(up)} style={{ ...dark, width: 44, height: 22, fontSize: 11 }}>+</RemBtn>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: '#5a5a5a', letterSpacing: '0.2em' }}>{label}</div>
            <RemBtn onClick={() => onAction(dn)} style={{ ...dark, width: 44, height: 22, fontSize: 11 }}>-</RemBtn>
          </div>
        ))}
      </div>

      {/* Transport */}
      {row(<>
        <RemBtn onClick={() => onAction('rec')}   style={{ ...transport, background: 'linear-gradient(180deg,#c0392b 0%,#8b1a1a 100%)' }}>⏺</RemBtn>
        <RemBtn onClick={() => onAction('left')}  style={transport}>⏮</RemBtn>
        <RemBtn onClick={() => onAction('play')}  style={transport}>▶</RemBtn>
        <RemBtn onClick={() => onAction('pause')} style={transport}>⏸</RemBtn>
        <RemBtn onClick={() => onAction('right')} style={transport}>⏭</RemBtn>
        <RemBtn onClick={() => onAction('stop')}  style={transport}>⏹</RemBtn>
      </>, 3)}

      {/* Colour buttons */}
      {row(<>
        {[['#c0392b','RED'],['#27ae60','GRN'],['#f39c12','YEL'],['#2980b9','BLU']].map(([bg, lbl]) => (
          <RemBtn key={lbl} style={{ background: bg, borderRadius: 4, height: 18, flex: 1, fontSize: 6, letterSpacing: '0.1em', color: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>{lbl}</RemBtn>
        ))}
      </>, 3)}

      {/* Genre pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {['NEWS','KID','MOVIE','MUSIC','SPORT','DOC'].map((g, i) => (
          <RemBtn key={g} onClick={() => onAction(`num:${i + 1}`)} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 3, height: 15, padding: '0 4px', fontSize: 5, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}>{g}</RemBtn>
        ))}
      </div>

      {/* Status footer */}
      <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: 6, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"VT323", monospace', fontSize: 12, letterSpacing: '0.12em', color: on ? '#3aff7a' : '#3a1a1a' }}>{on ? '● MOVIES' : '○ MOVIES'}</span>
        <span style={{ fontFamily: '"VT323", monospace', fontSize: 12, letterSpacing: '0.12em', color: on ? '#3aff7a' : '#3a1a1a' }}>CH {String(idx + 1).padStart(2,'0')}/{String(MOVIES.length).padStart(2,'0')}</span>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────── */
export default function OnRotation() {
  const [on,    setOn]    = useState(true)
  const [idx,   setIdx]   = useState(0)
  const [trans, setTrans] = useState(false)
  const [focused, setFocused] = useState(false)
  const sectionRef = useRef(null)

  const current = MOVIES[idx]

  const flicker = () => { setTrans(true); setTimeout(() => setTrans(false), 220) }

  const handle = (action) => {
    if (action === 'power') { flicker(); setOn(o => !o); return }
    if (!on) { flicker(); setOn(true); return }
    if (action === 'left')  { flicker(); setIdx(i => (i - 1 + MOVIES.length) % MOVIES.length) }
    if (action === 'right') { flicker(); setIdx(i => (i + 1) % MOVIES.length) }
    if (action.startsWith('num:')) {
      const n = parseInt(action.slice(4), 10) - 1
      if (n >= 0 && n < MOVIES.length) { flicker(); setIdx(n) }
    }
  }

  /* Intersection observer — capture keyboard when section is ≥40% visible */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setFocused(entry.intersectionRatio >= 0.4),
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Keyboard shortcuts */
  useEffect(() => {
    if (!focused) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); flicker(); setIdx(i => (i - 1 + MOVIES.length) % MOVIES.length) }
      if (e.key === 'ArrowRight') { e.preventDefault(); flicker(); setIdx(i => (i + 1) % MOVIES.length) }
      if (e.key === 'p' || e.key === 'P') { flicker(); setOn(o => !o) }
      if (e.key >= '1' && e.key <= '9') {
        const n = parseInt(e.key, 10) - 1
        if (n < MOVIES.length) { flicker(); setIdx(n) }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [focused])

  const woodWall = {
    background: `
      repeating-linear-gradient(90deg,
        rgba(0,0,0,.18) 0 1px, transparent 1px 80px,
        rgba(0,0,0,.10) 80px 81px, transparent 81px 160px),
      repeating-linear-gradient(0deg,
        rgba(255,255,255,.02) 0 60px, rgba(0,0,0,.04) 60px 120px),
      linear-gradient(180deg, #6b4a2e 0%, #4a3220 50%, #3a2718 100%)
    `,
  }

  return (
    <>
      <section
        ref={sectionRef}
        data-screen-label="On Rotation"
        style={{ ...woodWall, padding: '60px 32px 80px', width: '100%', boxSizing: 'border-box' }}
      >
        {/* Title block */}
        <div style={{ textAlign: 'center', marginBottom: 32, color: '#e8d8b8' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: 'clamp(36px, 7vw, 56px)', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-.01em', color: '#e8d8b8' }}>
            On Rotation
          </h2>
          <div style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: 16, opacity: .75, color: '#e8d8b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            Use the remote, or your arrow keys.
            {focused && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3aff7a', display: 'inline-block', animation: 'onRotPulse 1.5s ease-in-out infinite' }} />
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.15em', fontStyle: 'normal' }}>Listening</span>
              </span>
            )}
          </div>
        </div>

        {/* TV + remote row */}
        <div style={{ display: 'flex', gap: 28, justifyContent: 'center', alignItems: 'flex-start', maxWidth: 960, margin: '0 auto', flexWrap: 'wrap' }}>
          {/* Left: TV + soundbar + ticket */}
          <div style={{ flex: 1, minWidth: 280, maxWidth: 720 }}>
            {/* TV bezel */}
            <div style={{
              position: 'relative', border: '6px solid #050505', borderRadius: 6,
              aspectRatio: '16/9', background: '#000', overflow: 'hidden',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,.9), 0 18px 48px rgba(0,0,0,.6), 0 4px 8px rgba(0,0,0,.3)',
            }}>
              {/* Poster */}
              {on && !trans && (
                <div key={`${current.title}-${idx}`} style={{ position: 'absolute', inset: 0 }}>
                  <PosterArt data={current} index={idx} />
                </div>
              )}

              {/* Scanlines */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.08) 2px 3px)', opacity: 0.55 }} />

              {/* Static / off overlay */}
              {(trans || !on) && (
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(200,200,200,0.18) 0%, rgba(80,80,80,0.07) 60%, transparent 100%)', mixBlendMode: 'screen', animation: 'onRotStatic 0.22s ease-out' }} />
              )}
              {!on && <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0.96 }} />}

              {/* LED */}
              <div style={{ position: 'absolute', bottom: 7, right: 7, width: 5, height: 5, borderRadius: '50%', background: on ? '#3aff7a' : '#1a3a1a', boxShadow: on ? '0 0 8px #3aff7a' : 'none', transition: 'all 0.4s' }} />
            </div>

            {/* Soundbar */}
            <div style={{ height: 14, background: '#1a1714', borderRadius: 2, width: '70%', margin: '10px auto 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 3px 8px rgba(0,0,0,0.5)' }} />

            {/* Ticket */}
            <MovieTicket title={current.title} year={current.year} channel={idx + 1} total={MOVIES.length} />
          </div>

          {/* Right: remote */}
          <Remote onAction={handle} on={on} idx={idx} />
        </div>
      </section>

      {/* Sign-off */}
      <section data-screen-label="Signature" style={{ position: 'relative', width: '100%', padding: '60px 32px 120px', textAlign: 'center', background: '#faf8f5', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: '#3a342c' }}>
          Yours truly,
        </div>
        <div style={{ marginTop: 8, fontFamily: '"Pinyon Script", "Allura", "Great Vibes", cursive', fontSize: 64, color: '#1a1714', lineHeight: 1 }}>
          Ananya
        </div>
      </section>
    </>
  )
}
