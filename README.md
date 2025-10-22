# Tic Tac Toe

A minimalist and elegant implementation of the classic Tic Tac Toe game with a luxury-inspired design aesthetic.

## 🎯 Overview

This project is a sophisticated take on the classic Tic Tac Toe game, featuring a luxury-inspired minimal design with cream, beige, charcoal, and gold color palette. Built with vanilla JavaScript, it offers smooth animations, responsive design, and an elegant user experience.

## ✨ Features

- **Luxury Minimal Design**: Clean interface inspired by high-end brand aesthetics
- **Two Player Mode**: Play against a friend on the same device
- **Sound Effects**: Subtle audio feedback with toggle functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant transitions and hover effects
- **Win Detection**: Automatic winner detection with visual highlighting
- **Draw Detection**: Identifies tie games automatically
- **Play Again**: Quick reset functionality

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Game logic and interactivity
- **Web Audio API**: Dynamic sound generation

## 📦 Installation

1. **Download or clone** the repository
2. **File Structure**:
   ```
   tic-tac-toe/
   ├── index.html
   ├── style.css
   ├── script.js
   └── README.md
   ```
3. **Open** `index.html` in any modern web browser
4. **No build process** or dependencies required

## 🎮 Usage

1. Click **"Start Game"** on the welcome screen
2. Player X (charcoal) goes first
3. Click any empty cell to place your mark
4. Players alternate turns automatically
5. Get three marks in a row to win
6. Click **"Play Again"** to start fresh
7. Toggle sound effects with the speaker icon

## 🎯 Game Rules

- Played on a 3×3 grid
- Player X uses charcoal marks
- Player O uses gold marks
- First to get 3 in a row wins (horizontal, vertical, or diagonal)
- All 9 cells filled without winner = draw

## 🎨 Customization

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

Adjust dimensions:

```css
:root {
  --cell-size: min(120px, 28vw);
  --gap: 10px;
}
```

### Sound Effects

Modify frequencies in `script.js`:

```javascript
const sounds = {
  move: () => playSound(600, 0.08, "sine"),
  win: () => playSound(523, 0.12, "sine"),
};
```

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is open source and available for educational purposes.

---

**Made with ❤️ by Saurabh Chauhan**
