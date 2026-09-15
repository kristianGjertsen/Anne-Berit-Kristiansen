import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Container } from './Container'

// Navigasjonen ligger direkte her og brukes både på mobil og desktop.
function Navigation({
  onNavigate,
  className,
}: {
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void
  className: string
}) {
  const linkClass =
    'inline-flex min-h-11 items-center text-md underline-offset-8 hover:underline'

  return (
    <nav aria-label="Hovednavigasjon" className={className}>
      <a href="#hjem" className={linkClass} onClick={onNavigate}>
        Hjem
      </a>
      <a href="#om-meg" className={linkClass} onClick={onNavigate}>
        Om meg
      </a>
      <a href="#kontakt" className={linkClass} onClick={onNavigate}>
        Kontakt
      </a>
    </nav>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const cancelScroll = useRef<(() => void) | null>(null)

  useEffect(() => () => cancelScroll.current?.(), [])

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const hash = event.currentTarget.hash
    const target = document.getElementById(hash.slice(1))
    if (!target) return

    event.preventDefault()
    cancelScroll.current?.()
    flushSync(() => setIsOpen(false))

    const start = window.scrollY
    const end = Math.max(0, Math.min(
      start + target.getBoundingClientRect().top - (headerRef.current?.offsetHeight ?? 0),
      document.documentElement.scrollHeight - window.innerHeight,
    ))
    const distance = end - start
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)

    const focusTarget = () => {
      const hadTabIndex = target.hasAttribute('tabindex')
      if (!hadTabIndex) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      if (!hadTabIndex) target.removeAttribute('tabindex')
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance) < 1) {
      window.scrollTo({ top: end, behavior: 'instant' })
      focusTarget()
      return
    }

    // Longer journeys leave time to see the flowers open as the page scrolls.
    const duration = Math.min(3000, Math.max(2200, Math.abs(distance) / 1))
    const started = performance.now()
    let frame = 0
    const cancel = () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('pointerdown', cancel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', cancel)
      cancelScroll.current = null
    }
    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(keyEvent.key)) cancel()
    }
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration)
      const eased = progress * progress * (3 - 2 * progress)
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' })
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick)
      } else {
        cancel()
        focusTarget()
      }
    }

    cancelScroll.current = cancel
    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchstart', cancel, { passive: true })
    window.addEventListener('pointerdown', cancel, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', cancel)
    frame = window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => {
      if (desktop.matches) setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [isOpen])

  return (
    <header ref={headerRef} className={`fixed inset-x-0 top-0 z-20 text-header ${isOpen ? 'bg-background' : 'bg-transparent'}`}>
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-4 border-b-2 border-foreground/50 py-4 md:min-h-[100px]">
          <a
            href="#hjem"
            aria-label="Anne Berit Kristiansen – hjem"
            onClick={onNavigate}
            className="font-serif text-[2.2rem] font-semibold"
          >
            ABK
          </a>
          <Navigation onNavigate={onNavigate} className="hidden gap-7 md:flex" />
          <button
            ref={menuButton}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Lukk hovedmenyen' : 'Åpne hovedmenyen'}
            onClick={() => setIsOpen(!isOpen)}
            className="flex min-h-11 items-center gap-3 px-1 text-sm md:hidden"
          >
            {isOpen ? 'Lukk' : 'Meny'}
            <span aria-hidden="true" className="text-lg">
              {isOpen ? '×' : '☰'}
            </span>
          </button>
        </div>
        <div
          id="mobile-menu"
          hidden={!isOpen}
          className="border-t border-border py-3 md:hidden"
        >
          <Navigation
            onNavigate={onNavigate}
            className="flex flex-col items-start gap-1"
          />
        </div>
      </Container>
    </header>
  )
}
