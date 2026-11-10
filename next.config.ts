import type { NextConfig } from "next";
import { getBasePath } from "./src/lib/paths";

const basePath = getBasePath();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
