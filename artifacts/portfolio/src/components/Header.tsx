import type { Language, T } from '../i18n/translations';

type Props = { language: Language; setLanguage: (language: Language) => void; t: T };

export function Header({ language, setLanguage, t }: Props) {
  const links = [
    ['#services', t('navServices')],
    ['#skills', t('navSkills')],
    ['#projects', t('navProjects')],
    ['#certifications', t('navCredentials')],
    ['#innovation', t('navInnovation')],
    ['#contact', t('navContact')],
  ] as const;
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label={t('homeLabel')}>
          <span className="brand-mark" aria-hidden="true">MA</span>
          <span className="brand-name">{t('ownerName')}</span>
        </a>
        <nav className="nav" aria-label={t('mainNav')}>
          {links.map(([href, label]) => <a className="nav-link" href={href} key={href}>{label}</a>)}
        </nav>
        <button
          className="lang-button"
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          aria-label={t('languageLabel')}
        >
          <span lang={language === 'en' ? 'ar' : 'en'}>{t('switchLanguage')}</span>
        </button>
      </div>
    </header>
  );
}
