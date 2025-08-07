# 🕵️ Clue Digital Scorecard

A digital scorecard for the Clue board game in Spanish. Track which cards each player has during the game with an intuitive web interface featuring customizable player names, automatic saving, and intelligent validation.

## ✨ Features

### Core Functionality

- **Interactive Grid**: Click cells to cycle through states (empty → ✓ → ✗)
- **Multi-Player Support**: Up to 6 players with customizable names
- **Save/Load Games**: Export and import game states as JSON files
- **Mobile Responsive**: Optimized for phones, tablets, and desktop
- **Spanish Interface**: Complete localization for Spanish speakers

### Enhanced Features (v2.0)

- **🏷️ Player Name Customization**: Set custom names for each player (up to 15 characters)
- **💾 Auto-Save**: Automatic local storage backup every 30 seconds
- **⚠️ Smart Validation**: Real-time warnings when multiple players have the same card
- **📱 Enhanced Mobile UX**: Improved touch targets and responsive design
- **🔄 Persistent State**: Automatically restores your game when reopening

## 🚀 Quick Start

1. Open `index.html` in any modern web browser
2. **Set Player Names**: Enter custom names in the "Nombres de Jugadores" section (optional)
3. **Mark Cards**: Click on cells to track card ownership:
   - Empty = Unknown status
   - ✓ = Player has the card
   - ✗ = Player doesn't have the card
4. **Auto-Save**: Your progress saves automatically every 30 seconds
5. **Manual Save**: Use "Guardar Partida" to export game state
6. **Load Game**: Use "Cargar Partida" to import a saved game

## 🎯 Game Categories

- **¿Quién?** (Who?) - 6 characters (Verduzco, Mostaza, Marlene, etc.)
- **¿Con qué?** (With what?) - 6 weapons (Candelabro, Daga, Revólver, etc.)
- **¿Dónde?** (Where?) - 9 locations (Salón de baile, Cocina, Biblioteca, etc.)

## 🛡️ Smart Validation

The app automatically detects and warns you when:

- Multiple players are marked as having the same card
- Validation messages appear below the legend with player names
- Helps prevent common tracking errors during gameplay

## 📱 Mobile Optimization

- **Touch-Friendly**: Minimum 44px touch targets on mobile devices
- **Responsive Layout**: Adapts to screen sizes from 320px to desktop
- **Fast Performance**: Optimized for smooth mobile interactions
- **Accessible**: Proper contrast and readable fonts on small screens

## 🛠️ Technical Details

### Architecture

- **Single File**: Complete self-contained HTML application
- **No Dependencies**: Pure HTML/CSS/JavaScript - no external libraries
- **Client-Side Storage**: Uses localStorage for automatic persistence
- **File Operations**: Browser-native file API for save/load functionality

### Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (ES6+ support required)
- **Mobile Compatible**: iOS Safari, Android Chrome
- **Features Used**: classList API, JSON handling, File API, localStorage

### Data Format

```json
{
  "playerNames": {
    "1": "Alice",
    "2": "Bob"
  },
  "cardStates": {
    "Verduzco-1": "checked",
    "Mostaza-2": "crossed"
  },
  "savedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🚧 Development

### Running Locally

```bash
# Option 1: Direct browser
open index.html

# Option 2: Local server (if needed)
python3 -m http.server 8000
# Visit http://localhost:8000
```

### File Structure

```
clue-digital-scorecard/
├── index.html          # Complete application
├── README.md          # Documentation
└── CLAUDE.md         # AI assistant guidance
```

## 🎮 How to Play

1. **Setup**: Each player enters their name at the top
2. **Deal Cards**: Distribute Clue cards among players as per game rules
3. **Track Cards**: As you learn about cards through gameplay:
   - Mark ✓ for cards you have
   - Mark ✗ for cards you've eliminated
   - Leave empty for unknown status
4. **Validation**: Watch for warnings if you accidentally mark the same card for multiple players
5. **Save/Resume**: Game automatically saves, or manually export for sharing

## License

MIT License
