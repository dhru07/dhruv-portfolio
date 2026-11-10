import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/motion";
import { CountUp } from "@/components/animation-effects";
import { roles, plannedAiProject } from "@/data/roles";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { getResumeDownloads } from "@/lib/resume";
import { withBasePath } from "@/lib/paths";

type Role = (typeof roles)[number];

export function RolePage({ role }: { role: Role }) {
  const roleProjects = role.projectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const resume = role.resumeLabel ? getResumeDownloads().find((item) => item.label === role.resumeLabel) : undefined;
  const resumeLinkLabel = role.slug === "data-scientist" ? "Download Data Analyst résumé" : `Download ${role.resumeLabel} résumé`;

  return (
    <main className="container page-shell role-page" id="main-content">
      <Reveal className="page-intro">
        <p className="eyebrow">{role.emerging ? "Emerging role" : "Role"}</p>
        <h1>{role.title}{role.emerging ? <span className="role-emerging"> · Emerging</span> : null}</h1>
        <p className="page-lede">{role.summary}</p>
        <div className="role-resume">
          {resume?.fileName ? (
            <a className="button button-secondary" download href={withBasePath(`/resume/${encodeURIComponent(resume.fileName)}`)}>
              <Download aria-hidden="true" size={16} /> {resumeLinkLabel}
            </a>
          ) : role.resumeLabel ? (
            <span className="resume-coming-soon">{resumeLinkLabel} · coming soon</span>
          ) : null}
        </div>
      </Reveal>

      <Reveal className="content-panel role-approach">
        <p className="eyebrow">How I work</p>
        <p>{profile.philosophy}</p>
      </Reveal>

      <Reveal className="section role-skills">
        <div className="section-heading-row"><div><p className="eyebrow">Relevant skills and tools</p><h2>Skills from my portfolio</h2></div></div>
        <div className="role-skill-groups">
          {skills.filter((category) => (role.skillCategories as readonly string[]).includes(category.name)).map((category, index) => (
            <Reveal className="role-skill-category" delay={index * 0.07} key={category.name}>
            <section className="content-panel">
              <h3>{category.name}</h3>
              <ul className="tag-list">{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </section>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {roleProjects.length ? (
        <Reveal className="section role-projects">
          <div className="section-heading-row"><div><p className="eyebrow">Selected work</p><h2>Projects</h2></div></div>
          <div className="project-grid">
            {roleProjects.map((project, index) => {
              const metricLabel = (role.metricLabels as Record<string, string>)[project.slug];
              const metric = project.metrics.find((item) => item.label === metricLabel) ?? project.metrics[0];
              return (
                <Reveal className="role-project-reveal" delay={index * 0.08} key={project.slug}>
                <article className="project-card role-project-card">
                  <div className="project-card-topline"><span className="project-category">{role.title}</span><span className="status-pill">{project.status.replaceAll("-", " ")}</span></div>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  {metric ? <div className="project-metric"><strong><CountUp value={metric.value} /></strong><span>{metric.label}</span></div> : null}
                  <ul aria-label={`${project.title} technologies`} className="tag-list">{project.technologies.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}</ul>
                  <div className="role-project-links">
                    <Link className="project-link" href={`/projects/${project.slug}`}>View case study <ArrowUpRight aria-hidden="true" size={16} /></Link>
                    {project.githubUrl ? <a className="project-link" href={project.githubUrl} rel="noreferrer" target="_blank">GitHub <ArrowUpRight aria-hidden="true" size={16} /></a> : null}
                  </div>
                </article>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      ) : null}

      {role.developmentAreas.length ? (
        <Reveal className="section role-development">
          <div className="section-heading-row"><div><p className="eyebrow">{role.emerging ? "Emerging · in development" : "Development areas"}</p><h2>Areas I’m developing</h2></div></div>
          <ul className="tag-list">{role.developmentAreas.map((area) => <li key={area}>{area}</li>)}</ul>
        </Reveal>
      ) : null}

      {role.slug === "ai-engineer" ? (
        <Reveal className="content-panel planned-project">
          <div className="project-card-topline"><p className="eyebrow">Planned project</p><span className="status-pill">{plannedAiProject.status}</span></div>
          <h2>{plannedAiProject.title}</h2>
          <ol className="architecture-flow planned-flow">{plannedAiProject.architecture.map((step) => <li key={step}><strong>{step}</strong></li>)}</ol>
        </Reveal>
      ) : null}

      <nav aria-label="Other roles" className="other-roles">
        <p className="eyebrow">Explore other roles</p>
        <div>{roles.filter((item) => item.slug !== role.slug).map((item) => <Link className="text-link" href={`/roles/${item.slug}`} key={item.slug}>{item.title}{item.emerging ? " · Emerging" : ""} <ArrowUpRight aria-hidden="true" size={15} /></Link>)}</div>
      </nav>
    </main>
  );
}
