// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use images.remotePatterns for modern Next.js image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Allows any path on placehold.co
      },
      // Add any other external image patterns here if you use them
    ],
  },
  // The 'experimental' block can remain if you have other experimental features
  // but 'allowedDevOrigins' is causing an error and has been removed.
  experimental: {
    // allowedDevOrigins is not recognized in this Next.js version and has been removed.
  },
  // Other Next.js configurations can go here
};

export default nextConfig;
