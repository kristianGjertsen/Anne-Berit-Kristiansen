import Butterfly from '../components/Butterfly'
import { useJourneyFlight } from './useJourneyFlight'

const PERCHES = [
  { word: 'Jeg', position: 'left-[5%]', size: 'w-[1.35em]', tilt: '-rotate-12', direction: 'left' },
  { word: 'gleder', position: 'left-0', size: 'w-[1.35em]', tilt: '-rotate-6', direction: 'left' },
  { word: 'gleder', position: 'left-[55%]', size: 'w-[1.65em]', tilt: 'rotate-12', direction: 'right' },
  { word: 'meg', position: 'left-[20%]', size: 'w-[1.3em]', tilt: '-rotate-6', direction: 'left' },
  { word: 'alltid', position: 'left-[35%]', size: 'w-[1.45em]', tilt: 'rotate-20', direction: 'right' },
  { word: 'til', position: 'left-0', size: 'w-[1.25em]', tilt: 'rotate-6', direction: 'right' },
  { word: 'neste', position: 'left-[20%]', size: 'w-[1.6em]', tilt: '-rotate-12', direction: 'left' },
  { word: 'tur', position: 'left-[15%]', size: 'w-[1.75em]', tilt: 'rotate-12', direction: 'right' },
]

export function JourneySection() {
  const { sectionRef, panelRef, flying } = useJourneyFlight()
  const word = (text: string) => {
    return (
      <span className="relative inline-block">
        {text}
        {PERCHES.map((perch, index) => perch.word === text && (
          <span
            key={index} data-butterfly data-direction={perch.direction}
            className={`pointer-events-none absolute bottom-[0.46em] z-10 ${perch.position} ${perch.size}`}
            aria-hidden="true"
          >
            <Butterfly
              className={`w-full ${perch.tilt} ${perch.direction === 'left' ? '-scale-x-100' : ''}`}
              flying={flying} phase={index * 1.4}
            />
          </span>
        ))}
      </span>
    )
  }

  return (
    <section ref={sectionRef} id="veien-videre" className="relative scroll-mt-6 bg-journey text-background" aria-labelledby="journey-title">
      <div ref={panelRef} className="
        sticky top-0 flex min-h-[650px] flex-col justify-center px-section py-section-y
        md:min-h-[85svh] motion-reduce:static
      ">
        <h2 className="
          mt-20 mb-16 font-serif text-[clamp(2.8rem,10vw,4.5rem)] leading-[1.6] font-normal
          tracking-tighter md:text-[clamp(3.1rem,7.5vw,8rem)]
        " id="journey-title">
          {word('Jeg')} {word('gleder')} {word('meg')} {word('alltid')} {word('til')}{' '}
          <em className="text-accent">{word('neste')} {word('tur')}</em>
        </h2>
        <div className="flex items-center gap-4 md:gap-10">
          <span className="hidden h-px w-[15%] bg-background/30 md:block" aria-hidden="true" />
          <a href="#kontakt" className="
            ml-auto grid size-14 shrink-0 place-items-center rounded-full border border-current
            text-xl transition-colors duration-200 hover:bg-background/10
            motion-reduce:transition-none
          " aria-label="Videre til kontakt">↓</a>
        </div>
      </div>
    </section>
  )
}
