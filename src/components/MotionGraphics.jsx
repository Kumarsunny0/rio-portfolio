const B = '#168BFF', C = '#58D9FF'
const wrap = (children) => (
  <svg viewBox="0 0 400 200" className="h-full w-full" role="img" aria-hidden="true">{children}</svg>
)

// Video Editing: timeline with clips, waveform and playhead
export function TimelineMotion() {
  const clips = [[0, 20, 120, B], [0, 150, 90, C], [1, 60, 150, '#7a5cff'], [1, 230, 120, B], [2, 20, 70, C], [2, 110, 160, B]]
  return wrap(<>
    {clips.map(([t, x, w, c], i) => (
      <rect key={i} className="clip" style={{ '--d': `${i * 0.2}s` }} x={x} y={20 + t * 38} width={w} height="28" rx="6" fill={c} opacity=".85" />
    ))}
    {Array.from({ length: 38 }, (_, i) => {
      const h = 8 + Math.abs(Math.sin(i * 1.7)) * 30
      return <rect key={i} className="bar" style={{ '--d': `${(i % 7) * 0.12}s` }} x={12 + i * 10} y={170 - h / 2} width="5" height={h} rx="2" fill={C} opacity=".7" />
    })}
    <g className="pl"><line x1="10" y1="8" x2="10" y2="192" stroke="#fff" strokeWidth="1.5" /><polygon points="4,4 16,4 10,14" fill="#fff" /></g>
  </>)
}

// Graphic Design: floating layers
export function LayersMotion() {
  return wrap(<>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} className="flt" style={{ '--d': `${i * 0.4}s` }}>
        <rect x={110 + i * 16} y={40 + i * 16} width="170" height="90" rx="12" fill={i % 2 ? C : B} fillOpacity={0.12 + i * 0.08} stroke={i % 2 ? C : B} strokeOpacity=".7" />
      </g>
    ))}
    <circle cx="300" cy="60" r="10" fill={C} className="shim" />
  </>)
}

// Motion Graphics: easing curve with a dot riding along it
export function CurveMotion() {
  return wrap(<>
    {[40, 80, 120, 160].map((y) => <line key={y} x1="20" x2="380" y1={y} y2={y} stroke="#fff" strokeOpacity=".07" />)}
    <path className="draw" d="M20 160 C120 160 140 40 200 40 S300 160 380 60" fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" />
    <circle className="ride" r="8" fill={C} />
    <line x1="20" y1="160" x2="120" y2="160" stroke={C} strokeOpacity=".5" /><circle cx="120" cy="160" r="4" fill={C} />
    <line x1="200" y1="40" x2="140" y2="40" stroke={C} strokeOpacity=".5" /><circle cx="140" cy="40" r="4" fill={C} />
  </>)
}

// UI/UX: wireframe with a moving cursor
export function WireMotion() {
  return wrap(<>
    <rect x="40" y="16" width="320" height="168" rx="12" fill="none" stroke={B} strokeOpacity=".6" />
    <rect x="52" y="28" width="296" height="16" rx="6" fill={C} fillOpacity=".25" />
    {[0, 1, 2].map((i) => <rect key={i} className="shim" style={{ '--d': `${i * 0.5}s` }} x={52 + i * 100} y="56" width="92" height="64" rx="8" fill={B} />)}
    <rect x="52" y="132" width="180" height="10" rx="5" fill="#fff" fillOpacity=".25" />
    <rect x="52" y="152" width="90" height="20" rx="10" fill={C} />
    <polygon className="cur" points="0,0 0,18 5,14 9,22 12,20 8,13 14,13" fill="#fff" stroke="#05070B" />
  </>)
}
export const visuals = [TimelineMotion, LayersMotion, CurveMotion, WireMotion]