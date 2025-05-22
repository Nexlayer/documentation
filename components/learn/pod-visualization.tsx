"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface PodVisualizationProps {
  onPodSelect?: (pod: string) => void;
  selectedPod?: string | null;
}

export default function PodVisualization({ onPodSelect, selectedPod }: PodVisualizationProps) {
  const [isVisible, setIsVisible] = useState(false)

  const pods = [
    {
      id: "postgres",
      name: "Postgres DB",
      icon: "💾",
      color: "#F59E0B",
      description: "Database server",
    },
    {
      id: "express",
      name: "Express API",
      icon: "⚙️",
      color: "#10B981",
      description: "Backend API server",
    },
    {
      id: "react",
      name: "React UI",
      icon: "🖥️",
      color: "#3B82F6",
      description: "Frontend user interface",
    },
  ]

  return (
    <div className="relative bg-[#0a0a0a] rounded-xl border border-[#333] p-6 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[#050505] bg-grid-slate-700/[0.1] bg-grid-8"></div>

      {/* Pods Visualization - Full width now */}
      <div className="flex flex-col items-center space-y-12 justify-center relative z-10">
        {pods.map((pod, index) => (
          <div key={pod.id} className="relative">
            {/* Connection lines */}
            {index < pods.length - 1 && (
              <div className="absolute left-1/2 top-full h-12 w-0.5 bg-gradient-to-b from-[#333] to-transparent"></div>
            )}

            {/* Pod box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex items-center space-x-4 bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-lg border border-[#333] shadow-lg ${selectedPod === pod.id ? 'ring-2 ring-primary' : ''}`}
              style={{ width: "300px", cursor: onPodSelect ? 'pointer' : undefined }}
              onClick={onPodSelect ? () => onPodSelect(pod.id) : undefined}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${pod.color}20`, color: pod.color }}
              >
                {pod.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{pod.name}</h3>
                <p className="text-sm text-gray-400">{pod.description}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Add a named export to fix the import issue
export { PodVisualization }
