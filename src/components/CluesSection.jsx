import { useState } from 'react';
import { CollapsibleSection } from './CollapsibleSection.jsx';

export const CluesSection = ({ gameState, setGameState, t }) => {
  const [showClues, setShowClues] = useState(true);
  const [newClue, setNewClue] = useState('');

  const addClue = () => {
    if (newClue.trim()) {
      const clue = {
        completed: false,
        id: Date.now(),
        text: newClue.trim(),
      };
      setGameState((prev) => ({
        ...prev,
        clues: [...(prev.clues || []), clue],
      }));
      setNewClue('');
    }
  };

  const toggleClue = (id) => {
    setGameState((prev) => ({
      ...prev,
      clues: prev.clues.map((clue) => (clue.id === id ? { ...clue, completed: !clue.completed } : clue)),
    }));
  };

  const deleteClue = (id) => {
    setGameState((prev) => ({
      ...prev,
      clues: prev.clues.filter((clue) => clue.id !== id),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addClue();
    }
  };

  const clues = gameState.clues || [];
  const completedCount = clues.filter((clue) => clue.completed).length;
  const progressText = clues.length > 0 ? ` (${completedCount}/${clues.length})` : '';

  return (
    <CollapsibleSection
      icon="🔍"
      isOpen={showClues}
      onToggle={() => setShowClues(!showClues)}
      title={`${t('clues')}${progressText}`}
    >
      <div className="flex flex-col gap-3">
        {/* Add new clue */}
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border-2 border-black font-typewriter text-sm bg-white hover:bg-gray-50 focus:outline-none focus:border-gray-600 focus:bg-gray-50 focus:ring-2 focus:ring-gray-300 transition-all duration-200 rounded"
            onChange={(e) => setNewClue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('addCluePlaceholder')}
            type="text"
            value={newClue}
          />
          <button
            className="px-4 py-2 bg-green-50 text-black font-typewriter font-bold text-sm border-2 border-black shadow-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 rounded cursor-pointer uppercase tracking-wide"
            onClick={addClue}
            type="button"
          >
            {t('add')}
          </button>
        </div>

        {/* Clues list */}
        {clues.length === 0 ? (
          <p className="text-gray-500 italic text-sm font-typewriter text-center py-4">{t('noCluesYet')}</p>
        ) : (
          <div className="space-y-2">
            {clues.map((clue) => (
              <div
                className={`flex items-center gap-2 p-3 border-2 border-black rounded transition-all duration-200 ${
                  clue.completed ? 'bg-green-100 opacity-75' : 'bg-white hover:bg-gray-50'
                }`}
                key={clue.id}
              >
                <button
                  aria-label={clue.completed ? t('markIncomplete') : t('markComplete')}
                  className="flex-shrink-0 w-6 h-6 border-2 border-black rounded flex items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 cursor-pointer"
                  onClick={() => toggleClue(clue.id)}
                  type="button"
                >
                  {clue.completed && <span className="text-green-700 font-bold">✓</span>}
                </button>
                <p
                  className={`flex-1 font-typewriter text-sm ${
                    clue.completed ? 'line-through text-gray-600' : 'text-black'
                  }`}
                >
                  {clue.text}
                </p>
                <button
                  aria-label={t('delete')}
                  className="flex-shrink-0 w-6 h-6 bg-paper-white text-black border-2 border-black shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 rounded cursor-pointer"
                  onClick={() => deleteClue(clue.id)}
                  type="button"
                >
                  <span className="block">X</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};
