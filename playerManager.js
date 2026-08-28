// Player Manager Module - Handles player names and customization

const STORAGE_KEYS = {
  PLAYER_NAMES: "tictactoe_playerNames",
};

const DEFAULT_NAMES = {
  X: "Player X",
  O: "Player O",
};

export const MAX_NAME_LENGTH = 20;

export function sanitizePlayerName(name) {
  if (typeof name !== "string") return "";
  let out = "";
  for (const ch of name) {
    const code = ch.codePointAt(0);
    if (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) continue;
    out += ch;
  }
  return out.replace(/\s+/g, " ").trim().slice(0, MAX_NAME_LENGTH);
}

export function getPlayerNames() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PLAYER_NAMES);
    if (!saved) return { ...DEFAULT_NAMES };
    const parsed = JSON.parse(saved);
    return {
      X: sanitizePlayerName(parsed && parsed.X) || DEFAULT_NAMES.X,
      O: sanitizePlayerName(parsed && parsed.O) || DEFAULT_NAMES.O,
    };
  } catch {
    return { ...DEFAULT_NAMES };
  }
}

export function savePlayerNames(nameX, nameO) {
  const names = {
    X: sanitizePlayerName(nameX) || DEFAULT_NAMES.X,
    O: sanitizePlayerName(nameO) || DEFAULT_NAMES.O,
  };
  try {
    localStorage.setItem(STORAGE_KEYS.PLAYER_NAMES, JSON.stringify(names));
  } catch (e) {
    console.warn("Failed to save player names:", e);
  }
  return names;
}

export function resetPlayerNames() {
  try {
    localStorage.removeItem(STORAGE_KEYS.PLAYER_NAMES);
  } catch (e) {
    console.warn("Failed to reset player names:", e);
  }
}

export function getPlayerDisplayName(player) {
  const names = getPlayerNames();
  return names[player] || DEFAULT_NAMES[player];
}

export function isValidPlayerName(name) {
  const trimmed = sanitizePlayerName(name);
  return trimmed.length > 0 && trimmed.length <= MAX_NAME_LENGTH;
}
