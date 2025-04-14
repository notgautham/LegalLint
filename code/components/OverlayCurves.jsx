'use client'
import { cn } from '@/utils/cn'

export default function OverlayCurves({ className }) {
  const numberOfCurves = 25
  const curveSpacing = 150  // Gap between curves
  const strokeWidth = 9     // Thickness (adjustable)
  const rotationDegrees = 0  // Change this to rotate as desired

  // Generate 25 diagonal curved paths.
  const paths = []
  for (let i = 0; i < numberOfCurves; i++) {
    const yOffset = i * curveSpacing
    const angleOffset = 300
    paths.push(
      `<path d="M-100,${yOffset} C300,${yOffset - angleOffset} 700,${yOffset + angleOffset} 1200,${yOffset}" stroke="black" stroke-width="${strokeWidth}" fill="none" />`
    )
  }

  return (
    <div
      className={cn('fixed inset-0 z-10 pointer-events-none', className)}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      {/* Outer container set to full viewport size and centered */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          transform: `rotate(${rotationDegrees}deg)`,
          transformOrigin: 'center center'
        }}
      >
        <svg
          viewBox="0 0 1000 2000"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <mask id="curveMask">
              <rect width="100%" height="100%" fill="white" />
              <g dangerouslySetInnerHTML={{ __html: paths.join('') }} />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#0f0f0f"
            mask="url(#curveMask)"
          />
        </svg>
      </div>
    </div>
  )
}
