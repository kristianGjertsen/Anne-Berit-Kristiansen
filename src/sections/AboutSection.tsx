import { useRef } from 'react'
import { FlowerTransition } from '../components/FlowerTransition'
import profileImg from '../assets/profileImg.webp'
import aboutImage from '../assets/about-landscape.jpg'

export function AboutSection() {
  const sceneRef = useRef<HTMLElement>(null)

  return (
    <section ref={sceneRef} className="relative isolate scroll-mt-0" aria-labelledby="about-title" data-scene="portrait">
      <div className="sticky top-0 isolate h-svh motion-reduce:absolute motion-reduce:inset-0 motion-reduce:h-full">
        <div className="pointer-events-none absolute inset-0 -z-2 overflow-hidden" data-layer="landscape" aria-hidden="true">
          <img className="h-full w-full scale-[1.055] object-cover object-center motion-reduce:scale-100" src={aboutImage} alt="Malt landskap med fjell, grønne åser og små hus i varme jordtoner." />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-1 overflow-hidden bg-[linear-gradient(90deg,#23392f24,#f4f1e81a)]" data-layer="shade" aria-hidden="true" />
        <FlowerTransition sceneRef={sceneRef} />
      </div>
      <div id="om-meg" className="pointer-events-none relative z-6 mt-[35svh] grid min-h-svh scroll-mt-0 grid-cols-1 items-center gap-12 px-section py-section-y md:grid-cols-2 md:gap-[clamp(3rem,10vw,10rem)] motion-reduce:mt-0">
        <div className="pointer-events-auto w-[85%] max-w-[440px] bg-background px-3 pt-3 pb-[18px] shadow-[0_16px_60px_#182b3026]" data-layer="portrait">
          <img className="aspect-[4/5] w-full object-cover" src={profileImg} alt="Anne Berit Kristiansen" width={756} height={756} loading="lazy" />
          <span className="mt-[18px] block px-1.5 text-[.65rem] tracking-[.1em]">Anne Berit Kristiansen</span>
        </div>
        <div className="pointer-events-auto bg-background/95 p-[clamp(1.5rem,3vw,3rem)]" data-layer="copy">
          <h2 id="about-title" className="mt-[26px] mb-[30px] font-serif text-[clamp(3rem,10vw,4.5rem)] leading-[1.08] font-normal tracking-[-.05em] md:text-[clamp(3rem,5.2vw,5.5rem)]">"Tittel"</h2>
          <p className="mt-[18px] max-w-[390px] leading-[1.85] text-muted">Informasjon...</p>
        </div>
      </div>
    </section>
  )
}
