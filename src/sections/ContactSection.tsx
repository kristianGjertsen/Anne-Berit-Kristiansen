import { Section } from '../components/Section'

export function ContactSection() {
  return (
    <Section
      id="kontakt"
      labelledBy="contact-title"
      className="border-t border-border"
    >
      <p className="mb-6 text-sm text-muted">03 / Kontakt</p>
      <h2
        id="contact-title"
        className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.18] tracking-[-0.04em]"
      >
        Neste kapittel?
      </h2>
      <p className="mt-6 max-w-lg leading-7 text-muted">
        Det kan begynne med en samtale.
      </p>
      <p className="mt-3 text-sm text-muted">Kontaktinformasjon kommer her.</p>
    </Section>
  )
}
