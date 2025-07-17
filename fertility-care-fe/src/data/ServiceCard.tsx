import { useState } from "react";
import type { TreatmentService } from "../models/TreatmentService";

interface ServiceCardProps {
  service: TreatmentService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="relative w-full h-[500px] perspective-1000">
      <div
        className={`w-full h-full transition-transform duration-700 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="relative h-48 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-100 to-blue-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-purple-500 opacity-20">
                {service.name === "IVF" ? "🧪" : "💉"}
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-purple-600">
                Tỷ lệ thành công: {service.successRate}%
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
            {service.name === "IVF"
              ? "Thụ tinh trong ống nghiệm (IVF)"
              : "Thụ tinh trong tử cung (IUI)"}
          </h3>

          <p className="text-gray-600 text-center mb-6 flex-grow">
            {service.description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Thời gian:</span>
              <span className="font-medium">{service.duration} ngày</span>
            </div>
            {service.estimatePrice && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Chi phí ước tính:</span>
                <span className="font-medium text-green-600">
                  {formatPrice(service.estimatePrice)}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsFlipped(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Xem quy trình chi tiết
          </button>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full backface-hidden bg-white p-8 rounded-2xl shadow-lg flex flex-col rotate-y-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          <h3 className="text-xl font-bold text-center mb-6 text-gray-800">
            Quy trình {service.name}
          </h3>

          <div className="flex-grow overflow-y-auto">
            {service.treatmentSteps?.map((step, index) => (
              <div key={step.Id} className="mb-4 last:mb-0">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {step.stepName}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    {step.estimatedDurationDays &&
                      step.estimatedDurationDays > 0 && (
                        <p className="text-xs text-purple-600 mt-1">
                          Thời gian: {step.estimatedDurationDays} ngày
                        </p>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsFlipped(false)}
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 mt-4"
          >
            Quay lại thông tin chung
          </button>
        </div>
      </div>
    </div>
  );
}
