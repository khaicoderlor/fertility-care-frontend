import { CheckCircleIcon } from "@heroicons/react/24/solid";
import type OrderStep from "../../models/OrderStep";
import { STEP_COMPLETED, STEP_PROGRESS } from "../../constants/StepStatus";

interface ProgressTrackerProps {
  steps: OrderStep[];
  completedSteps: number;
  totalSteps: number;
}

export function ProgressTracker({
  steps,
  completedSteps,
  totalSteps,
}: ProgressTrackerProps) {
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Tiến độ tổng thể
            </h3>
            <p className="text-sm text-gray-600">
              Đã hoàn thành {completedSteps}/{totalSteps} bước (
              {Math.round(progressPercentage)}%)
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-gray-500">Hoàn thành</div>
          </div>
        </div>

        {/* Linear Progress Steps */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center relative flex-1"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 relative z-10 ${
                    step.status === STEP_COMPLETED
                      ? "bg-green-500 text-white shadow-lg"
                      : step.status === STEP_PROGRESS
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.status === STEP_COMPLETED ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    index+1
                  )}
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-0">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        step.status === STEP_COMPLETED
                          ? "bg-green-500 w-full"
                          : step.status === "active"
                          ? "bg-blue-500 w-1/2"
                          : "w-0"
                      }`}
                    />
                  </div>
                )}

                <div className="text-xs text-center mt-2 max-w-20">
                  <div className="font-medium text-gray-700">
                    Bước {step.treatmentStep.stepOrder}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
