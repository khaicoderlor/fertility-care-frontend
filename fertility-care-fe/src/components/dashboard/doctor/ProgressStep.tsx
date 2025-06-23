export default function ProgressStep() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        {orderSteps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${
                step.status === STEP_COMPLETED
                  ? "bg-green-500"
                  : step.status === STEP_PROGRESS
                  ? "bg-blue-500"
                  : step.status === STEP_FAILED
                  ? "bg-red-500"
                  : "bg-gray-300"
              }`}
            >
              {step.status === STEP_COMPLETED ? (
                <CheckIcon className="h-6 w-6" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="mt-2 text-sm">
              Bước {step.treatmentStep.stepOrder}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-4">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 transform bg-gray-200"></div>
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 transform bg-green-500"
          style={{
            width: Math.floor(calculateCompletedPercentage(orderSteps)),
          }}
        ></div>
      </div>
    </div>
  );
}
