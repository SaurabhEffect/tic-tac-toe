// DOM Elements Module

export function getDOMElements() {
  return {
    startScreen: document.getElementById("startScreen"),
    gameScreen: document.getElementById("gameScreen"),
    statsScreen: document.getElementById("statsScreen"),
    modeSelectionScreen: document.getElementById("modeSelectionScreen"),
    startBtn: document.getElementById("startBtn"),
    statsBtn: document.getElementById("statsBtn"),
    backToMenuBtn: document.getElementById("backToMenuBtn"),
    twoPlayerModeBtn: document.getElementById("twoPlayerModeBtn"),
    aiModeBtn: document.getElementById("aiModeBtn"),
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
    modeIndicator: document.getElementById("modeIndicator"),
    endGameButtons: document.getElementById("endGameButtons"),
    statsBtnGame: document.getElementById("statsBtnGame"),
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
    "modeSelectionScreen",
    "twoPlayerModeBtn",
    "aiModeBtn",
    "playerModal",
    "startGameBtn",
    "skipNamesBtn",
    "modeIndicator",
    "endGameButtons",
    "statsBtnGame",
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
