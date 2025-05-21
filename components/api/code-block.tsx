"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: {
    curl?: string
    javascript?: string
    python?: string
    go?: string
    java?: string
    json?: string
    yaml?: string
  }
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [language, setLanguage] = useState<string>("curl")
  const [isCopied, setIsCopied] = useState(false)

  // Set initial language based on available code
  useState(() => {
    setLanguage(Object.keys(code)[0] || "curl")
  })

  const languageOptions = [
    { value: "curl", label: "cURL" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "go", label: "Go" },
    { value: "java", label: "Java" },
  ]

  // Only add these if they exist in the code object
  if (code.json) languageOptions.push({ value: "json", label: "JSON" })
  if (code.yaml) languageOptions.push({ value: "yaml", label: "YAML" })

  const codeToCopy = code[language] || ""

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto scrollbar-hide space-x-1 mb-2">
        {languageOptions
          .filter((lang) => code[lang.value])
          .map((lang) => (
            <button
              key={lang.value}
              className={`px-3 py-1.5 text-sm font-medium rounded-t-lg transition-colors ${
                language === lang.value
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
              }`}
              onClick={() => setLanguage(lang.value)}
            >
              {lang.label}
            </button>
          ))}
      </div>

      <pre className="p-4 overflow-auto rounded-lg bg-[#282a36] text-[#f8f8f2] text-sm font-mono">
        <code>{code[language] || ""}</code>
      </pre>

      <button
        className="absolute top-2 right-2 px-3 py-1.5 bg-zinc-800 text-white text-sm font-medium rounded hover:bg-zinc-700 transition-colors"
        onClick={handleCopy}
        disabled={isCopied}
      >
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export { CodeBlock }
