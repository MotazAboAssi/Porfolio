import type { TranslationKey } from '../i18n/translations';

type Props = { t: (key: TranslationKey) => string };

export function Contact({ t }: Props) {
  return (
    <section className="contact-section section-rule" id="contact" aria-labelledby="contact-title">
      <div className="container reveal">
        <div className="contact-panel">
          <div className="eyebrow">{t('contactEyebrow')}</div>
          <h2 id="contact-title">{t('contactTitle')}</h2>
          <p className="skills-intro">{t('contactNote')}</p>
          <div className="contact-links">
            <a className="contact-link" href="mailto:motazaboassi@gmail.com">
              <span className="contact-link-label">{t('emailLabel')}</span><span className="contact-link-value" dir="ltr">motazaboassi@gmail.com</span>
            </a>
            <a className="contact-link" href="https://github.com/MotazAboAssi" target="_blank" rel="noreferrer">
              <span className="contact-link-label">{t('githubLabel')}</span><span className="contact-link-value" dir="ltr">github.com/MotazAboAssi</span>
            </a>
            <a className="contact-link" href="https://www.linkedin.com/in/motaz-aboassi-bbaab6319/" target="_blank" rel="noreferrer">
              <span className="contact-link-label">{t('linkedinLabel')}</span><span className="contact-link-value" dir="ltr">linkedin.com/in/motaz-aboassi-bbaab6319</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
