"use client"

import { useState } from "react"
import { YamlCodeBlock } from "./yaml-code-block"
import { Copy, Check } from "lucide-react"

interface YamlRendererProps {
  yamlContent: string
  title?: string
  showLineNumbers?: boolean
}

export function YamlRenderer({ yamlContent, title = "nexlayer.yaml", showLineNumbers = true }: YamlRendererProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg overflow-hidden border border-[#333] bg-black">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111]">
        <div className="text-sm font-mono text-[#22B4C8]">{title}</div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition-colors"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4">
        <YamlCodeBlock code={yamlContent} showLineNumbers={showLineNumbers} className="border-none" />
      </div>
    </div>
  )
}
