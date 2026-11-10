"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <html lang="en">
      <body>
        <main className="container page-shell error-page" id="main-content" role="alert">
          <p className="eyebrow">Something went wrong</p>
          <h1>The site could not be loaded.</h1>
          <p className="muted-copy">Try loading the page again.</p>
          <button className="button button-primary" onClick={() => reset()} type="button">Try again</button>
        </main>
      </body>
    </html>
  );
}
