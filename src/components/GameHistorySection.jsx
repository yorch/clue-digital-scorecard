import React from 'react';

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
    <div className="mb-5">
      <div className="bg-black text-white p-3 text-center font-typewriter">
        <button
          className="flex items-center justify-center w-full text-center p-3 md:p-4 text-sm md:text-base cursor-pointer transition-all duration-200 hover:bg-gray-800"
          onClick={() => setShowGameHistory(!showGameHistory)}
        >
          <span className="text-xl font-bold tracking-wide uppercase mr-2">
            🎮 {t('gameHistory')}
          </span>
          <span className="text-sm">{showGameHistory ? '▼' : '▶'}</span>
        </button>
      </div>
      {showGameHistory && (
        <div className="bg-white border border-black rounded-md shadow-sm">
          {gameHistory.length === 0 ? (
            <div className="p-4 text-center text-gray-600 font-typewriter">
              {t('noGamesPlayed')}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-typewriter text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2 border border-black text-left font-bold uppercase tracking-wide">
                      {t('gameDate')}
                    </th>
                    <th className="p-2 border border-black text-left font-bold uppercase tracking-wide">
                      {t('gamePlayers')}
                    </th>
                    <th className="p-2 border border-black text-left font-bold uppercase tracking-wide">
                      {t('gameSolution')}
                    </th>
                    <th className="p-2 border border-black text-center font-bold uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((game, index) => (
                    <tr
                      key={game.id}
                      className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="p-2 border border-black">
                        {formatDate(game.completedAt)}
                      </td>
                      <td className="p-2 border border-black">
                        {formatPlayers(game.playerNames)}
                      </td>
                      <td className="p-2 border border-black">
                        {formatSolution(game.solution)}
                      </td>
                      <td className="p-2 border border-black text-center">
                        <div className="flex gap-1 justify-center flex-col sm:flex-row">
                          <button
                            onClick={() => loadPreviousGame(game)}
                            className="bg-blue-500 text-white border-2 border-blue-500 px-3 py-2 sm:px-2 sm:py-1 text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-blue-600 min-h-10 sm:min-h-8"
                            title={t('loadPreviousGame')}
                          >
                            📁
                          </button>
                          <button
                            onClick={() => deletePreviousGame(game.id)}
                            className="bg-red-500 text-white border-2 border-red-500 px-3 py-2 sm:px-2 sm:py-1 text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-600 min-h-10 sm:min-h-8"
                            title={t('deletePreviousGame')}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {gameHistory.length > 0 && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={handleClearAllHistory}
                    className="w-full bg-red-600 text-white border-2 border-red-600 px-4 py-2 font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-700 hover:border-red-700 rounded"
                    title={t('clearAllHistory')}
                  >
                    🗑️ {t('clearAllHistory')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
