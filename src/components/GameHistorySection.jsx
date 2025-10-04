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
      cardStates: game.cardStates || {},
      notes: game.notes || '',
      playerNames: game.playerNames || {},
      solution: game.solution || { room: '', weapon: '', who: '' },
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
    const activePlayerNames = Object.values(playerNames).filter((name) => name && name.trim() !== '');
    return activePlayerNames.length > 0 ? activePlayerNames.join(', ') : t('noGamesPlayed');
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
      icon="📚"
      isOpen={showGameHistory}
      onToggle={() => setShowGameHistory(!showGameHistory)}
      title={t('gameHistory')}
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
                    className={`transition-colors duration-200 hover:bg-yellow-50 ${
                      index % 2 === 0 ? 'bg-paper-white' : 'bg-gray-50'
                    }`}
                    key={game.id}
                  >
                    <td className="p-4 border border-black font-medium">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">🗓️</span>
                        <span className="text-sm">{formatDate(game.completedAt)}</span>
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
                        <span className="text-sm font-medium text-green-700">{formatSolution(game.solution)}</span>
                      </div>
                    </td>
                    <td className="p-4 border border-black">
                      <div className="flex gap-3 justify-center flex-col sm:flex-row items-center">
                        <button
                          className="bg-paper-white text-black border-2 border-black px-4 py-2 text-xs font-typewriter font-bold uppercase tracking-wide transition-all duration-200 hover:bg-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-10 rounded cursor-pointer"
                          onClick={() => loadPreviousGame(game)}
                          title={t('loadPreviousGame')}
                          type="button"
                        >
                          Load
                        </button>
                        <button
                          className="bg-paper-white text-black border-2 border-black px-4 py-2 text-xs font-typewriter font-bold uppercase tracking-wide transition-all duration-200 hover:bg-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-10 rounded cursor-pointer"
                          onClick={() => deletePreviousGame(game.id)}
                          title={t('deletePreviousGame')}
                          type="button"
                        >
                          X
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
              className="w-full bg-red-50 text-black border-2 border-black px-6 py-3 font-typewriter font-bold uppercase tracking-wider transition-all duration-200 hover:bg-red-100 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg text-sm cursor-pointer"
              onClick={handleClearAllHistory}
              title={t('clearAllHistory')}
              type="button"
            >
              {t('clearAllHistory')}
            </button>
          </div>
        </>
      )}
    </CollapsibleSection>
  );
};
