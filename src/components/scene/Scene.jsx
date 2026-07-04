import {
  useEffect,
  useState,
} from 'react'

import {
  Canvas,
} from '@react-three/fiber'

import {
  EffectComposer,
  Bloom,
} from '@react-three/postprocessing'

import ParticleField from './ParticleField'

import {
  useStore,
} from '../../store/useStore'


export default function Scene() {

  const scrollProgress = useStore(
    (state) => state.scrollProgress
  )

  const glassProgress = useStore(
    (state) => state.glassProgress
  )


  /*
  ========================================
  DEVICE DETECTION
  ========================================
  */

  const [isMobile, setIsMobile] =
    useState(false)


  useEffect(() => {

    const mediaQuery =
      window.matchMedia(
        '(max-width: 767px)'
      )


    function updateDevice() {
      setIsMobile(
        mediaQuery.matches
      )
    }


    updateDevice()


    mediaQuery.addEventListener(
      'change',
      updateDevice
    )


    return () => {

      mediaQuery.removeEventListener(
        'change',
        updateDevice
      )

    }

  }, [])


  /*
  ========================================
  SCENE ENTRANCE
  ========================================
  */

  const entranceOpacity =
    Math.min(
      Math.max(
        scrollProgress * 7,
        0
      ),
      1
    )


  /*
  ========================================
  SCENE EXIT DURING GLASS TAKEOVER
  ========================================

  0.00 - 0.55
  fully visible

  0.55 - 0.85
  fade behind glass

  0.85+
  invisible
  */

  const sceneExit =
    Math.min(
      Math.max(
        (glassProgress - 0.55) /
          0.3,
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
    entranceOpacity *
    (1 - sceneExit)


  /*
  ========================================
  SCENE ACTIVITY
  ========================================

  Once takeover is complete,
  stop continuous WebGL rendering.

  Scrolling back automatically
  switches frameloop to always again.
  */

  const sceneActive =
    glassProgress < 0.9


  return (
    <Canvas

      camera={{
        position: [0, 0, 8],
        fov: 45,
      }}


      /*
      ========================================
      ADAPTIVE DPR
      ========================================
      */

      dpr={
        isMobile
          ? 1
          : [1, 1.5]
      }


      /*
      ========================================
      RENDER LOOP
      ========================================
      */

      frameloop={
        sceneActive
          ? 'always'
          : 'never'
      }


      /*
      ========================================
      WEBGL SETTINGS
      ========================================
      */

      gl={{
        antialias: !isMobile,

        alpha: true,

        powerPreference:
          'high-performance',
      }}


      /*
      ========================================
      FIXED CANVAS
      ========================================
      */

      style={{
        position: 'fixed',

        top: 0,
        left: 0,

        width: '100vw',
        height: '100vh',

        zIndex: 0,

        opacity,

        pointerEvents: 'none',

        transition:
          'opacity 180ms linear',
      }}
    >

      {/* PARTICLE WORLD */}

      <ParticleField
        isMobile={isMobile}
      />


      {/* DESKTOP BLOOM ONLY */}

      {!isMobile && (

        <EffectComposer>

          <Bloom
            intensity={0.98}

            luminanceThreshold={
              0.08
            }

            luminanceSmoothing={
              0.85
            }

            mipmapBlur
          />

        </EffectComposer>

      )}

    </Canvas>
  )
}