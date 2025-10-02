import { useState, useEffect, useRef, useCallback } from 'react';
import { PLAYER_NUMBERS } from '../constants/gameData.js';

/**
 * Custom hook for keyboard navigation in the game grid
 * @param {Object} gameState - Current game state
 * @returns {Object} Keyboard navigation state and utilities
 */
export function useKeyboardNavigation(gameState) {
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const focusedCellRef = useRef(null);

  // Memoized selector for checkbox cells
  const getCheckboxCells = useCallback(
    () => Array.from(document.querySelectorAll('.checkbox-cell')),
    [],
  );

  // Memoized calculation of cells per row
  const getCellsPerRow = useCallback(() => {
    const activePlayers = PLAYER_NUMBERS.filter(
      (playerNum) =>
        gameState.playerNames[playerNum] &&
        gameState.playerNames[playerNum].trim() !== '',
    ).length;
    return Math.max(activePlayers, 1);
  }, [gameState.playerNames]);

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

      const checkboxCells = getCheckboxCells();
      const currentIndex = focusedCellRef.current
        ? checkboxCells.indexOf(focusedCellRef.current)
        : -1;

      const focusCell = (cell) => {
        if (focusedCellRef.current) {
          focusedCellRef.current.classList.remove('focused-cell');
        }
        if (cell) {
          cell.classList.add('focused-cell');
          cell.focus();
          focusedCellRef.current = cell;
        }
      };

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
          if (focusedCellRef.current) {
            const nextCell =
              checkboxCells[
                Math.min(currentIndex + 1, checkboxCells.length - 1)
              ];
            focusCell(nextCell);
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (focusedCellRef.current) {
            const prevCell = checkboxCells[Math.max(currentIndex - 1, 0)];
            focusCell(prevCell);
          }
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (focusedCellRef.current) {
            const cellsPerRow = getCellsPerRow();
            const nextRowIndex = Math.min(
              currentIndex + cellsPerRow,
              checkboxCells.length - 1,
            );
            focusCell(checkboxCells[nextRowIndex]);
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (focusedCellRef.current) {
            const cellsPerRow = getCellsPerRow();
            const prevRowIndex = Math.max(currentIndex - cellsPerRow, 0);
            focusCell(checkboxCells[prevRowIndex]);
          }
          break;

        case ' ':
        case 'Enter':
          // Don't prevent default if user is typing in a textarea or input
          if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
            return;
          }
          e.preventDefault();
          if (focusedCellRef.current) {
            focusedCellRef.current.click();
          }
          break;

        case 'Escape':
          setKeyboardNavigation(false);
          if (focusedCellRef.current) {
            focusedCellRef.current.classList.remove('focused-cell');
            focusedCellRef.current = null;
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNavigation, getCheckboxCells, getCellsPerRow]);

  return {
    keyboardNavigation,
    setKeyboardNavigation,
  };
}
