"use client"

import type React from "react"
import Navbar from "@/components/navbar"
import { usePathname } from "next/navigation"

export default function LayoutWithNavbar({
  children,
}: {
  children: React.ReactNode
}) {
  // We use usePathname to track active routes for navbar highlighting
  const pathname = usePathname()

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      {/* Footer is now added in the root layout */}
    </>
  )
}
