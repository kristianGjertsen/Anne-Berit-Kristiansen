import heroImage from '../assets/hero-landscape.jpg'

export function IntroSection() {
  return (
    <section id="hjem" className="
      relative isolate flex min-h-[max(700px,100svh)] flex-col justify-end px-page pt-40 pb-6
      text-cream md:min-h-[max(740px,100svh)] md:pt-[180px] md:pb-8
    " aria-labelledby="intro-title">
      <div className="absolute inset-0 -z-2 overflow-hidden">
        <img className="h-full w-full object-cover object-[48%_center] md:object-[center_44%] min-[1600px]:object-[center_55%]" src={heroImage} alt="Malt landskap med fjell, grønne åser og små hus i varme jordtoner." fetchPriority="high" />
      </div>
      <div className="
        absolute inset-0 -z-1 overflow-hidden
        bg-[linear-gradient(180deg,#f4f1e838_0%,transparent_25%,#102c256b_60%,#102c25c4_100%)]
      " aria-hidden="true" />
      <div className="pb-14 md:pb-[clamp(3rem,8vh,7rem)]">
        <h1 id="intro-title" className="
          my-6 font-serif text-[clamp(3.6rem,13vw,6rem)] leading-[.94] font-normal tracking-tighter
          md:text-[clamp(4.3rem,8.8vw,9rem)]
        ">Anne Berit<br /><em>Kristiansen</em></h1>
        <p className="text-[clamp(1rem,1.5vw,1.3rem)] leading-relaxed">Reiseleder på heltid, pensjonist på deltid.</p>
      </div>
    </section>
  )
}
