import {
  BanknotesIcon,
  BeakerIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  DocumentTextIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  STEP_COMPLETED,
  STEP_FAILED,
  STEP_PROGRESS,
} from "../../../constants/StepStatus";
import {
  convertSlotTime,
  getStepBySelectedStepDetail,
} from "../../../functions/CommonFunction";
import type OrderStep from "../../../models/OrderStep";
import { PAYMENT_COMPLETED } from "../../../constants/PaymentStatus";

interface SelectedCardDetailProps {
  orderSteps: OrderStep[];
  selectedStepDetail: number;
  setSelectedStepDetail: (selectedStepDetail: number | null) => void;
}

export default function SelectedCardDetail({
  orderSteps,
  selectedStepDetail,
  setSelectedStepDetail,
}: SelectedCardDetailProps) {
  const convertStepIcon = (stepOrder: number) => {
    switch (stepOrder) {
      case 1:
        return <DocumentTextIcon className="h-8 w-7 text-white" />;
      case 2:
        return <SparklesIcon className="h-8 w-8 text-white" />;
      case 3:
        return <MagnifyingGlassIcon className="h-8 w-8 text-white" />;
      case 4:
        return <BeakerIcon className="h-8 w-8 text-white" />;
      case 5:
        return <HeartIcon className="h-8 w-8 text-white" />;
      case 6:
        return <ChartBarIcon className="h-8 w-8 text-white" />;
      default:
        return <DocumentTextIcon className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`rounded-full ${
                getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                  ?.status === STEP_COMPLETED
                  ? "bg-green-500"
                  : getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                      ?.status === STEP_PROGRESS
                  ? "bg-blue-500"
                  : getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                      ?.status === STEP_FAILED
                  ? "bg-red-500"
                  : "bg-gray-400"
              } p-2`}
            >
              {convertStepIcon(
                getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                  ?.treatmentStep.stepOrder ?? -1
              )}
            </div>
            <div>
              <h3 className="font-semibold">
                {
                  getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                    ?.treatmentStep.stepName
                }
              </h3>
              <p className="text-sm text-gray-500">
                Bước{" "}
                {
                  getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                    ?.treatmentStep.stepOrder
                }
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedStepDetail(null)}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-700">
          {
            getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
              ?.treatmentStep.description
          }
        </p>

        {/* Ghi chú của bác sĩ */}
        {getStepBySelectedStepDetail(orderSteps, selectedStepDetail)?.note && (
          <div className="mt-4">
            <h4 className="font-medium">Ghi chú của bác sĩ</h4>
            <div className="mt-2 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
              <DocumentTextIcon className="mb-1 h-5 w-5 text-blue-500" />
              <p>
                {
                  getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                    ?.note
                }
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Chi phí:</p>
            <p className="font-semibold">
              {
                getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                  ?.totalAmount
              }
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Trạng thái thanh toán:
            </p>
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                  ?.status
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                ?.status === PAYMENT_COMPLETED
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
            </span>
          </div>
        </div>

        {/* Lịch hẹn */}
        {getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
          ?.appointments && (
          <div className="mt-6">
            <h4 className="mb-3 flex items-center font-medium">
              <CalendarIcon className="mr-1 h-5 w-5" />
              Lịch hẹn (
              {
                getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                  ?.appointments?.length
              }
              )
            </h4>

            <div className="space-y-4">
              {getStepBySelectedStepDetail(
                orderSteps,
                selectedStepDetail
              )?.appointments?.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-lg border border-gray-200 bg-white"
                >
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">{appointment.type}</h5>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          appointment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appointment.status === "completed"
                          ? "Đã hoàn thành"
                          : "Đã hẹn"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>
                          {appointment.appointmentDate} - Slot:{" "}
                          {appointment.slot}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ClockIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>
                          {convertSlotTime({
                            slotId: -1,
                            startTime: appointment.startTime ?? "",
                            endTime: appointment.endTime ?? "",
                            scheduleId: -1,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{appointment.doctorName}</span>
                      </div>
                    </div>

                    {appointment.extraFee != -1 && (
                      <div className="mt-3 rounded-md border-l-4 border-green-500 bg-green-200 p-3">
                        <div className="flex">
                          <BanknotesIcon className="h-5 w-5 text-green-600" />
                          <div className="ml-2">
                            <p className="text-sm font-medium text-white">
                              Chi phí phát sinh (nếu có):
                            </p>
                            <p className="text-sm text-white">
                              {appointment.extraFee}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-3 rounded-md bg-gray-50 p-3">
                      <p className="text-sm font-medium">Ghi chú:</p>
                      <p className="text-sm text-gray-600">
                        {appointment.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
