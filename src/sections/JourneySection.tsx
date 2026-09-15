export function JourneySection() {
  return (
    <section id="veien-videre" className="story-journey story-section" aria-labelledby="journey-title" data-scene="journey">
      <p className="eyebrow" data-layer="label">Underveis</p>
      <h2 id="journey-title" data-layer="title">Det er alltid plass<br />til et <em>nytt kapittel.</em></h2>
      <div className="journey-bottom" data-layer="copy">
        <span className="journey-line" aria-hidden="true" />
        <p>Et lite innblikk i meg, tankene mine<br />og det som kommer videre.</p>
        <a href="#kontakt" className="round-link" aria-label="Videre til kontakt">↓</a>
      </div>
    </section>
  )
}
