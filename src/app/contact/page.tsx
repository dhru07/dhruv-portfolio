import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion";
import { PageIntro } from "@/components/page-intro";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("Contact | Dhruv Singh", "Contact Dhruv Singh by email.", "/contact");

export default function ContactPage() {
  const showPhone = process.env.NEXT_PUBLIC_SHOW_PHONE === "true";

  return (
    <main className="container page-shell" id="main-content">
      <PageIntro eyebrow="Contact" title="Get in touch" description="For professional inquiries, contact Dhruv by email." />
      <div className="contact-grid">
        <Reveal className="content-panel contact-details">
          <h2>Contact details</h2>
          {profile.email ? <a className="contact-email" href={`mailto:${profile.email}`}><Mail aria-hidden="true" size={18} />{profile.email}</a> : null}
          {profile.location ? <p>{profile.location}</p> : null}
          {showPhone && profile.phone ? <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a> : null}
          {profile.linkedInUrl ? <a href={profile.linkedInUrl} rel="noreferrer" target="_blank">LinkedIn</a> : null}
        </Reveal>
        {profile.email ? <Reveal className="content-panel"><section><h2>Send a message</h2><ContactForm email={profile.email} /></section></Reveal> : null}
      </div>
    </main>
  );
}
