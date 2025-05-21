"use client"

import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

interface YamlEditorProps {
  initialCode: string
}

export default function YamlEditor({ initialCode }: YamlEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isEditing, setIsEditing] = useState(false)

  // Custom dark theme based on tomorrow but with teal accents
  const customTheme = {
    ...tomorrow,
    keyword: { color: "#22B4C8" },
    string: { color: "#ce9178" },
    number: { color: "#b5cea8" },
    comment: { color: "#6a9955" },
    punctuation: { color: "#d4d4d4" },
    tag: { color: "#569cd6" },
    "attr-name": { color: "#9cdcfe" },
    "attr-value": { color: "#ce9178" },
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#333]">
      <div className="flex items-center justify-between bg-[#0a0a0a] px-4 py-2 text-white">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm">nexlayer.yaml</div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs bg-[#222] px-2 py-1 rounded hover:bg-[#333] text-gray-300"
        >
          {isEditing ? "View" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 p-4 font-mono text-sm bg-[#0a0a0a] text-gray-100 focus:outline-none border-t border-[#333]"
          spellCheck="false"
        />
      ) : (
        <SyntaxHighlighter
          language="yaml"
          style={customTheme}
          customStyle={{ margin: 0, borderRadius: 0, height: "384px", background: "#0a0a0a" }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  )
}
