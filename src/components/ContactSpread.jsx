/**
 * makeContactPage(opts)
 * Returns a JSX element. opts: { dark, light, issueName }
 * Called from App.jsx with dark='#111111', light='#800020'
 */
export function makeContactPage({ dark = '#111111', light = '#800020', issueName = '' }) {
  const L = ({ children }) => (
    <div className="mag-text-col" style={{ width: '50%', height: '100%', flexShrink: 0, background: dark, padding: '24px 14px 16px 22px', borderRight: `1px solid #2a2a2a`, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {children}
    </div>
  )
  const R = ({ children }) => (
    <div className="mag-text-col" style={{ width: '50%', height: '100%', flexShrink: 0, background: '#ffffff', padding: '24px 20px 16px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {children}
    </div>
  )

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <L>
        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: light }} />
        <div style={{ marginTop: '10px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Contact · Dubai, UAE</p>
        </div>

        {/* Name */}
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(28px, 8.5cqw, 50px)', color: '#ffffff', lineHeight: 0.85, letterSpacing: '0.01em', marginBottom: '12px', marginTop: '4px' }}>ANANYA<br />JHA.</div>

        <div style={{ borderTop: `1px solid rgba(255,255,255,0.15)`, margin: '0 0 12px' }} />

        {/* Status line */}
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '11.5px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, marginBottom: '14px' }}>Currently at Endless, Dubai.<br />Open to ops, innovation, and creative-technical roles in Dubai and Abu Dhabi.</p>

        {/* Contact details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(255,255,255,0.5)`, marginBottom: '2px' }}>Email</p>
            <a href="mailto:ananyajha23@gmail.com" style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#ffffff', textDecoration: 'none', letterSpacing: '0.04em' }}>ananyajha23@gmail.com</a>
          </div>
          <div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(255,255,255,0.5)`, marginBottom: '2px' }}>LinkedIn</p>
            <a href="https://www.linkedin.com/in/ananyajha23/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#ffffff', textDecoration: 'none', letterSpacing: '0.04em' }}>linkedin.com/in/ananyajha23</a>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Issue label */}
        {issueName && (
          <p style={{ fontFamily: "'VogueTTF', serif", fontSize: '10px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.12em', marginBottom: '4px' }}>{issueName}</p>
        )}
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '8.5px', letterSpacing: '0.14em', color: `rgba(137,207,240,0.45)` }}>© 2026 Ananya Jha</p>
      </L>

      <R>
        {/* Large decorative initial */}
        <div style={{ position: 'absolute', top: '-10px', right: '-8px', fontFamily: "'VogueTTF', serif", fontSize: 'clamp(120px, 35cqw, 200px)', color: '#111111', opacity: 0.04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>A</div>

        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888888', marginBottom: '8px' }}>Get in touch</p>

        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(18px, 5.5cqw, 28px)', color: '#111111', lineHeight: 0.88, letterSpacing: '0.02em', marginBottom: '12px', marginTop: '2px' }}>LET'S<br />WORK<br />TOGETHER.</div>

        <div style={{ borderTop: '1px solid #e0e0e0', margin: '0 0 14px' }} />

        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '11px', color: '#1a1a1a', lineHeight: 1.6, marginBottom: '16px' }}>Operations strategy, marketing analytics, automation engineering, data storytelling. Creative AND technical, equally. Available for full-time roles in Dubai and Abu Dhabi.</p>

        {/* Download CV button */}
        <a
          href="/assets/Ananya Jha CV.pdf"
          download
          onClick={e => e.stopPropagation()}
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: dark,
            color: '#ffffff',
            fontFamily: "'EB Garamond', serif",
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: `1px solid ${light}`,
            alignSelf: 'flex-start',
            cursor: 'pointer',
            transition: 'background 0.2s',
            marginBottom: '10px',
          }}
        >
          Download CV →
        </a>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '10px' }}>
          <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: '10px', color: '#888888', letterSpacing: '0.06em', lineHeight: 1.5 }}>Built with React · Vogue-inspired editorial design<br />Portfolio 2026</p>
        </div>
      </R>
    </div>
  )
}
