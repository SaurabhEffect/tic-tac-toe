// Implements AI decision-making logic

import { gameState } from "./gameState.js";

function getEmptyCells() {
  const emptyCells = [];
  for (let i = 0; i < gameState.board.length; i++) {
    if (gameState.isCellEmpty(i)) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}

function getEasyAIMove() {
  const emptyCells = getEmptyCells();
  if (emptyCells.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

export function getAIMove(difficulty) {
  switch (difficulty) {
    case "easy":
      return getEasyAIMove();
    default:
      return getEasyAIMove();
  }
}
