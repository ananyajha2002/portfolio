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
const B = ({ children, style = {}, color = TX }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', color, lineHeight: 1.55, marginBottom: '5px', ...style }}>{children}</p>
)
const Rule = () => <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />
const RoleH = ({ children, color = MU }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color, marginBottom: '3px', marginTop: '8px' }}>{children}</p>
)
const Num = ({ n, total = 8 }) => (
  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU, marginTop: 'auto', paddingTop: '6px', textAlign: 'right' }}>ACADEMIA · {n} / {total}</p>
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
export const AcademiaPage1 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Indiana University · Kelley School of Business · 2021–2024</K>
      </div>
      <div style={{ border: `1.5px solid ${BL}`, display: 'inline-block', padding: '4px 10px', marginBottom: '8px', alignSelf: 'flex-start' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '9px', color: BL, letterSpacing: '0.2em' }}>THE KNOWLEDGE ISSUE</p>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(24px, 7.5cqw, 44px)', color: TX, lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '10px', marginTop: '4px' }}>THE<br />INDIANA<br />YEARS.</div>
      <Rule />
      <B>I picked Indiana for Kelley, a top-ten business school in the country and the kind of name that opens doors I hadn't yet figured out I wanted to walk through. The move from Dubai to Bloomington was its own education before any class started.</B>
      <B>I deferred my first semester to COVID and still finished in three and a half years, leaving with two majors, a Dean's Honor List, and the kind of internships that turned into the rest of my career.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '10px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '12px', color: MU, lineHeight: 1.4 }}>"the degree that opened every door after it"</p>
      </div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: MU }}>Ananya Jha</p>
      <Num n={1} />
    </L>
    <R photo>
      <img src="/assets/kelley-grad-family.JPG" alt="Kelley graduation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent 20%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '14px', right: '14px', background: DK, padding: '4px 10px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: '#ffffff', letterSpacing: '0.12em' }}>ACADEMIA</p>
      </div>
      <div style={{ position: 'absolute', bottom: '18px', right: '18px', fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>ACADEMIA · 2 / 8</div>
    </R>
  </div>
)

/* ── Spread 2 — The Degree ───────────────────────────────── */
export const AcademiaPage2 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <L>
      <K>B.S. in Business · Economic Consulting and Business Analytics · Jan 2021–May 2024</K>
      <div style={{ position: 'relative', marginBottom: '4px', marginTop: '2px' }}>
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(52px, 14cqw, 76px)', color: TX, lineHeight: 0.88, opacity: 0.05, position: 'absolute', top: 0, left: -4 }}>3.51</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(42px, 12cqw, 64px)', color: TX, lineHeight: 0.88 }}>3.51</div>
          <div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: MU }}>out of 4.00</p>
            <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: BL, marginTop: '2px' }}>Dean's Honor List · Fall 2023 and Spring 2024</p>
          </div>
        </div>
      </div>
      <Rule />
      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
        {['Economic Consulting', 'Business Analytics'].map(m => (
          <span key={m} style={{ border: `1px solid ${TX}`, padding: '3px 10px', fontFamily: "'EB Garamond', serif", fontSize: '9.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: TX }}>{m}</span>
        ))}
      </div>
      <B>I co-majored in Economic Consulting and Business Analytics because I'd loved economics as an IB Higher Level course and I knew analytics was where business was headed. Economics gave me the lens, analytics gave me the tools, and both turned out to be the right bet.</B>
      <B>Kelley sits among the top public business schools in the country, the Business Analytics co-major is consistently ranked top ten, and the school is one of the country's leading producers of Fortune 500 executives. More than 1,450 companies recruit from Kelley each year.</B>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px', padding: '16px 32px 16px' }}>
        <video
          src="/assets/walking%20kelley%20grad.mp4"
          autoPlay muted loop playsInline
          style={{ width: '42%', aspectRatio: '9/16', objectFit: 'cover', display: 'block', marginBottom: '6px' }}
        />
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '8.5px', color: MU, letterSpacing: '0.08em' }}>Kelley School of Business · Class of 2024</p>
      </div>
      <Num n={3} />
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
      <K color={BL}>Top Skills</K>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
        {['Branding and Luxury Strategy', 'Fashion Operations Management', 'Luxury Goods and Retail'].map(s => (
          <span key={s} style={{ padding: '2px 8px', border: `1px solid ${BL}`, fontFamily: "'EB Garamond', serif", fontSize: '10px', color: BL }}>{s}</span>
        ))}
      </div>
      <Num n={4} />
    </R>
  </div>
)

/* ── Spread 3 — University Life ──────────────────────────── */
export const AcademiaPage3 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    {/* Left: text */}
    <L>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>University Life · Indiana · 2021–2023</K>
      </div>
      <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(22px, 7cqw, 36px)', color: TX, lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: '8px', marginTop: '2px' }}>BEYOND THE<br />CLASSROOM.</div>
      <Rule />
      <B>At Kelley I was Merchandise Chair for Gamma Phi Beta, my sorority. The role was technically about apparel, but really it was about brand: I curated what we wore for recruitment and philanthropy, and what people associate with the chapter still owes something to those choices.</B>
      <B>We ran two philanthropic events that year, Moonball and Gamma Fry, and together they raised eighteen thousand dollars for Girls On The Run. I helped run both, and what I loved most was meeting the potential new members and the donors who genuinely wanted to give.</B>
      <B>I also sat on the Global Awareness Committee at Women and Co, where we ran presentations on diverse cultures and countries to make a Midwest campus a little less self-contained.</B>
      <div style={{ flex: 1 }} />
      <div style={{ borderLeft: `2px solid ${BL}`, paddingLeft: '10px', marginBottom: '10px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11px', color: MU, lineHeight: 1.4 }}>"I learned more from running events than from sitting in them."</p>
      </div>
      <Num n={5} />
    </L>
    {/* Right: Gamma Phi Beta photo full bleed */}
    <R photo>
      <img src="/assets/gamma-phi-beta.JPEG" alt="Gamma Phi Beta graduating class" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em', lineHeight: 1.4 }}>Gamma Phi Beta · Class of 2024</p>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', marginLeft: '8px' }}>ACADEMIA · 6 / 8</p>
        </div>
      </div>
    </R>
  </div>
)

/* ── Spread 4 — School Years (High School) ───────────────── */
export const AcademiaPage4 = (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    {/* Left: DAA graduation photo */}
    <L photo>
      <img src="/assets/daa-grad.JPG" alt="Dubai American Academy graduation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.88) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 14px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(20px, 6cqw, 30px)', color: '#ffffff', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '6px' }}>THE IB YEARS.</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Dubai, UAE · 2018–2020</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>Dubai American Academy · IB Diploma</p>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', marginLeft: '8px' }}>ACADEMIA · 7 / 8</p>
        </div>
      </div>
    </L>
    {/* Right: school experience */}
    <R>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: BL }} />
      <div style={{ marginTop: '10px' }}>
        <K color={BL}>Dubai · 2005–2020</K>
      </div>
      <H size="clamp(18px, 5.5cqw, 28px)">THE SCHOOL<br />YEARS.</H>
      <Rule />
      <B>Three schools in Dubai over fifteen years: The Indian High School from KG1 through Grade 7, Emirates International School Jumeirah through Grade 10, and GEMS Dubai American Academy for the IB Diploma in Grades 11 and 12.</B>
      <B>At DAA I took Higher Level Economics, Psychology, and Language and Literature, with Standard Level Math, Physics, and Spanish ab initio. The IB taught me to think across disciplines, and economics in particular set the lens I'd carry into Kelley.</B>
      <B>Each school taught me something different. Indian High gave me the academic rigor that Indian schools build into every subject. Emirates International introduced me to the international curriculum. DAA ran the most demanding coursework and prepared me for what came next.</B>
      <div style={{ flex: 1 }} />
      <div style={{ background: DK, padding: '14px', marginBottom: '2px' }}>
        <p style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(14px, 4.5cqw, 20px)', color: '#ffffff', lineHeight: 0.9, letterSpacing: '0.02em' }}>DUBAI SCHOOLED HER<br />LONG BEFORE<br />INDIANA GRADUATED HER.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '9px', color: BL, letterSpacing: '0.1em' }}>Get in Touch →</p>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.12em', color: MU }}>ACADEMIA · 8 / 8</p>
      </div>
    </R>
  </div>
)
