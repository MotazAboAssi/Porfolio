import { useLayoutEffect, useState } from 'react';
import { translations, type Language } from '../i18n/translations';
import { readLanguage, saveLanguage } from '../lib/storage';

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value);
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(readLanguage);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    const dict = translations[language];
    document.title = dict.metaTitle;
    setMeta('meta[name="description"]', dict.metaDescription);
    setMeta('meta[property="og:title"]', dict.metaTitle);
    setMeta('meta[property="og:description"]', dict.metaDescription);
    setMeta('meta[property="og:locale"]', language === 'ar' ? 'ar_SY' : 'en_US');
    setMeta('meta[name="twitter:title"]', dict.metaTitle);
    setMeta('meta[name="twitter:description"]', dict.metaDescription);
    saveLanguage(language);
  }, [language]);

  return { language, setLanguage };
}
