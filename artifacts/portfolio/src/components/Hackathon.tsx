import { hackathons } from '../data/hackathons';
import type { Language, TranslationKey } from '../i18n/translations';

type Props = { language: Language; t: (key: TranslationKey) => string };

export function Hackathon({ language, t }: Props) {
  return (
    <section className="section section-rule" id="innovation" aria-labelledby="innovation-title">
      <div className="container reveal innovation-wrap">
        <div className="innovation-title">
          <div className="eyebrow">{t('hackathonEyebrow')}</div>
          <h2 id="innovation-title">{t('hackathonTitle')}</h2>
          <p>{t('hackathonIntro')}</p>
        </div>
        <div className="hackathon-list">
          {hackathons.map((entry) => (
            <article className="hackathon-entry" key={entry.id}>
              <time className="hackathon-date" dir="ltr" dateTime={entry.date === 'Jul 2026' ? '2026-07' : '2026-06'}>{entry.date}</time>
              <div>
                <h3 dir="auto">{entry.title}</h3>
                <p>{entry.kind === 'hackathon' ? t('hackathon') : t('workshop')} · {entry.detail}</p>
                <span className="hackathon-id" dir="ltr">{entry.credential}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
