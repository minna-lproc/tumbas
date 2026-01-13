export const calculateWordsTranslated = (translations: Array<{ translation_text: string }>) => {
  return translations.reduce((total, translation) => {
    const words = translation.translation_text.trim().split(/\s+/).filter(Boolean);
    return total + words.length;
  }, 0);
};
