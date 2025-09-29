import { useState, useEffect, useCallback } from 'react';
import { PLAYER_NUMBERS } from '../constants/gameData.js';
import { loadGameHistory, saveGameHistory } from '../utils/localStorage.js';

const MAX_GAME_HISTORY = 10;

/**
 * Custom hook for managing game history
 * @param {Object} gameState - Current game state
 * @param {Function} showMessage - Function to show toast messages
 * @param {Function} t - Translation function
 * @returns {Object} Game history state and utilities
 */
export function useGameHistory(gameState, showMessage, t) {
  const [gameHistory, setGameHistory] = useState([]);

  // Load game history on mount
  useEffect(() => {
    const history = loadGameHistory();
    setGameHistory(history);
  }, []);

  // Check if game is completed
  const isGameCompleted = useCallback(() => {
    return (
      gameState.solution.who &&
      gameState.solution.weapon &&
      gameState.solution.room
    );
  }, [gameState.solution]);

  // Auto-save completed games to history
  useEffect(() => {
    if (!isGameCompleted()) {
      return;
    }

    // Create a stable identifier for the current game state
    const gameIdentifier = JSON.stringify({
      solution: gameState.solution,
      playerNames: gameState.playerNames,
      cardStates: gameState.cardStates,
    });

    // Check if this exact game is already in history
    const isDuplicateGame = gameHistory.some((game) => {
      const existingGameIdentifier = JSON.stringify({
        solution: game.solution,
        playerNames: game.playerNames,
        cardStates: game.cardStates,
      });
      return existingGameIdentifier === gameIdentifier;
    });

    // Only save if this is a new unique game
    if (!isDuplicateGame) {
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

      const newHistory = [completedGame, ...gameHistory].slice(
        0,
        MAX_GAME_HISTORY,
      );

      // Atomic operation: set storage first, then state
      if (saveGameHistory(newHistory)) {
        setGameHistory(newHistory);
        showMessage(t('gameCompletedMsg'));
      } else {
        showMessage(
          t('errorSavingHistoryMsg') || 'Error saving game history',
          'error',
        );
      }
    }
  }, [
    gameState.solution,
    gameState.playerNames,
    gameState.cardStates,
    gameState.notes,
    gameHistory,
    isGameCompleted,
    showMessage,
    t,
  ]);

  return {
    gameHistory,
    setGameHistory,
    isGameCompleted,
  };
}
