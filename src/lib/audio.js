/**
 * Thin wrapper around Web Audio's AnalyserNode.
 * No external library needed — this IS the "waveform" data source.
 *
 * Usage:
 *   const engine = createAudioEngine(audioElement)
 *   engine.getFrequencyData() -> Uint8Array, 0-255 per frequency bin
 */
export function createAudioEngine(audioEl) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  const ctx = new AudioContextClass()

  const source = ctx.createMediaElementSource(audioEl)
  const analyser = ctx.createAnalyser()

  // fftSize controls resolution. 256 -> 128 frequency bins, plenty for
  // sampling into a particle line without needing thousands of bins.
  analyser.fftSize = 256
  analyser.smoothingTimeConstant = 0.8 // smooths frame-to-frame jitter

  source.connect(analyser)
  analyser.connect(ctx.destination)

  const freqData = new Uint8Array(analyser.frequencyBinCount)

  return {
    ctx,
    analyser,
    /** Call every frame. Returns a Uint8Array (0-255) of frequency magnitudes. */
    getFrequencyData() {
      analyser.getByteFrequencyData(freqData)
      return freqData
    },
    /** Must be called from a user-gesture handler (click) — autoplay policy. */
    async resume() {
      if (ctx.state === 'suspended') await ctx.resume()
    },
  }
}
