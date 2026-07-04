import { useEffect, useRef, useState } from 'react'

export default function DeferredSection({
  children,
  minHeight = '100vh',
  rootMargin = '1000px 0px',
}) {
  const triggerRef = useRef(null)
  const [shouldRender, setShouldRender] =
    useState(false)

  useEffect(() => {
    const element = triggerRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin])

  return (
    <div
      ref={triggerRef}
      style={{
        minHeight: shouldRender
          ? undefined
          : minHeight,
      }}
    >
      {shouldRender ? children : null}
    </div>
  )
}