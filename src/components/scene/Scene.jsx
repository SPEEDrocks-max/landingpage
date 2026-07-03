import { Canvas } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
} from '@react-three/postprocessing'

import ParticleField from './ParticleField'
import { useStore } from '../../store/useStore'


export default function Scene() {
  const scrollProgress = useStore(
    (state) => state.scrollProgress
  )

  const glassProgress = useStore(
    (state) => state.glassProgress
  )


  /*
  ========================================
  SCENE ENTRANCE
  ========================================
  */

  const entranceOpacity = Math.min(
    Math.max(scrollProgress * 7, 0),
    1
  )


  /*
  ========================================
  SCENE EXIT DURING GLASS TAKEOVER
  ========================================

  0.00 - 0.55
  Scene remains fully visible.

  0.55 - 0.85
  Scene fades behind the glass.

  0.85+
  Scene completely gone.
  */

  const sceneExit = Math.min(
    Math.max(
      (glassProgress - 0.55) / 0.3,
      0
    ),
    1
  )


  /*
  ========================================
  FINAL OPACITY
  ========================================
  */

  const opacity =
    entranceOpacity * (1 - sceneExit)


  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 45,
      }}

      dpr={[1, 2]}

      gl={{
        antialias: true,
        alpha: true,
      }}

      style={{
        position: 'fixed',

        top: 0,
        left: 0,

        width: '100vw',
        height: '100vh',

        zIndex: 0,

        opacity,

        transition:
          'opacity 180ms linear',
      }}
    >

      <ParticleField />


      <EffectComposer>
        <Bloom
          intensity={0.98}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>

    </Canvas>
  )
}