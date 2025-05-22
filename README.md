# Nexlayer Documentation Site

This is the documentation site for Nexlayer, built with Next.js and MDX.

## Features

- **Next.js with TypeScript**: Modern React framework with type safety
- **MDX**: Write JSX in markdown documents, powered by @next/mdx and @mdx-js/react
- **Global MDX Components**: All MDX files use custom components defined in `app/mdx-components.tsx`
- **MDX Error Boundaries**: Robust error handling for MDX rendering
- **Remote MDX Support**: Render MDX content from remote URLs
- **Tailwind CSS**: Utility-first CSS framework with easy customization
- **Dark Mode**: Built-in dark mode support
- **Search**: Full-text search for documentation
- **Responsive Design**: Works on all devices

## MDX Implementation Details

This project uses **@next/mdx** and **@mdx-js/react** for MDX processing. Contentlayer is no longer used.

### Usage

- Import `.mdx` files directly as React components:
  ```tsx
  import MyDoc from '@/content/docs/getting-started/introduction.mdx';
  export default function Page() {
    return <MyDoc />;
  }
  ```
- Export and use metadata from MDX files:
  ```mdx
  export const metadata = {
    title: 'Introduction',
    description: 'This is the introduction page.',
  };
  # Introduction
  Welcome to the docs!
  ```
  ```tsx
  import MyDoc, { metadata } from '@/content/docs/getting-started/introduction.mdx';
  export default function Page() {
    return (
      <>
        <h1>{metadata.title}</h1>
        <MyDoc />
      </>
    );
  }
  ```
- **Global MDX Components**: Add or edit custom components in `app/mdx-components.tsx` to make them available in all MDX files. Example:
  ```tsx
  // app/mdx-components.tsx
  import { components as customComponents } from '@/components/mdx-components';
  export function useMDXComponents(components) {
    return { ...customComponents, ...components };
  }
  ```
- **MDX Error Boundaries**: Use the `MdxErrorBoundary` component to catch and display errors in MDX rendering:
  ```tsx
  import { MdxErrorBoundary } from '@/components/mdx-error-boundary';
  <MdxErrorBoundary>
    <MyDoc />
  </MdxErrorBoundary>
  ```
- **Remote MDX Support**: Use the `RemoteMdx` component to render MDX from a remote URL:
  ```tsx
  import { RemoteMdx } from '@/components/remote-mdx';
  <RemoteMdx url="https://raw.githubusercontent.com/your/repo/main/README.mdx" />
  ```
  See `/remote-mdx` for a live demo.

For more details, see the [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx).

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nexlayer-docs.git
   cd nexlayer-docs
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

For a detailed overview of the project architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components (including MDX error boundary and remote MDX)
- `content/`: MDX content files (docs, guides, etc.)
- `lib/`: Utility functions and configuration
- `public/`: Static assets
- `styles/`: Global CSS and styling utilities

## Content Management

### Adding a Documentation Page

1. Create a new MDX file in the appropriate directory under `/content/docs/`
2. Add frontmatter with title and description:
   ```mdx
   ---
   title: My New Page
   description: This is a description of my new page
   ---

   # My New Page

   Content goes here...
   ```

### Adding a Guide

1. Create a new MDX file in the appropriate directory under `/content/guides/`
2. Add frontmatter with title, description, date, and optional image:
   ```mdx
   ---
   title: My New Guide
   description: This is a description of my new guide
   date: 2023-11-15
   image: /images/my-guide-image.jpg
   ---

   # My New Guide

   Content goes here...
   ```

## Contributing

We welcome contributions to both the documentation content and the site itself!

### To add or update documentation:
- Add new `.mdx` files to the appropriate folder in `content/docs/` or `content/guides/`.
- Use clear frontmatter for title, description, and other metadata.
- Use and extend custom MDX components for consistent, beautiful docs.
- Preview your changes locally before submitting a PR.

### To improve the site:
- Add or update React components in `components/`.
- Add new global MDX components in `app/mdx-components.tsx`.
- Use the `MdxErrorBoundary` for robust error handling in MDX rendering.
- Add new features (like search, navigation, or remote MDX) as needed.

### Best Practices
- Keep files small and focused on a single topic.
- Use descriptive titles and metadata.
- Write clear, concise, and helpful documentation.
- Follow the existing code style and structure.

### Submitting Changes
- Fork the repo and create a new branch for your changes.
- Make your changes and commit with a descriptive message.
- Open a pull request with a clear description of what you changed and why.

## Deployment

### Standard Deployment

The site can be deployed to any platform that supports Node.js applications:

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Docker Deployment

You can build and run the documentation site using Docker:

1. Build the Docker image:
   ```bash
   docker build -t nexlayer-documentation .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 8080:80 nexlayer-documentation
   ```

3. Access the site at [http://localhost:8080](http://localhost:8080)

### Automatic Deployment with GitHub Actions

This repository is configured with GitHub Actions to automatically build and deploy the documentation site to Nexlayer whenever changes are pushed to the `main` branch.

#### Setting up the GitHub Action

1. **Configure GitHub repository secrets**:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secret:
     - `NEXLAYER_API_KEY`: Your Nexlayer API key for deployment

2. **What the GitHub Action does**:
   - Builds the Docker image from the Dockerfile
   - Pushes the image to GitHub Container Registry (GHCR)
   - Updates the `nexlayer.yaml` file with the new image tag
   - Deploys the updated configuration to Nexlayer

3. **Manual Trigger**:
   You can also manually trigger the deployment:
   - Go to your GitHub repository → Actions
   - Select the "Build and Deploy to Nexlayer" workflow
   - Click "Run workflow"
   - Select the branch to deploy and click "Run workflow"

## License

This project is licensed under the MIT License - see the LICENSE file for details.
