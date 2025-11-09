// Game History Manager Module - Handles game history logging and export

const HISTORY_STORAGE_KEY = "tictactoe_gameHistory";
const MAX_HISTORY_ENTRIES = 10;

export class GameHistoryManager {
  constructor() {
    this.history = this.loadHistory();
  }

  loadHistory() {
    const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  saveHistory() {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(this.history));
  }

  addGameToHistory(
    result,
    winner,
    playerXName,
    playerOName,
    finalBoard = null
  ) {
    const gameEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      result: result,
      winner: winner,
      winnerName: this.getWinnerDisplayName(winner, playerXName, playerOName),
      playerX: playerXName,
      playerO: playerOName,
      board: finalBoard,
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
