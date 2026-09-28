/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve AVIF where supported, WebP otherwise; sources in /public/images are already WebP.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [384, 640, 828, 1080, 1280, 1600],
    imageSizes: [32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    // Import only the Chakra and Framer Motion modules each page uses.
    optimizePackageImports: ['@chakra-ui/react', 'framer-motion'],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
