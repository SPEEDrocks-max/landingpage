import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'

import Lenis from 'lenis'

import Scene from '../components/scene/Scene'
import Nav from '../components/layout/Nav'
import Hero from '../components/landing/Hero'
import GlassTransition from '../components/landing/GlassTransition'
import DeferredSection from '../components/performance/DeferredSection'
import Atmosphere from '../components/background/Atmosphere'
import MagneticCursor from '../components/interaction/MagneticCursor'

import { useStore } from '../store/useStore'


/*
========================================
LAZY LOADED LOWER SECTIONS
========================================
*/

const TrustStrip = lazy(
  () =>
    import(
      '../components/studio/TrustStrip'
    )
)

const CreatePage = lazy(
  () =>
    import('../pages/CreatePage')
)

const FinalSection = lazy(
  () =>
    import('../pages/FinalSection')
)


export default function App() {

  const setScrollProgress = useStore(
    (state) => state.setScrollProgress
  )

  const setPointer = useStore(
    (state) => state.setPointer
  )

  const rafRef = useRef(null)


  /*
  ========================================
  POINTER TYPE DETECTION
  ========================================

  Desktop / mouse:
  Magnetic cursor enabled

  Mobile / touch:
  Magnetic cursor not mounted
  */

  const [
    hasFinePointer,
    setHasFinePointer,
  ] = useState(false)


  useEffect(() => {

    const pointerQuery =
      window.matchMedia(
        '(pointer: fine)'
      )


    function updatePointerType() {

      setHasFinePointer(
        pointerQuery.matches
      )

    }


    updatePointerType()


    pointerQuery.addEventListener(
      'change',
      updatePointerType
    )


    return () => {

      pointerQuery.removeEventListener(
        'change',
        updatePointerType
      )

    }

  }, [])


  /*
  ========================================
  LENIS + POINTER TRACKING
  ========================================
  */

  useEffect(() => {

    /*
    ========================================
    SMOOTH SCROLL
    ========================================
    */

    const lenis = new Lenis({

      duration: 1.35,

      smoothWheel: true,

      /*
      Native touch scrolling.
      */

      smoothTouch: false,

      wheelMultiplier: 0.85,

      touchMultiplier: 1,

    })


    /*
    ========================================
    LANDING SCROLL PROGRESS
    ========================================
    */

    function updateScrollProgress() {

      const landingDistance =
        window.innerHeight * 2.2


      const progress =
        Math.min(

          Math.max(

            window.scrollY /
              landingDistance,

            0

          ),

          1

        )


      setScrollProgress(
        progress
      )

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
        requestAnimationFrame(
          raf
        )

    }


    rafRef.current =
      requestAnimationFrame(
        raf
      )


    /*
    ========================================
    POINTER TRACKING
    ========================================
    */

    function handlePointerMove(event) {

      const x =
        event.clientX /
        window.innerWidth


      const y =
        event.clientY /
        window.innerHeight


      setPointer({

        x: x * 2 - 1,

        y: -(y * 2 - 1),

      })

    }


    /*
    Only attach pointer tracking
    on actual mouse / fine pointer devices.
    */

    if (hasFinePointer) {

      window.addEventListener(

        'pointermove',

        handlePointerMove,

        {
          passive: true,
        }

      )

    }


    updateScrollProgress()


    /*
    ========================================
    CLEANUP
    ========================================
    */

    return () => {

      if (hasFinePointer) {

        window.removeEventListener(

          'pointermove',

          handlePointerMove

        )

      }


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

    hasFinePointer,

  ])


  /*
  ========================================
  PAGE
  ========================================
  */

  return (

    <main
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-black
        text-white
        touch-pan-y
      "
    >


      {/* ===================================
          MAGNETIC CURSOR

          Desktop only.
          Component does not mount on mobile.
      =================================== */}

      {hasFinePointer && (
        <MagneticCursor />
      )}


      {/* GLOBAL ATMOSPHERE */}

      <Atmosphere />


      {/* FIXED 3D WORLD */}

      <Scene />


      {/* GLOBAL NAVIGATION */}

      <Nav />


      {/* LANDING UI */}

      <Hero />


      {/* ===================================
          LANDING EXPERIENCE RUNWAY
      =================================== */}

      <section
        className="
          relative
          z-0
          h-[320vh]
          pointer-events-none
        "
        aria-hidden="true"
      />


      {/* ===================================
          GLASS → STUDIO LANDING
      =================================== */}

      <GlassTransition />


      {/* ===================================
          LOWER CONTENT
      =================================== */}

      <Suspense fallback={null}>

        <TrustStrip />


        <DeferredSection
          minHeight="180vh"
          rootMargin="1200px 0px"
        >

          <CreatePage />

        </DeferredSection>


        <DeferredSection
          minHeight="100vh"
          rootMargin="1200px 0px"
        >

          <FinalSection />

        </DeferredSection>

      </Suspense>


    </main>

  )
}