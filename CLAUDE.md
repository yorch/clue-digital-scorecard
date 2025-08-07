# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file digital scorecard application for the Clue board game, implemented in Spanish. The application allows players to track which cards each player has during the game through an interactive web interface.

## Architecture

### Single-File Structure

- **index.html**: Complete self-contained HTML application with embedded CSS and JavaScript
- No build process, dependencies, or external files required
- Direct browser execution via file:// protocol or simple HTTP server

### Core Components

1. **Game Data Model**:
   - Three main categories: ¿Quién? (Characters), ¿Con qué? (Weapons), ¿Dónde? (Locations)
   - 6 characters, 6 weapons, 9 locations
   - Up to 6 players supported

2. **Interactive Grid System**:
   - CSS-based responsive table layout
   - Three-state checkbox cells: empty → checked (✓) → crossed (✗) → empty
   - Click-cycling functionality for each player/card combination

3. **State Management**:
   - Pure JavaScript DOM manipulation
   - JSON-based save/load system using browser file API
   - Local state stored in CSS classes (.checked, .crossed)

### UI Features

- **Responsive Design**: Mobile-first approach with breakpoints at 768px
- **Visual States**:
  - Empty cells: Gray border, clickable
  - Checked cells: Green background with checkmark (player has card)
  - Crossed cells: Red background with X (player doesn't have card)
- **File Operations**: Save game state as JSON, load from JSON file
- **Clear All**: Reset all selections with confirmation dialog

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

- Each cell identified by `data-item` (card name) and `data-player` (1-6)
- State stored as CSS classes on `.checkbox-cell` elements
- Save format: `"CardName-PlayerNumber": "empty|checked|crossed"`

### Event Handling

- Single DOMContentLoaded listener sets up all cell click handlers
- File operations use HTML5 File API for client-side file handling
- No server-side requirements

### Styling Architecture

- Gradient-based design with dark blue/teal theme
- CSS Grid and Flexbox for responsive layouts
- Hover states and smooth transitions for interactive elements
- Mobile-optimized with reduced padding and font sizes

## Localization

All text is in Spanish:

- "¿Quién?" (Who?) - Character section
- "¿Con qué?" (With what?) - Weapon section
- "¿Dónde?" (Where?) - Location section
- UI controls and messages in Spanish

## Browser Compatibility

- Modern browsers with ES6 support required
- Uses: classList API, JSON.parse/stringify, File API, Blob, URL.createObjectURL
- No polyfills included - assumes modern browser environment
