/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/documentation',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
