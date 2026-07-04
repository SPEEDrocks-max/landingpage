import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import {
  vertexShader,
  fragmentShader,
} from '../../shaders/particleShaders'

import { useStore } from '../../store/useStore'


const DESKTOP_PARTICLE_COUNT = 2400
const MOBILE_PARTICLE_COUNT = 1200


/*
========================================
TORUS POINTS
========================================
*/

function generateTorusPoints(count) {
  const positions =
    new Float32Array(count * 3)

  const p = 2
  const q = 3

  const radius = 2.2
  const tubeRadius = 0.55


  for (let i = 0; i < count; i++) {
    const t =
      (i / count) *
      Math.PI *
      2 *
      q


    const tubeAngle =
      Math.random() *
      Math.PI *
      2


    const r =
      radius +
      Math.cos((q / p) * t) *
        0.6


    const x =
      r * Math.cos(t)


    const y =
      r * Math.sin(t)


    const z =
      Math.sin((q / p) * t) *
      0.6


    const nx =
      Math.cos(t) *
      Math.cos(tubeAngle) *
      tubeRadius


    const ny =
      Math.sin(t) *
      Math.cos(tubeAngle) *
      tubeRadius


    const nz =
      Math.sin(tubeAngle) *
      tubeRadius


    positions[i * 3] =
      x + nx


    positions[i * 3 + 1] =
      y + ny


    positions[i * 3 + 2] =
      z + nz
  }


  return positions
}


/*
========================================
EXPLOSION CLOUD
========================================
*/

function generateExplosionPoints(count) {
  const positions =
    new Float32Array(count * 3)


  for (let i = 0; i < count; i++) {
    const theta =
      Math.random() *
      Math.PI *
      2


    const phi =
      Math.acos(
        2 * Math.random() - 1
      )


    const radius =
      1.8 +
      Math.sqrt(Math.random()) *
        3.2


    const x =
      radius *
      Math.sin(phi) *
      Math.cos(theta) *
      1.25


    const y =
      radius *
      Math.sin(phi) *
      Math.sin(theta) *
      0.65


    const z =
      radius *
      Math.cos(phi) *
      0.55


    positions[i * 3] = x

    positions[i * 3 + 1] = y

    positions[i * 3 + 2] = z
  }


  return positions
}


/*
========================================
WAVEFORM TARGET
========================================
*/

function generateWavePoints(count) {
  const positions =
    new Float32Array(count * 3)


  const waveU =
    new Float32Array(count)


  const width = 8


  for (let i = 0; i < count; i++) {
    const u =
      i / (count - 1)


    const x =
      (u - 0.5) *
      width


    const y =
      Math.sin(
        u *
        Math.PI *
        8
      ) * 0.18


    const z =
      (Math.random() - 0.5) *
      0.22


    positions[i * 3] = x

    positions[i * 3 + 1] = y

    positions[i * 3 + 2] = z


    waveU[i] = u
  }


  return {
    positions,
    waveU,
  }
}


/*
========================================
PARTICLE FIELD
========================================
*/

export default function ParticleField({
  isMobile,
}) {
  const groupRef = useRef()

  const materialRef = useRef()


  const particleCount =
    isMobile
      ? MOBILE_PARTICLE_COUNT
      : DESKTOP_PARTICLE_COUNT


  /*
  ========================================
  GEOMETRY + AUDIO TEXTURE
  ========================================
  */

  const {
    geometry,
    audioTexture,
  } = useMemo(() => {
    const torusPositions =
      generateTorusPoints(
        particleCount
      )


    const explosionPositions =
      generateExplosionPoints(
        particleCount
      )


    const {
      positions: wavePositions,
      waveU,
    } =
      generateWavePoints(
        particleCount
      )


    const random =
      new Float32Array(
        particleCount
      )


    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      random[i] =
        Math.random()
    }


    const geometry =
      new THREE.BufferGeometry()


    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        torusPositions,
        3
      )
    )


    geometry.setAttribute(
      'aTorusPos',
      new THREE.BufferAttribute(
        torusPositions,
        3
      )
    )


    geometry.setAttribute(
      'aExplodePos',
      new THREE.BufferAttribute(
        explosionPositions,
        3
      )
    )


    geometry.setAttribute(
      'aWavePos',
      new THREE.BufferAttribute(
        wavePositions,
        3
      )
    )


    geometry.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(
        random,
        1
      )
    )


    geometry.setAttribute(
      'aWaveU',
      new THREE.BufferAttribute(
        waveU,
        1
      )
    )


    /*
    AUDIO TEXTURE
    */

    const textureSize = 128


    const textureData =
      new Uint8Array(
        textureSize * 4
      )


    for (
      let i = 0;
      i < textureSize;
      i++
    ) {
      textureData[
        i * 4 + 3
      ] = 255
    }


    const audioTexture =
      new THREE.DataTexture(
        textureData,
        textureSize,
        1,
        THREE.RGBAFormat
      )


    audioTexture.needsUpdate =
      true


    return {
      geometry,
      audioTexture,
    }

  }, [particleCount])


  /*
  ========================================
  UNIFORMS
  ========================================
  */

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },


      uMorph: {
        value: 0,
      },


      uAudioMix: {
        value: 0,
      },


      uAudioTexture: {
        value: audioTexture,
      },


      uPointer: {
        value:
          new THREE.Vector2(
            0,
            0
          ),
      },


      uBeat: {
        value: 0,
      },


      uPixelRatio: {
        value: 1,
      },


      uSize: {
        value: 42,
      },


      /*
      0 = desktop
      1 = mobile
      */

      uIsMobile: {
        value: isMobile ? 1 : 0,
      },
    }),

    [
      audioTexture,
      isMobile,
    ]
  )


  /*
  ========================================
  FRAME LOOP
  ========================================
  */

  useFrame((state) => {
    if (!materialRef.current) return


    const store =
      useStore.getState()


    const scrollProgress =
      store.scrollProgress


    const audioMix =
      store.audioMix


    const audioEngine =
      store.audioEngine


    const time =
      state.clock.getElapsedTime()


    /*
    ========================================
    GROUP MOTION
    ========================================
    */

    if (groupRef.current) {
      const torusInfluence =
        1 - scrollProgress


      groupRef.current.rotation.y =
        time *
        0.10 *
        torusInfluence


      groupRef.current.rotation.x =
        Math.sin(
          time * 0.3
        ) *
        0.05 *
        torusInfluence


      groupRef.current.rotation.z =
        Math.cos(
          time * 0.22
        ) *
        0.025 *
        torusInfluence
    }


    /*
    ========================================
    UNIFORM UPDATES
    ========================================
    */

    const shaderUniforms =
      materialRef.current.uniforms


    shaderUniforms.uTime.value =
      time


    /*
    KEEP ORIGINAL TORUS HOLD
    */

    const TORUS_HOLD = 0.1


    const compressedProgress =
      scrollProgress < TORUS_HOLD

        ? 0

        : Math.min(
            (
              (
                scrollProgress -
                TORUS_HOLD
              ) /
              (
                1 -
                TORUS_HOLD
              )
            ) * 1.2,

            1
          )


    shaderUniforms.uMorph.value =
      compressedProgress


    shaderUniforms.uAudioMix.value =
      audioMix


    /*
    DESKTOP POINTER ONLY
    */

    if (!isMobile) {
      const pointer =
        store.pointer


      shaderUniforms.uPointer.value.set(
        pointer.x,
        pointer.y
      )
    }


    shaderUniforms.uPixelRatio.value =
      isMobile

        ? 1

        : Math.min(
            window.devicePixelRatio,
            1.5
          )


    /*
    ========================================
    AUDIO ANALYSIS
    ========================================
    */

    let beat = 0


    if (audioEngine) {
      const frequencyData =
        audioEngine.getFrequencyData()


      const textureData =
        audioTexture.image.data


      let bassTotal = 0


      const bassBins =
        Math.min(
          12,
          frequencyData.length
        )


      /*
      Only process what fits inside
      the 128 pixel audio texture.
      */

      const sampleCount =
        Math.min(
          frequencyData.length,
          128
        )


      for (
        let i = 0;
        i < sampleCount;
        i++
      ) {
        const value =
          frequencyData[i]


        if (i < bassBins) {
          bassTotal += value
        }


        textureData[
          i * 4
        ] = value


        textureData[
          i * 4 + 1
        ] = value


        textureData[
          i * 4 + 2
        ] = value


        textureData[
          i * 4 + 3
        ] = 255
      }


      audioTexture.needsUpdate =
        true


      beat =
        bassBins > 0

          ? bassTotal /
            bassBins /
            255

          : 0
    }


    shaderUniforms.uBeat.value =
      beat
  })


  /*
  ========================================
  RENDER
  ========================================
  */

  return (
    <group ref={groupRef}>

      <points geometry={geometry}>

        <shaderMaterial
          ref={materialRef}

          vertexShader={
            vertexShader
          }

          fragmentShader={
            fragmentShader
          }

          uniforms={
            uniforms
          }

          transparent

          depthWrite={
            false
          }

          blending={
            THREE.AdditiveBlending
          }
        />

      </points>

    </group>
  )
}


export {
  DESKTOP_PARTICLE_COUNT,
  MOBILE_PARTICLE_COUNT,
}