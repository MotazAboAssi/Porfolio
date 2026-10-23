import type { Project } from '../data/projects';
import type { Language, T } from '../i18n/translations';
import { Bidi } from './Bidi';
import { ResourceLinks } from './ResourceLinks';

type Props = { project: Project; index: number; language: Language; t: T };

export function ProjectCard({ project, index, language, t }: Props) {
  const other: Language = language === 'en' ? 'ar' : 'en';
  const roleAr = project.role.ar as string | null;
  return (
    <article className="project-card" aria-labelledby={`project-${project.id}`}>
      <div className="project-top">
        <span className="project-num">{t('projectLabel')} <bdi dir="ltr">{String(index + 1).padStart(2, '0')}</bdi></span>
        {project.type && <span className="project-type"><Bidi text={project.type[language]} language={language} /></span>}
      </div>
      <h3 id={`project-${project.id}`} lang={project.name.ar === project.name.en ? 'en' : language}
        dir={project.name.ar === project.name.en ? 'ltr' : undefined}>{project.name[language]}</h3>
      {project.name.ar !== project.name.en && <p className="project-alt-name" lang={other} dir={other === 'ar' ? 'rtl' : 'ltr'}>{project.name[other]}</p>}
      {project.tools.length > 0 && <div className="project-tools">
        <span className="sr-only">{t('toolLabel')}: </span>
        <ul>{project.tools.map((tool) => <li className="tag" key={tool}><bdi dir="ltr">{tool}</bdi></li>)}</ul>
      </div>}
      <div className="project-role">
        <span className="role-label">{t('roleLabel')}</span>
        {language === 'ar' && roleAr ? (
          <p>{roleAr}</p>
        ) : language === 'ar' ? (
          <>
            <p lang="en" dir="ltr" className="role-en">{project.role.en}</p>
            <p className="pending">{t('rolePending')}</p>
          </>
        ) : (
          <p>{project.role.en}</p>
        )}
      </div>
      <ResourceLinks t={t} context={project.name[language]} resources={[
        { label: 'sourceCode', href: project.repo },
        { label: 'liveDemo', href: project.demo },
      ]} />
    </article>
  );
}
