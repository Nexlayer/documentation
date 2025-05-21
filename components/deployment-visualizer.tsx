"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function DeploymentVisualizer() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      clearTimeout(timer)
    }
  }, [])

  const services = [
    { name: "Frontend", color: "rgba(0, 255, 204, 0.1)", icon: "🖥️", delay: 0 },
    { name: "Backend API", color: "rgba(0, 255, 204, 0.1)", icon: "⚙️", delay: 0.2 },
    { name: "Database", color: "rgba(0, 255, 204, 0.1)", icon: "💾", delay: 0.4 },
    { name: "AI Model", color: "rgba(0, 255, 204, 0.1)", icon: "🧠", delay: 0.6 },
  ]

  return (
    <div ref={ref} className="relative h-[500px] bg-[#0a0a0a] rounded-xl border border-[#333] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[#050505] bg-grid-slate-700/[0.1] bg-grid-8"></div>

      {/* Deployment visualization */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {isVisible && (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-xl font-medium text-white mb-2">Nexlayer Deployment Intelligence</h3>
              <p className="text-gray-400">
                Our platform automatically configures networking, scaling, and security for your entire stack.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-3xl"
            >
              <video
                className="w-full h-auto rounded-lg border border-[#333] shadow-xl"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/deployment-intelligence-nexlayer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        )}
      </div>

      {/* Connection lines */}
      <div className="absolute inset-0 pointer-events-none">{/* Add animated connection lines here if needed */}</div>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: service.delay }}
              className="relative"
            >
              <div className="rounded-xl p-6 border border-[#333] bg-[#0a0a0a]">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-medium mb-2 text-white">{service.name}</h3>
                <p className="text-sm text-gray-400">Automatically configured and connected</p>
              </div>

              {index < services.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#22B4C8]"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: "24px" } : {}}
                  transition={{ duration: 0.3, delay: service.delay + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-[#0a0a0a] border border-[#333] text-white p-6 rounded-xl max-w-lg text-center"
        >
          <h3 className="text-xl font-light mb-2 gradient-text">Nexlayer AI Cloud</h3>
          <p className="text-gray-400">
            Our AI automatically handles networking, scaling, and security so you don't have to configure anything.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {["Networking", "Scaling", "Security"].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
              className="bg-[#0a0a0a] border border-[#333] p-6 rounded-xl"
            >
              <h3 className="text-lg font-medium mb-2 text-white">{feature}</h3>
              <p className="text-sm text-gray-400">Automatically configured and optimized by our AI.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
