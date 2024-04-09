/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://picsum.photos", "s7d1.scene7.com", "media.discordapp.net", "cdn.discordapp.com","res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
 },
 webpack: (config, { isServer }) => {
    // Add a rule to handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
};

export default nextConfig;