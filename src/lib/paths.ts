const DEFAULT_BASE_PATH = "/dhruv-portfolio";

function normalizeBasePath(value: string): string {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
}

export function getBasePath(): string {
  return normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? DEFAULT_BASE_PATH);
}

/** Prefix a site-relative path with the configured GitHub Pages project path. */
export function withBasePath(path: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("mailto:") || path.startsWith("#")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const basePath = getBasePath();
  if (!basePath || normalizedPath === basePath || normalizedPath.startsWith(`${basePath}/`)) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
}
