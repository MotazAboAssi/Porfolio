import type { Language } from '../i18n/translations';

const LANGUAGE_KEY = 'motaz-portfolio-language';

export function readLanguage(): Language {
  try {
    return window.localStorage.getItem(LANGUAGE_KEY) === 'ar' ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

export function saveLanguage(language: Language): void {
  try {
    window.localStorage.setItem(LANGUAGE_KEY, language);
  } catch {
    // Language switching remains functional if storage is unavailable.
  }
}
