import { useEffect, useRef } from 'react'

// Equirectangular 2560×1280 (matches the world map image)
// x = (lon + 180) / 360 * 2560  |  y = (90 - lat) / 180 * 1280
// Atlanta  (-84.39°W, 33.75°N) → x=680,  y=400
// Dubai    ( 55.30°E, 25.20°N) → x=1675, y=461

const CITIES = [
  { id: 'atlanta', cx: 680,  cy: 400, label: 'ATLANTA', lx: 680,  ly: 365 },
  { id: 'dubai',   cx: 1675, cy: 461, label: 'DUBAI',   lx: 1675, ly: 425 },
]

// Arc from Atlanta east over the Atlantic/Mediterranean to Dubai
const PATH = 'M 680,400 C 780,240 1300,190 1675,461'

export default function WorldMap() {
  const pathRef = useRef(null)

  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    const len = el.getTotalLength()
    el.style.strokeDasharray  = len
    el.style.strokeDashoffset = len
    const t = setTimeout(() => {
      el.style.transition       = 'stroke-dashoffset 2.6s cubic-bezier(0.4, 0, 0.2, 1)'
      el.style.strokeDashoffset = '0'
    }, 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ width: '100%', position: 'relative', marginTop: '8px' }}>
      {/* Real world map image */}
      <img
        src="/assets/world%20map.jpg"
        alt="World map"
        style={{ width: '100%', display: 'block', opacity: 0.88, borderRadius: '1px' }}
      />

      {/* SVG overlay — same aspect ratio as the image (2:1) */}
      <svg
        viewBox="0 0 2560 1280"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        aria-label="Journey: Atlanta to Dubai"
      >
        {/* Animated dashed path */}
        <path
          ref={pathRef}
          d={PATH}
          fill="none"
          stroke="#b8915a"
          strokeWidth="9"
          strokeDasharray="28 16"
          strokeLinecap="round"
        />

        {/* City markers */}
        {CITIES.map(c => (
          <g key={c.id}>
            {/* Pulse ring */}
            <circle
              cx={c.cx} cy={c.cy} r="28"
              fill="#b8915a" opacity="0.18"
              style={{ animation: 'mapPulse 2.2s ease-in-out infinite' }}
            />
            {/* Outer dot */}
            <circle cx={c.cx} cy={c.cy} r="12" fill="#b8915a" />
            {/* Inner dot */}
            <circle cx={c.cx} cy={c.cy} r="7"  fill="#f5ede0" />
            {/* Label */}
            <text
              x={c.lx} y={c.ly}
              textAnchor="middle"
              fill="#2a1a08"
              fontSize="32"
              fontFamily="'EB Garamond', serif"
              letterSpacing="5"
              fontWeight="600"
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
