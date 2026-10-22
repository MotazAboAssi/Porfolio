import { projects } from '../data/projects';
import type { Language, TranslationKey } from '../i18n/translations';
import { ProjectCard } from './ProjectCard';

type Props = { language: Language; t: (key: TranslationKey) => string };

export function Projects({ language, t }: Props) {
  return (
    <section className="section section-rule" id="projects" aria-labelledby="projects-title">
      <div className="container reveal">
        <div className="section-heading">
          <div><div className="eyebrow">{t('projectsEyebrow')}</div><h2 id="projects-title">{t('projectsTitle')}</h2></div>
          <div className="section-index">03 / 07<br />{t('projectsAside')}</div>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} language={language} t={t} />)}
        </div>
      </div>
    </section>
  );
}
