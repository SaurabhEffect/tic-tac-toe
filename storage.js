// Storage Manager Module - Handles all localStorage operations for preferences and game state

const STORAGE_KEYS = {
  SOUND_ENABLED: "tictactoe_soundEnabled",
  GAME_STATE: "tictactoe_gameState",
  PLAYER_PREFERENCES: "tictactoe_playerPrefs",
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
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(stateToSave));
}

export function loadGameState() {
  const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
  return saved ? JSON.parse(saved) : null;
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
