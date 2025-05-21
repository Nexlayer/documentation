import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params?.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export function generateMetadata({ params }: DocPageProps) {
  const doc = getDocFromParams(params)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

// Generate static paths for all docs
export function generateStaticParams(): DocPageProps["params"][] {
  // Include the root path (empty slug)
  const paths = [{ slug: [] }]

  // Add all doc paths
  allDocs.forEach((doc) => {
    paths.push({
      slug: doc.slugAsParams.split("/"),
    })
  })

  return paths
}

/**
 * This page is statically generated at build time.
 * The generateStaticParams function ensures all doc pages are pre-rendered.
 * Content is loaded from the Contentlayer-generated files.
 */
export default function DocPage({ params }: DocPageProps) {
  const doc = getDocFromParams(params)

  if (!doc) {
    // If no slug is provided, show the documentation index page
    if (!params.slug?.length) {
      return (
        <div className="py-8">
          <h1 className="mb-4 text-4xl font-bold">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to the Nexlayer documentation. Learn how to deploy your AI applications with ease.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {allDocs
              .filter((doc) => doc.slugAsParams.startsWith("getting-started"))
              .map((doc) => (
                <a
                  key={doc._id}
                  href={doc.slug}
                  className="block rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:bg-card/80"
                >
                  <h2 className="mb-2 text-xl font-semibold">{doc.title}</h2>
                  {doc.description && <p className="text-muted-foreground">{doc.description}</p>}
                </a>
              ))}
          </div>
        </div>
      )
    }

    notFound()
  }

  return (
    <article className="py-6">
      <h1 className="mb-4 text-4xl font-bold">{doc.title}</h1>
      {doc.description && <p className="mt-2 text-xl text-muted-foreground">{doc.description}</p>}
      <hr className="my-4 border-border" />
      <Mdx code={doc.body.code} />
    </article>
  )
}
