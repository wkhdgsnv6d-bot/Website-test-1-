import type { NextConfig } from "next";

/**
 * `npm run dev` / `npm run build` — normal app, served from the domain root.
 *
 * `npm run build:pages` — static HTML export for GitHub Pages, written to
 * `out/` and published from `/ascend-demo` at the repo root. Set PAGES_BASE
 * to change the sub-path (or to "" when serving from a domain root).
 */
const isPagesBuild = process.env.PAGES_BUILD === "1";
const pagesBase = process.env.PAGES_BASE ?? "/Website-test-1-/ascend-demo";

const nextConfig: NextConfig = {
  ...(isPagesBuild
    ? {
        output: "export" as const,
        // Emit `about/index.html` rather than `about.html` — the shape static
        // hosts serve most predictably.
        trailingSlash: true,
        ...(pagesBase ? { basePath: pagesBase, assetPrefix: pagesBase } : {}),
      }
    : {}),
  images: {
    // Prototype: remote placeholder photography is served unoptimised so the
    // project runs without an image pipeline. Swap these for local assets in
    // /public and remove `unoptimized` for production.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
