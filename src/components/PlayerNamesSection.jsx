import React from 'react';
import { PLAYER_NUMBERS } from '../constants/gameData.js';

export const PlayerNamesSection = ({
  gameState,
  setGameState,
  t,
  showPlayerNames,
  setShowPlayerNames,
}) => {
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
};
