# Nexlayer Documentation Site

This is the documentation site for Nexlayer, built with Next.js and MDX.

## Features

- **Next.js with TypeScript**: Modern React framework with type safety
- **MDX**: Write JSX in markdown documents, powered by @next/mdx and @mdx-js/react
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
- Use custom components with `MDXProvider` from `@mdx-js/react`:
  ```tsx
  import { MDXProvider } from '@mdx-js/react';
  import MyDoc from '@/content/docs/getting-started/introduction.mdx';
  import { components } from '@/components/mdx-components';
  export default function Page() {
    return (
      <MDXProvider components={components}>
        <MyDoc />
      </MDXProvider>
    );
  }
  ```

For more details, see the [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx).

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/nexlayer-docs.git
   cd nexlayer-docs
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your values
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

For a detailed overview of the project architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components
- `content/`: MDX content files
- `lib/`: Utility functions and configuration
- `public/`: Static assets
- `styles/`: Global CSS and styling utilities

## Content Management

### Adding a Documentation Page

1. Create a new MDX file in the appropriate directory under `/content/docs/`
2. Add frontmatter with title and description:
   \`\`\`mdx
   ---
   title: My New Page
   description: This is a description of my new page
   ---

   # My New Page

   Content goes here...
   \`\`\`

### Adding a Guide

1. Create a new MDX file in the appropriate directory under `/content/guides/`
2. Add frontmatter with title, description, date, and optional image:
   \`\`\`mdx
   ---
   title: My New Guide
   description: This is a description of my new guide
   date: 2023-11-15
   image: /images/my-guide-image.jpg
   ---

   # My New Guide

   Content goes here...
   \`\`\`

## Deployment

### Standard Deployment

The site can be deployed to any platform that supports Node.js applications:

1. Build the application:
   \`\`\`bash
   npm run build
   # or
   yarn build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   npm start
   # or
   yarn start
   \`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
