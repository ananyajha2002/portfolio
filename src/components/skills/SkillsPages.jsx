const BL  = '#800020'
const DK  = '#111111'
const TX  = '#111111'
const MU  = '#888888'
const WH  = '#ffffff'
const WH2 = '#f8f8f8'

/* ── Shared primitives ─────────────────────────────────────── */
const K = ({ children, color }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: color || MU, marginBottom: '8px', lineHeight: 1 }}>{children}</p>
)
const B = ({ children, style = {}, color = TX }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color, lineHeight: 1.55, marginBottom: '5px', ...style }}>{children}</p>
)
const Rule = () => <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />

const SkillGroup = ({ title, skills }) => (
  <div style={{ marginBottom: '10px' }}>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: MU, marginBottom: '5px' }}>{title}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
      {skills.map(s => (
        <span key={s} style={{ padding: '2px 8px', border: '1px solid #e0e0e0', fontFamily: "'EB Garamond', serif", fontSize: '10.5px', color: TX }}>{s}</span>
      ))}
    </div>
  </div>
)

const Cert = ({ name, issuer, year }) => (
  <div style={{ border: '1px solid #e0e0e0', padding: '7px 10px', marginBottom: '6px', background: WH }}>
    <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '11.5px', color: TX, letterSpacing: '0.03em', marginBottom: '2px' }}>{name}</p>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', color: BL, letterSpacing: '0.1em' }}>{issuer} · {year}</p>
  </div>
)

const L = ({ children, photo }) => (
  <div className={photo ? '' : 'mag-text-col'} style={{ width: '50%', height: '100%', flexShrink: 0, background: photo ? 'transparent' : WH, padding: photo ? 0 : '24px 14px 16px 22px', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>{children}</div>
)
const R = ({ children, photo }) => (
  <div className={photo ? '' : 'mag-text-col'} style={{ width: '50%', height: '100%', flexShrink: 0, background: photo ? 'transparent' : WH2, padding: photo ? 0 : '24px 20px 16px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>{children}</div>
)

/* ── Spread 1 — Opening ──────────────────────────────────── */
export const SkillsPage1 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>The Toolkit · Dubai, UAE</K>
      </div>
      <div style={{ border: `1.5px solid ${BL}`, display: 'inline-block', padding: '4px 10px', marginBottom: '8px', alignSelf: 'flex-start' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: BL, letterSpacing: '0.2em' }}>THE SKILLS ISSUE</p>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(30px, 9cqw, 52px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '10px', marginTop: '4px' }}>CERTIFIED.</div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.45, marginBottom: '10px' }}>certified, self-taught and still learning</p>
      <Rule />
      <B>Operations strategy, marketing analytics, automation engineering, and data storytelling, built across five cities and three industries and counting.</B>
      <B>Every tool here has been used in production. Every certification was earned through coursework, not just a badge. The self-taught half is where most of my real learning happens: YouTube, documentation, breaking things in dev environments, and asking better questions on the second pass.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '10px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.4 }}>"certified, self-taught and still learning"</p>
      </div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: MU }}>Ananya Jha</p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU, textAlign: 'right', paddingTop: '6px', marginTop: 'auto' }}>SKILLS · 1 / 4</p>
    </L>
    <R photo>
      <img src="/assets/skills-cover.jpeg" alt="Skills" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent 20%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '14px', right: '14px', background: DK, padding: '4px 10px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#ffffff', letterSpacing: '0.12em' }}>SKILLS</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', right: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>SKILLS · 2 / 4</div>
    </R>
  </div>
)

/* ── Spread 2 — Skills and Certs ─────────────────────────── */
export const SkillsPage2 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K>Capabilities and Tools</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 5.5cqw, 30px)', color: TX, lineHeight: 0.88, letterSpacing: '0.02em', marginBottom: '10px' }}>THE TOOLKIT.</div>
      <Rule />
      <SkillGroup title="Operations" skills={['Marketplace Ops', 'Inventory Management', 'SOPs', 'Seller Onboarding', 'Logistics']} />
      <SkillGroup title="Tech and Automation" skills={['Shopify', 'n8n', 'Zapier', 'Shopify Flow', 'ManyChat', 'Power Automate']} />
      <SkillGroup title="Analytics" skills={['Metabase', 'Microsoft Clarity', 'SQL', 'KPI Dashboards', 'Excel']} />
      <SkillGroup title="Marketing" skills={['Meta Ads', 'Klaviyo', 'SEO', 'Performance Marketing']} />
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU, textAlign: 'right', paddingTop: '6px', marginTop: 'auto' }}>SKILLS · 3 / 4</p>
    </L>
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Certifications</K>
      </div>
      <Cert name="INSIDE LVMH CERTIFICATE" issuer="LVMH" year="2025" />
      <Cert name="LEAN SIX SIGMA GREEN BELT" issuer="Six Sigma Global Institute" year="2024" />
      <Cert name="DATA ANALYTICS" issuer="Six Sigma Global Institute" year="2024" />
      <Cert name="FUNDAMENTALS OF DIGITAL MARKETING" issuer="Google" year="2023" />
      <div style={{ flex: 1 }} />
      <div style={{ borderTop: `1.5px solid ${BL}`, borderBottom: `1.5px solid ${BL}`, padding: '10px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 5cqw, 26px)', color: TX, lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: '4px' }}>EVERY TOOL<br />EARNED.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU, lineHeight: 1.4 }}>every tool earned, every cert used</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9px', color: BL, letterSpacing: '0.1em' }}>Get in Touch →</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU }}>SKILLS · 4 / 4</p>
      </div>
    </R>
  </div>
)
