import type { Project } from "../lib/portfolio";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card${featured ? " project-card-featured" : ""}`}>
      <a href={`/case-studies/${project.slug}`} className="project-image-link" aria-label={`View ${project.title}`}>
        <img src={project.cover} alt={`${project.title}项目封面`} />
      </a>
      <div className="project-card-copy">
        <div className="project-card-topline">
          <span>{project.index}</span>
          <span>{project.role.split("·")[0].trim()}</span>
        </div>
        <h3><a href={`/case-studies/${project.slug}`}>{project.title}</a></h3>
        <p className="project-en">{project.english}</p>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <a href={`/case-studies/${project.slug}`} className="text-link">查看完整案例 <span>↗</span></a>
      </div>
    </article>
  );
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
