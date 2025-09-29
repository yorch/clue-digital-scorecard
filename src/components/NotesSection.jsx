import { useState } from 'react';
import { CollapsibleSection } from './CollapsibleSection.jsx';

export const NotesSection = ({ gameState, setGameState, t }) => {
  const [showNotes, setShowNotes] = useState(true);

  const updateNotes = (notes) => {
    setGameState((prev) => ({
      ...prev,
      notes: notes,
    }));
  };

  return (
    <CollapsibleSection
      title={t('notes')}
      icon="📝"
      isOpen={showNotes}
      onToggle={() => setShowNotes(!showNotes)}
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold text-black text-sm font-typewriter flex items-center gap-2">
          <span className="text-sm">💭</span>
          {t('notesPlaceholder')}
        </label>
        <textarea
          value={gameState.notes}
          onChange={(e) => updateNotes(e.target.value)}
          placeholder={t('notesPlaceholder')}
          className="w-full p-3 border-2 border-black font-typewriter text-sm min-h-32 resize-y bg-white hover:bg-gray-50 focus:outline-none focus:border-gray-600 focus:bg-gray-50 focus:ring-2 focus:ring-gray-300 transition-all duration-200 rounded"
          style={{ lineHeight: '1.5' }}
        />
      </div>
    </CollapsibleSection>
  );
};
