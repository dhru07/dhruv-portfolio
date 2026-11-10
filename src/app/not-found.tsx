import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container page-shell error-page" id="main-content">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This page is unavailable.</h1>
      <p className="muted-copy">The address may be incorrect, or the page may have moved.</p>
      <Link className="button button-primary" href="/">Return to home</Link>
    </main>
  );
}
