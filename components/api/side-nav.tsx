"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Search } from "lucide-react"
import { type Endpoint, getEndpointSlug, getEndpointsByTag } from "@/lib/openapi"
import { cn } from "@/lib/utils"

interface SideNavProps {
  className?: string
}

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({})
  const endpointsByTag = getEndpointsByTag()

  // Initialize all tags as expanded
  useEffect(() => {
    const initialExpandedState: Record<string, boolean> = {}
    Object.keys(endpointsByTag).forEach((tag) => {
      initialExpandedState[tag] = true
    })
    setExpandedTags(initialExpandedState)
  }, [])

  const toggleTag = (tag: string) => {
    setExpandedTags((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }))
  }

  const filteredEndpointsByTag: Record<string, Endpoint[]> = {}

  if (searchQuery.trim() === "") {
    // No search, use all endpoints
    Object.assign(filteredEndpointsByTag, endpointsByTag)
  } else {
    // Filter endpoints by search query
    const query = searchQuery.toLowerCase()

    Object.entries(endpointsByTag).forEach(([tag, endpoints]) => {
      const filtered = endpoints.filter(
        (endpoint) =>
          endpoint.path.toLowerCase().includes(query) ||
          endpoint.summary.toLowerCase().includes(query) ||
          endpoint.description.toLowerCase().includes(query) ||
          endpoint.method.toLowerCase().includes(query),
      )

      if (filtered.length > 0) {
        filteredEndpointsByTag[tag] = filtered
      }
    })
  }

  return (
    <div className={cn("w-64 flex-shrink-0", className)}>
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        </div>

        <nav>
          {Object.entries(filteredEndpointsByTag).map(([tag, endpoints]) => (
            <div key={tag} className="mb-4">
              <button
                onClick={() => toggleTag(tag)}
                className="flex items-center justify-between w-full text-left py-2 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <span className="font-medium text-white">{tag === "default" ? "API Endpoints" : tag}</span>
                {expandedTags[tag] ? (
                  <ChevronDown className="h-4 w-4 text-zinc-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-zinc-400" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {expandedTags[tag] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-1 mt-1 ml-2">
                      {endpoints.map((endpoint) => {
                        const slug = getEndpointSlug(endpoint)
                        const isActive = pathname === `/api-reference/${slug}`

                        return (
                          <li key={`${endpoint.method}-${endpoint.path}`}>
                            <Link href={`/api-reference/${slug}`}>
                              <div
                                className={cn(
                                  "flex items-center py-2 px-3 rounded-lg text-sm transition-colors",
                                  isActive
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50",
                                )}
                              >
                                <span
                                  className={cn(
                                    "inline-block w-12 text-xs font-medium mr-2 py-0.5 px-1.5 rounded",
                                    endpoint.method === "GET" && "bg-emerald-950/50 text-emerald-400",
                                    endpoint.method === "POST" && "bg-blue-950/50 text-blue-400",
                                    endpoint.method === "PUT" && "bg-amber-950/50 text-amber-400",
                                    endpoint.method === "DELETE" && "bg-red-950/50 text-red-400",
                                    endpoint.method === "PATCH" && "bg-purple-950/50 text-purple-400",
                                  )}
                                >
                                  {endpoint.method}
                                </span>
                                <span className="truncate">{endpoint.path}</span>
                              </div>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
