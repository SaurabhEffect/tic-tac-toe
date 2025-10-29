// Manages the current state of the game

import { GAME_CONFIG } from "./config.js";

class GameState {
  constructor() {
    this.board = Array(GAME_CONFIG.BOARD_SIZE).fill("");
    this.currentPlayer = GAME_CONFIG.INITIAL_PLAYER;
    this.isGameActive = false;
    this.soundEnabled = true;
  }

  resetBoard() {
    this.board = Array(GAME_CONFIG.BOARD_SIZE).fill("");
  }

  makeMove(index) {
    if (this.board[index] !== "" || !this.isGameActive) {
      return false;
    }
    this.board[index] = this.currentPlayer;
    return true;
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === GAME_CONFIG.PLAYERS.X
        ? GAME_CONFIG.PLAYERS.O
        : GAME_CONFIG.PLAYERS.X;
  }

  isCellEmpty(index) {
    return this.board[index] === "";
  }

  isBoardFull() {
    return this.board.every((cell) => cell !== "");
  }

  startGame() {
    this.isGameActive = true;
    this.currentPlayer = GAME_CONFIG.INITIAL_PLAYER;
  }

  endGame() {
    this.isGameActive = false;
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
  }

  reset() {
    this.resetBoard();
    this.currentPlayer = GAME_CONFIG.INITIAL_PLAYER;
    this.isGameActive = true;
  }
}
export const gameState = new GameState();
