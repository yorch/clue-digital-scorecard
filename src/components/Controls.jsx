export const Controls = ({ gameState, setGameState, t, showMessage, startNewGame, showConfirm }) => {
  const downloadGame = () => {
    try {
      const fullGameState = {
        cardStates: gameState.cardStates,
        notes: gameState.notes,
        playerNames: gameState.playerNames,
        savedAt: new Date().toISOString(),
        solution: gameState.solution,
        version: '1.0',
      };

      const dataStr = JSON.stringify(fullGameState, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `clue_game_${new Date().toISOString().slice(0, 10)}.json`;
      link.click();

      showMessage(t('gameSavedMsg'));
    } catch (_error) {
      showMessage(t('errorSaveMsg'), 'error');
    }
  };

  const uploadGame = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const loadedData = JSON.parse(e.target.result);

            if (
              loadedData.version === '1.0' &&
              loadedData.playerNames &&
              loadedData.cardStates &&
              loadedData.solution
            ) {
              setGameState({
                cardStates: loadedData.cardStates || {},
                notes: loadedData.notes || '',
                playerNames: loadedData.playerNames || {},
                solution: loadedData.solution || {
                  room: '',
                  weapon: '',
                  who: '',
                },
              });
            } else {
              throw new Error('Unsupported file format');
            }

            showMessage(t('gameLoadedMsg'));
          } catch (_error) {
            showMessage(t('errorLoadMsg'), 'error');
          }
        };
        reader.readAsText(file);
      }
    };

    input.click();
  };

  const clearAll = () => {
    showConfirm(t('confirmClearAll'), () => {
      setGameState((prev) => ({
        ...prev,
        cardStates: {},
      }));
      showMessage(t('cardClearedMsg'));
    });
  };

  const clearPlayers = () => {
    showConfirm(t('confirmClearPlayers'), () => {
      setGameState((prev) => ({
        ...prev,
        playerNames: {},
      }));
      showMessage(t('playersClearedMsg'));
    });
  };

  const clearSolution = () => {
    showConfirm(t('confirmClearSolution'), () => {
      setGameState((prev) => ({
        ...prev,
        solution: { room: '', weapon: '', who: '' },
      }));
      showMessage(t('solutionClearedMsg'));
    });
  };

  return (
    <div className="bg-white p-3 md:p-4 text-center border-t-2 border-b-2 border-black">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-1 justify-items-center">
        <button
          className="w-full bg-green-50 text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-green-100 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 min-h-11 rounded"
          onClick={startNewGame}
          type="button"
        >
          {t('newGame')}
        </button>
        <button
          className="w-full bg-blue-50 text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-11 rounded"
          onClick={downloadGame}
          type="button"
        >
          {t('downloadGame')}
        </button>
        <button
          className="w-full bg-blue-50 text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-11 rounded"
          onClick={uploadGame}
          type="button"
        >
          {t('uploadGame')}
        </button>
        <button
          className="w-full bg-red-50 text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-100 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 min-h-11 rounded"
          onClick={clearAll}
          type="button"
        >
          {t('clearAll')}
        </button>
        <button
          className="w-full bg-red-50 text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-100 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 min-h-11 rounded"
          onClick={clearPlayers}
          type="button"
        >
          {t('clearPlayers')}
        </button>
        <button
          className="w-full bg-red-50 text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-100 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 min-h-11 rounded"
          onClick={clearSolution}
          type="button"
        >
          {t('clearSolution')}
        </button>
      </div>
    </div>
  );
};
