/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  // Add more stability
  experimental: {
    turbo: false,
  },
}

export default nextConfig