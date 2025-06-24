import {
  BellIcon,
  CheckIcon,
  ClockIcon,
  CreditCardIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import {
  STEP_COMPLETED,
  STEP_FAILED,
  STEP_PROGRESS,
} from "../../../constants/StepStatus";
import { getStepCardBg } from "../../../functions/CommonFunction";
import type OrderStep from "../../../models/OrderStep";
import { PAYMENT_COMPLETED } from "../../../constants/PaymentStatus";
import { STEP_TAKE_EGG } from "../../../constants/IVFConstant";
import type { Order } from "../../../models/Order";
import { renderIconByStep } from "../../progress/StepCard";
import { useState } from "react";
import EggInputForm from "./EggInputForm";
import axiosInstance from "../../../apis/AxiosInstance";

interface OrderStepCardProps {
  orderSteps: OrderStep[];
  setSelectedStepDetail: (stepId: number) => void;
  handleAddAppointment: (stepId: number) => void;
  handleMarkStatusStep: (stepId: number, status: string) => void;
  order: Order;
}

export interface EggDataInput {
  grade: string;
  isQualified: boolean;
}

export default function OrderStepCard({
  orderSteps,
  setSelectedStepDetail,
  handleAddAppointment,
  handleMarkStatusStep,
  order,
}: OrderStepCardProps) {
  const [showEggForm, setShowEggForm] = useState(false);
  const [eggData, setEggData] = useState<EggDataInput[]>([]);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case STEP_COMPLETED:
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            Hoàn thành
          </span>
        );
      case STEP_PROGRESS:
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            Đang thực hiện
          </span>
        );
      case STEP_FAILED:
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
            Thất bại
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
            Trong kế hoạch
          </span>
        );
    }
  };
  return (
    <>
      <div className="space-y-4">
        {orderSteps.map((step) => (
          <div key={step.id}>
            <div
              className={`cursor-pointer rounded-lg border border-transparent ${getStepCardBg(
                step.status + ""
              )} p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-purple-500`}
              onClick={() =>
                typeof step.id === "number"
                  ? setSelectedStepDetail(step.id)
                  : undefined
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  <div>{renderIconByStep(step)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">
                        {step.treatmentStep.stepName}
                      </h3>
                      {renderStatusBadge(step.status + "")}
                    </div>
                    <p className="mt-1 text-gray-600">
                      {step.treatmentStep.description}
                    </p>

                    {/* Thời gian */}
                    <div className="mt-3 flex items-center space-x-1 text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4" />
                      <span>{step.treatmentStep.estimatedDurationDays}</span>
                    </div>

                    {/* Ngày hoàn thành */}
                    {step.endDate && (
                      <div className="mt-1 flex items-center space-x-1 text-sm text-green-600">
                        <CheckIcon className="h-4 w-4" />
                        <span>Hoàn thành {step.endDate}</span>
                      </div>
                    )}

                    {/* Chi phí và trạng thái thanh toán */}
                    <div className="mt-2 flex items-center space-x-2">
                      <CreditCardIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">
                        {step.treatmentStep.amount}
                      </span>
                      {step.paymentStatus === PAYMENT_COMPLETED ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800">
                          Chưa thanh toán
                        </span>
                      )}
                    </div>
                    {step.treatmentStep.stepOrder == STEP_TAKE_EGG && (
                      <div className="mt-3 flex items-center space-x-1 text-sm text-gray-500">
                        <CubeIcon className="h-4 w-4 text-red-500" />
                        <span>{order.totalEggs}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notification badge */}
                <div className="relative">
                  <div className="rounded-full bg-orange-500 p-2 text-white">
                    <BellIcon className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white ring-2 ring-white">
                      {step.appointments?.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons - only visible for doctor */}
              <div className="mt-4 flex justify-end space-x-3">
                <div className="flex space-x-1">
                  {order.treatmentService?.name === "IVF" &&
                    step.treatmentStep.stepOrder === STEP_TAKE_EGG && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowEggForm(true);
                        }}
                        className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-100"
                      >
                        Nhập số trứng
                      </button>
                    )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof step.id === "number") {
                        handleAddAppointment(step.id);
                      }
                    }}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-100"
                  >
                    Thêm lịch hẹn
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof step.id === "number") {
                        handleMarkStatusStep(step.id, STEP_COMPLETED);
                      }
                    }}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      step.status === STEP_COMPLETED
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "border border-green-600 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    Hoàn thành
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof step.id === "number") {
                        handleMarkStatusStep(step.id, STEP_FAILED);
                      }
                    }}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      step.status === STEP_FAILED
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "border border-red-600 text-red-600 hover:bg-red-100"
                    }`}
                  >
                    Thất bại
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showEggForm && (
        <EggInputForm
          onClose={() => setShowEggForm(false)}
          onSave={(data) => {
            setEggData(data);
            console.log("Dữ liệu trứng:", data); 
            const fetchCreateEgg = async (oId: string, eggDs: EggDataInput[]) => {
              try {
                const response = await axiosInstance.post(`/eggs/${oId}`, eggDs);
                console.log(response);
              } catch(error) {
                console.log(error)
              }
            }
            fetchCreateEgg(order.id??"", eggData)
          }}
        />
      )}
    </>
  );
}
