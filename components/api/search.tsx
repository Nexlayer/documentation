"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { SearchIcon, X } from "lucide-react"
import { type Endpoint, getEndpoints, getEndpointSlug } from "@/lib/openapi"
import { cn } from "@/lib/utils"

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Endpoint[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }

      // Open search with / key when not in an input
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault()
        setIsOpen(true)
      }

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const endpoints = getEndpoints()
    const filtered = endpoints.filter((endpoint) => {
      const searchString =
        `${endpoint.path} ${endpoint.method} ${endpoint.summary} ${endpoint.description}`.toLowerCase()
      return searchString.includes(query.toLowerCase())
    })

    setResults(filtered)
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    }
  }

  const handleSelect = (endpoint: Endpoint) => {
    const slug = getEndpointSlug(endpoint)
    router.push(`/api-reference/${slug}`)
    setIsOpen(false)
    setQuery("")
  }

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-emerald-950/50 text-emerald-400"
      case "POST":
        return "bg-blue-950/50 text-blue-400"
      case "PUT":
        return "bg-amber-950/50 text-amber-400"
      case "DELETE":
        return "bg-red-950/50 text-red-400"
      case "PATCH":
        return "bg-purple-950/50 text-purple-400"
      default:
        return "bg-zinc-800 text-zinc-400"
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-colors"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="text-sm">Search...</span>
        <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700/50">⌘K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
            >
              <div className="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 shadow-2xl">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search API endpoints..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-zinc-800/50 border-b border-zinc-700 py-3 pl-12 pr-12 text-white placeholder-zinc-500 focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-3.5 text-zinc-500 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {results.length > 0 ? (
                    <ul className="py-2">
                      {results.map((endpoint, index) => (
                        <li key={`${endpoint.method}-${endpoint.path}`}>
                          <button
                            onClick={() => handleSelect(endpoint)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={cn(
                              "w-full text-left px-4 py-2 flex items-start hover:bg-zinc-800/70",
                              selectedIndex === index && "bg-zinc-800/70",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-block w-16 text-center mr-3 py-0.5 px-1.5 rounded text-xs font-medium",
                                getMethodColor(endpoint.method),
                              )}
                            >
                              {endpoint.method}
                            </span>
                            <div>
                              <div className="font-mono text-sm text-white">{endpoint.path}</div>
                              <div className="text-sm text-zinc-400 mt-0.5">{endpoint.summary}</div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : query ? (
                    <div className="py-8 text-center text-zinc-500">No results found for "{query}"</div>
                  ) : (
                    <div className="py-8 text-center text-zinc-500">Type to search API endpoints</div>
                  )}
                </div>

                <div className="border-t border-zinc-700 px-4 py-2 text-xs text-zinc-500 flex justify-between">
                  <div>
                    <span className="inline-block w-6 text-center mr-1">↑</span>
                    <span className="inline-block w-6 text-center mr-1">↓</span>
                    to navigate
                  </div>
                  <div>
                    <span className="inline-block w-6 text-center mr-1">↵</span>
                    to select
                  </div>
                  <div>
                    <span className="inline-block w-6 text-center mr-1">esc</span>
                    to close
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
