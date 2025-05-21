"use client"
import { motion } from "framer-motion"
import type React from "react"

export const ScrollStepSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-20"
    >
      {children}
    </motion.div>
  )
}
