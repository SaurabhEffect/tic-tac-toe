// Main Application Entry Point
// Handles initialization, event listeners, and game flow.
// Tic Tac Toe Game - v3.0

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
    elements.modeIndicator.textContent = `AI Mode (${gameState.aiDifficulty})`;
  } else {
    elements.modeIndicator.textContent = "2 Player Mode";
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);
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
      setTimeout(triggerAIMove, AI_CONFIG.DELAY);
    }
  }
}

function triggerAIMove() {
  if (!gameState.isGameActive) return;

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
  showEndGameButtons(elements);
  saveGameState(gameState);
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
    switchScreen(elements.startScreen, elements.modeSelectionScreen);
  });

  elements.statsBtn.addEventListener("click", () => {
    sounds.click();
    updateStatisticsDisplay();
    updateGameHistoryDisplay();
    previousScreen = elements.startScreen;
    switchScreen(elements.startScreen, elements.statsScreen);
  });

  elements.backToMenuBtn.addEventListener("click", () => {
    sounds.click();
    switchScreen(elements.statsScreen, previousScreen || elements.startScreen);
  });

  elements.twoPlayerModeBtn.addEventListener("click", () => {
    sounds.click();
    gameState.setGameMode(GAME_MODES.TWO_PLAYER);
    preparePlayerModalForTwoPlayer(elements);
    showPlayerModal(elements);
  });

  elements.aiModeBtn.addEventListener("click", () => {
    sounds.click();
    gameState.setGameMode(GAME_MODES.AI);
    preparePlayerModalForAI(elements);
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
    initGame();
  });

  elements.statsBtnGame.addEventListener("click", () => {
    sounds.click();
    updateStatisticsDisplay();
    updateGameHistoryDisplay();
    previousScreen = elements.gameScreen;
    switchScreen(elements.gameScreen, elements.statsScreen);
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
    let nameX = elements.playerXNameInput.value.trim();
    let nameO = elements.playerONameInput.value.trim();

    if (nameX && !isValidPlayerName(nameX)) {
      alert("Player X name must be 1-20 characters.");
      return;
    }

    if (gameState.gameMode === GAME_MODES.AI) {
      gameState.playerNameX = nameX || "Player X";
      gameState.playerNameO = "Computer";
    } else {
      if (nameO && !isValidPlayerName(nameO)) {
        alert("Player O name must be 1-20 characters.");
        return;
      }
      gameState.playerNameX = nameX || "Player X";
      gameState.playerNameO = nameO || "Player O";
    }
    savePlayerNames(gameState.playerNameX, gameState.playerNameO);

    sounds.click();
    hidePlayerModal(elements);
    switchScreen(elements.modeSelectionScreen, elements.gameScreen);
    initGame();
  });

  elements.skipNamesBtn.addEventListener("click", () => {
    sounds.click();
    gameState.playerNameX = "Player X";
    if (gameState.gameMode === GAME_MODES.AI) {
      gameState.playerNameO = "Computer";
    } else {
      gameState.playerNameO = "Player O";
    }
    savePlayerNames(gameState.playerNameX, gameState.playerNameO);

    hidePlayerModal(elements);
    switchScreen(elements.modeSelectionScreen, elements.gameScreen);
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
