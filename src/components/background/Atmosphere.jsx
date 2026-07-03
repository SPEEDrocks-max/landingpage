import { useEffect, useRef } from 'react'

export default function Atmosphere() {
  const amberRef = useRef(null)
  const redRef = useRef(null)
  const purpleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    let rafId = null
    let currentScroll = window.scrollY
    let targetScroll = window.scrollY

    function updateTarget() {
      targetScroll = window.scrollY
    }

    function animate() {
      /*
        Smooth interpolation.

        This creates the slight delayed / dragged
        movement instead of directly following scroll.
      */

      currentScroll +=
        (targetScroll - currentScroll) * 0.055

      const scroll = currentScroll


      /*
        DIFFERENT PARALLAX SPEEDS

        Every layer moves independently.
      */

      if (amberRef.current) {
        amberRef.current.style.transform = `
          translate3d(
            0,
            ${scroll * -0.025}px,
            0
          )
          scale(1.05)
        `
      }


      if (redRef.current) {
        redRef.current.style.transform = `
          translate3d(
            ${Math.sin(scroll * 0.001) * 35}px,
            ${scroll * -0.045}px,
            0
          )
          scale(1.08)
        `
      }


      if (purpleRef.current) {
        purpleRef.current.style.transform = `
          translate3d(
            ${Math.cos(scroll * 0.0008) * 45}px,
            ${scroll * -0.065}px,
            0
          )
          scale(1.1)
        `
      }


      /*
        GRID MOVES MUCH SLOWER

        Important:
        background should feel stable,
        not like wallpaper sliding around.
      */

      if (gridRef.current) {
        gridRef.current.style.transform = `
          translate3d(
            0,
            ${-(scroll % 110) * 0.15}px,
            0
          )
        `
      }


      rafId = requestAnimationFrame(animate)
    }


    window.addEventListener(
      'scroll',
      updateTarget,
      { passive: true }
    )

    rafId = requestAnimationFrame(animate)


    return () => {
      window.removeEventListener(
        'scroll',
        updateTarget
      )

      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])


  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* DARK BASE */}

      <div className="absolute inset-0 bg-[#080808]" />


      {/* AMBER */}

      <div
        ref={amberRef}
        className="
          atmosphere-amber

          absolute
          left-[-20vw]
          top-[5vh]

          h-[75vw]
          w-[75vw]

          rounded-full

          bg-[#c98218]/20

          blur-[150px]
        "
      />


      {/* RED */}

      <div
        ref={redRef}
        className="
          atmosphere-red

          absolute
          right-[-25vw]
          top-[35vh]

          h-[80vw]
          w-[80vw]

          rounded-full

          bg-[#a52d1d]/20

          blur-[170px]
        "
      />


      {/* PURPLE */}

      <div
        ref={purpleRef}
        className="
          atmosphere-purple

          absolute
          left-[35vw]
          top-[65vh]

          h-[65vw]
          w-[65vw]

          rounded-full

          bg-[#76254d]/15

          blur-[180px]
        "
      />


      {/* MOVING GRID */}

      <div
        ref={gridRef}
        className="
          atmosphere-grid
          absolute
          -inset-[120px]
        "
      />


      {/* VIGNETTE */}

      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.82)_100%)]
        "
      />


      {/* VERTICAL FADE */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b

          from-black/45
          via-transparent
          to-black/65
        "
      />
    </div>
  )
}