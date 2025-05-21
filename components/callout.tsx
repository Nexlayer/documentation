import type React from "react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: "default" | "warning" | "danger" | "info"
}

export function Callout({ children, icon, type = "default", ...props }: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start rounded-md border border-l-4 p-4", {
        "border-neutral-800 bg-neutral-800/20": type === "default",
        "border-red-900 bg-red-900/20 text-red-300": type === "danger",
        "border-yellow-900 bg-yellow-900/20 text-yellow-300": type === "warning",
        "border-blue-900 bg-blue-900/20 text-blue-300": type === "info",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}
