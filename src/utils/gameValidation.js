import { PLAYER_NUMBERS } from '../constants/gameData.js';

export function validateCardAssignments(gameState, t, getTranslatedCardName, currentLanguage) {
  // Get active players (those with names)
  const activePlayers = PLAYER_NUMBERS.filter(
    (playerNum) => gameState.playerNames[playerNum] && gameState.playerNames[playerNum].trim() !== '',
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
      const playerNames = checkedPlayers.map((num) => gameState.playerNames[num] || t(`player${num}`)).join(', ');
      const translatedItem = getTranslatedCardName(item);
      const warning = `"${translatedItem}" ${currentLanguage === 'es' ? 'está asignada a múltiples jugadores' : 'is assigned to multiple players'}: ${playerNames}`;
      warnings.push(warning);
    }
  });

  return warnings;
}

export function calculateProgress(items, cardStates, activePlayers) {
  let completedRows = 0;

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
}
