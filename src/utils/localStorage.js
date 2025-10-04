/**
 * LocalStorage utility functions with error handling
 */

export const StorageKeys = {
  AUTO_SAVE: 'clue_autosave',
  GAME_HISTORY: 'clue_game_history',
  LANGUAGE: 'clue_language',
};

/**
 * Safely get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found or error
 * @returns {*} Parsed value or defaultValue
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

/**
 * Safely set item to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
    return false;
  }
}

/**
 * Safely remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(`Error removing ${key} from localStorage:`, e);
    return false;
  }
}

/**
 * Load game state from localStorage
 * @returns {Object} Game state object
 */
export function loadGameState() {
  const saved = getStorageItem(StorageKeys.AUTO_SAVE);

  console.debug('Loaded game state from localStorage:', saved);

  if (!saved) {
    return {
      cardStates: {},
      clues: [],
      notes: '',
      playerNames: {},
      solution: { room: '', weapon: '', who: '' },
    };
  }

  return {
    cardStates: saved.cardStates || {},
    clues: saved.clues || [],
    notes: saved.notes || '',
    playerNames: saved.playerNames || {},
    solution: saved.solution || { room: '', weapon: '', who: '' },
  };
}

/**
 * Save game state to localStorage
 * @param {Object} gameState - Game state to save
 * @returns {boolean} Success status
 */
export function saveGameState(gameState) {
  console.debug('Saving game state to localStorage:', gameState);

  return setStorageItem(StorageKeys.AUTO_SAVE, gameState);
}

/**
 * Load game history from localStorage
 * @returns {Array} Game history array
 */
export function loadGameHistory() {
  return getStorageItem(StorageKeys.GAME_HISTORY, []);
}

/**
 * Save game history to localStorage
 * @param {Array} history - Game history to save
 * @returns {boolean} Success status
 */
export function saveGameHistory(history) {
  return setStorageItem(StorageKeys.GAME_HISTORY, history);
}
