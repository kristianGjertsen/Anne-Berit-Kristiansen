import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { IntroSection } from './sections/IntroSection'
import { AboutSection } from './sections/AboutSection'
import { JourneySection } from './sections/JourneySection'
import { ContactSection } from './sections/ContactSection'

export function App() {
  return (
    <div className="
      flex min-h-dvh flex-col [&_a]:wrap-anywhere [&_:focus-visible]:outline-2
      [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-foreground
    ">
      <title>Anne Berit Kristiansen</title>
      <meta
        name="description"
        content="Et lite innblikk i meg, tankene mine og det som kommer videre."
      />
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50
          focus:bg-foreground focus:px-5 focus:py-3 focus:text-background
        "
      >
        Hopp til innhold
      </a>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <IntroSection />
        <AboutSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
