export const Header = ({ currentLanguage, setLanguage, t }) => (
  <div className="bg-white text-black p-3 md:p-5 text-center relative">
    <h1 className="text-2xl md:text-4xl mb-1 font-bold uppercase tracking-widest">
      🕵️ CLUE
    </h1>
    <p className="text-xs md:text-sm uppercase tracking-wide">
      {t('subtitle')}
    </p>
    <div className="absolute top-3 right-3 md:top-5 md:right-5 flex gap-1 md:gap-3 flex-col md:flex-row items-center">
      <button
        className={`lang-btn bg-white text-black border-2 border-black px-2 py-1 md:px-3 cursor-pointer text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-gray-200 min-w-8 h-6 md:min-w-auto md:h-auto ${currentLanguage === 'es' ? 'active' : ''}`}
        onClick={() => setLanguage('es')}
      >
        🇪🇸 ES
      </button>
      <button
        className={`lang-btn bg-white text-black border-2 border-black px-2 py-1 md:px-3 cursor-pointer text-xs font-typewriter transition-all duration-200 uppercase font-bold hover:bg-gray-200 min-w-8 h-6 md:min-w-auto md:h-auto ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        🇬🇧 EN
      </button>
    </div>
  </div>
);
