import React from 'react';

export const InstructionsSection = ({
  showInstructions,
  setShowInstructions,
  t,
}) => {
  return (
    <div className="mb-5 text-center">
      <button
        className="bg-white text-black border-2 border-black px-3 py-2 md:px-4 cursor-pointer text-sm font-typewriter transition-all duration-200 uppercase font-bold hover:bg-black hover:text-white min-h-11 md:min-h-auto"
        onClick={() => setShowInstructions(!showInstructions)}
      >
        <span>{showInstructions ? '❌' : '❓'}</span> {t('howToUse')}
      </button>
      {showInstructions && (
        <div className="instructions-content bg-white border-2 border-black p-5 mt-4 text-left max-w-4xl mx-auto font-typewriter rounded-md shadow-sm">
          <h4 className="text-black mb-4 text-lg text-center uppercase tracking-wide">
            {t('instructionsTitle')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="bg-gray-50 p-3 border border-black border-l-4">
              <h5 className="text-black mb-2 text-sm font-bold">
                {t('greenTitle')}
              </h5>
              <p
                className="text-gray-600 m-0 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('greenDesc') }}
              />
            </div>
            <div className="bg-gray-50 p-3 border border-black border-l-4">
              <h5 className="text-black mb-2 text-sm font-bold">
                {t('redTitle')}
              </h5>
              <p
                className="text-gray-600 m-0 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('redDesc') }}
              />
            </div>
            <div className="bg-gray-50 p-3 border border-black border-l-4">
              <h5 className="text-black mb-2 text-sm font-bold">
                {t('unmarkedTitle')}
              </h5>
              <p className="text-gray-600 m-0 text-sm leading-relaxed">
                {t('unmarkedDesc')}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 border border-black border-l-4">
            <h5 className="text-black mb-3 font-bold">{t('gameLogicTitle')}</h5>
            <ul className="m-0 pl-5">
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic1') }}
              />
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic2') }}
              />
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic3') }}
              />
              <li
                className="text-gray-600 text-sm leading-relaxed mb-1"
                dangerouslySetInnerHTML={{ __html: t('gameLogic4') }}
              />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
