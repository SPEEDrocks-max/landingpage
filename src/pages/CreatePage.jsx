import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RevealText from '../components/animation/RevealText'
import RevealCards from '../components/animation/RevealCards'

gsap.registerPlugin(ScrollTrigger)

export default function CreatePage() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const glowRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    const glow = glowRef.current

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          y: 120,
          opacity: 0,
          filter: 'blur(18px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

     gsap.to(grid, {
  backgroundPositionX: '180px',
  backgroundPositionY: '320px',

  rotation: 0.6,
  scale: 1.08,

  ease: 'none',

  scrollTrigger: {
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.8,
  },
})

      gsap.to(glow, {
        yPercent: 30,
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, section)

   function handleMouseMove(event) {
  const x =
    event.clientX / window.innerWidth - 0.5

  const y =
    event.clientY / window.innerHeight - 0.5


  gsap.to(grid, {
    x: x * 35,
    y: y * 25,

    rotationX: y * -1.2,
    rotationY: x * 1.2,

    duration: 2.2,
    ease: 'power3.out',
    overwrite: 'auto',
  })


  gsap.to(glow, {
    x: x * 90,
    y: y * 35,

    duration: 3,
    ease: 'power3.out',
    overwrite: 'auto',
  })
}

    window.addEventListener(
      'mousemove',
      handleMouseMove
    )

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-40
        min-h-[130vh]
        overflow-hidden
        bg-[#090909]
        text-white
      "
    > 
      {/* SECTION ENTRY FADE */}

<div
  className="
    pointer-events-none
    absolute
    left-0
    right-0
    top-0
    z-[5]

    h-48

    bg-gradient-to-b
    from-black
    via-black/50
    to-transparent
  "
/>

      {/* WARM GRADIENT WORLD */}

      <div
        ref={glowRef}
        className="
          pointer-events-none
          absolute
          -left-[10%]
          top-[-10%]
          h-[1000px]
          w-[1200px]
          rounded-full
          blur-[120px]
          will-change-transform
        "
        style={{
          background: `
            radial-gradient(
              circle at 35% 40%,
              rgba(255, 170, 0, 0.42),
              rgba(190, 55, 20, 0.30) 35%,
              rgba(100, 15, 80, 0.18) 58%,
              transparent 75%
            )
          `,
        }}
      />


      {/* SECOND COLOR BLOOM */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-20%]
          top-[5%]
          h-[800px]
          w-[900px]
          rounded-full
          blur-[140px]
        "
        style={{
          background: `
            radial-gradient(
              circle,
              rgba(170, 20, 75, 0.28),
              transparent 70%
            )
          `,
        }}
      />


      {/* MOVING GRID */}

      {/* MOVING GRID */}

<div
  ref={gridRef}
  className="
    pointer-events-none
    absolute
    -inset-[180px]
    opacity-[0.50]
    will-change-transform
  "
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(255,255,255,0.16) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,0.16) 1px,
        transparent 1px
      )
    `,

    backgroundSize: '90px 90px',

    transformOrigin: 'center center',

    transformStyle: 'preserve-3d',
  }}
/>
{/* GRID DEPTH FADE */}

<div
  className="
    pointer-events-none
    absolute
    inset-0
    z-[1]

    bg-gradient-to-b
    from-[#090909]/70
    via-transparent
    to-[#090909]/80
  "
/>



      {/* DARK EDGE VIGNETTE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.72)_100%)]
        "
      />


      {/* CONTENT */}

      <div className="relative z-10">


        {/* ENGINE SECTION */}

        <section
          className="
            flex
            min-h-screen
            flex-col
            justify-center
            px-6
            py-32
            md:px-12
            lg:px-20
          "
        >
          <div className="mx-auto w-full max-w-7xl">

            <div className="text-center">

              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-white/45
                "
              >
                Engine Specifications
              </p>


              <h2
                ref={headingRef}
                className="
                  display-heading
                  text-[clamp(3rem,6vw,6.5rem)]
                "
              >
                <RevealText>
                  Built for sound
                </RevealText>

                <RevealText delay={0.08}>
                  <span className="text-white/40">
                    without compromise.
                  </span>
                </RevealText>
              </h2>

            </div>


            <RevealCards
              className="
                mt-20
                grid
                gap-4
                lg:grid-cols-3
              "
            >

              <FeatureCard
                number="01"
                tag="PCM 24-BIT"
                title="Neural Music Synthesis"
                image="/images/features/neural-synthesis.png"
              >
                Generate lossless linear PCM audio with direct-to-audio
                neural diffusion built for high-detail composition.
              </FeatureCard>


              <FeatureCard
                number="02"
                tag="VOCAL DIT"
                title="Consistent Singer Profiles"
                image="/images/features/singer-profile.png"
              >
                Build specialized vocal identities that remain coherent
                across lyrics, genres and complete releases.
              </FeatureCard>


              <FeatureCard
                number="03"
                tag="WEBGL NODE"
                title="Turntable Audition"
                image="/images/features/dj.png"
              >
                Explore, playback and shape your generated compositions
                through an interactive visual listening environment.
              </FeatureCard>

            </RevealCards>

          </div>
        </section>


        {/* CREATOR PROOF */}

        <section
          className="
            min-h-screen
            px-6
            py-32
            md:px-12
            lg:px-20
          "
        >
          <div className="mx-auto max-w-7xl">

            <div className="text-center">

              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-white/45
                "
              >
                Wall of Sound
              </p>


              <h2
                className="
                  mt-5
                  text-[clamp(3rem,6vw,6.5rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                "
              >
                <RevealText>
                  Made for people
                </RevealText>

                <br />

                <RevealText delay={0.08}>
                  <span className="text-white/40">
                    who hear differently.
                  </span>
                </RevealText>
              </h2>

            </div>


            <RevealCards
              className="
                mt-20
                grid
                gap-4
                lg:grid-cols-3
              "
            >

              <CreatorCard
                initials="AK"
                name="Alex K."
                role="Producer"
              >
                “The vocal consistency is unmatched. I built an entire
                EP around one singer profile, and every track feels like
                it came from the same recording session.”
              </CreatorCard>


              <CreatorCard
                initials="SJ"
                name="Sarah J."
                role="Game Designer"
              >
                “I needed soundtracks that could follow different worlds
                and moods. The engine gets remarkably close to what I hear
                in my head.”
              </CreatorCard>


              <CreatorCard
                initials="MD"
                name="Marcus D."
                role="Sound Engineer"
              >
                “The high-fidelity output means I can move straight into
                my production workflow instead of fighting artifacts first.”
              </CreatorCard>

            </RevealCards>

          </div>
        </section>

      </div>


      {/* NEXT SECTION TEASER */}

      <div
        className="
          relative
          z-10
          flex
          h-[30vh]
          items-end
          justify-between
          border-t
          border-white/15
          px-8
          pb-8
          font-mono
          text-[9px]
          uppercase
          tracking-[0.3em]
          text-white/40
          md:px-14
        "
      >
        <span>Scroll to explore</span>

        <span>01 / Creation Engine</span>
      </div>

    </section>
  )
}


function FeatureCard({
  number,
  tag,
  title,
  image,
  children,
}) {
  const gradients = {
    '01': `
      radial-gradient(
        circle at 20% 20%,
        rgba(255, 176, 46, 0.38),
        transparent 38%
      ),
      radial-gradient(
        circle at 85% 75%,
        rgba(181, 44, 24, 0.30),
        transparent 48%
      )
    `,

    '02': `
      radial-gradient(
        circle at 75% 20%,
        rgba(184, 46, 105, 0.38),
        transparent 40%
      ),
      radial-gradient(
        circle at 15% 85%,
        rgba(113, 35, 150, 0.30),
        transparent 50%
      )
    `,

    '03': `
      radial-gradient(
        circle at 25% 25%,
        rgba(41, 116, 180, 0.34),
        transparent 42%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(95, 42, 156, 0.34),
        transparent 48%
      )
    `,
  }

  return (
    <article
      className="
        group
        relative
        min-h-[500px]
        overflow-hidden

        rounded-[2rem]

        border
        border-white/15

        bg-black/40

        p-5

        backdrop-blur-xl

        transition-all
        duration-700

        hover:-translate-y-2
        hover:border-white/30

        hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]
      "
    >

      {/* MONOCHROME BASE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          bg-gradient-to-br
          from-white/[0.08]
          via-white/[0.025]
          to-transparent

          opacity-100

          transition-opacity
          duration-700

          group-hover:opacity-20
        "
      />


      {/* COLOR REVEAL */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-0

          transition-all
          duration-1000

          group-hover:scale-110
          group-hover:opacity-100
        "
        style={{
          background: gradients[number],
        }}
      />


      {/* IMAGE */}

      <div
        className="
          relative
          z-10

          mt-11

          h-[220px]
          w-full

          overflow-hidden

          rounded-[1.4rem]

          border
          border-white/10
        "
      >
        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full

            object-cover

            grayscale

            brightness-[0.65]
            contrast-[1.08]

            transition-all
            duration-1000
            ease-out

            group-hover:scale-[1.06]
            group-hover:grayscale-0
            group-hover:brightness-100
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-black/40
            via-transparent
            to-black/10

            transition-opacity
            duration-700

            group-hover:opacity-30
          "
        />
      </div>


      {/* NUMBER + TAG */}

      <div
        className="
          absolute
          left-8
          right-8
          top-7

          z-20

          flex
          justify-between
        "
      >

        <span
          className="
            font-mono
            text-xs
            text-white/30

            transition-colors
            duration-500

            group-hover:text-white/60
          "
        >
          {number}
        </span>


        <span
          className="
            rounded-full

            border
            border-white/15

            bg-black/30

            px-3
            py-1

            font-mono
            text-[8px]

            tracking-[0.15em]

            text-white/45

            backdrop-blur-md

            transition-all
            duration-500

            group-hover:border-white/30
            group-hover:bg-white/10
            group-hover:text-white/80
          "
        >
          {tag}
        </span>

      </div>


      {/* TEXT CONTENT */}

      <div
        className="
          relative
          z-10

          px-2
          pt-7
          pb-3

          transition-transform
          duration-700

          group-hover:-translate-y-1
        "
      >

        <h3
          className="
            text-2xl
            font-medium

            tracking-[-0.04em]

            transition-colors
            duration-500

            group-hover:text-white
          "
        >
          {title}
        </h3>


        <p
          className="
            mt-4

            leading-7

            text-white/45

            transition-colors
            duration-700

            group-hover:text-white/70
          "
        >
          {children}
        </p>

      </div>


      {/* BOTTOM LINE */}

      <div
        className="
          pointer-events-none

          absolute
          bottom-0
          left-0

          h-px
          w-0

          bg-gradient-to-r
          from-transparent
          via-white/60
          to-transparent

          transition-all
          duration-1000

          group-hover:w-full
        "
      />

    </article>
  )
}


function CreatorCard({
  initials,
  name,
  role,
  children,
}) {
  return (
    <article
      className="
        rounded-[2rem]
        border
        border-white/15
        bg-black/30
        p-8
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-white/30
      "
    >

      <div className="text-lg tracking-[0.15em]">
        ★★★★★
      </div>


      <p
        className="
          mt-7
          min-h-[150px]
          text-lg
          leading-8
          text-white/75
        "
      >
        {children}
      </p>


      <div
        className="
          mt-8
          flex
          items-center
          gap-4
          border-t
          border-white/10
          pt-6
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-white/10
            font-medium
          "
        >
          {initials}
        </div>


        <div>

          <p className="font-medium">
            {name}
          </p>


          <p
            className="
              mt-1
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/35
            "
          >
            {role}
          </p>

        </div>

      </div>

    </article>
  )
}