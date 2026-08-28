# Tic Tac Toe - v3.3

A feature-rich implementation of the classic Tic Tac Toe game with **Hard AI (Minimax Algorithm)**, **difficulty levels**, **alpha-beta pruning optimization**, comprehensive statistics tracking, and complete game history management. Built with modular vanilla JavaScript architecture, professional state management, and production-ready user experience.

![HTML5](https://img.shields.io/badge/Built%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Version](https://img.shields.io/badge/Version-3.3-brightgreen)
![Architecture](https://img.shields.io/badge/Architecture-Modular-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)
![Feature](https://img.shields.io/badge/Feature-Hard_AI_Unbeatable-red)
![Feature](https://img.shields.io/badge/Feature-Minimax_Algorithm-orange)
![Feature](https://img.shields.io/badge/Feature-Difficulty_Levels-yellow)
![Feature](https://img.shields.io/badge/Feature-Web_Audio_API-purple)
![Feature](https://img.shields.io/badge/Feature-LocalStorage_API-purple)

---


## Installation

1. **Download or clone** the repository
2. **File Structure**:
   ```
   tic-tac-toe/
   ├── index.html              # Main HTML file
   ├── style.css               # Styling and animations
   ├── script.js               # Main application controller
   ├── config.js               # Game constants and configuration
   ├── gameState.js            # Game state management
   ├── gameLogic.js            # Core game logic (win detection)
   ├── domElements.js          # DOM element references
   ├── soundManager.js         # Audio management
   ├── uiController.js         # UI updates and rendering
   ├── storage.js              # LocalStorage operations
   ├── playerManager.js        # Player name management
   ├── statisticsManager.js    # Statistics tracking
   ├── gameHistoryManager.js   # Game history management
   ├── aiLogic.js              # AI decision making (ENHANCED in v3.2)
   └── README.md               # Documentation
   ```
3. **Run the Game**:
   - Open `index.html` in any modern web browser
   - **Note**: Due to ES6 modules, use a local server
   - **Recommended**: Use Live Server extension or Python HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit: `http://localhost:8000`

---

### AI Logic Flow

```
Player Makes Move
    ↓
Game Checks Win/Draw
    ↓
If AI Mode:
    ├── Get Empty Cells
    ├── Based on Difficulty:
    │   ├── Easy: Random Selection
    │   ├── Medium: Win/Block Logic
    │   └── Hard: Minimax Evaluation
    ├── Optional Delay (500ms-1000ms)
    └── AI Move Executed
    ↓
Game Checks Result
    ↓
Display Result & Update Stats
```

### Minimax Algorithm Explained

**Purpose**: Find the mathematically perfect move

**How it works**:

1. **Tree Exploration** - Simulates all possible future moves
2. **Score Assignment**:
   - AI win = +10
   - Player win = -10
   - Draw = 0
3. **Depth Consideration** - Prefers faster wins/slower losses
4. **Backward Analysis** - Works backwards from game end
5. **Optimal Selection** - Chooses move with best guaranteed score

**Why it's unbeatable**: Explores every possible game variation and always chooses the path that guarantees either a win or a draw.

### Alpha-Beta Pruning Explained

**Purpose**: Make minimax fast enough for real-time play

**How it works**:

1. **Early Termination** - Stops evaluating obviously bad branches
2. **Best/Worst Case Bounds** - Tracks alpha (best for max) and beta (best for min)
3. **Branch Elimination** - If current branch can't improve bounds, skip it

**Performance Impact**:

- Without pruning: ~100,000+ states evaluated
- With pruning: ~2,000-5,000 states evaluated
- Result: 50x+ faster, same optimal move

**Example**: If AI finds move guaranteeing draw (0) and discovers another move would lose (-10), it stops evaluating the losing move's branches.

### Future AI Enhancements

- Memoization - Cache evaluated positions
- Adaptive depth limiting - Balance speed vs accuracy
- Machine learning - Learn from games
- Network multiplayer - Play online

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code structure
4. Add appropriate documentation
5. Test thoroughly
6. Submit a pull request

---

## License

**Personal Project - Free to Use**

- ✅ Personal use
- ✅ Educational purposes
- ✅ Modification allowed
- ❌ Commercial redistribution
- ❌ Remove attribution

---

**Made with ❤️ by Saurabh Chauhan for strategic gaming with unbeatable Hard AI and comprehensive difficulty selection!**

_Built with vanilla JavaScript - No frameworks, no dependencies, just clean code with perfect minimax AI and persistent preferences._
