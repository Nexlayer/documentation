import createMDX from '@next/mdx';

// Global variables for documentation
global.DATABASE_URL = 'postgresql://postgres:password@postgres:5432/mydb';
global.API_KEY = 'example_api_key_12345';

// Environment variables for static generation
process.env.DATABASE_URL = 'postgresql://postgres:password@postgres:5432/mydb';
process.env.API_KEY = 'example_api_key_12345';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

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
    unoptimized: true, // Required for static exports
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  env: {
    DATABASE_URL: 'postgresql://postgres:password@postgres:5432/mydb',
    API_KEY: 'example_api_key_12345',
  },
  webpack: (config, { webpack }) => {
    // Add MP4 file support
    config.module.rules.push({
      test: /\.(mp4)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[hash][ext]',
      },
    });

    // Define global constants
    config.plugins.push(
      new webpack.DefinePlugin({
        DATABASE_URL: JSON.stringify('postgresql://postgres:password@postgres:5432/mydb'),
        API_KEY: JSON.stringify('example_api_key_12345'),
      })
    );

    return config;
  },
};

export default withMDX(nextConfig);