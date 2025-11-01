// Main Application Entry Point
// Handles initialization, event listeners, and game flow.
// Tic Tac Toe Game - v1.3

import {
  getPlayerNames,
  savePlayerNames,
  getPlayerDisplayName,
  isValidPlayerName,
} from "./playerManager.js";

import {
  loadSoundPreference,
  saveSoundPreference,
  loadGameState,
  saveGameState,
  hasSavedGameState,
  clearGameState,
} from "./storage.js";

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
  setPlayerNameInputs,
  showPlayerModal,
  hidePlayerModal,
} from "./uiController.js";

let elements;
function initGame() {
  gameState.startGame();
  const displayName =
    gameState.currentPlayer === "X"
      ? gameState.playerNameX
      : gameState.playerNameO;
  elements.currentPlayerDisplay.textContent = displayName;
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
    const displayName =
      gameState.currentPlayer === "X"
        ? gameState.playerNameX
        : gameState.playerNameO;
    elements.currentPlayerDisplay.textContent = displayName;
  }
}

function makeMove(cell, index) {
  gameState.makeMove(index);
  updateCellUI(cell, index);
  sounds.move();
  saveGameState(gameState);
}

function handleGameEnd(result) {
  gameState.endGame();
  if (result.type === "win") {
    const winnerName =
      result.player === "X" ? gameState.playerNameX : gameState.playerNameO;

    result.combination.forEach((index) => {
      elements.cells[index].classList.add("winner");
    });

    elements.gameStatus.textContent = `${winnerName} Wins!`;
    sounds.win();
  } else {
    displayDrawResult(elements);
    sounds.draw();
  }
  showPlayAgainButton(elements);
  saveGameState(gameState);
}

function resetGame() {
  gameState.reset();
  resetCellsUI(elements.cells);
  clearStatus(elements);
  hidePlayAgainButton(elements);
  updateCurrentPlayerDisplay(elements);
  clearGameState();
}

function setupEventListeners() {
  elements.startBtn.addEventListener("click", () => {
    sounds.click();
    showPlayerModal(elements);
  });

  elements.soundToggle.addEventListener("click", () => {
    gameState.toggleSound();
    toggleSoundButtonUI(elements.soundToggle);
    sounds.click();
    saveSoundPreference(gameState.soundEnabled);
  });

  elements.playAgainBtn.addEventListener("click", () => {
    sounds.click();
    resetGame();
  });

  elements.cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  elements.startGameBtn.addEventListener("click", () => {
    const nameX = elements.playerXNameInput.value.trim();
    const nameO = elements.playerONameInput.value.trim();

    if (!nameX && !nameO) {
      gameState.playerNameX = "Player X";
      gameState.playerNameO = "Player O";
      savePlayerNames("Player X", "Player O");
    } else if (!nameX || !nameO) {
      alert("Please enter both player names or skip to use defaults.");
      return;
    } else if (!isValidPlayerName(nameX) || !isValidPlayerName(nameO)) {
      alert("Names must be 1-20 characters.");
      return;
    } else {
      gameState.playerNameX = nameX;
      gameState.playerNameO = nameO;
      savePlayerNames(nameX, nameO);
    }

    sounds.click();
    hidePlayerModal(elements);
    switchScreen(elements.startScreen, elements.gameScreen);
    initGame();
  });

  elements.skipNamesBtn.addEventListener("click", () => {
    sounds.click();
    gameState.playerNameX = "Player X";
    gameState.playerNameO = "Player O";
    hidePlayerModal(elements);
    switchScreen(elements.startScreen, elements.gameScreen);
    initGame();
  });
}

function initializeApp() {
  try {
    elements = getDOMElements();
    validateDOMElements(elements);

    setupEventListeners();
    const savedSoundEnabled = loadSoundPreference();
    gameState.soundEnabled = savedSoundEnabled;
    if (!savedSoundEnabled) {
      elements.soundToggle.classList.add("muted");
    }

    const savedNames = getPlayerNames();
    gameState.playerNameX = savedNames.X;
    gameState.playerNameO = savedNames.O;
    setPlayerNameInputs(elements, savedNames);

    window.addEventListener("beforeunload", () => {
      saveGameState(gameState);
      saveSoundPreference(gameState.soundEnabled);
    });
    console.log(MESSAGES.LOAD_SUCCESS);
  } catch (error) {
    console.error("Failed to initialize game:", error);
    alert("Failed to load game. Please refresh the page.");
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);
