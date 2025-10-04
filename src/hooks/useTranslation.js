import { useCallback } from 'react';
import { cardTranslations, translations } from '../constants/translations.js';

export const useTranslation = (currentLanguage) => {
  // Translation helper
  const t = useCallback((key) => translations[currentLanguage][key] || key, [currentLanguage]);

  // Get translated card name
  const getTranslatedCardName = useCallback(
    (originalName) => (cardTranslations[originalName] ? cardTranslations[originalName][currentLanguage] : originalName),
    [currentLanguage],
  );

  return { getTranslatedCardName, t };
};
