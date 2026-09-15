import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import flowerImage from '../assets/Flower_Img.png'

// Position, size and movement are deliberately different for each stem.
const flowers = [
  { left: -4, size: 25, angle: -22, drift: -260, lift: 0.66, depth: 1, offset: 0.09, delay: 0.00, bend: 42, mirror: false },
  { left: 6, size: 32, angle: 9, drift: -330, lift: 0.84, depth: 3, offset: -0.04, delay: 0.06, bend: 63, mirror: true },
  { left: 13, size: 22, angle: -14, drift: -270, lift: 0.72, depth: 1, offset: 0.14, delay: 0.02, bend: 46, mirror: false },
  { left: 21, size: 29, angle: 18, drift: -390, lift: 0.91, depth: 2, offset: 0.03, delay: 0.09, bend: 72, mirror: true },
  { left: 26, size: 24, angle: -7, drift: -310, lift: 0.69, depth: 1, offset: 0.16, delay: 0.04, bend: 54, mirror: false },
  { left: 34, size: 33, angle: 12, drift: -430, lift: 0.87, depth: 3, offset: -0.08, delay: 0.11, bend: 68, mirror: false },
  { left: 41, size: 23, angle: -19, drift: -360, lift: 0.74, depth: 2, offset: 0.11, delay: 0.03, bend: 44, mirror: true },
  { left: 46, size: 28, angle: 5, drift: -1000, lift: 0.82, depth: 3, offset: 0.01, delay: 0.08, bend: 65, mirror: false },
  { left: 54, size: 31, angle: -9, drift: 460, lift: 0.89, depth: 2, offset: -0.05, delay: 0.05, bend: 70, mirror: true },
  { left: 60, size: 22, angle: 17, drift: 350, lift: 0.71, depth: 1, offset: 0.15, delay: 0.10, bend: 45, mirror: false },
  { left: 68, size: 30, angle: -16, drift: 420, lift: 0.85, depth: 3, offset: 0.02, delay: 0.02, bend: 72, mirror: true },
  { left: 73, size: 25, angle: 8, drift: 1320, lift: 0.76, depth: 1, offset: 0.12, delay: 0.07, bend: 52, mirror: false },
  { left: 81, size: 33, angle: -5, drift: 370, lift: 0.92, depth: 3, offset: -0.07, delay: 0.12, bend: 64, mirror: true },
  { left: 89, size: 23, angle: 21, drift: 290, lift: 0.68, depth: 1, offset: 0.17, delay: 0.01, bend: 40, mirror: true },
  { left: 96, size: 28, angle: -12, drift: 330, lift: 0.81, depth: 2, offset: 0.04, delay: 0.08, bend: 68, mirror: false },
  { left: 104, size: 24, angle: 16, drift: 250, lift: 0.73, depth: 1, offset: 0.10, delay: 0.04, bend: 43, mirror: true },
]

/** Shares the background scene: reveal starts before pinning and ends after it. */
export function FlowerTransition({ sceneRef }: { sceneRef: RefObject<HTMLElement | null> }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stems = Array.from(root.querySelectorAll<HTMLImageElement>('[data-flower-stem]'))
    let frame = 0

    const render = () => {
      frame = 0
      if (motion.matches) return

      const viewport = window.innerHeight
      const seam = sceneRef.current?.getBoundingClientRect().top ?? viewport
      const progress = Math.max(0, Math.min(1, (viewport - seam) / (viewport * 2.1)))
      const fadeIn = Math.min(1, progress / 0.18)
      const fadeOut = Math.min(1, (1 - progress) / 0.15)
      root.style.setProperty('--flower-opacity', String(fadeIn * fadeOut))
      if (progress === 0 || progress === 1) return

      const distance = Math.min(viewport, 900)
      const widthScale = Math.min(1.3, window.innerWidth / 900)

      stems.forEach((stem, index) => {
        const flower = flowers[index]
        const local = Math.max(0, Math.min(1, (progress - flower.delay) / (1 - flower.delay)))
        // A staggered fan opens around the stem bases, following a curved path.
        const opening = Math.max(0, Math.min(1, (local - 0.12) / 0.72))
        const spread = opening * opening * (3 - 2 * opening)
        const direction = Math.sign(flower.drift)
        const sway = Math.sin(local * Math.PI * 2) * (index % 3 + 1) * 3
        const x = (flower.drift * spread + sway) * widthScale
        const y = (0.48 + flower.offset - local * flower.lift + spread * spread * 0.18) * distance
        const rotation = flower.angle + direction * spread * flower.bend + sway * 0.35
        stem.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, 0) rotate(${rotation}deg) scaleX(${flower.mirror ? -1 : 1})`
      })
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }
    const onMotionChange = () => {
      if (motion.matches) {
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        window.cancelAnimationFrame(frame)
        frame = 0
      } else {
        window.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule)
        schedule()
      }
    }

    onMotionChange()
    motion.addEventListener('change', onMotionChange)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', onMotionChange)
      window.cancelAnimationFrame(frame)
    }
  }, [sceneRef])

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-5 [--flower-opacity:0] motion-reduce:hidden" aria-hidden="true" data-scene="flower-transition">
      <div className="
        absolute inset-x-0 top-[-35svh] h-[135svh] overflow-hidden opacity-[var(--flower-opacity)]
        [mask-image:linear-gradient(transparent,#000_12%,#000_78%,transparent)]
      ">
        {flowers.map((flower, index) => (
          <img
            key={index}
            data-flower-stem
            className="
              absolute top-[10%] h-auto w-[clamp(150px,var(--flower-size),240px)] max-w-none
              origin-[50%_85%] select-none md:w-[clamp(150px,var(--flower-size),460px)]
            "
            src={flowerImage}
            alt=""
            width={1024}
            height={1536}
            decoding="async"
            draggable={false}
            style={{
              left: `${flower.left}%`,
              zIndex: flower.depth,
              '--flower-size': `${flower.size}vw`,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}
