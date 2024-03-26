const nextConfig = {
  /** @type {import('next').NextConfig} */
  images: {
    domains: [
      "https://picsum.photos",
      "s7d1.scene7.com",
      "media.discordapp.net",
      "https://cdn.discordapp.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

