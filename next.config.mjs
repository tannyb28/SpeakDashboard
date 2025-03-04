/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'peakspeak.nyc3.cdn.digitaloceanspaces.com',
          pathname: '/profile/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  