// Statistics Manager Module - Handles score tracking and statistics

const STATS_STORAGE_KEY = "tictactoe_statistics";
const SESSION_STORAGE_KEY = "tictactoe_sessionStats";

const DEFAULT_STATS = {
  totalWins: 0,
  totalLosses: 0,
  totalDraws: 0,
  currentStreak: 0,
  bestStreak: 0,
  gamesPlayed: 0,
  lastWinner: null,
};

const DEFAULT_SESSION_STATS = {
  sessionWins: 0,
  sessionLosses: 0,
  sessionDraws: 0,
  sessionGames: 0,
};

export class StatisticsManager {
  constructor() {
    this.allTimeStats = this.loadAllTimeStats();
    this.sessionStats = this.loadSessionStats();
  }

  loadAllTimeStats() {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    return saved
      ? { ...DEFAULT_STATS, ...JSON.parse(saved) }
      : { ...DEFAULT_STATS };
  }

  loadSessionStats() {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return saved
      ? { ...DEFAULT_SESSION_STATS, ...JSON.parse(saved) }
      : { ...DEFAULT_SESSION_STATS };
  }

  saveAllTimeStats() {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(this.allTimeStats));
  }

  saveSessionStats() {
    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify(this.sessionStats)
    );
  }

  recordGameResult(result, winner, playerX, playerO) {
    this.sessionStats.sessionGames++;
    this.allTimeStats.gamesPlayed++;

    if (result === "win") {
      const currentPlayerWon = winner === "X";
      if (currentPlayerWon) {
        this.sessionStats.sessionWins++;
        this.allTimeStats.totalWins++;
        this.allTimeStats.currentStreak++;
        if (this.allTimeStats.currentStreak > this.allTimeStats.bestStreak) {
          this.allTimeStats.bestStreak = this.allTimeStats.currentStreak;
        }
      } else {
        this.sessionStats.sessionLosses++;
        this.allTimeStats.totalLosses++;
        this.allTimeStats.currentStreak = 0;
      }

      this.allTimeStats.lastWinner = winner;
    } else if (result === "draw") {
      this.sessionStats.sessionDraws++;
      this.allTimeStats.totalDraws++;
      this.allTimeStats.currentStreak = 0;
      this.allTimeStats.lastWinner = null;
    }

    this.saveAllTimeStats();
    this.saveSessionStats();
  }

  getSessionStats() {
    return { ...this.sessionStats };
  }

  getAllTimeStats() {
    return { ...this.allTimeStats };
  }

  getWinPercentage() {
    if (this.allTimeStats.gamesPlayed === 0) return 0;
    return Math.round(
      (this.allTimeStats.totalWins / this.allTimeStats.gamesPlayed) * 100
    );
  }

  resetSessionStats() {
    this.sessionStats = { ...DEFAULT_SESSION_STATS };
    this.saveSessionStats();
  }

  resetAllStats() {
    this.allTimeStats = { ...DEFAULT_STATS };
    this.sessionStats = { ...DEFAULT_SESSION_STATS };
    this.saveAllTimeStats();
    this.saveSessionStats();
  }

  getFormattedStats() {
    return {
      session: {
        wins: this.sessionStats.sessionWins,
        losses: this.sessionStats.sessionLosses,
        draws: this.sessionStats.sessionDraws,
        total: this.sessionStats.sessionGames,
      },
      allTime: {
        wins: this.allTimeStats.totalWins,
        losses: this.allTimeStats.totalLosses,
        draws: this.allTimeStats.totalDraws,
        total: this.allTimeStats.gamesPlayed,
        winPercentage: this.getWinPercentage(),
        currentStreak: this.allTimeStats.currentStreak,
        bestStreak: this.allTimeStats.bestStreak,
      },
    };
  }
}

export const statisticsManager = new StatisticsManager();
