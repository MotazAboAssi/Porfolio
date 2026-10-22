import { skillGroups } from '../data/skills';
import type { Language, T } from '../i18n/translations';
import { SectionHead } from './SectionHead';

type Props = { language: Language; t: T };

export function Skills({ language, t }: Props) {
  return (
    <section className="section section-alt" id="skills" aria-labelledby="skills-title">
      <div className="container reveal">
        <SectionHead index="02" id="skills-title" title={t('skillsTitle')} aside={t('skillsIntro')} />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <section className={`skill-group skill-${group.id}`} key={group.id} aria-labelledby={`skill-${group.id}`}>
              <header className="skill-head">
                <h3 id={`skill-${group.id}`}>{group.label[language]}</h3>
                <span className="skill-count" dir="ltr">{String(group.skills.length).padStart(2, '0')}</span>
              </header>
              <ul className="skill-items">
                {group.skills.map((skill) => <li key={skill}><bdi dir="ltr">{skill}</bdi></li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
