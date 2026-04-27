export default function VinylPlayer({ muted, onToggle, onNext, onPrev }) {
  return (
    <div
      className="vinyl-player-btn"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '16px',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {/* Tooltip */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(100% + 10px)',
        right: 0,
        background: 'rgba(20,20,20,0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '6px',
        padding: '8px 12px',
        whiteSpace: 'nowrap',
        fontFamily: "'EB Garamond', serif",
        fontStyle: 'italic',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: '0.04em',
        pointerEvents: 'none',
        opacity: 0,
        transform: 'translateY(4px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
      className="vinyl-tooltip"
      >
        turn it up. these are the ones.
      </div>

      {/* Vinyl disc — click to mute/unmute */}
      <button
        onClick={onToggle}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        title={muted ? 'Click to play' : 'Click to mute'}
        style={{
          width: '52px',
          height: '52px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
          borderRadius: '50%',
        }}
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          style={{
            display: 'block',
            animation: muted ? 'none' : 'vinylSpin 2.8s linear infinite',
            filter: muted
              ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.35)) grayscale(0.4) brightness(0.7)'
              : 'drop-shadow(0 2px 10px rgba(210,120,150,0.5))',
            transition: 'filter 0.4s ease',
          }}
        >
          <circle cx="26" cy="26" r="26" fill="#1a1a1a" />
          <circle cx="26" cy="26" r="23" fill="none" stroke="#2e2e2e" strokeWidth="0.8" />
          <circle cx="26" cy="26" r="21" fill="none" stroke="#2e2e2e" strokeWidth="0.7" />
          <circle cx="26" cy="26" r="19" fill="none" stroke="#2e2e2e" strokeWidth="0.7" />
          <circle cx="26" cy="26" r="17" fill="none" stroke="#2e2e2e" strokeWidth="0.6" />
          <circle cx="26" cy="26" r="15" fill="none" stroke="#333"    strokeWidth="0.6" />
          <circle cx="26" cy="26" r="13" fill="none" stroke="#333"    strokeWidth="0.5" />
          <circle cx="26" cy="26" r="10" fill="#e8829a" />
          <circle cx="26" cy="26" r="10" fill="url(#labelShine)" />
          <circle cx="26" cy="26" r="2.2" fill="#1a1a1a" />
          {muted && (
            <g transform="translate(19, 19)">
              <path d="M5.5 3L3 5.5H1v3h2l2.5 2V3Z" fill="rgba(255,255,255,0.85)" />
              <line x1="9.5" y1="5" x2="7" y2="7.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.1" strokeLinecap="round"/>
              <line x1="7" y1="5" x2="9.5" y2="7.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.1" strokeLinecap="round"/>
            </g>
          )}
          <defs>
            <radialGradient id="labelShine" cx="38%" cy="35%" r="60%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
        </svg>
      </button>

      {/* Prev / Next controls */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          onClick={onPrev}
          aria-label="Previous track"
          style={skipBtnStyle}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          ‹‹
        </button>
        <button
          onClick={onNext}
          aria-label="Next track"
          style={skipBtnStyle}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          ››
        </button>
      </div>
    </div>
  )
}

const skipBtnStyle = {
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: '20px',
  color: 'rgba(255,255,255,0.85)',
  fontFamily: "'EB Garamond', serif",
  fontSize: '13px',
  padding: '3px 10px',
  cursor: 'pointer',
  letterSpacing: '0.05em',
  transition: 'background 0.2s',
}
