import { useRef } from 'react'
import { FlowerTransition } from '../components/FlowerTransition'
import profileImg from '../assets/profileImg.webp'
import aboutImage from '../assets/about-landscape.jpg'

export function AboutSection() {
  const sceneRef = useRef<HTMLElement>(null)

  return (
    <section ref={sceneRef} className="relative isolate" aria-labelledby="about-title">
      <div className="sticky top-0 isolate h-svh motion-reduce:absolute motion-reduce:inset-0 motion-reduce:h-full">
        <div className="absolute inset-0 -z-2 overflow-hidden" aria-hidden="true">
          <img className="h-full w-full scale-105 object-cover motion-reduce:scale-100" src={aboutImage} alt="Malt landskap med fjell, grønne åser og små hus i varme jordtoner." />
        </div>
        <div className="absolute inset-0 -z-1 overflow-hidden bg-[linear-gradient(90deg,#23392f24,#f4f1e81a)]" aria-hidden="true" />
        <FlowerTransition sceneRef={sceneRef} />
      </div>
      <div id="om-meg" className="
        relative z-6 mt-[35svh] grid min-h-svh grid-cols-1 items-center gap-12 px-section
        py-section-y md:grid-cols-2 md:gap-[clamp(3rem,10vw,10rem)] motion-reduce:mt-0
      ">
        <div className="w-[85%] max-w-[440px] bg-background px-3 pt-3 pb-4 shadow-[0_16px_60px_#182b3026]">
          <img className="aspect-[4/5] w-full object-cover" src={profileImg} alt="Anne Berit Kristiansen" width={756} height={756} loading="lazy" />
          <span className="mt-4 block px-1.5 text-xs tracking-widest">Anne Berit Kristiansen</span>
        </div>
        <div className="bg-background/95 p-[clamp(1.5rem,3vw,3rem)]">
          <h2 id="about-title" className="
            mt-6 mb-8 font-serif text-[clamp(3rem,10vw,4.5rem)] leading-[1.1] font-normal
            tracking-tighter md:text-[clamp(3rem,5.2vw,5.5rem)]
          ">"Tittel"</h2>
          <p className="mt-4 max-w-[390px] leading-7 text-muted">Informasjon...</p>
        </div>
      </div>
    </section>
  )
}
