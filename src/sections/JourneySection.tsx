import Butterfly from '../components/Butterfly'

export function JourneySection() {
  return (
    <section id="veien-videre" className="
      flex min-h-[650px] scroll-mt-6 flex-col justify-center bg-journey px-section py-section-y
      text-background md:min-h-[85svh]
    " aria-labelledby="journey-title">
      <div className="relative h-40 w-full md:h-56" aria-hidden="true">
        <Butterfly className="absolute top-8 left-0 w-20 -rotate-12 sm:w-28 md:w-32" />
        <Butterfly className="absolute top-0 left-[25%] w-28 rotate-12 sm:w-36 md:w-44" flying phase={1.4} />
        <Butterfly className="absolute bottom-0 left-[55%] w-16 -rotate-20 sm:w-24 md:w-28" phase={2.8} />
        <Butterfly className="absolute top-4 right-0 w-24 rotate-20 sm:w-32 md:w-36" flying phase={4.2} />
      </div>
      <h2 className="
        mt-12 mb-16 font-serif text-[clamp(2.8rem,10vw,4.5rem)] leading-[1.1] font-normal
        tracking-tighter md:text-[clamp(3.1rem,7.5vw,8rem)]
      " id="journey-title"> Jeg gleder meg alltid til <em className="text-accent"> neste tur</em></h2>
      <div className="flex items-center gap-4 md:gap-10">
        <span className="hidden h-px w-[15%] bg-background/30 md:block" aria-hidden="true" />
        <a href="#kontakt" className="
          ml-auto grid size-14 shrink-0 place-items-center rounded-full border border-current
          text-xl transition-colors duration-200 hover:bg-background/10
          motion-reduce:transition-none
        " aria-label="Videre til kontakt">↓</a>
      </div>
    </section>
  )
}
