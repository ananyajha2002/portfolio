import { useState } from 'react'

const BL = '#800020'
const MU = '#888888'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-block', padding: '2px 7px', border: '1px solid #ddd', fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.06em', color: MU, marginRight: '4px', marginBottom: '4px' }}>{children}</span>
)

function Spiral({ color = '#888' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', padding: '0 10px', boxSizing: 'border-box' }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{ width: '10px', height: '15px', border: `2px solid ${color}`, borderRadius: '999px', flexShrink: 0 }} />
      ))}
    </div>
  )
}

/* ── Individual open notebook ─────────────────────────────────────────── */
function OpenNotebook({ id, leftContent, rightContent }) {
  return (
    <div style={{
      flex: '1 1 280px',
      minWidth: '280px',
      maxWidth: '420px',
      height: '440px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 16px 48px rgba(0,0,0,0.22)',
      background: '#fff',
    }}>
      {/* Spiral strip */}
      <div style={{ height: '22px', background: '#eeebe3', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', flexShrink: 0 }}>
        <Spiral />
      </div>

      {/* Two pages */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left page */}
        <div style={{ width: '50%', background: '#fdfcf9', padding: '18px 14px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #e8e8e8', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
          {leftContent}
        </div>
        {/* Right page */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {rightContent}
        </div>
      </div>
    </div>
  )
}

/* ── Concierge notebook ───────────────────────────────────────────────── */
function ConciergeNotebook() {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <OpenNotebook
      id="concierge"
      leftContent={<>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>Internal Tool · Endless · 2025</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(15px, 2vw, 20px)', color: '#111', lineHeight: 0.9, marginBottom: '8px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
        <div style={{ borderTop: '1px solid #e8e8e8', margin: '8px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '6px' }}>
          The ops team was managing 400+ consignment items across a 100-tab Excel sheet. One tab per client. Nothing connected to photos, pricing, or approvals.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>
          I scoped and built a mobile app from scratch. Tap a client, see their items as photos, approve or reject, push live. Zero training needed.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
          {['React', 'Next.js', 'Supabase', 'SQL', 'Vercel'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '8px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: MU, lineHeight: 1.5 }}>"100 tabs to 1 app. Built and shipped in-house."</p>
        </div>
      </>}
      rightContent={
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ width: '100%', height: '100%', background: '#1C1C18', position: 'relative' }}
        >
          {!loaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.16em' }}>LOADING</p>
            </div>
          )}
          <iframe
            src="/assets/CONCIERGE/Concierge.html"
            title="Endless Concierge"
            onLoad={() => setLoaded(true)}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s' }}
          />
          <div style={{
            position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.75)', padding: '5px 10px',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.75)', margin: 0 }}>any email + any password works, it is a live demo</p>
          </div>
        </div>
      }
    />
  )
}

/* ── Vault notebook ───────────────────────────────────────────────────── */
function VaultNotebook() {
  return (
    <OpenNotebook
      id="vault"
      leftContent={<>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>Product Launch · March 2026</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 2.5vw, 26px)', color: '#111', lineHeight: 0.9, marginBottom: '8px' }}>THE<br />VAULT.</div>
        <div style={{ borderTop: '1px solid #e8e8e8', margin: '8px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '6px' }}>
          March was slow. Instead of discounting, I pitched a password-gated drop: high-end brands under AED 250, positioned as a private edit.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>
          Comment "Access" on the post and the password lands in your DMs automatically via ManyChat. I built that automation too.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
          {['ManyChat', 'Instagram API', 'Shopify', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ background: '#111', padding: '8px 10px' }}>
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: '#fff', letterSpacing: '0.05em', marginBottom: '2px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>first drop, March 2026</p>
        </div>
      </>}
      rightContent={
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img src="/assets/vault-launch.gif" alt="The Vault launch" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.4))', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#111', padding: '4px 8px' }}>
            <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '8px', color: '#fff', letterSpacing: '0.14em', margin: 0 }}>THE VAULT</p>
          </div>
        </div>
      }
    />
  )
}

/* ── Meta notebook ────────────────────────────────────────────────────── */
function MetaNotebook() {
  return (
    <OpenNotebook
      id="meta"
      leftContent={<>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '8px' }}>Performance Marketing · 2025</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 2.5vw, 26px)', color: '#111', lineHeight: 0.9, marginBottom: '8px' }}>100K<br />CLICKS.</div>
        <div style={{ borderTop: '1px solid #e8e8e8', margin: '8px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '6px' }}>
          No prior experience. No agency. AED 10,000+ monthly budget managed from scratch. Taught myself Meta Ads Manager, built all the creatives.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#333', lineHeight: 1.6, marginBottom: '10px' }}>
          17 direct conversions from retargeting warm audiences who had already engaged with the brand on Instagram.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '8px' }}>
          {['Meta Ads Manager', 'Instagram', 'Facebook', 'Retargeting', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '8px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: MU, lineHeight: 1.5 }}>"Learned it, ran it, reported it. No template, no agency, no excuses."</p>
        </div>
      </>}
      rightContent={
        <div style={{ width: '100%', height: '100%', background: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', boxSizing: 'border-box' }}>
          {[
            { num: '100K+', label: 'website clicks' },
            { num: '17',    label: 'direct conversions' },
            { num: 'AED 0', label: 'agency fees' },
          ].map(({ num, label }, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', width: '100%' }}>
              <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(26px, 4vw, 40px)', color: '#f8f5ef', lineHeight: 0.88 }}>{num}</div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      }
    />
  )
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function CaseStudyBooks() {
  return (
    <div style={{ width: '100%', padding: '48px 0 80px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(32px, 5vw, 52px)', color: '#111111', lineHeight: 0.88 }}>THE WORK.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '14px auto 0' }} />
      </div>

      {/* Three open notebooks side by side */}
      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        padding: '0 20px',
      }}>
        <ConciergeNotebook />
        <VaultNotebook />
        <MetaNotebook />
      </div>
    </div>
  )
}
