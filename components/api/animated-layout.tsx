"use client"

import { type ReactNode, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface AnimatedLayoutProps {
  children: ReactNode
}

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Add your global GSAP animations here
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}
