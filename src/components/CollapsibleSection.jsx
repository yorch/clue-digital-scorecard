export const CollapsibleSection = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className="mb-6">
      {/* Header Section */}
      <div className="bg-paper-white border-2 border-black shadow-lg font-typewriter">
        <button
          aria-expanded={isOpen}
          className="flex items-center justify-center w-full p-4 text-base md:text-lg cursor-pointer transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 text-black"
          onClick={onToggle}
          type="button"
        >
          <span className="text-xl font-bold tracking-wider uppercase mr-3">
            {icon} {title}
          </span>
          <span
            className="text-lg transform transition-transform duration-200"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            ▶
          </span>
        </button>
      </div>

      {/* Content Section */}
      {isOpen && (
        <div className="bg-paper-white border-2 border-black border-t-0 shadow-lg">
          <div className="p-4">{children}</div>
        </div>
      )}
    </div>
  );
};
