# Anne Berit Kristiansen

En personlig fortellingsside med landskapsbilde, portrett, veien videre og kontakt.

## Bilder og oppsett

Forsiden bruker `src/assets/hero-landscape.jpg`. De andre bildene er
`about-landscape.jpg`, `profileImg.webp` og `Flower_Img.png`.

Om meg har bakgrunn, portrett og tekst i samme sticky lag. Innholdet står
stille mens en blomstergardin åpner seg fra midten. Ved redusert bevegelse brukes
vanlig seksjonslayout uten ekstra scrollstrekning.

Kjør lokalt med `npm run dev`. Kontroller med `npm run build` og `npm run lint`.

## Blomsterovergang

`FlowerTransition` ligger i det sticky bakgrunnslaget i «Om meg» og mottar
seksjonens `sceneRef` for å måle scrollposisjon. Seksten kopier av
`Flower_Img.png` dekker 105–116 % av skjermhøyden og trekkes til sidene.
Blomsterlaget ligger foran hero og kan strekke seg 15 svh over seksjonsgrensen.
Blomstene beholder full opasitet og beveger seg helt utenfor det synlige laget.
Bevegelsen reverseres når man scroller tilbake. Juster `flowers` i komponenten
for plassering, størrelse, rotasjon og bevegelse. `offset` varierer høyden,
`delay` forskyver åpningen, `bend` styrer hvor langt stilken bøyer utover, og
`mirror` speilvender bildet; utseendet styres av Tailwind-klassene i
`FlowerTransition.tsx`. Overgangen tar ingen plass i dokumentflyten og slipper
klikk gjennom. Den skjules når brukeren foretrekker redusert bevegelse.

Åpningen starter når seksjonen låses ved skjermtoppen. Et eget avstandselement med `h-[120svh]` i
`AboutSection.tsx` bestemmer scrollstrekningen. Blomstene er ute etter 95 % av
strekningen, slik at innholdet blir stående synlig før hele seksjonen scroller
videre. Ankeret `#om-meg` ligger ved slutten av åpningen; endre også ankerets
`top-[120svh]` hvis scrollstrekningen endres. Ved redusert bevegelse skjules
blomstene og den ekstra scrollstrekningen fjernes.

## Styling med Tailwind

Layout, typografi, responsive størrelser og tilstander ligger som Tailwind-klasser
i komponentene. Mobil er utgangspunktet; `md:` tilpasser større skjermer og
`motion-reduce:` tar hensyn til redusert bevegelse.

- `tailwind.config.js` samler farger, skrifter og de flytende avstandene
  `page`, `section` og `section-y`.
- `Container` gir felles sidebredde og innrykk til header og footer.
- `src/tailwind.css` inneholder kun Tailwind-import og konfigurasjonsreferanse.
- Blomstenes beregnede bevegelser settes i JavaScript; layout og
  responsive størrelser bruker Tailwind. `data-flower-stem` brukes av
  JavaScript for å finne stilkene som skal animeres.
