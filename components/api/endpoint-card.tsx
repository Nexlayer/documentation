"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { type Endpoint, getEndpointSlug } from "@/lib/openapi"
import { cn } from "@/lib/utils"

interface EndpointCardProps {
  endpoint: Endpoint
  index: number
}

export function EndpointCard({ endpoint, index }: EndpointCardProps) {
  const slug = getEndpointSlug(endpoint)

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-emerald-950 text-emerald-400 border-emerald-800"
      case "POST":
        return "bg-blue-950 text-blue-400 border-blue-800"
      case "PUT":
        return "bg-amber-950 text-amber-400 border-amber-800"
      case "DELETE":
        return "bg-red-950 text-red-400 border-red-800"
      case "PATCH":
        return "bg-purple-950 text-purple-400 border-purple-800"
      default:
        return "bg-zinc-950 text-zinc-400 border-zinc-800"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/api-reference/${slug}`}>
        <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      getMethodColor(endpoint.method),
                    )}
                  >
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm text-zinc-300">{endpoint.path}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{endpoint.summary}</h3>
                <p className="text-zinc-400 line-clamp-2">{endpoint.description}</p>
              </div>
              <div className="ml-4">
                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl" />
        </div>
      </Link>
    </motion.div>
  )
}
