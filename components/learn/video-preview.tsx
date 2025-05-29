"use client"
import { motion } from "framer-motion"

type VideoPreviewProps = {
  src: string
  alt: string
}

export const VideoPreview = ({ src, alt }: VideoPreviewProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden border border-[#333] shadow-2xl my-8"
    >
      <video
        src={src}
        title={alt}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto"
        style={{ display: "block" }}
      />
    </motion.div>
  )
}