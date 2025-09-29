export const Header = ({ currentLanguage, setLanguage, t }) => (
  <div className="bg-white text-black p-3 md:p-5 text-center relative">
    <h1 className="text-2xl md:text-4xl mb-1 font-bold uppercase tracking-widest">
      🕵️ CLUE
    </h1>
    <p className="text-xs md:text-sm uppercase tracking-wide">
      {t('subtitle')}
    </p>
    <div className="absolute top-3 right-3 md:top-5 md:right-5 flex gap-2 items-center">
      <div className="flex bg-paper-white border-2 border-black shadow-lg rounded-lg overflow-hidden">
        <button
          className={`lang-btn px-3 py-2 text-sm md:text-base font-typewriter font-bold uppercase tracking-wider transition-all duration-300 border-r border-black last:border-r-0 min-w-12 md:min-w-16 focus:outline-none ${
            currentLanguage === 'es'
              ? 'bg-black text-white shadow-inner hover:bg-gray-800 focus:bg-gray-800'
              : 'bg-paper-white text-black hover:bg-gray-100 focus:bg-gray-100'
          }`}
          onClick={() => setLanguage('es')}
        >
          ES
        </button>
        <button
          className={`lang-btn px-3 py-2 text-sm md:text-base font-typewriter font-bold uppercase tracking-wider transition-all duration-300 border-r border-black last:border-r-0 min-w-12 md:min-w-16 focus:outline-none ${
            currentLanguage === 'en'
              ? 'bg-black text-white shadow-inner hover:bg-gray-800 focus:bg-gray-800'
              : 'bg-paper-white text-black hover:bg-gray-100 focus:bg-gray-100'
          }`}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
      </div>
    </div>
  </div>
);
