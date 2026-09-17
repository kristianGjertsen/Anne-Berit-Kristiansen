import { useRef } from 'react'
import { FlowerTransition } from '../components/FlowerTransition'
import profileImg from '../assets/profileImg.webp'
import aboutImage from '../assets/about-landscape.jpg'

export function AboutSection() {
  const sceneRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sceneRef}
      className="relative isolate z-10"
      aria-labelledby="about-title"
    >
      {/* Navigation lands near the end of the reveal, while the scene is still pinned. */}
      <span id="om-meg" className="absolute top-[120svh] motion-reduce:top-0" />
      <div className="sticky top-0 isolate min-h-svh motion-reduce:relative">
        <div className="absolute inset-0 -z-2 overflow-hidden" aria-hidden="true">
          <img className="h-full w-full scale-105 object-cover" src={aboutImage} alt="" />
        </div>
        <div
          className="absolute inset-0 -z-1 bg-[linear-gradient(90deg,#23392f24,#f4f1e81a)]"
          aria-hidden="true"
        />
        <div className="
          grid min-h-svh items-center justify-items-center gap-6 px-section pt-28 pb-8
          md:grid-cols-2 md:gap-12 md:pt-32 md:pb-12
        ">
          <div className="w-full max-w-[min(440px,30svh)] bg-background p-3 shadow-xl md:max-w-[min(440px,48svh)]">
            <img
              className="aspect-[4/5] w-full object-cover"
              src={profileImg}
              alt="Anne Berit Kristiansen"
              width={756}
              height={756}
              loading="lazy"
            />
          </div>
          <div className="w-full bg-background/95 p-6 md:p-10">
            <h2 id="about-title" className="mb-6 font-serif text-5xl leading-[1.1] tracking-tighter md:text-7xl">
              Litt om meg
            </h2>
            <div className="space-y-4 leading-7 text-muted">
              <p>
                Reiseglede og møter med nye mennesker har fulgt meg gjennom hele
                arbeidslivet. Jeg har vært reiseleder på bussrundturer i Europa,
                hatt ansvar for langtidsreisene på hovedkontoret til Star Tour og
                jobbet ved Turistinformasjonen i Oslo og som leder for Oslo
                Guideservice. De siste årene har jeg jobbet med markedsføring og
                annonsesalg i mediebransjen, særlig for kunder innen kultur og reiseliv.
              </p>
              <p>
                Jeg er glad i å oppdage nye steder og bli kjent med menneskene jeg
                møter underveis. Frankrike har en helt spesiell plass i hjertet
                mitt etter at jeg bodde i Montpellier i Sør-Frankrike. Italia og
                Portugal er også land jeg gjerne vender tilbake til.
              </p>
              <p>
                Når jeg ikke er på reise, liker jeg å holde meg i aktivitet med
                trening og lange turer – enten langs sjøen, i skogen eller på fjellet.
              </p>
              <p>
                Jeg trives sammen med andre og setter pris på gode samtaler og
                felles opplevelser. Som reiseleder er jeg opptatt av at du skal
                føle deg godt ivaretatt og få mest mulig ut av turen. Jeg vil at
                alle skal kjenne seg velkomne og som en del av reisefølget.
              </p>
            </div>
          </div>
        </div>
        <FlowerTransition sceneRef={sceneRef} />
      </div>
      {/* A real spacer keeps the sticky layer pinned throughout the opening. */}
      <div className="h-[120svh] motion-reduce:hidden" aria-hidden="true" />
    </section>
  )
}
