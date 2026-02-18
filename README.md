# Tic Tac Toe

A minimalist and elegant implementation of the classic Tic Tac Toe game with a luxury-inspired design aesthetic, built with modular vanilla JavaScript.

## Features

- **Luxury Minimal Design**: Clean interface inspired by high-end brand aesthetics
- **Two Player Mode**: Play against a friend on the same device
- **Sound Effects**: Subtle audio feedback with toggle functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant transitions and hover effects
- **Win Detection**: Automatic winner detection with visual highlighting
- **Draw Detection**: Identifies tie games automatically
- **Play Again**: Quick reset functionality
- **Modular Architecture**: Clean, maintainable code using ES6 modules

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modular game logic with ES6 modules
- **Web Audio API**: Dynamic sound generation

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
2. Player X (charcoal) goes first
3. Click any empty cell to place your mark
4. Players alternate turns automatically
5. Get three marks in a row to win (horizontal, vertical, or diagonal)
6. Click **"Play Again"** to start fresh
7. Toggle sound effects with the speaker icon

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
└─────────────────────────────────┘
```

### Data Flow

1. **User Interaction** → DOM Event
2. **script.js** → Receives event
3. **gameState.js** → Updates state
4. **gameLogic.js** → Validates and checks results
5. **uiController.js** → Updates UI
6. **soundManager.js** → Plays audio feedback

## Version History

| Version | Features                                        | Date     |
| ------- | ----------------------------------------------- | -------- |
| 1.0     | Initial release - Basic 2-player game           | Oct 2025 |
| 1.1     | Modular refactoring, ES6 modules, documentation | Oct 2025 |

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
