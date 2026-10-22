import { projects } from '../data/projects';
import type { Language, T } from '../i18n/translations';
import { ProjectCard } from './ProjectCard';
import { SectionHead } from './SectionHead';

type Props = { language: Language; t: T };

export function Projects({ language, t }: Props) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container reveal">
        <SectionHead index="03" id="projects-title" title={t('projectsTitle')} aside={t('projectsAside')} />
        <div className="projects-grid">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} language={language} t={t} />)}
        </div>
      </div>
    </section>
  );
}
