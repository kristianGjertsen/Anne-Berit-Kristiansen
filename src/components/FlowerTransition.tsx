import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import flowerImage from '../assets/Flower_Img.png'

// Position, size and movement are deliberately different for each stem.
const flowers = [
  { left: -4, size: 25, angle: -22, depth: 1, offset: 0.09, delay: 0.00, bend: 42, mirror: false },
  { left: 6, size: 32, angle: 9, depth: 3, offset: -0.04, delay: 0.06, bend: 63, mirror: true },
  { left: 13, size: 22, angle: -14, depth: 1, offset: 0.14, delay: 0.02, bend: 46, mirror: false },
  { left: 21, size: 29, angle: 18, depth: 2, offset: 0.03, delay: 0.09, bend: 72, mirror: true },
  { left: 26, size: 24, angle: -7, depth: 1, offset: 0.16, delay: 0.04, bend: 54, mirror: false },
  { left: 34, size: 33, angle: 12, depth: 3, offset: -0.08, delay: 0.11, bend: 68, mirror: false },
  { left: 41, size: 23, angle: -19, depth: 2, offset: 0.11, delay: 0.03, bend: 44, mirror: true },
  { left: 46, size: 28, angle: 5, depth: 3, offset: 0.01, delay: 0.08, bend: 65, mirror: false },
  { left: 54, size: 31, angle: -9, depth: 2, offset: -0.05, delay: 0.05, bend: 70, mirror: true },
  { left: 60, size: 22, angle: 17, depth: 1, offset: 0.15, delay: 0.10, bend: 45, mirror: false },
  { left: 68, size: 30, angle: -16, depth: 3, offset: 0.02, delay: 0.02, bend: 72, mirror: true },
  { left: 73, size: 25, angle: 8, depth: 1, offset: 0.12, delay: 0.07, bend: 52, mirror: false },
  { left: 81, size: 33, angle: -5, depth: 3, offset: -0.07, delay: 0.12, bend: 64, mirror: true },
  { left: 89, size: 23, angle: 21, depth: 1, offset: 0.17, delay: 0.01, bend: 40, mirror: true },
  { left: 96, size: 28, angle: -12, depth: 2, offset: 0.04, delay: 0.08, bend: 68, mirror: false },
  { left: 104, size: 24, angle: 16, depth: 1, offset: 0.10, delay: 0.04, bend: 43, mirror: true },
]

/** Opens a tall flower curtain over the stationary portrait and text. */
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

      const scene = sceneRef.current
      if (!scene) return

      const height = root.offsetHeight
      const width = root.offsetWidth
      const travel = Math.max(1, scene.offsetHeight - height)
      const progress = Math.max(0, Math.min(1, -scene.getBoundingClientRect().top / travel))

      stems.forEach((stem, index) => {
        const flower = flowers[index]
        const direction = flower.left < 50 ? -1 : 1
        // The centre opens first; the outer stems follow with a little variation.
        const delay = Math.abs(flower.left - 50) / 50 * 0.12 + flower.delay * 0.25
        const local = Math.max(0, Math.min(1, (progress - delay) / (0.95 - delay)))
        const opening = local * local * (3 - 2 * local)
        const rotation = flower.angle + direction * opening * flower.bend
        const radians = rotation * Math.PI / 180
        const halfWidth = Math.abs(Math.cos(radians)) * stem.offsetWidth / 2
        const topEdge = Math.sin(radians) * stem.offsetHeight * 0.85
        const bottomEdge = -Math.sin(radians) * stem.offsetHeight * 0.15
        const left = flower.left / 100 * width
        // Move only far enough to clear the edge, rather than continuing offscreen.
        const clearance = direction < 0
          ? left + halfWidth + Math.max(topEdge, bottomEdge) + 12
          : width - left + halfWidth - Math.min(topEdge, bottomEdge) + 12
        const x = direction * clearance * opening
        const y = (flower.offset + opening * opening * 0.3) * height
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
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-10 [clip-path:inset(-15svh_0_0)] motion-reduce:hidden"
      aria-hidden="true"
    >
      {flowers.map((flower, index) => (
        <img
          key={index}
          data-flower-stem
          className="absolute -top-[5svh] h-(--flower-height) w-auto max-w-none origin-[50%_85%] select-none"
          src={flowerImage}
          alt=""
          width={1024}
          height={1536}
          draggable={false}
          style={{
            left: `${flower.left}%`,
            zIndex: flower.depth,
            '--flower-height': `${105 + (flower.size - 22)}svh`,
            transform: `translate(-50%, ${flower.offset * 100}svh) rotate(${flower.angle}deg) scaleX(${flower.mirror ? -1 : 1})`,
          } as CSSProperties}
        />
      ))}
    </div>
  )
}
