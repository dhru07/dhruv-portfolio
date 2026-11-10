import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/portfolio";
import { Reveal } from "@/components/motion";
import { CountUp } from "@/components/animation-effects";

export function ProjectCard({ project, includeDetails = false }: { project: Project; includeDetails?: boolean }) {
  const metric = project.metrics[0];
  const categoryLabel = project.category
    .map((category) => category === "analytics" ? "Data Analytics" : category === "engineering" ? "Data Engineering" : category === "data-science" ? "Data Science" : "AI Engineering")
    .join(" · ");

  return (
    <Reveal className="project-card-reveal">
    <article className="project-card">
      <div className="project-card-topline">
        <span className="project-category">{categoryLabel}</span>
        <span className="status-pill">{project.status.replaceAll("-", " ")}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      {metric ? (
        <div className="project-metric">
          <strong><CountUp value={metric.value} /></strong>
          <span>{metric.label}</span>
        </div>
      ) : null}
      <ul aria-label={`${project.title} technologies`} className="tag-list">
        {project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
      {includeDetails ? (
        <Link className="project-link" href={`/projects/${project.slug}`}>
          View case study <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      ) : null}
      {project.githubUrl ? (
        <a className="project-link" href={project.githubUrl} rel="noreferrer" target="_blank">
          View repository <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      ) : null}
    </article>
    </Reveal>
  );
}
