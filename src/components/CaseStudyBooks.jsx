import { useState } from 'react'

const BL = '#800020'
const MU = '#888888'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-block', padding: '2px 8px', border: '1px solid #ddd', fontFamily: "'EB Garamond', serif", fontSize: '10px', letterSpacing: '0.06em', color: MU, marginRight: '4px', marginBottom: '4px' }}>{children}</span>
)

/* ── Spiral spine — vertical rings down the centre ────────────────────── */
function Spiral() {
  return (
    <div style={{
      width: '20px',
      height: '100%',
      background: '#222',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: '12px 0',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      {Array.from({ length: 26 }).map((_, i) => (
        <div key={i} style={{
          width: '13px',
          height: '8px',
          border: '1.5px solid #777',
          borderRadius: '999px',
          background: '#1a1a1a',
          flexShrink: 0,
        }} />
      ))}
    </div>
  )
}

/* ── One open notebook ────────────────────────────────────────────────── */
function OpenNotebook({ leftContent, rightContent }) {
  return (
    <div style={{
      width: '400px',
      height: '520px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'row',
      border: '3px solid #1a1a1a',
      boxSizing: 'border-box',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
    }}>
      {/* Left page */}
      <div style={{
        flex: 1,
        background: '#fdfcf9',
        padding: '20px 16px 18px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
        {leftContent}
      </div>

      {/* Spiral spine */}
      <Spiral />

      {/* Right page */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {rightContent}
      </div>
    </div>
  )
}

/* ── Concierge ────────────────────────────────────────────────────────── */
function ConciergeNotebook() {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <OpenNotebook
      leftContent={<>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '10px' }}>Internal Tool · Endless · 2025</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '22px', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>THE<br />CONCIERGE<br />SYSTEM.</div>
        <div style={{ borderTop: '1px solid #e8e8e8', margin: '10px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.65, marginBottom: '8px' }}>
          The ops team was managing 400+ consignment items across a 100-tab Excel sheet. One tab per client, nothing connected to photos, pricing, or approvals.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.65, marginBottom: '12px' }}>
          I scoped and built a mobile app from scratch. Tap a client, see their items as photos, approve or reject, push live. Zero training needed.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
          {['React', 'Next.js', 'Supabase', 'SQL', 'Vercel'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU, lineHeight: 1.55 }}>"100 tabs to 1 app. Built and shipped in-house."</p>
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
            position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.78)', padding: '6px 12px',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>any email + any password works, it is a live demo</p>
          </div>
        </div>
      }
    />
  )
}

/* ── Vault ────────────────────────────────────────────────────────────── */
function VaultNotebook() {
  return (
    <OpenNotebook
      leftContent={<>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '10px' }}>Product Launch · March 2026</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '26px', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>THE<br />VAULT.</div>
        <div style={{ borderTop: '1px solid #e8e8e8', margin: '10px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.65, marginBottom: '8px' }}>
          March was slow. Instead of discounting, I pitched a password-gated drop: high-end brands under AED 250, positioned as a private edit.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.65, marginBottom: '12px' }}>
          Comment "Access" on the post and the password lands in your DMs automatically via ManyChat. I built that automation too.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
          {['ManyChat', 'Instagram API', 'Shopify', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ background: '#111', padding: '10px 12px' }}>
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#fff', letterSpacing: '0.05em', marginBottom: '3px' }}>AED 5,082 · 28 UNITS · 4% SELL-THROUGH</p>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>first drop, March 2026</p>
        </div>
      </>}
      rightContent={
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img src="/assets/vault-launch.gif" alt="The Vault launch" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.4))', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#111', padding: '4px 10px' }}>
            <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '8px', color: '#fff', letterSpacing: '0.14em', margin: 0 }}>THE VAULT</p>
          </div>
        </div>
      }
    />
  )
}

/* ── Meta ─────────────────────────────────────────────────────────────── */
function MetaNotebook() {
  return (
    <OpenNotebook
      leftContent={<>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: BL, marginBottom: '10px' }}>Performance Marketing · 2025</p>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '26px', color: '#111', lineHeight: 0.9, marginBottom: '10px' }}>100K<br />CLICKS.</div>
        <div style={{ borderTop: '1px solid #e8e8e8', margin: '10px 0' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.65, marginBottom: '8px' }}>
          No prior experience. No agency. AED 10,000+ monthly budget managed from scratch. Taught myself Meta Ads Manager, built all the creatives.
        </p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color: '#333', lineHeight: 1.65, marginBottom: '12px' }}>
          17 direct conversions from retargeting warm audiences who had already engaged with the brand on Instagram.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
          {['Meta Ads Manager', 'Instagram', 'Facebook', 'Retargeting', 'Klaviyo'].map(s => <Pill key={s}>{s}</Pill>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU, lineHeight: 1.55 }}>"Learned it, ran it, reported it. No template, no agency, no excuses."</p>
        </div>
      </>}
      rightContent={
        <div style={{ width: '100%', height: '100%', background: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', boxSizing: 'border-box' }}>
          {[
            { num: '100K+', label: 'website clicks' },
            { num: '17',    label: 'direct conversions' },
            { num: 'AED 0', label: 'agency fees' },
          ].map(({ num, label }, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '18px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', width: '100%' }}>
              <div style={{ fontFamily: "'VogueTTF', serif", fontSize: '42px', color: '#f8f5ef', lineHeight: 0.88 }}>{num}</div>
              <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '5px' }}>{label}</div>
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
    <div style={{
      /* break out of homepage-wrapper to use full viewport width */
      width: '100vw',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '64px 0 80px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(28px, 4vw, 48px)', color: '#111111', lineHeight: 0.88, letterSpacing: '0.02em' }}>MY FAVOURITE PROJECTS SO FAR.</div>
        <div style={{ width: '48px', height: '1px', background: BL, margin: '14px auto 0' }} />
      </div>

      {/* Notebooks row */}
      <div style={{
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: '0 40px',
      }}>
        <ConciergeNotebook />
        <VaultNotebook />
        <MetaNotebook />
      </div>
    </div>
  )
}
