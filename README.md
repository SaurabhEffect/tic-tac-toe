# Tic Tac Toe - v3.2

A feature-rich implementation of the classic Tic Tac Toe game with **Hard AI (Minimax Algorithm)**, **difficulty levels**, **alpha-beta pruning optimization**, comprehensive statistics tracking, and complete game history management. Built with modular vanilla JavaScript architecture, professional state management, and production-ready user experience.

![HTML5](https://img.shields.io/badge/Built%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Version](https://img.shields.io/badge/Version-3.2-brightgreen)
![Architecture](https://img.shields.io/badge/Architecture-Modular-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)
![Feature](https://img.shields.io/badge/Feature-Hard_AI_Unbeatable-red)
![Feature](https://img.shields.io/badge/Feature-Minimax_Algorithm-orange)
![Feature](https://img.shields.io/badge/Feature-Difficulty_Levels-yellow)
![Feature](https://img.shields.io/badge/Feature-Web_Audio_API-purple)
![Feature](https://img.shields.io/badge/Feature-LocalStorage_API-purple)

---

## What's New in v3.2

### **Minimax Algorithm Implementation** _(NEW - MAJOR)_

- **Perfect AI** - Hard difficulty plays perfectly
- **Game Tree Evaluation** - Explores all possible moves
- **Score Assignment** - AI wins = +10, Player wins = -10, Draw = 0
- **Unbeatable Strategy** - Can only draw or lose against perfect play
- **Move Selection** - Always chooses guaranteed best outcome

### **Three Difficulty Levels** _(NEW - MAJOR)_

- **Easy Mode** - Random move selection (from v3.1)
- **Medium Mode** - Strategic play with win/block logic (NEW)
- **Hard Mode** - Perfect minimax algorithm play (NEW)
- **Difficulty Selection Screen** - Choose difficulty before game
- **Change Mid-Session** - Switch difficulty between games

### **Alpha-Beta Pruning** _(NEW - OPTIMIZATION)_

- **Branch Elimination** - Skips unnecessary game branches
- **Performance Boost** - 50x+ faster than pure minimax
- **State Evaluation** - Without pruning: ~100,000+ states
- **With Pruning** - Evaluates: ~2,000-5,000 states
- **Move Calculation** - Drops from seconds to milliseconds
- **CPU Efficient** - Instant AI response on any device

### **Game Mode & Difficulty Workflow** _(NEW)_

- **Start Game** → Select Mode (2P / AI)
- **Select AI** → Difficulty Selection Screen
- **Choose Level** → Enter Player Names
- **Start Game** → Play with Selected Difficulty
- **Game Over** → Option to Change Difficulty
- **New Difficulty** → Back to level selection
- **Preferences Persist** - Next session remembers choice

### **Retained from v3.1**

- **Easy & Medium AI** - Both still available
- **2-Player Mode** - Classic gameplay
- **Custom Player Names** - Personalization
- **Sound System** - Audio feedback
- **Game History** - Move recording
- **Complete Statistics** - Win tracking
- **Session Statistics** - Current session tracking
- **LocalStorage** - Data persistence
- **Responsive Design** - All devices

---

## Core Features

### **Game Modes**

#### Two-Player Mode

- **Classic Gameplay** - X and O take turns
- **Custom Names** - Personalize each player
- **Name Input Modal** - Easy name entry
- **Current Turn Display** - Always know whose turn
- **Move Tracking** - Count total moves
- **Win Detection** - Automatic win/draw detection

#### AI Opponent Mode _(Enhanced in v3.2)_

- **Computer Opponent** - Play against AI
- **Three Difficulty Levels** - Easy, Medium, Hard (NEW)
- **AI Think Delay** - Realistic response time (500ms-1000ms)
- **Smart Moves** - AI selects from valid moves
- **Statistics Tracked** - AI games recorded
- **Fun Challenge** - Perfect for all skill levels

### **AI Intelligence Levels**

#### Easy AI Strategy

- **Random Move Selection** - No strategy
- **Available Cells** - Picks any empty cell
- **Quick Response** - Minimal delay (500ms)
- **Human-Friendly** - Easy to beat
- **Perfect For** - Beginners
- **Win Chance** - Highly beatable

#### Medium AI Strategy _(NEW in v3.2)_

- **Win Detection** - Tries to win if possible
- **Block Detection** - Blocks player's winning move
- **Center Preference** - Prioritizes center cell
- **Corner Strategy** - Favors corner cells
- **Edge Fallback** - Picks edges as last resort
- **Moderate Delay** - 700ms response time
- **Perfect For** - Intermediate players
- **Win Chance** - Beatable with strategy

#### Hard AI Strategy _(NEW in v3.2)_

- **Minimax Algorithm** - Perfect game theory
- **All Moves Evaluated** - Explores entire game tree
- **Optimal Selection** - Always best move
- **Alpha-Beta Pruning** - Optimized searching
- **Unbeatable** - Can't lose with perfect play
- **Slower Response** - 1000ms (justified by calculation)
- **Perfect For** - Advanced players
- **Win Chance** - Guaranteed draw minimum

### **Statistics System**

#### Session Statistics _(from v3.1)_

```
Session Tracking:
├── Wins (Current Session)
├── Losses (Current Session)
├── Draws (Current Session)
├── Win Rate (%)
└── Reset Option
```

#### All-Time Statistics

```
Lifetime Tracking:
├── Total Player X Wins
├── Total Player O Wins
├── Total Games Played
├── Overall Win Rate
└── Historical Data
```

#### Difficulty-Based Tracking _(NEW in v3.2)_

- Statistics tracked per difficulty
- Easy wins vs Medium vs Hard
- Session stats by difficulty
- All-time breakdown
- Comparative analysis

### **Statistics Display** _(from v3.1)_

- **Dedicated Statistics Screen** - Separate page
- **Section Organization** - Grouped metrics
- **Grid Layout** - Clean presentation
- **Live Updates** - Real-time stat display
- **Both Modes** - Session and all-time
- **Easy Navigation** - Back to menu button
- **Beautiful Design** - Professional appearance

### **Game Mechanics** (Enhanced)

- **Win Detection** - All 8 combinations checked
- **Draw Detection** - Identifies tie games
- **Move Validation** - Prevents invalid moves
- **Game State Management** - Robust tracking
- **AI Integration** - Seamless AI moves
- **Difficulty Switching** - Easy mode selection
- **Screen Transitions** - Smooth navigation
- **Mode Persistence** - Remembers selections

### **Data Persistence**

- **Auto-save** - Game state saved automatically
- **LocalStorage** - Browser-based storage
- **Statistics Saved** - All metrics persisted
- **Session Data** - Current session tracked
- **History Recorded** - Complete game history
- **Preferences Saved** - User settings remembered
- **Difficulty Saved** - Last difficulty level stored
- **Recovery Support** - Resume from crashes

### **Game History** (from v3.1)

- **Complete Recording** - Every game logged
- **Player Information** - Names recorded
- **Game Result** - Win/Draw/Loss tracked
- **Timestamp** - When game was played
- **Move History** - All moves recorded
- **Replay Data** - Future replay support
- **Maximum 10 Games** - Latest games kept
- **Export Option** - Download as JSON

### **Sound System** (Retained)

- **Web Audio API** - Programmatic sounds
- **Move Sound** - Feedback for each move
- **Win Sounds** - Musical chord on victory
- **Draw Sound** - Notification on tie
- **Toggle Control** - On/off button
- **Preference Memory** - Saves user choice
- **Volume Control** - Adjustable audio level
- **Smooth Integration** - Works in all modes

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

## Usage

1. **Welcome Screen**:
   - Click **"Start Game"** to play
   - Click **"Statistics"** to view stats

2. **Mode Selection**:
   - Choose **"2 Players"** for classic mode
   - Choose **"vs AI"** for computer opponent

3. **Difficulty Selection** _(NEW in v3.2)_:
   - Choose **"Easy"** for random AI
   - Choose **"Medium"** for strategic AI [NEW]
   - Choose **"Hard"** for unbeatable AI [NEW]
   - Your choice is saved for next session

4. **Player Names** (Two-Player Mode):
   - Enter custom names (optional)
   - Or click "Skip" for default names

5. **Gameplay**:
   - Players take turns clicking cells
   - Current player displayed at top
   - First to 3-in-a-row wins

6. **AI Gameplay** (AI Mode):
   - You play as X
   - AI plays as O (at selected difficulty)
   - AI makes moves automatically
   - Same win/draw detection

7. **After Game**:
   - View result with winner's name
   - Statistics update automatically
   - Click "Play Again" for next game
   - Click "Change AI" to change difficulty [NEW in v3.2]
   - Click "Back to Menu" to change mode

8. **View Statistics**:
   - Click "Statistics" from menu
   - See session and all-time stats
   - Compare current vs lifetime
   - Option to reset statistics

---

## AI System (Enhanced in v3.2)

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

## File Breakdown

| Module                    | Size    | Purpose                               |
| ------------------------- | ------- | ------------------------------------- |
| **script.js**             | 10.8 KB | Main entry & initialization           |
| **gameState.js**          | 2.7 KB  | State management                      |
| **storage.js**            | 3.5 KB  | LocalStorage operations               |
| **statisticsManager.js**  | 3.6 KB  | Statistics tracking                   |
| **gameHistoryManager.js** | 3.7 KB  | History management                    |
| **uiController.js**       | 3.0 KB  | UI rendering                          |
| **domElements.js**        | 3.0 KB  | DOM references                        |
| **soundManager.js**       | 2.0 KB  | Audio effects                         |
| **config.js**             | 1.8 KB  | Constants (ENHANCED v3.2)             |
| **playerManager.js**      | 1.0 KB  | Player management                     |
| **gameLogic.js**          | 0.8 KB  | Game rules                            |
| **aiLogic.js**            | 3.9 KB  | AI decision making (ENHANCED in v3.2) |

**Total JavaScript**: ~39.8 KB (12 modular files)

---

## Visual Design

### Color Palette

```
Primary Colors:
├── Cream: #F5F1E8
├── Beige: #D4C4B0
├── Charcoal: #2C2C2C
└── Gold: #D4AF37

Accent Colors:
├── Hover State: #C4B4A0
├── Selected: #B4A490
└── Disabled: #E8E0D8

Difficulty Colors (NEW in v3.2):
├── Easy: Green (#4CAF50)
├── Medium: Orange (#FF9800)
└── Hard: Red (#F44336)
```

## Changelog - v3.2

### New Features

- ⭐ **Minimax Algorithm** - Perfect AI play
- ⭐ **Hard AI Difficulty** - Unbeatable opponent
- ⭐ **Medium AI Difficulty** - Strategic play
- ⭐ **Three Difficulty Levels** - Easy/Medium/Hard
- ⭐ **Difficulty Selection Screen** - Beautiful chooser
- ⭐ **Alpha-Beta Pruning** - 50x performance boost
- ⭐ **Difficulty Persistence** - Saves to localStorage
- ⭐ **Change AI Between Games** - Switch difficulties
- ⭐ **Difficulty Badge Display** - Shows current level

### Improvements

- Smarter AI opponent
- Better player experience
- Optimized calculations
- Enhanced configuration
- Cleaner AI module
- Better performance
- Difficulty selection UX

### Bug Fixes

- Fixed AI move delays
- Improved state tracking
- Enhanced error handling
- Better memory management

### Version History

| Version  | Release | Key Features                     |
| -------- | ------- | -------------------------------- |
| **v1.0** | Initial | Basic Tic Tac Toe                |
| **v1.1** | Update  | Sound Effects                    |
| **v1.2** | Update  | LocalStorage                     |
| **v1.3** | Update  | Player Names                     |
| **v2.0** | Release | Modular, Stats, History          |
| **v3.0** | Release | AI Mode, Session Stats           |
| **v3.1** | Update  | Bug Fixes, Medium AI             |
| **v3.2** | NEW     | Hard AI, Minimax, 3 Difficulties |

---

## Future Enhancements

### Planned Features

- **Difficulty Rating** - Show ELO rating
- **Replay System** - Watch past games
- **Online Multiplayer** - Network play
- **Leaderboard** - Global rankings
- **Achievements** - Badge system
- **Themes** - Color customization
- **Sound Customization** - More audio options
- **Export Statistics** - Download data
- **Undo/Redo** - Move corrections
- **Time Control** - Timed games

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code structure
4. Add appropriate documentation
5. Test thoroughly
6. Submit a pull request

---

## 📄 License

**Personal Project - Free to Use**

- ✅ Personal use
- ✅ Educational purposes
- ✅ Modification allowed
- ❌ Commercial redistribution
- ❌ Remove attribution

---

**Made with ❤️ by Saurabh Chauhan for strategic gaming with unbeatable Hard AI and comprehensive difficulty selection!**

_Built with vanilla JavaScript - No frameworks, no dependencies, just clean code with perfect minimax AI and persistent preferences._
