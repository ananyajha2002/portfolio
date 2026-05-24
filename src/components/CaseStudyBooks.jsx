import { useState, useEffect } from 'react'

const BL = '#800020'
const MU = '#888888'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-block', padding: '2px 8px', border: '1px solid #ddd', fontFamily: "'EB Garamond', serif", fontSize: '11px', letterSpacing: '0.06em', color: MU, marginRight: '4px', marginBottom: '4px' }}>{children}</span>
)

/* ── Spiral binding ───────────────────────────────────────────────────── */
function Spiral({ width = 200, color = '#777' }) {
  const count = Math.floor(width / 18)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', padding: '0 12px', boxSizing: 'border-box' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: '11px', height: '16px',
          border: `2px solid ${color}`,
          borderRadius: '999px',
          background: 'transparent',
          flexShrink: 0,
        }} />
      ))}
    </div>
  )
}

/* ── Notebook cover ───────────────────────────────────────────────────── */
const COVERS = [
  { id: 'concierge', title: 'THE CONCIERGE\nSYSTEM.', sub: 'Internal Tool · Endless · 2025', stat: '100 tabs → 1 app', bg: '#111111', rotation: -7, order: 3 },
  { id: 'vault',     title: 'THE\nVAULT.',             sub: 'Product Launch · March 2026',    stat: 'AED 5,082 revenue',  bg: '#1a1a1a', bgImg: '/assets/vault-launch.gif', rotation: 5, order: 2 },
  { id: 'meta',      title: '100K\nCLICKS.',           sub: 'Performance Marketing · 2025',  stat: '0 agencies',         bg: '#0d0d0d', rotation: -1, order: 1 },
]

function NotebookCover({ cover, style, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        width: '200px',
        cursor: 'pointer',
        transform: `rotate(${cover.rotation}deg) translateY(${hovered ? -12 : 0}px)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        zIndex: cover.order,
        ...style,
      }}
    >
      {/* Spiral at top */}
      <div style={{ height: '18px', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <Spiral width={200} color={hovered ? '#999' : '#666'} />
      </div>

      {/* Cover body */}
      <div style={{
        width: '100%',
        height: '270px',
        background: cover.bg,
        backgroundImage: cover.bgImg ? `url(${cover.bgImg})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: hovered
          ? '0 20px 50px rgba(0,0,0,0.5)'
          : '0 8px 28px rgba(0,0,0,0.35)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        {cover.bgImg && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />}

        {/* Left spine accent */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: BL }} />

        <div style={{ position: 'absolute', inset: 0, padding: '20px 16px 16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2 }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{cover.sub}</p>
          <div>
            <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '26px', color: '#fff', lineHeight: 0.9, whiteSpace: 'pre-line', marginBottom: '10px' }}>{cover.title}</div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{cover.stat}</p>
          </div>
        </div>

        {hovered && (
          <div style={{ position: 'absolute', bottom: '12px', right: '12px', zIndex: 3 }}>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>open →</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Open notebook detail modal ───────────────────────────────────────── */
function NotebookDetail({ cover, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const leftContent = {
    concierge: <>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Internal Tool · Endless Dubai · 2025</p>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(22px, 3.5vw, 36px)', color: '#111', lineHeight: 0.9, marginBottom: '12px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
      <div style={{ borderTop: '1px solid #e0e0e0', margin: '10px 0' }} />
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.65, marginBottom: '8px' }}>The ops team was running 400+ consignment items across a 100-tab Excel sheet. One tab per client. Nothing connected to photos, pricing, or approvals.</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.65, marginBottom: '12px' }}>I scoped and built a mobile app from scratch. Tap a client, see their items as photos, approve or reject, push live. Status rolls up automatically. Anyone on the team can use it with zero training.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
        {['React', 'Next.js', 'Supabase', 'SQL', 'Vercel'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '12px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.5 }}>"100 tabs → 1 app. Built and shipped in-house."</p>
      </div>
    </>,
    vault: <>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Product Launch · Endless Dubai · March 2026</p>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(26px, 4vw, 42px)', color: '#111', lineHeight: 0.9, marginBottom: '12px' }}>THE<br />VAULT.</div>
      <div style={{ borderTop: '1px solid #e0e0e0', margin: '10px 0' }} />
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.65, marginBottom: '8px' }}>March was slow. Instead of discounting, I pitched a password-gated drop: high-end brands under AED 250, positioned as a private edit rather than a clearance event.</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.65, marginBottom: '12px' }}>Comment "Access" on the launch post — password lands in your DMs automatically via ManyChat. I built that automation too.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
        {['ManyChat', 'Instagram API', 'Shopify', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ background: '#111', padding: '12px 14px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '12px', color: '#fff', letterSpacing: '0.06em', marginBottom: '3px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>April performance, first drop</p>
      </div>
    </>,
    meta: <>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Performance Marketing · Endless Dubai · 2025</p>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(26px, 4vw, 42px)', color: '#111', lineHeight: 0.9, marginBottom: '12px' }}>100K<br />CLICKS.</div>
      <div style={{ borderTop: '1px solid #e0e0e0', margin: '10px 0' }} />
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.65, marginBottom: '8px' }}>No prior experience. No agency. AED 10,000+ monthly budget managed from scratch. Taught myself Meta Ads Manager, built all the creatives, set targeting, optimised in real time.</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.65, marginBottom: '12px' }}>17 direct conversions came from retargeting warm audiences who had already engaged with the brand on Instagram.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
        {['Meta Ads Manager', 'Instagram', 'Facebook', 'Retargeting', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '12px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.5 }}>"Learned it, ran it, reported it. No template, no agency, no excuses."</p>
      </div>
    </>,
  }[cover.id]

  const rightContent = {
    concierge: (
      <div style={{ width: '100%', height: '100%', background: '#1C1C18', position: 'relative' }}>
        {!iframeLoaded && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: "'VogueTTF', serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.16em' }}>LOADING</p></div>}
        <iframe src="/assets/CONCIERGE/Concierge.html" title="Endless Concierge" onLoad={() => setIframeLoaded(true)} style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.4s' }} />
      </div>
    ),
    vault: (
      <>
        <img src="/assets/vault-launch.gif" alt="The Vault" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#111', padding: '5px 12px' }}>
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: '#fff', letterSpacing: '0.16em' }}>THE VAULT</p>
        </div>
      </>
    ),
    meta: (
      <div style={{ width: '100%', height: '100%', background: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', boxSizing: 'border-box' }}>
        {[{ num: '100K+', label: 'website clicks' }, { num: '17', label: 'direct conversions' }, { num: 'AED 0', label: 'agency fees' }].map(({ num, label }, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '22px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', width: '100%' }}>
            <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(36px, 6vw, 60px)', color: '#f8f5ef', lineHeight: 0.88 }}>{num}</div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>{label}</div>
          </div>
        ))}
      </div>
    ),
  }[cover.id]

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', boxSizing: 'border-box' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '860px', background: '#fff', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', position: 'relative' }}>

        {/* Spiral at top of open notebook */}
        <div style={{ height: '22px', background: '#f0ede6', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
          <Spiral width={860} color="#888" />
        </div>

        {/* Open spread */}
        <div style={{ display: 'flex', height: '72vh', maxHeight: '560px' }}>
          {/* Left page */}
          <div style={{ width: '50%', height: '100%', background: '#fdfcf9', padding: '32px 28px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', borderRight: '1px solid #e8e8e8', boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.04)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
            {leftContent}
          </div>
          {/* Right page */}
          <div style={{ flex: 1, height: '100%', overflow: 'hidden', position: 'relative', background: '#f5f3ef' }}>
            {rightContent}
          </div>
        </div>
      </div>

      <button onClick={onClose} style={{ position: 'fixed', top: '20px', right: '24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', fontFamily: "'EB Garamond', serif", fontSize: '11px', letterSpacing: '0.2em', padding: '8px 16px', cursor: 'pointer', textTransform: 'uppercase' }}>
        Close
      </button>
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────────── */
export default function CaseStudyBooks() {
  const [open, setOpen] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  return (
    <div style={{ width: '100%', padding: isMobile ? '48px 20px 60px' : '48px 0 80px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '52px' : '72px' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: isMobile ? '30px' : 'clamp(36px, 5vw, 52px)', color: '#111111', lineHeight: 0.88, letterSpacing: '0.02em' }}>THE WORK.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '14px auto 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: MU, marginTop: '10px' }}>Click any notebook to open</p>
      </div>

      {/* Notebook stack */}
      <div style={{ position: 'relative', width: isMobile ? '240px' : '340px', height: isMobile ? '320px' : '380px', margin: '0 auto' }}>
        {COVERS.map((c, i) => (
          <NotebookCover
            key={c.id}
            cover={c}
            onClick={() => setOpen(c)}
            style={{
              left: isMobile
                ? [0, 30, 15][i] + 'px'
                : [0, 80, 40][i] + 'px',
              top: isMobile
                ? [30, 0, 15][i] + 'px'
                : [40, 0, 20][i] + 'px',
            }}
          />
        ))}
      </div>

      {open && <NotebookDetail cover={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
