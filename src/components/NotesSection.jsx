import React, { useState } from 'react';

export const NotesSection = ({ gameState, setGameState, t }) => {
  const [showNotes, setShowNotes] = useState(true);

  const updateNotes = (notes) => {
    setGameState((prev) => ({
      ...prev,
      notes: notes,
    }));
  };

  return (
    <div className="bg-white p-4 mb-5 border-2 border-black rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-black text-left text-base uppercase tracking-wide font-bold">
          📝 {t('notes')}
        </h3>
        <button
          className="bg-white text-black border-2 border-black px-3 py-2 md:px-3 md:py-1 cursor-pointer text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-10 md:min-h-auto"
          onClick={() => setShowNotes(!showNotes)}
        >
          <span>{showNotes ? '▲' : '▼'}</span>
        </button>
      </div>
      {showNotes && (
        <div className="collapsible-content">
          <textarea
            value={gameState.notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder={t('notesPlaceholder')}
            className="w-full p-3 border-2 border-black font-typewriter text-sm min-h-32 resize-y bg-white focus:outline-none focus:border-gray-600 focus:bg-gray-50 transition-colors duration-200 rounded-sm"
            style={{ lineHeight: '1.5' }}
          />
        </div>
      )}
    </div>
  );
};
