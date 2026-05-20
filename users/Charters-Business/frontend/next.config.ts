import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
    optimizeCss: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [
      320, 330, 360, 390, 412, 414, 450, 505, 515, 525, 640, 750, 828, 1080,
      1200, 1366, 1536, 1920,
    ],
    imageSizes: [16, 32, 48, 64, 96, 104, 109, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.mastersunion.link",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.mastersunion.link",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.mastersunion.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.mastersunion.link",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.tetr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },

  compress: true,
  poweredByHeader: false,

  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Cache static assets aggressively (images, fonts, icons)
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
