/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Bật App Router
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
