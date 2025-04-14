"use client"

import { motion } from "framer-motion"

interface Step {
  id: string
  label: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep
                  ? "bg-teal-600 border-teal-700 text-white"
                  : "bg-white border-slate-300 text-slate-500"
              }`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 text-sm font-medium ${index <= currentStep ? "text-slate-800" : "text-slate-500"}`}>
              {step.label}
            </span>

            {/* Progress line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-10 w-full h-0.5 bg-slate-200">
                {index < currentStep && (
                  <motion.div
                    className="h-full bg-teal-600"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
