import fs from 'fs';
import path from 'path';
import { notFound } from "next/navigation"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: DocPageProps) {
  const slug = params?.slug?.join("/") || ""
  try {
    const mod = await import(`@/content/docs/${slug}.mdx`)
    return mod.metadata || {}
  } catch {
    return {}
  }
}

function getAllMdxFiles(dir, parentSlug = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let slugs = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      slugs = slugs.concat(getAllMdxFiles(path.join(dir, entry.name), [...parentSlug, entry.name]));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const name = entry.name.replace(/\.mdx$/, '');
      slugs.push({ slug: [...parentSlug, name] });
    }
  }
  return slugs;
}

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), 'content/docs');
  return getAllMdxFiles(docsDir);
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params?.slug?.join("/") || ""
  try {
    const Mod = (await import(`@/content/docs/${slug}.mdx`)).default
    const metadata = (await import(`@/content/docs/${slug}.mdx`)).metadata
    return (
      <article className="py-6">
        <h1 className="mb-4 text-4xl font-bold">{metadata?.title}</h1>
        {metadata?.description && <p className="mt-2 text-xl text-muted-foreground">{metadata.description}</p>}
        <hr className="my-4 border-border" />
        <Mod />
      </article>
    )
  } catch {
    if (!params.slug?.length) {
      return (
        <div className="py-8">
          <h1 className="mb-4 text-4xl font-bold">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to the Nexlayer documentation. Learn how to deploy your AI applications with ease.
          </p>
        </div>
      )
    }
    notFound()
  }
}
