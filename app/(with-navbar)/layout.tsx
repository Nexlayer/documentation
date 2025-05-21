import type React from "react"

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
      {/* Remove inline footer and use the Footer component */}
    </main>
  )
}
