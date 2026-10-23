import { certifications } from '../data/certifications';
import type { Language, T } from '../i18n/translations';
import { Bidi } from './Bidi';
import { SectionHead } from './SectionHead';
import { ResourceLinks } from './ResourceLinks';
import { publicAssetUrl } from '../lib/assets';

type Props = { language: Language; t: T };

export function Certifications({ language, t }: Props) {
  return (
    <section className="section section-alt" id="certifications" aria-labelledby="certifications-title">
      <div className="container reveal">
        <SectionHead index="04" id="certifications-title" title={t('certificationsTitle')} aside={t('certificationsAside')} />
        <ol className="cred-list">
          {certifications.map((c) => (
            <li className="cred" key={c.title.en}>
              <time className="cred-date" dir="ltr" dateTime={c.isoDate}><Bidi text={c.date[language]} language={language} /></time>
              <div className="cred-main">
                <h3><Bidi text={c.title[language]} language={language} /></h3>
                <p className="cred-issuer"><span className="sr-only">{t('issuerLabel')}: </span><Bidi text={c.issuer[language]} language={language} /></p>
                {c.image && <img className="certificate-image" src={publicAssetUrl(c.image)}
                  alt={`${t('certificateImage')}: ${c.title[language]}`} width="480" height="320" loading="lazy" />}
                <ResourceLinks t={t} context={c.title[language]} resources={[
                  { label: 'certificatePdf', href: c.pdf, file: true },
                  { label: 'verifyCredential', href: c.credentialUrl },
                ]} />
              </div>
              <dl className="cred-meta">
                {c.score && <div><dt>{t('scoreLabel')}</dt><dd><bdi dir="ltr">{c.score}</bdi></dd></div>}
                {c.credentialId && <div><dt>{t('credentialIdLabel')}</dt><dd><bdi dir="ltr">{c.credentialId}</bdi></dd></div>}
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
