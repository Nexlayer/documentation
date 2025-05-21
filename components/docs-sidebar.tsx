"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { allDocs } from "contentlayer/generated"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  // Group docs by their first path segment
  const groups = allDocs.reduce(
    (acc, doc) => {
      const [group = "ungrouped"] = doc.slugAsParams.split("/")
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(doc)
      return acc
    },
    {} as Record<string, typeof allDocs>,
  )

  // Debug: Log available groups
  console.log("Available document groups:", Object.keys(groups))

  // Sort groups alphabetically but keep 'getting-started' first
  const sortedGroups = Object.keys(groups).sort((a, b) => {
    if (a === "getting-started") return -1
    if (b === "getting-started") return 1
    return a.localeCompare(b)
  })

  return (
    <div className="w-full">
      {sortedGroups.map((group) => (
        <div key={group} className="mb-6">
          <h4 className="mb-2 text-lg font-semibold tracking-tight">
            {group
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h4>
          <div className="flex flex-col space-y-1">
            {groups[group]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((doc) => (
                <Link
                  key={doc._id}
                  href={doc.slug}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:text-primary",
                    pathname === doc.slug ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground",
                  )}
                >
                  {doc.title}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
