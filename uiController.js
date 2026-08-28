// UI Controller Module: Handles all UI updates and DOM manipulations

import { CSS_CLASSES, MESSAGES, GAME_MODES } from "./config.js";
import { gameState } from "./gameState.js";

const CELL_POSITIONS = [
  "Row 1, column 1",
  "Row 1, column 2",
  "Row 1, column 3",
  "Row 2, column 1",
  "Row 2, column 2",
  "Row 2, column 3",
  "Row 3, column 1",
  "Row 3, column 2",
  "Row 3, column 3",
];

function cellPosition(index) {
  return CELL_POSITIONS[index] || `Cell ${index + 1}`;
}

export function updateCurrentPlayerDisplay(elements) {
  elements.currentPlayerDisplay.textContent = gameState.currentPlayer;
}

export function updateCellUI(cell, index) {
  const player = gameState.currentPlayer;
  cell.textContent = player;
  cell.dataset.player = player;
  cell.classList.add(CSS_CLASSES.TAKEN);
  cell.disabled = true;
  cell.setAttribute("aria-label", `${cellPosition(index)}, ${player}`);
}

export function highlightWinningCells(combination, cells) {
  combination.forEach((index) => {
    cells[index].classList.add(CSS_CLASSES.WINNER);
  });
}

export function displayStatus(elements, message) {
  elements.gameStatus.textContent = message;
}

export function showEndGameButtons(elements) {
  elements.endGameButtons.classList.remove(CSS_CLASSES.HIDDEN);
}

export function hideEndGameButtons(elements) {
  elements.endGameButtons.classList.add(CSS_CLASSES.HIDDEN);
}

export function switchScreen(hideScreen, showScreen) {
  hideScreen.classList.remove(CSS_CLASSES.ACTIVE);
  showScreen.classList.add(CSS_CLASSES.ACTIVE);
}

export function resetCellsUI(cells) {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.classList.remove(CSS_CLASSES.TAKEN, CSS_CLASSES.WINNER);
    delete cell.dataset.player;
    cell.disabled = false;
    cell.setAttribute("aria-label", `${cellPosition(index)}, empty`);
  });
}

export function disableAllCells(cells) {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

export function clearStatus(elements) {
  elements.gameStatus.textContent = "";
  elements.gameStatus.classList.remove("result");
}

export function displayWinResult(result, elements) {
  highlightWinningCells(result.combination, elements.cells);
  displayStatus(elements, MESSAGES.WIN(result.player));
}

export function displayDrawResult(elements) {
  displayStatus(elements, MESSAGES.DRAW);
}

export function syncSoundButtonUI(soundToggle, enabled) {
  soundToggle.classList.toggle(CSS_CLASSES.MUTED, !enabled);
  soundToggle.setAttribute("aria-pressed", String(Boolean(enabled)));
  soundToggle.setAttribute(
    "aria-label",
    enabled ? "Turn sound off" : "Turn sound on"
  );
}

export function syncModeControl(elements, state) {
  const isAi = state.gameMode === GAME_MODES.AI;
  elements.modeSwitcher.value = isAi
    ? GAME_MODES.AI
    : GAME_MODES.TWO_PLAYER;
  const tag = elements.difficultyTag;
  tag.textContent = "";

  if (!isAi || !state.aiDifficulty) {
    tag.classList.add(CSS_CLASSES.HIDDEN);
    return;
  }

  const label =
    state.aiDifficulty.charAt(0).toUpperCase() + state.aiDifficulty.slice(1);
  const prefix = document.createElement("span");
  prefix.className = "sr-only";
  prefix.textContent = "Computer difficulty: ";
  const value = document.createElement("span");
  value.textContent = label;
  tag.append(prefix, value);
  tag.classList.remove(CSS_CLASSES.HIDDEN);
}

export function updateCurrentPlayerDisplayWithName(elements, state) {
  const displayName =
    state.currentPlayer === "X" ? state.playerNameX : state.playerNameO;
  elements.currentPlayerDisplay.textContent = displayName;
}

export function showPlayerModal(elements) {
  elements.playerModal.classList.remove("hidden");
  elements.playerModal.classList.add("active");
}

export function hidePlayerModal(elements) {
  elements.playerModal.classList.remove("active");
  elements.playerModal.classList.add("hidden");
}

export function clearPlayerNameInputs(elements) {
  elements.playerXNameInput.value = "";
  elements.playerONameInput.value = "";
}

export function setPlayerNameInputs(elements, names) {
  elements.playerXNameInput.value = names.X;
  elements.playerONameInput.value = names.O;
}

export function preparePlayerModalForAI(elements) {
  elements.playerXNameInput.placeholder = "Enter Your Name";
  elements.playerONameInput.value = "Computer";
  elements.playerONameInput.disabled = true;
}

export function preparePlayerModalForTwoPlayer(elements) {
  elements.playerXNameInput.placeholder = "Player X";
  elements.playerONameInput.value = "";
  elements.playerONameInput.disabled = false;
}
