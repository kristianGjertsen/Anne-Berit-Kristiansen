import { Container } from './Container'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <Container className="flex flex-wrap items-center justify-between gap-4 text-xs">
        <a href="#hjem" className="font-medium">
          Anne Berit Kristiansen
        </a>
        <a
          href="#hjem"
          className="underline decoration-border underline-offset-[5px] hover:decoration-current inline-flex min-h-11 items-center"
        >
          Til toppen ↑
        </a>
      </Container>
    </footer>
  )
}
