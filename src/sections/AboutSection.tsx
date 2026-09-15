import { useRef } from 'react'
import { FlowerTransition } from '../components/FlowerTransition'
import profileImg from '../assets/profileImg.webp'
import aboutImage from '../assets/about-landscape.jpg'

export function AboutSection() {
  const sceneRef = useRef<HTMLElement>(null)

  return (
    <section ref={sceneRef} className="about-scene" aria-labelledby="about-title" data-scene="portrait">
      <div className="about-sticky-visual">
        <div className="about-artwork" data-layer="landscape" aria-hidden="true">
          <img src={aboutImage} alt="Malt landskap med fjell, grønne åser og små hus i varme jordtoner." />
        </div>
        <div className="about-shade" data-layer="shade" aria-hidden="true" />
        <FlowerTransition sceneRef={sceneRef} />
      </div>
      <div id="om-meg" className="story-about story-section">
        <div className="portrait-frame" data-layer="portrait">
          <img src={profileImg} alt="Anne Berit Kristiansen" width={756} height={756} loading="lazy" />
          <span className="portrait-caption">Anne Berit Kristiansen</span>
        </div>
        <div className="about-copy" data-layer="copy">
          <p className="eyebrow">Hyggelig at du er her</p>
          <h2 id="about-title">"Tittel"</h2>
          <p>Informasjon...</p>
        </div>
      </div>
    </section>
  )
}
