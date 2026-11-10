import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

const roleLinks = [
  ["Data Analyst", "/roles/data-analyst"],
  ["Data Engineer", "/roles/data-engineer"],
  ["Data Scientist · Emerging", "/roles/data-scientist"],
  ["AI Engineer · Emerging", "/roles/ai-engineer"],
] as const;

export function SiteFooter() {
  const showPhone = process.env.NEXT_PUBLIC_SHOW_PHONE === "true";

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-note">{profile.professionalIdentity}</p>
        </div>
        <nav aria-label="Footer links" className="footer-links">
          {profile.githubUrl ? (
            <a href={profile.githubUrl} rel="noreferrer" target="_blank">
              <Github aria-hidden="true" size={17} /> GitHub
            </a>
          ) : null}
          {profile.email ? <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" size={17} /> Email</a> : null}
          {profile.linkedInUrl ? <a href={profile.linkedInUrl} rel="noreferrer" target="_blank">LinkedIn</a> : null}
          {showPhone && profile.phone ? <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>Phone</a> : null}
          <Link href="/contact">Contact</Link>
          {roleLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
