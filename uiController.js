// UI Controller Module: Handles all UI updates and DOM manipulations

import { CSS_CLASSES, MESSAGES } from "./config.js";
import { gameState } from "./gameState.js";

export function updateCurrentPlayerDisplay(elements) {
  elements.currentPlayerDisplay.textContent = gameState.currentPlayer;
}
export function updateCellUI(cell, index) {
  cell.textContent = gameState.currentPlayer;
  cell.dataset.player = gameState.currentPlayer;
  cell.classList.add(CSS_CLASSES.TAKEN);
}
export function highlightWinningCells(combination, cells) {
  combination.forEach((index) => {
    cells[index].classList.add(CSS_CLASSES.WINNER);
  });
}
export function displayStatus(elements, message) {
  elements.gameStatus.textContent = message;
}
export function showPlayAgainButton(elements) {
  elements.playAgainBtn.classList.remove(CSS_CLASSES.HIDDEN);
}
export function hidePlayAgainButton(elements) {
  elements.playAgainBtn.classList.add(CSS_CLASSES.HIDDEN);
}
export function switchScreen(hideScreen, showScreen) {
  hideScreen.classList.remove(CSS_CLASSES.ACTIVE);
  showScreen.classList.add(CSS_CLASSES.ACTIVE);
}
export function resetCellsUI(cells) {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove(CSS_CLASSES.TAKEN, CSS_CLASSES.WINNER);
    delete cell.dataset.player;
  });
}
export function clearStatus(elements) {
  elements.gameStatus.textContent = "";
}
export function displayWinResult(result, elements) {
  highlightWinningCells(result.combination, elements.cells);
  displayStatus(elements, MESSAGES.WIN(result.player));
}
export function displayDrawResult(elements) {
  displayStatus(elements, MESSAGES.DRAW);
}
export function toggleSoundButtonUI(soundToggle) {
  soundToggle.classList.toggle(CSS_CLASSES.MUTED);
}
