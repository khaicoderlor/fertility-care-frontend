"use client";

import {
  BeakerIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentTextIcon,
  EyeDropperIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  STEP_COMPLETED,
  STEP_FAILED,
  STEP_PLANNED,
  STEP_PROGRESS,
  STEP_RETRANSFER,
} from "../../constants/StepStatus";
import type OrderStep from "../../models/OrderStep";
import {
  PAYMENT_COMPLETED,
  PAYMENT_PENDING,
} from "../../constants/PaymentStatus";
import { formatCurrency, getStepCardBg } from "../../functions/CommonFunction";
import { useState } from "react";
import type { Order } from "../../models/Order";
import axiosInstance from "../../apis/AxiosInstance";
import Swal from "sweetalert2";
import { StarIcon } from "lucide-react";

interface StepCardProps {
  step: OrderStep;
  isSelected: boolean;
  onClick: () => void;
  order: Order;
}

export const renderIconByStep = (step: OrderStep) => {
  const stepOrder = step.treatmentStep.stepOrder;
  switch (stepOrder) {
    case 1:
      return <DocumentTextIcon className="w-7" />;
    case 2:
      return <SparklesIcon className="w-7" />;
    case 3:
      return <EyeDropperIcon className="w-7" />;
    case 4:
      return <BeakerIcon className="w-7" />;
    case 5:
      return <HeartIcon className="w-7" />;
    case 6:
      return <ClockIcon className="w-7" />;
  }
};

export function StepCard({ step, isSelected, onClick, order }: StepCardProps) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case STEP_COMPLETED:
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Hoàn thành
          </span>
        );
      case STEP_PROGRESS:
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            Đang tiến hành
          </span>
        );
      case STEP_PLANNED:
        return (
          <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            Sắp tới
          </span>
        );
      case STEP_FAILED:
        return (
          <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            Thất bại
          </span>
        );
      case STEP_RETRANSFER:
        return (
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
            Chuyển phôi lại
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            .....
          </span>
        );
    }
  };

  const handleSubmitFeedback = async () => {
    const payload = {
      patientId: order.patient?.id,
      doctorId: order.doctor?.id,
      treatmentServiceId: order.treatmentService?.id,
      rating,
      comment,
    };

    console.log(payload)

    try {
      await axiosInstance.post("/feedbacks", payload);
      Swal.fire({
        title: "Gửi đánh giá thành công!",
        icon: "success",
      });
      setShowFeedbackForm(false);
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá", error);
      Swal.fire({
        title: "Gửi đánh giá thất bại!",
        icon: "error",
      });
    }
  };

  return (
    <div
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-0 relative rounded-lg ${getStepCardBg(
        step.status + ""
      )} ${isSelected ? "ring-2 ring-pink-600" : ""}`}
      onClick={onClick}
    >
      {/* Appointment Count Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1 bg-orange-500 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg animate-wiggle">
          <BellIcon className="w-5 h-5" />
          <span>{step.appointments?.length}</span>
        </div>
      </div>

      <div className="p-6 pt-12 pr-20">
        <div className="flex items-start gap-4">
          {/* Step Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative ${
              step.status === STEP_COMPLETED
                ? "bg-green-500 text-white"
                : step.status === STEP_PROGRESS
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {renderIconByStep(step)}

            {/* Energy Glow Effect */}
            {step.status === "active" && (
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
            )}
          </div>

          {/* Step Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {step.treatmentStep.stepName}
              </h3>
              {getStatusBadge(step.status ?? "")}
            </div>

            <p className="text-gray-600 mb-3">
              {step.treatmentStep.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{step.treatmentStep.estimatedDurationDays} ngày</span>
              </div>
              {step.endDate && (
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span>Hoàn thành {step.endDate}</span>
                </div>
              )}
            </div>

            {/* Cost Display Only */}
            <div className="flex items-center gap-2">
              <CreditCardIcon className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-900">
                {formatCurrency(step.totalAmount ?? 0)}{" "}
                {/* bỏ vào giá tổng của 1 bước */}
              </span>
              {step.paymentStatus == PAYMENT_COMPLETED ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Đã thanh toán
                </span>
              ) : step.paymentStatus == PAYMENT_PENDING ? (
                <span className="inline-flex items-center rounded-full border border-orange-300 px-2.5 py-0.5 text-xs font-medium text-orange-600">
                  Chưa thanh toán
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-red-300 px-2.5 py-0.5 text-xs font-medium text-red-600">
                  Thất bại
                </span>
              )}
            </div>
          </div>
        </div>
        {step.status === STEP_COMPLETED &&
          step.treatmentStep.stepOrder === 6 && (
            <div className="absolute bottom-4 right-4">
              <button
                className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-1.5 rounded-lg shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFeedbackForm(true);
                }}
              >
                Đánh giá
              </button>
            </div>
          )}
      </div>
      {showFeedbackForm && (
        <div className="absolute bottom-4 right-4 w-80 bg-white border border-gray-300 rounded-xl p-4 shadow-xl z-50">
          <h4 className="font-semibold mb-2 text-sm text-gray-800">
            Đánh giá toàn bộ quá trình điều trị
          </h4>

          {/* Rating */}
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                onClick={() => setRating(star)}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Comment */}
          <textarea
            placeholder="Viết nhận xét..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-20 p-2 border border-gray-300 rounded-md text-sm mb-3"
          />

          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <button
              className="text-sm px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
              onClick={() => setShowFeedbackForm(false)}
            >
              Hủy
            </button>
            <button
              className="text-sm px-3 py-1 rounded-md bg-pink-600 text-white hover:bg-pink-700"
              onClick={handleSubmitFeedback}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
