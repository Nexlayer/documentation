"use client"

import { type ReactNode, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: "fade" | "slide-up" | "slide-right" | "scale"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  animation = "fade",
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (ref.current) {
      const element = ref.current

      let animationProps = {}

      switch (animation) {
        case "fade":
          animationProps = { opacity: 0 }
          break
        case "slide-up":
          animationProps = { opacity: 0, y: 50 }
          break
        case "slide-right":
          animationProps = { opacity: 0, x: -50 }
          break
        case "scale":
          animationProps = { opacity: 0, scale: 0.9 }
          break
      }

      gsap.set(element, animationProps)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: `top bottom-=${threshold * 100}%`,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      })

      tl.to(element, {
        ...Object.fromEntries(Object.entries(animationProps).map(([key, value]) => [key, key === "opacity" ? 1 : 0])),
        duration,
        delay,
        ease: "power2.out",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [animation, delay, duration, threshold, once])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  )
}
