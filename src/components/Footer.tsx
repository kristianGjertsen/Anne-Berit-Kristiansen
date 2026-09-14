import { Container } from './Container'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <Container className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <a href="#hjem" className="font-medium">
          Hjem
        </a>
        <a
          href="#kontakt"
          className="underline decoration-border underline-offset-[5px] hover:decoration-current inline-flex min-h-11 items-center"
        >
          Kontakt
        </a>
      </Container>
    </footer>
  )
}
