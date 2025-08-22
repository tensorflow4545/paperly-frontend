/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  // Exclude pages directory from build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Disable telemetry and experimental features that might cause trace issues
 
  // Handle hybrid routing
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
  