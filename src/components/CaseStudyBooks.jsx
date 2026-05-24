import { useState, useEffect, useRef } from 'react'

const BL = '#800020'
const MU = '#888888'

const Pill = ({ children }) => (
  <span style={{
    display: 'inline-block', padding: '2px 8px',
    border: '1px solid #d8d8d8',
    fontFamily: "'EB Garamond', serif", fontSize: '10px',
    letterSpacing: '0.06em', color: MU,
    marginRight: '4px', marginBottom: '4px',
  }}>{children}</span>
)

/* ── Open book ────────────────────────────────────────────────────────── */
function Book({ rotation = 0, left, right, rightDark = false }) {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '440px',
      transform: `rotate(${rotation}deg)`,
      /* layered shadows: ambient + directional + close */
      boxShadow: [
        '0 2px  4px rgba(0,0,0,0.10)',
        '0 8px 20px rgba(0,0,0,0.14)',
        '0 24px 56px rgba(0,0,0,0.20)',
      ].join(', '),
      borderRadius: '1px 3px 3px 1px',
    }}>

      {/* ── Left page ── */}
      <div style={{
        width: '48%',
        height: '100%',
        background: '#faf9f5',
        padding: '30px 26px 22px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '1px 0 0 1px',
        position: 'relative',
        /* inner shadow to simulate page curve near spine */
        boxShadow: 'inset -8px 0 16px rgba(0,0,0,0.08)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
        {left}
      </div>

      {/* ── Spine ── */}
      <div style={{
        width: '14px',
        flexShrink: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.12) 100%)',
      }} />

      {/* ── Right page ── */}
      <div style={{
        flex: 1,
        height: '100%',
        background: rightDark ? '#111111' : '#f2f0eb',
        overflow: 'hidden',
        borderRadius: '0 3px 3px 0',
        position: 'relative',
        boxShadow: 'inset 6px 0 12px rgba(0,0,0,0.06)',
      }}>
        {right}
      </div>
    </div>
  )
}

/* ── Book contents ────────────────────────────────────────────────────── */

/* 1 — Concierge */
function ConciergeLeft() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '8px' }}>Internal Tool · Endless Dubai · 2025</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 3.5cqw, 28px)', color: '#111', lineHeight: 0.9, letterSpacing: '0.01em', marginBottom: '10px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
    <div style={{ borderTop: '1px solid #e4e4e4', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '5px' }}>The ops team was running 400+ consignment items across a 100-tab Excel sheet. One tab per client. Nothing connected to photos, pricing, or approvals.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>I scoped and built a mobile app from scratch. Tap a client, see their items as photos, approve or reject, push live. Anyone can use it with zero training.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '6px' }}>
      {['React', 'Next.js', 'Supabase', 'Vercel', 'SQL'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '4px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: MU, lineHeight: 1.5 }}>100 tabs → 1 app. Built and shipped in-house.</p>
    </div>
  </>
}

function ConciergeRight() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1C1C18' }}>
      {/* Loading state */}
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', zIndex: 1 }}>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '13px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>LOADING APP</div>
          <div style={{ width: '32px', height: '1px', background: BL }} />
        </div>
      )}
      <iframe
        src="/assets/CONCIERGE/Concierge.html"
        title="Endless Concierge"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', height: '100%',
          border: 'none', display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  )
}

/* 2 — The Vault */
function VaultLeft() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '8px' }}>Product Launch · Endless Dubai · March 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 4cqw, 32px)', color: '#111', lineHeight: 0.9, letterSpacing: '0.01em', marginBottom: '10px' }}>THE<br />VAULT.</div>
    <div style={{ borderTop: '1px solid #e4e4e4', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '5px' }}>March was slow. Instead of discounting, I pitched a password-gated drop: high-end brands under AED 250, positioned as a private edit rather than a clearance event.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>Comment "Access" on the launch post — password lands in your DMs automatically via ManyChat. I built that too.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '6px' }}>
      {['ManyChat', 'Shopify', 'Instagram API', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ background: '#111', padding: '10px 12px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '11px', color: '#fff', letterSpacing: '0.08em', marginBottom: '3px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9.5px', color: 'rgba(255,255,255,0.45)' }}>April performance, first drop</p>
    </div>
  </>
}

function VaultRight() {
  return <>
    <img src="/assets/vault-launch.gif" alt="The Vault" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.45) 100%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#111', padding: '4px 10px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: '#fff', letterSpacing: '0.18em' }}>THE VAULT</p>
    </div>
  </>
}

/* 3 — Meta Ads */
function MetaLeft() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '8px' }}>Performance Marketing · Endless Dubai · 2025</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 4cqw, 32px)', color: '#111', lineHeight: 0.9, letterSpacing: '0.01em', marginBottom: '10px' }}>100K<br />CLICKS.</div>
    <div style={{ borderTop: '1px solid #e4e4e4', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '5px' }}>No agency. No prior experience. AED 10,000+ monthly budget managed from scratch.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>Taught myself Meta Ads Manager, built the creatives, set targeting, optimised in real time. 17 conversions came from retargeting warm Instagram audiences.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '6px' }}>
      {['Meta Ads Manager', 'Instagram', 'Facebook', 'Retargeting', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '4px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: MU, lineHeight: 1.5 }}>Learned it, ran it, reported it. No template, no excuses.</p>
    </div>
  </>
}

function MetaRight() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', boxSizing: 'border-box' }}>
      {[
        { num: '100K+', label: 'website clicks' },
        { num: '17',    label: 'direct conversions' },
        { num: 'AED 0', label: 'agency fees' },
      ].map(({ num, label }, i) => (
        <div key={i} style={{
          textAlign: 'center',
          padding: '20px 0',
          borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
          width: '100%',
        }}>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(32px, 5.5cqw, 48px)', color: '#f8f5ef', lineHeight: 0.88, letterSpacing: '0.02em' }}>{num}</div>
          <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '5px', letterSpacing: '0.06em' }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function CaseStudyBooks() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  /* Mobile: simplified stacked cards */
  if (isMobile) {
    const cards = [
      {
        eyebrow: 'Internal Tool · Endless Dubai · 2025',
        title: 'THE CONCIERGE SYSTEM.',
        body: 'Built a mobile app from scratch to replace a 100-tab Excel sheet. Approve items as photos, push live, zero training needed.',
        pills: ['React', 'Next.js', 'Supabase', 'SQL'],
        stat: '100 tabs → 1 app',
      },
      {
        eyebrow: 'Product Launch · March 2026',
        title: 'THE VAULT.',
        body: 'Password-gated drop under AED 250. Comment "Access" → password in your DMs via ManyChat. AED 5,082 revenue, 28 units, first month.',
        pills: ['ManyChat', 'Shopify', 'Klaviyo'],
        stat: 'AED 5,082 · 28 units',
      },
      {
        eyebrow: 'Performance Marketing · 2025',
        title: '100K CLICKS.',
        body: 'Self-taught Meta Ads, AED 10K+ monthly budget, no agency. 100,000+ clicks and 17 conversions from retargeting.',
        pills: ['Meta Ads', 'Instagram', 'Retargeting'],
        stat: '100K+ clicks · 0 agency fees',
      },
    ]
    return (
      <div style={{ width: '100%', padding: '40px 20px 60px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '30px', color: '#111', lineHeight: 0.88, letterSpacing: '0.02em' }}>THE WORK.</div>
          <div style={{ width: '40px', height: '1px', background: BL, margin: '12px auto 0' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: '#faf9f5', padding: '24px 20px 20px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>{c.eyebrow}</p>
              <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '22px', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>{c.title}</div>
              <div style={{ borderTop: '1px solid #e4e4e4', margin: '8px 0' }} />
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>{c.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>{c.pills.map(s => <Pill key={s}>{s}</Pill>)}</div>
              <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginTop: '12px' }}>
                <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10.5px', color: MU }}>{c.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* Desktop: open books */
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 24px 80px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(36px, 5vw, 52px)', color: '#111111', lineHeight: 0.88, letterSpacing: '0.02em' }}>THE WORK.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '14px auto 0' }} />
      </div>

      {/* Three books */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
        <Book rotation={-1}   left={<ConciergeLeft />} right={<ConciergeRight />} rightDark />
        <Book rotation={0.8}  left={<VaultLeft />}     right={<VaultRight />} />
        <Book rotation={-0.5} left={<MetaLeft />}      right={<MetaRight />}      rightDark />
      </div>
    </div>
  )
}
