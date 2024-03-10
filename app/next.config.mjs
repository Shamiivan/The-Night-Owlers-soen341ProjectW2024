/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://picsum.photos"],
  },
  typescript: {
    ignoreBuildErrors: true,
 },
};

export default nextConfig;