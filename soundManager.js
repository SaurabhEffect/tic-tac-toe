// Sound Manager Module: Handles all audio functionality using Web Audio API

import { SOUND_CONFIG } from "./config.js";
import { gameState } from "./gameState.js";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
function playSound(frequency, duration, type = "sine") {
  if (!gameState.soundEnabled) return;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.setValueAtTime(SOUND_CONFIG.VOLUME, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

export const sounds = {
  move: () => {
    playSound(
      SOUND_CONFIG.FREQUENCIES.MOVE,
      SOUND_CONFIG.DURATIONS.MOVE,
      SOUND_CONFIG.WAVE_TYPES.MOVE
    );
  },
  win: () => {
    playSound(
      SOUND_CONFIG.FREQUENCIES.WIN_NOTE_1,
      SOUND_CONFIG.DURATIONS.WIN_NOTE_1,
      SOUND_CONFIG.WAVE_TYPES.WIN
    );
    setTimeout(() => {
      playSound(
        SOUND_CONFIG.FREQUENCIES.WIN_NOTE_2,
        SOUND_CONFIG.DURATIONS.WIN_NOTE_2,
        SOUND_CONFIG.WAVE_TYPES.WIN
      );
    }, SOUND_CONFIG.WIN_DELAY.NOTE_2);
    setTimeout(() => {
      playSound(
        SOUND_CONFIG.FREQUENCIES.WIN_NOTE_3,
        SOUND_CONFIG.DURATIONS.WIN_NOTE_3,
        SOUND_CONFIG.WAVE_TYPES.WIN
      );
    }, SOUND_CONFIG.WIN_DELAY.NOTE_3);
  },
  draw: () => {
    playSound(
      SOUND_CONFIG.FREQUENCIES.DRAW,
      SOUND_CONFIG.DURATIONS.DRAW,
      SOUND_CONFIG.WAVE_TYPES.DRAW
    );
  },
  click: () => {
    playSound(
      SOUND_CONFIG.FREQUENCIES.CLICK,
      SOUND_CONFIG.DURATIONS.CLICK,
      SOUND_CONFIG.WAVE_TYPES.CLICK
    );
  },
};
