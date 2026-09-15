export function JourneySection() {
  return (
    <section id="veien-videre" className="
      flex min-h-[650px] scroll-mt-6 flex-col justify-center bg-journey px-section py-section-y
      text-background md:min-h-[85svh]
    " aria-labelledby="journey-title">
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
