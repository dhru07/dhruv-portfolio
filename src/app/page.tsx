import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/motion";
import { CountUp, HeroNestedItem, HeroNestedStagger, HeroStagger, HeroStaggerItem, PortraitParallax } from "@/components/animation-effects";
import { experience } from "@/data/experience";
import { homeContent } from "@/data/home";
import { profile } from "@/data/profile";
import { getResumeDownloads } from "@/lib/resume";
import { withBasePath } from "@/lib/paths";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("Dhruv Singh | Data Analytics & Data Engineering", "Business & Data Analyst and Data Engineer portfolio: analytics, data systems, and completed projects.", "/");

export default function Home() {
  const journey = [...experience].reverse();
  const resumeDownloads = getResumeDownloads();
  const [firstName, ...lastNameParts] = profile.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <main className="home-page" id="main-content">
      <section aria-labelledby="home-title" className="home-hero">
        <HeroStagger className="home-hero-inner container">
          <HeroStaggerItem className="home-hero-copy">
            <HeroNestedStagger className="home-hero-copy-stagger">
              <HeroNestedItem className="home-name-intro-wrap">
                <p className="home-name-intro">Hi, I’m {profile.name}</p>
              </HeroNestedItem>
              <HeroNestedItem className="home-hero-identity-wrap">
                <p className="eyebrow home-hero-identity">{profile.professionalIdentity}</p>
              </HeroNestedItem>
              <HeroNestedItem className="home-tagline-wrap">
                <h1 id="home-title" className="home-tagline">
                  <span>{homeContent.hero.headlineLead} <span className="home-headline-highlight">{homeContent.hero.headlineHighlight.replace(/\.$/, "")}</span>.</span>
                  <span className="home-tagline-second">{homeContent.hero.headlineSecondLine}</span>
                </h1>
              </HeroNestedItem>
              <HeroNestedItem className="home-actions-wrap">
                <div className="home-hero-actions">
                  <a className="button button-primary" href="#roles">Explore my work <ArrowDownRight aria-hidden="true" size={17} /></a>
                  <div aria-label="Resume downloads" className="home-resume-links" role="group">
                    {resumeDownloads.map((resume) => resume.fileName ? (
                      <a className="button button-secondary" download href={withBasePath(`/resume/${encodeURIComponent(resume.fileName)}`)} key={resume.label}>
                        <Download aria-hidden="true" size={15} /> {resume.label} résumé
                      </a>
                    ) : (
                      <span className="resume-coming-soon" key={resume.label}><Download aria-hidden="true" size={15} /> {resume.label} résumé coming soon</span>
                    ))}
                  </div>
                <div aria-label="Social links" className="home-social-links" role="group">
                  {profile.githubUrl ? <a aria-label="GitHub" href={profile.githubUrl} rel="noreferrer" target="_blank"><Github aria-hidden="true" size={18} /></a> : null}
                  {profile.linkedInUrl ? <a aria-label="LinkedIn" href={profile.linkedInUrl} rel="noreferrer" target="_blank"><Linkedin aria-hidden="true" size={18} /></a> : null}
                </div>
                </div>
              </HeroNestedItem>
              <HeroNestedItem className="home-capabilities-wrap">
                <ul aria-label="Capabilities" className="home-capabilities">
                  {homeContent.hero.capabilityLines.map((line) => (
                    <li className={line.status === "Emerging" ? "is-emerging" : undefined} key={line.labels.join("-")}>
                      {line.status ? <span className="capability-status">{line.status}:</span> : null}
                      <span>{line.labels.join(" · ")}</span>
                    </li>
                  ))}
                </ul>
              </HeroNestedItem>
            </HeroNestedStagger>
          </HeroStaggerItem>

          <HeroStaggerItem className="home-portrait-column" delay={0.85}>
            <p aria-hidden="true" className="home-portrait-name"><span>{firstName.toUpperCase()}</span><span>{lastName.toUpperCase()}</span></p>
            <div aria-hidden="true" className="home-portrait-glow" />
            <div className="home-portrait-enter">
              <PortraitParallax className="home-portrait-wrap">
                <Image
                  alt="Portrait of Dhruv Singh in a striped shirt, shown from the waist up."
                  className="home-portrait"
                  height={1955}
                  priority
                  sizes="(max-width: 1023px) 92vw, 42vw"
                  src={withBasePath("/images/profile/hero.webp")}
                  width={1640}
                />
              </PortraitParallax>
            </div>
          </HeroStaggerItem>
        </HeroStagger>
      </section>

      <Reveal>
        <section aria-labelledby="journey-title" className="journey-section section container">
          <div className="section-heading-row home-section-heading">
            <div>
              <p className="eyebrow">Experience journey</p>
              <h2 id="journey-title">From reporting to systems</h2>
            </div>
          </div>

          <ol className="journey-timeline">
            {journey.map((role, index) => (
              <li className="journey-entry" key={`${role.company}-${role.position}`}>
                <span aria-hidden="true" className="journey-marker" />
                <Reveal delay={index * 0.1}>
                  <p className="journey-dates">{role.startDate} — {role.endDate}</p>
                  <h3>{role.company}</h3>
                  <p className="journey-position">{role.position}</p>
                  <ul className="journey-achievements">
                    {role.achievements.slice(0, 3).map((achievement) => <li key={achievement}><CountUp value={achievement} /></li>)}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
          <Link className="text-link" href="/experience">Full experience <ArrowRight aria-hidden="true" size={16} /></Link>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="roles-title" className="roles-section section container" id="roles">
          <div className="section-heading-row home-section-heading">
            <div>
              <p className="eyebrow">Areas of work</p>
              <h2 id="roles-title">Roles & projects</h2>
            </div>
          </div>
          <div className="home-role-grid">
            {homeContent.roles.map((role, index) => (
              <Reveal className="home-role-reveal" delay={index * 0.07} key={role.href}>
              <article className="home-role-card">
                <span aria-hidden="true" className="home-role-index">0{index + 1}</span>
                {role.status ? <span className="home-role-status">{role.status}</span> : null}
                <h3>{role.title}</h3>
                <p>{role.summary}</p>
                <Link aria-label={`Explore ${role.title} projects`} className="home-role-link" href={role.href}>
                  Explore projects <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </article>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="about-teaser-title" className="home-about-section section container">
          <div className="home-about-copy">
            <p className="eyebrow">A little about me</p>
            <h2 id="about-teaser-title">The full data lifecycle, from business question to useful system.</h2>
            <p>{profile.philosophy}</p>
            <Link className="text-link" href="/about">More about Dhruv <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="home-contact-title" className="home-contact-section section container">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 id="home-contact-title">Let’s connect.</h2>
          </div>
          <div className="home-contact-links">
            {profile.email ? <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" size={17} />{profile.email}</a> : null}
            {profile.githubUrl ? <a href={profile.githubUrl} rel="noreferrer" target="_blank"><Github aria-hidden="true" size={17} />GitHub</a> : null}
            {profile.linkedInUrl ? <a href={profile.linkedInUrl} rel="noreferrer" target="_blank"><Linkedin aria-hidden="true" size={17} />LinkedIn</a> : null}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
