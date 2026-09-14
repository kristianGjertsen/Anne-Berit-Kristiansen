import { Button } from '../components/Button'
import { Section } from '../components/Section'
import flowerBack from '../assets/flowerBack.jpg'

export function IntroSection() {
  return (
    <Section
      id="hjem"
      labelledBy="intro-title"
      className="flex min-h-[70svh] items-center"
    >
      <h1
        id="intro-title"
        className="text-[clamp(2.5rem,4.4vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.05em] max-w-2xl"
      >
        Anne Berit Kristiansen
      </h1>

      <p className="mt-4 max-w-2xl text-2xl leading-7 text-muted">
        Reiseleder på heltid, pensjonist på deltid
      </p>
      <img
        src={flowerBack}
        alt="Blomsterbakgrunn"
        className="mt-6 right-0  max-w-lg"
      />
      <p className="mt-6 max-w-lg leading-7 text-muted">
        Et lite innblikk i meg, tankene mine og det som kommer videre.
      </p>
      <div className="mt-8">
        <Button href="#om-meg">Bli litt kjent med meg ↓</Button>
      </div>
    </Section>
  )
}
