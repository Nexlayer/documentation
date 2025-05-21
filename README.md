# Nexlayer Documentation Site

This is the documentation site for Nexlayer, built with Next.js, Contentlayer, and MDX.

## Features

- **Next.js with TypeScript**: Modern React framework with type safety
- **Contentlayer**: Type-safe content management
- **MDX**: Write JSX in markdown documents
- **Tailwind CSS**: Utility-first CSS framework with easy customization
- **Dark Mode**: Built-in dark mode support
- **Search**: Full-text search for documentation
- **Responsive Design**: Works on all devices

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

## MDX Implementation Details

This project uses **ContentLayer** for MDX processing, not directly using either @next/mdx or next-mdx-remote.

### Implementation Details

1. **ContentLayer as the MDX Solution**:
   - Uses `contentlayer` and `next-contentlayer` packages
   - ContentLayer is a content SDK that works with Next.js and provides a more structured way to work with MDX

2. **Configuration**:
   - `contentlayer.config.ts` defines document types (Doc, Guide, Author)
   - Specifies MDX processing with plugins like rehype-pretty-code, rehype-slug, etc.

3. **MDX Rendering**:
   - `components/mdx-components.tsx` defines custom components for MDX content
   - Uses the `useMDXComponent` hook from "next-contentlayer/hooks" to render MDX

4. **Content Structure**:
   - Content is organized in the `content/` directory with subdirectories for docs, guides, and authors
   - Each MDX file includes frontmatter for metadata

### Benefits of This Approach

ContentLayer provides several advantages over direct use of @next/mdx or next-mdx-remote:

1. **Type Safety**: ContentLayer generates TypeScript types for your content
2. **Content Validation**: It validates your content structure against defined schemas
3. **Computed Fields**: You can define computed fields like slugs
4. **Structured Content**: It provides a more structured way to work with content
5. **Better Developer Experience**: Includes features like hot reloading and better error messages

## License

This project is licensed under the MIT License - see the LICENSE file for details.
