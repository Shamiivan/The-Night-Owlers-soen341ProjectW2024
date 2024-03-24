const nextConfig = {
  /** @type {import('next').NextConfig} */
  images: {
    domains: [
      "https://picsum.photos",
      "s7d1.scene7.com",
      "media.discordapp.net",
      "cdn.discordapp.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;

