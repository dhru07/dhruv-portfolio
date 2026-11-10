import type { Metadata } from "next";
import { withBasePath } from "@/lib/paths";

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return "http://localhost:3000";

  try {
    return new URL(configuredUrl).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export function getAbsoluteUrl(path: string): string {
  return new URL(withBasePath(path), getSiteUrl()).toString();
}

function pagePath(pathname: string): string {
  if (pathname === "/" || pathname.endsWith(".xml") || pathname.endsWith(".txt")) return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function createPageMetadata(title: string, description: string, pathname: string): Metadata {
  const canonicalUrl = getAbsoluteUrl(pagePath(pathname));
  const portraitUrl = getAbsoluteUrl("/images/profile/hero.webp");
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: portraitUrl, alt: "Portrait of Dhruv Singh" }],
    },
    twitter: { card: "summary", title, description, images: [portraitUrl] },
  };
}
