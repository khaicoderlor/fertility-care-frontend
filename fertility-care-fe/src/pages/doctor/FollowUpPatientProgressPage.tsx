"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  CheckIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  BellIcon,
  DocumentTextIcon,
  HeartIcon,
  BanknotesIcon,
  UserIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import type OrderStep from "../../models/OrderStep";
import {
  calculateCompletedPercentage,
  ConvertFullName,
  ConvertSlotTime,
  getStepBySelectedStepDetail,
  getStepCardBg,
} from "../../functions/CommonFunction";
import {
  STEP_COMPLETED,
  STEP_FAILED,
  STEP_PLANNED,
  STEP_PROGRESS,
} from "../../constants/StepStatus";
import axios from "axios";
import type { Patient } from "../../models/Patient";
import type { SlotSchedule } from "../../models/SlotSchedule";
import { getScheduleSlotTime } from "../../apis/DoctorService";
import Swal from "sweetalert2";
import { getPatientById } from "../../apis/PatientService";
import { PAYMENT_COMPLETED } from "../../constants/PaymentStatus";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../apis/AxiosInstance";
import { FaClock } from "react-icons/fa";
import { STEP_TAKE_EGG } from "../../constants/IVFConstant";
import { CubeIcon } from "@heroicons/react/24/solid";

export interface CreateAppointmentDailyRequest {
  patientId: string;
  doctorId: string;
  doctorScheduleId: number;
  orderStepId: number;
  type: string;
  extraFee: number;
  note: string;
  date: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FollowUpPatientProgressPage() {
  const query = useQuery();
  const patientId = query.get("patientId") ?? "";
  const orderIds = query.get("orderId") ?? "";

  const [orderId, setOrderId] = useState(orderIds);
  const [patient, setPatient] = useState<Patient>();
  const [orderSteps, setOrderSteps] = useState<OrderStep[]>([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [timeSlots, setTimeSlots] = useState<SlotSchedule[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStepDetail, setSelectedStepDetail] = useState<number | null>(
    null
  );
  const [totalEgg, setTotalEgg] = useState<number>(0);

  const [newAppointment, setNewAppointment] =
    useState<CreateAppointmentDailyRequest>({
      patientId: patientId,
      doctorId: "46BA90E4-C329-43DE-AC0C-F799822A5494", // Default doctor ID
      doctorScheduleId: 0,
      orderStepId: 0,
      type: "",
      extraFee: 0,
      note: "",
      date: "",
    });

  // Fetch order steps
  useEffect(() => {
    const fetchOrderSteps = async (orderId: string) => {
      try {
        const result = await axiosInstance.get(`steps/${orderId}`);
        console.log(result);
        setOrderSteps(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderSteps(orderId);
  }, [orderId]);

  // Fetch patient info - Fixed dependency array
  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      try {
        const result = await getPatientById(patientId);
        setPatient(result);
      } catch (error) {
        console.log(error);
      }
    };

    if (patientId) {
      fetchPatient(patientId);
    }
  }, [patientId]); // Added dependency array

  // Fetch time slots
  useEffect(() => {
    const fetchSlotTimes = async () => {
      try {
        if (newAppointment.doctorId && newAppointment.date) {
          const result = await getScheduleSlotTime(
            newAppointment.doctorId,
            newAppointment.date
          );
          setTimeSlots(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlotTimes();
  }, [newAppointment.date, newAppointment.doctorId]);

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

  const renderStepIcon = (step: OrderStep) => {
    let bgColor = "bg-gray-300";

    if (step.status === STEP_COMPLETED) {
      bgColor = "bg-green-500";
    } else if (step.status === STEP_PROGRESS) {
      bgColor = "bg-blue-500";
    } else if (step.status === STEP_FAILED) {
      bgColor = "bg-red-500";
    }

    return (
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${bgColor}`}
      >
        {convertStepIcon(step.treatmentStep.stepOrder)}
      </div>
    );
  };

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

  const handleSubmitNewAppointment = async (
    e: FormEvent<HTMLFormElement>,
    formData: CreateAppointmentDailyRequest
  ) => {
    e.preventDefault();

    // // Validation
    // if (!formData.date || !formData.type || formData.doctorScheduleId === 0) {
    //   Swal.fire({
    //     title: "Vui lòng điền đầy đủ thông tin",
    //     icon: "warning",
    //     draggable: true,
    //   });
    //   return;
    // }

    try {
      console.log(formData);
      const response = await axios.post(
        `https://localhost:7201/api/v1/appointments/${orderId}`,
        formData
      );
      console.log(response);

      Swal.fire({
        title: "Lưu lịch hẹn thành công!",
        icon: "success",
        draggable: true,
      });

      // Reset form and close modal
      setShowAppointmentForm(false);
      setNewAppointment({
        ...newAppointment,
        doctorScheduleId: 0,
        orderStepId: 0,
        type: "",
        extraFee: 0,
        note: "",
        date: "",
      });
      setSelectedTime("");
    } catch (error) {
      console.log(error);
      // Swal.fire({
      //   title: "Có lỗi xảy ra",
      //   icon: "error",
      //   draggable: true,
      // });
    }
  };

  const handleAddAppointment = (stepId: number) => {
    setNewAppointment({
      ...newAppointment,
      orderStepId: stepId,
    });
    setShowAppointmentForm(true);
  };

  const handleMarkStatusStep = async (stepId: number, status: string) => {
    try {
      const response = await axiosInstance.put(
        `/steps/${stepId}?status=${status}`
      );

      setOrderSteps((prev) => {
        const updatedSteps = prev.map((s, index) => {
          if (s.id === stepId) {
            return { ...s, status: status };
          }

          const currentIndex = prev.findIndex((step) => step.id === stepId);
          if (
            index === currentIndex + 1 &&
            status === STEP_COMPLETED &&
            s.status === STEP_PLANNED
          ) {
            return { ...s, status: STEP_PROGRESS };
          }

          return s;
        });

        return updatedSteps;
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật bước:", error);
    }
  };

  const handleAddTotalEggs = async (totalEgg: number) => {
    try {
      const response = await axiosInstance.put(
        `/orders/${orderId}?totalEgg=${totalEgg}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-purple-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
              <HeartIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quy trình IVF của bệnh nhân
              </h1>
              <p className="text-gray-600">
                Theo dõi tiến trình điều trị thụ tinh ống nghiệm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl pb-12">
        {/* Patient info */}
        <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <span className="text-lg font-bold">
                <img
                  src={patient?.profile?.avatarUrl || ""}
                  alt=""
                  className="rounded-full"
                />
              </span>
            </div>
            <div>
              <h2 className="font-bold">
                {patient?.profile ? ConvertFullName(patient.profile) : ""}
              </h2>
              <p className="text-sm text-gray-500">
                {patient?.profile?.dateOfBirth}
              </p>
            </div>
          </div>
          <button className="rounded-md bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200">
            Hồ sơ bệnh nhân
          </button>
        </div>

        {/* Progress overview */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Tiến độ tổng thể</h2>
              <p className="text-gray-600">
                Đã hoàn thành{" "}
                {orderSteps.filter((x) => x.status === STEP_COMPLETED).length}/
                {orderSteps.length} bước (
                {calculateCompletedPercentage(orderSteps)}%)
              </p>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {calculateCompletedPercentage(orderSteps)}%
            </div>
          </div>

          {/* Progress steps */}
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
        </div>

        {/* Treatment steps */}
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
                    <div>{renderStepIcon(step)}</div>
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
                      {step.treatmentStep.stepOrder == STEP_TAKE_EGG &&  
                      <div className="mt-3 flex items-center space-x-1 text-sm text-gray-500">
                        <CubeIcon className="h-4 w-4 text-red-500" />
                        <span>{totalEgg}</span>
                      </div>
                      }
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
                  <div className="flex space-x-1">
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
              {step.treatmentStep.stepOrder == STEP_TAKE_EGG && (
                <div>
                  <label htmlFor="Nhập số trứng">
                    <input
                      type="number"
                      value={totalEgg}
                      onChange={(e) => setTotalEgg(Number(e.target.value))}
                      placeholder="Nhập số trứng..."
                    />
                  </label>
                  <button
                    onClick={() => {
                      handleAddTotalEggs(totalEgg);
                    }}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      step.status === STEP_COMPLETED
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "border border-green-600 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    Cập nhật
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/*Step detail modal*/}
      {selectedStepDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`rounded-full ${
                      getStepBySelectedStepDetail(
                        orderSteps,
                        selectedStepDetail
                      )?.status === STEP_COMPLETED
                        ? "bg-green-500"
                        : getStepBySelectedStepDetail(
                            orderSteps,
                            selectedStepDetail
                          )?.status === STEP_PROGRESS
                        ? "bg-blue-500"
                        : getStepBySelectedStepDetail(
                            orderSteps,
                            selectedStepDetail
                          )?.status === STEP_FAILED
                        ? "bg-red-500"
                        : "bg-gray-400"
                    } p-2`}
                  >
                    {convertStepIcon(
                      getStepBySelectedStepDetail(
                        orderSteps,
                        selectedStepDetail
                      )?.treatmentStep.stepOrder ?? -1
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {
                        getStepBySelectedStepDetail(
                          orderSteps,
                          selectedStepDetail
                        )?.treatmentStep.stepName
                      }
                    </h3>
                    <p className="text-sm text-gray-500">
                      Bước{" "}
                      {
                        getStepBySelectedStepDetail(
                          orderSteps,
                          selectedStepDetail
                        )?.treatmentStep.stepOrder
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
              {getStepBySelectedStepDetail(orderSteps, selectedStepDetail)
                ?.note && (
                <div className="mt-4">
                  <h4 className="font-medium">Ghi chú của bác sĩ</h4>
                  <div className="mt-2 rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                    <DocumentTextIcon className="mb-1 h-5 w-5 text-blue-500" />
                    <p>
                      {
                        getStepBySelectedStepDetail(
                          orderSteps,
                          selectedStepDetail
                        )?.note
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
                      getStepBySelectedStepDetail(
                        orderSteps,
                        selectedStepDetail
                      )?.totalAmount
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Trạng thái thanh toán:
                  </p>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      getStepBySelectedStepDetail(
                        orderSteps,
                        selectedStepDetail
                      )?.status
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
                      getStepBySelectedStepDetail(
                        orderSteps,
                        selectedStepDetail
                      )?.appointments?.length
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
                                {ConvertSlotTime({
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
        </div>
      )}

      {/* Form thêm lịch hẹn */}
      {showAppointmentForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-50 bg-opacity-10 p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="border-b p-4">
              <h4 className="font-medium">Thêm lịch hẹn mới</h4>
            </div>
            <div className="p-4">
              <form
                className="space-y-3"
                onSubmit={(e) => handleSubmitNewAppointment(e, newAppointment)}
              >
                <div>
                  <label className="mb-1 block text-sm font-medium">Ngày</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>
                {newAppointment.date ? (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.slotId}
                        onClick={() => {
                          setSelectedTime(ConvertSlotTime(slot));
                          setNewAppointment({
                            ...newAppointment,
                            doctorScheduleId: slot.scheduleId,
                          });
                        }}
                        className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md border transition-colors duration-200 ${
                          selectedTime === ConvertSlotTime(slot)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <FaClock className="w-3 h-3 mr-1" />
                        {ConvertSlotTime(slot)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Select a date first</p>
                )}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Loại cuộc hẹn
                  </label>
                  <select
                    value={newAppointment.type}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        type: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  >
                    <option value="None">-- Chọn loại cuộc hẹn --</option>
                    <option value="InitialConsultation">Tư vấn</option>
                    <option value="Check">Kiểm tra</option>
                    <option value="Treatment">Điều trị</option>
                    <option value="FollowUp">Theo dõi</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Chi phí thêm (nếu có)
                  </label>
                  <input
                    type="number"
                    value={newAppointment.extraFee}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        extraFee: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Ghi chú
                  </label>
                  <textarea
                    value={newAppointment.note}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        note: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    placeholder="Ghi chú thêm"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setShowAppointmentForm(false)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-purple-600 px-3 py-1.5 text-sm text-white"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
