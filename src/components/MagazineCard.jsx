export default function MagazineCard({ cover, onOpen }) {
  const {
    photo,
    objectPosition,
    masthead,
    issue,
    quote,
    quotePosition, // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  } = cover

  // Quote placement styles
  const quoteTopRight = quotePosition === 'top-right'
  const quoteTopLeft  = quotePosition === 'top-left'
  const quoteBotRight = quotePosition === 'bottom-right'
  const quoteBotLeft  = quotePosition === 'bottom-left'

  return (
    <div className="magazine-card" onClick={onOpen}>
      {/* Cover photo */}
      <img
        className="card-photo"
        src={photo}
        alt={masthead}
        style={{ objectPosition }}
      />

      {/* Overlays */}
      <div className="card-gradient" />
      <div className="card-spine" />
      <div className="card-edge" />

      {/* Content */}
      <div className="card-content">
        {/* Masthead */}
        <div className="card-masthead">{masthead}</div>

        {/* Top quotes */}
        {quoteTopRight && (
          <div
            className="card-quote"
            style={{
              textAlign: 'right',
              maxWidth: '60%',
              marginLeft: 'auto',
              marginTop: '4px',
            }}
          >
            "{quote}"
          </div>
        )}
        {quoteTopLeft && (
          <div
            className="card-quote"
            style={{
              textAlign: 'left',
              maxWidth: '60%',
              marginTop: '3px',
            }}
          >
            "{quote}"
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom quotes — sit just above issue title */}
        {quoteBotRight && (
          <div
            className="card-quote"
            style={{
              textAlign: 'right',
              maxWidth: '60%',
              marginLeft: 'auto',
              marginBottom: '4px',
              paddingBottom: '44px',
            }}
          >
            "{quote}"
          </div>
        )}
        {quoteBotLeft && (
          <div
            className="card-quote"
            style={{
              textAlign: 'left',
              maxWidth: '55%',
              marginBottom: '4px',
              paddingBottom: '28px',
            }}
          >
            "{quote}"
          </div>
        )}
      </div>

      {/* Issue title */}
      <div className="card-issue">{issue}</div>

      {/* Hover CTA */}
      <div className="card-hover-cta">click to know more</div>
    </div>
  )
}
