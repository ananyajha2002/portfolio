import { useState, useEffect, useRef } from 'react'

/* ── Movie data ───────────────────────────────────────── */
const MOVIES = [
  { title: 'The Intern',                      year: 2015, palette: ['#d8c19a','#3a2e22','#7a5d3e'],  poster: '/assets/the intern.jpg',                        posterPosition: 'center 20%' },
  { title: '17 Again',                        year: 2009, palette: ['#c4d4e8','#1a2a3a','#e8c4a0'],  poster: '/assets/17 again.jpg',                          posterPosition: 'center 70%' },
  { title: 'Catch Me If You Can',             year: 2002, palette: ['#e8d4a0','#1a1a2e','#c43030'],  poster: '/assets/catch me if u can.jpg',                  posterPosition: 'center 70%' },
  { title: 'Chak De India',                   year: 2007, palette: ['#e8a020','#1a3a1a','#ffffff'],  poster: '/assets/chak de india.jpg',                      posterPosition: 'center 70%' },
  { title: 'Crazy Stupid Love',               year: 2011, palette: ['#1a1a1a','#c4a882','#e8d4c0'],  poster: '/assets/crazy stupid love.jpg',                  posterPosition: 'center 50%' },
  { title: 'Good Will Hunting',               year: 1997, palette: ['#2d4a2d','#c4a06a','#1a1a1a'],  poster: '/assets/good will hunting.jpg',                  posterPosition: 'center 60%' },
  { title: 'How to Lose a Guy in 10 Days',   year: 2003, palette: ['#f9d4e8','#c4176e','#f5f5f5'],  poster: '/assets/how to lose a guy in 10 days.jpeg',      posterPosition: 'center 60%' },
  { title: 'Kabhi Khushi Kabhie Gham',        year: 2001, palette: ['#d4af37','#1a0a2e','#c4956a'],  poster: '/assets/k3g.jpg',                                posterPosition: 'center 50%' },
  { title: 'The Perks of Being a Wallflower', year: 2012, palette: ['#1a2a4a','#c4d4e8','#e8c4a0'],  poster: '/assets/perks of being a wallflower.webp',       posterPosition: 'center 60%' },
  { title: 'Philadelphia',                    year: 1993, palette: ['#1a1a1a','#c4c4c4','#3a3a3a'],  poster: '/assets/philadelphia.jpg',                       posterPosition: 'center 50%' },
  { title: 'The Social Network',              year: 2010, palette: ['#0a0a1a','#3a5a8a','#c4d4e8'],  poster: '/assets/the social network.jpg',                 posterPosition: 'center 50%' },
  { title: 'Up',                              year: 2009, palette: ['#87ceeb','#e8c43a','#c43030'],  poster: '/assets/up.jpg',                                 posterPosition: 'center 10%' },
  { title: 'Wonder',                          year: 2017, palette: ['#87ceeb','#c4e8f0','#1a3a4a'],  poster: '/assets/wonder.jpg',                             posterPosition: 'center 60%' },
]

/* ── Poster art ───────────────────────────────────────── */
function PosterArt({ data }) {
  if (data.poster) {
    return (
      <div className="poster-fade" style={{
        position: 'absolute', inset: 0,
        background: `#0a0a0a url("${data.poster}") ${data.posterPosition || 'center 65%'}/cover no-repeat`,
      }} />
    )
  }
  const p = data.palette
  return (
    <div className="poster-fade" style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 40% 60%, ${p[0]} 0%, ${p[1]} 55%, ${p[2]} 100%)`,
    }}>
      <div style={{ position: 'absolute', bottom: '10%', left: '8%', right: '8%', fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 'clamp(13px,2.2vw,22px)', color: '#fff', textTransform: 'uppercase', mixBlendMode: 'difference', lineHeight: 1.05, letterSpacing: '0.05em' }}>{data.title}</div>
    </div>
  )
}

/* ── Movie ticket ─────────────────────────────────────── */
function MovieTicket({ title, year, channel, total, compact }) {
  const seatNo     = String((title.charCodeAt(0) * 7 + (title.charCodeAt(1) || 0)) % 26 + 1).padStart(2, '0')
  const seatLetter = String.fromCharCode(65 + (title.length % 8))
  const ticketNo   = String((title.length * 1093 + year) % 999999).padStart(6, '0')

  /* Live clock */
  const fmt = () => {
    const n = new Date()
    return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`
  }
  const [liveTime, setLiveTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setLiveTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])

  const stamp     = { fontFamily: '"Helvetica Neue", Arial, sans-serif', fontWeight: 700, fontSize: compact ? 6 : 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#5a5a6e' }
  const statLabel = { ...stamp, fontSize: compact ? 5 : 8, letterSpacing: '0.28em', marginBottom: 2, display: 'block' }
  const statValue = { fontFamily: '"VT323", monospace', fontSize: compact ? 16 : 22, color: '#1a1a2a', letterSpacing: '0.04em', display: 'block' }

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
      marginTop: compact ? 14 : 36,
    }}>
      {/* Main stub */}
      <div style={{
        position: 'relative', background: '#eeeff4',
        padding: compact ? '12px 12px 12px 14px' : '22px 28px 22px 32px',
        minWidth: compact ? 0 : 320, color: '#1a1a2a',
        borderRadius: '4px 0 0 4px',
        WebkitMaskImage: 'radial-gradient(circle at right center, transparent 9px, #000 10px)',
        maskImage: 'radial-gradient(circle at right center, transparent 9px, #000 10px)',
      }}>
        <div style={paperTexture} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed rgba(80,80,120,0.3)', paddingBottom: compact ? 6 : 10, marginBottom: compact ? 7 : 12 }}>
          <span style={stamp}>Admit One</span>
          <span style={stamp}>Cinéma A.J.</span>
          <span style={stamp}>No. {ticketNo}</span>
        </div>
        <div style={{ fontFamily: '"Bebas Neue", "Oswald", Impact, sans-serif', fontSize: compact ? 20 : 36, fontWeight: 900, lineHeight: 0.95, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#1a1a2a', marginBottom: compact ? 2 : 4 }}>{title}</div>
        <div style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: compact ? 10 : 15, color: '#5a5a6e', marginBottom: compact ? 7 : 14 }}>({year}) · Feature</div>
        <div style={{ display: 'grid', gridTemplateColumns: compact ? 'repeat(2, auto)' : 'repeat(4, auto)', gap: compact ? 8 : 12, borderTop: '1px dashed rgba(80,80,120,0.3)', paddingTop: compact ? 6 : 10 }}>
          {[
            { label: 'Channel', value: `${String(channel).padStart(2,'0')}/${String(total).padStart(2,'0')}` },
            { label: 'Row',     value: seatLetter },
            { label: 'Seat',    value: seatNo },
            { label: 'Time',    value: liveTime },
          ].map(({ label, value }) => (
            <div key={label}>
              <span style={statLabel}>{label}</span>
              <span style={statValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Perforation */}
      <div style={{ width: 0, borderLeft: '1.5px dashed rgba(80,80,120,0.3)', margin: '4px 0', flexShrink: 0 }} />

      {/* Tear-off stub */}
      <div style={{
        position: 'relative', background: '#e8eaf0',
        padding: compact ? '12px 8px' : '22px 18px',
        minWidth: compact ? 40 : 84,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
        borderRadius: '0 4px 4px 0',
        WebkitMaskImage: 'radial-gradient(circle at left center, transparent 9px, #000 10px)',
        maskImage: 'radial-gradient(circle at left center, transparent 9px, #000 10px)',
      }}>
        <div style={paperTexture} />
        <div style={{ ...stamp, fontSize: compact ? 5 : 7, letterSpacing: '0.28em', textAlign: 'center' }}>On Rotation</div>
        <div style={{ fontFamily: '"Bebas Neue", Impact, sans-serif', fontWeight: 900, fontSize: compact ? 14 : 22, letterSpacing: '0.06em', color: '#1a1a2a', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>Stub</div>
        <div style={{ fontFamily: '"VT323", monospace', fontSize: compact ? 10 : 14, color: '#1a1a2a' }}>{ticketNo}</div>
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
function Remote({ onAction, on, idx, compact }) {
  const bw = compact ? 15 : 36
  const bh = compact ? 12 : 30
  const bf = compact ? 7  : 13
  const gh = compact ? 11 : 26
  const gf = compact ? 4  : 10
  const tw = compact ? 12 : 26
  const th = compact ? 10 : 24
  const tf = compact ? 5  : 11
  const dpadSize = compact ? 46 : 108
  const okSize   = compact ? 16 : 40
  const pwSize   = compact ? 16 : 36

  const dark = {
    background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)',
    borderRadius: 6,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 4px rgba(0,0,0,0.5)',
    color: 'rgba(255,255,255,0.85)', fontSize: bf, width: bw, height: bh,
  }
  const grey = {
    background: 'linear-gradient(180deg, #4a4a4a 0%, #2e2e2e 100%)',
    borderRadius: 6,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 4px rgba(0,0,0,0.5)',
    color: 'rgba(255,255,255,0.7)', fontSize: gf,
    letterSpacing: '0.1em', height: gh, flex: 1,
  }
  const transport = { ...dark, width: tw, height: th, fontSize: tf }
  const row = (children, gap = compact ? 4 : 6) => (
    <div style={{ display: 'flex', gap, justifyContent: 'center', alignItems: 'center' }}>{children}</div>
  )

  return (
    <div style={{
      width: compact ? 76 : 170, flexShrink: 0,
      background: 'linear-gradient(180deg, #2a2a2a 0%, #0d0d0d 100%)',
      borderRadius: compact ? 8 : 18,
      padding: compact ? 6 : 14,
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.08), 0 24px 48px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.5)',
      display: 'flex', flexDirection: 'column', gap: compact ? 3 : 8,
    }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: compact ? 5 : 7, letterSpacing: '0.4em', color: '#5a5a5a', textAlign: 'center', textTransform: 'uppercase' }}>Remote</div>

      {row(
        <RemBtn onClick={() => onAction('power')} style={{
          width: pwSize, height: pwSize, borderRadius: pwSize / 2,
          background: 'linear-gradient(180deg, #c0392b 0%, #8b1a1a 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 3px 8px rgba(0,0,0,0.5)',
          color: '#fff', fontSize: compact ? 11 : 16,
        }}>⏻</RemBtn>
      )}

      {[0, 1, 2].map(rowIdx => (
        <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: compact ? 3 : 4 }}>
          {[1, 2, 3].map(col => {
            const n = rowIdx * 3 + col
            return <RemBtn key={n} onClick={() => onAction(`num:${n}`)} style={{ ...dark, width: '100%' }}>{n}</RemBtn>
          })}
        </div>
      ))}
      {row(<RemBtn onClick={() => onAction('num:10')} style={{ ...dark, width: bw }}>0</RemBtn>)}

      {row(<><RemBtn onClick={() => onAction('dvr')}  style={grey}>DVR</RemBtn><RemBtn onClick={() => onAction('info')} style={grey}>INFO</RemBtn></>)}
      {row(<><RemBtn onClick={() => onAction('back')} style={grey}>BACK</RemBtn><RemBtn onClick={() => onAction('exit')} style={grey}>EXIT</RemBtn></>)}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: dpadSize, height: dpadSize }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)', boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.6)' }} />
          <RemBtn onClick={() => onAction('up')}    style={{ position: 'absolute', top: 0,    left: '25%', width: '50%', height: '40%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: compact ? 7 : 11 }}>▲</RemBtn>
          <RemBtn onClick={() => onAction('down')}  style={{ position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '40%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: compact ? 7 : 11 }}>▼</RemBtn>
          <RemBtn onClick={() => onAction('left')}  style={{ position: 'absolute', left: 0,   top: '25%', width: '40%', height: '50%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: compact ? 7 : 11 }}>◀</RemBtn>
          <RemBtn onClick={() => onAction('right')} style={{ position: 'absolute', right: 0,  top: '25%', width: '40%', height: '50%', background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: compact ? 7 : 11 }}>▶</RemBtn>
          <RemBtn onClick={() => onAction('ok')} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: okSize, height: okSize, borderRadius: '50%', background: 'linear-gradient(180deg, #4a4a4a 0%, #2e2e2e 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.85)', fontFamily: 'sans-serif', fontWeight: 700, fontSize: compact ? 7 : 11 }}>OK</RemBtn>
        </div>
      </div>

      {row(<><RemBtn onClick={() => onAction('menu')}  style={grey}>MENU</RemBtn><RemBtn onClick={() => onAction('guide')} style={grey}>GUIDE</RemBtn></>)}

      <div style={{ display: 'flex', gap: compact ? 4 : 6, justifyContent: 'center' }}>
        {[{ label: 'VOL', up: 'vol+', dn: 'vol-' }, { label: 'CH', up: 'right', dn: 'left' }].map(({ label, up, dn }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <RemBtn onClick={() => onAction(up)} style={{ ...dark, width: compact ? 26 : 44, height: compact ? 14 : 22, fontSize: compact ? 8 : 11 }}>+</RemBtn>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: compact ? 5 : 7, color: '#5a5a5a', letterSpacing: '0.2em' }}>{label}</div>
            <RemBtn onClick={() => onAction(dn)} style={{ ...dark, width: compact ? 26 : 44, height: compact ? 14 : 22, fontSize: compact ? 8 : 11 }}>-</RemBtn>
          </div>
        ))}
      </div>

      {row(<>
        <RemBtn onClick={() => onAction('rec')}   style={{ ...transport, background: 'linear-gradient(180deg,#c0392b 0%,#8b1a1a 100%)' }}>⏺</RemBtn>
        <RemBtn onClick={() => onAction('left')}  style={transport}>⏮</RemBtn>
        <RemBtn onClick={() => onAction('play')}  style={transport}>▶</RemBtn>
        <RemBtn onClick={() => onAction('pause')} style={transport}>⏸</RemBtn>
        <RemBtn onClick={() => onAction('right')} style={transport}>⏭</RemBtn>
        <RemBtn onClick={() => onAction('stop')}  style={transport}>⏹</RemBtn>
      </>, compact ? 2 : 3)}

      {row(<>
        {[['#c0392b','RED'],['#27ae60','GRN'],['#f39c12','YEL'],['#2980b9','BLU']].map(([bg, lbl]) => (
          <RemBtn key={lbl} style={{ background: bg, borderRadius: 4, height: compact ? 12 : 18, flex: 1, fontSize: compact ? 4 : 6, letterSpacing: '0.1em', color: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>{lbl}</RemBtn>
        ))}
      </>, compact ? 2 : 3)}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 2 : 3, justifyContent: 'center' }}>
        {['NEWS','KID','MOVIE','MUSIC','SPORT','DOC'].map((g, i) => (
          <RemBtn key={g} onClick={() => onAction(`num:${i + 1}`)} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 3, height: compact ? 10 : 15, padding: '0 4px', fontSize: compact ? 4 : 5, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}>{g}</RemBtn>
        ))}
      </div>

      <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: compact ? 4 : 6, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"VT323", monospace', fontSize: compact ? 9 : 12, letterSpacing: '0.12em', color: on ? '#3aff7a' : '#3a1a1a' }}>{on ? '● MOVIES' : '○ MOVIES'}</span>
        <span style={{ fontFamily: '"VT323", monospace', fontSize: compact ? 9 : 12, letterSpacing: '0.12em', color: on ? '#3aff7a' : '#3a1a1a' }}>CH {String(idx + 1).padStart(2,'0')}/{String(MOVIES.length).padStart(2,'0')}</span>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────── */
export default function OnRotation() {
  const [on,      setOn]      = useState(true)
  const [idx,     setIdx]     = useState(0)
  const [trans,   setTrans]   = useState(false)
  const [focused, setFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
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

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

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

  /* Cool grey slat wall — matches marble undertones */
  const woodWall = {
    background: [
      'repeating-linear-gradient(90deg,',
      '  #c0c2c6 0px, #c0c2c6 3px,',
      '  #eef0f3 3px, #f3f4f7 8px,',
      '  #e4e6ea 8px, #d6d8dd 20px,',
      '  #caced4 20px, #c0c2c6 23px',
      ')',
    ].join(''),
  }

  return (
    <>
      <section
        ref={sectionRef}
        data-screen-label="On Rotation"
        style={{ ...woodWall, padding: isMobile ? '28px 12px 44px' : '36px 32px 68px', width: '100%', boxSizing: 'border-box' }}
      >
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 18 : 26, color: '#2a2a2a' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-.01em', color: '#1a1a1a' }}>
            On Rotation
          </h2>
          <div style={{ fontFamily: '"EB Garamond", serif', fontStyle: 'italic', fontSize: isMobile ? 13 : 16, opacity: .85, color: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            Use the remote, or your arrow keys.
          </div>
        </div>

        {/* TV + remote row — always side-by-side */}
        <div style={{ display: 'flex', gap: isMobile ? 10 : 28, justifyContent: 'center', alignItems: 'flex-start', maxWidth: 960, margin: '0 auto' }}>
          {/* Left: TV + soundbar + ticket */}
          <div style={{ flex: 1, minWidth: 0, maxWidth: 720, overflow: 'hidden' }}>
            <div style={{
              position: 'relative', border: '6px solid #050505', borderRadius: 6,
              aspectRatio: '16/9', background: '#000', overflow: 'hidden',
              boxShadow: [
                'inset 0 0 60px rgba(0,0,0,.9)',
                '0 0 22px 10px rgba(30,70,255,0.22)',
                '0 0 60px 30px rgba(20,55,230,0.13)',
                '0 0 110px 55px rgba(10,40,210,0.07)',
                '0 18px 48px rgba(0,0,0,.35)',
              ].join(', '),
            }}>
              {on && !trans && (
                <div key={`${current.title}-${idx}`} style={{ position: 'absolute', inset: 0 }}>
                  <PosterArt data={current} index={idx} />
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.08) 2px 3px)', opacity: 0.55 }} />
              {(trans || !on) && (
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(200,200,200,0.18) 0%, rgba(80,80,80,0.07) 60%, transparent 100%)', mixBlendMode: 'screen', animation: 'onRotStatic 0.22s ease-out' }} />
              )}
              {!on && <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0.96 }} />}
              <div style={{ position: 'absolute', bottom: 7, right: 7, width: 5, height: 5, borderRadius: '50%', background: on ? '#3aff7a' : '#1a3a1a', boxShadow: on ? '0 0 8px #3aff7a' : 'none', transition: 'all 0.4s' }} />
            </div>
            <div style={{ height: 14, background: '#1a1714', borderRadius: 2, width: '70%', margin: '10px auto 0', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 3px 8px rgba(0,0,0,0.5)' }} />
            <MovieTicket title={current.title} year={current.year} channel={idx + 1} total={MOVIES.length} compact={isMobile} />
          </div>

          {/* Right: remote */}
          <Remote onAction={handle} on={on} idx={idx} compact={isMobile} />
        </div>
      </section>

      {/* Sign-off — LinkedIn banner background */}
      <section data-screen-label="Signature" style={{
        position: 'relative', width: '100%', textAlign: 'center', boxSizing: 'border-box',
        /* Mobile: contain so full banner shows; Desktop: cover for full bleed */
        backgroundImage: "url('/assets/linkedin banner.jpeg')",
        backgroundSize: isMobile ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        /* Mobile height tracks banner aspect ratio (~4:1) so image fills perfectly */
        minHeight: isMobile ? '25vw' : 'auto',
        padding: isMobile ? '0' : '72px 32px 96px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '8px 0' : '0' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: isMobile ? '1.8vw' : 11, letterSpacing: '.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            Yours truly,
          </div>
          <div style={{ marginTop: isMobile ? '1vw' : 8, fontFamily: '"Pinyon Script", "Allura", "Great Vibes", cursive', fontSize: isMobile ? '8vw' : 72, color: '#ffffff', lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Ananya
          </div>
        </div>
      </section>
    </>
  )
}
