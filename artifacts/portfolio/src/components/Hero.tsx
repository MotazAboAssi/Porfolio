import { useTypewriter } from '../hooks/useTypewriter';
import type { Language, TranslationKey } from '../i18n/translations';

type Props = { language: Language; t: (key: TranslationKey) => string };
const rotatingRoles = ['Full-Stack Developer', 'MERN Stack Engineer', 'Flutter Developer', 'Problem Solver'] as const;

export function Hero({ language, t }: Props) {
  const { visibleText } = useTypewriter(rotatingRoles);
  return (
    <section className="hero container" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-kicker">{t('kicker')}</div>
          <h1 id="hero-title">
            {language === 'ar' ? (
              <><span>{t('heroHeadlineA')}</span><br /><span>{t('heroHeadlineB')}</span><br /><span className="accent">{t('heroHeadlineC')}</span></>
            ) : (
              <><span>{t('heroHeadlineA')}</span><br /><span>{t('heroHeadlineB')}</span><br /><span className="accent">{t('heroHeadlineC')}</span></>
            )}
          </h1>
          <p className="hero-subline">{t('heroSubline')}</p>
          <div className="role-line" aria-live="off" aria-atomic="true">
            <span className="role-caret" aria-hidden="true" />
            <span>{visibleText}</span>
          </div>
          <div className="hero-actions">
            <a className="button" href="#contact">{t('startProject')} <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="#projects">{t('viewWork')}</a>
          </div>
          <div className="trust-line">
            <span>{t('trustFreelance')}</span><span>{t('trustBilingual')}</span><span>{t('trustRemote')}</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit" />
          <div className="monogram">MF</div>
        </div>
      </div>
    </section>
  );
}
