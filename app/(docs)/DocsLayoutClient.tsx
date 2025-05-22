"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsSearch } from "@/components/docs-search"
import Navbar from "@/components/navbar"
import type React from "react"

interface DocsLayoutProps {
  children: React.ReactNode
  params: {
    slug: string[]
  }
}

export default function DocsLayoutClient({ children, params }: DocsLayoutProps) {
  const slug = params?.slug?.join("/") || ""
  const searchParams = useSearchParams()

  if (!slug) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1">
        <div className="flex flex-col gap-4 md:flex-row">
          <aside className="md:w-1/5 p-4 md:p-8">
            <div className="sticky top-16 pt-10">
              <div className="mb-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <DocsSearch />
                </Suspense>
              </div>
              <DocsSidebar />
            </div>
          </aside>
          <div className="md:w-4/5 p-4 md:p-8">
            <main className="mx-auto w-full min-w-0">
              <div className="mb-4">
                <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Link href="/" className="overflow-hidden text-ellipsis whitespace-nowrap">
                    Home
                  </Link>
                  <span>/</span>
                  <Link href="/docs" className="overflow-hidden text-ellipsis whitespace-nowrap">
                    Docs
                  </Link>
                  {slug && (
                    <>
                      <span>/</span>
                      <span className="font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                        {slug}
                      </span>
                    </>
                  )}
                </nav>
              </div>
              <div className="prose prose-invert max-w-none">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
