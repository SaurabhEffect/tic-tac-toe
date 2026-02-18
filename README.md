# Tic Tac Toe - v2.0

A minimalist and elegant implementation of the classic Tic Tac Toe game with a luxury-inspired minimal design aesthetic. Built with modular vanilla JavaScript architecture, advanced state management, comprehensive statistics tracking, and game history recording.

![HTML5](https://img.shields.io/badge/Built%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Version](https://img.shields.io/badge/Version-2.0-brightgreen)
![Architecture](https://img.shields.io/badge/Architecture-Modular-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)
![Feature](https://img.shields.io/badge/Feature-Web_Audio_API-purple)
![Feature](https://img.shields.io/badge/Feature-LocalStorage_API-purple)

---

## What's New in v2.0

### **Completely Modular Architecture** _(NEW)_

- **10 Specialized Modules** - Each with single responsibility
- **Better Code Organization** - Easier to maintain and extend
- **Import/Export System** - Clean module dependencies
- **Scalable Design** - Easy to add new features

### **Advanced Statistics System** _(NEW)_

- **Player Win Counts** - Track total wins per player
- **Draw Tracking** - Record total draws
- **Win Rate Calculation** - Percentage-based statistics
- **Game Counter** - Total games played
- **Statistics Display** - View all stats in dedicated screen

### **Game History Management** _(NEW)_

- **Move Recording** - Complete history of all moves
- **Game Results** - Win/Draw/Loss tracking
- **Player Information** - Store player names with games
- **Timestamp Recording** - When each game was played
- **History Persistence** - Saved to localStorage

### **Enhanced Core Features**

- All v1.3 features maintained and improved
- Better state management
- Improved UI/UX
- Optimized performance
- Enhanced code quality

---

## Core Features

### **Luxury Minimal Design**

- **Premium Aesthetic** - Cream, beige, charcoal, and gold palette
- **Clean Interface** - Minimal visual clutter
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Elegant transitions and hover effects
- **Professional Typography** - High-end brand aesthetic

### **Two Player Mode**

- **Same Device Play** - Play against a friend
- **Custom Player Names** - Personalize your game
- **Name Persistence** - Player names saved and remembered
- **Name Validation** - Clean player name input
- **Current Player Display** - Always know whose turn it is

### **Sound System**

- **Subtle Audio Feedback** - Non-intrusive sound effects
- **Toggle Functionality** - Easy on/off control
- **Sound Preference Memory** - Saves user preference
- **Web Audio API** - Programmatic sound generation
- **Move Confirmation** - Audio feedback for each move

### **Game Mechanics**

- **Win Detection** - Automatic detection with visual highlighting
- **Draw Detection** - Identifies tie games
- **Move Validation** - Prevents invalid moves
- **Game State Management** - Robust state tracking
- **Play Again** - Quick reset for next game

### **Data Persistence**

- **Auto-save** - Game state saved automatically
- **LocalStorage** - Browser-based persistence
- **Statistics Saved** - All data permanently stored
- **History Recorded** - Complete game history maintained
- **Recovery Support** - Resume unfinished games

### **Statistics & History**

- **Win Statistics** - View all-time wins
- **Draw Count** - Total draws tracked
- **Winning Percentage** - Success rate calculated
- **Game History** - View past game results
- **Player History** - Historical player performance

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
   ├── gameHistoryManager.js   # Game history (NEW)
   ├── gameLogic.js            # Core game logic (win detection)
   ├── domElements.js          # DOM element references
   ├── soundManager.js         # Audio management
   ├── uiController.js         # UI updates and rendering
   ├── storage.js              # LocalStorage operations
   ├── playerManager.js        # Player name management
   ├── statisticsManager.js    # Statistics tracking (NEW)
   └── README.md               # Documentation
   ```
3. **Run the Game**:
   - Open `index.html` in any modern web browser
   - **Note**: Due to ES6 modules, you need to run from a local server or use a browser that supports file:// protocol modules
   - **Recommended**: Use Live Server extension in VS Code or Python's simple HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit: `http://localhost:8000`

## Usage

1. Click **"Start Game"** on the welcome screen
2. **Enter Player Names** (NEW in v1.3):
   - Type custom names for both players (e.g., "Alice" and "Bob")
   - Or click "Skip" to use default names
3. **Play the Game**:
   - Players take turns clicking cells
   - Names display at the top showing whose turn it is
4. **Win Condition**:
   - Get three marks in a row (horizontal, vertical, or diagonal)
   - Victory message displays with the winner's custom name
5. Click **"Play Again"** to start fresh game
6. Toggle sound effects with the speaker icon
7. All names and preferences automatically saved!

### File Breakdown

| Module                    | Size   | Purpose                     |
| ------------------------- | ------ | --------------------------- |
| **script.js**             | 8.6 KB | Main entry & initialization |
| **gameState.js**          | 2.2 KB | State management            |
| **storage.js**            | 3.5 KB | LocalStorage operations     |
| **statisticsManager.js**  | 3.6 KB | Statistics tracking ⭐ NEW  |
| **gameHistoryManager.js** | 3.9 KB | History management ⭐ NEW   |
| **uiController.js**       | 2.7 KB | UI rendering                |
| **domElements.js**        | 2.5 KB | DOM references              |
| **soundManager.js**       | 2.0 KB | Audio effects               |
| **config.js**             | 1.7 KB | Constants                   |
| **playerManager.js**      | 1.0 KB | Player management           |
| **gameLogic.js**          | 0.8 KB | Game rules                  |

**Total JavaScript**: ~23.8 KB (10 modular files)

---

## Game Features

### Core Gameplay

#### Two-Player Mode

- **Player X and Player O** - Take turns on same device
- **Custom Names** - Personalize each player
- **Current Turn Display** - See whose turn it is
- **Move Counting** - Track moves made

#### Win/Draw Detection

```javascript
// All 8 winning combinations checked automatically:
- Horizontal: [0,1,2], [3,4,5], [6,7,8]
- Vertical: [0,3,6], [1,4,7], [2,5,8]
- Diagonal: [0,4,8], [2,4,6]
```

### Advanced Features

#### Statistics System ⭐ NEW in v2.0

```javascript
Statistics Tracked:
├── Player X Wins
├── Player O Wins
├── Total Draws
├── Total Games
├── Win Percentages
└── Games Recorded
```

#### Game History ⭐ NEW in v2.0

```javascript
Recorded Data:
├── Player Names
├── Game Result (Win/Draw)
├── Winner Information
├── Moves Made
├── Timestamp
└── Game Duration
```

---

## Modular Architecture (v2.0)

### Module Responsibilities

#### **gameState.js**

- Manages current game state
- Board position tracking
- Current player management
- Game status monitoring

#### **gameLogic.js**

- Win condition checking
- Move validation
- Draw detection
- Game rules enforcement

#### **playerManager.js**

- Player name storage
- Name validation
- Player display names
- Name persistence

#### **domElements.js**

- DOM element references
- Element validation
- Centralized DOM access
- Easy updates

#### **uiController.js**

- UI rendering logic
- Event handlers
- Visual updates
- Screen transitions

#### **storage.js**

- LocalStorage operations
- Game state persistence
- Preference saving
- Data retrieval

#### **statisticsManager.js** ⭐ NEW

- Statistics calculation
- Win tracking
- Draw counting
- Percentage calculation
- Stats persistence

#### **gameHistoryManager.js** ⭐ NEW

- Game recording
- History retrieval
- Move tracking
- Timestamp management
- History persistence

#### **soundManager.js**

- Web Audio API integration
- Sound effect generation
- Volume control
- Audio context management

#### **config.js**

- Game constants
- Winning combinations
- Sound frequencies
- Default settings

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
```

---

## Changelog - v2.0

### New Features

- ⭐ **10 Modular Files** - Complete architecture overhaul
- ⭐ **Statistics Manager** - Win/draw tracking system
- ⭐ **Game History** - Complete game recording
- ⭐ **Enhanced Storage** - Improved data management
- ⭐ **Better Organization** - Clean module structure

### Improvements

- Better separation of concerns
- Improved code maintainability
- Enhanced scalability
- Better performance
- Cleaner imports/exports
- Improved documentation

### Bug Fixes

- Fixed state management issues
- Improved event handling
- Better error handling
- Enhanced validation

### Version History

| Version  | Release | Key Features                 |
| -------- | ------- | ---------------------------- |
| **v1.0** | Initial | Basic Tic Tac Toe            |
| **v1.1** | Update  | Sound Effects                |
| **v1.2** | Update  | LocalStorage                 |
| **v1.3** | Update  | Player Names                 |
| **v2.0** | NEW     | Modular, Statistics, History |

---

## Future Enhancements

### Planned Features

- **AI Opponent** - Computer player mode
- **Difficulty Levels** - Easy/Medium/Hard AI
- **Multiplayer** - Online play
- **Leaderboard** - Global rankings
- **Achievements** - Unlockable badges
- **Themes** - Color customization
- **Mobile App** - Native app version
- **Sound Customization** - More audio options
- **Game Replays** - Replay past games
- **Export Stats** - Download statistics

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code structure
4. Add appropriate documentation
5. Test thoroughly
6. Submit a pull request

## License

**Personal Project - Free to Use**

- ✅ Personal use
- ✅ Educational purposes
- ✅ Modification allowed
- ❌ Commercial redistribution
- ❌ Remove attribution

---

**Made with ❤️ by Saurabh Chauhan for luxury game experiences**

_Built with vanilla JavaScript - No frameworks, no dependencies._
