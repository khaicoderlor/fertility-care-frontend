"use client"

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
} from "@heroicons/react/24/outline"
import { STEP_COMPLETED, STEP_FAILED, STEP_PROGRESS } from "../../../constants/StepStatus"
import { convertSlotTime, getStepBySelectedStepDetail } from "../../../functions/CommonFunction"
import type OrderStep from "../../../models/OrderStep"
import { PAYMENT_COMPLETED } from "../../../constants/PaymentStatus"
import type { Order } from "../../../models/Order"
import { STEP_TRANSFER } from "../../../constants/IVFConstant"
import { useState } from "react"
import TransferEmbryoForm from "./TransferEmbryoForm"
import axiosInstance from "../../../apis/AxiosInstance"
import Swal from "sweetalert2"
import { APPOINTMENT_CANCELLED, APPOINTMENT_COMPLETED } from "../../../constants/AppointmentStatus"

interface SelectedCardDetailProps {
  orderSteps: OrderStep[]
  selectedStepDetail: number
  setSelectedStepDetail: (selectedStepDetail: number | null) => void
  order: Order
}

export default function SelectedCardDetail({
  orderSteps,
  selectedStepDetail,
  setSelectedStepDetail,
  order,
}: SelectedCardDetailProps) {
  const [showTransferForm, setShowTransferForm] = useState(false)

  const handleMarkStatusAppointment = async (a: string, status: string) => {
    try {
      const response = await axiosInstance.patch(`appointments/mark-status/${a}?status=${status}`)
      const res = response.data.data
      if (res) {
        Swal.fire({
          title: "Cập nhật hoàn tất!",
          icon: "success",
        })
      } else {
        Swal.fire({
          title: "Cuộc hẹn trước chưa hoàn thành!",
          icon: "error",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const convertStepIcon = (stepOrder: number) => {
    switch (stepOrder) {
      case 1:
        return <DocumentTextIcon className="h-7 w-7 text-white" />
      case 2:
        return <SparklesIcon className="h-7 w-7 text-white" />
      case 3:
        return <MagnifyingGlassIcon className="h-7 w-7 text-white" />
      case 4:
        return <BeakerIcon className="h-7 w-7 text-white" />
      case 5:
        return <HeartIcon className="h-7 w-7 text-white" />
      case 6:
        return <ChartBarIcon className="h-7 w-7 text-white" />
      default:
        return <DocumentTextIcon className="h-7 w-7 text-white" />
    }
  }

  const currentStep = getStepBySelectedStepDetail(orderSteps, selectedStepDetail)

  const getStatusGradient = (status: string) => {
    switch (status) {
      case STEP_COMPLETED:
        return "bg-gradient-to-br from-emerald-500 to-green-600"
      case STEP_PROGRESS:
        return "bg-gradient-to-br from-blue-500 to-indigo-600"
      case STEP_FAILED:
        return "bg-gradient-to-br from-red-500 to-rose-600"
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-500"
    }
  }

  return (
    <>
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-6 py-8">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`${getStatusGradient(currentStep?.status || "")} rounded-2xl p-3 shadow-lg`}>
                {convertStepIcon(currentStep?.treatmentStep.stepOrder ?? -1)}
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold leading-tight">{currentStep?.treatmentStep.stepName}</h3>
                <p className="text-blue-100 font-medium">Bước {currentStep?.treatmentStep.stepOrder}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedStepDetail(null)}
              className="rounded-full bg-white/20 p-2 text-white transition-all duration-200 hover:bg-white/30 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-lg">{currentStep?.treatmentStep.description}</p>
            </div>

            {/* Doctor's Note */}
            {currentStep?.note && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
                  Ghi chú của bác sĩ
                </h4>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                  <p className="text-gray-700 leading-relaxed">{currentStep?.note}</p>
                </div>
              </div>
            )}

            {/* Cost and Payment Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center mb-2">
                  <BanknotesIcon className="h-6 w-6 text-green-600 mr-2" />
                  <p className="text-sm font-medium text-green-800">Chi phí</p>
                </div>
                <p className="text-2xl font-bold text-green-900">{currentStep?.totalAmount?.toLocaleString()} VNĐ</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center mb-2">
                  <ClockIcon className="h-6 w-6 text-orange-600 mr-2" />
                  <p className="text-sm font-medium text-orange-800">Trạng thái thanh toán</p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    currentStep?.status === PAYMENT_COMPLETED
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-orange-100 text-orange-800 border border-orange-200"
                  }`}
                >
                  {currentStep?.status === PAYMENT_COMPLETED ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div>
            </div>

            {/* Appointments */}
            {currentStep?.appointments && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 flex items-center">
                  <CalendarIcon className="h-6 w-6 text-blue-600 mr-2" />
                  Lịch hẹn ({currentStep?.appointments?.length})
                </h4>

                <div className="space-y-4">
                  {currentStep?.appointments?.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Appointment Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h5 className="text-lg font-semibold text-gray-900">{appointment.type}</h5>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              appointment.status === APPOINTMENT_COMPLETED
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : appointment.status === APPOINTMENT_CANCELLED
                                  ? "bg-red-100 text-red-800 border border-red-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {appointment.status === APPOINTMENT_COMPLETED
                              ? "Đã hoàn thành"
                              : appointment.status === APPOINTMENT_CANCELLED
                                ? "Đã hủy"
                                : "Đã lên lịch"}
                          </span>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                            <CalendarIcon className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-sm text-gray-600">Ngày hẹn</p>
                              <p className="font-semibold text-gray-900">{appointment.appointmentDate}</p>
                              <p className="text-sm text-gray-600">Slot: {appointment.slot}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                            <ClockIcon className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm text-gray-600">Thời gian</p>
                              <p className="font-semibold text-gray-900">
                                {convertSlotTime({
                                  slotId: -1,
                                  startTime: appointment.startTime ?? "",
                                  endTime: appointment.endTime ?? "",
                                  scheduleId: -1,
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                            <UserIcon className="h-5 w-5 text-purple-600" />
                            <div>
                              <p className="text-sm text-gray-600">Bác sĩ</p>
                              <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
                            </div>
                          </div>
                        </div>

                        {/* Extra Fee */}
                        {appointment.extraFee != -1 && (
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                            <div className="flex items-start space-x-3">
                              <BanknotesIcon className="h-6 w-6 text-green-600 mt-1" />
                              <div>
                                <p className="font-semibold text-green-900 mb-1">Chi phí phát sinh (nếu có):</p>
                                <p className="text-xl font-bold text-green-800">
                                  {appointment.extraFee?.toLocaleString()} VNĐ
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
                          <p className="font-semibold text-gray-900 mb-2">Ghi chú:</p>
                          <p className="text-gray-700 leading-relaxed">{appointment.note}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                          {order.treatmentService?.name === "IVF" &&
                            currentStep?.treatmentStep.stepOrder === STEP_TRANSFER && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setShowTransferForm(true)
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                              >
                                Thêm dữ liệu chuyển phôi
                              </button>
                            )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkStatusAppointment(appointment.id ?? "", APPOINTMENT_COMPLETED)
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
                          >
                            Hoàn thành
                          </button>
                        </div>

                        {/* Transfer Form Modal */}
                        {showTransferForm && (
                          <TransferEmbryoForm
                            orderId={order.id ?? ""}
                            appointmentId={appointment.id ?? null}
                            onClose={() => setShowTransferForm(false)}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
