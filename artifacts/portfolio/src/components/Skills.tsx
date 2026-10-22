import { skillGroups } from '../data/skills';
import type { Language, TranslationKey } from '../i18n/translations';

type Props = { language: Language; t: (key: TranslationKey) => string };

export function Skills({ language, t }: Props) {
  return (
    <section className="section section-rule" id="skills" aria-labelledby="skills-title">
      <div className="container reveal">
        <div className="section-heading">
          <div><div className="eyebrow">{t('skillsEyebrow')}</div><h2 id="skills-title">{t('skillsTitle')}</h2></div>
          <div className="section-index">02 / 07</div>
        </div>
        <div className="skills-layout">
          <p className="skills-intro">{t('skillsIntro')}</p>
          <div className="skills-list">
            {skillGroups.map((group) => (
              <div className="skill-row" key={group.id}>
                <h3>{group.label[language]}</h3>
                <div className="skill-tags">{group.skills.map((skill) => <span className="tag" key={skill} dir="ltr">{skill}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
