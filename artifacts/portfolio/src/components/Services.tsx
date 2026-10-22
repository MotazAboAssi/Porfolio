import { services } from '../data/services';
import type { Language, T } from '../i18n/translations';
import { Bidi } from './Bidi';
import { SectionHead } from './SectionHead';

type Props = { language: Language; t: T };

export function Services({ language, t }: Props) {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container reveal">
        <SectionHead index="01" id="services-title" title={t('servicesTitle')} aside={t('servicesAside')} />
        <ol className="services-list">
          {services.map((service, index) => (
            <li className="service" key={service.id}>
              <span className="service-num" dir="ltr">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title[language]}</h3>
              <p><Bidi text={service.description[language]} language={language} /></p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
