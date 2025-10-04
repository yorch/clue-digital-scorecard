import { useId, useState } from 'react';
import { CollapsibleSection } from './CollapsibleSection.jsx';

export const NotesSection = ({ gameState, setGameState, t }) => {
  const notesId = useId();
  const [showNotes, setShowNotes] = useState(true);

  const updateNotes = (notes) => {
    setGameState((prev) => ({
      ...prev,
      notes: notes,
    }));
  };

  return (
    <CollapsibleSection icon="📝" isOpen={showNotes} onToggle={() => setShowNotes(!showNotes)} title={t('notes')}>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-black text-sm font-typewriter flex items-center gap-2" htmlFor={notesId}>
          <span className="text-sm">💭</span>
          {t('notesPlaceholder')}
        </label>
        <textarea
          className="w-full p-3 border-2 border-black font-typewriter text-sm min-h-32 resize-y bg-white hover:bg-gray-50 focus:outline-none focus:border-gray-600 focus:bg-gray-50 focus:ring-2 focus:ring-gray-300 transition-all duration-200 rounded"
          id={notesId}
          onChange={(e) => updateNotes(e.target.value)}
          placeholder={t('notesPlaceholder')}
          style={{ lineHeight: '1.5' }}
          value={gameState.notes}
        />
      </div>
    </CollapsibleSection>
  );
};
