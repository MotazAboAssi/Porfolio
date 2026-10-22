import { services } from '../data/services';
import type { Language, TranslationKey } from '../i18n/translations';

type Props = { language: Language; t: (key: TranslationKey) => string };

export function Services({ language, t }: Props) {
  return (
    <section className="section section-rule" id="services" aria-labelledby="services-title">
      <div className="container reveal">
        <div className="section-heading">
          <div><div className="eyebrow">{t('servicesEyebrow')}</div><h2 id="services-title">{t('servicesTitle')}</h2></div>
          <div className="section-index">01 / 07<br />{t('servicesAside')}</div>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="card service-card" key={service.id}>
              <span className="service-number">0{index + 1}</span>
              <h3>{service.title[language]}</h3>
              <p>{service.description[language]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
