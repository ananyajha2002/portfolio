export default function MuteButton({ muted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      title={muted ? 'Unmute' : 'Mute'}
      style={{
        position: 'fixed',
        top: '18px',
        right: '22px',
        zIndex: 300,
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.35)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s, border-color 0.2s',
        padding: 0,
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        {muted ? (
          /* Muted: speaker with X */
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5Z" fill="rgba(255,255,255,0.9)" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
          </>
        ) : (
          /* Unmuted: speaker with waves */
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5Z" fill="rgba(255,255,255,0.9)" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </>
        )}
      </svg>
    </button>
  )
}
