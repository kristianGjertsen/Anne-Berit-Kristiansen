import { Section } from '../components/Section'

export function AboutSection() {
  return (
    <Section
      id="om-meg"
      labelledBy="about-title"
      className="border-t border-border"
    >
      <p className="mb-6 text-sm text-muted">02 / Om meg</p>
      <div className="grid gap-6 md:grid-cols-2 md:gap-16">
        <h2
          id="about-title"
          className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.18] tracking-[-0.04em] max-w-md"
        >
          Litt om mennesket bak.
        </h2>
        <div className="max-w-lg space-y-5 leading-7 text-muted">
          <p>
            Jeg liker å utforske ideer, lære underveis og gjøre det kompliserte
            litt enklere.
          </p>
          <p>
            Denne siden er en begynnelse. Her blir det plass til det jeg lager,
            det jeg lærer og veien videre.
          </p>
          <a
            href="#kontakt"
            className="underline decoration-border underline-offset-[5px] hover:decoration-current inline-flex min-h-11 items-center text-sm text-foreground"
          >
            Videre til kontakt ↓
          </a>
        </div>
      </div>
    </Section>
  )
}
