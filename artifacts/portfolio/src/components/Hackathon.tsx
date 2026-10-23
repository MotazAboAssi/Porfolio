import { hackathons } from '../data/hackathons';
import type { Language, T } from '../i18n/translations';
import { Bidi } from './Bidi';
import { ResourceLinks } from './ResourceLinks';
import { publicAssetUrl } from '../lib/assets';

type Props = { language: Language; t: T };

export function Hackathon({ language, t }: Props) {
  return (
    <section className="section" id="innovation" aria-labelledby="innovation-title">
      <div className="container reveal innovation">
        <header className="innovation-head">
          <span className="section-num" dir="ltr">05</span>
          <p className="innovation-org"><bdi dir="ltr">{t('hackathonEyebrow')}</bdi></p>
          <h2 id="innovation-title">{t('hackathonTitle')}</h2>
          <p className="innovation-intro">{t('hackathonIntro')}</p>
        </header>
        <ol className="inno-list">
          {hackathons.map((entry) => (
            <li className={`inno inno-${entry.kind}`} key={entry.id}>
              <div className="inno-meta">
                <span className="inno-kind">{entry.kind === 'hackathon' ? t('hackathon') : t('workshop')}</span>
                <time dir="ltr" dateTime={entry.isoDate}><Bidi text={entry.date[language]} language={language} /></time>
              </div>
              <h3 lang={entry.id === 'environmental-hackathon' || language === 'ar' ? 'ar' : 'en'}>
                <Bidi text={entry.title[language]} language={language} />
              </h3>
              <p><Bidi text={entry.detail[language]} language={language} /></p>
              <span className="inno-id"><bdi dir="ltr">{entry.credential}</bdi></span>
              {entry.image && <img className="certificate-image" src={publicAssetUrl(entry.image)}
                alt={`${t('certificateImage')}: ${entry.title[language]}`}
                width={entry.imageSize?.[0] ?? 480} height={entry.imageSize?.[1] ?? 320} loading="lazy" />}
              <ResourceLinks t={t} context={entry.title[language]} resources={[
                ...(entry.certificateFiles ?? []).map((href) => ({ label: 'certificateFile' as const, href, file: true })),
                { label: 'verifyCredential', href: entry.credentialUrl },
              ]} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
