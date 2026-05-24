import { useState, useEffect } from 'react'

const BL = '#800020'
const MU = '#888888'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-block', padding: '2px 8px', border: '1px solid #ddd', fontFamily: "'EB Garamond', serif", fontSize: '11px', letterSpacing: '0.06em', color: MU, marginRight: '4px', marginBottom: '4px' }}>{children}</span>
)

/* ── Case study data ──────────────────────────────────────────────────── */
const CASES = [
  {
    id: 'concierge',
    coverBg: '#1C1C18',
    coverBgImage: null,
    coverTitle: 'THE\nCONCIERGE\nSYSTEM.',
    coverSub: 'Internal Tool · Endless · 2025',
    coverStat: '100 tabs → 1 app',
    rotation: -9,
    zIndex: 3,
    left: 10,
    top: 0,
  },
  {
    id: 'vault',
    coverBg: '#1a1a1a',
    coverBgImage: '/assets/vault-launch.gif',
    coverTitle: 'THE\nVAULT.',
    coverSub: 'Product Launch · March 2026',
    coverStat: 'AED 5,082 · 28 units',
    rotation: 7,
    zIndex: 2,
    left: 55,
    top: 35,
  },
  {
    id: 'meta',
    coverBg: '#0f0f0f',
    coverBgImage: null,
    coverTitle: '100K\nCLICKS.',
    coverSub: 'Performance Marketing · 2025',
    coverStat: '0 agencies',
    rotation: -2,
    zIndex: 1,
    left: 28,
    top: 22,
  },
]

/* ── Book cover card ──────────────────────────────────────────────────── */
function BookCover({ c, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        left: `${c.left}px`,
        top: `${c.top}px`,
        zIndex: c.zIndex,
        width: '210px',
        height: '300px',
        cursor: 'pointer',
        transform: `rotate(${c.rotation}deg) translateY(${hovered ? -10 : 0}px)`,
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        boxShadow: hovered
          ? '0 22px 56px rgba(0,0,0,0.45), 0 4px 14px rgba(0,0,0,0.22)'
          : '0 10px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.16)',
      }}
    >
      {/* Book body */}
      <div style={{
        width: '100%', height: '100%',
        background: c.coverBg,
        backgroundImage: c.coverBgImage ? `url(${c.coverBgImage})` : undefined,
        backgroundSize: 'cover', backgroundPosition: 'center',
        overflow: 'hidden', position: 'relative',
      }}>
        {c.coverBgImage && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.75) 100%)' }} />}

        {/* Spine */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px', background: BL, zIndex: 2 }} />

        {/* Content */}
        <div style={{ position: 'absolute', inset: 0, padding: '18px 16px 18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 2 }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{c.coverSub}</p>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '26px', color: '#fff', lineHeight: 0.88, whiteSpace: 'pre-line', marginBottom: '10px' }}>{c.coverTitle}</div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>{c.coverStat}</p>
        </div>

        {/* Hover cue */}
        {hovered && (
          <div style={{ position: 'absolute', top: '14px', right: '12px', zIndex: 3 }}>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>open →</p>
          </div>
        )}
      </div>

      {/* Page-edge thickness */}
      <div style={{ position: 'absolute', right: '-5px', top: '3px', bottom: '-3px', width: '5px', background: 'linear-gradient(to right, #c8c6be, #e2e0d8)', borderRadius: '0 1px 1px 0' }} />
    </div>
  )
}

/* ── Detail modal (like MagazineInterior) ─────────────────────────────── */
function DetailModal({ c, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const leftContent = {
    concierge: (
      <>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Internal Tool · Endless Dubai · 2025</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(24px, 4vw, 40px)', color: '#111', lineHeight: 0.88, marginBottom: '14px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
        <div style={{ borderTop: '1px solid #ddd', margin: '10px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>The ops team was running 400+ consignment items across a 100-tab Excel sheet. One tab per client. Nothing connected to photos, pricing, or approvals. Finding anything took longer than the actual review.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '12px' }}>I scoped and built a mobile app from scratch. Tap a client, see their items as photos, approve or reject, push live. Status rolls up automatically. Anyone on the team can use it with zero training — drivers, interns, whoever we hire next.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '12px' }}>
          {['React', 'Next.js', 'Supabase', 'Vercel', 'SQL', 'Google SSO'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '12px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.5 }}>"The most commercially important workflows in a young business are often the ones nobody formally owns."</p>
        </div>
      </>
    ),
    vault: (
      <>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Product Launch · Endless Dubai · March 2026</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(28px, 5vw, 48px)', color: '#111', lineHeight: 0.88, marginBottom: '14px' }}>THE<br />VAULT.</div>
        <div style={{ borderTop: '1px solid #ddd', margin: '10px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>March was quieter than usual. Instead of discounting, I pitched a password-gated, buy-only corner of the site. Everything under AED 250. Sandro, Maje, Meshki, Runaway — high-end brands at prices that made sense for the moment.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '12px' }}>The password gate was intentional. Comment "Access" on the launch post — password lands in your DMs automatically via ManyChat. Not a sale. A private drop. I built the automation too.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '12px' }}>
          {['ManyChat', 'Instagram API', 'Shopify', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ background: '#111', padding: '12px 14px' }}>
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '13px', color: '#fff', letterSpacing: '0.06em', marginBottom: '4px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>April performance, first drop</p>
        </div>
      </>
    ),
    meta: (
      <>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Performance Marketing · Endless Dubai · 2025</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(28px, 5vw, 48px)', color: '#111', lineHeight: 0.88, marginBottom: '14px' }}>100K<br />CLICKS.</div>
        <div style={{ borderTop: '1px solid #ddd', margin: '10px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>No prior paid ads experience. No agency. AED 10,000+ monthly budget to manage from scratch. I taught myself Meta Ads Manager from YouTube and customer instinct.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '12px' }}>Built every creative, set all targeting, optimised in real time. 17 direct conversions came from retargeting warm audiences who had already engaged with the brand on Instagram.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '12px' }}>
          {['Meta Ads Manager', 'Instagram', 'Facebook', 'Retargeting', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '12px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.5 }}>Learned it, ran it, reported it. No template, no agency, no excuses.</p>
        </div>
      </>
    ),
  }[c.id]

  const rightContent = {
    concierge: (
      <div style={{ width: '100%', height: '100%', background: '#1C1C18', position: 'relative' }}>
        {!iframeLoaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '12px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em' }}>LOADING APP</p>
          </div>
        )}
        <iframe src="/assets/CONCIERGE/Concierge.html" title="Endless Concierge" onLoad={() => setIframeLoaded(true)}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.4s' }} />
      </div>
    ),
    vault: (
      <>
        <img src="/assets/vault-launch.gif" alt="The Vault" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#111', padding: '5px 12px' }}>
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#fff', letterSpacing: '0.16em' }}>THE VAULT</p>
        </div>
      </>
    ),
    meta: (
      <div style={{ width: '100%', height: '100%', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', boxSizing: 'border-box' }}>
        {[{ num: '100K+', label: 'website clicks' }, { num: '17', label: 'direct conversions' }, { num: 'AED 0', label: 'agency fees' }].map(({ num, label }, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '24px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', width: '100%' }}>
            <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(36px, 6vw, 64px)', color: '#f8f5ef', lineHeight: 0.88 }}>{num}</div>
            <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>{label}</div>
          </div>
        ))}
      </div>
    ),
  }[c.id]

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', boxSizing: 'border-box' }}
    >
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', width: '100%', maxWidth: '900px', height: '90vh', maxHeight: '600px', boxShadow: '0 40px 100px rgba(0,0,0,0.6)', borderRadius: '1px' }}>
        {/* Left */}
        <div style={{ width: '50%', height: '100%', background: '#faf9f5', padding: '36px 32px 28px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', boxShadow: 'inset -6px 0 14px rgba(0,0,0,0.07)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
          {leftContent}
        </div>
        {/* Spine */}
        <div style={{ width: '12px', flexShrink: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.22), rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.12))' }} />
        {/* Right */}
        <div style={{ flex: 1, height: '100%', overflow: 'hidden', position: 'relative' }}>
          {rightContent}
        </div>
      </div>

      {/* Close */}
      <button onClick={onClose} style={{ position: 'fixed', top: '20px', right: '24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)', fontFamily: "'EB Garamond', serif", fontSize: '11px', letterSpacing: '0.2em', padding: '8px 16px', cursor: 'pointer', textTransform: 'uppercase' }}>
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

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '48px' : '64px' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: isMobile ? '30px' : 'clamp(36px, 5vw, 52px)', color: '#111111', lineHeight: 0.88, letterSpacing: '0.02em' }}>THE WORK.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '14px auto 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: isMobile ? '12px' : '14px', color: MU, marginTop: '10px', letterSpacing: '0.04em' }}>Click any to open</p>
      </div>

      {/* Stack of books */}
      <div style={{
        position: 'relative',
        width: isMobile ? '260px' : '330px',
        height: isMobile ? '340px' : '400px',
        margin: '0 auto',
      }}>
        {[...CASES].reverse().map(c => (
          <BookCover
            key={c.id}
            c={isMobile ? { ...c, width: 180, height: 260, left: c.left * 0.8, top: c.top * 0.8 } : c}
            onClick={() => setOpen(c)}
          />
        ))}
      </div>

      {/* Modal */}
      {open && <DetailModal c={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
