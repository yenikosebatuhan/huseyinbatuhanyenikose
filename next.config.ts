import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Detect GitHub Pages environment to set basePath/assetPrefix
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "huseyinbatuhanyenikose"; // update if repo changes

const nextConfig: NextConfig = {
  // Configure MDX
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Static export for GitHub Pages
  output: "export",
  trailingSlash: true,
  // Configure basePath/assetPrefix only for GitHub Pages project sites
  basePath: isGitHubPages ? `/${repoName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },

  // Disable server-side features for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
