import { PLAYER_NUMBERS } from '../constants/gameData.js';
import { CollapsibleSection } from './CollapsibleSection.jsx';

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
    <CollapsibleSection
      title={t('playerNames')}
      icon="👥"
      isOpen={showPlayerNames}
      onToggle={() => setShowPlayerNames(!showPlayerNames)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLAYER_NUMBERS.map((playerNum) => (
          <div key={playerNum} className="flex flex-col gap-2">
            <label className="font-bold text-black text-sm font-typewriter">
              {t(`player${playerNum}Label`)}
            </label>
            <input
              type="text"
              value={gameState.playerNames[playerNum] || ''}
              onChange={(e) => updatePlayerName(playerNum, e.target.value)}
              placeholder={t(`player${playerNum}`)}
              maxLength="15"
              className="p-3 border-2 border-black text-sm font-typewriter transition-all duration-200 bg-white hover:bg-gray-50 focus:outline-none focus:border-gray-600 focus:bg-gray-50 focus:ring-2 focus:ring-gray-300 rounded"
            />
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};
