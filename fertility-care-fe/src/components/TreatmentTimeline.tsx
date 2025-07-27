import React, { useState } from "react";
import { MdTimeline, MdAttachMoney, MdAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import "../assets/css/TreatmentRoadmap.css";

interface Step {
  stepName: string;
  description: string;
  stepOrder: number;
  estimatedDurationDays: number;
  amount: number;
}

interface TreatmentTimelineProps {
  title: string;
  steps: Step[];
  icon: React.ReactNode;
  color: "blue" | "purple";
  layout: "left" | "right"; // left: timeline on left, details on right | right: timeline on right, details on left
}

const TreatmentTimeline: React.FC<TreatmentTimelineProps> = ({
  title,
  steps,
  icon,
  color,
  layout,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const totalAmount = steps.reduce((sum, step) => sum + step.amount, 0);
  const totalDuration = steps.reduce(
    (sum, step) => sum + step.estimatedDurationDays,
    0
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDuration = (days: number) => {
    return days === 1 ? "1 ngày" : `${days} ngày`;
  };

  const currentStep = steps.find((step) => step.stepOrder === activeStep);

  const colorClasses = {
    blue: {
      primary: "bg-blue-600",
      secondary: "bg-blue-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      hover: "hover:bg-blue-100",
      timeline: "bg-blue-400",
      timelineActive: "bg-blue-600",
      completed: "bg-green-500",
      completedLight: "bg-green-50",
      completedBorder: "border-green-200",
      completedText: "text-green-600",
    },
    purple: {
      primary: "bg-purple-600",
      secondary: "bg-purple-500",
      light: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      hover: "hover:bg-purple-100",
      timeline: "bg-purple-400",
      timelineActive: "bg-purple-600",
      completed: "bg-green-500",
      completedLight: "bg-green-50",
      completedBorder: "border-green-200",
      completedText: "text-green-600",
    },
  };

  const currentColor = colorClasses[color];

  const TimelineSteps = () => (
    <div className="relative">
      {/* Vertical Timeline Line Background */}
      <div
        className="absolute top-6 bottom-6 w-0.5 bg-gray-200 rounded-full"
        style={{ left: "25px" }}
      ></div>

      {/* Active Timeline Line with gradient effect */}
      <div
        className="absolute top-6 w-0.5 rounded-full transition-all duration-700 ease-out overflow-hidden"
        style={{
          left: "25px",
          height: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-green-400 via-green-500 to-blue-500"></div>
      </div>

      <div className="space-y-6">
        {steps.map((step) => {
          const isActive = activeStep === step.stepOrder;
          const isCompleted = activeStep > step.stepOrder;

          return (
            <div
              key={step.stepOrder}
              className={`timeline-step relative cursor-pointer group transition-all duration-300 ${
                isActive ? "active" : ""
              }`}
              onClick={() => setActiveStep(step.stepOrder)}
            >
              {/* Timeline Node - Căn chỉnh với timeline line */}
              <div
                className="absolute top-0 flex items-center justify-center"
                style={{ left: "17px" }} // Căn chỉnh chính xác với timeline line (25px - 8px = 17px để center node 16px)
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 z-10 relative ${
                    isCompleted
                      ? "bg-green-500"
                      : isActive
                      ? `${currentColor.primary} scale-110 shadow-xl`
                      : "bg-gray-300"
                  }`}
                >
                  {isCompleted && (
                    <FaCheck className="w-2 h-2 text-white absolute inset-0 m-auto" />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-current opacity-30 animate-ping"></div>
                  )}
                </div>
              </div>

              {/* Step Card */}
              <div
                className={`ml-14 p-4 rounded-xl transition-all duration-300 border-2 shadow-sm hover:shadow-md ${
                  isActive
                    ? `${currentColor.primary} text-white border-transparent shadow-lg transform scale-105`
                    : isCompleted
                    ? "bg-green-50 border-green-200 text-gray-700 transform hover:scale-102"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:transform hover:scale-102"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm transition-all duration-300 ${
                      isActive
                        ? "bg-white bg-opacity-20 text-white"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                    }`}
                  >
                    {step.stepOrder}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-base mb-2 transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : isCompleted
                          ? "text-green-700"
                          : "text-gray-700 group-hover:text-gray-800"
                      }`}
                    >
                      {step.stepName}
                    </h3>
                    <div
                      className={`flex items-center gap-4 text-xs transition-opacity duration-300 ${
                        isActive
                          ? "text-white opacity-90"
                          : isCompleted
                          ? "text-green-600 opacity-80"
                          : "text-gray-500 opacity-70 group-hover:opacity-90"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <MdAccessTime className="w-3 h-3" />
                        {formatDuration(step.estimatedDurationDays)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MdAttachMoney className="w-3 h-3" />
                        {formatCurrency(step.amount)}
                      </span>
                    </div>
                    {!isActive && (
                      <div
                        className={`mt-2 text-xs transition-opacity duration-300 ${
                          isCompleted
                            ? "text-green-500 opacity-70"
                            : "text-gray-400 opacity-60 group-hover:opacity-80"
                        }`}
                      >
                        {isCompleted
                          ? "✓ Đã hoàn thành"
                          : "Nhấp để xem chi tiết →"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const StepDetail = () => (
    <div
      className={`step-detail rounded-xl p-6 border fade-in ${
        currentStep && activeStep > currentStep.stepOrder
          ? `${currentColor.completedLight} ${currentColor.completedBorder}`
          : `${currentColor.light} ${currentColor.border}`
      }`}
    >
      {currentStep ? (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
                activeStep > currentStep.stepOrder
                  ? "bg-green-500"
                  : currentColor.primary
              }`}
            >
              {activeStep > currentStep.stepOrder ? (
                <FaCheck className="w-6 h-6" />
              ) : (
                currentStep.stepOrder
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {currentStep.stepName}
              </h3>
              <div
                className={`text-sm font-medium flex items-center gap-2 ${
                  activeStep > currentStep.stepOrder
                    ? currentColor.completedText
                    : currentColor.text
                }`}
              >
                <span>
                  Bước {currentStep.stepOrder} / {steps.length}
                </span>
                {activeStep > currentStep.stepOrder && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    ✓ Hoàn thành
                  </span>
                )}
                {activeStep === currentStep.stepOrder && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    🔄 Đang thực hiện
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-6 border border-gray-100 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              Mô tả chi tiết:
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              {currentStep.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep > currentStep.stepOrder
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }`}
                >
                  <MdAccessTime
                    className={`w-4 h-4 ${
                      activeStep > currentStep.stepOrder
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  Thời gian ước tính
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatDuration(currentStep.estimatedDurationDays)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep > currentStep.stepOrder
                      ? "bg-green-100"
                      : "bg-blue-100"
                  }`}
                >
                  <MdAttachMoney
                    className={`w-4 h-4 ${
                      activeStep > currentStep.stepOrder
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  Chi phí ước tính
                </span>
              </div>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(currentStep.amount)}
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">
                Tiến độ điều trị
              </span>
              <span
                className={`text-sm font-bold ${
                  activeStep > currentStep.stepOrder
                    ? "text-green-600"
                    : currentColor.text
                }`}
              >
                {Math.round((activeStep / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-green-400 to-blue-500"
                style={{ width: `${(activeStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Bắt đầu</span>
              <span>Hoàn thành</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <div
            className={`w-16 h-16 ${currentColor.light} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <MdTimeline className={`w-8 h-8 ${currentColor.text}`} />
          </div>
          <p>Vui lòng chọn một bước để xem chi tiết</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="treatment-roadmap bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`${currentColor.primary} text-white p-6`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-lg">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">{title}</h2>
            <div className="flex items-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-1">
                <MdTimeline className="w-4 h-4" />
                <span>{steps.length} bước</span>
              </div>
              <div className="flex items-center gap-1">
                <MdAccessTime className="w-4 h-4" />
                <span>{totalDuration} ngày</span>
              </div>
              <div className="flex items-center gap-1">
                <MdAttachMoney className="w-4 h-4" />
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gray-50">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
            layout === "right" ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Timeline Steps */}
          <div className={layout === "right" ? "lg:col-start-2" : ""}>
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span
                className={`w-2 h-2 ${currentColor.primary} rounded-full`}
              ></span>
              Lộ trình điều trị
            </h3>
            <TimelineSteps />
          </div>

          {/* Step Detail */}
          <div className={layout === "right" ? "lg:col-start-1" : ""}>
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span
                className={`w-2 h-2 ${currentColor.primary} rounded-full`}
              ></span>
              Chi tiết bước điều trị
            </h3>
            <StepDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentTimeline;
