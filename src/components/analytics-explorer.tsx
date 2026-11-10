"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/portfolio";

type Filter = "all" | "business" | "predictive";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All projects" },
  { key: "business", label: "Business analytics" },
  { key: "predictive", label: "Predictive analytics" },
];

export function AnalyticsExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatches = activeFilter === "all"
        || (activeFilter === "business" && project.category.includes("analytics") && !project.category.includes("data-science"))
        || (activeFilter === "predictive" && project.category.includes("data-science"));
      const searchableText = [
        project.title,
        project.summary,
        project.description,
        ...project.technologies,
        ...project.metrics.map((metric) => `${metric.label} ${metric.value} ${metric.context ?? ""}`),
        ...(project.findings ?? []).flatMap((finding) => [finding.title, finding.description]),
      ].join(" ").toLowerCase();
      return categoryMatches && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeFilter, projects, query]);

  return (
    <div className="analytics-explorer">
      <div className="explorer-controls">
        <div aria-label="Project categories" className="filter-list" role="group">
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter.key}
              className={`filter-button${activeFilter === filter.key ? " is-selected" : ""}`}
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
        <label className="project-search">
          <Search aria-hidden="true" size={18} />
          <span className="visually-hidden">Search projects</span>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or tools" type="search" value={query} />
        </label>
      </div>
      <p aria-live="polite" className="results-count">{visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}</p>
      {visibleProjects.length > 0 ? (
        <div className="project-grid">
          {visibleProjects.map((project) => <ProjectCard includeDetails key={project.id} project={project} />)}
        </div>
      ) : (
        <div className="empty-results"><p>No projects match that search.</p><button className="text-button" onClick={() => { setQuery(""); setActiveFilter("all"); }} type="button">Clear search and filters</button></div>
      )}
    </div>
  );
}
