// Implements AI decision-making logic

import { gameState } from "./gameState.js";
import { WINNING_COMBINATIONS, GAME_CONFIG } from "./config.js";

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

function findWinningMove(player) {
  const board = gameState.board;
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && gameState.isCellEmpty(c))
      return c;
    if (board[a] === player && board[c] === player && gameState.isCellEmpty(b))
      return b;
    if (board[b] === player && board[c] === player && gameState.isCellEmpty(a))
      return a;
  }
  return null;
}

function getMediumAIMove() {
  const { X, O } = GAME_CONFIG.PLAYERS;
  const aiWinMove = findWinningMove(O);
  if (aiWinMove !== null) return aiWinMove;
  const playerWinMove = findWinningMove(X);
  if (playerWinMove !== null) return playerWinMove;
  if (gameState.isCellEmpty(4)) return 4;
  const corners = [0, 2, 6, 8];
  const emptyCorners = corners.filter((idx) => gameState.isCellEmpty(idx));
  if (emptyCorners.length > 0) {
    const randomCornerIndex = Math.floor(Math.random() * emptyCorners.length);
    return emptyCorners[randomCornerIndex];
  }
  const edges = [1, 3, 5, 7];
  const emptyEdges = edges.filter((idx) => gameState.isCellEmpty(idx));
  if (emptyEdges.length > 0) {
    const randomEdgeIndex = Math.floor(Math.random() * emptyEdges.length);
    return emptyEdges[randomEdgeIndex];
  }
  return getEasyAIMove();
}

export function getAIMove(difficulty) {
  switch (difficulty) {
    case "medium":
      return getMediumAIMove();
    case "easy":
      return getEasyAIMove();
    default:
      return getEasyAIMove();
  }
}
