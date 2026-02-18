// Main Application Entry Point
// Handles initialization, event listeners, and game flow.
// Tic Tac Toe Game - v3.2

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
  saveDifficultyPreference,
  loadDifficultyPreference,
} from "./storage.js";

import {
  CSS_CLASSES,
  MESSAGES,
  GAME_MODES,
  AI_CONFIG,
  GAME_CONFIG,
} from "./config.js";

import { gameState } from "./gameState.js";
import { getDOMElements, validateDOMElements } from "./domElements.js";
import { sounds } from "./soundManager.js";
import { checkGameResult, isValidMove } from "./gameLogic.js";

import {
  updateCurrentPlayerDisplay,
  updateCellUI,
  displayWinResult,
  displayDrawResult,
  showEndGameButtons,
  hideEndGameButtons,
  switchScreen,
  resetCellsUI,
  clearStatus,
  toggleSoundButtonUI,
  setPlayerNameInputs,
  showPlayerModal,
  hidePlayerModal,
  preparePlayerModalForAI,
  preparePlayerModalForTwoPlayer,
} from "./uiController.js";

import { statisticsManager } from "./statisticsManager.js";
import { gameHistoryManager } from "./gameHistoryManager.js";
import { getAIMove } from "./aiLogic.js";

let elements;
let previousScreen = null;

function initGame() {
  gameState.startGame();
  const displayName =
    gameState.currentPlayer === "X"
      ? gameState.playerNameX
      : gameState.playerNameO;
  elements.currentPlayerDisplay.textContent = displayName;
  updateLiveScore();

  if (gameState.gameMode === GAME_MODES.AI) {
    const difficulty =
      gameState.aiDifficulty.charAt(0).toUpperCase() +
      gameState.aiDifficulty.slice(1);
    elements.modeIndicator.textContent = `AI Mode (${difficulty})`;
  } else {
    elements.modeIndicator.textContent = "2 Player Mode";
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);
  if (isNaN(index)) {
    console.warn("Invalid cell index");
    return;
  }

  if (
    (gameState.gameMode === GAME_MODES.AI &&
      gameState.currentPlayer === GAME_CONFIG.PLAYERS.O) ||
    !isValidMove(index)
  ) {
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

    if (gameState.isAiTurn()) {
      elements.gameBoard.classList.add(CSS_CLASSES.DISABLED);
      elements.aiThinking.classList.remove(CSS_CLASSES.HIDDEN);
      const delay =
        AI_CONFIG.DELAYS[gameState.aiDifficulty] || AI_CONFIG.DELAYS.easy;
      setTimeout(triggerAIMove, delay);
    }

    if (gameState.isGameActive) {
      saveGameState(gameState);
    }
  }
}

function triggerAIMove() {
  if (!gameState.isGameActive) {
    elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);
    return;
  }

  const moveIndex = getAIMove(gameState.aiDifficulty);
  if (moveIndex === null) return;

  const cell = elements.cells[moveIndex];
  makeMove(cell, moveIndex);
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

  elements.gameBoard.classList.remove(CSS_CLASSES.DISABLED);
  elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);

  if (gameState.isGameActive) {
    saveGameState(gameState);
  }
}

function makeMove(cell, index) {
  gameState.makeMove(index);
  updateCellUI(cell, index);
  sounds.move();
}

function handleGameEnd(result) {
  gameState.endGame();
  elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);

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
  showEndGameButtons(elements);
  clearGameState();
}

function resetGame() {
  gameState.reset();
  resetCellsUI(elements.cells);
  clearStatus(elements);
  hideEndGameButtons(elements);
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
    elements.gameHistoryList.innerHTML = `
      <li class="history-item empty">No games played yet</li>
    `;
    return;
  }

  const historyHTML = history
    .map(
      (game) => `
        <li class="history-item">
          <span class="history-result">${game.winner}</span>
          <span class="history-time">${game.date} ${game.time}</span>
          <span class="history-players">${game.players}</span>
        </li>
      `
    )
    .join("");

  elements.gameHistoryList.innerHTML = historyHTML;
}

function setupEventListeners() {
  elements.cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
  elements.startBtn.addEventListener("click", () => {
    sounds.click();
    previousScreen = elements.startScreen;
    switchScreen(elements.startScreen, elements.modeSelectionScreen);
  });
  elements.twoPlayerModeBtn.addEventListener("click", () => {
    sounds.click();
    gameState.setGameMode(GAME_MODES.TWO_PLAYER);
    gameState.aiDifficulty = null;
    preparePlayerModalForTwoPlayer(elements);
    const names = getPlayerNames();
    setPlayerNameInputs(elements, names);
    previousScreen = elements.modeSelectionScreen;
    showPlayerModal(elements);
  });

  elements.aiModeBtn.addEventListener("click", () => {
    sounds.click();
    gameState.setGameMode(GAME_MODES.AI);
    previousScreen = elements.modeSelectionScreen;
    switchScreen(
      elements.modeSelectionScreen,
      elements.difficultySelectionScreen
    );
  });

  elements.easyModeBtn.addEventListener("click", () => {
    sounds.click();
    gameState.setDifficulty("easy");
    saveDifficultyPreference("easy");
    preparePlayerModalForAI(elements);
    const names = getPlayerNames();
    elements.playerXNameInput.value = names.X === "Player X" ? "" : names.X;
    previousScreen = elements.difficultySelectionScreen;
    showPlayerModal(elements);
  });

  elements.mediumModeBtn.addEventListener("click", () => {
    sounds.click();
    gameState.setDifficulty("medium");
    saveDifficultyPreference("medium");
    preparePlayerModalForAI(elements);
    const names = getPlayerNames();
    elements.playerXNameInput.value = names.X === "Player X" ? "" : names.X;
    previousScreen = elements.difficultySelectionScreen;
    showPlayerModal(elements);
  });

  elements.hardModeBtn.addEventListener("click", () => {
    sounds.click();
    gameState.setDifficulty("hard");
    saveDifficultyPreference("hard");
    preparePlayerModalForAI(elements);
    const names = getPlayerNames();
    elements.playerXNameInput.value = names.X === "Player X" ? "" : names.X;
    previousScreen = elements.difficultySelectionScreen;
    showPlayerModal(elements);
  });

  elements.backToModeBtn.addEventListener("click", () => {
    sounds.click();
    switchScreen(
      elements.difficultySelectionScreen,
      elements.modeSelectionScreen
    );
  });

  elements.startGameBtn.addEventListener("click", () => {
    sounds.click();
    const playerXName = elements.playerXNameInput.value.trim();
    const playerOName = elements.playerONameInput.value.trim();
    if (gameState.gameMode === GAME_MODES.AI) {
      gameState.playerNameX = playerXName || "Player";
      gameState.playerNameO = "Computer";
      savePlayerNames(gameState.playerNameX, "Computer");
    } else {
      gameState.playerNameX = playerXName || "Player X";
      gameState.playerNameO = playerOName || "Player O";
      savePlayerNames(gameState.playerNameX, gameState.playerNameO);
    }
    hidePlayerModal(elements);
    switchScreen(previousScreen, elements.gameScreen);
    initGame();
  });

  elements.skipNamesBtn.addEventListener("click", () => {
    sounds.click();
    if (gameState.gameMode === GAME_MODES.AI) {
      gameState.playerNameX = "Player";
      gameState.playerNameO = "Computer";
    } else {
      gameState.playerNameX = "Player X";
      gameState.playerNameO = "Player O";
    }
    hidePlayerModal(elements);
    switchScreen(previousScreen, elements.gameScreen);
    initGame();
  });

  elements.playAgainBtn.addEventListener("click", () => {
    sounds.click();
    resetGame();
    initGame();
  });

  elements.changeDifficultyBtn.addEventListener("click", () => {
    sounds.click();
    resetGame();
    switchScreen(elements.gameScreen, elements.difficultySelectionScreen);
  });

  elements.statsBtn.addEventListener("click", () => {
    sounds.click();
    updateStatisticsDisplay();
    updateGameHistoryDisplay();
    switchScreen(elements.startScreen, elements.statsScreen);
  });

  elements.statsBtnGame.addEventListener("click", () => {
    sounds.click();
    updateStatisticsDisplay();
    updateGameHistoryDisplay();
    previousScreen = elements.gameScreen;
    switchScreen(elements.gameScreen, elements.statsScreen);
  });

  elements.backToMenuBtn.addEventListener("click", () => {
    sounds.click();
    if (previousScreen === elements.gameScreen) {
      switchScreen(elements.statsScreen, elements.gameScreen);
      previousScreen = null;
    } else {
      switchScreen(elements.statsScreen, elements.startScreen);
    }
  });

  elements.resetSessionBtn.addEventListener("click", () => {
    sounds.click();
    if (confirm("Are you sure you want to reset session statistics?")) {
      statisticsManager.resetSessionStats();
      updateStatisticsDisplay();
      updateLiveScore();
      alert(MESSAGES.STATS_RESET);
    }
  });

  elements.clearHistoryBtn.addEventListener("click", () => {
    sounds.click();
    if (confirm("Are you sure you want to clear game history?")) {
      gameHistoryManager.clearHistory();
      updateGameHistoryDisplay();
      alert(MESSAGES.HISTORY_CLEARED);
    }
  });

  elements.exportHistoryBtn.addEventListener("click", () => {
    sounds.click();
    const success = gameHistoryManager.downloadHistoryAsJSON();
    if (success) {
      alert(MESSAGES.HISTORY_EXPORTED);
    } else {
      alert(MESSAGES.EXPORT_ERROR);
    }
  });

  elements.soundToggle.addEventListener("click", () => {
    gameState.toggleSound();
    saveSoundPreference(gameState.soundEnabled);
    toggleSoundButtonUI(elements.soundToggle);
    if (gameState.soundEnabled) {
      sounds.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    elements = getDOMElements();
    validateDOMElements(elements);
    setupEventListeners();
    const savedSoundPref = loadSoundPreference();
    gameState.soundEnabled = savedSoundPref;
    if (!savedSoundPref) {
      elements.soundToggle.classList.add(CSS_CLASSES.MUTED);
    }
    const savedDifficulty = loadDifficultyPreference();
    if (savedDifficulty) {
      gameState.setDifficulty(savedDifficulty);
    }

    console.log("✓ Tic Tac Toe v3.2 initialized successfully");
  } catch (error) {
    console.error("Failed to initialize game:", error);
    alert("Failed to load the game. Please refresh the page.");
  }
});
