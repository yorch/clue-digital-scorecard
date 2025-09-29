import { useEffect, useCallback, useMemo } from 'react';
import { saveGameState } from '../utils/localStorage.js';
import { validateCardAssignments } from '../utils/gameValidation.js';
import { debounce } from '../utils/debounce.js';

const VALIDATION_DEBOUNCE_MS = 300;

/**
 * Custom hook for auto-saving game state and validating card assignments
 * @param {Object} gameState - Current game state
 * @param {Function} showMessage - Function to show toast messages
 * @param {Function} clearValidationWarnings - Function to clear validation warnings
 * @param {Function} addValidationWarning - Function to add validation warning
 * @param {Function} t - Translation function
 * @param {Function} getTranslatedCardName - Function to get translated card name
 * @param {string} currentLanguage - Current language
 * @returns {Object} Auto-save utilities
 */
export function useAutoSave(
  gameState,
  showMessage,
  clearValidationWarnings,
  addValidationWarning,
  t,
  getTranslatedCardName,
  currentLanguage,
) {
  // Auto-save functionality
  const autoSave = useCallback(() => {
    if (!saveGameState(gameState)) {
      showMessage(t('autoSaveFailedMsg') || 'Auto-save failed', 'error');
    }
  }, [gameState, showMessage, t]);

  // Validate card assignments for duplicates
  const validateCardAssignmentsFn = useCallback(() => {
    clearValidationWarnings();

    const warnings = validateCardAssignments(
      gameState,
      t,
      getTranslatedCardName,
      currentLanguage,
    );

    warnings.forEach((warning) => {
      addValidationWarning(warning);
    });
  }, [
    gameState,
    t,
    getTranslatedCardName,
    currentLanguage,
    clearValidationWarnings,
    addValidationWarning,
  ]);

  // Debounced version of validation
  const debouncedValidation = useMemo(
    () => debounce(validateCardAssignmentsFn, VALIDATION_DEBOUNCE_MS),
    [validateCardAssignmentsFn],
  );

  // Auto-save on game state changes
  useEffect(() => {
    autoSave();
    debouncedValidation();
  }, [autoSave, debouncedValidation]);

  return {
    autoSave,
    validateCardAssignmentsFn,
    debouncedValidation,
  };
}
