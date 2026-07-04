import RevealText from "../components/animation/RevealText";

export default function StudioLanding() {
  return (
    <section
      className="
        relative
        z-40
        min-h-screen
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >
      {/* AMBIENT LIGHT */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[42%]
          h-[700px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.035]
          blur-[140px]
        "
      />

      {/* NAV */}

      <header className="relative z-20 px-6 pt-6 md:px-10 lg:px-16">
        <nav
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            rounded-[22px]
            border
            border-white/10
            bg-black/30
            px-5
            py-3
            backdrop-blur-xl
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-white
                text-black
              "
            >
              ♪
            </div>

            <span
              className="
                font-mono
                text-sm
                font-semibold
                tracking-[0.08em]
              "
            >
              MUSICLABELAI
            </span>
          </div>

          <button
            className="
              rounded-full
              bg-white
              px-6
              py-3
              font-mono
              text-[10px]
              font-semibold
              tracking-[0.18em]
              text-black
              transition-transform
              duration-300
              hover:scale-105
            "
          >
            LAUNCH STUDIO
          </button>
        </nav>
      </header>


      {/* HERO */}

      <div
  className="
    relative
    z-10

    flex
    min-h-[calc(100vh-90px)]

    flex-col
    items-center
    justify-center

    px-6

    pt-16
    pb-28
    md:pb-24
    lg:pb-16

    text-center

    md:pt-20
    lg:pt-24
  "
>
        <div
          className="
            mb-10
            md:mb-10
            lg:mb-9
            rounded-full
            border
            border-white/15
            bg-white/[0.05]
            px-4
            py-2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/60
          "
        >
          ♪ &nbsp; Neural ACE-Step DIT V4 Engine
        </div>


       <h1
  className="
    display-heading

    max-w-6xl

    text-[clamp(4.5rem,7vw,8rem)]

    leading-[0.88]
    tracking-[-0.055em]
  "
><RevealText delay={0.08}>
  Generate the
  <br />

  <span className="text-white/50">
    Soundtrack
  </span>

  <br />

  of tomorrow
  </RevealText>
</h1>



        <p
          className="
            mt-8
            max-w-2xl
            text-base
            leading-7
            text-white/40
            md:text-lg
          "
        >
          Direct-to-audio neural generation built for creators.
          Shape consistent vocalists, sculpt new sonic worlds,
          and generate high-fidelity compositions in seconds.
        </p>


        <div className="mt-10 flex gap-3">
          <button
            className="
              rounded-full
              bg-white
              px-8
              py-4
              font-medium
              text-black
              transition-transform
              hover:scale-105
            "
          >
            Start Creating Free &nbsp; →
          </button>

          <button
            className="
              rounded-full
              border
              border-white/15
              bg-white/[0.04]
              px-8
              py-4
              font-medium
              text-white
              backdrop-blur-xl
              transition-colors
              hover:bg-white/[0.08]
            "
          >
            ▶ &nbsp; View Demo
          </button>
        </div>
      </div>
    </section>
  )
}