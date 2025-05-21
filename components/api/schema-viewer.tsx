"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { type Schema, resolveSchema } from "@/lib/openapi"
import { cn } from "@/lib/utils"

interface SchemaViewerProps {
  schema: Schema
  title?: string
  initiallyExpanded?: boolean
  level?: number
  isRequired?: boolean
  propertyName?: string
}

export function SchemaViewer({
  schema,
  title,
  initiallyExpanded = false,
  level = 0,
  isRequired = false,
  propertyName,
}: SchemaViewerProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded)
  const resolvedSchema = resolveSchema(schema) || schema

  const isExpandable =
    resolvedSchema.type === "object" ||
    resolvedSchema.type === "array" ||
    (resolvedSchema.properties && Object.keys(resolvedSchema.properties).length > 0)

  const handleToggle = () => {
    if (isExpandable) {
      setExpanded(!expanded)
    }
  }

  const renderProperties = () => {
    if (!resolvedSchema.properties) return null

    return Object.entries(resolvedSchema.properties).map(([name, propSchema]) => {
      const isPropertyRequired = resolvedSchema.required?.includes(name) || false

      return (
        <div key={name} className="mt-2">
          <SchemaViewer
            schema={propSchema as Schema}
            level={level + 1}
            isRequired={isPropertyRequired}
            propertyName={name}
          />
        </div>
      )
    })
  }

  const renderArrayItems = () => {
    if (!resolvedSchema.items) return null

    return (
      <div className="mt-2 pl-4 border-l border-zinc-800">
        <SchemaViewer schema={resolvedSchema.items as Schema} level={level + 1} propertyName="(array item)" />
      </div>
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "string":
        return "text-emerald-400"
      case "number":
      case "integer":
        return "text-amber-400"
      case "boolean":
        return "text-purple-400"
      case "object":
        return "text-blue-400"
      case "array":
        return "text-pink-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className={cn("font-mono text-sm", level > 0 && "ml-4")}>
      <div
        className={cn("flex items-start cursor-pointer", isExpandable ? "cursor-pointer" : "cursor-default")}
        onClick={handleToggle}
      >
        {isExpandable && (
          <div className="mr-1 mt-1">
            {expanded ? (
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            ) : (
              <ChevronRight className="h-3 w-3 text-zinc-400" />
            )}
          </div>
        )}

        <div className="flex-1">
          {propertyName && (
            <>
              <span className="text-white">{propertyName}</span>
              <span className="text-zinc-500 mx-1">:</span>
            </>
          )}

          <span className={getTypeColor(resolvedSchema.type || "unknown")}>
            {resolvedSchema.type || "unknown"}
            {resolvedSchema.format && <span className="text-zinc-500">{` (${resolvedSchema.format})`}</span>}
          </span>

          {isRequired && <span className="ml-2 text-red-400 text-xs">required</span>}

          {resolvedSchema.description && (
            <span className="ml-2 text-zinc-400 text-xs">{resolvedSchema.description}</span>
          )}

          {resolvedSchema.example !== undefined && (
            <span className="ml-2 text-zinc-500 text-xs">
              Example:
              <code className="ml-1 px-1 py-0.5 bg-zinc-800 rounded text-zinc-300">
                {typeof resolvedSchema.example === "object"
                  ? JSON.stringify(resolvedSchema.example)
                  : String(resolvedSchema.example)}
              </code>
            </span>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && isExpandable && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-2"
          >
            {resolvedSchema.type === "object" && renderProperties()}
            {resolvedSchema.type === "array" && renderArrayItems()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
