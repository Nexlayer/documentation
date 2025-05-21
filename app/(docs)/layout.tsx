import type React from "react"
import type { Metadata } from "next"
import DocsLayoutClient from "./DocsLayoutClient"

export const metadata: Metadata = {
  title: "Nexlayer Documentation",
  description: "Learn how to use Nexlayer to deploy your AI applications.",
}

interface DocsLayoutProps {
  children: React.ReactNode
  params: {
    slug: string[]
  }
}

export default function DocsLayout({ children, params }: DocsLayoutProps) {
  return <DocsLayoutClient children={children} params={params} />
}
