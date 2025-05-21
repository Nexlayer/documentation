import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import type { MDXRemoteProps } from "next-mdx-remote"
import { CodeBlock } from "@/components/api/code-block"
import { SchemaViewer } from "@/components/api/schema-viewer"
import { ScrollReveal } from "@/components/api/scroll-reveal"

const rootDirectory = path.join(process.cwd(), "content")

export async function getDocBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "")
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContent)

  const mdxSource = await compileMDX({
    source: content,
    components: {
      CodeBlock,
      SchemaViewer,
      ScrollReveal,
    },
    options: {
      parseFrontmatter: true,
    },
  } as MDXRemoteProps)

  return {
    meta: {
      ...data,
      slug: realSlug,
    },
    content: mdxSource,
  }
}

export async function getAllDocs() {
  const files = fs.readdirSync(rootDirectory)
  const docs = []

  for (const file of files) {
    if (file.endsWith(".mdx")) {
      const doc = await getDocBySlug(file)
      if (doc) {
        docs.push(doc)
      }
    }
  }

  return docs
}
