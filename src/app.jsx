import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

// Constants and data
import { GAME_CARDS, PLAYER_NUMBERS } from './constants/gameData.js';

// Hooks and utilities
import { useTranslation } from './hooks/useTranslation.js';
import {
  validateCardAssignments,
  calculateProgress,
} from './utils/gameValidation.js';

// Components
import { Header } from './components/Header.jsx';
import { PlayerNamesSection } from './components/PlayerNamesSection.jsx';
import { InstructionsSection } from './components/InstructionsSection.jsx';
import { Legend } from './components/Legend.jsx';
import { GameSection } from './components/GameSection.jsx';
import { SolutionSection } from './components/SolutionSection.jsx';
import { NotesSection } from './components/NotesSection.jsx';
import { GameHistorySection } from './components/GameHistorySection.jsx';
import { Controls } from './components/Controls.jsx';
import { Footer } from './components/Footer.jsx';
import { ToastMessages } from './components/ToastMessages.jsx';
import { ConfirmModal } from './components/ConfirmModal.jsx';

// Main App Component
export const ClueApp = () => {
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

  // Translation hooks
  const { t, getTranslatedCardName } = useTranslation(currentLanguage);

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
  const validateCardAssignmentsFn = useCallback(() => {
    // Clear existing validation warnings
    setValidationMessages((prev) =>
      prev.filter((msg) => msg.type !== 'validation-warning'),
    );

    const warnings = validateCardAssignments(
      gameState,
      t,
      getTranslatedCardName,
      currentLanguage,
    );

    warnings.forEach((warning) => {
      const id = Date.now() + Math.random();
      const warningMessage = { id, text: warning, type: 'validation-warning' };
      setValidationMessages((prev) => [...prev, warningMessage]);
    });
  }, [gameState, t, getTranslatedCardName, currentLanguage]);

  // Calculate progress for a section (optimized)
  const calculateProgressFn = useCallback(
    (items, activePlayers = PLAYER_NUMBERS) =>
      calculateProgress(items, gameState.cardStates, activePlayers),
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
    validateCardAssignmentsFn();
  }, [autoSave, validateCardAssignmentsFn]);

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
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 flex justify-center">
          <div className="max-w-screen-xl w-full bg-paper-white border-l-2 border-r-2 border-t-2 border-black m-3 sm:m-4 rounded-lg overflow-hidden shadow-lg">
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
                calculateProgress={calculateProgressFn}
              />

              <GameSection
                title={t('withWhat')}
                items={GAME_CARDS.weapons}
                gameState={gameState}
                setGameState={setGameState}
                t={t}
                getTranslatedCardName={getTranslatedCardName}
                showMessage={showMessage}
                calculateProgress={calculateProgressFn}
              />

              <GameSection
                title={t('where')}
                items={GAME_CARDS.rooms}
                gameState={gameState}
                setGameState={setGameState}
                t={t}
                getTranslatedCardName={getTranslatedCardName}
                showMessage={showMessage}
                calculateProgress={calculateProgressFn}
              />

              <SolutionSection
                gameState={gameState}
                setGameState={setGameState}
                t={t}
                getTranslatedCardName={getTranslatedCardName}
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
        </div>

        <Footer />
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
};

// Render the app using React 18 createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ClueApp />);
