"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { yamlTheme, lineNumberStyle, codeBlockStyle } from "@/lib/yaml-theme"
import { Copy, Check } from "lucide-react"

interface YamlCodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  title?: string
  className?: string
}

export function YamlCodeBlock({
  code,
  language = "yaml",
  showLineNumbers = true,
  title,
  className,
}: YamlCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={codeBlockStyle} className={className}>
      {title && (
        <div className="text-xs font-mono px-4 py-2 bg-black bg-opacity-80 text-gray-400 border-b border-gray-800 rounded-t-lg">
          {title}
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={yamlTheme}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={lineNumberStyle}
          customStyle={{
            margin: 0,
            borderRadius: title ? "0 0 0.5rem 0.5rem" : "0.5rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-colors text-gray-300"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  )
}
