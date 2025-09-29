import { useState } from 'react';
import { GAME_CARDS } from '../constants/gameData.js';
import { CollapsibleSection } from './CollapsibleSection.jsx';

export const SolutionSection = ({
  gameState,
  setGameState,
  t,
  getTranslatedCardName,
}) => {
  const [showSolution, setShowSolution] = useState(true);
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
    <CollapsibleSection
      title={t('solutionTitle')}
      icon="🔍"
      isOpen={showSolution}
      onToggle={() => setShowSolution(!showSolution)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black text-sm font-typewriter flex items-center gap-2">
            <span className="text-sm">👤</span>
            {t('who')}
          </label>
          <select
            value={gameState.solution.who}
            onChange={(e) => updateSolution('who', e.target.value)}
            className="p-3 border-2 border-black text-sm font-typewriter bg-white hover:bg-gray-50 transition-all duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50 focus:ring-2 focus:ring-gray-300 rounded"
          >
            <option value="">{t('selectOption')}</option>
            {characters.map((character) => (
              <option key={character} value={character}>
                {getTranslatedCardName(character)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black text-sm font-typewriter flex items-center gap-2">
            <span className="text-sm">🔪</span>
            {t('withWhat')}
          </label>
          <select
            value={gameState.solution.weapon}
            onChange={(e) => updateSolution('weapon', e.target.value)}
            className="p-3 border-2 border-black text-sm font-typewriter bg-white hover:bg-gray-50 transition-all duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50 focus:ring-2 focus:ring-gray-300 rounded"
          >
            <option value="">{t('selectOption')}</option>
            {weapons.map((weapon) => (
              <option key={weapon} value={weapon}>
                {getTranslatedCardName(weapon)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-black text-sm font-typewriter flex items-center gap-2">
            <span className="text-sm">🏠</span>
            {t('where')}
          </label>
          <select
            value={gameState.solution.room}
            onChange={(e) => updateSolution('room', e.target.value)}
            className="p-3 border-2 border-black text-sm font-typewriter bg-white hover:bg-gray-50 transition-all duration-200 w-full focus:outline-none focus:border-gray-600 focus:bg-gray-50 focus:ring-2 focus:ring-gray-300 rounded"
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
    </CollapsibleSection>
  );
};
