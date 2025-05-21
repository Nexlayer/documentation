"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"
import { useState } from "react"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  language?: string
}

export function CodeBlock({ children, className, language, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (typeof children === "string") {
      navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative group">
      <pre
        className={cn("mb-4 mt-6 overflow-x-auto rounded-lg border border-neutral-800 bg-black py-4", className)}
        {...props}
      >
        {language && (
          <div className="absolute top-0 right-0 bg-neutral-800 px-2 py-1 text-xs font-mono rounded-bl">{language}</div>
        )}
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 p-2 rounded"
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy code</span>
      </button>
      {copied && (
        <div className="absolute right-2 top-2 bg-green-500 text-black px-2 py-1 rounded text-xs">Copied!</div>
      )}
    </div>
  )
}
