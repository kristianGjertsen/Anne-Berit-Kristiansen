import contactBackground from '../assets/ContactBackground.jpg'

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="relative scroll-mt-6 text-cream"
      aria-labelledby="contact-title">
      
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={contactBackground}
        alt=""
        loading="lazy"
      />
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 bg-journey/60 px-page py-section-y">
        <h2 id="contact-title" className="font-serif text-6xl pb-17 md:text-7xl">Kontakt meg</h2>
        <address className="flex flex-col gap-6 text-center text-2xl not-italic md:text-4xl">
          <a
            className="break-words underline underline-offset-8 hover:text-accent"
            href="mailto:annebekri@gmail.com"
          >
            annebekri@gmail.com
          </a>
          <a
            className="underline underline-offset-8 hover:text-accent"
            href="tel:+4790911021"
          >
            +47 90 91 10 21
          </a>
        </address>
      </div>
    </section>
  )
}
