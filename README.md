# Anne Berit Kristiansen

En personlig fortellingsside med landskapsbilde, portrett, veien videre og kontakt.

## Bilder og oppsett

Forsiden bruker `src/assets/hero-landscape.jpg`. De andre bildene er
`about-landscape.jpg`, `profileImg.webp` og `Flower_Img.png`.

Om meg bruker `about-landscape.jpg` i et sticky bakgrunnslag. Bildet låses ved
skjermtoppen mens innholdet fortsetter å scrolle. Ved redusert bevegelse brukes
vanlig seksjonslayout uten ekstra scrollstrekning.

Kjør lokalt med `npm run dev`. Kontroller med `npm run build` og `npm run lint`.

## Blomsterovergang

`FlowerTransition` ligger i det sticky bakgrunnslaget i «Om meg» og mottar
seksjonens `sceneRef` for å måle scrollposisjon. Seksten kopier av
`Flower_Img.png` løftes, roteres og spres til sidene etter scrollposisjonen.
Bevegelsen reverseres når man scroller tilbake. Juster `flowers` i komponenten
for plassering, størrelse, rotasjon og bevegelse. `offset` varierer høyden,
`delay` forskyver åpningen, `bend` styrer hvor langt stilken bøyer utover, og
`mirror` speilvender bildet; utseendet styres av Tailwind-klassene i
`FlowerTransition.tsx`. Overgangen tar ingen plass i dokumentflyten og slipper
klikk gjennom. Den skjules når brukeren foretrekker redusert bevegelse.

Reveal starter én skjermhøyde før seksjonen når toppen, og slutter 1,1
skjermhøyder etter at bildet låses. Faktoren `2.1` i komponenten styrer samlet
scrollstrekning. Innholdet i «Om meg» har `mt-[35svh]`, som lar bakgrunnen vises
alene før portrett og tekst kommer opp. Bildet slipper når bunnen av seksjonen
når bunnen av skjermen.

## Styling med Tailwind

Layout, typografi, responsive størrelser og tilstander ligger som Tailwind-klasser
i komponentene. Mobil er utgangspunktet; `md:` tilpasser større skjermer og
`motion-reduce:` tar hensyn til redusert bevegelse.

- `tailwind.config.js` samler farger, skrifter og de flytende avstandene
  `page`, `section` og `section-y`.
- `Container` gir felles sidebredde og innrykk til header og footer.
- `src/tailwind.css` inneholder kun Tailwind-import og konfigurasjonsreferanse.
- Blomstenes beregnede bevegelser settes i JavaScript; layout, maske og
  responsive størrelser bruker Tailwind. `data-flower-stem` brukes av
  JavaScript for å finne stilkene som skal animeres.
