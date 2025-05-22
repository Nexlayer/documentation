import createMDX from '@next/mdx';

// This is a documentation site, not a real app with a database
// Make these variables globally available
global.DATABASE_URL = 'postgresql://postgres:password@postgres:5432/mydb';
global.API_KEY = 'example_api_key_12345';

// Set process.env variables for static generation
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
  // Static export doesn't support redirects, they need to be handled at the web server level
  // (redirects are configured in the nginx config in Dockerfile)
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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  env: {
    // Add placeholder values for environment variables mentioned in documentation
    DATABASE_URL: 'postgresql://postgres:password@postgres:5432/mydb',
    API_KEY: 'example_api_key_12345',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Define global constants
    config.plugins.push(
      new webpack.DefinePlugin({
        'DATABASE_URL': JSON.stringify('postgresql://postgres:password@postgres:5432/mydb'),
        'API_KEY': JSON.stringify('example_api_key_12345'),
      })
    );
    return config;
  },
};

export default withMDX(nextConfig);
