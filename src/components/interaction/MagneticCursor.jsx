import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MagneticCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current

    if (!cursor || !dot) return

    const moveCursorX = gsap.quickTo(cursor, 'x', {
      duration: 0.45,
      ease: 'power3.out',
    })

    const moveCursorY = gsap.quickTo(cursor, 'y', {
      duration: 0.45,
      ease: 'power3.out',
    })

    const moveDotX = gsap.quickTo(dot, 'x', {
      duration: 0.08,
      ease: 'power2.out',
    })

    const moveDotY = gsap.quickTo(dot, 'y', {
      duration: 0.08,
      ease: 'power2.out',
    })

    function handleMouseMove(event) {
      moveCursorX(event.clientX)
      moveCursorY(event.clientY)

      moveDotX(event.clientX)
      moveDotY(event.clientY)
    }

    function handleMouseOver(event) {
      const target = event.target.closest(
        '[data-cursor="magnetic"]'
      )

      if (!target) return

      gsap.to(cursor, {
        scale: 1.8,
        duration: 0.35,
        ease: 'power3.out',
      })

      gsap.to(dot, {
        scale: 0,
        duration: 0.25,
      })
    }

    function handleMouseOut(event) {
      const target = event.target.closest(
        '[data-cursor="magnetic"]'
      )

      if (!target) return

      gsap.to(cursor, {
        scale: 1,
        duration: 0.35,
        ease: 'power3.out',
      })

      gsap.to(dot, {
        scale: 1,
        duration: 0.25,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      document.removeEventListener(
        'mouseover',
        handleMouseOver
      )

      document.removeEventListener(
        'mouseout',
        handleMouseOut
      )
    }
  }, [])

  return (
    <>
      {/* OUTER FOLLOWER */}

      <div
        ref={cursorRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]

          hidden
          h-10
          w-10

          -translate-x-1/2
          -translate-y-1/2

          rounded-full
          border
          border-white/50

          bg-white/[0.04]
          backdrop-blur-sm

          mix-blend-difference

          md:block
        "
      />


      {/* INNER DOT */}

      <div
        ref={dotRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[10000]

          hidden
          h-1.5
          w-1.5

          -translate-x-1/2
          -translate-y-1/2

          rounded-full
          bg-white

          md:block
        "
      />
    </>
  )
}