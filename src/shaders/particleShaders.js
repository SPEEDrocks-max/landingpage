export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uAudioMix;

  uniform sampler2D uAudioTexture;

  uniform vec2 uPointer;

  uniform float uBeat;
  uniform float uPixelRatio;
  uniform float uSize;


  attribute vec3 aTorusPos;
  attribute vec3 aExplodePos;
  attribute vec3 aWavePos;

  attribute float aRandom;
  attribute float aWaveU;


  varying float vAlpha;
  varying float vEnergy;


  void main() {

    /*
    ========================================
    1. TORUS
    ========================================
    */

    float spin = uTime * 0.12;

    mat2 rotationMatrix = mat2(
      cos(spin), -sin(spin),
      sin(spin),  cos(spin)
    );

    vec3 torusPosition = vec3(
      rotationMatrix * aTorusPos.xy,
      aTorusPos.z
    );


    /*
    ========================================
    2. TORUS → PARTICLE CLOUD
    ========================================
    */

    float explosionProgress = smoothstep(
      0.05,
      0.90,
      uMorph
    );

    float burst = sin(
      explosionProgress * 3.14159265
    );

    vec3 explosionDirection = normalize(
      aExplodePos -
      torusPosition +
      vec3(0.001)
    );

    vec3 burstOffset =
      explosionDirection *
      burst *
      (
        0.7 +
        aRandom * 1.6
      );


    /*
      Gentle cloud motion.
    */

    vec3 cloudDrift = vec3(
      sin(
        uTime * 0.35 +
        aRandom * 40.0
      ),

      cos(
        uTime * 0.28 +
        aRandom * 55.0
      ),

      sin(
        uTime * 0.22 +
        aRandom * 70.0
      )
    )
    * 0.12
    * explosionProgress;


    vec3 cloudPosition =
      aExplodePos +
      cloudDrift;


    vec3 explodedPosition =
      mix(
        torusPosition,
        cloudPosition,
        explosionProgress
      )
      +
      burstOffset;


    /*
    ========================================
    3. SMOOTH AUDIO SAMPLING
    ========================================

    Instead of reading one FFT sample,
    average nearby samples.

    This removes the jagged spectrum look.
    */

    float sampleCenter = texture2D(
      uAudioTexture,
      vec2(aWaveU, 0.5)
    ).r;

    float sampleLeft1 = texture2D(
      uAudioTexture,
      vec2(
        max(aWaveU - 0.012, 0.0),
        0.5
      )
    ).r;

    float sampleRight1 = texture2D(
      uAudioTexture,
      vec2(
        min(aWaveU + 0.012, 1.0),
        0.5
      )
    ).r;

    float sampleLeft2 = texture2D(
      uAudioTexture,
      vec2(
        max(aWaveU - 0.025, 0.0),
        0.5
      )
    ).r;

    float sampleRight2 = texture2D(
      uAudioTexture,
      vec2(
        min(aWaveU + 0.025, 1.0),
        0.5
      )
    ).r;


    float smoothAudio =
      sampleCenter * 0.40 +
      sampleLeft1 * 0.20 +
      sampleRight1 * 0.20 +
      sampleLeft2 * 0.10 +
      sampleRight2 * 0.10;


    /*
      Slight nonlinear boost.

      Quiet sounds remain controlled,
      louder sounds become expressive.
    */

    float energy =
      pow(smoothAudio, 0.75);

    vEnergy = energy;


    /*
    ========================================
    4. LIVING RIBBON WAVEFORM
    ========================================
    */

    vec3 waveformPosition =
      aWavePos;


    /*
      Large slow body wave.

      Gives the ribbon its overall shape.
    */

    float bodyWave =
      sin(
        aWaveU * 16.0 -
        uTime * 1.8
      )
      *
      energy
      *
      1.15;


    /*
      Secondary wave moving in the
      opposite direction.

      This makes the form feel organic.
    */

    float secondaryWave =
      sin(
        aWaveU * 29.0 +
        uTime * 2.3
      )
      *
      energy
      *
      0.38;


    /*
      Fine audio detail.

      Subtle, not chaotic.
    */

    float detailWave =
      sin(
        aWaveU * 52.0 -
        uTime * 3.4
      )
      *
      energy
      *
      0.14;


    waveformPosition.y +=
      bodyWave +
      secondaryWave +
      detailWave;


    /*
    ========================================
    5. RIBBON THICKNESS
    ========================================

    Particle randomness gives the wave
    physical volume instead of a flat line.
    */

    float ribbonScatter =
      (aRandom - 0.5);


    waveformPosition.y +=
      ribbonScatter *
      (
        0.12 +
        energy * 0.38
      );


    waveformPosition.z +=
      sin(
        aRandom * 50.0 +
        uTime * 0.8
      )
      *
      (
        0.10 +
        energy * 0.32
      );


    /*
    ========================================
    6. BASS BREATHING
    ========================================

    Bass expands the whole ribbon,
    rather than simply moving it upward.
    */

    float bassPulse =
      max(
        uBeat - 0.08,
        0.0
      );


    waveformPosition.y *=
      1.0 +
      bassPulse * 0.75;


    waveformPosition.z *=
      1.0 +
      bassPulse * 1.4;


    /*
      Small vertical kick impact.
    */

    waveformPosition.y +=
      sin(
        aWaveU * 9.0 +
        uTime
      )
      *
      bassPulse
      *
      0.65;


    /*
    ========================================
    7. CLOUD → RIBBON ASSEMBLY
    ========================================
    */

    float assemblyProgress =
      smoothstep(
        0.0,
        1.0,
        uAudioMix
      );


    float arc =
      sin(
        assemblyProgress *
        3.14159265
      );


    vec3 arcOffset = vec3(
      sin(
        aRandom * 30.0
      ) * 0.35,

      cos(
        aRandom * 45.0
      ) * 0.45,

      sin(
        aRandom * 65.0
      ) * 0.55
    )
    *
    arc;


    vec3 finalPosition =
      mix(
        explodedPosition,
        waveformPosition,
        assemblyProgress
      )
      +
      arcOffset;


    /*
    ========================================
    8. POINTER INTERACTION
    ========================================
    */

    vec3 pointerPosition = vec3(
      uPointer.x * 4.0,
      uPointer.y * 2.2,
      0.0
    );


    float distanceToPointer =
      distance(
        finalPosition,
        pointerPosition
      );


    float pointerInfluence =
      1.0 -
      smoothstep(
        0.0,
        1.7,
        distanceToPointer
      );


    vec3 pointerDirection =
      normalize(
        finalPosition -
        pointerPosition +
        vec3(0.001)
      );


    finalPosition +=
      pointerDirection *
      pointerInfluence *
      0.32 *
      assemblyProgress;


    /*
    ========================================
    9. PROJECTION
    ========================================
    */

    vec4 mvPosition =
      modelViewMatrix *
      vec4(
        finalPosition,
        1.0
      );


    gl_Position =
      projectionMatrix *
      mvPosition;


    /*
      Energetic particles become slightly
      larger.

      Bass gives global pulse.
    */

    float particlePulse =
      1.0 +
      energy * 0.35 +
      bassPulse * 0.5;


    gl_PointSize =
      uSize *
      uPixelRatio *
      particlePulse *
      (
        1.0 /
        max(
          -mvPosition.z,
          0.1
        )
      );


    /*
      Wave gets brighter with energy.
    */

    vAlpha =
      mix(
        0.68,
        0.88 + energy * 0.12,
        assemblyProgress
      );
  }
`


export const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vEnergy;


  void main() {

    vec2 uv =
      gl_PointCoord.xy -
      0.5;


    float distanceFromCenter =
      length(uv);


    float alpha =
      smoothstep(
        0.5,
        0.05,
        distanceFromCenter
      )
      *
      vAlpha;


    /*
      Slight energy brightness boost.
      Still monochrome.
    */

    float brightness =
      1.0 +
      vEnergy * 0.35;


    vec3 color =
      vec3(brightness);


    gl_FragColor =
      vec4(
        color,
        alpha
      );
  }
`