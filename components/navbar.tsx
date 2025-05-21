"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Start", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: "Deploy", path: "/deploy" },
    { name: "CLI", path: "/cli" },
    { name: "API Reference", path: "/api-reference" },
  ]

  return (
    <nav className="border-b border-[#333333] bg-[#111111] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-2 bg-transparent">
                  <Image
                    src="/nexlayer-logo.svg"
                    alt="Nexlayer Logo"
                    fill
                    className="object-contain"
                    priority
                    style={{ backgroundColor: "transparent" }}
                  />
                </div>
                <span className="font-bold text-xl text-white">Docs</span>
                <div className="flex items-center ml-2">
                  <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-medium">beta</span>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.path
                      ? "border-[#22B4C8] text-[#22B4C8]"
                      : "border-transparent text-gray-300 hover:border-gray-600 hover:text-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/deploy"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-[#22B4C8] hover:bg-[#1DA3B6] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-[#222]"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1 border-t border-[#333]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block pl-3 pr-4 py-2 text-base font-medium ${
                  pathname === item.path
                    ? "bg-[#222] border-l-4 border-[#22B4C8] text-[#22B4C8]"
                    : "text-gray-300 hover:bg-[#222] hover:text-[#22B4C8]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-3">
              <Link
                href="/deploy"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-[#22B4C8] hover:bg-[#1DA3B6] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
