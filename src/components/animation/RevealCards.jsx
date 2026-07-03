import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RevealCards({
  children,
  className = '',
  stagger = 0.14,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const cards = Array.from(container.children)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          y: 70,
          opacity: 0,
          scale: 0.96,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',

          duration: 1.15,
          stagger,

          ease: 'power4.out',

          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [stagger])

  return (
    <div
      ref={containerRef}
      className={className}
    >
      {children}
    </div>
  )
}