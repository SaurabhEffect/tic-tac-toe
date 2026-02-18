# Tic Tac Toe - v1.3

A minimalist and elegant implementation of the classic Tic Tac Toe game with a luxury-inspired design aesthetic, built with modular vanilla JavaScript and custom player names.

**Version 1.3 Features**: Player name customization with persistent storage and display in game UI.

## Features

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

### v1.2 Features - LocalStorage Persistence

- **LocalStorage Persistence**: Game state automatically saved
- **Sound Preference Memory**: Sound toggle state persists across sessions
- **Auto-save on Each Move**: Game progress is continuously saved
- **Browser Close Protection**: Game state preserved even after closing browser
- **Preference Auto-load**: Sound and preferences restored on startup

### v1.3 - NEW: Player Customization

- **Custom Player Names**: Enter personalized names for both players
- **Name Input Modal**: Beautiful modal for easy name entry
- **Display Custom Names**: Names shown during gameplay in current player display
- **Win Messages with Names**: Victory messages display custom player names
- **Names in Status Bar**: Shows "Alice" instead of "Player X" during game
- **Persistent Names**: Custom names saved to localStorage
- **Skip Option**: Use default names if preferred
- **Default Fallback**: "Player X" and "Player O" as defaults

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modular game logic with ES6 modules
- **Web Audio API**: Dynamic sound generation
- **LocalStorage API**: Persistent data storage

## Installation

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
   ├── storage.js          # LocalStorage operations
   ├── playerManager.js    # Player name management (v1.3)
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

## Architecture

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
│ playerManager.js │ Player Names │
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
8. **playerManager.js** → Manages player name operations

## Version History

| Version | Features                                                    | Date     |
| ------- | ----------------------------------------------------------- | -------- |
| 1.0     | Initial release - Basic 2-player game                       | Oct 2025 |
| 1.1     | Modular refactoring, ES6 modules, documentation             | Oct 2025 |
| 1.2     | LocalStorage integration, state persistence, preferences    | Oct 2025 |
| 1.3     | Player customization, custom names, personalized experience | Oct 2025 |

## Future Enhancements

Planned features for upcoming versions:

- LocalStorage integration for preferences
- Score tracking and statistics
- AI opponent (Easy/Medium/Hard)
- Multiple themes
- Undo/Hint features
- PWA support

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
