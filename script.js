// Main Application Entry Point
// Handles initialization, event listeners, and game flow.
// Tic Tac Toe Game - v3.2

import {
  getPlayerNames,
  savePlayerNames,
  sanitizePlayerName,
} from "./playerManager.js";

import {
  loadSoundPreference,
  saveSoundPreference,
  saveGameState,
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
  updateCellUI,
  displayDrawResult,
  showEndGameButtons,
  hideEndGameButtons,
  switchScreen,
  resetCellsUI,
  disableAllCells,
  clearStatus,
  syncSoundButtonUI,
  syncModeControl,
  showPlayerModal,
  hidePlayerModal,
  preparePlayerModalForAI,
  preparePlayerModalForTwoPlayer,
} from "./uiController.js";

import { statisticsManager } from "./statisticsManager.js";
import { gameHistoryManager } from "./gameHistoryManager.js";
import { getAIMove } from "./aiLogic.js";

const HAS_WINNER_CLASS = "has-winner";
const RESULT_CLASS = "result";

let elements;
let previousScreen = null;
let aiMoveTimeoutId = null;
let gameGeneration = 0;

function cancelPendingAIMove() {
  if (aiMoveTimeoutId !== null) {
    clearTimeout(aiMoveTimeoutId);
    aiMoveTimeoutId = null;
  }
  gameGeneration++;
}

function currentDisplayName() {
  return gameState.currentPlayer === "X"
    ? gameState.playerNameX
    : gameState.playerNameO;
}

function setTurnDisplay() {
  elements.currentPlayerDisplay.textContent = currentDisplayName();
}

function initGame() {
  cancelPendingAIMove();
  gameState.startGame();
  setTurnDisplay();
  updateLiveScore();

  elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);
  elements.gameBoard.classList.remove(CSS_CLASSES.DISABLED);
  elements.gameBoard.classList.remove(HAS_WINNER_CLASS);
  elements.gameStatus.classList.remove(RESULT_CLASS);

  const isAi = gameState.gameMode === GAME_MODES.AI;
  elements.changeDifficultyBtn.classList.toggle(CSS_CLASSES.HIDDEN, !isAi);
  syncModeControl(elements, gameState);
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = parseInt(cell.dataset.index, 10);
  if (Number.isNaN(index)) return;
  if (!gameState.isGameActive) return;
  if (
    gameState.gameMode === GAME_MODES.AI &&
    gameState.currentPlayer === GAME_CONFIG.PLAYERS.O
  ) {
    return;
  }
  if (!isValidMove(index)) return;
  makeMove(cell, index);
  const result = checkGameResult();

  if (result) {
    handleGameEnd(result);
    return;
  }

  gameState.switchPlayer();
  setTurnDisplay();

  if (gameState.isAiTurn()) {
    elements.gameBoard.classList.add(CSS_CLASSES.DISABLED);
    elements.aiThinking.classList.remove(CSS_CLASSES.HIDDEN);
    const delay =
      AI_CONFIG.DELAYS[gameState.aiDifficulty] || AI_CONFIG.DELAYS.easy;
    const scheduledGen = gameGeneration;
    aiMoveTimeoutId = setTimeout(() => triggerAIMove(scheduledGen), delay);
  }

  if (gameState.isGameActive) {
    saveGameState(gameState);
  }
}

function triggerAIMove(scheduledGen) {
  aiMoveTimeoutId = null;
  if (scheduledGen !== gameGeneration) return;
  if (!gameState.isGameActive || !gameState.isAiTurn()) {
    elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);
    elements.gameBoard.classList.remove(CSS_CLASSES.DISABLED);
    return;
  }

  const moveIndex = getAIMove(gameState.aiDifficulty);
  elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);
  elements.gameBoard.classList.remove(CSS_CLASSES.DISABLED);

  if (
    moveIndex === null ||
    moveIndex === undefined ||
    !isValidMove(moveIndex)
  ) {
    return;
  }

  const cell = elements.cells[moveIndex];
  makeMove(cell, moveIndex);
  const result = checkGameResult();

  if (result) {
    handleGameEnd(result);
    return;
  }

  gameState.switchPlayer();
  setTurnDisplay();

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
  cancelPendingAIMove();

  elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);
  elements.gameBoard.classList.remove(CSS_CLASSES.DISABLED);
  disableAllCells(elements.cells);
  elements.gameStatus.classList.add(RESULT_CLASS);

  let gameResult, winner;

  if (result.type === "win") {
    const winnerName =
      result.player === "X" ? gameState.playerNameX : gameState.playerNameO;
    result.combination.forEach((index) => {
      elements.cells[index].classList.add(CSS_CLASSES.WINNER);
    });
    elements.gameBoard.classList.add(HAS_WINNER_CLASS);
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
  cancelPendingAIMove();
  gameState.reset();
  resetCellsUI(elements.cells);
  clearStatus(elements);
  hideEndGameButtons(elements);
  elements.aiThinking.classList.add(CSS_CLASSES.HIDDEN);
  elements.gameBoard.classList.remove(CSS_CLASSES.DISABLED);
  elements.gameBoard.classList.remove(HAS_WINNER_CLASS);
  clearGameState();
}

function beginNewGame() {
  resetGame();
  initGame();
}

const PLACEHOLDER_NAMES = {
  AI_HUMAN: "Player",
  COMPUTER: "Computer",
  TWO_PLAYER_X: "Player X",
  TWO_PLAYER_O: "Player O",
};

function isPlaceholderName(name) {
  return (
    !name ||
    name === PLACEHOLDER_NAMES.AI_HUMAN ||
    name === PLACEHOLDER_NAMES.COMPUTER ||
    name === PLACEHOLDER_NAMES.TWO_PLAYER_X ||
    name === PLACEHOLDER_NAMES.TWO_PLAYER_O
  );
}

function adaptPlayerNamesToMode(isAi) {
  if (isAi) {
    gameState.playerNameX = isPlaceholderName(gameState.playerNameX)
      ? PLACEHOLDER_NAMES.AI_HUMAN
      : gameState.playerNameX;
    gameState.playerNameO = PLACEHOLDER_NAMES.COMPUTER;
    return;
  }

  gameState.playerNameX = isPlaceholderName(gameState.playerNameX)
    ? PLACEHOLDER_NAMES.TWO_PLAYER_X
    : gameState.playerNameX;

  const stored = getPlayerNames();
  gameState.playerNameO = isPlaceholderName(stored.O)
    ? PLACEHOLDER_NAMES.TWO_PLAYER_O
    : stored.O;
}

function handleModeSwitch(requestedMode) {
  const isAi = requestedMode === GAME_MODES.AI;
  const isTwoPlayer = requestedMode === GAME_MODES.TWO_PLAYER;
  if (!isAi && !isTwoPlayer) {
    syncModeControl(elements, gameState);
    return;
  }
  if (requestedMode === gameState.gameMode) return;
  sounds.click();
  gameState.setGameMode(requestedMode);

  if (isAi) {
    gameState.setDifficulty(gameState.aiDifficulty || loadDifficultyPreference());
  }

  adaptPlayerNamesToMode(isAi);
  beginNewGame();
}

function updateLiveScore() {
  const s = statisticsManager.getSessionStats();
  const score = elements.liveSessionScore;
  score.textContent = "";

  const chips = [
    ["W", s.sessionWins],
    ["L", s.sessionLosses],
    ["D", s.sessionDraws],
  ];

  for (const [label, value] of chips) {
    const chip = document.createElement("span");
    chip.className = "sc";
    chip.append(`${label} `);
    const strong = document.createElement("b");
    strong.textContent = String(value);
    chip.append(strong);
    score.append(chip);
  }
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
  const list = elements.gameHistoryList;
  list.textContent = "";

  if (history.length === 0) {
    const li = document.createElement("li");
    li.className = "history-item empty";
    li.textContent = "No games played yet";
    list.append(li);
    return;
  }

  for (const game of history) {
    const li = document.createElement("li");
    li.className = "history-item";

    const result = document.createElement("span");
    result.className = "history-result";
    result.textContent = game.winner;

    const time = document.createElement("span");
    time.className = "history-time";
    time.textContent = `${game.date} ${game.time}`;

    const players = document.createElement("span");
    players.className = "history-players";
    players.textContent = game.players;

    li.append(result, time, players);
    list.append(li);
  }
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
    elements.playerXNameInput.value = names.X === "Player X" ? "" : names.X;
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

  const startAIGame = (difficulty) => {
    sounds.click();
    gameState.setDifficulty(difficulty);
    saveDifficultyPreference(difficulty);
    preparePlayerModalForAI(elements);
    const names = getPlayerNames();
    elements.playerXNameInput.value = names.X === "Player X" ? "" : names.X;
    previousScreen = elements.difficultySelectionScreen;
    showPlayerModal(elements);
  };

  elements.easyModeBtn.addEventListener("click", () => startAIGame("easy"));
  elements.mediumModeBtn.addEventListener("click", () =>
    startAIGame("medium")
  );
  elements.hardModeBtn.addEventListener("click", () => startAIGame("hard"));

  elements.backToModeBtn.addEventListener("click", () => {
    sounds.click();
    switchScreen(
      elements.difficultySelectionScreen,
      elements.modeSelectionScreen
    );
  });

  elements.startGameBtn.addEventListener("click", () => {
    sounds.click();
    const rawX = elements.playerXNameInput.value;
    const rawO = elements.playerONameInput.value;
    if (gameState.gameMode === GAME_MODES.AI) {
      gameState.playerNameX = sanitizePlayerName(rawX) || "Player";
      gameState.playerNameO = "Computer";
      savePlayerNames(gameState.playerNameX, "Computer");
    } else {
      gameState.playerNameX = sanitizePlayerName(rawX) || "Player X";
      gameState.playerNameO = sanitizePlayerName(rawO) || "Player O";
      savePlayerNames(gameState.playerNameX, gameState.playerNameO);
    }
    hidePlayerModal(elements);
    switchScreen(previousScreen, elements.gameScreen);
    beginNewGame();
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
    beginNewGame();
  });

  elements.playAgainBtn.addEventListener("click", () => {
    sounds.click();
    beginNewGame();
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
    alert(success ? MESSAGES.HISTORY_EXPORTED : MESSAGES.EXPORT_ERROR);
  });
  
  elements.modeSwitcher.addEventListener("change", (event) => {
    handleModeSwitch(event.target.value);
  });

  elements.soundToggle.addEventListener("click", () => {
    gameState.toggleSound();
    saveSoundPreference(gameState.soundEnabled);
    syncSoundButtonUI(elements.soundToggle, gameState.soundEnabled);
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
    syncSoundButtonUI(elements.soundToggle, savedSoundPref);

    const savedDifficulty = loadDifficultyPreference();
    if (savedDifficulty) {
      gameState.setDifficulty(savedDifficulty);
    }
  } catch (error) {
    console.error("Failed to initialize game:", error);
    alert("Failed to load the game. Please refresh the page.");
  }
});
