import { GAME_CARDS } from '../constants/gameData.js';

export const SolutionSection = ({
  gameState,
  setGameState,
  t,
  getTranslatedCardName,
}) => {
  const updateSolution = (field, value) => {
    setGameState((prev) => {
      const newSolution = {
        ...prev.solution,
        [field]: value,
      };

      return {
        ...prev,
        solution: newSolution,
      };
    });
  };

  const { characters, weapons, rooms } = GAME_CARDS;

  return (
    <div className="bg-white p-4 mb-5 border-2 border-black rounded-md shadow-sm">
      <h3 className="text-black mb-4 text-left text-base uppercase tracking-wide font-bold">
        {t('solutionTitle')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-black text-sm font-typewriter uppercase tracking-wide">
            {t('who')}
          </label>
          <select
            value={gameState.solution.who}
            onChange={(e) => updateSolution('who', e.target.value)}
            className="p-2 border-2 border-black text-sm font-typewriter bg-white transition-colors duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50"
          >
            <option value="">{t('selectOption')}</option>
            {characters.map((character) => (
              <option key={character} value={character}>
                {getTranslatedCardName(character)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-black text-sm font-typewriter uppercase tracking-wide">
            {t('withWhat')}
          </label>
          <select
            value={gameState.solution.weapon}
            onChange={(e) => updateSolution('weapon', e.target.value)}
            className="p-2 border-2 border-black text-sm font-typewriter bg-white transition-colors duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50"
          >
            <option value="">{t('selectOption')}</option>
            {weapons.map((weapon) => (
              <option key={weapon} value={weapon}>
                {getTranslatedCardName(weapon)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-black text-sm font-typewriter uppercase tracking-wide">
            {t('where')}
          </label>
          <select
            value={gameState.solution.room}
            onChange={(e) => updateSolution('room', e.target.value)}
            className="p-2 border-2 border-black text-sm font-typewriter bg-white transition-colors duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50"
          >
            <option value="">{t('selectOption')}</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {getTranslatedCardName(room)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
