"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { YamlCodeBlock } from "./yaml-code-block"
import "../styles/yaml-highlighter.css"

interface CollapsibleYamlHighlighterProps {
  yamlContent: string
  title?: string
  initiallyExpanded?: boolean
  showLineNumbers?: boolean
}

export function CollapsibleYamlHighlighter({
  yamlContent,
  title = "View YAML",
  initiallyExpanded = false,
  showLineNumbers = true,
}: CollapsibleYamlHighlighterProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)

  return (
    <div className="border border-[#333] rounded-lg overflow-hidden bg-[#0a0a0a]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#111] transition-colors"
      >
        <span className="font-medium text-white">{title}</span>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-[#333]">
          <YamlCodeBlock code={yamlContent} showLineNumbers={showLineNumbers} className="border-none" />
        </div>
      )}
    </div>
  )
}
