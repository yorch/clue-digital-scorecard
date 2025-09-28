# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file React-based digital scorecard application for the Clue board game with bilingual support (English/Spanish). The application defaults to English and allows players to track which cards each player has during the game through an interactive web interface with advanced features including player name customization, auto-save, validation, keyboard navigation, and solution tracking.

## Architecture

### Single-File Structure

- **index.html**: Complete self-contained HTML application with embedded React/JSX and CSS (~1200 lines)
- Uses React 18, Babel for JSX transformation, and Tailwind CSS via CDN
- No build process or external files required
- Direct browser execution via file:// protocol or simple HTTP server

### Core Components

1. **Game Data Model**:
   - Three main categories: Characters (Who?), Weapons (With what?), Rooms (Where?)
   - 6 characters (Mr. Green, Colonel Mustard, etc.), 6 weapons (Candlestick, Dagger, etc.), 9 rooms (Ballroom, Kitchen, etc.)
   - Up to 6 players supported
   - Bilingual card names with full translation system

2. **Interactive Grid System**:
   - Tailwind CSS-based responsive table layout
   - Three-state checkbox cells: empty → checked (O) → crossed (X) → empty
   - Click-cycling and keyboard navigation functionality for each player/card combination
   - Row/column highlighting with hover effects

3. **State Management**:
   - React hooks (useState, useEffect, useCallback) for component state
   - Auto-save to localStorage every 30 seconds
   - JSON-based save/load system using browser File API
   - React state management for all game data
   - Language preference stored in localStorage

4. **Solution Tracking**:
   - Dedicated dropdown system for mystery solution (Who?, What?, Where?)
   - Integrated with auto-save system
   - Visual separation from main scorecard grid

5. **Validation System**:
   - Real-time duplicate card detection across players
   - Bilingual warning messages with player name identification
   - Smart logic for progress tracking and completion percentages

6. **Language System**:
   - Complete bilingual support (English/Spanish)
   - Runtime language switching with persistent preference
   - Comprehensive translation system for UI and card names

### UI Features

- **Responsive Design**: Mobile-first approach optimized for all screen sizes (320px+)
- **Keyboard Navigation**: Full keyboard support with Tab, arrows, Space, and Escape keys
- **Visual States**:
  - Empty cells: Gray border with ◯ symbol, clickable
  - Checked cells: Green background with O symbol (player has card)
  - Crossed cells: Red background with X symbol (player doesn't have card)
- **Player Management**: Customizable player names (up to 15 characters) with persistence
- **Auto-Save**: Automatic localStorage backup every 30 seconds with manual JSON export/import
- **Progress Tracking**: Real-time completion percentages displayed in section headers
- **Smart Validation**: Duplicate card warnings with contextual messaging
- **Typewriter Theme**: Special Elite font with paper-like color scheme for vintage detective aesthetic

## Development Commands

### Running Locally

```bash
# Option 1: Direct browser open
open index.html

# Option 2: Simple HTTP server (if needed for testing)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Testing

- No automated test framework
- Manual testing in multiple browsers recommended
- Test responsive behavior at different screen sizes
- Verify save/load functionality with actual JSON files

## Key Technical Details

### State Representation

- React state management with hooks for all game data
- Each cell identified by card key and player number
- Save format includes cardStates, playerNames, solution, language, and metadata:

  ```json
  {
    "playerNames": {"1": "Alice", "2": "Bob"},
    "cardStates": {"mrGreen-1": "checked", "colonelMustard-2": "crossed"},
    "solution": {"character": "mrGreen", "weapon": "dagger", "room": "library"},
    "language": "en",
    "savedAt": "2024-01-15T10:30:00.000Z",
    "version": "1.0"
  }
  ```

### Event Handling

- React component lifecycle with useEffect hooks for initialization
- React event handlers for cell clicks and keyboard navigation
- Auto-save interval timer (30-second intervals) via useEffect
- File operations use HTML5 File API for client-side file handling
- Keyboard event management with focus tracking and smart navigation
- Real-time validation on every state change via React
- No server-side requirements

### Styling Architecture

- Tailwind CSS framework with custom theme configuration
- Typewriter/detective theme with Special Elite font and paper colors
- CSS pseudo-elements (::before, ::after) for symbols and icons
- Responsive design using CSS Grid and Flexbox
- Hover states, focus indicators, and smooth transitions
- Mobile-optimized touch targets (44px minimum)

## Localization

Bilingual application with English as default:

- **Default Language**: English with Spanish as secondary option
- **Language Toggle**: Runtime switching between English/Spanish
- **Translation Coverage**: Complete UI, card names, validation messages, and help text
- **Persistence**: Language preference saved to localStorage
- **Character Section**: "Who?" / "¿Quién?"
- **Weapon Section**: "With what?" / "¿Con qué?"
- **Room Section**: "Where?" / "¿Dónde?"

## Browser Compatibility

- Modern browsers with ES6+ and React support required (Chrome, Firefox, Safari, Edge)
- Key APIs used: React hooks, JSON, File API, localStorage, modern JavaScript features
- External dependencies: React 18 CDN, Babel Standalone CDN, Tailwind CSS CDN, Google Fonts (Special Elite)
- No polyfills included - assumes modern browser environment

## Important Notes

- **Single File Architecture**: React application in index.html (~1200 lines) with JSX
- **No Build Process**: Direct browser execution with Babel transformation
- **State Persistence**: React state with localStorage auto-save and manual JSON export/import
- **Accessibility**: Keyboard navigation, proper contrast, mobile-friendly design, bilingual support
- **Performance**: Modern React patterns, optimized with useCallback/useMemo, minimal external dependencies
