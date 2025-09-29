import { useMemo, useCallback } from 'react';
import { PLAYER_NUMBERS } from '../constants/gameData.js';

export const GameSection = ({
  title,
  items,
  gameState,
  setGameState,
  t,
  getTranslatedCardName,
  showMessage,
  calculateProgress,
}) => {
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
};
