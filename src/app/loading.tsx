export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite" className="container page-shell loading-page" id="main-content">
      <span aria-hidden="true" className="loading-indicator" />
      <p>Loading page…</p>
    </main>
  );
}
