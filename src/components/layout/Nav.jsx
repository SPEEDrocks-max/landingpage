import { useStore } from '../../store/useStore'

export default function Nav() {
  const scrollProgress = useStore((s) => s.scrollProgress)
  const opacity = Math.min(Math.max((scrollProgress - 0.12) * 3.5, 0), 1)
  const glassProgress = useStore(
  (s) => s.glassProgress
)
const glassExit = Math.min(
  Math.max(glassProgress / 0.28, 0),
  1
)
const finalOpacity =
  opacity * (1 - glassExit)
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
  opacity: finalOpacity,

  transform: `
    translateY(${-glassExit * 18}px)
  `,

  filter: `
    blur(${glassExit * 8}px)
  `,

  transition:
    'opacity 180ms linear',
}}
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md pl-2 pr-4 py-1.5">
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black text-sm">
          ♪
        </div>
        <span className="font-mono text-sm tracking-widest text-white">MUSICLABELAI</span>
      </div>
      <button className="rounded-full bg-white text-black font-mono text-xs tracking-widest px-6 py-2.5 hover:bg-white/90 transition-colors">
        LAUNCH STUDIO
      </button>
    </nav>
  )
}
