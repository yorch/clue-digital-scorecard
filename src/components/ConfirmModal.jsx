export const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-paper-white border-2 border-black max-w-md mx-4 p-6 font-typewriter shadow-lg rounded-lg">
        <div className="text-center">
          <div className="mb-4 text-lg font-bold text-black">{message}</div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onConfirm}
              className="bg-green-50 text-black border-2 border-black px-4 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-green-100 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 min-h-10 rounded"
            >
              ✓ {t('confirmYes')}
            </button>
            <button
              onClick={onCancel}
              className="bg-red-50 text-black border-2 border-black px-4 py-2 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-red-100 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 min-h-10 rounded"
            >
              ✗ {t('confirmNo')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
