import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { certifications } from '../data/certifications';
import type { Language, T } from '../i18n/translations';
import { Bidi } from './Bidi';
import { SectionHead } from './SectionHead';
import { ResourceLinks } from './ResourceLinks';
import { publicAssetUrl } from '../lib/assets';

type Props = { language: Language; t: T };

export function Certifications({ language, t }: Props) {
  const [active, setActive] = useState(0);
  const total = certifications.length;
  const c = certifications[active];
  const rtl = language === 'ar';
  const go = (i: number) => setActive(((i % total) + total) % total);
  const pos = (n: number) => `${n} / ${total}`;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const fwd = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd) { e.preventDefault(); go(active + 1); }
    else if (e.key === back) { e.preventDefault(); go(active - 1); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
  };

  return (
    <section className="section section-alt" id="certifications" aria-labelledby="certifications-title">
      <div className="container reveal">
        <SectionHead index="04" id="certifications-title" title={t('certificationsTitle')} aside={t('certificationsAside')} />
        <div className="cert-viewer" role="region" aria-roledescription={t('certCarousel')} aria-label={t('certificationsTitle')} onKeyDown={onKey}>
          <figure className="cert-stage">
            {c.image ? (
              <a className="cert-frame" href={publicAssetUrl(c.image)} target="_blank" rel="noopener noreferrer">
                <img className="cert-img" src={publicAssetUrl(c.image)}
                  alt={`${t('certificateImage')}: ${c.title[language]}`}
                  width={c.imageSize?.[0] ?? 1100} height={c.imageSize?.[1] ?? 790} decoding="async" />
                <span className="sr-only"> — {t('certOpenImage')} {t('opensNewTab')}</span>
              </a>
            ) : <div className="cert-frame cert-frame-empty" aria-hidden="true" />}
          </figure>

          <div className="cert-info" aria-live="polite" aria-atomic="true">
            <p className="cert-count" dir="ltr"><span className="cert-count-now">{String(active + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}</p>
            <h3 className="cert-title"><Bidi text={c.title[language]} language={language} /></h3>
            <dl className="cert-meta">
              <div><dt>{t('issuerLabel')}</dt><dd><Bidi text={c.issuer[language]} language={language} /></dd></div>
              <div><dt>{t('certDateLabel')}</dt><dd><time dir="ltr" dateTime={c.isoDate}><Bidi text={c.date[language]} language={language} /></time></dd></div>
              {c.score && <div><dt>{t('scoreLabel')}</dt><dd className="cert-mono cert-score"><bdi dir="ltr">{c.score}</bdi></dd></div>}
              {c.credentialId && <div><dt>{t('credentialIdLabel')}</dt><dd className="cert-mono"><bdi dir="ltr">{c.credentialId}</bdi></dd></div>}
            </dl>
            <ResourceLinks t={t} context={c.title[language]} resources={[
              { label: 'verifyCredential', href: c.credentialUrl },
              { label: 'certificatePdf', href: c.pdf, file: true },
            ]} />
          </div>

          <div className="cert-nav">
            <button type="button" className="cert-arrow" onClick={() => go(active - 1)} aria-label={t('certPrev')}>
              <svg className="flip-rtl" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <ol className="cert-dots" aria-label={t('certChoose')}>
              {certifications.map((item, i) => (
                <li key={item.title.en}>
                  <button type="button" className="cert-dot" aria-current={i === active ? 'true' : undefined}
                    onClick={() => go(i)}
                    aria-label={`${t('certShow')} ${pos(i + 1)}: ${item.title[language]}`}>
                    <span aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" className="cert-arrow" onClick={() => go(active + 1)} aria-label={t('certNext')}>
              <svg className="flip-rtl" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
