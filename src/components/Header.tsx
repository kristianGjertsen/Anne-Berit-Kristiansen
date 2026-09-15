import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Container } from './Container'

// Navigasjonen ligger direkte her og brukes både på mobil og desktop.
function Navigation({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className: string
}) {
  const linkClass =
    'inline-flex min-h-11 items-center text-sm underline-offset-8 hover:underline'

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
    <header className={`site-header ${isOpen ? 'menu-open' : ''}`}>
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-4 py-4">
          <a
            href="#hjem"
            aria-label="Anne Berit Kristiansen – hjem"
            onClick={() => flushSync(() => setIsOpen(false))}
            className="text-base font-semibold tracking-tight"
          >
            ABK<span className="brand-dot">.</span>
          </a>
          <Navigation className="hidden gap-7 md:flex" />
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
            onNavigate={() => flushSync(() => setIsOpen(false))}
            className="flex flex-col items-start gap-1"
          />
        </div>
      </Container>
    </header>
  )
}
