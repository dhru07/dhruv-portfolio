"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion";
import type { ExperienceEntry } from "@/types/portfolio";

export function ExperienceJourney({ entries }: { entries: ExperienceEntry[] }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="experience-journey-shell" ref={journeyRef}>
      <motion.span
        aria-hidden="true"
        className="experience-journey-line"
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
      />
      <ol aria-label="Career timeline" className="experience-journey">
      {entries.map((entry, index) => (
        <li className="experience-journey-item" key={`${entry.company}-${entry.position}`}>
          <span aria-hidden="true" className="experience-journey-marker" />
          <Reveal className="experience-journey-card" delay={index * 0.1}>
            <article className="experience-card">
              <header className="experience-heading">
                <div>
                  <p className="eyebrow">{entry.startDate} – {entry.endDate}</p>
                  <h2>{entry.company}</h2>
                  <p className="company-line">{entry.position}</p>
                </div>
              </header>
              {entry.businessContext ? <p className="muted-copy experience-context">{entry.businessContext}</p> : null}
              <div className="experience-achievements">
                {entry.achievements.map((achievement, index) => (
                  <p className={index === 0 ? "experience-achievement is-featured" : "experience-achievement"} key={achievement}>{achievement}</p>
                ))}
              </div>
              <div className="experience-detail-grid">
                <section>
                  <h3>Responsibilities</h3>
                  <ul className="detail-list">{entry.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section>
                  <h3>Technologies</h3>
                  <ul className="tag-list">{entry.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                </section>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
      </ol>
    </div>
  );
}
