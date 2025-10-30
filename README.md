# Tic Tac Toe

A minimalist and elegant implementation of the classic Tic Tac Toe game with a luxury-inspired design aesthetic, built with modular vanilla JavaScript and persistent storage.

## 🎯 Overview

A sophisticated take on the classic Tic Tac Toe game, featuring a luxury-inspired minimal design with cream, beige, charcoal, and gold color palette. Built with vanilla JavaScript using ES6 modules, it offers smooth animations, responsive design, clean code architecture, and persistent data storage using localStorage.

**Version 1.2 Features**: LocalStorage integration for preferences and game state persistence.

## ✨ Features

### Core Features

- **Luxury Minimal Design**: Clean interface inspired by high-end brand aesthetics
- **Two Player Mode**: Play against a friend on the same device
- **Sound Effects**: Subtle audio feedback with toggle functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant transitions and hover effects
- **Win Detection**: Automatic winner detection with visual highlighting
- **Draw Detection**: Identifies tie games automatically
- **Play Again**: Quick reset functionality
- **Modular Architecture**: Clean, maintainable code using ES6 modules

### v1.2 - New Features

- **LocalStorage Persistence**: Game state automatically saved
- **Sound Preference Memory**: Sound toggle state persists across sessions
- **Auto-save on Each Move**: Game progress is continuously saved
- **Browser Close Protection**: Game state preserved even after closing browser
- **Preference Auto-load**: Sound and preferences restored on startup

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modular game logic with ES6 modules
- **Web Audio API**: Dynamic sound generation
- **LocalStorage API**: Persistent data storage

## 📦 Installation

1. **Download or clone** the repository
2. **File Structure**:
   ```
   tic-tac-toe/
   ├── index.html          # Main HTML file
   ├── style.css           # Styling and animations
   ├── script.js           # Main application controller
   ├── config.js           # Game constants and configuration
   ├── gameState.js        # Game state management
   ├── gameLogic.js        # Core game logic (win detection)
   ├── domElements.js      # DOM element references
   ├── soundManager.js     # Audio management
   ├── uiController.js     # UI updates and rendering
   ├── storage.js          # LocalStorage operations (v1.2)
   └── README.md           # Documentation
   ```
3. **Run the Game**:
   - Open `index.html` in any modern web browser
   - **Note**: Due to ES6 modules, you need to run from a local server or use a browser that supports file:// protocol modules
   - **Recommended**: Use Live Server extension in VS Code or Python's simple HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit: `http://localhost:8000`

## 🎮 Usage

1. Click **"Start Game"** on the welcome screen
2. Player X (charcoal) goes first
3. Click any empty cell to place your mark
4. Players alternate turns automatically
5. Get three marks in a row to win (horizontal, vertical, or diagonal)
6. Click **"Play Again"** to start fresh
7. Toggle sound effects with the speaker icon
8. Your preferences and unfinished games are automatically saved!

## 📁 Project Structure

### Core Files

#### **index.html**

Main HTML structure with semantic markup and ES6 module imports. Includes footer with GitHub link.

#### **style.css**

Complete styling with CSS custom properties, animations, and responsive design. Includes luxury color palette and elegant footer styling.

#### **script.js**

Main application controller that coordinates all modules. Handles initialization, event listeners, and game flow. Manages localStorage operations for persistence.

### JavaScript Modules

#### **config.js**

Contains all game constants and configuration:

- Game board settings
- Winning combinations
- Sound configuration
- CSS class names
- Game messages

#### **gameState.js**

Centralized state management with GameState class:

- Board state tracking
- Current player management
- Game active status
- Sound preferences
- State manipulation methods

#### **gameLogic.js**

Core game logic:

- Win condition checking
- Draw detection
- Move validation

#### **domElements.js**

DOM element management:

- Element selection and caching
- Element validation
- Centralized DOM references

#### **soundManager.js**

Audio management using Web Audio API:

- Sound playback functions
- Volume control
- Different sound effects (move, win, draw, click)

#### **uiController.js**

UI updates and rendering:

- Display updates
- Cell rendering
- Screen transitions
- Status messages
- Visual feedback

#### **storage.js** (NEW - v1.2)

LocalStorage management:

- Save/load game state
- Save/load player preferences
- Sound preference persistence
- Game state auto-save on close

## 🔄 LocalStorage Features (v1.2)

### Saved Data

The game automatically saves:

- **Game State**: Board positions, current player, game status
- **Sound Preference**: Mute/unmute status
- **Timestamp**: When game was last saved

### Persistence Behavior

- ✅ Preferences persist across browser sessions
- ✅ Game state auto-saves after each move
- ✅ Game state saved when game ends
- ✅ State preserved even if browser is closed without warning
- ✅ Sound toggle state restored on startup
- ✅ Unfinished games can be resumed

### Data Storage Locations

```javascript
localStorage.tictactoe_gameState; // Game board and state
localStorage.tictactoe_soundEnabled; // Sound preference
```

## 🧪 Testing LocalStorage

Open browser console (F12) and test:

```javascript
// View all saved data
console.log(localStorage.getItem("tictactoe_gameState"));
console.log(localStorage.getItem("tictactoe_soundEnabled"));

// Clear all data (if needed)
localStorage.clear();
```

## 🔧 Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
  --cream: #f4f1ea;
  --beige: #e8e2d5;
  --charcoal: #2c2c2c;
  --gold: #c9a961;
}
```

### Cell Size

Adjust dimensions in `style.css`:

```css
:root {
  --cell-size: min(120px, 28vw);
  --gap: 10px;
}
```

### Sound Effects

Modify frequencies in `config.js`:

```javascript
export const SOUND_CONFIG = {
  FREQUENCIES: {
    MOVE: 600,
    WIN_NOTE_1: 523,
    // ...
  },
};
```

### Game Configuration

Adjust game settings in `config.js`:

```javascript
export const GAME_CONFIG = {
  BOARD_SIZE: 9,
  GRID_DIMENSIONS: 3,
  INITIAL_PLAYER: "X",
};
```

## 🌐 Browser Support

- ✅ Chrome/Edge (latest) - Full support
- ✅ Firefox (latest) - Full support
- ✅ Safari (latest) - Full support
- ✅ Opera (latest) - Full support
- ✅ Mobile browsers - Requires local server

**Note**: ES6 modules require a server environment or modern browser support for file:// protocol.

## 🏗️ Architecture

### Modular Design Pattern

The application follows a modular architecture with clear separation of concerns:

```
┌─────────────────┐
│   script.js     │  ← Main Controller
│  (Entry Point)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────────────────────────────┐
│        Module Layer             │
├─────────────────────────────────┤
│ config.js        │ Constants    │
│ gameState.js     │ State Mgmt   │
│ gameLogic.js     │ Game Rules   │
│ domElements.js   │ DOM Cache    │
│ soundManager.js  │ Audio        │
│ uiController.js  │ UI Updates   │
│ storage.js       │ Persistence  │
└─────────────────────────────────┘
```

### Data Flow

1. **User Interaction** → DOM Event
2. **script.js** → Receives event
3. **gameState.js** → Updates state
4. **gameLogic.js** → Validates and checks results
5. **uiController.js** → Updates UI
6. **soundManager.js** → Plays audio feedback
7. **storage.js** → Persists to localStorage

## 🧪 Development

### Adding New Features

1. **Add constants** to `config.js`
2. **Update state** in `gameState.js` if needed
3. **Add logic** to `gameLogic.js` for rules
4. **Update UI** in `uiController.js` for display
5. **Handle storage** in `storage.js` if data persistence needed
6. **Wire it up** in `script.js`

### Code Style

- Use JSDoc comments for all functions
- Follow ES6+ standards
- Maintain single responsibility per module
- Keep functions small and focused
- Use descriptive variable names

## 📝 Version History

| Version | Features                                                 | Date     |
| ------- | -------------------------------------------------------- | -------- |
| 1.0     | Initial release - Basic 2-player game                    | Oct 2025 |
| 1.1     | Modular refactoring, ES6 modules, documentation          | Oct 2025 |
| 1.2     | LocalStorage integration, state persistence, preferences | Oct 2025 |

## 🔮 Future Enhancements

Planned features for upcoming versions:

- LocalStorage integration for preferences
- Score tracking and statistics
- AI opponent (Easy/Medium/Hard)
- Multiple themes
- Undo/Hint features
- PWA support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code structure
4. Add appropriate documentation
5. Test thoroughly
6. Submit a pull request

## 📄 License

**Personal Project - Free to Use**

- ✅ Personal use
- ✅ Educational purposes
- ✅ Modification allowed
- ❌ Commercial redistribution
- ❌ Remove attribution

---

**Made with ❤️ by Saurabh Chauhan for luxury game experiences**

_Built with vanilla JavaScript - No frameworks, no dependencies, just clean code and persistent storage._
