import { useState, useEffect } from 'react'

const BL  = '#800020'
const MU  = '#888888'

const Pill = ({ children }) => (
  <span style={{
    display: 'inline-block', padding: '2px 8px',
    border: '1px solid #ddd',
    fontFamily: "'EB Garamond', serif", fontSize: '10px',
    letterSpacing: '0.06em', color: MU,
    marginRight: '4px', marginBottom: '4px',
  }}>{children}</span>
)

/* ── Single open book ─────────────────────────────────────────────────── */
function Book({ rotation = 0, leftContent, rightContent, rightBg = '#f5f4f0' }) {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      maxWidth: '720px',
      height: '420px',
      margin: '0 auto',
      transform: `rotate(${rotation}deg)`,
      boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)',
      borderRadius: '2px',
      flexShrink: 0,
    }}>
      {/* Left page */}
      <div style={{
        width: '50%',
        height: '100%',
        background: '#faf9f5',
        padding: '32px 28px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '2px 0 0 2px',
        boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.07)',
        position: 'relative',
      }}>
        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
        {leftContent}
      </div>

      {/* Spine */}
      <div style={{
        width: '10px',
        flexShrink: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.14), rgba(0,0,0,0.03) 40%, rgba(0,0,0,0.06))',
      }} />

      {/* Right page */}
      <div style={{
        flex: 1,
        height: '100%',
        background: rightBg,
        overflow: 'hidden',
        borderRadius: '0 2px 2px 0',
        boxShadow: 'inset 4px 0 8px rgba(0,0,0,0.04)',
        position: 'relative',
      }}>
        {rightContent}
      </div>
    </div>
  )
}

/* ── Book 1: Concierge System ─────────────────────────────────────────── */
const conciergeLeft = (
  <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '10px' }}>Internal Tool · Endless Dubai · 2025</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 4cqw, 30px)', color: '#111', lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: '10px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
    <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11.5px', color: '#333', lineHeight: 1.55, marginBottom: '6px' }}>The ops team was managing 400+ consignment items across a 100-tab Excel sheet. One tab per client. Nothing connected to photos, pricing, or approvals.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11.5px', color: '#333', lineHeight: 1.55, marginBottom: '10px' }}>I scoped and built a mobile app from scratch. Tap a client, see their items as photos, approve or reject, push live. Anyone on the team can use it with zero training.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
      {['React', 'Next.js', 'Supabase', 'Vercel', 'SQL'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10.5px', color: MU, lineHeight: 1.45 }}>100 tabs → 1 app. Built and shipped in-house.</p>
    </div>
  </>
)

const conciergeRight = (
  <iframe
    src="/assets/CONCIERGE/Concierge.html"
    title="Endless Concierge App"
    style={{
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block',
      background: '#1C1C18',
    }}
    scrolling="no"
  />
)

/* ── Book 2: The Vault ────────────────────────────────────────────────── */
const vaultLeft = (
  <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '10px' }}>Product Launch · Endless Dubai · March 2026</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(22px, 4.5cqw, 34px)', color: '#111', lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: '10px' }}>THE<br />VAULT.</div>
    <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11.5px', color: '#333', lineHeight: 1.55, marginBottom: '6px' }}>March was slow. Instead of discounting, I pitched a password-gated drop: high-end brands under AED 250, positioned as a private edit rather than a clearance event.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11.5px', color: '#333', lineHeight: 1.55, marginBottom: '10px' }}>Comment "Access" on the launch post, password lands in your DMs automatically via ManyChat. Built that too.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
      {['ManyChat', 'Shopify', 'Instagram API', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ background: '#111', padding: '10px 12px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '13px', color: '#fff', letterSpacing: '0.04em', marginBottom: '3px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>April performance, first drop</p>
    </div>
  </>
)

const vaultRight = (
  <>
    <img
      src="/assets/vault-launch.gif"
      alt="The Vault launch"
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
    />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#111', padding: '4px 10px' }}>
      <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#fff', letterSpacing: '0.16em' }}>THE VAULT</p>
    </div>
  </>
)

/* ── Book 3: Meta Ads ─────────────────────────────────────────────────── */
const metaLeft = (
  <>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '10px', marginTop: '10px' }}>Performance Marketing · Endless Dubai · 2025</p>
    <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(22px, 4.5cqw, 34px)', color: '#111', lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: '10px' }}>100K<br />CLICKS.</div>
    <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11.5px', color: '#333', lineHeight: 1.55, marginBottom: '6px' }}>No prior paid ads experience. No agency. AED 10,000+ monthly budget to manage from scratch.</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11.5px', color: '#333', lineHeight: 1.55, marginBottom: '10px' }}>Taught myself Meta Ads Manager, built the creatives, set the targeting, and optimised in real time. 17 direct conversions came from retargeting warm Instagram audiences.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
      {['Meta Ads Manager', 'Instagram', 'Facebook', 'Klaviyo', 'Retargeting'].map(s => <Pill key={s}>{s}</Pill>)}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px' }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10.5px', color: MU, lineHeight: 1.45 }}>Learned it, ran it, reported it. No template, no agency, no excuses.</p>
    </div>
  </>
)

const metaRight = (
  <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', boxSizing: 'border-box', gap: '0' }}>
    {[
      { num: '100K+', label: 'clicks to site' },
      { num: '17',    label: 'direct conversions' },
      { num: 'AED 0', label: 'agency spend' },
    ].map(({ num, label }, i) => (
      <div key={i} style={{ textAlign: 'center', padding: '16px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', width: '100%' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(28px, 6cqw, 42px)', color: '#f8f5ef', lineHeight: 0.9, letterSpacing: '0.02em' }}>{num}</div>
        <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', marginTop: '4px' }}>{label}</div>
      </div>
    ))}
  </div>
)

/* ── Section ──────────────────────────────────────────────────────────── */
export default function CaseStudyBooks() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  if (isMobile) {
    // On mobile: simplified card stack, no rotation, no iframe (too small)
    const books = [
      { eyebrow: 'Internal Tool · Endless Dubai · 2025', title: 'THE CONCIERGE SYSTEM.', body: 'Built a mobile app from scratch to replace a 100-tab Excel sheet. Any team member can review items as photos, approve, reject, and push live with zero training.', pills: ['React', 'Next.js', 'Supabase', 'SQL'], stat: '100 tabs → 1 app' },
      { eyebrow: 'Product Launch · March 2026', title: 'THE VAULT.', body: 'Password-gated drop under AED 250. Comment "Access", password arrives via DM automatically. AED 5,082 revenue, 28 units, 4% sell-through in the first month.', pills: ['ManyChat', 'Shopify', 'Klaviyo'], stat: 'AED 5,082 · 28 units' },
      { eyebrow: 'Performance Marketing · 2025', title: '100K CLICKS.', body: 'Self-taught Meta Ads from scratch. AED 10K+ monthly budget, no agency. 100,000+ clicks and 17 conversions from retargeting warm Instagram audiences.', pills: ['Meta Ads', 'Instagram', 'Retargeting'], stat: '100K+ clicks · 0 agencies' },
    ]
    return (
      <div style={{ width: '100%', padding: '0 20px 60px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BL, marginBottom: '6px' }}>Selected Work</p>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '28px', color: '#111', lineHeight: 0.88, letterSpacing: '0.02em' }}>THE WORK.</div>
          <div style={{ width: '40px', height: '1px', background: BL, margin: '10px auto 0' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {books.map((b, i) => (
            <div key={i} style={{ background: '#faf9f5', padding: '24px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>{b.eyebrow}</p>
              <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '22px', color: '#111', lineHeight: 0.88, marginBottom: '10px' }}>{b.title}</div>
              <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.55, marginBottom: '10px' }}>{b.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
                {b.pills.map(s => <Pill key={s}>{s}</Pill>)}
              </div>
              <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginTop: '8px' }}>
                <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10.5px', color: MU }}>{b.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '760px', margin: '0 auto', padding: '0 30px 80px', boxSizing: 'border-box' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>Selected Work</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(32px, 5vw, 48px)', color: '#111111', lineHeight: 0.88, letterSpacing: '0.02em' }}>THE WORK.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '12px auto 0' }} />
      </div>

      {/* Books */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
        <Book rotation={-1} leftContent={conciergeLeft} rightContent={conciergeRight} rightBg="#1C1C18" />
        <Book rotation={1}  leftContent={vaultLeft}     rightContent={vaultRight}     rightBg="#1a1a1a" />
        <Book rotation={-0.5} leftContent={metaLeft}   rightContent={metaRight}       rightBg="#111" />
      </div>
    </div>
  )
}
