import type React from "react"
import { SideNav } from "@/components/api/side-nav"
import { AnimatedLayout } from "@/components/api/animated-layout"
import { Suspense } from "react"

export const metadata = {
  title: "API Reference - Nexlayer",
  description: "Comprehensive API documentation for the Nexlayer platform",
}

export default function ApiReferenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <Suspense fallback={<div>Loading...</div>}>
              <SideNav className="hidden lg:block" />
            </Suspense>
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
    </AnimatedLayout>
  )
}
