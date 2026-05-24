import { useState, useEffect } from 'react'

const BL = '#800020'
const MU = '#888888'

const Pill = ({ children }) => (
  <span style={{
    display: 'inline-block', padding: '2px 7px',
    border: '1px solid rgba(0,0,0,0.15)',
    fontFamily: "'EB Garamond', serif", fontSize: '11px',
    letterSpacing: '0.06em', color: '#555',
    marginRight: '4px', marginBottom: '4px',
  }}>{children}</span>
)

/* ── Single open-book spread with 3-D perspective ─────────────────────── */
function Book3D({ rotateZ = 0, marginTop = 0, left, right, rightDark = false }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      marginTop,
      /* push down to give room for the shadow behind */
      paddingBottom: '60px',
    }}>
      {/* Cast shadow — separate element so it stays flat on the "table" */}
      <div style={{
        position: 'absolute',
        left: '8%', right: '8%',
        bottom: '20px',
        height: '50px',
        background: 'rgba(0,0,0,0.28)',
        filter: 'blur(22px)',
        borderRadius: '50%',
        transform: `scaleY(0.55) rotateZ(${rotateZ * 0.4}deg)`,
      }} />

      {/* The book itself */}
      <div style={{
        display: 'flex',
        width: '100%',
        height: '360px',
        transform: `perspective(1100px) rotateX(46deg) rotateZ(${rotateZ}deg)`,
        transformOrigin: 'center bottom',
        boxShadow: '0 4px 12px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)',
      }}>
        {/* Left page */}
        <div style={{
          width: '48%',
          height: '100%',
          background: '#faf9f5',
          padding: '28px 24px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '2px 0 0 2px',
          boxShadow: 'inset -6px 0 14px rgba(0,0,0,0.1)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
          {left}
        </div>

        {/* Spine */}
        <div style={{
          width: '14px',
          flexShrink: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.14) 100%)',
        }} />

        {/* Right page */}
        <div style={{
          flex: 1,
          height: '100%',
          background: rightDark ? '#111' : '#f0ede6',
          overflow: 'hidden',
          borderRadius: '0 2px 2px 0',
          position: 'relative',
          boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.06)',
        }}>
          {right}
        </div>
      </div>
    </div>
  )
}

/* ── Page contents — fonts sized up to stay readable at perspective angle ─ */

function ConciergeLeft() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '8px' }}>Internal Tool · Endless · 2025</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(22px, 4cqw, 32px)', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
    <div style={{ borderTop: '1px solid #ddd', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.55, marginBottom: '6px' }}>The ops team had a 100-tab Excel sheet. One tab per client. Nothing connected to photos, pricing, or approvals.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.55, marginBottom: '10px' }}>I built a mobile app from scratch. See clients, review items as photos, approve, reject, push live. Zero training needed.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {['React', 'Next.js', 'Supabase', 'SQL', 'Vercel'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU }}>100 tabs → 1 app. Built in-house.</p>
    </div>
  </>
}

function ConciergeRight() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#1C1C18' }}>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '12px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em' }}>LOADING</p>
        </div>
      )}
      <iframe
        src="/assets/CONCIERGE/Concierge.html"
        title="Endless Concierge"
        onLoad={() => setLoaded(true)}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
      />
    </div>
  )
}

function VaultLeft() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '8px' }}>Product Launch · Endless · March 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(26px, 5cqw, 40px)', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>THE<br />VAULT.</div>
    <div style={{ borderTop: '1px solid #ddd', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.55, marginBottom: '6px' }}>March was slow. I pitched a password-gated drop: high-end brands under AED 250. A private edit, not a sale.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.55, marginBottom: '10px' }}>Comment "Access" on the post — password lands in your DMs automatically via ManyChat. I built that too.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {['ManyChat', 'Shopify', 'Instagram API', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ background: '#111', padding: '10px 12px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '12px', color: '#fff', letterSpacing: '0.08em' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
    </div>
  </>
}

function VaultRight() {
  return <>
    <img src="/assets/vault-launch.gif" alt="The Vault" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4))', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#111', padding: '4px 10px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: '#fff', letterSpacing: '0.16em' }}>THE VAULT</p>
    </div>
  </>
}

function MetaLeft() {
  return <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '8px' }}>Performance Marketing · Endless · 2025</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(26px, 5cqw, 40px)', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>100K<br />CLICKS.</div>
    <div style={{ borderTop: '1px solid #ddd', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.55, marginBottom: '6px' }}>No prior experience. No agency. AED 10,000+ monthly budget from scratch.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.55, marginBottom: '10px' }}>Taught myself Meta Ads, built creatives, set targeting, optimised in real time. 17 conversions via retargeting.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {['Meta Ads', 'Instagram', 'Facebook', 'Retargeting'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU }}>Learned it, ran it, reported it.</p>
    </div>
  </>
}

function MetaRight() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', boxSizing: 'border-box' }}>
      {[
        { num: '100K+', label: 'website clicks' },
        { num: '17',    label: 'direct conversions' },
        { num: '£0',    label: 'agency fees' },
      ].map(({ num, label }, i) => (
        <div key={i} style={{ textAlign: 'center', padding: '18px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', width: '100%' }}>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(30px, 6cqw, 52px)', color: '#f8f5ef', lineHeight: 0.88 }}>{num}</div>
          <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '5px' }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────────── */
export default function CaseStudyBooks() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  if (isMobile) {
    const cards = [
      { eyebrow: 'Internal Tool · Endless · 2025', title: 'THE CONCIERGE SYSTEM.', body: 'Built a mobile app to replace a 100-tab Excel sheet. Review items as photos, approve, reject, push live. Zero training needed.', pills: ['React', 'Next.js', 'Supabase', 'SQL'], stat: '100 tabs → 1 app' },
      { eyebrow: 'Product Launch · March 2026', title: 'THE VAULT.', body: 'Password-gated drop under AED 250. Comment "Access" → password in DMs automatically. AED 5,082 first month.', pills: ['ManyChat', 'Shopify', 'Klaviyo'], stat: 'AED 5,082 · 28 units' },
      { eyebrow: 'Performance Marketing · 2025', title: '100K CLICKS.', body: 'Self-taught Meta Ads from scratch. AED 10K+ budget, no agency. 100K+ clicks, 17 direct conversions.', pills: ['Meta Ads', 'Instagram', 'Retargeting'], stat: '100K+ clicks · 0 agency fees' },
    ]
    return (
      <div style={{ width: '100%', padding: '40px 20px 60px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '30px', color: '#111', lineHeight: 0.9 }}>THE WORK.</div>
          <div style={{ width: '40px', height: '1px', background: BL, margin: '12px auto 0' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: '#faf9f5', padding: '24px 20px 20px', boxShadow: '0 8px 28px rgba(0,0,0,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>{c.eyebrow}</p>
              <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '22px', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>{c.title}</div>
              <div style={{ borderTop: '1px solid #e4e4e4', margin: '8px 0' }} />
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>{c.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>{c.pills.map(s => <Pill key={s}>{s}</Pill>)}</div>
              <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginTop: '12px' }}>
                <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU }}>{c.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', padding: '40px 60px 40px', boxSizing: 'border-box', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(36px, 5vw, 54px)', color: '#111111', lineHeight: 0.88, letterSpacing: '0.02em' }}>THE WORK.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '14px auto 0' }} />
      </div>

      {/* Books — stacked, each with different rotateZ for the scattered look */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Book3D rotateZ={-14} marginTop={0}    left={<ConciergeLeft />} right={<ConciergeRight />} rightDark />
        <Book3D rotateZ={10}  marginTop={-80}  left={<VaultLeft />}     right={<VaultRight />} />
        <Book3D rotateZ={-6}  marginTop={-80}  left={<MetaLeft />}      right={<MetaRight />}      rightDark />
      </div>
    </div>
  )
}
