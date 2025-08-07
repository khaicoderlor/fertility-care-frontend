import {
  CreditCardIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { AppointmentList } from "./AppointmentList";
import { EggDataCard } from "./EggDataCard";
import { EmbryoDataCard } from "./EmbryoDataCard";
import type OrderStep from "../../models/OrderStep";
import {
  PAYMENT_COMPLETED,
  PAYMENT_PENDING,
} from "../../constants/PaymentStatus";
import {
  STEP_EMBRYO,
  STEP_TAKE_EGG,
  STEP_TRANSFER,
} from "../../constants/IVFConstant";
import type { Order } from "../../models/Order";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type { EmbryoData } from "../../models/EmbryoData";
import type { EggData } from "../../models/EggData";
import AppointmentForm from "./AppointmentForm";
import AskAcceptFrozenOrder from "./AskAcceptFrozenOrder";
import { Link } from "react-router-dom";
import { STEP_COMPLETED, STEP_PROGRESS } from "../../constants/StepStatus";

interface StepDetailProps {
  step: OrderStep | null;
  order: Order | null;
}

export function StepDetail({ step, order }: StepDetailProps) {
  const [embryoData, setEmbryoData] = useState<EmbryoData[]>([]);
  const [eggData, setEggData] = useState<EggData[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  useEffect(() => {
    const fetchEmbryos = async (oId: string) => {
      try {
        const response = await axiosInstance.get(`/embryos/${oId}`);

        setEmbryoData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmbryos(order?.id ?? "");
  }, [order?.id]);

  useEffect(() => {
    const fetchEggsData = async (oId: string) => {
      try {
        const response = await axiosInstance.get(`/eggs/viable/${oId}`);

        setEggData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEggsData(order?.id ?? "");
  }, [order?.id]);

  if (!step) {
    return (
      <div className="bg-white border-0 rounded-lg shadow-lg">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chọn một bước
          </h3>
          <p className="text-gray-600">
            Nhấp vào bất kỳ bước nào bên trái để xem chi tiết, lịch hẹn và ghi
            chú của bác sĩ.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.status === STEP_COMPLETED
                  ? "bg-green-500 text-white"
                  : step.status === STEP_PROGRESS
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.treatmentStep.stepOrder}
            </div>
            <div>
              <div className="text-lg font-semibold">
                {step.treatmentStep.stepName}
              </div>
              <div className="text-sm text-gray-500">
                Bước {step.treatmentStep.stepOrder}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-600">{step.treatmentStep.description}</p>
          <hr className="border-gray-200" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Chi phí:</span>
              <span className="font-semibold">
                {formatCurrency(step.totalAmount ?? 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCardIcon className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-900">
                {formatCurrency(step.totalAmount ?? 0)}{" "}
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

          {step.paymentStatus != PAYMENT_COMPLETED && (
            <Link
              to={`/patient/progress/checkout`}
              state={{ step, order }}
              className="inline-flex items-center justify-center rounded-md bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
            >
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Thanh toán ngay
            </Link>
          )}
        </div>
      </div>

      <AppointmentList appointments={step.appointments ?? []} />

      {order?.treatmentService?.name === "IVF" &&
        step.treatmentStep.stepOrder === STEP_TAKE_EGG && (
          <EggDataCard order={order} eggs={eggData} />
        )}

      {order?.treatmentService?.name === "IVF" &&
        step.treatmentStep.stepOrder === STEP_EMBRYO && (
          <EmbryoDataCard embryoData={embryoData} order={order} />
        )}

      {order?.treatmentService?.name === "IVF" &&
        step.treatmentStep.stepOrder === STEP_TRANSFER && (
          <AppointmentForm order={order} step={step} />
        )}

      {order?.treatmentService?.name === "IVF" &&
        step.treatmentStep.stepOrder === STEP_TRANSFER &&
        !order.isFrozen && <AskAcceptFrozenOrder order={order} />}
    </div>
  );
}
