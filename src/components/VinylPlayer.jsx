export default function VinylPlayer({ muted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      title={muted ? 'Click to play' : 'Click to mute'}
      style={{
        position: 'fixed',
        top: '16px',
        right: '20px',
        zIndex: 300,
        width: '52px',
        height: '52px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        borderRadius: '50%',
      }}
    >
      {/* Spinning vinyl SVG */}
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
        {/* Outer record (dark) */}
        <circle cx="26" cy="26" r="26" fill="#1a1a1a" />

        {/* Grooves — concentric rings */}
        <circle cx="26" cy="26" r="23" fill="none" stroke="#2e2e2e" strokeWidth="0.8" />
        <circle cx="26" cy="26" r="21" fill="none" stroke="#2e2e2e" strokeWidth="0.7" />
        <circle cx="26" cy="26" r="19" fill="none" stroke="#2e2e2e" strokeWidth="0.7" />
        <circle cx="26" cy="26" r="17" fill="none" stroke="#2e2e2e" strokeWidth="0.6" />
        <circle cx="26" cy="26" r="15" fill="none" stroke="#333"    strokeWidth="0.6" />
        <circle cx="26" cy="26" r="13" fill="none" stroke="#333"    strokeWidth="0.5" />

        {/* Pink label */}
        <circle cx="26" cy="26" r="10" fill="#e8829a" />

        {/* Subtle shine on label */}
        <circle cx="26" cy="26" r="10" fill="url(#labelShine)" />

        {/* Center hole */}
        <circle cx="26" cy="26" r="2.2" fill="#1a1a1a" />

        {/* Muted indicator — small crossed speaker overlay on label */}
        {muted && (
          <g transform="translate(19, 19)">
            <path d="M5.5 3L3 5.5H1v3h2l2.5 2V3Z" fill="rgba(255,255,255,0.85)" />
            <line x1="9.5" y1="5" x2="7" y2="7.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.1" strokeLinecap="round"/>
            <line x1="7" y1="5" x2="9.5" y2="7.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.1" strokeLinecap="round"/>
          </g>
        )}

        {/* Label shine gradient def */}
        <defs>
          <radialGradient id="labelShine" cx="38%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
      </svg>
    </button>
  )
}
