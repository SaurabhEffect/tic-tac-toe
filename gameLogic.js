// Contains core game logic including win detection and game flow

import { WINNING_COMBINATIONS, RESULT_TYPES } from "./config.js";
import { gameState } from "./gameState.js";

export function checkGameResult() {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      gameState.board[a] &&
      gameState.board[a] === gameState.board[b] &&
      gameState.board[a] === gameState.board[c]
    ) {
      return {
        type: RESULT_TYPES.WIN,
        player: gameState.board[a],
        combination: combination,
      };
    }
  }
  if (gameState.isBoardFull()) {
    return { type: RESULT_TYPES.DRAW };
  }
  return null;
}

export function isValidMove(index) {
  return gameState.isCellEmpty(index) && gameState.isGameActive;
}
