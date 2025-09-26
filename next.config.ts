import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure MDX
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Static export for GitHub Pages
  output: "export",
  trailingSlash: true,
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
