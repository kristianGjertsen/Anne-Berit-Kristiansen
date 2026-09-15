export function ContactSection() {
  return (
    <section id="kontakt" className="story-contact story-section" aria-labelledby="contact-title" data-scene="contact">
      <p id="contact-title" className="eyebrow">Kontakt</p>
      <address className="mt-8 flex flex-col items-center gap-3 not-italic">
        <a className="underline underline-offset-4" href="mailto:annebekri@gmail.com">annebekri@gmail.com</a>
        <a className="underline underline-offset-4" href="tel:+4790911021">+47 90 91 10 21</a>
      </address>
    </section>
  )
}
