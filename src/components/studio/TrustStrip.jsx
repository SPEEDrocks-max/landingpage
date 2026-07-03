import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const names = [
  'SONICLABS',
  'WAVEFORM',
  'AUDIO.AI',
  'SYNTHETICA',
  'echo_',
]


export default function TrustStrip() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)


  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',

          duration: 1.2,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      )

    }, sectionRef)


    return () => ctx.revert()
  }, [])


  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-40

        overflow-hidden

        border-y
        border-white/10

        bg-white/[0.035]

        py-14

        text-white

        backdrop-blur-xl
      "
    >

      {/* GRADIENT BRIDGE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-[-180px]

          h-[420px]

          bg-[radial-gradient(ellipse_at_center,rgba(170,55,25,0.20),rgba(90,20,70,0.10)_40%,transparent_72%)]

          blur-[60px]
        "
      />


      {/* CONTENT */}

      <div
        ref={contentRef}
        className="
          relative
          z-10
        "
      >

        <p
          className="
            text-center

            font-mono
            text-[10px]

            uppercase

            tracking-[0.32em]

            text-white/35
          "
        >
          Trusted by avant-garde creators at
        </p>


        <div
          className="
            mx-auto
            mt-6

            flex
            max-w-5xl
            flex-wrap

            items-center
            justify-center

            gap-x-16
            gap-y-6

            px-6
          "
        >

          {names.map((name) => (

            <span
              key={name}
              className="
                text-xl
                font-semibold

                tracking-[-0.04em]

                text-white/35

                transition-all
                duration-300

                hover:text-white
              "
            >
              {name}
            </span>

          ))}

        </div>

      </div>

    </section>
  )
}