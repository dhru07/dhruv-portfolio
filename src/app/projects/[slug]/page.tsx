import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/motion";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { roles } from "@/data/roles";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found | Dhruv Singh" };
  return createPageMetadata(`${project.title} | Dhruv Singh`, project.summary, `/projects/${project.slug}`);
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const relatedRoles = roles.filter((role) => role.projectSlugs.includes(project.slug as never));
  const isEngineering = project.category.includes("engineering");

  return (
    <main className="container page-shell project-detail-shell" id="main-content">
      <div className="detail-bottom-links project-role-links">
        {relatedRoles.map((role) => <Link className="back-link" href={`/roles/${role.slug}`} key={role.slug}><ArrowLeft aria-hidden="true" size={16} /> {role.title}{role.emerging ? " · Emerging" : ""}</Link>)}
      </div>
      <div className="detail-title-block">
        <div className="project-card-topline"><span className="project-category">{isEngineering ? "Data Engineering" : "Data Analytics"}</span><span className="status-pill">{project.status.replaceAll("-", " ")}</span></div>
        <PageIntro eyebrow={`${isEngineering ? "Engineering" : "Analytics"} case study`} title={project.title} description={project.description} />
        <div className="detail-actions">
          {project.githubUrl ? <a className="button button-secondary" href={project.githubUrl} rel="noreferrer" target="_blank">GitHub repository <ArrowUpRight aria-hidden="true" size={16} /></a> : null}
          {project.liveUrl ? <a className="button button-primary" href={project.liveUrl} rel="noreferrer" target="_blank">{project.liveUrl.includes("tableau.com") ? "Open Tableau Public dashboard" : "Open project"} <ArrowUpRight aria-hidden="true" size={16} /></a> : null}
          {project.documentationUrls?.map((item) => <a className="button button-secondary" href={item.url} key={item.url} rel="noreferrer" target="_blank">{item.label} <ArrowUpRight aria-hidden="true" size={16} /></a>)}
        </div>
      </div>

      {project.metrics.length ? <section aria-label="Project metrics" className="detail-metrics">{project.metrics.map((metric, index) => <Reveal delay={index * 0.035} key={`${metric.label}-${metric.value}`}><div className="detail-metric"><strong>{metric.value}</strong><span>{metric.label}</span>{metric.context ? <small>{metric.context}</small> : null}</div></Reveal>)}</section> : null}

      {isEngineering ? <Reveal className="section detail-section architecture-section">
        <div className="section-heading-row"><div><p className="eyebrow">System design</p><h2>Architecture</h2></div></div>
        <ScreenshotGallery assetDirectory="public/images/projects/engineering/" emptyMessage="No architecture diagram image is available for this project." screenshots={project.diagrams} title={`${project.title} architecture`} />
        {project.architecture?.length ? <div className="architecture-flow-block"><h3>Architecture flow from project data</h3><ol className="architecture-flow">{project.architecture.map((step, index) => <li key={`${step.name}-${index}`}><strong>{step.name}</strong>{step.description ? <span>{step.description}</span> : null}</li>)}</ol></div> : null}
      </Reveal> : null}

      <Reveal className="detail-overview-grid">
        <article className="content-panel"><p className="eyebrow">{isEngineering ? "Engineering problem" : "Business problem"}</p><h2>{isEngineering ? "Overview" : "Context & objective"}</h2><p>{project.businessProblem}</p>
          {project.objectives.length ? <><h3>Objectives</h3><ul className="detail-list">{project.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></> : null}
          {project.dataset ? <div className="dataset-block"><h3>{isEngineering ? "Source data" : "Dataset"}</h3><p><strong>{project.dataset.name}</strong></p>{project.dataset.description ? <p>{project.dataset.description}</p> : null}{project.dataset.recordCount !== undefined ? <p>Records: {project.dataset.recordCount.toLocaleString("en-IN")}</p> : null}</div> : null}
        </article>
        <aside className="content-panel technology-panel"><p className="eyebrow">{isEngineering ? "Implementation stack" : "Tools used"}</p><h2>{isEngineering ? "Technologies" : "Technology"}</h2><ul className="tag-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          {!isEngineering && project.architecture?.length ? <><h3>Data flow</h3><ol className="architecture-list">{project.architecture.map((step, index) => <li key={`${step.name}-${index}`}><strong>{step.name}</strong>{step.description ? <span>{step.description}</span> : null}</li>)}</ol></> : null}
          {isEngineering && project.tags?.length ? <p className="engineering-tags">{project.tags.join(" · ")}</p> : null}
        </aside>
      </Reveal>

      {project.implementation.length ? <Reveal className="section detail-section"><p className="eyebrow">{isEngineering ? "Build details" : "How it was built"}</p><h2>Implementation</h2><div className="implementation-grid">{project.implementation.map((section, index) => <Reveal className="implementation-reveal" delay={index * 0.07} key={section.title}><article className="implementation-card"><h3>{section.title}</h3><p>{section.content}</p>{section.bullets?.length ? <ul className="detail-list">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</article></Reveal>)}</div></Reveal> : null}

      {project.findings?.length ? <Reveal className="section detail-section"><p className="eyebrow">{isEngineering ? "Data model notes" : "From the analysis"}</p><h2>{isEngineering ? "Engineering decisions" : "Findings"}</h2><div className="finding-grid">{project.findings.map((finding, index) => <Reveal className="finding-reveal" delay={index * 0.07} key={finding.title}><article className="finding-card"><h3>{finding.title}</h3><p>{finding.description}</p></article></Reveal>)}</div></Reveal> : null}

      {!isEngineering ? <Reveal className="section detail-section"><div className="section-heading-row"><div><p className="eyebrow">Project media</p><h2>Screenshots</h2></div></div><ScreenshotGallery screenshots={project.screenshots} title={project.title} /></Reveal> : project.screenshots?.length ? <Reveal className="section detail-section"><div className="section-heading-row"><div><p className="eyebrow">Project media</p><h2>Screenshots</h2></div></div><ScreenshotGallery screenshots={project.screenshots} title={project.title} /></Reveal> : null}

      {project.limitations?.length ? <Reveal className="limitations-panel"><p className="eyebrow">{isEngineering ? "Scope and caveats" : "Interpretation notes"}</p><h2>Limitations</h2><ul className="detail-list">{project.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul></Reveal> : null}

      <div className="detail-bottom-links">{project.githubUrl ? <a className="text-link" href={project.githubUrl} rel="noreferrer" target="_blank">Project repository <ArrowUpRight aria-hidden="true" size={16} /></a> : null}{project.liveUrl ? <a className="text-link" href={project.liveUrl} rel="noreferrer" target="_blank">Live project link <ArrowUpRight aria-hidden="true" size={16} /></a> : null}{relatedRoles.map((role) => <Link className="text-link" href={`/roles/${role.slug}`} key={role.slug}>Back to {role.title} <ArrowLeft aria-hidden="true" size={16} /></Link>)}</div>
    </main>
  );
}
