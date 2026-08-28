// Storage Manager Module - Handles all localStorage operations for preferences and game state

import { AI_CONFIG } from "./config.js";

const STORAGE_KEYS = {
  SOUND_ENABLED: "tictactoe_soundEnabled",
  GAME_STATE: "tictactoe_gameState",
  PLAYER_PREFERENCES: "tictactoe_playerPrefs",
  STATISTICS: "tictactoe_statistics",
  SESSION_STATS: "tictactoe_sessionStats",
  GAME_HISTORY: "tictactoe_gameHistory",
  DIFFICULTY: "tictactoe_difficulty",
};

const DEFAULT_PREFERENCES = {
  soundEnabled: true,
};

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];

function safeParse(raw, fallback) {
  if (raw === null || raw === undefined) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch {
    return fallback;
  }
}

export function saveSoundPreference(soundEnabled) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.SOUND_ENABLED,
      JSON.stringify(Boolean(soundEnabled))
    );
  } catch (e) {
    console.warn("Failed to save sound preference:", e);
  }
}

export function saveDifficultyPreference(difficulty) {
  try {
    localStorage.setItem(STORAGE_KEYS.DIFFICULTY, JSON.stringify(difficulty));
  } catch (e) {
    console.warn("Failed to save difficulty preference:", e);
  }
}

export function loadDifficultyPreference() {
  const value = safeParse(
    localStorage.getItem(STORAGE_KEYS.DIFFICULTY),
    AI_CONFIG.DIFFICULTY
  );
  return VALID_DIFFICULTIES.includes(value) ? value : AI_CONFIG.DIFFICULTY;
}

export function loadSoundPreference() {
  const value = safeParse(
    localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED),
    DEFAULT_PREFERENCES.soundEnabled
  );
  return typeof value === "boolean" ? value : DEFAULT_PREFERENCES.soundEnabled;
}

export function saveGameState(gameStateObj) {
  const stateToSave = {
    board: gameStateObj.board,
    currentPlayer: gameStateObj.currentPlayer,
    isGameActive: gameStateObj.isGameActive,
    soundEnabled: gameStateObj.soundEnabled,
    playerNameX: gameStateObj.playerNameX,
    playerNameO: gameStateObj.playerNameO,
    timestamp: new Date().getTime(),
    gameMode: gameStateObj.gameMode,
    aiDifficulty: gameStateObj.aiDifficulty,
  };
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(stateToSave));
  } catch (e) {
    console.warn("Failed to save game state to localStorage:", e);
  }
}

export function loadGameState() {
  const state = safeParse(localStorage.getItem(STORAGE_KEYS.GAME_STATE), null);
  if (!state || typeof state !== "object" || !Array.isArray(state.board)) {
    return null;
  }
  state.gameMode = state.gameMode || null;
  state.aiDifficulty = state.aiDifficulty || null;
  return state;
}

export function clearGameState() {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
  } catch (e) {
    console.warn("Failed to clear game state:", e);
  }
}

export function hasSavedGameState() {
  try {
    return localStorage.getItem(STORAGE_KEYS.GAME_STATE) !== null;
  } catch {
    return false;
  }
}

export function clearAllStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Failed to remove key:", key, e);
    }
  });
}

export function savePlayerPreferences(preferences) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.PLAYER_PREFERENCES,
      JSON.stringify(preferences)
    );
  } catch (e) {
    console.warn("Failed to save player preferences:", e);
  }
}

export function loadPlayerPreferences() {
  const value = safeParse(
    localStorage.getItem(STORAGE_KEYS.PLAYER_PREFERENCES),
    {}
  );
  return value && typeof value === "object" && !Array.isArray(value)
    ? value
    : {};
}

export function saveStatistics(stats) {
  try {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  } catch (e) {
    console.warn("Failed to save statistics to localStorage:", e);
  }
}

export function loadStatistics() {
  return safeParse(localStorage.getItem(STORAGE_KEYS.STATISTICS), null);
}

export function saveSessionStats(sessionStats) {
  try {
    sessionStorage.setItem(
      STORAGE_KEYS.SESSION_STATS,
      JSON.stringify(sessionStats)
    );
  } catch (e) {
    console.warn("Failed to save session stats to sessionStorage:", e);
  }
}

export function loadSessionStats() {
  return safeParse(sessionStorage.getItem(STORAGE_KEYS.SESSION_STATS), null);
}

export function saveGameHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save game history to localStorage:", e);
  }
}

export function loadGameHistory() {
  const value = safeParse(localStorage.getItem(STORAGE_KEYS.GAME_HISTORY), []);
  return Array.isArray(value) ? value : [];
}

export function clearGameHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_HISTORY);
  } catch (e) {
    console.warn("Failed to clear game history:", e);
  }
}
