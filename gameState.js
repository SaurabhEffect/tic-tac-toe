// Manages the current state of the game

import { GAME_CONFIG, GAME_MODES, AI_CONFIG } from "./config.js";

class GameState {
  constructor() {
    this.board = Array(GAME_CONFIG.BOARD_SIZE).fill("");
    this.currentPlayer = GAME_CONFIG.INITIAL_PLAYER;
    this.isGameActive = false;
    this.soundEnabled = true;
    this.playerNameX = "Player X";
    this.playerNameO = "Player O";
    this.gameMode = null;
    this.aiDifficulty = null;
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

  setGameMode(mode) {
    this.gameMode = mode;
    if (mode === GAME_MODES.AI) {
      this.aiDifficulty = AI_CONFIG.DIFFICULTY;
    } else {
      this.aiDifficulty = null;
    }
  }

  isAiTurn() {
    return (
      this.gameMode === GAME_MODES.AI &&
      this.currentPlayer === GAME_CONFIG.PLAYERS.O &&
      this.isGameActive
    );
  }

  reset() {
    this.resetBoard();
    this.currentPlayer = GAME_CONFIG.INITIAL_PLAYER;
    this.isGameActive = true;
  }

  saveToStorage() {
    const stateToSave = {
      board: this.board,
      currentPlayer: this.currentPlayer,
      isGameActive: this.isGameActive,
      soundEnabled: this.soundEnabled,
      gameMode: this.gameMode,
      aiDifficulty: this.aiDifficulty,
    };
    localStorage.setItem("tictactoe_gameState", JSON.stringify(stateToSave));
  }

  loadFromStorage() {
    const saved = localStorage.getItem("tictactoe_gameState");
    if (saved) {
      const state = JSON.parse(saved);
      this.board = state.board;
      this.currentPlayer = state.currentPlayer;
      this.isGameActive = state.isGameActive;
      this.soundEnabled = state.soundEnabled;
      this.gameMode = state.gameMode || null;
      this.aiDifficulty = state.aiDifficulty || null;
      return true;
    }
    return false;
  }

  hasSavedState() {
    return localStorage.getItem("tictactoe_gameState") !== null;
  }

  clearSavedState() {
    localStorage.removeItem("tictactoe_gameState");
  }
}
export const gameState = new GameState();
