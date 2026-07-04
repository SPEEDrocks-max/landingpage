import { useEffect, useRef } from 'react'
import { useStore } from '../../store/useStore'
import { createAudioEngine } from '../../lib/audio'

export default function Hero() {
  const audioRef = useRef(null)
  const engineRef = useRef(null)
  const audioMixFrameRef = useRef(null)

  const audioSrc = '/audio/demo-track.wav'

  const isPlaying = useStore((s) => s.isPlaying)
  const scrollProgress = useStore((s) => s.scrollProgress)
  const glassProgress = useStore(
  (s) => s.glassProgress
)
  const setIsPlaying = useStore(
    (s) => s.setIsPlaying
  )

  const setAudioEngine = useStore(
    (s) => s.setAudioEngine
  )

  const setAudioMix = useStore(
    (s) => s.setAudioMix
  )

  const audioTrigger = useStore(
    (s) => s.audioTrigger
  )
  const heroExitProgress = Math.min(
  Math.max(glassProgress / 0.32, 0),
  1
)

const heroVisibility =
  1 - heroExitProgress

  /*
  =========================================
  UI TIMELINE
  =========================================

  0.00 - 0.08
  Pure torus

  0.08 - 0.42
  Editorial intro visible

  0.42 - 0.72
  Intro fades away during explosion

  0.72+
  Audio dock appears

  */

  const introEnter = Math.min(
    Math.max((scrollProgress - 0.04) / 0.1, 0),
    1
  )

  const introExit = Math.min(
    Math.max((scrollProgress - 0.38) / 0.22, 0),
    1
  )

  const introOpacity =
    introEnter * (1 - introExit)

  const dockProgress = Math.min(
    Math.max((scrollProgress - 0.68) / 0.16, 0),
    1
  )


  async function handleViewDemo() {
    const audio = audioRef.current

    if (!audio) return


    /*
    =========================================
    STOP
    =========================================
    */

    if (!audio.paused) {
      audio.pause()
      audio.currentTime = 0

      setIsPlaying(false)
      setAudioMix(0)

      if (audioMixFrameRef.current) {
        cancelAnimationFrame(
          audioMixFrameRef.current
        )
      }

      return
    }


    /*
    =========================================
    PLAY
    =========================================
    */

    try {
      audio.volume = 1
      audio.muted = false
      audio.currentTime = 0


      if (!engineRef.current) {
        const engine =
          createAudioEngine(audio)

        engineRef.current = engine

        setAudioEngine(engine)
      }


      await engineRef.current.resume()

      await audio.play()

      setIsPlaying(true)


      /*
        CLOUD → RIBBON ASSEMBLY
      */

      const startTime =
        performance.now()

      const fadeDuration = 1800


      function animateAudioMix(currentTime) {
        const elapsed =
          currentTime - startTime

        const progress =
          Math.min(
            elapsed / fadeDuration,
            1
          )


        /*
          smoother than linear
        */

        const eased =
          progress * progress *
          (3 - 2 * progress)


        setAudioMix(eased)


        if (progress < 1) {
          audioMixFrameRef.current =
            requestAnimationFrame(
              animateAudioMix
            )
        }
      }


      audioMixFrameRef.current =
        requestAnimationFrame(
          animateAudioMix
        )
    } catch (error) {
      console.error(
        'Audio playback failed:',
        error
      )

      setIsPlaying(false)
      setAudioMix(0)
    }
  }


  /*
  =========================================
  EXTERNAL AUDIO TRIGGER
  =========================================
  */

  useEffect(() => {
    if (audioTrigger === 0) return

    handleViewDemo()
  }, [audioTrigger])


  /*
  =========================================
  CLEANUP
  =========================================
  */

  useEffect(() => {
    return () => {
      if (audioMixFrameRef.current) {
        cancelAnimationFrame(
          audioMixFrameRef.current
        )
      }
    }
  }, [])


  return (
   <section
  className="
    pointer-events-none
    fixed
    inset-0
    z-10
    overflow-hidden
    will-change-transform
  "
  style={{
    opacity: heroVisibility,

    transform: `
      scale(${1 - heroExitProgress * 0.035})
      translateY(${-heroExitProgress * 18}px)
    `,

    filter: `
      blur(${heroExitProgress * 10}px)
    `,
  }}
>

      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        playsInline
        onEnded={() => {
          setIsPlaying(false)
          setAudioMix(0)
        }}
      />


      {/*
      ========================================
      EDITORIAL INTRO
      ========================================
      */}

      <div
        className="
          absolute
          left-6
          top-[22vh]
          max-w-[520px]

          md:left-12
          md:top-[21vh]

          lg:left-16
          lg:top-[20vh]
        "
        style={{
          opacity: introOpacity,

          transform: `
            translateY(${(1 - introEnter) * 24}px)
            translateX(${-introExit * 30}px)
          `,

          filter: `blur(${introExit * 8}px)`,
        }}
      >

        {/* INDEX + LABEL */}

        <div
          className="
            mb-7
            flex
            items-center
            gap-4

            font-mono
            text-[9px]
            uppercase
            tracking-[0.32em]
            text-white/35
          "
        >
          <span>01 / 03</span>

          <span className="h-px w-10 bg-white/20" />

          <span>Neural Audio System</span>
        </div>


        {/* HEADLINE */}

        <h1
          className="
            max-w-xl

            text-[clamp(3.2rem,6vw,6.6rem)]
            font-medium
            leading-[0.86]
            tracking-[-0.06em]
            text-white
          "
        >
          Sound,
          <br />

          <span className="text-white/38">
            reimagined.
          </span>
        </h1>


        {/* DESCRIPTION */}

        <div
          className="
            mt-8
            flex
            items-start
            gap-5
          "
        >
          <div className="mt-2 h-px w-10 shrink-0 bg-white/25 z-10" />

          <p
            className="
              max-w-sm
              text-sm
              leading-6
              text-white/45
              md:text-[15px]
            "
          >
            A neural music engine that transforms
            ideas into sound — then turns sound
            into something you can see.
          </p>
        </div>
      </div>


      {/*
      ========================================
      PHASE INDICATOR

      Right edge, subtle.
      ========================================
      */}

      <div
        className="
          absolute
          right-6
          top-1/2
          hidden
          -translate-y-1/2

          flex-col
          items-end
          gap-3

          md:flex
          lg:right-10
        "
      >
        <div className="flex items-center gap-3">
          <span
            className={`
              font-mono
              text-[8px]
              uppercase
              tracking-[0.25em]
              transition-colors
              duration-500

              ${
                scrollProgress < 0.35
                  ? 'text-white/65'
                  : 'text-white/15'
              }
            `}
          >
            Form
          </span>

          <span
            className={`
              h-px
              transition-all
              duration-500

              ${
                scrollProgress < 0.35
                  ? 'w-8 bg-white/60'
                  : 'w-4 bg-white/15'
              }
            `}
          />
        </div>


        <div className="flex items-center gap-3">
          <span
            className={`
              font-mono
              text-[8px]
              uppercase
              tracking-[0.25em]
              transition-colors
              duration-500

              ${
                scrollProgress >= 0.35 &&
                scrollProgress < 0.72
                  ? 'text-white/65'
                  : 'text-white/15'
              }
            `}
          >
            Dissolve
          </span>

          <span
            className={`
              h-px
              transition-all
              duration-500

              ${
                scrollProgress >= 0.35 &&
                scrollProgress < 0.72
                  ? 'w-8 bg-white/60'
                  : 'w-4 bg-white/15'
              }
            `}
          />
        </div>


        <div className="flex items-center gap-3">
          <span
            className={`
              font-mono
              text-[8px]
              uppercase
              tracking-[0.25em]
              transition-colors
              duration-500

              ${
                scrollProgress >= 0.72
                  ? 'text-white/65'
                  : 'text-white/15'
              }
            `}
          >
            Listen
          </span>

          <span
            className={`
              h-px
              transition-all
              duration-500

              ${
                scrollProgress >= 0.72
                  ? 'w-8 bg-white/60'
                  : 'w-4 bg-white/15'
              }
            `}
          />
        </div>
      </div>


      {/*
      ========================================
      AUDIO CONTROL DOCK
      ========================================
      */}

      <div
        className="
          pointer-events-auto

          absolute
          bottom-7
          left-1/2

          flex
          -translate-x-1/2
          items-center
          gap-2

          rounded-full
          border
          border-white/10

          bg-black/55
          p-1.5

          shadow-[0_20px_80px_rgba(0,0,0,0.55)]

          backdrop-blur-xl

          md:bottom-9
        "
        style={{
          opacity: dockProgress,

          transform: `
            translateX(-50%)
            translateY(${(1 - dockProgress) * 24}px)
            scale(${0.94 + dockProgress * 0.06})
          `,

          pointerEvents:
            dockProgress > 0.8
              ? 'auto'
              : 'none',
        }}
      >

        {/* PLAY BUTTON */}

        <button
          onClick={handleViewDemo}
          className="
            group

            flex
            h-12
            items-center
            gap-3

            rounded-full
            bg-white

            pl-2
            pr-5

            text-sm
            font-medium
            text-black

            transition-all
            duration-300

            hover:pr-6
            active:scale-[0.97]
          "
        >
          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-full
              bg-black

              text-[10px]
              text-white
            "
          >
            {isPlaying ? '■' : '▶'}
          </span>

          <span className="whitespace-nowrap">
            {isPlaying
              ? 'Stop session'
              : 'Play the sound'}
          </span>
        </button>


        {/* DIVIDER */}

        <div className="mx-1 h-6 w-px bg-white/10" />


        {/* LIVE STATUS */}

        <div
          className="
            flex
            min-w-[145px]
            items-center
            gap-3

            px-4
            py-2
          "
        >
          <span className="relative flex h-2 w-2">

            {isPlaying && (
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full

                  animate-ping

                  rounded-full
                  bg-white/50
                "
              />
            )}

            <span
              className={`
                relative
                inline-flex
                h-2
                w-2
                rounded-full

                ${
                  isPlaying
                    ? 'bg-white'
                    : 'bg-white/25'
                }
              `}
            />
          </span>


          <div>
            <p
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/30
              "
            >
              {isPlaying
                ? 'Live signal'
                : 'System'}
            </p>

            <p
              className="
                mt-0.5
                font-mono
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-white/65
              "
            >
              {isPlaying
                ? 'Analysing'
                : 'Ready'}
            </p>
          </div>
        </div>
      </div>


      {/*
      ========================================
      SCROLL PROMPT
      ========================================
      */}

      {scrollProgress < 0.65 && (
        <div
          className="
            absolute
            bottom-8
            left-1/2

            flex
            -translate-x-1/2
            flex-col
            items-center
            gap-3

            font-mono
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/25
          "
          style={{
            opacity:
              Math.min(
                1,
                (0.65 - scrollProgress) * 4
              ),
          }}
        >
          <span>
            Scroll to dissolve
          </span>

          <div className="relative h-9 w-px overflow-hidden bg-white/10">
            <div className="absolute left-0 top-0 h-1/2 w-full animate-pulse bg-white/50" />
          </div>
        </div>
      )}
    </section>
  )
}