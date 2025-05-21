"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Step {
  number: number
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
}

export default function StepIndicator({ steps }: StepIndicatorProps) {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`relative cursor-pointer transition-all duration-300 ${
            step.number === activeStep ? "scale-105" : "opacity-70 hover:opacity-90"
          }`}
          onClick={() => setActiveStep(step.number)}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <motion.div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step.number === activeStep ? "bg-black text-white" : "bg-gray-100 text-gray-500"
                }`}
                animate={{
                  scale: step.number === activeStep ? 1.1 : 1,
                  backgroundColor: step.number === activeStep ? "#000000" : "#f3f4f6",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {step.number}
              </motion.div>
            </div>
            <div>
              <h3 className={`text-xl font-medium ${step.number === activeStep ? "text-gray-900" : "text-gray-700"}`}>
                {step.title}
              </h3>
              <p className="mt-1 text-gray-600">{step.description}</p>
            </div>
          </div>

          {step.number < steps.length && <div className="absolute left-5 top-12 h-12 w-px bg-gray-200" />}
        </div>
      ))}
    </div>
  )
}
