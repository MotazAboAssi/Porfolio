import type { Project } from '../data/projects';
import type { Language, TranslationKey } from '../i18n/translations';

type Props = { project: Project; index: number; language: Language; t: (key: TranslationKey) => string };

export function ProjectCard({ project, index, language, t }: Props) {
  return (
    <article className="card project-card">
      <div className="project-top">
        <span className="project-number">PROJECT / 0{index + 1}</span>
        <span className="project-type">{project.type[language]}</span>
      </div>
      <h3>{project.name[language]}</h3>
      {language === 'en' && <p className="project-ar-name" lang="ar" dir="rtl">{project.name.ar}</p>}
      {language === 'ar' && <p className="project-ar-name" lang="en" dir="ltr">{project.name.en}</p>}
      <div className="project-tools" aria-label={t('toolLabel')}>
        {project.tools.map((tool) => <span className="tag" key={tool} dir="ltr">{tool}</span>)}
      </div>
      <p className="project-role">
        <span className="role-label">{t('roleLabel')}</span>
        {language === 'en' ? project.role.en : <span className="pending-approval">{t('rolePending')}</span>}
      </p>
    </article>
  );
}
