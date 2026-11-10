"use client";

import { useState } from "react";
import type { FormEvent } from "react";

interface ContactFormProps {
  email: string;
}

export function ContactForm({ email }: ContactFormProps) {
  const [mailtoHref, setMailtoHref] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const sender = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nameField = form.elements.namedItem("name") as HTMLInputElement;
    const emailField = form.elements.namedItem("email") as HTMLInputElement;
    const messageField = form.elements.namedItem("message") as HTMLTextAreaElement;

    nameField.setCustomValidity(name ? "" : "Enter your name.");
    emailField.setCustomValidity(sender ? "" : "Enter your email address.");
    messageField.setCustomValidity(message ? "" : "Enter a message.");
    if (!name || !sender || !message || !form.reportValidity()) {
      form.reportValidity();
      return;
    }

    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${sender}\n\n${message}`;
    setMailtoHref(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  return (
    <div className="contact-form-wrap">
      <p className="muted-copy">Email delivery is not configured here. Complete the form to prepare a message in your email app.</p>
      <form
        className="contact-form"
        onChange={(event) => {
          setMailtoHref("");
          if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            event.target.setCustomValidity("");
          }
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="contact-name">Name</label>
        <input autoComplete="name" id="contact-name" maxLength={120} name="name" required />

        <label htmlFor="contact-email">Email</label>
        <input autoComplete="email" id="contact-email" maxLength={254} name="email" required type="email" />

        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" maxLength={5000} minLength={10} name="message" required rows={6} />

        <button className="button button-primary" type="submit">Prepare email</button>
      </form>
      {mailtoHref ? (
        <div className="mailto-result" role="status">
          <p>Your message is ready to open in your email app. It has not been sent.</p>
          <a className="button button-secondary" href={mailtoHref}>Open email draft</a>
        </div>
      ) : null}
    </div>
  );
}
