import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (staticExport ? "/agrosilente" : "");

const nextConfig: NextConfig = {
  devIndicators: false,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(staticExport ? {
    output: "export",
    distDir: ".next-export",
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
