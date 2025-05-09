/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  experimental: {
    // appDir is now the default in Next.js 15+ and no longer needed
  },
}

module.exports = nextConfig 