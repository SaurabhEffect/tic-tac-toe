// Player Manager Module - Handles player names and customization

const STORAGE_KEYS = {
  PLAYER_NAMES: "tictactoe_playerNames",
};

const DEFAULT_NAMES = {
  X: "Player X",
  O: "Player O",
};

export function getPlayerNames() {
  const saved = localStorage.getItem(STORAGE_KEYS.PLAYER_NAMES);
  if (saved) {
    return JSON.parse(saved);
  }
  return DEFAULT_NAMES;
}

export function savePlayerNames(nameX, nameO) {
  const names = {
    X: nameX.trim() || DEFAULT_NAMES.X,
    O: nameO.trim() || DEFAULT_NAMES.O,
  };
  localStorage.setItem(STORAGE_KEYS.PLAYER_NAMES, JSON.stringify(names));
}

export function resetPlayerNames() {
  localStorage.removeItem(STORAGE_KEYS.PLAYER_NAMES);
}

export function getPlayerDisplayName(player) {
  const names = getPlayerNames();
  return names[player] || DEFAULT_NAMES[player];
}

export function isValidPlayerName(name) {
  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= 20;
}
