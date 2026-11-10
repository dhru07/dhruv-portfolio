import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAbsoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/experience",
    "/skills",
    "/contact",
    "/roles/data-analyst",
    "/roles/data-engineer",
    "/roles/data-scientist",
    "/roles/ai-engineer",
  ];
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: getAbsoluteUrl(route === "/" ? "/" : `${route}/`),
  }));
}
