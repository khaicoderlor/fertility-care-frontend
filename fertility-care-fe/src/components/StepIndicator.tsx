import { FaCheck } from "react-icons/fa"

interface Step {
  number: number
  title: string
}

interface StepIndicatorProps {
  steps: Step[]
  activeStep: number
}

export default function StepIndicator({ steps, activeStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-center items-center mb-12">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step.number <= activeStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.number < activeStep ? <FaCheck className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${step.number <= activeStep ? "text-blue-600" : "text-gray-500"}`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-24 h-1 mx-2 ${step.number < activeStep ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
