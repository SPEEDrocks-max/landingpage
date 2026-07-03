import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RevealText({
  children,
  className = '',
  delay = 0,
}) {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current

    if (!container || !text) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        {
          yPercent: 115,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',

          duration: 1.25,
          delay,

          ease: 'power4.out',

          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [delay])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
    >
      <div
        ref={textRef}
        className={className}
      >
        {children}
      </div>
    </div>
  )
}