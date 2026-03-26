/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath,
  assetPrefix: basePath || undefined,
  experimental: {
    images: {
      unoptimized: isStaticExport,
    },
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? "true" : "false",
  },
};

module.exports = nextConfig
