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
            <span className="mt-3 block text-xs tracking-widest">Anne Berit Kristiansen</span>
          </div>
          <div className="w-full bg-background/95 p-6 md:p-10">
            <h2 id="about-title" className="mb-6 font-serif text-5xl leading-[1.1] tracking-tighter md:text-7xl">
              "Tittel"
            </h2>
            <p className="max-w-sm leading-7 text-muted">Informasjon...</p>
          </div>
        </div>
        <FlowerTransition sceneRef={sceneRef} />
      </div>
      {/* A real spacer keeps the sticky layer pinned throughout the opening. */}
      <div className="h-[120svh] motion-reduce:hidden" aria-hidden="true" />
    </section>
  )
}
