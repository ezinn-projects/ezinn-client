/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" },
      { protocol: "https", hostname: "a0.muscache.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
