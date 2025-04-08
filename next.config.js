/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  // The appDir option has been removed as it's now the default in newer Next.js versions
}

module.exports = nextConfig 