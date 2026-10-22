import { useEffect, useState } from 'react';
import type { Language } from '../i18n/translations';
import { readLanguage, saveLanguage } from '../lib/storage';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(readLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    saveLanguage(language);
  }, [language]);

  return { language, setLanguage };
}
