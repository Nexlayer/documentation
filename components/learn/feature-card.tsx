"use client"
import type React from "react"
import { motion } from "framer-motion"

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 transition-all">
      <div className="text-[#22B4C8] mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </motion.div>
  )
}
