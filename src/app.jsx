import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { CluesSection } from './components/CluesSection.jsx';
import { ConfirmModal } from './components/ConfirmModal.jsx';
import { Controls } from './components/Controls.jsx';
import { Footer } from './components/Footer.jsx';
import { GameHistorySection } from './components/GameHistorySection.jsx';
import { GameSection } from './components/GameSection.jsx';
import { Header } from './components/Header.jsx';
import { InstructionsSection } from './components/InstructionsSection.jsx';
import { Legend } from './components/Legend.jsx';
import { NotesSection } from './components/NotesSection.jsx';
import { PlayerNamesSection } from './components/PlayerNamesSection.jsx';
import { SolutionSection } from './components/SolutionSection.jsx';
import { ToastMessages } from './components/ToastMessages.jsx';
import { GAME_CARDS, PLAYER_NUMBERS } from './constants/gameData.js';
import { useAutoSave } from './hooks/useAutoSave.js';
import { useGameHistory } from './hooks/useGameHistory.js';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation.js';
import { useToastMessages } from './hooks/useToastMessages.js';
import { useTranslation } from './hooks/useTranslation.js';
import { calculateProgress } from './utils/gameValidation.js';
import { loadGameHistory, loadGameState, removeStorageItem, StorageKeys } from './utils/localStorage.js';

import './style.css';

export const ClueApp = () => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem(StorageKeys.LANGUAGE) || 'en');
  const [gameState, setGameState] = useState({
    cardStates: {},
    clues: [],
    notes: '',
    playerNames: {},
    solution: { room: '', weapon: '', who: '' },
  });
  const [showInstructions, setShowInstructions] = useState(false);
  const [showPlayerNames, setShowPlayerNames] = useState(true);
  const [showGameHistory, setShowGameHistory] = useState(true);
  const [showScorecard, setShowScorecard] = useState(true);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: '',
    onCancel: null,
    onConfirm: null,
  });

  const { t, getTranslatedCardName } = useTranslation(currentLanguage);

  const {
    messages: validationMessages,
    setMessages: setValidationMessages,
    showMessage,
    clearValidationWarnings,
    addValidationWarning,
  } = useToastMessages();

  useKeyboardNavigation(gameState);

  const { gameHistory, setGameHistory, clearAllHistory } = useGameHistory(gameState, showMessage, t);

  useAutoSave(
    gameState,
    showMessage,
    clearValidationWarnings,
    addValidationWarning,
    t,
    getTranslatedCardName,
    currentLanguage,
  );

  const showConfirm = useCallback(
    (message, onConfirm, onCancel = null) =>
      new Promise((resolve) => {
        setConfirmModal({
          isOpen: true,
          message,
          onCancel: () => {
            setConfirmModal({
              isOpen: false,
              message: '',
              onCancel: null,
              onConfirm: null,
            });
            if (onCancel) {
              onCancel();
            }
            resolve(false);
          },
          onConfirm: () => {
            setConfirmModal({
              isOpen: false,
              message: '',
              onCancel: null,
              onConfirm: null,
            });
            if (onConfirm) {
              onConfirm();
            }
            resolve(true);
          },
        });
      }),
    [],
  );

  const startNewGame = useCallback(() => {
    showConfirm(t('confirmNewGame'), () => {
      // Game will be automatically saved by the useEffect if it's completed

      // Reset game state
      setGameState({
        cardStates: {},
        clues: [],
        notes: '',
        playerNames: {},
        solution: { room: '', weapon: '', who: '' },
      });

      // Clear auto-save
      removeStorageItem(StorageKeys.AUTO_SAVE);
      showMessage(t('newGameStartedMsg'));
    });
  }, [t, showConfirm, showMessage]);

  const calculateProgressFn = useCallback(
    (items, activePlayers = PLAYER_NUMBERS) => calculateProgress(items, gameState.cardStates, activePlayers),
    [gameState.cardStates],
  );

  const setLanguage = useCallback((lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem(StorageKeys.LANGUAGE, lang);
    document.documentElement.setAttribute('data-lang', lang);
  }, []);

  // Load auto-saved data on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: Empty deps is intentional - only run on mount, showMessage is stable
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
  }, []);

  // Initialize language on mount
  useEffect(() => {
    setLanguage(currentLanguage);
  }, [setLanguage, currentLanguage]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 flex justify-center">
          <div className="max-w-screen-xl w-full bg-paper-white border-l-2 border-r-2 border-t-2 border-black m-3 sm:m-4 rounded-lg overflow-hidden shadow-lg">
            <Header currentLanguage={currentLanguage} setLanguage={setLanguage} t={t} />

            <div className="p-3 md:p-5 border-t-2 border-black">
              <PlayerNamesSection
                gameState={gameState}
                setGameState={setGameState}
                setShowPlayerNames={setShowPlayerNames}
                showPlayerNames={showPlayerNames}
                t={t}
              />

              <InstructionsSection
                setShowInstructions={setShowInstructions}
                showInstructions={showInstructions}
                t={t}
              />

              <Legend t={t} />

              <div className="mb-4 flex justify-end">
                <button
                  className="px-4 py-2 text-xs md:text-sm font-typewriter font-bold uppercase tracking-wider bg-paper-white border-2 border-black shadow-lg rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 cursor-pointer"
                  onClick={() => setShowScorecard(!showScorecard)}
                  type="button"
                >
                  {showScorecard ? t('hideScorecard') : t('showScorecard')}
                </button>
              </div>

              <div>
                <GameSection
                  calculateProgress={calculateProgressFn}
                  gameState={gameState}
                  getTranslatedCardName={getTranslatedCardName}
                  isBlurred={!showScorecard}
                  items={GAME_CARDS.characters}
                  setGameState={setGameState}
                  showMessage={showMessage}
                  t={t}
                  title={t('who')}
                />

                <GameSection
                  calculateProgress={calculateProgressFn}
                  gameState={gameState}
                  getTranslatedCardName={getTranslatedCardName}
                  isBlurred={!showScorecard}
                  items={GAME_CARDS.weapons}
                  setGameState={setGameState}
                  showMessage={showMessage}
                  t={t}
                  title={t('withWhat')}
                />

                <GameSection
                  calculateProgress={calculateProgressFn}
                  gameState={gameState}
                  getTranslatedCardName={getTranslatedCardName}
                  isBlurred={!showScorecard}
                  items={GAME_CARDS.rooms}
                  setGameState={setGameState}
                  showMessage={showMessage}
                  t={t}
                  title={t('where')}
                />
              </div>

              <SolutionSection
                gameState={gameState}
                getTranslatedCardName={getTranslatedCardName}
                setGameState={setGameState}
                t={t}
              />

              <NotesSection gameState={gameState} setGameState={setGameState} t={t} />

              <CluesSection gameState={gameState} setGameState={setGameState} t={t} />

              <GameHistorySection
                clearAllHistory={clearAllHistory}
                gameHistory={gameHistory}
                getTranslatedCardName={getTranslatedCardName}
                setGameHistory={setGameHistory}
                setGameState={setGameState}
                setShowGameHistory={setShowGameHistory}
                showConfirm={showConfirm}
                showGameHistory={showGameHistory}
                showMessage={showMessage}
                t={t}
              />
            </div>

            <Controls
              gameState={gameState}
              setGameState={setGameState}
              showConfirm={showConfirm}
              showMessage={showMessage}
              startNewGame={startNewGame}
              t={t}
            />
          </div>
        </div>

        <Footer />
      </div>

      <ToastMessages messages={validationMessages} setValidationMessages={setValidationMessages} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        message={confirmModal.message}
        onCancel={confirmModal.onCancel}
        onConfirm={confirmModal.onConfirm}
        t={t}
      />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ClueApp />);
