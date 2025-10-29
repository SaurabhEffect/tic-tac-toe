// DOM Elements Module

export function getDOMElements() {
  return {
    startScreen: document.getElementById("startScreen"),
    gameScreen: document.getElementById("gameScreen"),
    startBtn: document.getElementById("startBtn"),
    playAgainBtn: document.getElementById("playAgainBtn"),
    soundToggle: document.getElementById("soundToggle"),
    gameBoard: document.getElementById("gameBoard"),
    cells: document.querySelectorAll(".cell"),
    currentPlayerDisplay: document.getElementById("currentPlayerDisplay"),
    gameStatus: document.getElementById("gameStatus"),
  };
}

export function validateDOMElements(elements) {
  const requiredElements = [
    "startScreen",
    "gameScreen",
    "startBtn",
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
