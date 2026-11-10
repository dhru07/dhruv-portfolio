"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="container page-shell error-page" id="main-content" role="alert">
      <p className="eyebrow">Something went wrong</p>
      <h1>This page could not be loaded.</h1>
      <p className="muted-copy">Try loading the page again. If the problem continues, return to the home page.</p>
      <div className="hero-actions">
        <button className="button button-primary" onClick={() => reset()} type="button">Try again</button>
        <Link className="button button-secondary" href="/">Return to home</Link>
      </div>
    </main>
  );
}
