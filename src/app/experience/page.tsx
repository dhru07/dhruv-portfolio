import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ExperienceJourney } from "@/components/experience-journey";
import { Reveal } from "@/components/motion";
import { education, certifications } from "@/data/education";
import { experience } from "@/data/experience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("Experience | Dhruv Singh", "Career journey, responsibilities, achievements, education, and certifications for Dhruv Singh.", "/experience");

export default function ExperiencePage() {
  const chronologicalExperience = [...experience].reverse();

  return (
    <main className="container page-shell" id="main-content">
      <PageIntro eyebrow="Career journey" title="Experience" description="Roles, responsibilities, technologies, and achievements from my professional experience." />

      <section aria-label="Professional experience timeline" className="experience-timeline-section">
        <ExperienceJourney entries={chronologicalExperience} />
      </section>

      <section aria-labelledby="education-title" className="section education-section">
        <p className="eyebrow">Education</p>
        <h2 id="education-title">Education & learning</h2>
        <div className="education-grid experience-education-grid">
          {education.map((item) => (
            <Reveal className="content-panel" key={`${item.institution}-${item.qualification}`}>
              <article>
                <h3>{item.qualification} in {item.field}</h3>
                <p>{item.institution}</p>
                <p className="muted-copy">{item.startDate} – {item.completionDate}</p>
                {item.grade ? <p>{item.grade}</p> : null}
              </article>
            </Reveal>
          ))}
          <Reveal className="content-panel">
            <section>
              <h3>Certifications</h3>
              <ul className="detail-list">
                {certifications.map((certification) => (
                  <li key={certification.name}>{certification.name}{certification.issuer ? ` — ${certification.issuer}` : ""}</li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </section>
      <div className="experience-about-link"><Link className="text-link" href="/about">About me <ArrowUpRight aria-hidden="true" size={16} /></Link></div>
    </main>
  );
}
