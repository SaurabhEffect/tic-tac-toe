// DOM Elements Module

export function getDOMElements() {
  return {
    startScreen: document.getElementById("startScreen"),
    gameScreen: document.getElementById("gameScreen"),
    statsScreen: document.getElementById("statsScreen"),
    startBtn: document.getElementById("startBtn"),
    statsBtn: document.getElementById("statsBtn"),
    backToMenuBtn: document.getElementById("backToMenuBtn"),
    playAgainBtn: document.getElementById("playAgainBtn"),
    soundToggle: document.getElementById("soundToggle"),
    gameBoard: document.getElementById("gameBoard"),
    cells: document.querySelectorAll(".cell"),
    playerModal: document.getElementById("playerModal"),
    playerXNameInput: document.getElementById("playerXName"),
    playerONameInput: document.getElementById("playerOName"),
    startGameBtn: document.getElementById("startGameBtn"),
    skipNamesBtn: document.getElementById("skipNamesBtn"),
    currentPlayerDisplay: document.getElementById("currentPlayerDisplay"),
    gameStatus: document.getElementById("gameStatus"),
    liveSessionScore: document.getElementById("liveSessionScore"),
    sessionWins: document.getElementById("sessionWins"),
    sessionLosses: document.getElementById("sessionLosses"),
    sessionDraws: document.getElementById("sessionDraws"),
    sessionTotal: document.getElementById("sessionTotal"),
    resetSessionBtn: document.getElementById("resetSessionBtn"),
    winPercentage: document.getElementById("winPercentage"),
    totalGames: document.getElementById("totalGames"),
    currentStreak: document.getElementById("currentStreak"),
    bestStreak: document.getElementById("bestStreak"),
    gameHistoryList: document.getElementById("gameHistoryList"),
    clearHistoryBtn: document.getElementById("clearHistoryBtn"),
    exportHistoryBtn: document.getElementById("exportHistoryBtn"),
  };
}

export function validateDOMElements(elements) {
  const requiredElements = [
    "startScreen",
    "gameScreen",
    "statsScreen",
    "startBtn",
    "statsBtn",
    "backToMenuBtn",
    "playAgainBtn",
    "soundToggle",
    "gameBoard",
    "currentPlayerDisplay",
    "gameStatus",
  ];

  for (const elementName of requiredElements) {
    if (!elements[elementName]) {
      throw new Error(`Required DOM element not found: ${elementName}`);
    }
  }

  if (elements.cells.length === 0) {
    throw new Error("No cell elements found");
  }
}
