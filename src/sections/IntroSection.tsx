import heroImage from '../assets/hero-landscape.jpg'
import heroSmall from '../assets/hero-landscape-small.jpg'

export function IntroSection() {
  return (
    <section id="hjem" className="story-hero" aria-labelledby="intro-title" data-scene="opening">
      <div className="hero-artwork" data-layer="landscape">
        <img src={heroImage} srcSet={`${heroSmall} 1200w, ${heroImage} 2560w`} sizes="100vw" alt="Malt landskap med fjell, grønne åser og små hus i varme jordtoner." fetchPriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" data-layer="shade" />
      <div className="hero-copy" data-layer="title">
        <p className="eyebrow">Et lite innblikk i livet mitt</p>
        <h1 id="intro-title">Anne Berit<br /><em>Kristiansen</em></h1>
        <p className="hero-description">Reiseleder på heltid, pensjonist på deltid.</p>
      </div>
      <div className="hero-bottom" data-layer="invitation">
        <a href="#om-meg" className="scroll-invitation"><span className="scroll-arrow" aria-hidden="true">↓</span> Bli med videre</a>
      </div>
    </section>
  )
}
