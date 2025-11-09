// Main Application Entry Point
// Handles initialization, event listeners, and game flow.
// Tic Tac Toe Game - v2.0

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

import { statisticsManager } from "./statisticsManager.js";
import { gameHistoryManager } from "./gameHistoryManager.js";

let elements;

function initGame() {
  gameState.startGame();
  const displayName =
    gameState.currentPlayer === "X"
      ? gameState.playerNameX
      : gameState.playerNameO;
  elements.currentPlayerDisplay.textContent = displayName;
  updateLiveScore();
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
  let gameResult, winner;

  if (result.type === "win") {
    const winnerName =
      result.player === "X" ? gameState.playerNameX : gameState.playerNameO;
    result.combination.forEach((index) => {
      elements.cells[index].classList.add("winner");
    });

    elements.gameStatus.textContent = `${winnerName} Wins!`;
    sounds.win();
    gameResult = "win";
    winner = result.player;
  } else {
    displayDrawResult(elements);
    sounds.draw();

    gameResult = "draw";
    winner = null;
  }

  statisticsManager.recordGameResult(
    gameResult,
    winner,
    gameState.playerNameX,
    gameState.playerNameO
  );

  gameHistoryManager.addGameToHistory(
    gameResult,
    winner,
    gameState.playerNameX,
    gameState.playerNameO,
    [...gameState.board]
  );

  updateLiveScore();
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

function updateLiveScore() {
  const sessionStats = statisticsManager.getSessionStats();
  elements.liveSessionScore.textContent = `W: ${sessionStats.sessionWins} | L: ${sessionStats.sessionLosses} | D: ${sessionStats.sessionDraws}`;
}

function updateStatisticsDisplay() {
  const stats = statisticsManager.getFormattedStats();

  elements.sessionWins.textContent = stats.session.wins;
  elements.sessionLosses.textContent = stats.session.losses;
  elements.sessionDraws.textContent = stats.session.draws;
  elements.sessionTotal.textContent = stats.session.total;
  elements.winPercentage.textContent = `${stats.allTime.winPercentage}%`;
  elements.totalGames.textContent = stats.allTime.total;
  elements.currentStreak.textContent = stats.allTime.currentStreak;
  elements.bestStreak.textContent = stats.allTime.bestStreak;
}

function updateGameHistoryDisplay() {
  const history = gameHistoryManager.getFormattedHistory();

  if (history.length === 0) {
    elements.gameHistoryList.innerHTML =
      '<p class="no-history">No games played yet</p>';
    return;
  }

  const historyHTML = history
    .map(
      (game) => `
    <div class="history-item">
      <span class="history-winner">${game.winner}</span>
      <span class="history-date">${game.date} ${game.time}</span>
    </div>
  `
    )
    .join("");

  elements.gameHistoryList.innerHTML = historyHTML;
}

function setupEventListeners() {
  elements.startBtn.addEventListener("click", () => {
    sounds.click();
    showPlayerModal(elements);
  });

  elements.statsBtn.addEventListener("click", () => {
    sounds.click();
    updateStatisticsDisplay();
    updateGameHistoryDisplay();
    switchScreen(elements.startScreen, elements.statsScreen);
  });

  elements.backToMenuBtn.addEventListener("click", () => {
    sounds.click();
    switchScreen(elements.statsScreen, elements.startScreen);
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

  elements.resetSessionBtn.addEventListener("click", () => {
    sounds.click();
    statisticsManager.resetSessionStats();
    updateStatisticsDisplay();
    updateLiveScore();
    alert(MESSAGES.STATS_RESET);
  });

  elements.clearHistoryBtn.addEventListener("click", () => {
    sounds.click();
    if (
      confirm(
        "Are you sure you want to clear all game history? This action cannot be undone."
      )
    ) {
      gameHistoryManager.clearHistory();
      updateGameHistoryDisplay();
      alert(MESSAGES.HISTORY_CLEARED);
    }
  });

  // Export game history
  elements.exportHistoryBtn.addEventListener("click", () => {
    sounds.click();
    const success = gameHistoryManager.downloadHistoryAsJSON();
    if (success) {
      alert(MESSAGES.HISTORY_EXPORTED);
    } else {
      alert(MESSAGES.EXPORT_ERROR);
    }
  });

  elements.startGameBtn.addEventListener("click", () => {
    const nameX = elements.playerXNameInput.value.trim();
    const nameO = elements.playerONameInput.value.trim();

    if (!nameX && !nameO) {
      // Both empty - use defaults
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

    updateLiveScore();

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
