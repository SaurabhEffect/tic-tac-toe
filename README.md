# Tic Tac Toe - v3.0

A feature-rich implementation of the classic Tic Tac Toe game with AI opponent support, advanced game modes, comprehensive statistics tracking, session analytics, and complete game history management. Built with modular vanilla JavaScript architecture, professional state management, and enhanced user experience.

![HTML5](https://img.shields.io/badge/Built%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Version](https://img.shields.io/badge/Version-4.0-brightgreen)
![Architecture](https://img.shields.io/badge/Architecture-Modular-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)
![Feature](https://img.shields.io/badge/Feature-AI_Opponent-red)
![Feature](https://img.shields.io/badge/Feature-Game_Modes-orange)
![Feature](https://img.shields.io/badge/Feature-Web_Audio_API-purple)
![Feature](https://img.shields.io/badge/Feature-LocalStorage_API-purple)

---

## 🆕 What's New in v3.0

### 🤖 **AI Opponent System** _(NEW - MAJOR)_

- **Easy AI Mode** - Computer player with random move selection
- **AI Logic Module** - Dedicated AI decision-making system
- **Game Mode Selection** - Choose between 2-Player or vs AI
- **Mode Screen** - Beautiful selection interface
- **Smart Difficulty** - Easy difficulty implemented, extensible for Medium/Hard
- **AI Delay** - Realistic thinking delay for better UX
- **Seamless Integration** - AI works with all existing features

### 🎮 **Game Mode System** _(NEW - MAJOR)_

- **Two-Player Mode** - Classic multiplayer on same device
- **AI Mode** - Play against computer opponent
- **Mode Selection Screen** - Elegant mode chooser
- **Easy Mode** - AI makes random moves
- **Mode Persistence** - Remembers selected mode
- **Dynamic UI** - Changes based on selected mode
- **Flexible Architecture** - Easy to add more modes

### 📊 **Session Statistics** _(NEW)_

- **Session Win Tracking** - Wins in current session
- **Session Loss Tracking** - Losses in current session
- **Session Draw Tracking** - Draws in current session
- **Session Win Rate** - Percentage for current session
- **All-Time Statistics** - Cumulative game records
- **Statistics Reset** - Clear data if needed
- **Stat Comparison** - Session vs All-Time views

### 🎯 **Statistics Screen** _(NEW)_

- **Dedicated Statistics Page** - View all game stats
- **Beautiful Layout** - Professional stats display
- **Session Metrics** - Current session breakdown
- **All-Time Metrics** - Lifetime statistics
- **Visual Grid** - Organized stat presentation
- **Back to Menu Button** - Easy navigation
- **Responsive Design** - Works on all devices

### 💾 **Enhanced Storage System** _(IMPROVED)_

- **Session Statistics Storage** - Separate session tracking
- **Multiple Storage Keys** - Organized data management
- **Improved Persistence** - Better data structure
- **Session/All-Time Split** - Dual storage system
- **Easy Data Retrieval** - Simplified access methods
- **Legacy Support** - Backwards compatible

### 🔧 **Improved State Management** _(ENHANCED)_

- **Game Mode Tracking** - Knows current mode
- **AI Difficulty Setting** - Configurable AI level
- **AI Opponent Support** - Board state for AI
- **Enhanced Configuration** - More game settings
- **Better State Tracking** - More properties managed
- **Cleaner Architecture** - Improved organization

### 🎨 **Better UI/UX** _(IMPROVED)_

- **Start Screen** - Welcome and entry point
- **Mode Selection Screen** - Choose game type
- **Statistics Screen** - View all metrics
- **Game Screen** - Main gameplay interface
- **Enhanced Navigation** - Screen transitions
- **Button Hierarchy** - Clear action buttons
- **Professional Design** - Polished appearance

### ✅ **Retained from v2.0**

- **10+ Modular Modules** - Clean architecture
- **Two-Player Gameplay** - Original mode
- **Custom Player Names** - Personalization
- **Sound System** - Audio feedback
- **Game History** - Move recording
- **Complete Statistics** - Win tracking
- **LocalStorage** - Data persistence
- **Responsive Design** - All devices

---

## ✨ Core Features

### 🎮 **Game Modes**

#### Two-Player Mode

- **Classic Gameplay** - X and O take turns
- **Custom Names** - Personalize each player
- **Name Input Modal** - Easy name entry
- **Current Turn Display** - Always know whose turn
- **Move Tracking** - Count total moves
- **Win Detection** - Automatic win/draw detection

#### AI Opponent Mode _(NEW in v3.0)_

- **Computer Opponent** - Play against AI
- **Easy Difficulty** - AI makes random moves
- **AI Think Delay** - Realistic response time
- **Smart Moves** - AI selects from valid moves
- **Human-Friendly** - Not unbeatable
- **Statistics Tracked** - AI games recorded
- **Fun Challenge** - Perfect for casual play

### 🤖 **AI Logic**

- **Empty Cell Detection** - Find valid moves
- **Random Selection** - Easy mode strategy
- **Move Validation** - Only legal moves
- **Extensible Design** - Easy to add harder AI
- **Efficient Algorithm** - Fast calculations
- **Game State Aware** - Considers board state
- **Configurable Delay** - Customizable response time

### 📊 **Statistics System**

#### Session Statistics _(NEW in v3.0)_

```
Session Tracking:
├── Wins (Current Session)
├── Losses (Current Session)
├── Draws (Current Session)
├── Win Rate (%)
└── Reset Option
```

#### All-Time Statistics _(from v2.0)_

```
Lifetime Tracking:
├── Total Player X Wins
├── Total Player O Wins
├── Total Games Played
├── Overall Win Rate
└── Historical Data
```

### 📈 **Statistics Display** _(NEW)_

- **Dedicated Statistics Screen** - Separate page
- **Section Organization** - Grouped metrics
- **Grid Layout** - Clean presentation
- **Live Updates** - Real-time stat display
- **Both Modes** - Session and all-time
- **Easy Navigation** - Back to menu button
- **Beautiful Design** - Professional appearance

### 🎯 **Game Mechanics** (Enhanced)

- **Win Detection** - All 8 combinations checked
- **Draw Detection** - Identifies tie games
- **Move Validation** - Prevents invalid moves
- **Game State Management** - Robust tracking
- **AI Integration** - Seamless AI moves
- **Mode Switching** - Easy mode selection
- **Screen Transitions** - Smooth navigation

### 💾 **Data Persistence**

- **Auto-save** - Game state saved automatically
- **LocalStorage** - Browser-based storage
- **Statistics Saved** - All metrics persisted
- **Session Data** - Current session tracked
- **History Recorded** - Complete game history
- **Preferences Saved** - User settings remembered
- **Recovery Support** - Resume from crashes

### 📜 **Game History** (from v2.0)

- **Complete Recording** - Every game logged
- **Player Information** - Names recorded
- **Game Result** - Win/Draw/Loss tracked
- **Timestamp** - When game was played
- **Move History** - All moves recorded
- **Replay Data** - Future replay support
- **Maximum 10 Games** - Latest games kept

### 🔊 **Sound System** (Retained)

- **Web Audio API** - Programmatic sounds
- **Move Sound** - Feedback for each move
- **Win Sounds** - Musical chord on victory
- **Draw Sound** - Notification on tie
- **Toggle Control** - On/off button
- **Preference Memory** - Saves user choice
- **Volume Control** - Adjustable audio level

---

## 📦 Installation

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
   ├── aiLogic.js              # AI decision making (NEW in v3.0)
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

## 🎮 Usage

1. **Welcome Screen**:

   - Click **"Start Game"** to play
   - Click **"Statistics"** to view stats

2. **Mode Selection** _(NEW in v3.0)_:

   - Choose **"2 Players"** for classic mode
   - Choose **"vs AI (Easy)"** for computer opponent

3. **Player Names** (Two-Player Mode):

   - Enter custom names (optional)
   - Or click "Skip" for default names

4. **Gameplay**:

   - Players take turns clicking cells
   - Current player displayed at top
   - First to 3-in-a-row wins

5. **AI Gameplay** (AI Mode - NEW):

   - You play as X
   - AI plays as O
   - AI makes moves automatically
   - Same win/draw detection

6. **After Game**:

   - View result with winner's name
   - Statistics update automatically _(NEW)_
   - Click "Play Again" for next game
   - Click "Back to Menu" to change mode

7. **View Statistics** _(NEW)_:
   - Click "Statistics" from menu
   - See session and all-time stats
   - Compare current vs lifetime
   - Option to reset statistics

---

## 📊 Statistics Features (v3.0)

### Session Statistics Screen _(NEW)_

**Current Session Section:**

- Wins: Games won in this session
- Losses: Games lost in this session (AI mode only)
- Draws: Tied games in this session
- Win Rate %: Calculated percentage

**All-Time Section:**

- Total Wins: Lifetime wins
- Total Losses: Lifetime losses
- Total Draws: Lifetime draws
- Total Games: Games played
- Overall Win Rate: Percentage

### How It Works

1. **Auto-Update** - Stats update after each game
2. **Session Tracking** - Separate session counter
3. **All-Time Tracking** - Cumulative stats
4. **Data Persistence** - Saved to localStorage
5. **Screen Display** - Beautiful presentation
6. **Comparison** - Session vs all-time visible
7. **Reset Option** - Clear data if needed

---

## 🤖 AI System (NEW in v3.0)

### AI Logic Flow

```
Player Makes Move
    ↓
Game Checks Win/Draw
    ↓
If AI Mode:
    ├── Get Empty Cells
    ├── Random Selection (Easy)
    ├── Optional Delay (500ms)
    └── AI Move Executed
    ↓
Game Checks Result
    ↓
Display Result & Update Stats
```

### Easy AI Implementation

```javascript
function getEasyAIMove() {
  const emptyCells = getEmptyCells();
  // Random selection from available cells
  return randomCell;
}
```

### AI Features

- **Random Moves** - Easy difficulty
- **Move Validation** - Only legal moves
- **Configurable Delay** - Feel more human
- **Game State Aware** - Board context
- **Statistics Compatible** - Tracked like human games
- **Extensible** - Medium/Hard modes possible

### Future AI Enhancements

- **Minimax Algorithm** - Perfect play
- **Medium Difficulty** - Strategic play
- **Hard Difficulty** - Unbeatable
- **Difficulty Levels** - User selection
- **Adaptive AI** - Learning from player

---

## 🏗️ Modular Architecture (v3.0)

### Module Count: 12 Specialized Modules

#### New Modules in v3.0

**aiLogic.js** ⭐ NEW

- AI decision-making
- Move evaluation
- Random selection (easy)
- Extensible for harder AI

#### Enhanced Modules in v3.0

**gameState.js** ENHANCED

- Game mode tracking
- AI difficulty setting
- Board state for AI
- More configuration

**config.js** ENHANCED

- Game modes constants
- AI configuration
- Difficulty settings
- Easy mode defaults

**storage.js** ENHANCED

- Session statistics storage
- Multiple storage keys
- Better organization
- Improved structure

**uiController.js** ENHANCED

- Screen management
- Mode selection display
- Statistics screen rendering
- Navigation handling

#### Existing Modules (from v2.0)

**script.js**

- Application entry point
- Event initialization
- Game flow management

**gameLogic.js**

- Win condition checking
- Move validation
- Draw detection

**playerManager.js**

- Player name storage
- Name validation
- Display names

**domElements.js**

- DOM references
- Element validation
- Centralized access

**soundManager.js**

- Web Audio API
- Sound generation
- Volume control

**statisticsManager.js**

- Statistics calculation
- Win/draw counting
- Percentage calculation

**gameHistoryManager.js**

- Game recording
- History retrieval
- Timestamp management

---

## 📱 Screens and Navigation (v3.0)

### Screen Flow

```
Start Screen
    ├── "Start Game" → Mode Selection Screen
    └── "Statistics" → Statistics Screen

Mode Selection Screen _(NEW)_
    ├── "2 Players" → Player Names Modal → Game Screen
    └── "vs AI" → Game Screen (X vs AI)

Game Screen
    ├── Play Game
    └── Game Over → Result Display

Statistics Screen _(NEW)_
    ├── View Session Stats
    ├── View All-Time Stats
    └── "Back to Menu" → Start Screen
```

### New Screens in v3.0

**Mode Selection Screen**

- Two large buttons
- Clear mode options
- Professional design
- Easy selection

**Statistics Screen**

- Session metrics section
- All-time metrics section
- Back to menu button
- Organized grid layout

---

## 🎯 File Breakdown

| Module                    | Size    | Purpose                         |
| ------------------------- | ------- | ------------------------------- |
| **script.js**             | 10.8 KB | Main entry & initialization     |
| **gameState.js**          | 2.7 KB  | State management (ENHANCED)     |
| **storage.js**            | 3.5 KB  | LocalStorage operations (EHNCD) |
| **statisticsManager.js**  | 3.6 KB  | Statistics tracking             |
| **gameHistoryManager.js** | 3.7 KB  | History management              |
| **uiController.js**       | 3.0 KB  | UI rendering (ENHANCED)         |
| **domElements.js**        | 3.0 KB  | DOM references                  |
| **soundManager.js**       | 2.0 KB  | Audio effects                   |
| **config.js**             | 1.8 KB  | Constants (ENHANCED)            |
| **playerManager.js**      | 1.0 KB  | Player management               |
| **gameLogic.js**          | 0.8 KB  | Game rules                      |
| **aiLogic.js**            | 0.7 KB  | AI decision making (NEW)        |

**Total JavaScript**: ~36.7 KB (12 modular files)

---

## 🎨 Visual Design

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
```

### UI Components

**Buttons**

- Primary buttons - Main actions
- Secondary buttons - Alternative actions
- Mode buttons - Game mode selection
- Navigation buttons - Screen transitions

**Text**

- Titles - Game title
- Subtitles - Game description
- Labels - Stat labels
- Values - Stat values

### Responsive Design

```
Mobile: < 768px
├── Stack layout
├── Touch targets
└── Mobile optimized

Tablet: 768px - 1024px
├── Balanced layout
└── Adaptive spacing

Desktop: > 1024px
├── Full layout
└── Enhanced effects
```

---

## 💾 LocalStorage Structure

### Storage Keys (v3.0 - ENHANCED)

```javascript
STORAGE_KEYS = {
  SOUND_ENABLED: "tictactoe_soundEnabled",
  GAME_STATE: "tictactoe_gameState",
  PLAYER_PREFERENCES: "tictactoe_playerPrefs",
  STATISTICS: "tictactoe_statistics",
  SESSION_STATS: "tictactoe_sessionStats" // NEW
  GAME_HISTORY: "tictactoe_gameHistory",
}
```

### Saved Data Structure

```javascript
localStorage Items:
├── soundEnabled              // Boolean
├── gameState                 // Current board
├── playerXName              // String
├── playerOName              // String
├── statistics               // Win/draw counts
├── sessionStats             // Session tracking (NEW)
├── gameHistory             // Array of games
└── preferences             // User settings
```

---

## 🔧 Configuration

### Game Configuration

Edit **config.js** to customize:

```javascript
GAME_CONFIG = {
  BOARD_SIZE: 9,
  GRID_DIMENSIONS: 3,
  INITIAL_PLAYER: "X",
};

GAME_MODES = {
  TWO_PLAYER: "2-player",
  AI: "ai",
};

AI_CONFIG = {
  DIFFICULTY: "easy",
  DELAY: 500,
};
```

### Customization Options

- Change board size
- Modify sound frequencies
- Adjust AI difficulty
- Configure delays
- Customize messages
- Change winning combinations

---

## 🎵 Sound System

### Audio Features

- **Move Sound** - 600 Hz frequency
- **Win Sounds** - Triadic chord (523, 659, 784 Hz)
- **Draw Sound** - Notification (400 Hz)
- **Volume** - 0.2 default level
- **Web Audio API** - No external files

### Sound Control

- Toggle button available
- Preference saved
- Works in all modes
- Silent mode option

---

## 🎓 Changelog - v3.0

### ✨ New Features

- ⭐ **AI Opponent** - Play against computer
- ⭐ **Game Mode Selection** - Choose 2P or AI
- ⭐ **Session Statistics** - Track current session
- ⭐ **Statistics Screen** - View all metrics
- ⭐ **Mode Selection Screen** - Beautiful chooser
- ⭐ **AI Logic Module** - Dedicated AI system
- ⭐ **AI Delay** - Realistic thinking time
- ⭐ **Enhanced Storage** - Session data support

### 🔧 Improvements

- Better screen organization
- Enhanced navigation
- Improved state management
- Better UI flow
- Cleaner module structure
- More configuration options
- Scalable AI system

### 📈 Version History

| Version  | Release | Key Features             |
| -------- | ------- | ------------------------ |
| **v1.0** | Initial | Basic Tic Tac Toe        |
| **v1.1** | Update  | Sound Effects            |
| **v1.2** | Update  | LocalStorage             |
| **v1.3** | Update  | Player Names             |
| **v2.0** | Release | Modular, Stats, History  |
| **v3.0** | NEW     | AI, Modes, Session Stats |

---

## 🚀 Performance

### File Sizes

```
HTML: ~8.2 KB
CSS: ~13.4 KB
JavaScript: ~36.7 KB (12 modules)
Total: ~58.3 KB (lightweight)
```

### Load Time

- **Initial Load**: < 1 second
- **Game Start**: Instant
- **Mode Change**: < 100ms
- **AI Move**: 500ms (configurable)

### Optimizations

- Modular code
- Minimal DOM updates
- Efficient state management
- Optimized styling
- No external dependencies

---

## 📝 Browser Support

| Browser     | Version | Status  |
| ----------- | ------- | ------- |
| **Chrome**  | 90+     | ✅ Full |
| **Firefox** | 88+     | ✅ Full |
| **Safari**  | 12+     | ✅ Full |
| **Edge**    | 90+     | ✅ Full |
| **Opera**   | 77+     | ✅ Full |
| **Mobile**  | Modern  | ✅ Full |

---

## 🔮 Future Enhancements

### Planned Features

- **Medium AI** - Strategic play
- **Hard AI** - Unbeatable opponent
- **Difficulty Selection** - User choice
- **Multiplayer Online** - Network play
- **Leaderboard** - Global rankings
- **Achievements** - Badges system
- **Themes** - Color customization
- **Sound Customization** - More audio options
- **Game Replays** - Watch past games
- **Export Stats** - Download data

---

## 🤝 Contributing

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

**Made with ❤️ by Saurabh Chauhan for strategic gaming! with AI & advanced analytics!**

_Built with vanilla JavaScript - No frameworks, no dependencies, just clean code with AI opponent and persistent stats._
