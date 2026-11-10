import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: withBasePath("/") }, sitemap: getAbsoluteUrl("/sitemap.xml") };
}
