import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../../store/useStore'
gsap.registerPlugin(ScrollTrigger)
import StudioLanding from '../../pages/StudioLanding'
export default function GlassTransition() {
  const sectionRef = useRef(null)
  const glassRef = useRef(null)
  const contentRef = useRef(null)
  const labelRef = useRef(null)
 const setGlassProgress = useStore(
  (state) => state.setGlassProgress
)
  useEffect(() => {
    const ctx = gsap.context(() => {
      /*
        IMPORTANT:

        Glass starts FULLY below viewport.

        yPercent: 100
        means its own full height below screen.
      */

      gsap.set(glassRef.current, {
        yPercent: 100,
        scale: 0.94,
        borderRadius: 36,
      })

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 50,
        filter: 'blur(14px)',
      })

      gsap.set(labelRef.current, {
        opacity: 0,
        y: 10,
      })


      const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=300%',
    scrub: 1.2,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,

    onUpdate: (self) => {
      setGlassProgress(self.progress)
    },

    onLeaveBack: () => {
      setGlassProgress(0)
    },
  },
},[setGlassProgress])
   

      /*
        PHASE 1

        Glass rises slowly.

        100% below viewport
        ↓
        only 35% translated

        Meaning:
        glass now covers roughly
        65% of viewport.
      */

      timeline.to(
        glassRef.current,
        {
          yPercent: 35,

          scale: 0.97,

          borderRadius: 30,

          ease: 'power2.out',

          duration: 4,
        }
      )


      /*
        SMALL CINEMATIC HOLD

        Glass remains around
        65% screen coverage.

        This tiny pause gives the user
        time to understand the panel.
      */

      timeline.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,

          duration: 0.6,

          ease: 'power2.out',
        },
        '-=0.8'
      )


      timeline.to(
        {},
        {
          duration: 0.5,
        }
      )


      /*
        PHASE 2

        RAPID ACCELERATION.

        Glass goes from 65% coverage
        to full screen.

        power4.in gives momentum.
      */

      timeline.to(
        glassRef.current,
        {
          yPercent: 0,

          scale: 1,

          borderRadius: 0,

          ease: 'power4.in',

          duration: 1.4,
        }
      )


      /*
        Remove transition label.
      */

      timeline.to(
        labelRef.current,
        {
          opacity: 0,
          y: -10,

          duration: 0.3,
        },
        '-=0.3'
      )


      /*
        PHASE 3

        Reveal next page content.
      */

      timeline.to(
        contentRef.current,
        {
          opacity: 1,

          y: 0,

          filter: 'blur(0px)',

          duration: 1.4,

          ease: 'power3.out',
        },
        '-=0.15'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])


  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-30
        h-screen
        w-full
      "
    >
      <div
        className="
          relative
          h-screen
          w-full
          overflow-hidden
        "
      >

        {/* GLASS WINDOW */}

        <div
          ref={glassRef}
          className="
            absolute
            inset-0

            overflow-hidden

            border
            border-white/20

            bg-black/55

            backdrop-blur-3xl

            shadow-[
              0_-20px_80px_rgba(255,255,255,0.08),
              0_-60px_160px_rgba(0,0,0,0.9)
            ]

            will-change-transform
          "
        >

          {/* GLASS REFLECTION */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0

              bg-gradient-to-b

              from-white/[0.12]
              via-white/[0.025]
              to-transparent
            "
          />


          {/* TOP LIGHT EDGE */}

          <div
            className="
              pointer-events-none
              absolute

              left-[8%]
              right-[8%]
              top-0

              h-px

              bg-gradient-to-r

              from-transparent
              via-white/80
              to-transparent
            "
          />


          {/* REFRACTION GLOW */}

          <div
            className="
              pointer-events-none
              absolute

              left-1/2
              top-0

              h-48
              w-[65%]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-white/[0.10]

              blur-[90px]
            "
          />


          {/* NEXT PAGE PLACEHOLDER */}

          {/* NEXT PAGE */}

<div
  ref={contentRef}
  className="
    relative
    z-10
    h-full
    w-full
    overflow-hidden
  "
>
  <StudioLanding />
</div>
</div>

        {/* TRANSITION LABEL */}

        <div
          ref={labelRef}
          className="
            pointer-events-none

            absolute

            bottom-10
            left-1/2

            z-40

            -translate-x-1/2

            font-mono

            text-[8px]

            uppercase

            tracking-[0.4em]

            text-white/35
          "
        >
          Entering creation environment
        </div>

      </div>
    </section>
  )
}