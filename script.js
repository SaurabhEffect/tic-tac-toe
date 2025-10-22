const gameState = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  isGameActive: false,
  soundEnabled: true,
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startBtn = document.getElementById("startBtn");
const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll(".cell");
const currentPlayerDisplay = document.getElementById("currentPlayerDisplay");
const gameStatus = document.getElementById("gameStatus");
const playAgainBtn = document.getElementById("playAgainBtn");
const soundToggle = document.getElementById("soundToggle");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = "sine") {
  if (!gameState.soundEnabled) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

const sounds = {
  move: () => playSound(600, 0.08, "sine"),
  win: () => {
    playSound(523, 0.12, "sine");
    setTimeout(() => playSound(659, 0.12, "sine"), 120);
    setTimeout(() => playSound(784, 0.25, "sine"), 240);
  },
  draw: () => playSound(400, 0.2, "triangle"),
  click: () => playSound(500, 0.04, "sine"),
};

startBtn.addEventListener("click", () => {
  sounds.click();
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");
  initGame();
});

soundToggle.addEventListener("click", () => {
  gameState.soundEnabled = !gameState.soundEnabled;
  soundToggle.classList.toggle("muted");
  sounds.click();
});

playAgainBtn.addEventListener("click", () => {
  sounds.click();
  resetGame();
});

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function initGame() {
  gameState.isGameActive = true;
  gameState.currentPlayer = "X";
  updateCurrentPlayerDisplay();
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);

  if (gameState.board[index] !== "" || !gameState.isGameActive) {
    return;
  }
  makeMove(cell, index);
  const result = checkGameResult();
  if (result) {
    handleGameEnd(result);
  } else {
    switchPlayer();
  }
}

function makeMove(cell, index) {
  gameState.board[index] = gameState.currentPlayer;
  cell.textContent = gameState.currentPlayer;
  cell.dataset.player = gameState.currentPlayer;
  cell.classList.add("taken");
  sounds.move();
}

function switchPlayer() {
  gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
  updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
  currentPlayerDisplay.textContent = gameState.currentPlayer;
}

function checkGameResult() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameState.board[a] &&
      gameState.board[a] === gameState.board[b] &&
      gameState.board[a] === gameState.board[c]
    ) {
      return {
        type: "win",
        player: gameState.board[a],
        combination: combination,
      };
    }
  }

  if (gameState.board.every((cell) => cell !== "")) {
    return { type: "draw" };
  }
  return null;
}

function handleGameEnd(result) {
  gameState.isGameActive = false;

  if (result.type === "win") {
    result.combination.forEach((index) => {
      cells[index].classList.add("winner");
    });
    gameStatus.textContent = `Player ${result.player} Wins!`;
    sounds.win();
  } else {
    gameStatus.textContent = "It's a Draw!";
    sounds.draw();
  }
  playAgainBtn.classList.remove("hidden");
}

function resetGame() {
  gameState.board = ["", "", "", "", "", "", "", "", ""];
  gameState.currentPlayer = "X";
  gameState.isGameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "winner");
    delete cell.dataset.player;
  });

  gameStatus.textContent = "";
  playAgainBtn.classList.add("hidden");
  updateCurrentPlayerDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Luxury Tic Tac Toe loaded successfully!");
});
