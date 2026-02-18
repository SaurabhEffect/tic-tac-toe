// Implements AI decision-making logic

import { gameState } from "./gameState.js";
import { WINNING_COMBINATIONS, GAME_CONFIG } from "./config.js";

function getEmptyCells(board) {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}

function checkWinner(board, player) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

function findWinningMove(board, player) {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === "") return c;
    if (board[a] === player && board[c] === player && board[b] === "") return b;
    if (board[b] === player && board[c] === player && board[a] === "") return a;
  }
  return null;
}

function getEasyAIMove() {
  const emptyCells = getEmptyCells(gameState.board);
  if (emptyCells.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

function getMediumAIMove() {
  const { X, O } = GAME_CONFIG.PLAYERS;
  const board = gameState.board;

  const aiWinMove = findWinningMove(board, O);
  if (aiWinMove !== null) return aiWinMove;

  const playerWinMove = findWinningMove(board, X);
  if (playerWinMove !== null) return playerWinMove;

  if (board[4] === "") return 4;

  const corners = [0, 2, 6, 8];
  const emptyCorners = corners.filter((idx) => board[idx] === "");
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  }

  const edges = [1, 3, 5, 7];
  const emptyEdges = edges.filter((idx) => board[idx] === "");
  if (emptyEdges.length > 0) {
    return emptyEdges[Math.floor(Math.random() * emptyEdges.length)];
  }

  return getEasyAIMove();
}

const AI_PLAYER = GAME_CONFIG.PLAYERS.O;
const HUMAN_PLAYER = GAME_CONFIG.PLAYERS.X;

function minimax(board, depth, isMaximizing, alpha, beta) {
  if (checkWinner(board, HUMAN_PLAYER)) {
    return -10 + depth;
  }

  if (checkWinner(board, AI_PLAYER)) {
    return 10 - depth;
  }

  if (getEmptyCells(board).length === 0) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    const moves = getEmptyCells(board);
    for (const move of moves) {
      board[move] = AI_PLAYER;
      let score = minimax(board, depth + 1, false, alpha, beta);
      board[move] = "";
      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    const moves = getEmptyCells(board);
    for (const move of moves) {
      board[move] = HUMAN_PLAYER;
      let score = minimax(board, depth + 1, true, alpha, beta);
      board[move] = "";
      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break;
    }
    return bestScore;
  }
}

function getHardAIMove() {
  let bestScore = -Infinity;
  let bestMove = null;
  const board = [...gameState.board];
  const moves = getEmptyCells(board);

  if (moves.length === 9) {
    return 4;
  }

  for (const move of moves) {
    board[move] = AI_PLAYER;
    let score = minimax(board, 0, false, -Infinity, Infinity);
    board[move] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

export function getAIMove(difficulty) {
  switch (difficulty) {
    case "hard":
      return getHardAIMove();
    case "medium":
      return getMediumAIMove();
    case "easy":
      return getEasyAIMove();
    default:
      return getEasyAIMove();
  }
}
