// Contains all game constants, winning combinations, and default settings

export const GAME_CONFIG = {
  BOARD_SIZE: 9,
  GRID_DIMENSIONS: 3,
  INITIAL_PLAYER: "X",
  PLAYERS: {
    X: "X",
    O: "O",
  },
};

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const SOUND_CONFIG = {
  VOLUME: 0.2,
  FREQUENCIES: {
    MOVE: 600,
    WIN_NOTE_1: 523,
    WIN_NOTE_2: 659,
    WIN_NOTE_3: 784,
    DRAW: 400,
    CLICK: 500,
  },
  DURATIONS: {
    MOVE: 0.08,
    WIN_NOTE_1: 0.12,
    WIN_NOTE_2: 0.12,
    WIN_NOTE_3: 0.25,
    DRAW: 0.2,
    CLICK: 0.04,
  },
  WAVE_TYPES: {
    MOVE: "sine",
    WIN: "sine",
    DRAW: "triangle",
    CLICK: "sine",
  },
  WIN_DELAY: {
    NOTE_2: 120,
    NOTE_3: 240,
  },
};

export const RESULT_TYPES = {
  WIN: "win",
  DRAW: "draw",
};

export const CSS_CLASSES = {
  ACTIVE: "active",
  HIDDEN: "hidden",
  TAKEN: "taken",
  WINNER: "winner",
  MUTED: "muted",
};

export const MESSAGES = {
  WIN: (playerName) => `${playerName} Wins!`,
  DRAW: "It's a Draw!",
  LOAD_SUCCESS: "Luxury Tic Tac Toe loaded successfully!",
};
