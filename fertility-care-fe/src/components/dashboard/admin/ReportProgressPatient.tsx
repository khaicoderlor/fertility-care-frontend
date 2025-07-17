"use client";

import { useState } from "react";
import type { EggReportResponse } from "../../../models/EggReportResponse";
import type { EmbryoReportResponse } from "../../../models/EmbryoReportResponse";
import type { EmbryoTransferredReportResponse } from "../../../models/EmbryoTransferredReportResponse";
import type { Order } from "../../../models/Order";
import type { Patient } from "../../../models/Patient";
import { TbReportAnalytics } from "react-icons/tb";
import { FaBoxOpen, FaFilter, FaCheck } from "react-icons/fa";
import type { PatientSideAdminPage } from "./PatientTable";
import axiosInstance from "../../../apis/AxiosInstance";
import { formatCurrency } from "../../../functions/CommonFunction";
import { IoCloseCircleSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import {
  STEP_COMPLETED,
  STEP_PLANNED,
  STEP_PROGRESS,
} from "../../../constants/StepStatus";
import type OrderStep from "../../../models/OrderStep";
import { PAYMENT_COMPLETED, PAYMENT_FAILED, PAYMENT_PENDING } from "../../../constants/PaymentStatus";

export interface PatientOrderSideAdmin {
  patient: Patient;
  order: Order[];
}

interface ReportProgressPatientSide {
  eggs: EggReportResponse[];
  embryos: EmbryoReportResponse[];
  embryosTransferred: EmbryoTransferredReportResponse[];
  order: Order;
}

interface ReportProgressPatientProps {
  patientsOrders: PatientSideAdminPage[];
}

export const ReportProgressPatient = ({
  patientsOrders,
}: ReportProgressPatientProps) => {
  const [selectedOrderReport, setSelectedOrderReport] =
    useState<ReportProgressPatientSide>();
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null
  );

  const handleViewReportDetail = async (order: Order) => {
    const response = await axiosInstance.get(
      `/statistics/${order.id}/report-progress/admin-sides`
    );
    setSelectedOrderReport(response.data.data);
  };

  const handleClosedOrder = async (order: Order) => {
    const result = await Swal.fire({
      title: "Xác nhận đóng đơn hàng?",
      text: "Bạn sẽ không thể hoàn tác sau khi thực hiện!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.patch(
          `/orders/${order.id}/closed`
        );
        if (response.data?.data) {
          Swal.fire("Thành công!", "Đơn hàng đã được đóng.", "success");
        }
      } catch (error) {
        console.error("Lỗi khi đóng đơn hàng:", error);
        Swal.fire("Lỗi!", "Không thể đóng đơn hàng.", "error");
      }
    }
  };

  const handleUnClosedOrder = async (order: Order) => {
    const result = await Swal.fire({
      title: "Xác nhận mở lại đơn hàng?",
      text: "Bạn sẽ không thể hoàn tác sau khi thực hiện!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.patch(
          `/orders/${order.id}/unclosed`
        );
        if (response.data?.data) {
          Swal.fire("Thành công!", "Đơn hàng đã được mở lại.", "success");
        }
      } catch (error) {
        console.error("Lỗi khi đóng mở hàng:", error);
        Swal.fire("Lỗi!", "Không thể mở đơn hàng.", "error");
      }
    }
  };

  const getStepStatus = (
    stepIndex: number,
    totalSteps: number,
    currentStep: number
  ) => {
    if (stepIndex < currentStep) return STEP_COMPLETED;
    if (stepIndex === currentStep) return STEP_PROGRESS;
    return STEP_PLANNED;
  };

  const calculateProgress = (orderSteps: OrderStep[]) => {
    const currentStep = orderSteps.filter((x) => x.status === STEP_PROGRESS);

    if (typeof currentStep === "undefined" || orderSteps.length === 0) {
      return 0;
    }
    return Math.round(((currentStep.length + 1) / orderSteps.length) * 100);
  };

  const getPaymentStatus = (status: string) => {
    switch(status) {
      case PAYMENT_COMPLETED: 
        return "Đã thanh toán"
      case PAYMENT_PENDING:
        return "Chưa thanh toán"
      case PAYMENT_FAILED:
        return "Thất bại"
      default:
        return "Không rõ"      
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Quản lý đơn điều trị
              </h1>
              <p className="text-gray-600">
                Theo dõi tiến trình điều trị của bệnh nhân
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo ID..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FaFilter className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Bộ lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gói điều trị
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bác sĩ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bệnh nhân
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trữ phôi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bắt đầu
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kết thúc
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patientsOrders.map((po) =>
                  (po.orders ?? []).map((ord: Order) => (
                    <tr
                      key={ord.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{ord.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ord.treatmentService?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ord.doctor?.profile?.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {po.patient.profile?.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            ord.isFrozen
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {ord.isFrozen ? "Có" : "Không"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ord.totalAmount?.toLocaleString()}₫
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ord.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ord.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
                            onClick={() => handleViewReportDetail(ord)}
                            title="Xem báo cáo"
                          >
                            <TbReportAnalytics className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                            onClick={() => handleUnClosedOrder(ord)}
                            title="Mở lại đơn"
                          >
                            <FaBoxOpen className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Đóng đơn điều trị"
                            onClick={() => handleClosedOrder(ord)}
                          >
                            <IoCloseCircleSharp className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Details */}
        {selectedOrderReport && (
          <div className="space-y-6">
            {/* Report Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Báo cáo chi tiết điều trị
              </h2>

              {/* Treatment Timeline */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tiến độ điều trị
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {calculateProgress(
                        selectedOrderReport.order.orderSteps ?? []
                      )}
                      %
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    {(selectedOrderReport.order.orderSteps ?? []).map(
                      (step, index) => {
                        const status = getStepStatus(
                          index,
                          selectedOrderReport.order.orderSteps?.length || 0,
                          selectedStepIndex || -1
                        );

                        return (
                          <div
                            key={step.id}
                            className="flex flex-col items-center relative"
                          >
                            {/* Connection Line */}
                            {index <
                              (selectedOrderReport.order.orderSteps?.length ||
                                0) -
                                1 && (
                              <div
                                className={`absolute top-6 left-6 h-0.5 transition-colors duration-300 ${
                                  status === STEP_COMPLETED
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                                style={{
                                  width: "calc(100vw / 6 - 48px)",
                                  minWidth: "100px",
                                }}
                              />
                            )}

                            {/* Step Circle */}
                            <button
                              onClick={() => setSelectedStepIndex(index)}
                              className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                status === STEP_COMPLETED
                                  ? "bg-green-500 border-green-500 text-white"
                                  : status === STEP_PLANNED
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                              }`}
                            >
                              {status === STEP_COMPLETED ? (
                                <FaCheck className="w-5 h-5" />
                              ) : (
                                <span className="text-sm font-semibold">
                                  {step.treatmentStep.stepOrder}
                                </span>
                              )}
                            </button>

                            {/* Step Label */}
                            <div className="mt-3 text-center">
                              <div className="text-sm font-medium text-gray-900">
                                Bước {step.treatmentStep.stepOrder}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 max-w-20 truncate">
                                {step.treatmentStep.stepName}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Step Details */}
                {selectedStepIndex !== null && (
                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Chi tiết bước{" "}
                      {
                        selectedOrderReport.order.orderSteps?.[
                          selectedStepIndex
                        ].treatmentStep.stepOrder
                      }
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Tên bước:
                          </span>
                          <p className="text-gray-900">
                            {
                              selectedOrderReport.order.orderSteps?.[
                                selectedStepIndex
                              ].treatmentStep.stepName
                            }
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Trạng thái:
                          </span>
                          <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {
                              selectedOrderReport.order.orderSteps?.[
                                selectedStepIndex
                              ].status
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Tổng tiền:
                          </span>
                          <p className="text-gray-900 font-semibold">
                            {formatCurrency(
                              selectedOrderReport.order.orderSteps?.[
                                selectedStepIndex
                              ].totalAmount ?? 0
                            )}
                          </p>
                          <span className="text-sm font-medium text-gray-500">
                            Trạng thái thanh toán:
                          </span>
                          <p className="text-gray-900 font-semibold">
                            {getPaymentStatus(
                              selectedOrderReport.order.orderSteps?.[
                                selectedStepIndex
                              ].paymentStatus??"")
                            }
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Thời gian:
                          </span>
                          <p className="text-gray-900">
                            {
                              selectedOrderReport.order.orderSteps?.[
                                selectedStepIndex
                              ].startDate
                            }{" "}
                            →{" "}
                            {
                              selectedOrderReport.order.orderSteps?.[
                                selectedStepIndex
                              ].endDate
                            }
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Ghi chú:
                          </span>
                          <p className="text-gray-900">
                            {selectedOrderReport.order.orderSteps?.[
                              selectedStepIndex
                            ].note || "Không có ghi chú"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Appointments */}
                    <div className="mt-6">
                      <h5 className="text-md font-semibold text-gray-900 mb-3">
                        Cuộc hẹn
                      </h5>
                      <div className="space-y-3">
                        {(
                          selectedOrderReport.order.orderSteps?.[
                            selectedStepIndex
                          ].appointments ?? []
                        ).map((appt) => (
                          <div
                            key={appt.id}
                            className="bg-white rounded-lg p-4 border border-gray-200"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <span className="text-sm font-medium text-gray-500">
                                  Ngày hẹn:
                                </span>
                                <p className="text-gray-900">
                                  {appt.appointmentDate}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">
                                  Thời gian:
                                </span>
                                <p className="text-gray-900">
                                  {appt.startTime} - {appt.endTime}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">
                                  Bác sĩ:
                                </span>
                                <p className="text-gray-900">
                                  {appt.doctorName}
                                </p>
                              </div>
                            </div>
                            {appt.extraFee && (
                              <div className="mt-2">
                                <span className="text-sm font-medium text-gray-500">
                                  Chi phí phát sinh:
                                </span>
                                <p className="text-red-600 font-semibold">
                                  {formatCurrency(appt.extraFee)}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin đơn hàng
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID:</span>
                    <span className="font-medium">
                      #{selectedOrderReport.order.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gói:</span>
                    <span className="font-medium">
                      {selectedOrderReport.order.treatmentService?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bác sĩ:</span>
                    <span className="font-medium">
                      {selectedOrderReport.order.doctor?.profile?.fullName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bắt đầu:</span>
                    <span className="font-medium">
                      {selectedOrderReport.order.startDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Kết thúc:</span>
                    <span className="font-medium">
                      {selectedOrderReport.order.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-500">Tổng tiền:</span>
                    <span className="font-bold text-lg">
                      {selectedOrderReport.order.totalAmount?.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thống kê tổng quan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedOrderReport.eggs.length}
                    </div>
                    <div className="text-sm text-gray-600">Trứng đã lấy</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedOrderReport.embryos.length}
                    </div>
                    <div className="text-sm text-gray-600">Phôi</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedOrderReport.embryosTransferred.length}
                    </div>
                    <div className="text-sm text-gray-600">Phôi đã chuyển</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedOrderReport.order.orderSteps?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Bước điều trị</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Tables */}
            <div className="space-y-6">
              {/* Eggs Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Trứng đã lấy
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chất lượng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dùng được
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày lấy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrderReport.eggs.map((egg) => (
                        <tr key={egg.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{egg.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {egg.grade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                egg.isUsable
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {egg.isUsable ? "Có" : "Không"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {egg.dateGain}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Embryos Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Phôi</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chất lượng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Từ trứng ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Có thể dùng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trữ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chuyển
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrderReport.embryos.map((em) => (
                        <tr key={em.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{em.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {em.embryoGrade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{em.eggId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {em.embryoStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                em.isViable
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {em.isViable ? "Có" : "Không"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                em.isFrozen
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {em.isFrozen ? "Có" : "Không"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                em.isTransferred
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {em.isTransferred ? "Có" : "Không"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Embryos Transferred Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Phôi đã chuyển
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID Phôi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID Trứng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chất lượng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày chuyển
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại chuyển
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrderReport.embryosTransferred.map((et) => (
                        <tr key={et.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{et.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{et.embryoId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{et.eggId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {et.embryoGrade}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {et.transferDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              {et.transferType}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
