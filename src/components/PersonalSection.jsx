import { useState } from 'react'

const POLAROIDS = [
  {
    id: 'food',
    type: 'image',
    src: '/assets/food.JPG',
    objectPosition: 'center center',
    caption: 'Foodie',
    rotate: '-2.5deg',
    back: "food is the way to my heart.",
  },
  {
    id: 'family',
    type: 'image',
    src: '/assets/family.JPG',
    objectPosition: 'center top',
    caption: 'Family',
    rotate: '2deg',
    back: "we're a family of four and they are my built in best friends.",
  },
  {
    id: 'fashion',
    type: 'image',
    src: '/assets/fashion.jpg',
    objectPosition: 'center bottom',
    caption: 'Fashion',
    rotate: '-3deg',
    back: "fashion isn't just clothes. it's how I tell my story before I even say a word.",
  },
  {
    id: 'travel',
    type: 'video',
    src: '/assets/paris-travel.MP4',
    caption: 'Travel',
    rotate: '-1.5deg',
    back: 'always somewhere new. the world is too big to stay still.',
  },
  {
    id: 'makeup',
    type: 'image',
    src: '/assets/makeup.JPG',
    objectPosition: 'center center',
    caption: 'Makeup & Beauty',
    rotate: '3deg',
    back: 'makeup taught me that confidence is something you create. presenting my best self is never an afterthought.',
  },
  {
    id: 'animals',
    type: 'image',
    src: '/assets/animals.jpg',
    objectPosition: 'center center',
    caption: 'Animal Lover',
    rotate: '-1deg',
    back: "every animal is a friend I haven't met yet.",
  },
  {
    id: 'indian-clothing',
    type: 'image',
    src: '/assets/indian clothing.JPG',
    objectPosition: 'center top',
    caption: 'Indian Fashion',
    rotate: '2.5deg',
    back: 'dressing up in indian clothing is a whole other kind of elegance. the jewellery, the drape, the occasion. nothing compares.',
  },
  {
    id: 'horse-riding',
    type: 'image',
    src: '/assets/horse-riding.jpg',
    objectPosition: 'center center',
    caption: 'Horse Riding',
    rotate: '-2deg',
    back: 'horse riding taught me stillness and presence. there is something about being on a horse that nothing else quite replaces.',
  },
]

function Polaroid({ type, src, objectPosition, caption, rotate, back }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`polaroid-card${flipped ? ' flipped' : ''}`}
      style={{ '--rotate': rotate }}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="polaroid-inner">
        {/* Front */}
        <div className="polaroid-front">
          {type === 'video' ? (
            <video
              className="polaroid-photo"
              src={src}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              className="polaroid-photo"
              src={src}
              alt={caption}
              style={{ objectPosition }}
            />
          )}
          <div className="polaroid-caption">{caption}</div>
          <div className="polaroid-tap-hint">tap to flip</div>
        </div>

        {/* Back */}
        <div className="polaroid-back">
          <p className="polaroid-back-text">{back}</p>
        </div>
      </div>
    </div>
  )
}


export default function PersonalSection() {
  return (
    <div className="personal-section">
      <div className="personal-header">
        <div className="personal-rule" />
        <p className="personal-label">& personally</p>
        <div className="personal-rule" />
      </div>

      <p className="personal-intro">the person behind the portfolio</p>

      <div className="polaroids-row">
        {POLAROIDS.map(p => (
          <Polaroid key={p.id} {...p} />
        ))}
      </div>

      {/* ── Reach out ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px', width: '100%', maxWidth: '520px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(17,17,17,0.25)' }} />
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(10px, 1.8vw, 13px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#111111', whiteSpace: 'nowrap' }}>reach out</p>
          <div style={{ flex: 1, height: '1px', background: 'rgba(17,17,17,0.25)' }} />
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[
            { href: 'mailto:ananyajha23@gmail.com', label: 'Email Me →' },
            { href: 'https://www.linkedin.com/in/ananyajha23/', label: 'LinkedIn →', target: '_blank', rel: 'noopener noreferrer' },
          ].map(({ href, label, target, rel }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={rel}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '13px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textDecoration: 'none',
                background: '#111111',
                border: '1px solid #800020',
                padding: '14px 32px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#800020' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#111111' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Sign-off ── */}
      <div style={{ textAlign: 'center', marginTop: '48px', paddingBottom: '12px' }}>
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(10px, 1.8vw, 13px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#111111', marginBottom: '4px' }}>Yours truly,</p>
        <p style={{ fontFamily: "'LaSeduction', cursive", fontSize: 'clamp(28px, 5vw, 40px)', color: '#111111', lineHeight: 1, letterSpacing: '0.02em' }}>Ananya</p>
      </div>
    </div>
  )
}
