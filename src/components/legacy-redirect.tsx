import { withBasePath } from "@/lib/paths";
import { createPageMetadata } from "@/lib/seo";

export function getLegacyRedirectMetadata(destination: string) {
  return createPageMetadata("Page moved | Dhruv Singh", "This page has moved to its updated location.", destination);
}

export function LegacyRedirect({ destination }: { destination: string }) {
  const target = withBasePath(destination);

  return (
    <>
      <meta content={`0;url=${target}`} httpEquiv="refresh" />
      <main className="page-shell" id="main-content">
        <section className="content-panel">
          <h1>This page has moved</h1>
          <p>You are being redirected. If you are not redirected automatically, continue here:</p>
          <a className="button button-primary" href={target}>Open the updated page</a>
        </section>
      </main>
    </>
  );
}
