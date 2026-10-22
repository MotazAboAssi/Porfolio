import type { Language, TranslationKey } from '../i18n/translations';

type Props = { language: Language; t: (key: TranslationKey) => string };

export function Footer({ language, t }: Props) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>{language === 'ar' ? 'معتز فراس ابو عاصي' : 'Motaz Feras Aboassi'} · {t('footerLine')}</span>
        <a className="text-link" href="#top">{t('backTop')} ↑</a>
      </div>
    </footer>
  );
}
