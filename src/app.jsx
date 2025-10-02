import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

// Constants and data
import { GAME_CARDS, PLAYER_NUMBERS } from './constants/gameData.js';

// Hooks and utilities
import { useTranslation } from './hooks/useTranslation.js';
import { calculateProgress } from './utils/gameValidation.js';
import { useToastMessages } from './hooks/useToastMessages.js';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation.js';
import { useGameHistory } from './hooks/useGameHistory.js';
import { useAutoSave } from './hooks/useAutoSave.js';
import {
  StorageKeys,
  loadGameState,
  loadGameHistory,
  removeStorageItem,
} from './utils/localStorage.js';

// Components
import { Header } from './components/Header.jsx';
import { PlayerNamesSection } from './components/PlayerNamesSection.jsx';
import { InstructionsSection } from './components/InstructionsSection.jsx';
import { Legend } from './components/Legend.jsx';
import { GameSection } from './components/GameSection.jsx';
import { SolutionSection } from './components/SolutionSection.jsx';
import { NotesSection } from './components/NotesSection.jsx';
import { CluesSection } from './components/CluesSection.jsx';
import { GameHistorySection } from './components/GameHistorySection.jsx';
import { Controls } from './components/Controls.jsx';
import { Footer } from './components/Footer.jsx';
import { ToastMessages } from './components/ToastMessages.jsx';
import { ConfirmModal } from './components/ConfirmModal.jsx';

// Main App Component
export const ClueApp = () => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem(StorageKeys.LANGUAGE) || 'en',
  );
  const [gameState, setGameState] = useState({
    playerNames: {},
    cardStates: {},
    solution: { who: '', weapon: '', room: '' },
    notes: '',
    clues: [],
  });
  const [showInstructions, setShowInstructions] = useState(false);
  const [showPlayerNames, setShowPlayerNames] = useState(true);
  const [showGameHistory, setShowGameHistory] = useState(true);
  const [showScorecard, setShowScorecard] = useState(true);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: '',
    onConfirm: null,
    onCancel: null,
  });

  // Translation hooks
  const { t, getTranslatedCardName } = useTranslation(currentLanguage);

  // Toast messages hook
  const {
    messages: validationMessages,
    setMessages: setValidationMessages,
    showMessage,
    clearValidationWarnings,
    addValidationWarning,
  } = useToastMessages();

  // Keyboard navigation hook
  useKeyboardNavigation(gameState);

  // Game history hook
  const { gameHistory, setGameHistory, clearAllHistory } = useGameHistory(
    gameState,
    showMessage,
    t,
  );

  // Auto-save hook
  useAutoSave(
    gameState,
    showMessage,
    clearValidationWarnings,
    addValidationWarning,
    t,
    getTranslatedCardName,
    currentLanguage,
  );

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
            if (onConfirm) {
              onConfirm();
            }
            resolve(true);
          },
          onCancel: () => {
            setConfirmModal({
              isOpen: false,
              message: '',
              onConfirm: null,
              onCancel: null,
            });
            if (onCancel) {
              onCancel();
            }
            resolve(false);
          },
        });
      }),
    [],
  );

  // Start new game
  const startNewGame = useCallback(() => {
    showConfirm(t('confirmNewGame'), () => {
      // Game will be automatically saved by the useEffect if it's completed

      // Reset game state
      setGameState({
        playerNames: {},
        cardStates: {},
        solution: { who: '', weapon: '', room: '' },
        notes: '',
        clues: [],
      });

      // Clear auto-save
      removeStorageItem(StorageKeys.AUTO_SAVE);
      showMessage(t('newGameStartedMsg'));
    });
  }, [t, showConfirm, showMessage]);

  // Calculate progress for a section (optimized)
  const calculateProgressFn = useCallback(
    (items, activePlayers = PLAYER_NUMBERS) =>
      calculateProgress(items, gameState.cardStates, activePlayers),
    [gameState.cardStates],
  );

  // Set language
  const setLanguage = useCallback((lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem(StorageKeys.LANGUAGE, lang);
    document.documentElement.setAttribute('data-lang', lang);
  }, []);

  // Load auto-saved data on mount
  useEffect(() => {
    try {
      const savedState = loadGameState();
      setGameState(savedState);

      const history = loadGameHistory();
      setGameHistory(history);
    } catch (e) {
      console.error('Failed to load saved data:', e);
      showMessage('Failed to load saved data. Starting fresh.', 'warning');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps is intentional - only run on mount, showMessage is stable

  // Initialize language on mount
  useEffect(() => {
    setLanguage(currentLanguage);
  }, [setLanguage, currentLanguage]);

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

              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => setShowScorecard(!showScorecard)}
                  className="px-4 py-2 text-xs md:text-sm font-typewriter font-bold uppercase tracking-wider bg-paper-white border-2 border-black shadow-lg rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 cursor-pointer"
                >
                  {showScorecard ? t('hideScorecard') : t('showScorecard')}
                </button>
              </div>

              <div
                className={`transition-all duration-300 ${
                  !showScorecard
                    ? 'blur-md select-none pointer-events-none'
                    : ''
                }`}
              >
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
              </div>

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

              <CluesSection
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
                clearAllHistory={clearAllHistory}
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
