import { useEffect, useRef, type CSSProperties } from 'react'
import wing from '../assets/butterfly/butterfly_Wing.png'
import body from '../assets/butterfly/butterfly_body.png'

// Speed in cycles/second, amplitude in degrees, transition time in seconds.
const FLAP = {
  idle: { speed: 0.45, amplitude: 10 },
  flying: { speed: 2.4, amplitude: 58 },
  transition: 0.65,
  perspective: 2400,
}

const wingStyle: CSSProperties = {
  transformBox: 'view-box',
  transformOrigin: '620px 795px',
}

type ButterflyProps = {
  className?: string
  style?: CSSProperties
  /** Omit for a decorative butterfly. */
  label?: string
  flying?: boolean
  /** Initial flap phase in radians, for independently moving butterflies. */
  phase?: number
}

export default function Butterfly({ className = '', style, label, flying = false, phase = 0 }: ButterflyProps) {
  const leftWingRef = useRef<SVGImageElement>(null)
  const rightWingRef = useRef<SVGImageElement>(null)
  const flyingRef = useRef(flying)

  useEffect(() => {
    flyingRef.current = flying
  }, [flying])

  useEffect(() => {
    const left = leftWingRef.current
    const right = rightWingRef.current
    if (!left || !right) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let previousTime: number | undefined
    let anglePhase = phase
    let speed = FLAP.idle.speed
    let amplitude = FLAP.idle.amplitude

    const animate = (time: number) => {
      const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      const target = flyingRef.current ? FLAP.flying : FLAP.idle
      const blend = 1 - Math.exp(-delta / FLAP.transition)
      speed += (target.speed - speed) * blend
      amplitude += (target.amplitude - amplitude) * blend
      // Integrate speed instead of restarting the cycle when the mode changes.
      anglePhase = (anglePhase + delta * speed * Math.PI * 2) % (Math.PI * 2)
      const angle = amplitude * (0.5 - 0.5 * Math.cos(anglePhase))
      const transform = `perspective(${FLAP.perspective}px) rotate(38deg) rotateY(${angle}deg) rotate(-38deg)`
      left.style.transform = transform
      // The existing reflected parent mirrors this rotation for the right wing.
      right.style.transform = transform
      frame = window.requestAnimationFrame(animate)
    }

    const updateMotion = () => {
      window.cancelAnimationFrame(frame)
      previousTime = undefined
      if (reducedMotion.matches) {
        left.style.transform = ''
        right.style.transform = ''
      } else {
        frame = window.requestAnimationFrame(animate)
      }
    }

    updateMotion()
    reducedMotion.addEventListener('change', updateMotion)
    return () => {
      window.cancelAnimationFrame(frame)
      reducedMotion.removeEventListener('change', updateMotion)
    }
  }, [phase])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 1680"
      width={240}
      height={252}
      className={`pointer-events-none h-auto max-w-full select-none ${className}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {/* Preserve the PNG canvases; align their wing roots with the thorax.
          A shared viewBox keeps every part aligned at any rendered size. */}
      <image ref={leftWingRef} style={wingStyle} href={wing} x={-242} y={-65} width={1254} height={1254} />
      {/* Mirror around the body's diagonal axis, keeping the wing root fixed. */}
      <g transform="translate(620 795) rotate(38) scale(-1 1) rotate(-38) translate(-620 -795)">
        <image ref={rightWingRef} style={wingStyle} href={wing} x={-242} y={-65} width={1254} height={1254} />
      </g>
      <image href={body} x={40} y={70} width={1254} height={1254} />
    </svg>
  )
}
