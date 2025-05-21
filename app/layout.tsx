import type React from "react"
import "./globals.css"
import "../styles/yaml-highlighter.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import LayoutWithNavbar from "@/components/layout-with-navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Nexlayer - Deploy AI in seconds",
  description: "One YAML file. Zero DevOps. Infinite possibilities."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <LayoutWithNavbar>{children}</LayoutWithNavbar>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
