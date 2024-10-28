/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    after: true,
    // Opt specific packages out of bundling for both App and Pages Router:
    serverExternalPackages: ["package-name"],
  },
};

export default nextConfig;
