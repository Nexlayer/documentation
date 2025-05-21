"use client"
import { useState } from "react"
import { CopyIcon, Check } from "lucide-react"

type CopyProps = {
  text: string
  className?: string
}

export const Copy = ({ text, className = "" }: CopyProps) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyToClipboard}
      className={`text-gray-400 hover:text-white ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
    </button>
  )
}
