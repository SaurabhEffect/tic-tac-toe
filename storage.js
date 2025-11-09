// Storage Manager Module - Handles all localStorage operations for preferences and game state

const STORAGE_KEYS = {
  SOUND_ENABLED: "tictactoe_soundEnabled",
  GAME_STATE: "tictactoe_gameState",
  PLAYER_PREFERENCES: "tictactoe_playerPrefs",
  STATISTICS: "tictactoe_statistics",
  SESSION_STATS: "tictactoe_sessionStats",
  GAME_HISTORY: "tictactoe_gameHistory",
};

const DEFAULT_PREFERENCES = {
  soundEnabled: true,
};

export function saveSoundPreference(soundEnabled) {
  localStorage.setItem(
    STORAGE_KEYS.SOUND_ENABLED,
    JSON.stringify(soundEnabled)
  );
}

export function loadSoundPreference() {
  const saved = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
  return saved !== null ? JSON.parse(saved) : DEFAULT_PREFERENCES.soundEnabled;
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
  };

  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(stateToSave));
  } catch (e) {
    console.warn("Failed to save game state to localStorage:", e);
  }
}

export function loadGameState() {
  const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
  if (saved) {
    const state = JSON.parse(saved);
    return state;
  }
  return null;
}

export function clearGameState() {
  localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
}

export function hasSavedGameState() {
  return localStorage.getItem(STORAGE_KEYS.GAME_STATE) !== null;
}

export function clearAllStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

export function savePlayerPreferences(preferences) {
  localStorage.setItem(
    STORAGE_KEYS.PLAYER_PREFERENCES,
    JSON.stringify(preferences)
  );
}

export function loadPlayerPreferences() {
  const saved = localStorage.getItem(STORAGE_KEYS.PLAYER_PREFERENCES);
  return saved ? JSON.parse(saved) : {};
}

export function saveStatistics(stats) {
  try {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  } catch (e) {
    console.warn("Failed to save statistics to localStorage:", e);
  }
}

export function loadStatistics() {
  const saved = localStorage.getItem(STORAGE_KEYS.STATISTICS);
  return saved ? JSON.parse(saved) : null;
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
  const saved = sessionStorage.getItem(STORAGE_KEYS.SESSION_STATS);
  return saved ? JSON.parse(saved) : null;
}

export function saveGameHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save game history to localStorage:", e);
  }
}

export function loadGameHistory() {
  const saved = localStorage.getItem(STORAGE_KEYS.GAME_HISTORY);
  return saved ? JSON.parse(saved) : [];
}

export function clearGameHistory() {
  localStorage.removeItem(STORAGE_KEYS.GAME_HISTORY);
}
