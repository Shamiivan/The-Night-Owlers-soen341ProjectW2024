/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://picsum.photos", "s7d1.scene7.com", "media.discordapp.net", "cdn.discordapp.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
 },
};

export default nextConfig;