import { create } from 'zustand'

export const useStore = create((set) => ({
  /*
    SCROLL
  */

  scrollProgress: 0,

  setScrollProgress: (value) =>
    set({
      scrollProgress: value,
    }),

  // 0 -> 1, controlled by GlassTransition ScrollTrigger
glassProgress: 0,

setGlassProgress: (value) =>
  set({ glassProgress: value }),
  /*
    POINTER
  */

  pointer: {
    x: 0,
    y: 0,
  },

  setPointer: (pointer) =>
    set({
      pointer,
    }),


  /*
    AUDIO STATE
  */

  isPlaying: false,

  setIsPlaying: (value) =>
    set({
      isPlaying: value,
    }),


  /*
    CLOUD → WAVEFORM PROGRESS
  */

  audioMix: 0,

  setAudioMix: (value) =>
    set({
      audioMix: value,
    }),


  /*
    WEB AUDIO ANALYSER
  */

  audioEngine: null,

  setAudioEngine: (engine) =>
    set({
      audioEngine: engine,
    }),


  /*
    EXTERNAL AUDIO BUTTON TRIGGER
  */

  audioTrigger: 0,

  triggerAudio: () =>
    set((state) => ({
      audioTrigger:
        state.audioTrigger + 1,
    })),
}))