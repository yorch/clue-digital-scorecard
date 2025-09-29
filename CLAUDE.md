# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based digital scorecard application for the Clue board game with bilingual support (English/Spanish). The application defaults to English and allows players to track which cards each player has during the game through an interactive web interface with advanced features including player name customization, auto-save, validation, keyboard navigation, solution tracking, and game history management.

## Architecture

### Development Structure with Vite Build System

- **index.html**: Entry point that imports from `src/app.jsx`
- **src/app.jsx**: Main React application with modular component architecture (reduced from 540 to 295 lines through refactoring)
- **vite.config.js**: Vite configuration with automatic JSX runtime and single-file build plugin
- Uses React 18, Vite for development server and building, and Tailwind CSS via @tailwindcss/vite plugin
- Development mode: Vite dev server with hot reload and automatic JSX transformation
- Production build: Single self-contained HTML file (~250KB)

### Modular Architecture

**Component Structure**:

- **Custom Hooks**: Extracted logic into reusable hooks (`useGameHistory`, `useToastMessages`, `useKeyboardNavigation`, `useAutoSave`)
- **Utility Functions**: Separated concerns into utils (`localStorage`, `gameValidation`, `debounce`)
- **Reusable Components**: `CollapsibleSection` component for consistent styling across all major sections
- **Specialized Components**: Individual components for each major feature area

**Core System Components**:

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
   - Custom hooks for complex state logic (game history, validation, auto-save)
   - Auto-save to localStorage every 30 seconds with error handling
   - JSON-based save/load system using browser File API
   - Atomic localStorage operations to prevent state corruption
   - Language preference stored in localStorage

4. **Solution Tracking**:
   - Collapsible section with dedicated dropdown system for mystery solution (Who?, What?, Where?)
   - Integrated with auto-save system
   - Visual separation from main scorecard grid with thematic icons

5. **Game History Management**:
   - Automatic saving of completed games (up to 10 most recent)
   - Load previous games functionality
   - Individual game deletion with confirmation
   - Clear all history functionality
   - Duplicate game detection to prevent redundant saves

6. **Validation System**:
   - Real-time duplicate card detection across players
   - Bilingual warning messages with player name identification
   - Smart logic for progress tracking and completion percentages
   - Toast notification system with auto-cleanup

7. **Language System**:
   - Complete bilingual support (English/Spanish)
   - Runtime language switching with persistent preference
   - Comprehensive translation system for UI and card names

### UI Features

- **Modern Collapsible Design**: All major sections (Player Names, Notes, Solution, Game History) use consistent collapsible headers with animated arrows
- **Responsive Design**: Mobile-first approach optimized for all screen sizes (320px+)
- **Keyboard Navigation**: Full keyboard support with Tab, arrows, Space, and Escape keys
- **Visual States**:
  - Empty cells: Gray border with ◯ symbol, clickable
  - Checked cells: Green background with O symbol (player has card)
  - Crossed cells: Red background with X symbol (player doesn't have card)
- **Enhanced Form Controls**: Input fields and dropdowns with hover states, focus rings, and improved accessibility
- **Player Management**: Customizable player names (up to 15 characters) with persistence in collapsible section
- **Auto-Save**: Automatic localStorage backup every 30 seconds with manual JSON export/import
- **Progress Tracking**: Real-time completion percentages displayed in section headers
- **Smart Validation**: Duplicate card warnings with contextual messaging and toast notifications
- **Game History Interface**: Professional table with load/delete actions, formatted dates, and bulk clear functionality
- **Typewriter Theme**: Special Elite font with paper-like color scheme and thematic icons for vintage detective aesthetic
- **Consistent Styling**: Unified paper-white sections with black borders, shadows, and smooth animations

## Development Commands

### Development Mode

```bash
# Start Vite development server with hot reload
yarn dev
# Opens browser to http://localhost:3000/
```

### Production Build

```bash
# Build single-file production version
yarn build
# Creates dist/index.html (~250KB single file)
```

### Serving Built Version

```bash
# Serve built version for testing
yarn preview
```

### Testing

- No automated test framework
- Manual testing in multiple browsers recommended
- Test responsive behavior at different screen sizes
- Verify save/load functionality with actual JSON files
- Test both development and production builds

## Key Technical Details

### State Representation

- React state management with hooks for all game data
- Each cell identified by card key and player number
- Save format includes cardStates, playerNames, solution, language, and metadata:

  ```json
  {
    "playerNames": { "1": "Alice", "2": "Bob" },
    "cardStates": { "mrGreen-1": "checked", "colonelMustard-2": "crossed" },
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

### Event Handling

- React component lifecycle with useEffect hooks for initialization
- React event handlers for cell clicks and keyboard navigation
- Auto-save interval timer (30-second intervals) via useEffect
- File operations use HTML5 File API for client-side file handling
- Keyboard event management with focus tracking and smart navigation
- Real-time validation on every state change via React
- No server-side requirements for either development or production builds

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
- External dependencies: React 18 CDN, Tailwind CSS CDN, Google Fonts (Special Elite)
- No polyfills included - assumes modern browser environment

## Important Notes

- **Development Architecture**: Separate source files with Vite build system for development
- **Production Architecture**: Single self-contained HTML file (~220KB) with inlined CSS and JS
- **Build Process**: Vite with vite-plugin-singlefile for production builds
- **Development Process**: Hot reload via Vite dev server at <http://localhost:3000/>
- **State Persistence**: React state with localStorage auto-save and manual JSON export/import
- **Accessibility**: Keyboard navigation, proper contrast, mobile-friendly design, bilingual support
- **Performance**: Modern React patterns, optimized with useCallback/useMemo, minimal external dependencies
- **Deployment**: Production build creates single HTML file that can be opened directly in browsers or served from any web server
