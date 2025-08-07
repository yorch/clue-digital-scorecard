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

### Advanced Features (v2.1)

- **🔍 Solution Tracking**: Dedicated section to track mystery solution (¿Quién?, ¿Con qué?, ¿Dónde?)
- **📊 Progress Indicators**: Real-time completion tracking for each category (e.g., "4/6 (67%)")
- **⌨️ Keyboard Navigation**: Full keyboard support with Tab, arrows, Space, and Escape
- **🎨 Enhanced Visual Feedback**: Row/column highlighting, hover effects, and smooth animations
- **💬 Smart Messaging**: Contextual success and error messages with auto-dismiss
- **🚀 Improved Performance**: Optimized interactions and better error recovery

## 🚀 Quick Start

1. Open `index.html` in any modern web browser
2. **Set Player Names**: Enter custom names in the "Nombres de Jugadores" section (optional)
3. **Track Solution**: Use the "Solución del Misterio" section to track your deductions
4. **Mark Cards**: Click on cells to track card ownership:
   - Empty = Unknown status
   - ✓ = Player has the card
   - ✗ = Player doesn't have the card
5. **Keyboard Navigation**: Use Tab, arrows, Space, and Escape for efficient navigation
6. **Monitor Progress**: Watch real-time completion percentages in section titles
7. **Auto-Save**: Your progress saves automatically every 30 seconds
8. **Manual Save**: Use "Guardar Partida" to export game state
9. **Load Game**: Use "Cargar Partida" to import a saved game

## 🎯 Game Categories

- **¿Quién?** (Who?) - 6 characters (Verduzco, Mostaza, Marlene, etc.)
- **¿Con qué?** (With what?) - 6 weapons (Candelabro, Daga, Revólver, etc.)
- **¿Dónde?** (Where?) - 9 locations (Salón de baile, Cocina, Biblioteca, etc.)

## 🛡️ Smart Features

### Validation System

- **Duplicate Detection**: Automatically warns when multiple players have the same card
- **Real-Time Feedback**: Validation messages appear instantly with player names
- **Error Prevention**: Helps avoid common tracking mistakes during gameplay

### Solution Management

- **Mystery Tracking**: Dedicated dropdowns for ¿Quién?, ¿Con qué?, and ¿Dónde?
- **Auto-Save Integration**: Solution choices saved automatically with game state
- **Quick Clear**: One-click solution reset with confirmation

### Progress Tracking

- **Live Updates**: Real-time completion percentages in section headers
- **Smart Logic**: Considers rows complete with checks or fully eliminated cards
- **Visual Indicators**: Easy-to-read progress display (e.g., "4/6 (67%)")

## 📱 User Experience

### Mobile Optimization

- **Touch-Friendly**: Minimum 44px touch targets on mobile devices
- **Responsive Layout**: Adapts to screen sizes from 320px to desktop
- **Fast Performance**: Optimized for smooth mobile interactions
- **Accessible**: Proper contrast and readable fonts on small screens

### Keyboard Navigation

- **Full Support**: Complete keyboard control for power users
- **Navigation Keys**: Tab, Arrow keys, Space/Enter, Escape
- **Visual Feedback**: Blue focus indicator shows current position
- **Smart Activation**: Only activates when keyboard keys are pressed
- **Auto-Scroll**: Focused cells automatically scroll into view

### Visual Feedback

- **Interactive Highlighting**: Hover effects on rows and columns
- **Smooth Animations**: Subtle scaling and color transitions
- **Progress Visualization**: Real-time completion tracking
- **Status Messages**: Success/error feedback with auto-dismiss

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
  "solution": {
    "quien": "Verduzco",
    "arma": "Daga",
    "lugar": "Biblioteca"
  },
  "savedAt": "2024-01-15T10:30:00.000Z",
  "version": "2.1"
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
4. **Track Solution**: Use the green "Solución del Misterio" section to record your deductions
5. **Monitor Progress**: Watch completion percentages to see investigation progress
6. **Navigation**: Use mouse/touch or keyboard (Tab, arrows, Space) for efficient input
7. **Validation**: Watch for warnings if you accidentally mark the same card for multiple players
8. **Save/Resume**: Game automatically saves, or manually export for sharing

### Keyboard Shortcuts

- **Tab**: Navigate to next cell
- **Arrow Keys**: Move in any direction
- **Space/Enter**: Toggle cell state (empty → ✓ → ✗ → empty)
- **Escape**: Exit keyboard navigation mode

## License

MIT License
