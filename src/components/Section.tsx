import type { ReactNode } from 'react'
import { Container } from './Container'

export function Section({
  children,
  id,
  labelledBy,
  className = '',
}: {
  children: ReactNode
  id?: string
  labelledBy: string
  className?: string
}) {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={labelledBy}
      className={`scroll-mt-6 py-[clamp(3.5rem,7vw,6rem)] focus:outline-none ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}
