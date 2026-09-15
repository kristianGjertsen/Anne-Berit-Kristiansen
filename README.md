# Anne Berit Kristiansen

En personlig fortellingsside med landskapsbilde, portrett, veien videre og kontakt.

## Struktur for animasjon

Hver seksjon har et `data-scene`-attributt: `opening`, `portrait`, `journey` og
`contact`. Elementer som kan animeres separat, er merket med `data-layer`.
Åpningen har egne lag for landskap, skygge, tittel og scroll-invitasjon.
Dette gir faste holdepunkter for senere scrollanimasjoner. Innholdet er synlig
uten animasjon; respekter `prefers-reduced-motion` når bevegelse legges til.

`src/assets/Hero-background.jpg` er originalbildet. Forsiden bruker de nedskalerte
nettversjonene `hero-landscape.jpg` og `hero-landscape-small.jpg` via `srcSet`.

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
`mirror` speilvender bildet; utseendet ligger i
`FlowerTransition.css`. Overgangen tar ingen plass i dokumentflyten og slipper
klikk gjennom. Den skjules når brukeren foretrekker redusert bevegelse.

Reveal starter én skjermhøyde før seksjonen når toppen, og slutter 1,1
skjermhøyder etter at bildet låses. Faktoren `2.1` i komponenten styrer samlet
scrollstrekning. `.story-about` har `margin-top: 35svh`, som lar bakgrunnen vises
alene før portrett og tekst kommer opp. Bildet slipper når bunnen av seksjonen
når bunnen av skjermen.
