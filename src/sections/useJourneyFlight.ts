import { useEffect, useRef, useState } from 'react'

const clamp = (value: number) => Math.max(0, Math.min(1, value))

/** Extra scroll space keeps the panel pinned while flight progress goes from 0 to 1. */
export function useJourneyFlight() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [flying, setFlying] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    if (!section || !panel) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const butterflies = [...panel.querySelectorAll<HTMLElement>('[data-butterfly]')]
    // Pick each route once so scrolling backwards and resizing never reshuffle it.
    const routes = butterflies.map(() => ({
      bend: 1.6 + Math.random() * 0.9,
      lift: 25 + Math.random() * 65,
      sway: 25 + Math.random() * 45,
      turns: 1 + Math.random(),
      phase: Math.random() * Math.PI * 2,
      delay: Math.random() * 0.16,
    }))
    let paths: { x: number; y: number; direction: number }[] = []
    let start = 0
    let distance = 1
    let frame = 0

    const render = () => {
      const progress = reducedMotion.matches ? 0 : clamp((window.scrollY - start) / distance)
      butterflies.forEach((butterfly, index) => {
        const { x, y, direction } = paths[index]
        const route = routes[index]
        // Stagger take-off slightly; the same scroll position always gives the same pose.
        const t = clamp((progress - route.delay) / (1 - route.delay))
        const arc = Math.sin(t * Math.PI)
        // Taper the wandering at both ends for a clean take-off and landing.
        const wave = Math.sin(t * Math.PI * 2 * route.turns + route.phase) * arc * arc
        const drift = Math.min(route.sway, window.innerWidth * 0.08) * wave
        const flightX = x * t ** route.bend + drift
        const flightY = y * t - arc * route.lift + drift * 0.35
        const tilt = direction * (24 * t + arc * 8) + wave * 7
        butterfly.style.transform = `translate(${flightX}px, ${flightY}px) rotate(${tilt}deg)`
      })
      // Keep the wings in flight mode until the butterflies return to their perches.
      setFlying(progress > 0)
    }

    const measure = () => {
      const pinTop = Math.min(0, window.innerHeight - panel.offsetHeight)
      distance = Math.max(700, window.innerHeight * 1.15)
      section.style.height = reducedMotion.matches ? '' : `${panel.offsetHeight + distance}px`
      panel.style.top = reducedMotion.matches ? '' : `${pinTop}px`
      start = section.getBoundingClientRect().top + window.scrollY - pinTop
      // Measure the resting poses, independently of current scroll progress.
      butterflies.forEach(butterfly => { butterfly.style.transform = '' })
      const panelTop = panel.getBoundingClientRect().top
      paths = butterflies.map(butterfly => {
        const rect = butterfly.getBoundingClientRect()
        const direction = butterfly.dataset.direction === 'left' ? -1 : 1
        return {
          direction,
          x: direction < 0 ? -rect.right - 180 : window.innerWidth - rect.left + 180,
          y: -(rect.bottom - panelTop + pinTop) - 180,
        }
      })
      render()
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        render()
      })
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(panel)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    reducedMotion.addEventListener('change', measure)
    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      reducedMotion.removeEventListener('change', measure)
      section.style.height = ''
      panel.style.top = ''
      butterflies.forEach(butterfly => { butterfly.style.transform = '' })
    }
  }, [])

  return { sectionRef, panelRef, flying }
}
