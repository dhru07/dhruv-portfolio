import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/motion";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("Skills | Dhruv Singh", "Technical skills grouped by category with matching project examples.", "/skills");

function relatedProjects(skill: string) {
  const normalizedSkill = skill.toLowerCase();
  return projects.filter((project) => project.technologies.some((technology) => technology.toLowerCase() === normalizedSkill));
}

export default function SkillsPage() {
  return (
    <main className="container page-shell" id="main-content">
      <PageIntro eyebrow="Technical toolkit" title="Skills" description="Technical skills grouped by category. Project associations appear where the same technology is listed in project data." />
      <div className="skills-grid">
        {skills.map((category, index) => (
          <Reveal delay={index * 0.06} key={category.name}>
          <section aria-labelledby={`skill-${category.name.replaceAll(" ", "-")}`} className="skill-category">
            <h2 id={`skill-${category.name.replaceAll(" ", "-")}`}>{category.name}</h2>
            <ul className="skill-list">
              {category.skills.map((skill) => {
                const projectsForSkill = relatedProjects(skill);
                return (
                  <li className="skill-row" key={skill}>
                    <span className="skill-name">{skill}</span>
                    {projectsForSkill.length > 0 ? (
                      <span className="skill-projects">
                        {projectsForSkill.map((project) => <a href={project.githubUrl} key={project.id}>{project.title}</a>)}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
