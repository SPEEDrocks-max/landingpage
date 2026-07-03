import Atmosphere from '../components/background/Atmosphere'
import RevealText from '../components/animation/RevealText'
export default function FinalSection() {
  return (
    <div
      className="
       relative
    z-40
    w-full
    overflow-hidden
    bg-transparent
    text-white
      "
    >
      {/* =====================================
          FINAL CTA
      ===================================== */}

      <section
        className="
          relative
          px-5
          py-24
          md:px-10
          md:py-32
          lg:px-16
        "
      >
        <div
          className="
            relative
            mx-auto
            flex
            min-h-[500px]
            max-w-7xl
            flex-col
            items-center
            justify-center
            overflow-hidden

            rounded-[28px]

            border
            border-white/10

            bg-gradient-to-b
            from-white/[0.055]
            via-white/[0.018]
            to-transparent

            px-6
            text-center
          "
        >
          {/* CENTER GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2

              h-[400px]
              w-[700px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-white/[0.04]

              blur-[120px]
            "
          />

          {/* TOP REFLECTION */}

          <div
            className="
              pointer-events-none
              absolute
              left-[15%]
              right-[15%]
              top-0

              h-px

              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
            "
          />

          {/* CTA CONTENT */}

          <div className="relative z-10">
            <p
              className="
                mb-6

                font-mono
                text-[9px]
                uppercase
                tracking-[0.4em]

                text-white/30
              "
            >
              Your next track starts here
            </p>

            <h2
              className="
                text-[clamp(3.2rem,6vw,6.2rem)]

                font-semibold

                leading-[0.9]

                tracking-[-0.06em]
              "
            > <RevealText>
              Ready to compose?
                </RevealText>
            </h2>

            <p
              className="
                mx-auto
                mt-7

                max-w-xl

                text-base
                leading-7

                text-white/40

                md:text-lg
              "
            >
              Authorize your creative session, customize
              consistent singers, and generate your tracks now.
            </p>

            <button
              className="
                group

                mt-10

                inline-flex
                items-center
                justify-center
                gap-5

                rounded-full

                bg-white

                px-8
                py-4

                text-sm
                font-semibold

                text-black

                shadow-[0_0_50px_rgba(255,255,255,0.10)]

                transition-all
                duration-300

                hover:scale-[1.03]

                hover:shadow-[
                  0_0_70px_rgba(255,255,255,0.16)
                ]

                active:scale-[0.98]
              "
            >
              Access Workspace

              <span
                className="
                  text-lg

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer
        className="
          relative

          border-t
          border-white/[0.08]

          bg-[#080808]

          px-6
          pb-8
          pt-20

          md:px-10

          lg:px-16
          lg:pt-24
        "
      >
        {/* FOOTER AMBIENT GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0

            h-[350px]
            w-[500px]

            bg-white/[0.015]

            blur-[100px]
          "
        />

        <div
          className="
            relative
            z-10

            mx-auto
            max-w-7xl
          "
        >
          {/* MAIN FOOTER GRID */}

          <div
            className="
              grid

              gap-16

              md:grid-cols-[1.5fr_0.7fr_0.7fr]

              lg:gap-24
            "
          >
            {/* ==============================
                BRAND COLUMN
            ============================== */}

            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-xl

                    bg-white

                    text-lg
                    text-black
                  "
                >
                  ♪
                </div>

                <span
                  className="
                    text-xl
                    font-semibold

                    tracking-[-0.03em]
                  "
                >
                  MusicLabelAI
                </span>
              </div>

              <p
                className="
                  mt-7

                  max-w-sm

                  text-sm
                  leading-6

                  text-white/40
                "
              >
                The next generation of neural audio synthesis.
                Create consistent vocals and high-fidelity
                soundtracks in seconds.
              </p>

              {/* SOCIAL BUTTONS */}

              <div
                className="
                  mt-6

                  flex
                  items-center
                  gap-3
                "
              >
                <SocialButton>
                  ◯
                </SocialButton>

                <SocialButton>
                  ◎
                </SocialButton>

                <SocialButton>
                  ⊙
                </SocialButton>
              </div>
            </div>


            {/* ==============================
                PRODUCT COLUMN
            ============================== */}

            <FooterColumn
              title="Product"
              links={[
                'Studio',
                'Library',
                'API Access',
                'Pricing',
              ]}
            />


            {/* ==============================
                LEGAL COLUMN
            ============================== */}

            <FooterColumn
              title="Legal"
              links={[
                'Terms of Service',
                'Privacy Policy',
                'Cookie Policy',
                'Licenses',
              ]}
            />
          </div>


          {/* =====================================
              FOOTER BOTTOM BAR
          ===================================== */}

          <div
            className="
              mt-16

              flex
              flex-col
              gap-6

              border-t
              border-white/[0.08]

              pt-7

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <p
              className="
                font-mono

                text-[10px]

                leading-5

                tracking-[0.08em]

                text-white/35
              "
            >
              © 2026 MusicLabel AI. Powered by Neural ACE-Step DIT.
              All Rights Reserved.
            </p>


            {/* SYSTEM STATUS */}

            <div
              className="
                flex
                w-fit

                items-center
                gap-2

                rounded-full

                border
                border-emerald-500/25

                bg-emerald-500/[0.08]

                px-4
                py-2

                font-mono

                text-[9px]
                uppercase

                tracking-[0.14em]

                text-emerald-400
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5

                  rounded-full

                  bg-emerald-400

                  shadow-[
                    0_0_10px_rgba(52,211,153,0.8)
                  ]
                "
              />

              Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


/* =========================================
   SOCIAL BUTTON
========================================= */

function SocialButton({ children }) {
  return (
    <button
      className="
        flex

        h-11
        w-11

        items-center
        justify-center

        rounded-full

        border
        border-white/10

        bg-white/[0.025]

        text-sm
        text-white/50

        transition-all
        duration-300

        hover:scale-105

        hover:border-white/20

        hover:bg-white/[0.06]

        hover:text-white

        active:scale-95
      "
    >
      {children}
    </button>
  )
}


/* =========================================
   FOOTER COLUMN
========================================= */

function FooterColumn({
  title,
  links,
}) {
  return (
    <div>
      <h3
        className="
          font-mono

          text-[10px]
          font-semibold

          uppercase

          tracking-[0.15em]

          text-white/80
        "
      >
        {title}
      </h3>

      <div
        className="
          mt-7

          flex
          flex-col

          gap-4
        "
      >
        {links.map((link) => (
          <button
            key={link}

            className="
              group

              flex
              w-fit

              items-center
              gap-2

              text-left
              text-sm

              text-white/40

              transition-colors
              duration-300

              hover:text-white
            "
          >
            <span>{link}</span>

            <span
              className="
                -translate-x-1

                text-white/0

                transition-all
                duration-300

                group-hover:translate-x-0

                group-hover:text-white/50
              "
            >
              ↗
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}