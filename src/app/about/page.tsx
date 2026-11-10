import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/motion";
import { certifications } from "@/data/education";
import { personalStory, careerProgression } from "@/data/about";
import { profile } from "@/data/profile";
import { roles } from "@/data/roles";
import { skills } from "@/data/skills";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("About | Dhruv Singh", "Professional introduction, personal interests, career direction, skills, and certifications.", "/about");

export default function AboutPage() {
  const orderedRoles = careerProgression.map((slug) => roles.find((role) => role.slug === slug)).filter((role) => role !== undefined);

  return (
    <main className="container page-shell about-page" id="main-content">
      <PageIntro eyebrow="About" title="A little about me" description={profile.professionalIdentity} />

      <section aria-label="Professional introduction" className="about-opening">
        <Reveal className="content-panel about-opening-copy">
          <p className="eyebrow">Professional introduction</p>
          {profile.introduction?.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
      </section>

      <Reveal className="section about-personal-story">
        <p className="eyebrow">Outside of work</p>
        <h2>My story, in my own words</h2>
        <div className="about-story-copy">
          {personalStory.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="about-closing-line">{personalStory.closingLine}</p>
        </div>
      </Reveal>

      <section aria-labelledby="career-direction-title" className="section about-career-section">
        <div className="section-heading-row"><div><p className="eyebrow">Career direction</p><h2 id="career-direction-title">Analytics → Engineering → Data Science → AI</h2></div></div>
        <div className="career-progression">
          {orderedRoles.map((role, index) => (
            <Reveal className="career-progression-card" delay={index * 0.08} key={role.slug}>
              <span className="career-progression-index">0{index + 1}</span>
              {role.emerging ? <span className="career-progression-status">Emerging</span> : null}
              <h3>{role.title}</h3>
              <p>{role.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="about-skills-title" className="section about-skills-section">
        <div className="section-heading-row"><div><p className="eyebrow">Skills overview</p><h2 id="about-skills-title">Skills & tools by category</h2></div><Link className="text-link" href="/skills">View skills page <ArrowRight aria-hidden="true" size={16} /></Link></div>
        <div className="about-skill-grid">
          {skills.map((category, index) => (
            <Reveal className="content-panel about-skill-card" delay={index * 0.06} key={category.name}>
              <h3>{category.name}</h3>
              <ul className="tag-list">{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="section about-certifications">
        <p className="eyebrow">Certifications</p>
        <h2>Courses & certifications</h2>
        <ul className="certification-list">
          {certifications.map((certification) => <li key={certification.name}><strong>{certification.name}</strong>{certification.issuer ? <span>{certification.issuer}</span> : null}</li>)}
        </ul>
      </Reveal>

      <section className="about-contact-cta">
        <div><p className="eyebrow">Get in touch</p><h2>Let’s talk about data and ideas.</h2></div>
        <Link className="button button-primary" href="/contact">Contact me <ArrowRight aria-hidden="true" size={17} /></Link>
      </section>
      <div className="experience-about-link"><Link className="text-link" href="/experience">View my experience <ArrowRight aria-hidden="true" size={16} /></Link></div>
    </main>
  );
}
