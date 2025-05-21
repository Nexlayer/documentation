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

        <footer className="border-t border-zinc-800 py-8 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-zinc-400">© {new Date().getFullYear()} Nexlayer. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="https://x.com/nexlayerai" className="text-zinc-400 hover:text-white transition-colors">
                  X.com
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Discord
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedLayout>
  )
}
