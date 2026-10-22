import { certifications } from '../data/certifications';
import type { TranslationKey } from '../i18n/translations';

type Props = { t: (key: TranslationKey) => string };

export function Certifications({ t }: Props) {
  return (
    <section className="section section-rule" id="certifications" aria-labelledby="certifications-title">
      <div className="container reveal">
        <div className="section-heading">
          <div><div className="eyebrow">{t('certificationsEyebrow')}</div><h2 id="certifications-title">{t('certificationsTitle')}</h2></div>
          <div className="section-index">04 / 07<br />06 credentials</div>
        </div>
        <div className="credentials-grid">
          {certifications.map((certification, index) => (
            <article className="credential" key={certification.title}>
              <span className="credential-index">0{index + 1}</span>
              <div>
                <h3>{certification.title}</h3>
                <p>{certification.issuer}</p>
                <div className="credential-meta"><span dir="ltr">{certification.date}</span>{certification.detail && <span dir="ltr">{certification.detail}</span>}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
