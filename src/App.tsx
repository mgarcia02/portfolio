import Cursor from "@/components/ui/Cursor"
import Navbar from "@/components/layout/Navbar"
import { Hero } from "@/components/Sections/Hero"
import { Marquee } from "@/components/Sections/Marquee"
import { About } from "@/components/Sections/About"
import { Stats } from "@/components/Sections/Stats"
import { Projects } from "@/components/Sections/Projects"
import { Contact } from "@/components/Sections/Contact"
import { Footer } from "@/components/layout/Footer"

function App() {
  return (
    <div>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
