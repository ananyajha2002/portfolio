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
const H = ({ children, size = 'clamp(22px,6cqw,36px)', color = TX }) => (
  <h1 style={{ fontFamily: "'VogueTTF', serif", fontSize: size, color, lineHeight: 0.85, letterSpacing: '0.02em', marginBottom: '10px' }}>{children}</h1>
)
const B = ({ children, color = TX, style = {} }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color, lineHeight: 1.55, marginBottom: '5px', ...style }}>{children}</p>
)
const Rule = () => <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />
const RoleH = ({ children, color = MU }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color, marginBottom: '3px', marginTop: '8px' }}>{children}</p>
)
const Num = ({ n, total = 8 }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU, marginTop: 'auto', paddingTop: '6px', textAlign: 'right' }}>PROJECTS · {n} / {total}</p>
)
const Pill = ({ children }) => (
  <span style={{ display: 'inline-block', padding: '2px 7px', border: '1px solid #e0e0e0', fontFamily: "'EB Garamond', serif", fontSize: '9.5px', letterSpacing: '0.08em', color: MU, marginRight: '3px', marginBottom: '3px' }}>{children}</span>
)

const L = ({ children, photo }) => (
  <div className={photo ? '' : 'mag-text-col'} style={{ width: '50%', height: '100%', flexShrink: 0, background: photo ? 'transparent' : WH, padding: photo ? 0 : '24px 14px 16px 22px', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>{children}</div>
)
const R = ({ children, photo }) => (
  <div className={photo ? '' : 'mag-text-col'} style={{ width: '50%', height: '100%', flexShrink: 0, background: photo ? 'transparent' : WH2, padding: photo ? 0 : '24px 20px 16px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>{children}</div>
)

/* ── Spread 1 — Opening ──────────────────────────────────── */
export const ProjectsPage1 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Built at Endless · Dubai · 2025</K>
      </div>
      <div style={{ border: `1.5px solid ${BL}`, display: 'inline-block', padding: '4px 10px', marginBottom: '8px', alignSelf: 'flex-start' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: BL, letterSpacing: '0.2em' }}>THE BUILD ISSUE</p>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(30px, 9cqw, 50px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '10px', marginTop: '4px' }}>NO<br />MANUAL.</div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.45, marginBottom: '10px' }}>what I built when there was no playbook</p>
      <Rule />
      <B>The two builds I'm proudest of at Endless are the Vault and our two-hour delivery service. Both came from the same observation: in a market where pushing luxury feels increasingly out of touch with how people actually want to shop, the customers who do show up are looking for accessibility and ease.</B>
      <B>The Vault is the curated, edited storefront for our most considered pieces. Two-hour delivery is for everyone who'd rather not leave the house, which in this political moment is more people than the luxury industry wants to admit.</B>
      <B>Together they reframed what Endless could be: not just a circular fashion marketplace, but one that meets customers where they actually are.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '10px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.4 }}>"I built what the market was already asking for."</p>
      </div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: MU }}>Ananya Jha · Operations and Innovation</p>
      <Num n={1} total={14} />
    </L>
    <R photo>
      <img src="/assets/projects-cover.jpeg" alt="Projects" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent 20%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '14px', right: '14px', background: DK, padding: '4px 10px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#ffffff', letterSpacing: '0.12em' }}>PROJECTS</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', right: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>PROJECTS · 2 / 14</div>
    </R>
  </div>
)

/* ── Spread 2 — Automation ───────────────────────────────── */
export const ProjectsPage2 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '8px' }}>
        <K color={BL}>Automation · Endless Dubai</K>
      </div>
      <H size="clamp(22px, 7cqw, 38px)">THE STACK.</H>
      <Rule />
      <RoleH>N8N Automation Workflows</RoleH>
      <B>Multi-step pipelines connecting Shopify, Google Sheets, Klaviyo, and ManyChat. Order triggers, inventory alerts, and seller onboarding flows all running without manual input.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
        {['n8n', 'Shopify', 'Google Sheets', 'Webhooks'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <RoleH>ManyChat Seller Comms</RoleH>
      <B>WhatsApp and Instagram automation for seller onboarding, order updates, and listing approvals. Response times that used to take hours are now measured in minutes across the active seller base.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {['ManyChat', 'WhatsApp API', 'Instagram'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <div style={{ flex: 1 }} />
      <Num n={3} total={14} />
    </L>
    <R>
      <div style={{ height: '3px', background: BL, margin: '-24px -20px 12px -14px' }} />
      <RoleH>Shopify Flow Order Management</RoleH>
      <B>Custom Shopify Flow automations handling order routing, tagging, fulfillment triggers, and exception escalation, all of it running quietly behind the storefront so the team can focus on the work that actually needs a human.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
        {['Shopify Flow', 'Shopify Admin API', 'Zapier'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <RoleH>Klaviyo and Meta Dashboard Integration</RoleH>
      <B>Unified performance dashboard pulling Klaviyo email metrics, Meta ad spend, and Shopify revenue into a single weekly view, so reporting that used to take days now lands the same morning.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {['Klaviyo', 'Meta Ads API', 'Metabase', 'SQL'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '8px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU, lineHeight: 1.4 }}>"the stack is the spine of how Endless runs."</p>
      </div>
      <Num n={4} total={14} />
    </R>
  </div>
)

/* ── Spread 3 — Analytics ────────────────────────────────── */
export const ProjectsPage3 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '8px' }}>
        <K color={BL}>Analytics and Visibility · Endless Dubai</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 6cqw, 32px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '8px', marginTop: '2px' }}>SAME-DAY<br />VISIBILITY.</div>
      <Rule />
      <RoleH>Metabase Dashboards</RoleH>
      <B>Custom dashboards tracking orders, revenue, seller performance, and fulfillment SLAs. Replaced manual spreadsheet pulls with live, shareable views the founding team can open instead of asking for.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
        {['Metabase', 'SQL', 'Shopify', 'PostgreSQL'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <RoleH>Microsoft Clarity Tracking</RoleH>
      <B>Session recordings and heatmaps across endless.ae, identifying where users drop off so the listing pages and checkout flow can be optimized against real behavior rather than guesses.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {['Microsoft Clarity', 'Google Analytics'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <div style={{ flex: 1 }} />
      <Num n={5} total={14} />
    </L>
    <R>
      <div style={{ height: '4px', background: BL, margin: '-24px -20px 12px -14px' }} />
      <RoleH>Weekly KPI Reports</RoleH>
      <B>Automated weekly business review pulling Shopify, Klaviyo, Meta Ads, and fulfillment data, delivered every Monday before stand-up. No manual compilation required.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '4px' }}>
        {['n8n', 'Google Sheets', 'Klaviyo', 'Meta'].map(s => <Pill key={s}>{s}</Pill>)}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ background: DK, padding: '14px', marginBottom: '4px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 6cqw, 30px)', color: '#ffffff', lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: '6px' }}>3+ DAYS<br />TO SAME-DAY.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>same-day visibility into everything that matters</p>
      </div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU, textAlign: 'right', paddingTop: '6px' }}>PROJECTS · 6 / 14</p>
    </R>
  </div>
)

/* ── Spread 4 — The Vault ────────────────────────────────── */
export const ProjectsPage4 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L photo>
      <img src="/assets/vault-launch.gif" alt="The Vault" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.4) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '14px', left: '14px', background: DK, padding: '5px 12px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '11px', color: '#ffffff', letterSpacing: '0.18em' }}>THE VAULT</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', left: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.65)' }}>PROJECTS · 7 / 14</div>
    </L>
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Product Launch · Endless Dubai · March 2026</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(26px, 8cqw, 44px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '8px', marginTop: '4px' }}>THE<br />VAULT.</div>
      <Rule />
      <B>March was quieter than usual at Endless. So instead of panicking, I pitched something: a password-protected, buy-only corner of the site. Everything under 250 AED. Sandro, Maje, Meshki, Runaway, high-end brands at prices that made sense for the moment.</B>
      <B>The password gate was intentional. The Vault isn't a sale. It's a private drop, the way the next generation of shopping should feel: considered, curated, and worth seeking out.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '6px 0' }}>
        {['ManyChat', 'Instagram API', 'Shopify', 'Klaviyo'].map(s => (
          <span key={s} style={{ display: 'inline-block', padding: '2px 7px', border: '1px solid #e0e0e0', fontFamily: "'EB Garamond', serif", fontSize: '9.5px', color: MU, marginRight: '3px', marginBottom: '3px' }}>{s}</span>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ borderTop: `1px solid ${BL}`, borderBottom: `1px solid ${BL}`, padding: '10px 0', marginBottom: '8px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU, lineHeight: 1.5 }}>Comment 'Access' on the launch post, password lands in your DMs automatically. Built that myself too.</p>
      </div>
      <Num n={8} total={14} />
    </R>
  </div>
)

/* ── Spread 5 — March Pop-Up ─────────────────────────────── */
export const ProjectsPage5 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L photo>
      <img src="/assets/march-popup.jpeg" alt="March Pop-Up" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.72) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '14px', left: '14px', background: DK, padding: '5px 12px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '11px', color: '#ffffff', letterSpacing: '0.18em' }}>MARCH POP-UP</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', left: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.65)' }}>PROJECTS · 9 / 14</div>
    </L>
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Retail Operations · Endless Dubai · March 2026</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(24px, 7.5cqw, 42px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '8px', marginTop: '4px' }}>IRL.<br />IN FULL.</div>
      <Rule />
      <B>When Endless took its first physical space in March 2026, I ran the operational side end-to-end. Stock transfer from warehouse to pop-up floor, inventory tracking through the transition, seller coordination, and on-floor team logistics during trading hours.</B>
      <B>The goal was to translate the online experience into a physical one without losing momentum on orders running in parallel. Both had to work at the same time.</B>
      <B>In-person sales drove meaningful revenue for the month, making the case that circular fashion works beyond the screen.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '6px 0' }}>
        {['Stock Movement', 'Retail Ops', 'Seller Coordination', 'In-Person Sales', 'Inventory'].map(s => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ borderTop: `1.5px solid ${BL}`, padding: '10px 0' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(16px, 4.5cqw, 22px)', color: TX, lineHeight: 0.9, letterSpacing: '0.01em' }}>ONLINE AND<br />OFFLINE.<br />BOTH AT ONCE.</p>
      </div>
      <Num n={10} total={14} />
    </R>
  </div>
)

/* ── Spread 6 — Bike Boxes ───────────────────────────────── */
export const ProjectsPage6 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L photo>
      <img src="/assets/bike-delivery.jpg" alt="Endless 2-hour delivery" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.78) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 16px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 6cqw, 32px)', color: '#ffffff', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '6px' }}>DELIVERED<br />IN 2 HOURS.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Brand Design · Endless Dubai</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', right: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.65)' }}>PROJECTS · 11 / 14</div>
    </L>
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Brand Activation · Dubai · 2025</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 6cqw, 30px)', color: TX, lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: '8px', marginTop: '4px' }}>THE BIKE<br />BOXES.</div>
      <Rule />
      <B>Designed and produced the branded bike boxes that turned Endless delivery riders into moving billboards across Dubai. Pink, branded, and impossible to miss on the road.</B>
      <B>The brief was simple: make 2-hour delivery feel like a brand moment, not just a logistics function. The box design led with the Endless identity, same-day delivery messaging in both English and Arabic, and the URL front and centre.</B>
      <img src="/assets/bike-boxes.jpg" alt="Bike box designs" style={{ width: '100%', height: '130px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '1px', margin: '6px 0' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '4px 0' }}>
        {['Brand Design', 'Production', '2-Hour Delivery', 'OOH', 'Print'].map(s => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <Num n={12} total={14} />
    </R>
  </div>
)

/* ── Spread 7 — Meta Ads ─────────────────────────────────── */
export const ProjectsPage7 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '8px' }}>
        <K color={BL}>Performance Marketing · Endless Dubai</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(26px, 8cqw, 44px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '8px', marginTop: '4px' }}>100K<br />CLICKS.</div>
      <Rule />
      <RoleH>Meta Ads: Instagram and Facebook</RoleH>
      <B>Designed, launched, and managed Endless's Meta ad campaigns across Instagram and Facebook with no prior paid ads experience. Built the creatives, set the targeting, and optimised in real time.</B>
      <B>Result: over 100,000 clicks to the website and 17 direct conversions, all from scratch and without an agency.</B>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '4px 0' }}>
        {['Meta Ads Manager', 'Instagram', 'Facebook', 'Creative', 'Retargeting'].map(s => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <Num n={13} total={14} />
    </L>
    <R>
      <div style={{ height: '3px', background: BL, margin: '-24px -20px 12px -14px' }} />
      <RoleH>What was built</RoleH>
      <B>Full campaign setup: audience segmentation, ad set structure, creative brief and production, copy, and A/B testing across formats. Reported weekly against CPC, CTR, and conversion targets.</B>
      <RoleH>What made it work</RoleH>
      <B>No agency, no prior experience, no template. Every decision made by reading the data and iterating fast. The 17 conversions came from retargeting warm audiences who had already engaged with the brand on Instagram.</B>
      <div style={{ flex: 1 }} />
      <div style={{ background: DK, padding: '14px', marginBottom: '4px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 5cqw, 24px)', color: '#ffffff', lineHeight: 0.9, letterSpacing: '0.01em', marginBottom: '6px' }}>ZERO BUDGET<br />FOR AN AGENCY.<br />ZERO EXCUSES.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>learned it, ran it, reported it</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', marginTop: 'auto' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9px', color: BL, letterSpacing: '0.1em' }}>Get in Touch →</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU }}>PROJECTS · 14 / 14</p>
      </div>
    </R>
  </div>
)
