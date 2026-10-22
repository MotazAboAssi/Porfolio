import type { T } from '../i18n/translations';

export function Footer({ t }: { t: T }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© <bdi dir="ltr">{year}</bdi> {t('ownerName')} · {t('footerLine')}</span>
        <a className="text-link" href="#top">{t('backTop')}</a>
      </div>
    </footer>
  );
}
