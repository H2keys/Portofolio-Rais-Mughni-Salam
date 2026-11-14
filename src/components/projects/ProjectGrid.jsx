import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ projects }) {
  if (!projects.length) {
    return <div className="rounded-[24px] border border-dashed border-white/10 p-12 text-center text-[#c9c3b7]">No projects available.</div>;
  }

  return (
    <div className="project-gallery__grid project-grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
