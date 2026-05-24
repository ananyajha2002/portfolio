import { useState, useEffect, useCallback } from 'react'

const BL = '#800020'
const MU = '#888888'

/* A4-open ratio = 420mm × 297mm = 1.414 : 1  (landscape)            */
/* Small  : 400 × 320 px   Modal : up to 840 × 594 px                */
/* Modal height = width / 1.414 — preserves ratio at every viewport  */
const MODAL_W = 'min(95vw, 840px)'
const MODAL_H = 'min(calc(95vw / 1.414), 85vh, 594px)'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-block', padding: '2px 8px', border: '1px solid #ddd', fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.06em', color: MU, marginRight: '4px', marginBottom: '4px' }}>{children}</span>
)

const PillLg = ({ children }) => (
  <span style={{ display: 'inline-block', padding: '3px 10px', border: '1px solid #ddd', fontFamily: "'EB Garamond', serif", fontSize: 'clamp(10px, 1.3vw, 12px)', letterSpacing: '0.06em', color: MU, marginRight: '5px', marginBottom: '5px' }}>{children}</span>
)

/* ── Notebook shell ───────────────────────────────────────────────── */
function Shell({ w, h, left, right, onClick }) {
  const [hovered, setHovered] = useState(false)
  const interactive = !!onClick
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      style={{
        width: w, height: h, flexShrink: 0, display: 'flex',
        border: '4px solid #111', boxSizing: 'border-box', overflow: 'hidden',
        cursor: interactive ? 'pointer' : 'default',
        boxShadow: hovered ? '0 28px 64px rgba(0,0,0,0.32)' : '0 16px 50px rgba(0,0,0,0.22)',
        transform: hovered ? 'rotate(-2deg) translateY(-8px)' : 'rotate(0deg) translateY(0px)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
      }}
    >
      {/* Left page */}
      <div style={{
        flex: 1, background: '#fdfcf9',
        padding: '16px 14px 14px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto', position: 'relative',
        boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.07)',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
        {left}
      </div>

      {/* Centre gutter — solid spine matching the border */}
      <div style={{ width: '10px', flexShrink: 0, background: '#111' }} />

      {/* Right page */}
      <div style={{
        flex: 1, overflow: 'hidden', position: 'relative',
        boxShadow: 'inset 6px 0 12px rgba(0,0,0,0.07)',
      }}>
        {right}
      </div>
    </div>
  )
}

/* ── Modal ────────────────────────────────────────────────────────── */
function Modal({ onClose, children }) {
  const [closing, setClosing] = useState(false)
  const close = useCallback(() => { setClosing(true); setTimeout(onClose, 500) }, [onClose])
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [close])
  return (
    <div className={`mag-overlay${closing ? ' mag-overlay--closing' : ''}`} onClick={close} style={{ zIndex: 200 }}>
      <div onClick={e => e.stopPropagation()} style={{ animation: closing ? 'bookClose 0.5s cubic-bezier(0.4,0,1,1) forwards' : 'bookZoomIn 0.5s cubic-bezier(0.2,0,0.2,1) forwards' }}>
        {children}
      </div>
      <button onClick={close} style={{ position: 'fixed', top: '20px', right: '24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', fontFamily: "'EB Garamond', serif", fontSize: '11px', letterSpacing: '0.2em', padding: '8px 16px', cursor: 'pointer', textTransform: 'uppercase', zIndex: 201 }}>Close</button>
    </div>
  )
}

/* ══ CONCIERGE ═══════════════════════════════════════════════════════ */
const conciergePills = ['React', 'Next.js', 'Supabase', 'SQL', 'Vercel']

function ConciergeLeftSm() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>Internal Tool · Endless · 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '18px', color: '#111', lineHeight: 0.9, marginBottom: '8px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
    <div style={{ borderTop: '1px solid #e8e8e8', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>400+ consignment items managed across 100 Excel tabs. I replaced it with a mobile app built from scratch.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '6px' }}>
      {conciergePills.map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ background: '#111', padding: '7px 10px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#fff', letterSpacing: '0.05em', marginBottom: '3px' }}>~15 HRS SAVED / WEEK</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>ops team, after rollout</p>
    </div>
  </>
}

function ConciergeLeftLg() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Internal Tool · Endless · 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 3.8vw, 32px)', color: '#111', lineHeight: 0.9, marginBottom: '12px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
    <div style={{ borderTop: '1px solid #e8e8e8', margin: '12px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(11px, 1.5vw, 14px)', color: '#333', lineHeight: 1.65, marginBottom: '10px' }}>The ops team was managing 400+ consignment items across a 100-tab Excel sheet. One tab per client, nothing connected to photos, pricing, or approvals.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(11px, 1.5vw, 14px)', color: '#333', lineHeight: 1.65, marginBottom: '14px' }}>I scoped and built a mobile app from scratch. Tap a client, see their items as photos, approve or reject, push live. Zero training needed. The team got back roughly 15 hours a week.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '12px' }}>
      {conciergePills.map(s => <PillLg key={s}>{s}</PillLg>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ background: '#111', padding: '10px 14px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '11px', color: '#fff', letterSpacing: '0.05em', marginBottom: '3px' }}>~15 HRS SAVED · PER WEEK</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>ops team, after rollout</p>
    </div>
  </>
}

function ConciergeRightSm() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1C1C18', overflow: 'hidden' }}>
      <img
        src="/assets/concierge-cover.png"
        alt="Endless Concierge app"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
      />
    </div>
  )
}

function ConciergeRightLg() {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767

  if (isMobile) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#1C1C18', overflow: 'hidden' }}>
        <img
          src="/assets/concierge-cover.png"
          alt="Endless Concierge app"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: '100%', height: '100%', background: '#1C1C18', position: 'relative' }}>
      {!loaded && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.16em' }}>LOADING</p></div>}
      <iframe src="/assets/CONCIERGE/Concierge.html" title="Endless Concierge" onLoad={() => setLoaded(true)} style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s' }} />
      <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.92)', padding: '10px 18px', opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '14px', color: '#fff', margin: 0, letterSpacing: '0.02em' }}>any email + any password works, it is a live demo</p>
      </div>
    </div>
  )
}

function ConciergeNotebook() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Shell w="400px" h="320px" onClick={() => setOpen(true)} left={<ConciergeLeftSm />} right={<ConciergeRightSm />} />
      {open && <Modal onClose={() => setOpen(false)}><Shell w={MODAL_W} h={MODAL_H} left={<ConciergeLeftLg />} right={<ConciergeRightLg />} /></Modal>}
    </>
  )
}

/* ══ VAULT ═══════════════════════════════════════════════════════════ */
const vaultPills = ['ManyChat', 'Instagram API', 'Shopify', 'Klaviyo']

function VaultRight() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img src="/assets/vault-launch.gif" alt="The Vault" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.4))', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#111', padding: '4px 9px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '8px', color: '#fff', letterSpacing: '0.14em', margin: 0 }}>THE VAULT</p>
      </div>
    </div>
  )
}

function VaultLeftSm() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>Product Launch · March 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '22px', color: '#111', lineHeight: 0.9, marginBottom: '8px' }}>THE<br />VAULT.</div>
    <div style={{ borderTop: '1px solid #e8e8e8', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>Password-gated drop: high-end brands under AED 250, comment "Access" and the password lands in your DMs.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '6px' }}>
      {vaultPills.map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ background: '#111', padding: '7px 10px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#fff', letterSpacing: '0.05em', marginBottom: '3px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>first drop, March 2026</p>
    </div>
  </>
}

function VaultLeftLg() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Product Launch · March 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 4.3vw, 36px)', color: '#111', lineHeight: 0.9, marginBottom: '12px' }}>THE<br />VAULT.</div>
    <div style={{ borderTop: '1px solid #e8e8e8', margin: '12px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(11px, 1.5vw, 14px)', color: '#333', lineHeight: 1.65, marginBottom: '10px' }}>March was slow. Instead of discounting, I pitched a password-gated drop: high-end brands under AED 250, positioned as a private edit.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(11px, 1.5vw, 14px)', color: '#333', lineHeight: 1.65, marginBottom: '14px' }}>Comment "Access" on the post and the password lands in your DMs automatically via ManyChat.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '12px' }}>
      {vaultPills.map(s => <PillLg key={s}>{s}</PillLg>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ background: '#111', padding: '10px 14px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '11px', color: '#fff', letterSpacing: '0.05em', marginBottom: '3px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>first drop, March 2026</p>
    </div>
  </>
}

function VaultNotebook() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Shell w="400px" h="320px" onClick={() => setOpen(true)} left={<VaultLeftSm />} right={<VaultRight />} />
      {open && <Modal onClose={() => setOpen(false)}><Shell w={MODAL_W} h={MODAL_H} left={<VaultLeftLg />} right={<VaultRight />} /></Modal>}
    </>
  )
}

/* ══ META ════════════════════════════════════════════════════════════ */
const metaPills = ['Meta Ads Manager', 'Instagram', 'Facebook', 'Retargeting', 'Klaviyo']

function MetaRight({ lg }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000', overflow: 'hidden' }}>
      <video
        autoPlay muted loop playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        <source src="/assets/cool%20girls%20shop%20at%20endless.MP4" type="video/mp4" />
      </video>
      {lg && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.72)', padding: '12px 16px', display: 'flex', justifyContent: 'space-around' }}>
          {[{ num: '100K+', label: 'clicks' }, { num: '17', label: 'conversions' }, { num: 'AED 0', label: 'agency fees' }].map(({ num, label }, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '22px', color: '#f8f5ef', lineHeight: 0.88 }}>{num}</div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MetaLeftSm() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>Performance Marketing · 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '22px', color: '#111', lineHeight: 0.9, marginBottom: '8px' }}>100K<br />CLICKS.</div>
    <div style={{ borderTop: '1px solid #e8e8e8', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>Endless went through multiple agencies. The best-performing period was when I had complete creative control: highest ROAS, highest conversions.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '6px' }}>
      {metaPills.map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '8px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: MU, lineHeight: 1.5 }}>"Best results came from full creative control, not from an agency brief."</p>
    </div>
  </>
}

function MetaLeftLg() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '12px' }}>Performance Marketing · 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 4.3vw, 36px)', color: '#111', lineHeight: 0.9, marginBottom: '12px' }}>100K<br />CLICKS.</div>
    <div style={{ borderTop: '1px solid #e8e8e8', margin: '12px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(11px, 1.5vw, 14px)', color: '#333', lineHeight: 1.65, marginBottom: '10px' }}>Endless worked with multiple external agencies before I took over. When I ran campaigns with full creative control (my concepts, my targeting, my optimisation), the results outperformed every agency period.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(11px, 1.5vw, 14px)', color: '#333', lineHeight: 1.65, marginBottom: '14px' }}>AED 10,000+ monthly budget managed from scratch. 100K+ website clicks, 17 direct conversions, highest ROAS of any campaign period at Endless.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '12px' }}>
      {metaPills.map(s => <PillLg key={s}>{s}</PillLg>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '12px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: MU, lineHeight: 1.55 }}>"Best results came from full creative control, not from an agency brief."</p>
    </div>
  </>
}

function MetaNotebook() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Shell w="400px" h="320px" onClick={() => setOpen(true)} left={<MetaLeftSm />} right={<MetaRight />} />
      {open && <Modal onClose={() => setOpen(false)}><Shell w={MODAL_W} h={MODAL_H} left={<MetaLeftLg />} right={<MetaRight lg />} /></Modal>}
    </>
  )
}

/* ══ SECTION ═════════════════════════════════════════════════════════ */
export default function CaseStudyBooks() {
  return (
    <div style={{ width: '100%', padding: '64px 20px 0px', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(26px, 4vw, 46px)', color: '#111111', letterSpacing: '-0.01em' }}>My Favourite Projects So Far.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '14px auto 0' }} />
      </div>

      <div style={{ display: 'flex', gap: '0', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <ConciergeNotebook />
        <VaultNotebook />
        <MetaNotebook />
      </div>
    </div>
  )
}
