import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

// Game constants
const GAME_CARDS = {
  characters: [
    'mrGreen',
    'colonelMustard',
    'mrsWhite',
    'professorPlum',
    'missScarlet',
    'mrsPeacock',
  ],
  weapons: ['candlestick', 'dagger', 'leadPipe', 'revolver', 'rope', 'wrench'],
  rooms: [
    'ballroom',
    'billiardRoom',
    'conservatory',
    'diningRoom',
    'hall',
    'kitchen',
    'library',
    'lounge',
    'study',
  ],
};

const PLAYER_NUMBERS = [1, 2, 3, 4, 5, 6];

// Language translations
const translations = {
  es: {
    subtitle: 'Tarjeta de Puntuación Digital',
    playerNames: 'Nombres de Jugadores',
    notes: 'Notas',
    notesPlaceholder: 'Escribe tus deducciones, teorías o pistas aquí...',
    player1Label: 'Jugador 1:',
    player2Label: 'Jugador 2:',
    player3Label: 'Jugador 3:',
    player4Label: 'Jugador 4:',
    player5Label: 'Jugador 5:',
    player6Label: 'Jugador 6:',
    player1: 'Jugador 1',
    player2: 'Jugador 2',
    player3: 'Jugador 3',
    player4: 'Jugador 4',
    player5: 'Jugador 5',
    player6: 'Jugador 6',
    // Short mobile versions
    player1Short: 'J1',
    player2Short: 'J2',
    player3Short: 'J3',
    player4Short: 'J4',
    player5Short: 'J5',
    player6Short: 'J6',
    howToUse: '¿Cómo usar la tarjeta?',
    instructionsTitle: '📋 Instrucciones de Uso',
    greenTitle: '1. ✅ Verde (Tiene la carta)',
    greenDesc:
      '<strong>Solo UNA persona</strong> puede tener cada carta. Marca verde cuando sepas con certeza quién la tiene.',
    redTitle: '2. ❌ Rojo (No la tiene)',
    redDesc:
      '<strong>Múltiples personas</strong> pueden no tener la misma carta. Marca rojo cuando elimines jugadores.',
    unmarkedTitle: '3. ⚪ Sin marcar (Desconocido)',
    unmarkedDesc: 'No sabes si este jugador tiene o no esta carta.',
    gameLogicTitle: '🎯 Lógica del Juego:',
    gameLogic1:
      '<strong>Cada carta existe solo una vez</strong> en todo el juego',
    gameLogic2:
      '<strong>21 cartas total:</strong> 18 repartidas + 3 en el sobre del misterio',
    gameLogic3:
      '<strong>Proceso de eliminación:</strong> Si 5 jugadores no tienen una carta, el 6º la tiene',
    gameLogic4:
      '<strong>Auto-completado:</strong> Al marcar que alguien tiene una carta, los demás se marcan automáticamente como "no la tienen"',
    legendUnknown: 'Desconocido',
    legendHasCard: 'Tiene la carta',
    legendNoCard: 'No la tiene',
    solutionTitle: '🔍 Solución del Misterio',
    who: '¿Quién?',
    withWhat: '¿Con qué?',
    where: '¿Dónde?',
    character: 'Personaje',
    weapon: 'Arma',
    room: 'Lugar',
    downloadGame: 'Descargar Partida',
    uploadGame: 'Cargar Partida',
    clearAll: 'Limpiar Cartas',
    clearPlayers: 'Limpiar Jugadores',
    clearSolution: 'Limpiar Solución',
    newGame: 'Nueva Partida',
    previousGames: 'Partidas Anteriores',
    gameHistory: 'Historial de Partidas',
    noGamesPlayed: 'No hay partidas anteriores',
    gameCompleted: 'Partida Completada',
    loadPreviousGame: 'Cargar esta partida',
    deletePreviousGame: 'Eliminar esta partida',
    confirmNewGame:
      '¿Estás seguro de que quieres comenzar una nueva partida? Se guardará la partida actual si está en progreso.',
    confirmDeleteGame:
      '¿Estás seguro de que quieres eliminar esta partida del historial?',
    gameCompletedMsg: '¡Partida completada y guardada en el historial!',
    newGameStartedMsg: 'Nueva partida iniciada',
    gameDeletedMsg: 'Partida eliminada del historial',
    gameDate: 'Fecha',
    gamePlayers: 'Jugadores',
    gameSolution: 'Solución',
    selectOption: 'Seleccionar...',
    confirmClearAll:
      '¿Estás seguro de que quieres limpiar todas las marcas de cartas?',
    confirmClearPlayers:
      '¿Estás seguro de que quieres limpiar todos los nombres de jugadores?',
    confirmClearSolution: '¿Limpiar la solución del misterio?',
    confirmYes: 'Sí',
    confirmNo: 'No',
    confirmCancel: 'Cancelar',
    cardClearedMsg: 'Todas las marcas de cartas han sido limpiadas',
    playersClearedMsg: 'Nombres de jugadores limpiados',
    solutionClearedMsg: 'Solución limpiada',
    gameSavedMsg: 'Partida guardada exitosamente',
    gameLoadedMsg: '¡Partida cargada exitosamente!',
    errorSaveMsg: 'Error al guardar la partida',
    errorLoadMsg: 'Error al cargar archivo',
    autoSaveFailedMsg: 'Auto-guardado falló',
    errorLoadAutoSaveMsg: 'Error al cargar datos guardados',
    smartFillMsg:
      'Auto-completado: {player} tiene "{card}", otros {count} jugadores marcados automáticamente como "no la tienen"',
    smartUnfillMsg:
      'Auto-limpieza: {player} ya no tiene "{card}", {count} celdas auto-completadas limpiadas',
    helpFirstLoadMsg:
      '💡 Usa Tab y flechas para navegar, Espacio para cambiar estado',
  },
  en: {
    subtitle: 'Digital Score Card',
    playerNames: 'Player Names',
    notes: 'Notes',
    notesPlaceholder: 'Write your deductions, theories, or clues here...',
    player1Label: 'Player 1:',
    player2Label: 'Player 2:',
    player3Label: 'Player 3:',
    player4Label: 'Player 4:',
    player5Label: 'Player 5:',
    player6Label: 'Player 6:',
    player1: 'Player 1',
    player2: 'Player 2',
    player3: 'Player 3',
    player4: 'Player 4',
    player5: 'Player 5',
    player6: 'Player 6',
    // Short mobile versions
    player1Short: 'P1',
    player2Short: 'P2',
    player3Short: 'P3',
    player4Short: 'P4',
    player5Short: 'P5',
    player6Short: 'P6',
    howToUse: 'How to use the card?',
    instructionsTitle: '📋 Instructions',
    greenTitle: '1. ✅ Green (Has the card)',
    greenDesc:
      '<strong>Only ONE person</strong> can have each card. Mark green when you know for certain who has it.',
    redTitle: "2. ❌ Red (Doesn't have it)",
    redDesc:
      '<strong>Multiple people</strong> can not have the same card. Mark red when you eliminate players.',
    unmarkedTitle: '3. ⚪ Unmarked (Unknown)',
    unmarkedDesc: "You don't know if this player has this card or not.",
    gameLogicTitle: '🎯 Game Logic:',
    gameLogic1:
      '<strong>Each card exists only once</strong> in the entire game',
    gameLogic2:
      '<strong>21 cards total:</strong> 18 dealt + 3 in the mystery envelope',
    gameLogic3:
      "<strong>Elimination process:</strong> If 5 players don't have a card, the 6th has it",
    gameLogic4:
      '<strong>Auto-complete:</strong> When marking that someone has a card, others are automatically marked as "don\'t have it"',
    legendUnknown: 'Unknown',
    legendHasCard: 'Has the card',
    legendNoCard: "Doesn't have it",
    solutionTitle: '🔍 Mystery Solution',
    who: 'Who?',
    withWhat: 'With what?',
    where: 'Where?',
    character: 'Character',
    weapon: 'Weapon',
    room: 'Room',
    downloadGame: 'Download Game',
    uploadGame: 'Upload Game',
    clearAll: 'Clear Cards',
    clearPlayers: 'Clear Players',
    clearSolution: 'Clear Solution',
    newGame: 'New Game',
    previousGames: 'Previous Games',
    gameHistory: 'Game History',
    noGamesPlayed: 'No previous games',
    gameCompleted: 'Game Completed',
    loadPreviousGame: 'Load this game',
    deletePreviousGame: 'Delete this game',
    confirmNewGame:
      'Are you sure you want to start a new game? Current game will be saved if in progress.',
    confirmDeleteGame:
      'Are you sure you want to delete this game from history?',
    gameCompletedMsg: 'Game completed and saved to history!',
    newGameStartedMsg: 'New game started',
    gameDeletedMsg: 'Game deleted from history',
    gameDate: 'Date',
    gamePlayers: 'Players',
    gameSolution: 'Solution',
    selectOption: 'Select...',
    confirmClearAll: 'Are you sure you want to clear all card markings?',
    confirmClearPlayers: 'Are you sure you want to clear all player names?',
    confirmClearSolution: 'Clear the mystery solution?',
    confirmYes: 'Yes',
    confirmNo: 'No',
    confirmCancel: 'Cancel',
    cardClearedMsg: 'All card markings have been cleared',
    playersClearedMsg: 'Player names cleared',
    solutionClearedMsg: 'Solution cleared',
    gameSavedMsg: 'Game saved successfully',
    gameLoadedMsg: 'Game loaded successfully!',
    errorSaveMsg: 'Error saving the game',
    errorLoadMsg: 'Error loading file',
    autoSaveFailedMsg: 'Auto-save failed',
    errorLoadAutoSaveMsg: 'Error loading saved data',
    smartFillMsg:
      'Auto-complete: {player} has "{card}", {count} other players automatically marked as "don\'t have it"',
    smartUnfillMsg:
      'Auto-clear: {player} no longer has "{card}", {count} auto-filled cells cleared',
    helpFirstLoadMsg:
      '💡 Use Tab and arrows to navigate, Space to change state',
  },
};

// Card names translations
const cardTranslations = {
  // Characters
  mrGreen: { es: 'Verduzco', en: 'Mr. Green' },
  colonelMustard: { es: 'Mostaza', en: 'Colonel Mustard' },
  mrsWhite: { es: 'Marlene', en: 'Mrs. White' },
  professorPlum: { es: 'Moradillo', en: 'Professor Plum' },
  missScarlet: { es: 'Escarlata', en: 'Miss Scarlet' },
  mrsPeacock: { es: 'Blanca', en: 'Mrs. Peacock' },
  // Weapons
  candlestick: { es: 'Candelabro', en: 'Candlestick' },
  dagger: { es: 'Daga', en: 'Dagger' },
  leadPipe: { es: 'Tubo de plomo', en: 'Lead Pipe' },
  revolver: { es: 'Revólver', en: 'Revolver' },
  rope: { es: 'Soga', en: 'Rope' },
  wrench: { es: 'Llave inglesa', en: 'Wrench' },
  // Rooms
  ballroom: { es: 'Salón de baile', en: 'Ballroom' },
  billiardRoom: { es: 'Sala de billar', en: 'Billiard Room' },
  conservatory: { es: 'Terraza', en: 'Conservatory' },
  diningRoom: { es: 'Comedor', en: 'Dining Room' },
  hall: { es: 'Pasillo', en: 'Hall' },
  kitchen: { es: 'Cocina', en: 'Kitchen' },
  library: { es: 'Biblioteca', en: 'Library' },
  lounge: { es: 'Sala', en: 'Lounge' },
  study: { es: 'Estudio', en: 'Study' },
};

// Main App Component
function ClueApp() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('clue_language') || 'en',
  );
  const [gameState, setGameState] = useState({
    playerNames: {},
    cardStates: {},
    solution: { who: '', weapon: '', room: '' },
    notes: '',
  });
  const [gameHistory, setGameHistory] = useState([]);
  const [validationMessages, setValidationMessages] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showPlayerNames, setShowPlayerNames] = useState(true);
  const [showGameHistory, setShowGameHistory] = useState(true);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [currentFocusedCell, setCurrentFocusedCell] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: '',
    onConfirm: null,
    onCancel: null,
  });

  // Translation helper
  const t = useCallback(
    (key) => {
      return translations[currentLanguage][key] || key;
    },
    [currentLanguage],
  );

  // Get translated card name
  const getTranslatedCardName = useCallback(
    (originalName) => {
      return cardTranslations[originalName]
        ? cardTranslations[originalName][currentLanguage]
        : originalName;
    },
    [currentLanguage],
  );

  // Auto-save functionality
  const autoSave = useCallback(() => {
    try {
      localStorage.setItem('clue_autosave', JSON.stringify(gameState));
    } catch (e) {
      showMessage(t('autoSaveFailedMsg'), 'error');
    }
  }, [gameState, t]);

  // Show message
  const showMessage = useCallback((text, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newMessage = { id, text, type };
    setValidationMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setValidationMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, duration);
  }, []);

  // Custom confirm modal
  const showConfirm = useCallback(
    (message, onConfirm, onCancel = null) =>
      new Promise((resolve) => {
        setConfirmModal({
          isOpen: true,
          message,
          onConfirm: () => {
            setConfirmModal({
              isOpen: false,
              message: '',
              onConfirm: null,
              onCancel: null,
            });
            if (onConfirm) onConfirm();
            resolve(true);
          },
          onCancel: () => {
            setConfirmModal({
              isOpen: false,
              message: '',
              onConfirm: null,
              onCancel: null,
            });
            if (onCancel) onCancel();
            resolve(false);
          },
        });
      }),
    [],
  );

  // Check if game is completed (solution is filled)
  const isGameCompleted = useCallback(
    () =>
      gameState.solution.who &&
      gameState.solution.weapon &&
      gameState.solution.room,
    [gameState.solution],
  );

  // Save completed game to history
  const saveGameToHistory = useCallback(() => {
    if (!isGameCompleted()) {
      return;
    }

    const activePlayers = PLAYER_NUMBERS.filter(
      (playerNum) =>
        gameState.playerNames[playerNum] &&
        gameState.playerNames[playerNum].trim() !== '',
    );

    const completedGame = {
      id: Date.now(),
      playerNames: gameState.playerNames,
      cardStates: gameState.cardStates,
      solution: gameState.solution,
      notes: gameState.notes,
      completedAt: new Date().toISOString(),
      activePlayers: activePlayers,
      version: '1.0',
    };

    const newHistory = [completedGame, ...gameHistory].slice(0, 10); // Keep last 10 games
    setGameHistory(newHistory);
    localStorage.setItem('clue_game_history', JSON.stringify(newHistory));
    showMessage(t('gameCompletedMsg'));
  }, [gameState, gameHistory, isGameCompleted, t, showMessage]);

  // Start new game
  const startNewGame = useCallback(() => {
    showConfirm(t('confirmNewGame'), () => {
      // Save current game if completed
      if (isGameCompleted()) {
        saveGameToHistory();
      }

      // Reset game state
      setGameState({
        playerNames: {},
        cardStates: {},
        solution: { who: '', weapon: '', room: '' },
        notes: '',
      });

      // Clear auto-save
      localStorage.removeItem('clue_autosave');
      showMessage(t('newGameStartedMsg'));
    });
  }, [t, isGameCompleted, saveGameToHistory, showConfirm, showMessage]);

  // Validate card assignments for duplicates
  const validateCardAssignments = useCallback(() => {
    // Clear existing validation warnings
    setValidationMessages((prev) =>
      prev.filter((msg) => msg.type !== 'validation-warning'),
    );

    // Get active players (those with names)
    const activePlayers = PLAYER_NUMBERS.filter(
      (playerNum) =>
        gameState.playerNames[playerNum] &&
        gameState.playerNames[playerNum].trim() !== '',
    );

    const allItems = [
      'mrGreen',
      'colonelMustard',
      'mrsWhite',
      'professorPlum',
      'missScarlet',
      'mrsPeacock',
      'candlestick',
      'dagger',
      'leadPipe',
      'revolver',
      'rope',
      'wrench',
      'ballroom',
      'billiardRoom',
      'conservatory',
      'diningRoom',
      'hall',
      'kitchen',
      'library',
      'lounge',
      'study',
    ];

    const warnings = [];

    allItems.forEach((item) => {
      const checkedPlayers = [];
      // Only check active players (those with names)
      activePlayers.forEach((player) => {
        const key = `${item}-${player}`;
        if (gameState.cardStates[key] === 'checked') {
          checkedPlayers.push(player);
        }
      });

      if (checkedPlayers.length > 1) {
        const playerNames = checkedPlayers
          .map((num) => gameState.playerNames[num] || t(`player${num}`))
          .join(', ');
        const translatedItem = getTranslatedCardName(item);
        const warning = `"${translatedItem}" ${currentLanguage === 'es' ? 'está asignada a múltiples jugadores' : 'is assigned to multiple players'}: ${playerNames}`;
        warnings.push(warning);
      }
    });

    warnings.forEach((warning) => {
      const id = Date.now() + Math.random();
      const warningMessage = { id, text: warning, type: 'validation-warning' };
      setValidationMessages((prev) => [...prev, warningMessage]);
    });
  }, [
    gameState.cardStates,
    gameState.playerNames,
    t,
    getTranslatedCardName,
    currentLanguage,
  ]);

  // Calculate progress for a section (optimized)
  const calculateProgress = useCallback(
    (items, activePlayers = PLAYER_NUMBERS) => {
      let completedRows = 0;
      const cardStates = gameState.cardStates;

      for (const item of items) {
        let hasChecked = false;
        let crossedCount = 0;

        // Only consider active players for progress calculation
        for (const player of activePlayers) {
          const state = cardStates[`${item}-${player}`];
          if (state === 'checked') {
            hasChecked = true;
            break; // Early exit if we found a checked cell
          }
          if (state === 'crossed' || state === 'crossed-auto') {
            crossedCount++;
          }
        }

        // Row is complete if it has at least one checked OR all active players are crossed
        if (hasChecked || crossedCount === activePlayers.length) {
          completedRows++;
        }
      }

      return Math.round((completedRows / items.length) * 100);
    },
    [gameState.cardStates],
  );

  // Set language
  const setLanguage = useCallback((lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('clue_language', lang);
    document.documentElement.setAttribute('data-lang', lang);
  }, []);

  // Load auto-saved data and game history
  useEffect(() => {
    try {
      const saved = localStorage.getItem('clue_autosave');
      if (saved) {
        const data = JSON.parse(saved);
        setGameState({
          playerNames: data.playerNames || {},
          cardStates: data.cardStates || {},
          solution: data.solution || { who: '', weapon: '', room: '' },
          notes: data.notes || '',
        });
      }

      // Load game history
      const history = localStorage.getItem('clue_game_history');
      if (history) {
        setGameHistory(JSON.parse(history));
      }
    } catch (e) {
      showMessage(t('errorLoadAutoSaveMsg'), 'error');
    }
  }, []);

  // Auto-save on game state changes
  useEffect(() => {
    autoSave();
    validateCardAssignments();
  }, [autoSave, validateCardAssignments]);

  // Auto-save completed games to history
  useEffect(() => {
    if (isGameCompleted()) {
      // Only save if this is a new completion (not loading a saved game)
      const previousSolution = JSON.stringify({
        who: gameState.solution.who,
        weapon: gameState.solution.weapon,
        room: gameState.solution.room,
      });

      // Check if this exact game is already in history
      const isDuplicateGame = gameHistory.some(
        (game) =>
          JSON.stringify(game.solution) === previousSolution &&
          JSON.stringify(game.playerNames) ===
            JSON.stringify(gameState.playerNames) &&
          JSON.stringify(game.cardStates) ===
            JSON.stringify(gameState.cardStates),
      );

      if (!isDuplicateGame) {
        saveGameToHistory();
      }
    }
  }, [
    gameState.solution,
    isGameCompleted,
    saveGameToHistory,
    gameHistory,
    gameState.playerNames,
    gameState.cardStates,
  ]);

  // Initialize language on mount
  useEffect(() => {
    setLanguage(currentLanguage);
  }, [setLanguage, currentLanguage]);

  // Keyboard navigation functionality
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only activate keyboard navigation if user presses Tab or arrow keys
      if (
        [
          'Tab',
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          ' ',
          'Enter',
        ].includes(e.key)
      ) {
        setKeyboardNavigation(true);
      }

      if (!keyboardNavigation) return;

      const checkboxCells = Array.from(
        document.querySelectorAll('.checkbox-cell'),
      );
      const currentIndex = currentFocusedCell
        ? checkboxCells.indexOf(currentFocusedCell)
        : -1;

      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          const nextIndex = e.shiftKey
            ? currentIndex <= 0
              ? checkboxCells.length - 1
              : currentIndex - 1
            : currentIndex >= checkboxCells.length - 1
              ? 0
              : currentIndex + 1;
          focusCell(checkboxCells[nextIndex]);
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentFocusedCell) {
            const nextCell =
              checkboxCells[
                Math.min(currentIndex + 1, checkboxCells.length - 1)
              ];
            focusCell(nextCell);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentFocusedCell) {
            const prevCell = checkboxCells[Math.max(currentIndex - 1, 0)];
            focusCell(prevCell);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (currentFocusedCell) {
            // Calculate cells per row based on active players
            const activePlayers =
              Array.from(document.querySelectorAll('th')).length - 1; // -1 for card name column
            const cellsPerRow = Math.max(activePlayers, 1);
            const nextRowIndex = Math.min(
              currentIndex + cellsPerRow,
              checkboxCells.length - 1,
            );
            focusCell(checkboxCells[nextRowIndex]);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentFocusedCell) {
            // Calculate cells per row based on active players
            const activePlayers =
              Array.from(document.querySelectorAll('th')).length - 1; // -1 for card name column
            const cellsPerRow = Math.max(activePlayers, 1);
            const prevRowIndex = Math.max(currentIndex - cellsPerRow, 0);
            focusCell(checkboxCells[prevRowIndex]);
          }
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (currentFocusedCell) {
            currentFocusedCell.click();
          }
          break;
        case 'Escape':
          setKeyboardNavigation(false);
          if (currentFocusedCell) {
            currentFocusedCell.classList.remove('focused-cell');
            setCurrentFocusedCell(null);
          }
          break;
      }
    };

    const focusCell = (cell) => {
      if (currentFocusedCell) {
        currentFocusedCell.classList.remove('focused-cell');
      }
      if (cell) {
        cell.classList.add('focused-cell');
        cell.focus();
        setCurrentFocusedCell(cell);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNavigation, currentFocusedCell]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto bg-paper-white border-l-2 border-r-2 border-t-2 border-black m-3 sm:m-4 rounded-lg overflow-hidden shadow-lg">
        <Header
          currentLanguage={currentLanguage}
          setLanguage={setLanguage}
          t={t}
        />

        <div className="p-3 md:p-5 border-t-2 border-black">
          <PlayerNamesSection
            gameState={gameState}
            setGameState={setGameState}
            t={t}
            showPlayerNames={showPlayerNames}
            setShowPlayerNames={setShowPlayerNames}
          />

          <InstructionsSection
            showInstructions={showInstructions}
            setShowInstructions={setShowInstructions}
            t={t}
          />

          <Legend t={t} />

          <GameSection
            title={t('who')}
            items={GAME_CARDS.characters}
            gameState={gameState}
            setGameState={setGameState}
            t={t}
            getTranslatedCardName={getTranslatedCardName}
            showMessage={showMessage}
            calculateProgress={calculateProgress}
          />

          <GameSection
            title={t('withWhat')}
            items={GAME_CARDS.weapons}
            gameState={gameState}
            setGameState={setGameState}
            t={t}
            getTranslatedCardName={getTranslatedCardName}
            showMessage={showMessage}
            calculateProgress={calculateProgress}
          />

          <GameSection
            title={t('where')}
            items={GAME_CARDS.rooms}
            gameState={gameState}
            setGameState={setGameState}
            t={t}
            getTranslatedCardName={getTranslatedCardName}
            showMessage={showMessage}
            calculateProgress={calculateProgress}
          />

          <SolutionSection
            gameState={gameState}
            setGameState={setGameState}
            t={t}
            getTranslatedCardName={getTranslatedCardName}
            showMessage={showMessage}
            showConfirm={showConfirm}
          />

          <NotesSection
            gameState={gameState}
            setGameState={setGameState}
            t={t}
          />

          <GameHistorySection
            gameHistory={gameHistory}
            setGameHistory={setGameHistory}
            setGameState={setGameState}
            t={t}
            getTranslatedCardName={getTranslatedCardName}
            showMessage={showMessage}
            showGameHistory={showGameHistory}
            setShowGameHistory={setShowGameHistory}
            showConfirm={showConfirm}
          />
        </div>

        <Controls
          gameState={gameState}
          setGameState={setGameState}
          t={t}
          showMessage={showMessage}
          startNewGame={startNewGame}
          showConfirm={showConfirm}
        />
      </div>

      <ToastMessages
        messages={validationMessages}
        setValidationMessages={setValidationMessages}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={confirmModal.onCancel}
        t={t}
      />
    </>
  );
}

// Confirm Modal Component
function ConfirmModal({ isOpen, message, onConfirm, onCancel, t }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-paper-white border-2 border-black max-w-md mx-4 p-6 font-typewriter shadow-lg rounded-lg">
        <div className="text-center">
          <div className="mb-4 text-lg font-bold text-black">{message}</div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onConfirm}
              className="bg-green-500 text-white border-2 border-green-500 px-4 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-green-600 min-h-10"
            >
              ✓ {t('confirmYes')}
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white border-2 border-red-500 px-4 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-600 min-h-10"
            >
              ✗ {t('confirmNo')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Header Component
function Header({ currentLanguage, setLanguage, t }) {
  return (
    <div className="bg-white text-black p-3 md:p-5 text-center relative">
      <h1 className="text-2xl md:text-4xl mb-1 font-bold uppercase tracking-widest">
        🕵️ CLUE
      </h1>
      <p className="text-xs md:text-sm uppercase tracking-wide">
        {t('subtitle')}
      </p>
      <div className="absolute top-3 right-3 md:top-5 md:right-5 flex gap-1 md:gap-3 flex-col md:flex-row items-center">
        <button
          className={`lang-btn bg-white text-black border-2 border-black px-2 py-1 md:px-3 cursor-pointer text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-gray-200 min-w-8 h-6 md:min-w-auto md:h-auto ${currentLanguage === 'es' ? 'active' : ''}`}
          onClick={() => setLanguage('es')}
        >
          🇪🇸 ES
        </button>
        <button
          className={`lang-btn bg-white text-black border-2 border-black px-2 py-1 md:px-3 cursor-pointer text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-gray-200 min-w-8 h-6 md:min-w-auto md:h-auto ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          🇬🇧 EN
        </button>
      </div>
    </div>
  );
}

// Player Names Section Component
function PlayerNamesSection({
  gameState,
  setGameState,
  t,
  showPlayerNames,
  setShowPlayerNames,
}) {
  const updatePlayerName = (playerNumber, name) => {
    setGameState((prev) => ({
      ...prev,
      playerNames: {
        ...prev.playerNames,
        [playerNumber]: name,
      },
    }));
  };

  return (
    <div className="bg-white p-4 mb-5 border-2 border-black rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-black text-left text-base uppercase tracking-wide font-bold">
          {t('playerNames')}
        </h3>
        <button
          className="bg-white text-black border-2 border-black px-3 py-2 md:px-3 md:py-1 cursor-pointer text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-10 md:min-h-auto"
          onClick={() => setShowPlayerNames(!showPlayerNames)}
        >
          <span>{showPlayerNames ? '▲' : '▼'}</span>
        </button>
      </div>
      {showPlayerNames && (
        <div className="collapsible-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAYER_NUMBERS.map((playerNum) => (
            <div key={playerNum} className="flex flex-col gap-1">
              <label className="font-bold text-black text-sm font-typewriter">
                {t(`player${playerNum}Label`)}
              </label>
              <input
                type="text"
                value={gameState.playerNames[playerNum] || ''}
                onChange={(e) => updatePlayerName(playerNum, e.target.value)}
                placeholder={t(`player${playerNum}`)}
                maxLength="15"
                className="p-2 border-2 border-black text-sm font-typewriter transition-colors duration-200 bg-white focus:outline-none focus:border-gray-600 focus:bg-gray-50"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Instructions Section Component
function InstructionsSection({ showInstructions, setShowInstructions, t }) {
  return (
    <div className="mb-5 text-center">
      <button
        className="bg-white text-black border-2 border-black px-3 py-2 md:px-4 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-11 md:min-h-auto"
        onClick={() => setShowInstructions(!showInstructions)}
      >
        <span>{showInstructions ? '❌' : '❓'}</span> {t('howToUse')}
      </button>
      {showInstructions && (
        <div className="instructions-content bg-white border-2 border-black p-5 mt-4 text-left max-w-4xl mx-auto font-typewriter rounded-md shadow-sm">
          <h4 className="text-black mb-4 text-lg text-center uppercase tracking-wide">
            {t('instructionsTitle')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-gray-50 p-3 border border-black border-l-4">
              <h5 className="text-black mb-2 text-sm font-bold">
                {t('greenTitle')}
              </h5>
              <p
                className="text-gray-600 m-0 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('greenDesc') }}
              />
            </div>
            <div className="bg-gray-50 p-3 border border-black border-l-4">
              <h5 className="text-black mb-2 text-sm font-bold">
                {t('redTitle')}
              </h5>
              <p
                className="text-gray-600 m-0 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('redDesc') }}
              />
            </div>
            <div className="bg-gray-50 p-3 border border-black border-l-4">
              <h5 className="text-black mb-2 text-sm font-bold">
                {t('unmarkedTitle')}
              </h5>
              <p className="text-gray-600 m-0 text-sm leading-relaxed">
                {t('unmarkedDesc')}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 border border-black border-l-4">
            <h5 className="text-black mb-3 font-bold">{t('gameLogicTitle')}</h5>
            <ul className="m-0 pl-5">
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic1') }}
              />
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic2') }}
              />
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic3') }}
              />
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic4') }}
              />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Legend Component
function Legend({ t }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-5 my-4 flex-wrap font-typewriter text-sm">
      <div className="flex items-center justify-center gap-2 text-sm p-2 sm:p-0 border sm:border-0 border-black bg-white sm:bg-transparent">
        <div className="legend-box w-5 h-5 border-2 border-black inline-flex items-center justify-center font-bold font-typewriter"></div>
        <span>{t('legendUnknown')}</span>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm p-2 sm:p-0 border sm:border-0 border-black bg-white sm:bg-transparent">
        <div className="legend-box checked w-5 h-5 border-2 border-black inline-flex items-center justify-center font-bold font-typewriter bg-green-500 text-white"></div>
        <span>{t('legendHasCard')}</span>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm p-2 sm:p-0 border sm:border-0 border-black bg-white sm:bg-transparent">
        <div className="legend-box crossed w-5 h-5 border-2 border-black inline-flex items-center justify-center font-bold font-typewriter bg-red-500 text-white"></div>
        <span>{t('legendNoCard')}</span>
      </div>
    </div>
  );
}

// Toast Messages Component (formerly ValidationMessages)
function ToastMessages({ messages, setValidationMessages }) {
  const [removingMessages, setRemovingMessages] = useState(new Set());

  const removeMessage = useCallback(
    (messageId) => {
      setRemovingMessages((prev) => new Set([...prev, messageId]));

      // Remove the message after animation completes
      setTimeout(() => {
        setValidationMessages((prev) =>
          prev.filter((msg) => msg.id !== messageId),
        );
        setRemovingMessages((prev) => {
          const newSet = new Set(prev);
          newSet.delete(messageId);
          return newSet;
        });
      }, 300);
    },
    [setValidationMessages],
  );

  const getToastClass = (message) => {
    const baseClass = 'toast-message';
    const isRemoving = removingMessages.has(message.id) ? ' removing' : '';

    let typeClass = '';
    switch (message.type) {
      case 'error':
        typeClass = ' toast-error';
        break;
      case 'validation-warning':
        typeClass = ' toast-warning';
        break;
      case 'smart-fill':
        typeClass = ' toast-smart-fill';
        break;
      default:
        typeClass = ' toast-success';
    }

    return baseClass + typeClass + isRemoving;
  };

  return (
    <div className="toast-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={getToastClass(message)}
          onClick={() => removeMessage(message.id)}
          title="Click to dismiss"
        >
          <div className="toast-content">
            <span className="toast-icon">
              {message.type === 'error'
                ? '❌'
                : message.type === 'validation-warning'
                  ? '⚠️'
                  : message.type === 'smart-fill'
                    ? '🤖'
                    : '✅'}
            </span>
            <span className="toast-text">{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Solution Section Component
function SolutionSection({
  gameState,
  setGameState,
  t,
  getTranslatedCardName,
  showMessage,
  showConfirm,
}) {
  const updateSolution = (field, value) => {
    setGameState((prev) => {
      const newSolution = {
        ...prev.solution,
        [field]: value,
      };

      return {
        ...prev,
        solution: newSolution,
      };
    });
  };

  const { characters, weapons, rooms } = GAME_CARDS;

  return (
    <div className="bg-white p-4 mb-5 border-2 border-black rounded-md shadow-sm">
      <h3 className="text-black mb-4 text-left text-base uppercase tracking-wide font-bold">
        {t('solutionTitle')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-black text-sm font-typewriter uppercase tracking-wide">
            {t('who')}
          </label>
          <select
            value={gameState.solution.who}
            onChange={(e) => updateSolution('who', e.target.value)}
            className="p-2 border-2 border-black text-sm font-typewriter bg-white transition-colors duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50"
          >
            <option value="">{t('selectOption')}</option>
            {characters.map((character) => (
              <option key={character} value={character}>
                {getTranslatedCardName(character)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-black text-sm font-typewriter uppercase tracking-wide">
            {t('withWhat')}
          </label>
          <select
            value={gameState.solution.weapon}
            onChange={(e) => updateSolution('weapon', e.target.value)}
            className="p-2 border-2 border-black text-sm font-typewriter bg-white transition-colors duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50"
          >
            <option value="">{t('selectOption')}</option>
            {weapons.map((weapon) => (
              <option key={weapon} value={weapon}>
                {getTranslatedCardName(weapon)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-black text-sm font-typewriter uppercase tracking-wide">
            {t('where')}
          </label>
          <select
            value={gameState.solution.room}
            onChange={(e) => updateSolution('room', e.target.value)}
            className="p-2 border-2 border-black text-sm font-typewriter bg-white transition-colors duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50"
          >
            <option value="">{t('selectOption')}</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {getTranslatedCardName(room)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Notes Section Component
function NotesSection({ gameState, setGameState, t }) {
  const [showNotes, setShowNotes] = useState(true);

  const updateNotes = (notes) => {
    setGameState((prev) => ({
      ...prev,
      notes: notes,
    }));
  };

  return (
    <div className="bg-white p-4 mb-5 border-2 border-black rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-black text-left text-base uppercase tracking-wide font-bold">
          📝 {t('notes')}
        </h3>
        <button
          className="bg-white text-black border-2 border-black px-3 py-2 md:px-3 md:py-1 cursor-pointer text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-10 md:min-h-auto"
          onClick={() => setShowNotes(!showNotes)}
        >
          <span>{showNotes ? '▲' : '▼'}</span>
        </button>
      </div>
      {showNotes && (
        <div className="collapsible-content">
          <textarea
            value={gameState.notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder={t('notesPlaceholder')}
            className="w-full p-3 border-2 border-black font-typewriter text-sm min-h-32 resize-y bg-white focus:outline-none focus:border-gray-600 focus:bg-gray-50 transition-colors duration-200 rounded-sm"
            style={{ lineHeight: '1.5' }}
          />
        </div>
      )}
    </div>
  );
}

// Game Section Component (for Characters, Weapons, Rooms)
function GameSection({
  title,
  items,
  gameState,
  setGameState,
  t,
  getTranslatedCardName,
  showMessage,
  calculateProgress,
}) {
  // Get active players (those with names)
  const activePlayers = useMemo(
    () =>
      PLAYER_NUMBERS.filter(
        (playerNum) =>
          gameState.playerNames[playerNum] &&
          gameState.playerNames[playerNum].trim() !== '',
      ),
    [gameState.playerNames],
  );

  const progress = useMemo(
    () => calculateProgress(items, activePlayers),
    [calculateProgress, items, activePlayers],
  );

  const handleCellClick = (item, player) => {
    const key = `${item}-${player}`;
    const currentState = gameState.cardStates[key] || 'empty';

    let newState;
    if (currentState === 'empty') {
      newState = 'checked';
      // Smart fill: mark other players as crossed
      smartFillCard(item, player);
    } else if (currentState === 'checked') {
      newState = 'crossed';
      // Smart unfill: remove auto-filled crossed states
      smartUnfillCard(item, player);
    } else {
      newState = 'empty';
    }

    setGameState((prev) => ({
      ...prev,
      cardStates: {
        ...prev.cardStates,
        [key]: newState,
      },
    }));
  };

  const smartFillCard = (item, playerWithCard) => {
    const playerName =
      gameState.playerNames[playerWithCard] || `Player ${playerWithCard}`;
    let autoFilledCount = 0;
    let cardName;

    setGameState((prev) => {
      const newCardStates = { ...prev.cardStates };
      autoFilledCount = 0; // Reset inside state update for accuracy

      // Only auto-fill for active players (those with names)
      activePlayers.forEach((player) => {
        if (player.toString() === playerWithCard) return;

        const key = `${item}-${player}`;
        if (!newCardStates[key] || newCardStates[key] === 'empty') {
          newCardStates[key] = 'crossed-auto';
          autoFilledCount++;
        }
      });

      // Prepare message inside state update to avoid stale closure
      if (autoFilledCount > 0) {
        cardName = getTranslatedCardName(item);
        const message = t('smartFillMsg')
          .replace('{player}', playerName)
          .replace('{card}', cardName)
          .replace('{count}', autoFilledCount);
        // Use setTimeout to avoid updating state during render
        setTimeout(() => showMessage(message, 'smart-fill'), 0);
      }

      return {
        ...prev,
        cardStates: newCardStates,
      };
    });
  };

  const smartUnfillCard = (item, playerWhoHadCard) => {
    const playerName =
      gameState.playerNames[playerWhoHadCard] || `Player ${playerWhoHadCard}`;
    let autoUnfilledCount = 0;

    setGameState((prev) => {
      const newCardStates = { ...prev.cardStates };
      autoUnfilledCount = 0; // Reset inside state update for accuracy

      // Only auto-unfill for active players (those with names)
      activePlayers.forEach((player) => {
        if (player.toString() === playerWhoHadCard) return;

        const key = `${item}-${player}`;
        if (newCardStates[key] === 'crossed-auto') {
          newCardStates[key] = 'empty';
          autoUnfilledCount++;
        }
      });

      // Prepare message inside state update to avoid stale closure
      if (autoUnfilledCount > 0) {
        const cardName = getTranslatedCardName(item);
        const message = t('smartUnfillMsg')
          .replace('{player}', playerName)
          .replace('{card}', cardName)
          .replace('{count}', autoUnfilledCount);
        // Use setTimeout to avoid updating state during render
        setTimeout(() => showMessage(message, 'smart-fill'), 0);
      }

      return {
        ...prev,
        cardStates: newCardStates,
      };
    });
  };

  const getCellClasses = useCallback(
    (item, player) => {
      const key = `${item}-${player}`;
      const state = gameState.cardStates[key] || 'empty';

      const baseClasses =
        'checkbox-cell w-12 sm:w-14 bg-white cursor-pointer relative min-h-12 sm:min-h-10 text-center transition-all duration-100 border border-black font-typewriter font-bold text-xl p-1 sm:p-0';

      if (state === 'checked') {
        return baseClasses + ' checked';
      } else if (state === 'crossed' || state === 'crossed-auto') {
        return (
          baseClasses +
          ' crossed' +
          (state === 'crossed-auto' ? ' auto-filled' : '')
        );
      }

      return baseClasses;
    },
    [gameState.cardStates],
  );

  const getPlayerName = useCallback(
    (playerNum, isShort = false) => {
      // Use custom player name if available
      if (gameState.playerNames[playerNum]) {
        return gameState.playerNames[playerNum];
      }
      // Use short version for mobile/small headers
      if (isShort) {
        return t(`player${playerNum}Short`);
      }
      // Use full version otherwise
      return t(`player${playerNum}`);
    },
    [gameState.playerNames, t],
  );

  return (
    <div className="mb-6">
      <div className="section-title bg-black text-white px-3 py-2 md:px-4 text-sm md:text-base font-bold text-left mb-3 uppercase tracking-widest font-typewriter relative">
        {title}
        <span className="progress-indicator text-xs md:text-sm py-1 px-2 md:py-auto md:px-auto">
          {progress}%
        </span>
      </div>
      <div className="overflow-x-auto border border-black bg-white rounded-md shadow-sm">
        <table className="w-full border-collapse bg-white font-typewriter">
          <thead>
            <tr>
              <th className="bg-gray-800 text-white p-1 md:p-2 font-bold text-center text-xs border border-black uppercase tracking-wide">
                {title === t('who')
                  ? t('character')
                  : title === t('withWhat')
                    ? t('weapon')
                    : t('room')}
              </th>
              {activePlayers.map((playerNum) => (
                <th
                  key={playerNum}
                  className="bg-gray-800 text-white p-1 md:p-2 font-bold text-center text-xs border border-black uppercase tracking-wide min-w-12"
                >
                  <span className="block sm:hidden">
                    {getPlayerName(playerNum, true)}
                  </span>
                  <span className="hidden sm:block">
                    {getPlayerName(playerNum, false)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="p-2 md:p-3 border border-black text-left font-bold bg-gray-100 text-black text-xs md:text-sm min-w-20">
                  {getTranslatedCardName(item)}
                </td>
                {activePlayers.map((playerNum) => (
                  <td
                    key={playerNum}
                    className={
                      getCellClasses(item, playerNum) +
                      ' w-12 sm:w-14 h-12 sm:h-10 min-w-12 sm:min-w-14'
                    }
                    onClick={() => handleCellClick(item, playerNum.toString())}
                    tabIndex="-1"
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Game History Section Component
function GameHistorySection({
  gameHistory,
  setGameHistory,
  setGameState,
  t,
  getTranslatedCardName,
  showMessage,
  showGameHistory,
  setShowGameHistory,
  showConfirm,
}) {
  const loadPreviousGame = (game) => {
    setGameState({
      playerNames: game.playerNames || {},
      cardStates: game.cardStates || {},
      solution: game.solution || { who: '', weapon: '', room: '' },
      notes: game.notes || '',
    });
    showMessage(t('gameLoadedMsg'));
  };

  const deletePreviousGame = (gameId) => {
    showConfirm(t('confirmDeleteGame'), () => {
      const newHistory = gameHistory.filter((game) => game.id !== gameId);
      setGameHistory(newHistory);
      localStorage.setItem('clue_game_history', JSON.stringify(newHistory));
      showMessage(t('gameDeletedMsg'));
    });
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const formatPlayers = (playerNames) => {
    const activePlayerNames = Object.values(playerNames).filter(
      (name) => name && name.trim() !== '',
    );
    return activePlayerNames.length > 0
      ? activePlayerNames.join(', ')
      : t('noGamesPlayed');
  };

  const formatSolution = (solution) => {
    if (!solution.who || !solution.weapon || !solution.room) {
      return '-';
    }
    return `${getTranslatedCardName(solution.who)} / ${getTranslatedCardName(solution.weapon)} / ${getTranslatedCardName(solution.room)}`;
  };

  if (gameHistory.length === 0) {
    return null;
  }

  return (
    <div className="mb-5">
      <div className="bg-black text-white p-3 text-center font-typewriter">
        <button
          className="flex items-center justify-center w-full text-center p-3 md:p-4 text-sm md:text-base cursor-pointer transition-all duration-200 hover:bg-gray-800"
          onClick={() => setShowGameHistory(!showGameHistory)}
        >
          <span className="text-xl font-bold tracking-wide uppercase mr-2">
            🎮 {t('gameHistory')}
          </span>
          <span className="text-sm">{showGameHistory ? '▼' : '▶'}</span>
        </button>
      </div>
      {showGameHistory && (
        <div className="bg-white border border-black rounded-md shadow-sm">
          {gameHistory.length === 0 ? (
            <div className="p-4 text-center text-gray-600 font-typewriter">
              {t('noGamesPlayed')}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-typewriter text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2 border border-black text-left font-bold uppercase tracking-wide">
                      {t('gameDate')}
                    </th>
                    <th className="p-2 border border-black text-left font-bold uppercase tracking-wide">
                      {t('gamePlayers')}
                    </th>
                    <th className="p-2 border border-black text-left font-bold uppercase tracking-wide">
                      {t('gameSolution')}
                    </th>
                    <th className="p-2 border border-black text-center font-bold uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((game, index) => (
                    <tr
                      key={game.id}
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="p-2 border border-black">
                        {formatDate(game.completedAt)}
                      </td>
                      <td className="p-2 border border-black">
                        {formatPlayers(game.playerNames)}
                      </td>
                      <td className="p-2 border border-black">
                        {formatSolution(game.solution)}
                      </td>
                      <td className="p-2 border border-black text-center">
                        <div className="flex gap-1 justify-center flex-col sm:flex-row">
                          <button
                            onClick={() => loadPreviousGame(game)}
                            className="bg-blue-500 text-white border-2 border-blue-500 px-3 py-2 sm:px-2 sm:py-1 text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-blue-600 min-h-10 sm:min-h-8"
                            title={t('loadPreviousGame')}
                          >
                            📁
                          </button>
                          <button
                            onClick={() => deletePreviousGame(game.id)}
                            className="bg-red-500 text-white border-2 border-red-500 px-3 py-2 sm:px-2 sm:py-1 text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-600 min-h-10 sm:min-h-8"
                            title={t('deletePreviousGame')}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Controls Component
function Controls({
  gameState,
  setGameState,
  t,
  showMessage,
  startNewGame,
  showConfirm,
}) {
  const downloadGame = () => {
    try {
      const fullGameState = {
        playerNames: gameState.playerNames,
        cardStates: gameState.cardStates,
        solution: gameState.solution,
        notes: gameState.notes,
        savedAt: new Date().toISOString(),
        version: '1.0',
      };

      const dataStr = JSON.stringify(fullGameState, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download =
        'clue_game_' + new Date().toISOString().slice(0, 10) + '.json';
      link.click();

      showMessage(t('gameSavedMsg'));
    } catch (error) {
      showMessage(t('errorSaveMsg'), 'error');
    }
  };

  const uploadGame = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            const loadedData = JSON.parse(e.target.result);

            if (
              loadedData.version === '1.0' &&
              loadedData.playerNames &&
              loadedData.cardStates &&
              loadedData.solution
            ) {
              setGameState({
                playerNames: loadedData.playerNames || {},
                cardStates: loadedData.cardStates || {},
                solution: loadedData.solution || {
                  who: '',
                  weapon: '',
                  room: '',
                },
                notes: loadedData.notes || '',
              });
            } else {
              throw new Error('Unsupported file format');
            }

            showMessage(t('gameLoadedMsg'));
          } catch (error) {
            showMessage(t('errorLoadMsg'), 'error');
          }
        };
        reader.readAsText(file);
      }
    };

    input.click();
  };

  const clearAll = () => {
    showConfirm(t('confirmClearAll'), () => {
      setGameState((prev) => ({
        ...prev,
        cardStates: {},
      }));
      showMessage(t('cardClearedMsg'));
    });
  };

  const clearPlayers = () => {
    showConfirm(t('confirmClearPlayers'), () => {
      setGameState((prev) => ({
        ...prev,
        playerNames: {},
      }));
      showMessage(t('playersClearedMsg'));
    });
  };

  const clearSolution = () => {
    showConfirm(t('confirmClearSolution'), () => {
      setGameState((prev) => ({
        ...prev,
        solution: { who: '', weapon: '', room: '' },
      }));
      showMessage(t('solutionClearedMsg'));
    });
  };

  return (
    <div className="bg-white p-3 md:p-4 text-center border-t-2 border-b-2 border-black">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-1 justify-items-center">
        <button
          onClick={startNewGame}
          className="w-full bg-green-500 text-white border-2 border-green-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-green-600 min-h-11"
        >
          {t('newGame')}
        </button>
        <button
          onClick={downloadGame}
          className="w-full bg-white text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-11"
        >
          💾 {t('downloadGame')}
        </button>
        <button
          onClick={uploadGame}
          className="w-full bg-white text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-11"
        >
          📁 {t('uploadGame')}
        </button>
        <button
          onClick={clearAll}
          className="w-full bg-white text-red-500 border-2 border-red-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-500 hover:text-white min-h-11"
        >
          {t('clearAll')}
        </button>
        <button
          onClick={clearPlayers}
          className="w-full bg-white text-red-500 border-2 border-red-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-orange-500 hover:text-white min-h-11"
        >
          {t('clearPlayers')}
        </button>
        <button
          onClick={clearSolution}
          className="w-full bg-white text-red-500 border-2 border-red-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-purple-500 hover:text-white min-h-11"
        >
          {t('clearSolution')}
        </button>
      </div>
    </div>
  );
}

// Render the app using React 18 createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ClueApp />);

export default ClueApp;
