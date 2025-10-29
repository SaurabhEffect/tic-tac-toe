// Main Application Entry Point
// Handles initialization, event listeners, and game flow.
// Tic Tac Toe Game - v1.1

import { CSS_CLASSES, MESSAGES } from "./config.js";
import { gameState } from "./gameState.js";
import { getDOMElements, validateDOMElements } from "./domElements.js";
import { sounds } from "./soundManager.js";
import { checkGameResult, isValidMove } from "./gameLogic.js";
import {
  updateCurrentPlayerDisplay,
  updateCellUI,
  displayWinResult,
  displayDrawResult,
  showPlayAgainButton,
  hidePlayAgainButton,
  switchScreen,
  resetCellsUI,
  clearStatus,
  toggleSoundButtonUI,
} from "./uiController.js";

let elements;
function initGame() {
  gameState.startGame();
  updateCurrentPlayerDisplay(elements);
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);
  if (!isValidMove(index)) {
    return;
  }

  makeMove(cell, index);
  const result = checkGameResult();
  if (result) {
    handleGameEnd(result);
  } else {
    gameState.switchPlayer();
    updateCurrentPlayerDisplay(elements);
  }
}

function makeMove(cell, index) {
  gameState.makeMove(index);
  updateCellUI(cell, index);
  sounds.move();
}

function handleGameEnd(result) {
  gameState.endGame();
  if (result.type === "win") {
    displayWinResult(result, elements);
    sounds.win();
  } else {
    displayDrawResult(elements);
    sounds.draw();
  }
  showPlayAgainButton(elements);
}

function resetGame() {
  gameState.reset();
  resetCellsUI(elements.cells);
  clearStatus(elements);
  hidePlayAgainButton(elements);
  updateCurrentPlayerDisplay(elements);
}

function setupEventListeners() {
  elements.startBtn.addEventListener("click", () => {
    sounds.click();
    switchScreen(elements.startScreen, elements.gameScreen);
    initGame();
  });

  elements.soundToggle.addEventListener("click", () => {
    gameState.toggleSound();
    toggleSoundButtonUI(elements.soundToggle);
    sounds.click();
  });

  elements.playAgainBtn.addEventListener("click", () => {
    sounds.click();
    resetGame();
  });

  elements.cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

function initializeApp() {
  try {
    elements = getDOMElements();
    validateDOMElements(elements);
    setupEventListeners();
    console.log(MESSAGES.LOAD_SUCCESS);
  } catch (error) {
    console.error("Failed to initialize game:", error);
    alert("Failed to load game. Please refresh the page.");
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
