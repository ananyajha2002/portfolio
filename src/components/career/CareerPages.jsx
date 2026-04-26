import WorldMap from '../WorldMap'

const BL  = '#800020'   // baby blue accent
const DK  = '#111111'   // black (pull quotes / small boxes only)
const TX  = '#111111'   // body text
const MU  = '#888888'   // muted labels
const WH  = '#ffffff'   // white page
const WH2 = '#f8f8f8'   // off-white page

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
const Num = ({ n }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU, marginTop: 'auto', paddingTop: '6px', textAlign: 'right' }}>CAREER · {n} / 10</p>
)
const PullQ = ({ children }) => (
  <div style={{ background: DK, padding: '10px 12px', marginBottom: '2px' }}>
    <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11.5px', color: '#ffffff', lineHeight: 1.4 }}>{children}</p>
  </div>
)

const L = ({ children, photo }) => (
  <div className={photo ? '' : 'mag-text-col'} style={{ width: '50%', height: '100%', flexShrink: 0, background: photo ? 'transparent' : WH, padding: photo ? 0 : '24px 14px 16px 22px', borderRight: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>{children}</div>
)
const R = ({ children, photo }) => (
  <div className={photo ? '' : 'mag-text-col'} style={{ width: '50%', height: '100%', flexShrink: 0, background: photo ? 'transparent' : WH2, padding: photo ? 0 : '24px 20px 16px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>{children}</div>
)

/* ── Spread 1 — Opening ──────────────────────────────────── */
export const CareerPage1 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '8px' }}>
        <K color={BL}>Operations and Innovation · Dubai · 2025–Present</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(36px, 10cqw, 58px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '10px', marginTop: '6px' }}>ENDLESS.</div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.45, marginBottom: '10px' }}>building the systems behind UAE's leading circular fashion platform</p>
      <Rule />
      <B>I found Endless by accident. I was filming a TikTok about small UAE fashion brands and they were one of the spotlights, so I went researching for footage and stumbled onto their Instagram story: "We are hiring." I applied within the week.</B>
      <B>The interview was with Rosie and Chris, the two founders. I'd applied for an assistant role; by the end of the call they'd offered me a manager title they didn't have on the books.</B>
      <B>Seven months in, I'm wearing nine hats at any given moment. Operations is on my title, but the work bleeds into everything: Meta ads I taught myself by watching YouTube and trusting my instinct as a customer, events I run as if they were product launches, logistics, automation, brand partnerships, email marketing, the lot. The rest I learn on the way.</B>
<B>This is what I do at Endless. I take messy, undocumented, half-broken things and make them legible, then I make them automatic, then I make them scale.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '10px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.4 }}>"I came in for an assistant job and walked out with a manager one."</p>
      </div>
      <Num n={1} />
    </L>
    <R photo>
      <img src="/assets/career-cover.jpeg" alt="Endless" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
      <div className="card-gradient" />
      <div style={{ position: 'absolute', top: '14px', right: '14px', background: DK, padding: '4px 10px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#ffffff', letterSpacing: '0.12em' }}>THE INNOVATION ISSUE</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', right: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>CAREER · 2 / 10</div>
    </R>
  </div>
)

/* ── Spread 2 — No Playbook ──────────────────────────────── */
export const CareerPage2 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <K>The Work · Endless Dubai</K>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(34px, 10cqw, 52px)', color: TX, lineHeight: 0.82, letterSpacing: '0.01em', marginBottom: '8px', marginTop: '2px', hyphens: 'none', wordBreak: 'keep-all' }}>NO<br />PLAYBOOK.</div>
      <Rule />
      <RoleH>Operations</RoleH>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '3px' }}>I built the Endless Concierge from scratch. The premise is simple: customers send us their wardrobes, we pick up, curate, photograph, list, and sell, and we take a thirty percent commission. The hardest part wasn't the logistics, which were solvable; it was the curation, which wasn't. I built the process that decides which pieces actually move, which ones don't, and how to tell a seller their item isn't right without losing them.</B>
      <RoleH>Automation</RoleH>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '3px' }}>My favorite isn't the most complex one I've built. It's the simplest: comment on an Endless Instagram post, get a DM with the link to the item. I built it in an afternoon, and it drives more conversions than the campaigns we plan for weeks.</B>
      <RoleH>Growth</RoleH>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '3px' }}>I run our Meta ads on a budget of over ten thousand dirhams a month, all of it self-taught from YouTube and from my own instincts as a customer. I know what I'd click on and what I'd ignore, and that's been more useful than any course I could have taken.</B>
      <RoleH>Visibility</RoleH>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '3px' }}>I built the live target chart the team checks every Monday. It shows where we should be by this point in the month and where we actually are, with no spreadsheet pulls and no manual updates, so the founders walk into the week already knowing the gap.</B>
      <div style={{ flex: 1 }} />
      <PullQ>no playbook. just build it.</PullQ>
      <Num n={3} />
    </L>
    <R photo>
      <img src="/assets/endless-team.JPG" alt="Endless team" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em' }}>With the team at Endless, hiring, training, and building from zero</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', flexShrink: 0, marginLeft: '8px' }}>CAREER · 4 / 10</p>
      </div>
    </R>
  </div>
)

/* ── Spread 3 — Atlanta ──────────────────────────────────── */
export const CareerPage3 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L photo>
      <img src="/assets/coa-headshot.JPG" alt="City of Atlanta" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.88) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 5cqw, 26px)', color: '#ffffff', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '4px' }}>ATLANTA<br />TO DUBAI.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em' }}>two cities. one through-line.</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', right: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)' }}>CAREER · 5 / 10</div>
    </L>
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Atlanta, GA · 2023–2025</K>
      </div>
      <H size="clamp(16px, 5cqw, 24px)">THE CITY THAT TAUGHT ME EVERYTHING.</H>
      <Rule />
      <B>I came to Atlanta the summer of my junior year for an internship at the City of Atlanta's procurement office, where everything was still on paper. The new Chief Procurement Officer had just launched a Center of Excellence to digitize and rebuild the function from the ground up, and I joined as a Business Analyst intern.</B>
      <B>By fall they'd extended me part-time, and a few months later they offered me full-time as Innovation Strategist. I spent eight months meeting with vendors and finding the tech that would replace decades of paper, and the flagship project ended up being a $1.1 million AI-powered jail management system that I led solo as procurement's representative.</B>
      <B>When my OPT visa was running out, I asked the Chief Procurement Officer if I could spend my last months at the Department of Aviation, working at Hartsfield-Jackson, the world's busiest airport. She said yes. I drafted the SOPs that took workforce programs, the ones that train people from underserved communities and GED programs, and made them scale across teams.</B>
      <B>Atlanta is where I learned to be an adult after college. Not in the room yet, not exactly, but watching closely from the edge of it.</B>
      <div style={{ flex: 1 }} />
      <PullQ>"a junior-year intern shipped a million-dollar AI build for a jail."</PullQ>
      <Num n={6} />
    </R>
  </div>
)

/* ── Spread 4 — Dubai Roots + Before the Title (combined) ── */
export const CareerPage4 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    {/* Left: Dubai Roots */}
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '8px' }}>
        <K color={BL}>Dubai, UAE · Summer 2022</K>
      </div>
      <div style={{ border: `1.5px solid ${BL}`, display: 'inline-block', padding: '3px 8px', marginBottom: '6px', alignSelf: 'flex-start' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '8px', color: BL, letterSpacing: '0.2em' }}>WHERE IT STARTED</p>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 6cqw, 32px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '8px' }}>DUBAI<br />ROOTS.</div>
      <Rule />
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>Three internships in one summer, all of them in the city I grew up in.</B>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>At PwC Middle East I was a Deals intern working on a financial restructuring case for a petrochemical company in Saudi Arabia, reading the statements and helping diagnose where the problems were. I didn't present, I watched, mostly, and what I learned was that grown-up consulting is half spreadsheet and half power dynamics.</B>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>At 6thStreet I taught myself SEO on the job, and within weeks I was running competitor analysis that fed their content strategy. I came in green and left fluent.</B>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>At Brand New Galaxy MEA I built customer trend analyses in Excel and ended up presenting them to the Nestle marketing team — the work that drove an eight percent sales lift across the e-retailers we tracked.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '6px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: MU, lineHeight: 1.4 }}>"I learned digital marketing in the city about to be built on it."</p>
      </div>
      <Num n={7} />
    </L>
    {/* Right: Before the Title */}
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '8px' }}>
        <K color={BL}>Building the foundation · 2019–2021</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 6cqw, 32px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '8px' }}>BEFORE<br />THE<br />TITLE.</div>
      <Rule />
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>COVID cancelled school and I deferred a semester, so while most of my class waited it out, I went looking for work.</B>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>At eighteen I was at Zee Media, sitting in programming meetings where adults debated whether a show was "too serious for primetime." I took it more seriously than they did. That same year I was producing lifestyle and culture content for @thesolmag, writing for an audience I was technically part of, and hosting corporate team-building events at Innovations Group UAE, where I learned that grown adults will follow you anywhere if you can keep a room laughing.</B>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>At nineteen I was at Tata AMC, the only researcher in the room who had never traded a stock, tracking Indian firms' financial performance and the country's economic landscape for an investment audience.</B>
      <B style={{ fontSize: '10px', lineHeight: 1.5, marginBottom: '4px' }}>None of it was strategic. All of it was reconnaissance.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '6px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: MU, lineHeight: 1.4 }}>"before the framework, the foundation."</p>
      </div>
      <Num n={8} />
    </R>
  </div>
)

/* ── Spread 6 — Mundrika Collection ─────────────────────── */
export const CareerPage6 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    {/* Left: photo of Ananya and mom in Mundrika sarees */}
    <L photo>
      <img src="/assets/mundrika.JPG" alt="Mundrika Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.82) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(22px, 6cqw, 34px)', color: '#ffffff', lineHeight: 0.9, letterSpacing: '0.02em' }}>MUNDRIKA<br />COLLECTION.</p>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', marginLeft: '8px' }}>CAREER · 9 / 10</p>
        </div>
      </div>
    </L>
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Business and Creative Lead · Mar 2018–Present</K>
      </div>
      <RoleH>Mundrika Collection</RoleH>
      <B>Mundrika is my mother's saree label, named after my grandmother. The saree is India's oldest garment, woven into every region and every generation at every occasion that ever meant something, and yet the art of draping one is quietly fading. Most women today reach for stitched alternatives or skip it altogether, and my mother built Mundrika because she could not watch that happen. She has always been a saree wearer, and she built a business around selling what she has always loved to wear.</B>
      <B>The foundation came earlier. At sixteen, my first paid job was the retail floor at Love Shop Pray in Jumeirah. Mundrika followed, and with it came everything: marketing, shoots, bespoke orders, licensing, captions, and exhibitions across Dubai.</B>
      <B>My mother is an exhibitor by trade. I run the business side she never had to think about and represent the brand at pop-ups across the city.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '8px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU, lineHeight: 1.4 }}>"mundrika taught me business before any classroom did."</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9px', color: BL, letterSpacing: '0.1em' }}>Get in Touch →</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU }}>CAREER · 10 / 10</p>
      </div>
    </R>
  </div>
)
