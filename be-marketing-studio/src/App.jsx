import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { LangProvider } from './LangContext'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import BEMethod from './components/BEMethod'
import Stats from './components/Stats'
import About from './components/About'
import CallCTA from './components/CallCTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scroll after preloader
    if (!loaded) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    // Connect GSAP ticker to Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [loaded])

  return (
    <LangProvider>
    <>
      {/* Custom cursor - desktop only */}
      <div className="hidden md:block">
        <Cursor />
      </div>

      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Main site */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Stats />
          <BEMethod />
          <About />
          <CallCTA />
        </main>
        <Footer />
      </div>
    </>
    </LangProvider>
  )
}
