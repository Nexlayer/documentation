"use client"
import { motion } from "framer-motion"
import Image from "next/image"

type MockPreviewProps = {
  src: string
  alt: string
  width?: number
  height?: number
}

export const MockPreview = ({ src, alt, width = 800, height = 450 }: MockPreviewProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden border border-[#333] shadow-2xl my-8"
    >
      <Image
        src={src || "/placeholder.png"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          const target = e.target as HTMLImageElement
          target.src = "/placeholder.png"
        }}
      />
    </motion.div>
  )
}
