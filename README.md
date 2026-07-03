# MusicLabelAI Landing — Starter

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. Scroll to see the torus dissolve into a sine
waveform, click "View Demo" to hear it and see the waveform crossfade to
live audio-reactive motion.

## What's here

- `src/shaders/particleShaders.js` — the actual vertex/fragment shader. This
  is where the torus↔wave morph and audio sampling happen. Read this first.
- `src/components/ParticleField.jsx` — generates the torus + wave point sets,
  uploads live analyser data into a texture every frame.
- `src/components/Scene.jsx` — Canvas, camera, bloom postprocessing.
- `src/components/Hero.jsx` — the DOM hero, wired to trigger playback.
- `src/lib/audio.js` — Web Audio AnalyserNode wrapper. This IS your waveform
  data source, no external library needed.
- `src/store/useStore.js` — Zustand store bridging DOM state (scroll, play
  button) with the R3F canvas.
- `src/App.jsx` — Lenis smooth scroll setup, maps scroll distance to the
  0-1 `scrollProgress` that drives the morph.

## ⚠️ Replace the placeholder audio

`public/audio/demo-track.wav` is currently the **untrimmed** file you
uploaded (30s, with ~7s of silence at the end). Swap it with your trimmed
version before shipping — same filename, or update the `src` in `Hero.jsx`.

## Known rough edges / next steps

1. **Particle count (6000) is untuned.** Bump `PARTICLE_COUNT` in
   `ParticleField.jsx` up or down and watch your frame rate — you set the
   ceiling, I didn't optimize for a specific device target.
2. **Torus shape is a rough approximation**, not sampled from a real
   `THREE.TorusKnotGeometry`. It looks decent but if you want the exact
   knot topology from the CodePen reference, swap `generateTorusPoints` to
   sample vertices off `new THREE.TorusKnotGeometry(...)` instead.
3. **The "explosion" stagger** (`aRandom` + `staggerWindow` in the vertex
   shader) is a starting value — tune `staggerWindow` (currently 0.35) to
   taste. Smaller = more instant, larger = more spread out/organic.
4. **Mobile performance is untested.** Bloom + 6000 points should be fine on
   most phones but verify — the brief said not to worry about perf during
   design, but you'll want a lower-particle-count / no-bloom fallback for
   low-end devices before shipping.
5. **No GSAP/ScrollTrigger yet** for the DOM text reveals — Lenis is wired
   for the 3D morph, but headline/subtext entrance animation isn't built.
6. **Reduced-motion**: nothing here respects `prefers-reduced-motion` yet.
   Add a check and fall back to a static torus image for accessibility.
7. Pause/replay currently just snaps `audioMix` back to 0 — a smooth fade
   out (mirroring the fade-in) would look better than the current instant cut.
