import React from 'react';

export const Controls = ({
  gameState,
  setGameState,
  t,
  showMessage,
  startNewGame,
  showConfirm,
}) => {
  const downloadGame = () => {
    try {
      const fullGameState = {
        playerNames: gameState.playerNames,
        cardStates: gameState.cardStates,
        solution: gameState.solution,
        notes: gameState.notes,
        savedAt: new Date().toISOString(),
        version: '1.0',
      };

      const dataStr = JSON.stringify(fullGameState, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download =
        'clue_game_' + new Date().toISOString().slice(0, 10) + '.json';
      link.click();

      showMessage(t('gameSavedMsg'));
    } catch (error) {
      showMessage(t('errorSaveMsg'), 'error');
    }
  };

  const uploadGame = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            const loadedData = JSON.parse(e.target.result);

            if (
              loadedData.version === '1.0' &&
              loadedData.playerNames &&
              loadedData.cardStates &&
              loadedData.solution
            ) {
              setGameState({
                playerNames: loadedData.playerNames || {},
                cardStates: loadedData.cardStates || {},
                solution: loadedData.solution || {
                  who: '',
                  weapon: '',
                  room: '',
                },
                notes: loadedData.notes || '',
              });
            } else {
              throw new Error('Unsupported file format');
            }

            showMessage(t('gameLoadedMsg'));
          } catch (error) {
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
        solution: { who: '', weapon: '', room: '' },
      }));
      showMessage(t('solutionClearedMsg'));
    });
  };

  return (
    <div className="bg-white p-3 md:p-4 text-center border-t-2 border-b-2 border-black">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-1 justify-items-center">
        <button
          onClick={startNewGame}
          className="w-full bg-green-500 text-white border-2 border-green-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-green-600 min-h-11"
        >
          {t('newGame')}
        </button>
        <button
          onClick={downloadGame}
          className="w-full bg-white text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-11"
        >
          💾 {t('downloadGame')}
        </button>
        <button
          onClick={uploadGame}
          className="w-full bg-white text-black border-2 border-black px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-11"
        >
          📁 {t('uploadGame')}
        </button>
        <button
          onClick={clearAll}
          className="w-full bg-white text-red-500 border-2 border-red-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-500 hover:text-white min-h-11"
        >
          {t('clearAll')}
        </button>
        <button
          onClick={clearPlayers}
          className="w-full bg-white text-red-500 border-2 border-red-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-orange-500 hover:text-white min-h-11"
        >
          {t('clearPlayers')}
        </button>
        <button
          onClick={clearSolution}
          className="w-full bg-white text-red-500 border-2 border-red-500 px-2 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-purple-500 hover:text-white min-h-11"
        >
          {t('clearSolution')}
        </button>
      </div>
    </div>
  );
};
