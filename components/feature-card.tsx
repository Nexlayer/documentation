import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#0a0a0a] rounded-xl p-6 transition-all duration-300 hover:border-[#00ffcc] border border-[#333] hover:translate-y-[-4px]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-400">Integrate AI models with zero friction. Built for modern AI applications.</p>
    </div>
  )
}
