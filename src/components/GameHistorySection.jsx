import { CollapsibleSection } from './CollapsibleSection.jsx';

export const GameHistorySection = ({
  gameHistory,
  setGameHistory,
  setGameState,
  t,
  getTranslatedCardName,
  showMessage,
  showGameHistory,
  setShowGameHistory,
  showConfirm,
  clearAllHistory,
}) => {
  const loadPreviousGame = (game) => {
    setGameState({
      playerNames: game.playerNames || {},
      cardStates: game.cardStates || {},
      solution: game.solution || { who: '', weapon: '', room: '' },
      notes: game.notes || '',
    });
    showMessage(t('gameLoadedMsg'));
  };

  const deletePreviousGame = (gameId) => {
    showConfirm(t('confirmDeleteGame'), () => {
      const newHistory = gameHistory.filter((game) => game.id !== gameId);
      setGameHistory(newHistory);
      localStorage.setItem('clue_game_history', JSON.stringify(newHistory));
      showMessage(t('gameDeletedMsg'));
    });
  };

  const handleClearAllHistory = () => {
    showConfirm(t('confirmClearAllHistory'), () => {
      clearAllHistory();
    });
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const formatPlayers = (playerNames) => {
    const activePlayerNames = Object.values(playerNames).filter(
      (name) => name && name.trim() !== '',
    );
    return activePlayerNames.length > 0
      ? activePlayerNames.join(', ')
      : t('noGamesPlayed');
  };

  const formatSolution = (solution) => {
    if (!solution.who || !solution.weapon || !solution.room) {
      return '-';
    }
    return `${getTranslatedCardName(solution.who)} / ${getTranslatedCardName(solution.weapon)} / ${getTranslatedCardName(solution.room)}`;
  };

  if (gameHistory.length === 0) {
    return null;
  }

  return (
    <CollapsibleSection
      title={t('gameHistory')}
      icon="📚"
      isOpen={showGameHistory}
      onToggle={() => setShowGameHistory(!showGameHistory)}
    >
      {gameHistory.length === 0 ? (
        <div className="p-2 text-center text-gray-600 font-typewriter text-base">
          <div className="mb-2 text-2xl">🎯</div>
          <p>{t('noGamesPlayed')}</p>
        </div>
      ) : (
        <>
          {/* Games Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-typewriter">
              <thead>
                <tr className="bg-gray-200 text-black border-2 border-black">
                  <th className="p-4 border border-black text-left font-bold uppercase tracking-wider text-sm">
                    📅 {t('gameDate')}
                  </th>
                  <th className="p-4 border border-black text-left font-bold uppercase tracking-wider text-sm">
                    👥 {t('gamePlayers')}
                  </th>
                  <th className="p-4 border border-black text-left font-bold uppercase tracking-wider text-sm">
                    🔍 {t('gameSolution')}
                  </th>
                  <th className="p-4 border border-black text-center font-bold uppercase tracking-wider text-sm">
                    ⚙️ Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.map((game, index) => (
                  <tr
                    key={game.id}
                    className={`transition-colors duration-200 hover:bg-yellow-50 ${
                      index % 2 === 0 ? 'bg-paper-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="p-4 border border-black font-medium">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">🗓️</span>
                        <span className="text-sm">
                          {formatDate(game.completedAt)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 border border-black">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">👤</span>
                        <span
                          className="truncate max-w-32 sm:max-w-none text-sm"
                          title={formatPlayers(game.playerNames)}
                        >
                          {formatPlayers(game.playerNames)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 border border-black">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">🎯</span>
                        <span className="text-sm font-medium text-green-700">
                          {formatSolution(game.solution)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 border border-black">
                      <div className="flex gap-3 justify-center flex-col sm:flex-row items-center">
                        <button
                          onClick={() => loadPreviousGame(game)}
                          className="bg-blue-600 text-white border-2 border-blue-700 px-4 py-2 text-xs font-typewriter font-bold uppercase tracking-wide transition-all duration-200 hover:bg-blue-700 hover:border-blue-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-10 rounded"
                          title={t('loadPreviousGame')}
                        >
                          📂 Load
                        </button>
                        <button
                          onClick={() => deletePreviousGame(game.id)}
                          className="bg-red-600 text-white border-2 border-red-700 px-4 py-2 text-xs font-typewriter font-bold uppercase tracking-wide transition-all duration-200 hover:bg-red-700 hover:border-red-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 min-h-10 rounded"
                          title={t('deletePreviousGame')}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Clear All History Button */}
          <div className="p-4 border-t-2 border-black bg-gray-100 -m-4 mt-4">
            <button
              onClick={handleClearAllHistory}
              className="w-full bg-red-700 text-white border-2 border-red-800 px-6 py-3 font-typewriter font-bold uppercase tracking-wider transition-all duration-200 hover:bg-red-800 hover:border-red-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg text-sm"
              title={t('clearAllHistory')}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-base">🧹</span>
                <span>{t('clearAllHistory')}</span>
              </div>
            </button>
          </div>
        </>
      )}
    </CollapsibleSection>
  );
};
