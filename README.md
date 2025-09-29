# 🕵️ Clue Digital Scorecard

A bilingual digital scorecard for the Clue board game built with React. Track which cards each player has during the game with an intuitive web interface featuring customizable player names, automatic saving, intelligent validation, and full English/Spanish language support.

## ✨ Features

### Core Functionality

- **Interactive Grid**: Click cells to cycle through states (empty → ✓ → ✗)
- **Multi-Player Support**: Up to 6 players with customizable names
- **Save/Load Games**: Export and import game states as JSON files
- **Mobile Responsive**: Optimized for phones, tablets, and desktop
- **Bilingual Interface**: Complete English/Spanish language support with runtime switching

### Enhanced Features (v2.0)

- **🏷️ Player Name Customization**: Set custom names for each player (up to 15 characters)
- **💾 Auto-Save**: Automatic local storage backup every 30 seconds
- **⚠️ Smart Validation**: Real-time warnings when multiple players have the same card
- **📱 Enhanced Mobile UX**: Improved touch targets and responsive design
- **🔄 Persistent State**: Automatically restores your game when reopening

### Advanced Features (v2.1)

- **🔍 Solution Tracking**: Dedicated section to track mystery solution (Who?, With what?, Where?)
- **📊 Progress Indicators**: Real-time completion tracking for each category (e.g., "4/6 (67%)")
- **⌨️ Keyboard Navigation**: Full keyboard support with Tab, arrows, Space, and Escape
- **🎨 Enhanced Visual Feedback**: Row/column highlighting, hover effects, and smooth animations
- **💬 Smart Messaging**: Contextual success and error messages with auto-dismiss
- **🚀 Improved Performance**: React-based optimization with modern patterns and better error recovery
- **🌐 Language Toggle**: Real-time switching between English and Spanish with persistent preference
- **🤖 Smart Auto-Complete**: Intelligent card elimination when a player is confirmed to have a card
- **📋 Interactive Instructions**: Collapsible help section with detailed usage guide

### Architectural Improvements (v2.2)

- **🏗️ Modular Architecture**: Component-based design with reusable CollapsibleSection component
- **🔧 Custom Hooks**: Extracted game logic into specialized hooks (useGameHistory, useKeyboardNavigation)
- **🧹 Clear All History**: One-click button to remove all saved game history with confirmation
- **⚡ Performance Optimization**: Reduced circular dependencies and improved state management
- **📦 Better Code Organization**: Separated components, hooks, and utilities into dedicated directories
- **🛡️ Enhanced Error Handling**: Improved error recovery and user feedback systems

## 🚀 Quick Start

### For End Users

1. Download the latest release and open `dist/index.html` in any modern web browser

### For Development

1. Clone the repository
2. Run `yarn install`
3. Run `yarn dev` to start development server
4. Open browser to `http://localhost:3000/`

### Using the Application

1. **Choose Language**: Toggle between English/Spanish using the language buttons in the top-right
2. **View Instructions**: Click the "How to use the card?" button for detailed guidance (optional)
3. **Set Player Names**: Enter custom names in the "Player Names" section (optional)
4. **Track Solution**: Use the "Mystery Solution" section to track your deductions
5. **Mark Cards**: Click on cells to track card ownership:
   - Empty = Unknown status
   - ✓ = Player has the card
   - ✗ = Player doesn't have the card
6. **Keyboard Navigation**: Use Tab, arrows, Space, and Escape for efficient navigation
7. **Monitor Progress**: Watch real-time completion percentages in section titles
8. **Smart Auto-Complete**: When you mark a card as owned, other players' cells automatically clear
9. **Auto-Save**: Your progress saves automatically every 30 seconds
10. **Manual Save**: Use "Save Game" to export game state
11. **Load Game**: Use "Load Game" to import a saved game

## 🎯 Game Categories

- **Who?** (¿Quién?) - 6 characters (Mr. Green, Colonel Mustard, Mrs. White, etc.)
- **With what?** (¿Con qué?) - 6 weapons (Candlestick, Dagger, Revolver, etc.)
- **Where?** (¿Dónde?) - 9 rooms (Ballroom, Kitchen, Library, etc.)

## 🛡️ Smart Features

### Validation System

- **Duplicate Detection**: Automatically warns when multiple players have the same card
- **Real-Time Feedback**: Validation messages appear instantly with player names
- **Error Prevention**: Helps avoid common tracking mistakes during gameplay
- **Smart Auto-Complete**: Automatically clears other players when someone is confirmed to have a card

### Solution Management

- **Mystery Tracking**: Dedicated dropdowns for Who?, With what?, and Where?
- **Auto-Save Integration**: Solution choices saved automatically with game state
- **Quick Clear**: One-click solution reset with confirmation
- **Bilingual Labels**: Solution interface adapts to selected language

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

### Interactive Help System

- **Built-in Instructions**: Comprehensive help system accessible via "How to use the card?" button
- **Visual Legend**: Color-coded legend explaining different cell states
- **Context-Sensitive**: Instructions include keyboard shortcuts and navigation tips

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

- **Development**: Modular React application with Vite build system and hot reload
- **Production**: Complete self-contained HTML file (~250KB) with inlined assets
- **Modern Framework**: React 18 with hooks and modern ES6+ features
- **Build System**: Vite with vite-plugin-singlefile for production bundling
- **Styling Framework**: Tailwind CSS with custom typewriter theme (Special Elite font)
- **Design Theme**: Detective/vintage aesthetic with paper-like colors and typewriter fonts
- **Client-Side Storage**: Uses localStorage for automatic persistence and settings
- **File Operations**: Browser-native file API for save/load functionality

### Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (ES6+ and React support required)
- **Mobile Compatible**: iOS Safari, Android Chrome
- **Features Used**: React hooks, JSON handling, File API, localStorage, modern JavaScript

### Data Format

```json
{
  "playerNames": {
    "1": "Alice",
    "2": "Bob"
  },
  "cardStates": {
    "mrGreen-1": "checked",
    "colonelMustard-2": "crossed"
  },
  "solution": {
    "character": "mrGreen",
    "weapon": "dagger",
    "room": "library"
  },
  "language": "en",
  "savedAt": "2024-01-15T10:30:00.000Z",
  "version": "1.0"
}
```

## 🚧 Development

The project uses **Vite build system** for modern development experience while maintaining the ability to build a single HTML file for easy deployment.

### Project Structure

```text
clue-digital-scorecard/
├── src/                  # Source files for development
│   ├── app.jsx          # Main React application
│   ├── components/      # Reusable React components
│   │   ├── CollapsibleSection.jsx
│   │   ├── GameHistorySection.jsx
│   │   ├── PlayerNamesSection.jsx
│   │   ├── NotesSection.jsx
│   │   └── SolutionSection.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useGameHistory.js
│   └── utils/           # Utility functions
│       └── debounce.js
├── dist/                 # Built output (generated)
│   └── index.html        # Complete bundled single-file application (~250KB)
├── index.html           # Entry point that imports from src/
├── vite.config.js       # Vite configuration with single-file plugin
├── package.json         # Project configuration and dependencies
├── README.md            # Project documentation
└── CLAUDE.md           # Claude Code guidance
```

### Development Workflow

```bash
# Install dependencies
yarn install

# Start development server with hot reload
yarn dev
# Opens browser to http://localhost:3000/

# Build the complete single-file version
yarn build
# Creates dist/index.html (~250KB)

# Test the built application
yarn preview
```

### Working with Source Files

**Development Mode:**

- Edit `src/app.jsx` - Complete React application with all components
- Vite provides hot reload for instant feedback
- Development server at `http://localhost:3000/`

**Production Mode:**

- Build creates `dist/index.html` with everything inlined
- Uses vite-plugin-singlefile to bundle CSS and JS into single HTML file

### Build Process

The Vite build system with vite-plugin-singlefile:

- Takes `index.html` as entry point
- Bundles `src/app.jsx` with all React components
- Inlines all CSS and JavaScript into single HTML file
- Creates optimized ~250KB self-contained file

The resulting file can be:

- Opened directly in any modern browser
- Deployed to any web server
- Shared as a single file
- Used offline without any dependencies

## 🎮 How to Play

1. **Setup**: Choose your language (English/Spanish) and enter player names at the top
2. **Learn the Interface**: Click "How to use the card?" for comprehensive instructions
3. **Deal Cards**: Distribute Clue cards among players as per game rules
4. **Track Cards**: As you learn about cards through gameplay:
   - Mark ✓ for cards you have (automatically clears other players)
   - Mark ✗ for cards you've eliminated
   - Leave empty for unknown status
5. **Track Solution**: Use the "Mystery Solution" section to record your deductions
6. **Monitor Progress**: Watch completion percentages to see investigation progress
7. **Navigation**: Use mouse/touch or keyboard (Tab, arrows, Space) for efficient input
8. **Validation**: Watch for warnings if you accidentally mark the same card for multiple players
9. **Game History**: View and manage previously completed games, with option to clear all history
10. **Save/Resume**: Game automatically saves, or manually export for sharing

### Keyboard Shortcuts

- **Tab**: Navigate to next cell
- **Arrow Keys**: Move in any direction
- **Space/Enter**: Toggle cell state (empty → ✓ → ✗ → empty)
- **Escape**: Exit keyboard navigation mode

## License

MIT License
