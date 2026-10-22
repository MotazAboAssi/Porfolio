import { resolveResumeUrl } from '../config/site';
import { useTypewriter } from '../hooks/useTypewriter';
import { rotatingRoles, type Language, type T } from '../i18n/translations';
import { Bidi } from './Bidi';
import { ArrowIcon, DownloadIcon } from './Icons';

type Props = { language: Language; t: T };

export function Hero({ language, t }: Props) {
  const { visibleText } = useTypewriter(rotatingRoles[language]);
  const resumeUrl = resolveResumeUrl();
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker"><Bidi text={t('kicker')} language={language} /></p>
          <h1 id="hero-title">
            <span>{t('heroHeadlineA')}</span> <span>{t('heroHeadlineB')}</span> <span className="accent">{t('heroHeadlineC')}</span>
          </h1>
          <p className="hero-subline"><Bidi text={t('heroSubline')} language={language} /></p>
          <div className="hero-actions">
            <a className="button" href="#contact">{t('startProject')} <ArrowIcon className="flip-rtl" /></a>
            <a className="button button-ghost" href="#projects">{t('viewWork')}</a>
            {resumeUrl && (
              <a className="button button-ghost" href={resumeUrl} download>
                <DownloadIcon /> {t('downloadResume')}
              </a>
            )}
          </div>
          {!resumeUrl && <p className="resume-note"><Bidi text={t('resumePending')} language={language} /></p>}
        </div>

        <aside className="hero-panel" aria-label={t('rolesLabel')}>
          <div className="panel-bar" aria-hidden="true"><i /><i /><i /></div>
          <div className="panel-body">
            <span className="panel-label">{t('rolesLabel')}</span>
            <p className="typed" aria-hidden="true"><span dir={language === 'ar' ? 'rtl' : 'ltr'}><Bidi text={visibleText} language={language} /></span><span className="caret" /></p>
            <p className="sr-only"><Bidi text={t('rolesList')} language={language} /></p>
            <ul className="trust">
              <li>{t('trustFreelance')}</li>
              <li>{t('trustBilingual')}</li>
              <li>{t('trustRemote')}</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
