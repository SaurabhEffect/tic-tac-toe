// Game History Manager Module - Handles game history logging and export

import { sanitizePlayerName } from "./playerManager.js";

const HISTORY_STORAGE_KEY = "tictactoe_gameHistory";
const MAX_HISTORY_ENTRIES = 10;

// Generic short-string coercion for values loaded from untrusted storage.
function safeText(value, maxLen = 40) {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value) {
    const code = ch.codePointAt(0);
    if (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) continue;
    out += ch;
  }
  return out.slice(0, maxLen);
}

function safeBoard(board) {
  if (!Array.isArray(board) || board.length !== 9) return null;
  return board.map((cell) => (cell === "X" || cell === "O" ? cell : ""));
}

// Rebuild a single history entry from untrusted storage: whitelist fields,
// enforce types, sanitize the player-controlled strings.
function sanitizeHistoryEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  const result = entry.result === "draw" ? "draw" : "win";
  const winner = entry.winner === "X" || entry.winner === "O" ? entry.winner : null;
  const id = Number.isFinite(Number(entry.id)) ? Number(entry.id) : 0;
  return {
    id,
    timestamp: safeText(entry.timestamp, 40),
    result,
    winner,
    winnerName: sanitizePlayerName(entry.winnerName) || "Draw",
    playerX: sanitizePlayerName(entry.playerX) || "Player X",
    playerO: sanitizePlayerName(entry.playerO) || "Player O",
    board: safeBoard(entry.board),
    date: safeText(entry.date, 40),
    time: safeText(entry.time, 40),
  };
}

export class GameHistoryManager {
  constructor() {
    this.history = this.loadHistory();
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .slice(0, MAX_HISTORY_ENTRIES)
        .map(sanitizeHistoryEntry)
        .filter(Boolean);
    } catch {
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(this.history));
    } catch (e) {
      console.warn("Failed to save game history:", e);
    }
  }

  addGameToHistory(
    result,
    winner,
    playerXName,
    playerOName,
    finalBoard = null
  ) {
    const safeX = sanitizePlayerName(playerXName) || "Player X";
    const safeO = sanitizePlayerName(playerOName) || "Player O";
    const gameEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      result: result === "draw" ? "draw" : "win",
      winner: winner === "X" || winner === "O" ? winner : null,
      winnerName: this.getWinnerDisplayName(winner, safeX, safeO),
      playerX: safeX,
      playerO: safeO,
      board: safeBoard(finalBoard),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    this.history.unshift(gameEntry);

    if (this.history.length > MAX_HISTORY_ENTRIES) {
      this.history = this.history.slice(0, MAX_HISTORY_ENTRIES);
    }

    this.saveHistory();
    return gameEntry;
  }

  getWinnerDisplayName(winner, playerXName, playerOName) {
    if (!winner) return "Draw";
    return winner === "X" ? playerXName : playerOName;
  }

  getHistory() {
    return [...this.history];
  }

  getRecentGames(count = 5) {
    return this.history.slice(0, count);
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
  }

  exportHistoryAsJSON() {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalGames: this.history.length,
      games: this.history.map((game) => ({
        gameId: game.id,
        date: game.date,
        time: game.time,
        result: game.result,
        winner: game.winnerName,
        playerX: game.playerX,
        playerO: game.playerO,
      })),
    };

    return JSON.stringify(exportData, null, 2);
  }

  downloadHistoryAsJSON() {
    try {
      const jsonData = this.exportHistoryAsJSON();
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `tictactoe-history-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error("Failed to export game history:", error);
      return false;
    }
  }

  getHistoryStats() {
    if (this.history.length === 0) {
      return {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winRate: 0,
      };
    }

    const stats = this.history.reduce(
      (acc, game) => {
        if (game.result === "draw") {
          acc.draws++;
        } else if (game.winner === "X") {
          acc.wins++;
        } else {
          acc.losses++;
        }
        return acc;
      },
      { wins: 0, losses: 0, draws: 0 }
    );

    return {
      totalGames: this.history.length,
      ...stats,
      winRate:
        stats.wins > 0
          ? Math.round((stats.wins / this.history.length) * 100)
          : 0,
    };
  }

  getFormattedHistory() {
    return this.history.map((game) => ({
      id: game.id,
      displayText: `${game.winnerName} - ${game.date} ${game.time}`,
      winner: game.winnerName,
      date: game.date,
      time: game.time,
      result: game.result,
      players: `${game.playerX} vs ${game.playerO}`,
    }));
  }
}

export const gameHistoryManager = new GameHistoryManager();
