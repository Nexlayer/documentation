"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-800/50">
        <div className="w-5 h-5 rounded-full bg-zinc-700/50 animate-pulse" />
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={{ opacity: isDark ? 0 : 1, y: isDark ? 10 : 0 }}
          animate={{ opacity: isDark ? 0 : 1, y: isDark ? 10 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5 text-amber-400" />
        </motion.div>
        <motion.div
          initial={{ opacity: isDark ? 1 : 0, y: isDark ? 0 : -10 }}
          animate={{ opacity: isDark ? 1 : 0, y: isDark ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-blue-400" />
        </motion.div>
      </div>
    </motion.button>
  )
}
