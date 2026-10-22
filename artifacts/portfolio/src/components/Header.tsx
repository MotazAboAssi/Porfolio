import type { Language, TranslationKey } from '../i18n/translations';

type Props = { language: Language; setLanguage: (language: Language) => void; t: (key: TranslationKey) => string };

export function Header({ language, setLanguage, t }: Props) {
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Motaz Feras Aboassi — home">
          <span className="brand-mark" aria-hidden="true">MF</span>
          <span className="brand-name">{language === 'ar' ? 'معتز فراس ابو عاصي' : 'Motaz Feras Aboassi'}</span>
        </a>
        <nav className="nav-group" aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a className="nav-link" href="#services">{t('navServices')}</a>
          <a className="nav-link" href="#projects">{t('navProjects')}</a>
          <a className="nav-link" href="#contact">{t('navContact')}</a>
          <button className="language-button" type="button" onClick={toggleLanguage} aria-label={t('languageLabel')} lang={language === 'en' ? 'ar' : 'en'}>
            {t('switchLanguage')}
          </button>
        </nav>
      </div>
    </header>
  );
}
