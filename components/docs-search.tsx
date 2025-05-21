"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { allDocs } from "contentlayer/generated"
import { Search } from "lucide-react"

// Simple client-side search implementation
export function DocsSearch() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<typeof allDocs>([])
  const [isSearching, setIsSearching] = useState(false)

  // Pre-process docs for search at component mount
  const searchableContent = useMemo(() => {
    return allDocs.map((doc) => ({
      ...doc,
      searchContent: `${doc.title.toLowerCase()} ${doc.description?.toLowerCase() || ""}`,
    }))
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearch(query)

    if (query.length > 1) {
      setIsSearching(true)
      // Client-side search implementation
      const searchResults = searchableContent.filter((doc) => doc.searchContent.includes(query.toLowerCase()))
      setResults(searchResults)
    } else {
      setIsSearching(false)
      setResults([])
    }
  }

  const handleSelectResult = (slug: string) => {
    router.push(slug)
    setSearch("")
    setResults([])
    setIsSearching(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search documentation..."
          className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={search}
          onChange={handleSearch}
        />
      </div>
      {isSearching && (
        <div className="absolute top-full z-10 mt-2 w-full rounded-md border border-border bg-background shadow-lg">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((doc) => (
                <li key={doc._id}>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted"
                    onClick={() => handleSelectResult(doc.slug)}
                  >
                    {doc.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-muted-foreground">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
