import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import CreatePage from '../pages/CreatePage'
import Scene from '../components/scene/Scene'
import Nav from '../components/layout/Nav'
import Hero from '../components/landing/Hero'
import GlassTransition from '../components/landing/GlassTransition'
import StudioLanding from '../pages/StudioLanding'
import TrustStrip from '../components/studio/TrustStrip'
import { useStore } from '../store/useStore'
import FinalSection from '../pages/FinalSection'
import Atmosphere from '../components/background/Atmosphere'
import MagneticCursor from '../components/interaction/MagneticCursor'

export default function App() {
  const setScrollProgress = useStore(
    (state) => state.setScrollProgress
  )

  const setPointer = useStore(
    (state) => state.setPointer
  )

  const rafRef = useRef(null)


  useEffect(() => {

    /*
    ========================================
    SMOOTH SCROLL
    ========================================
    */

    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    })


    /*
    ========================================
    LANDING SCROLL PROGRESS
    ========================================

    IMPORTANT:

    We do NOT calculate progress from the
    complete website height anymore.

    Otherwise adding GlassTransition would
    change the timing of the torus animation.

    The first 320vh belongs to the
    landing experience.
    ========================================
    */

    function updateScrollProgress() {
      const landingDistance =
        window.innerHeight * 2.2

      const progress =
        Math.min(
          Math.max(
            window.scrollY / landingDistance,
            0
          ),
          1
        )

      setScrollProgress(progress)
    }


    /*
    ========================================
    LENIS RAF LOOP
    ========================================
    */

    function raf(time) {
      lenis.raf(time)

      updateScrollProgress()

      rafRef.current =
        requestAnimationFrame(raf)
    }


    rafRef.current =
      requestAnimationFrame(raf)


    /*
    ========================================
    POINTER TRACKING
    ========================================
    */

    function handlePointerMove(event) {
      const x =
        event.clientX / window.innerWidth

      const y =
        event.clientY / window.innerHeight

      setPointer({
        x: x * 2 - 1,
        y: -(y * 2 - 1),
      })
    }


    window.addEventListener(
      'pointermove',
      handlePointerMove
    )


    updateScrollProgress()


    /*
    ========================================
    CLEANUP
    ========================================
    */

    return () => {

      window.removeEventListener(
        'pointermove',
        handlePointerMove
      )

      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        )
      }

      lenis.destroy()
    }

  }, [
    setPointer,
    setScrollProgress,
  ])


  return (
    <main
      className="
        
    relative
    min-h-screen
    overflow-x-hidden
    bg-black
    text-white
  "
      
    >
      <MagneticCursor />
      <Atmosphere />
      {/* FIXED 3D WORLD */}

      <Scene />


      {/* GLOBAL NAVIGATION */}

      <Nav />


      {/* LANDING UI */}

      <Hero />


      {/*
        LANDING EXPERIENCE RUNWAY

        torus
          ↓
        explosion
          ↓
        cloud
          ↓
        audio ribbon
      */}

      {/* LANDING EXPERIENCE RUNWAY */}

<section
  className="
    relative
    z-0
    h-[320vh]
    pointer-events-none
  "
  aria-hidden="true"
/>


{/* GLASS → STUDIO LANDING TRANSITION */}

<GlassTransition />


{/* TRUST STRIP */}

<TrustStrip />


{/* MAIN CONTENT PAGE */}

<CreatePage />


{/* FINAL CTA + FOOTER — ALWAYS LAST */}

<FinalSection />
    </main>
  )
}