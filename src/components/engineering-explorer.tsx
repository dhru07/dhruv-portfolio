"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/portfolio";

export function EngineeringExplorer({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const categories = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.tags ?? []))), [projects]);

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatches = activeFilter === "all" || project.tags?.includes(activeFilter);
      const searchableText = [
        project.title,
        project.summary,
        project.description,
        project.businessProblem,
        ...(project.tags ?? []),
        ...project.technologies,
        ...project.metrics.map((metric) => `${metric.label} ${metric.value} ${metric.context ?? ""}`),
        ...project.implementation.flatMap((section) => [section.title, section.content, ...(section.bullets ?? [])]),
        ...(project.limitations ?? []),
      ].join(" ").toLowerCase();
      return Boolean(categoryMatches) && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeFilter, projects, query]);

  const filterOptions = [{ key: "all", label: "All projects" }, ...categories.map((category) => ({ key: category, label: category }))];

  return (
    <div className="analytics-explorer">
      <div className="explorer-controls">
        <div aria-label="Project categories" className="filter-list" role="group">
          {filterOptions.map((filter) => (
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
          <span className="visually-hidden">Search engineering projects</span>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or tools" type="search" value={query} />
        </label>
      </div>
      <p aria-live="polite" className="results-count">{visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}</p>
      {visibleProjects.length > 0 ? (
        <div className="project-grid">
          {visibleProjects.map((project) => <ProjectCard includeDetails key={project.id} project={project} />)}
        </div>
      ) : (
        <div className="empty-results">
          <p>No projects match that search.</p>
          <button className="text-button" onClick={() => { setQuery(""); setActiveFilter("all"); }} type="button">Clear search and filters</button>
        </div>
      )}
    </div>
  );
}
