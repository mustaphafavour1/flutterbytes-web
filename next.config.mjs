/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  // Ensure the speaker image folder is bundled into the server functions so the
  // build-time directory scan (see src/lib/speaker-photos.ts) also works at runtime.
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./public/past_speakers/**', './public/gallery/**', './public/committee/**'],
      '/speakers': ['./public/past_speakers/**'],
      '/gallery': ['./public/gallery/**'],
      '/about': ['./public/committee/**'],
    },
  },
};
export default nextConfig;
