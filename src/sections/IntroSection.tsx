import { Button } from '../components/Button'
import { Section } from '../components/Section'
import flowerBack from '../assets/flowerBack.jpg'
import profileImg from '../assets/profileImg.webp'

export function IntroSection() {
  return (
    <Section
      id="hjem"
      labelledBy="intro-title"
      className="flex min-h-[70svh] items-center"
    >
      <div className="grid items-center gap-x-12 gap-y-8 md:grid-cols-[1.1fr_1fr]">
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <h1
            id="intro-title"
            className="max-w-2xl text-[clamp(2.5rem,4.4vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.05em]"
          >
            Anne Berit Kristiansen
          </h1>
          <p className="mt-4 max-w-lg text-2xl leading-8 text-muted">
            Reiseleder på heltid, pensjonist på deltid
          </p>
        </div>

        <div className="relative isolate ml-auto aspect-square w-full max-w-md md:col-start-2 md:row-span-2 md:row-start-1">
          <img
            src={flowerBack}
            alt=""
            width={3334}
            height={5001}
            className="absolute top-0 right-0 h-[90%] w-[78%] rounded-2xl object-cover object-right"
          />
          <img
            src={profileImg}
            alt="Anne Berit Kristiansen"
            width={756}
            height={756}
            fetchPriority="high"
            className="absolute top-[8%] left-[8%] left-0 z-10 aspect-[4/5] w-[72%] rounded-2xl border-4 border-background object-cover object-[60%_center]"
          />
        </div>

        <div className="md:col-start-1 md:row-start-2 md:self-start">
          <p className="max-w-lg leading-7 text-muted">
            Et lite innblikk i meg, tankene mine og det som kommer videre.
          </p>
          <div className="mt-8">
            <Button href="#om-meg">Bli litt kjent med meg ↓</Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
