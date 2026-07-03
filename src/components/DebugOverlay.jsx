import { useStore } from '../store/useStore'

// TEMPORARY — delete this component once the morph/audio pipeline is confirmed working.
// Shows live values so you can tell scroll/audio wiring apart from shader/render issues.
export default function DebugOverlay() {
  const scrollProgress = useStore((s) => s.scrollProgress)
  const audioMix = useStore((s) => s.audioMix)
  const isPlaying = useStore((s) => s.isPlaying)

  return (
    <div className="fixed bottom-4 left-4 z-[100] font-mono text-xs text-lime-400 bg-black/80 border border-lime-400/30 rounded px-3 py-2 space-y-1">
      <div>scrollProgress: {scrollProgress.toFixed(3)}</div>
      <div>audioMix: {audioMix.toFixed(3)}</div>
      <div>isPlaying: {String(isPlaying)}</div>
    </div>
  )
}
