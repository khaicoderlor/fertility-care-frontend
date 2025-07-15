import { useState } from "react";
import type { EggReportResponse } from "../../../models/EggReportResponse";
import type { EmbryoReportResponse } from "../../../models/EmbryoReportResponse";
import type { EmbryoTransferredReportResponse } from "../../../models/EmbryoTransferredReportResponse";
import type { Order } from "../../../models/Order";
import type { Patient } from "../../../models/Patient";
import { TbReportAnalytics } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import type { PatientSideAdminPage } from "./PatientTable";
import axiosInstance from "../../../apis/AxiosInstance";

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
    const response = await axiosInstance.get(`/statistics/${order.id}/report-progress/admin-sides`)
    setSelectedOrderReport(response.data.data)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        📋 Danh sách đơn gói điều trị
      </h3>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="🔍 Nhập ID..."
          className="border px-3 py-2 rounded w-1/3"
        />
        <div className="flex items-center gap-2">
          <FaFilter className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">Bộ lọc</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Gói điều trị</th>
              <th className="px-4 py-2">Bác sĩ</th>
              <th className="px-4 py-2">Bệnh nhân</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Trữ phôi</th>
              <th className="px-4 py-2">Tổng tiền</th>
              <th className="px-4 py-2">Bắt đầu</th>
              <th className="px-4 py-2">Kết thúc</th>
              <th className="px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {patientsOrders.map((po) =>
              (po.orders ?? []).map((ord: Order) => (
                <tr key={ord.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{ord.id}</td>
                  <td className="px-4 py-2">{ord.treatmentService?.name}</td>
                  <td className="px-4 py-2">{ord.doctor?.profile?.fullName}</td>
                  <td className="px-4 py-2">{po.patient.profile?.fullName}</td>
                  <td className="px-4 py-2">{ord.status}</td>
                  <td className="px-4 py-2">{ord.isFrozen ? "✔️" : "❌"}</td>
                  <td className="px-4 py-2">
                    {ord.totalAmount?.toLocaleString()}₫
                  </td>
                  <td className="px-4 py-2">{ord.startDate}</td>
                  <td className="px-4 py-2">{ord.endDate}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-800"
                      onClick={() => handleViewReportDetail(ord)}
                    >
                      <TbReportAnalytics className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrderReport && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-2">
            🧬 Thống kê phôi và trứng
          </h4>

          {/* Egg Report Table */}
          <div className="overflow-x-auto mb-6">
            <h5 className="font-semibold mb-2">Trứng đã lấy</h5>
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Chất lượng</th>
                  <th className="px-4 py-2">Dùng được</th>
                  <th className="px-4 py-2">Ngày lấy</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderReport.eggs.map((egg) => (
                  <tr key={egg.id} className="border-t">
                    <td className="px-4 py-2">{egg.id}</td>
                    <td className="px-4 py-2">{egg.grade}</td>
                    <td className="px-4 py-2">{egg.isUsable ? "✔️" : "❌"}</td>
                    <td className="px-4 py-2">{egg.dateGain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Embryo Table */}
          <div className="overflow-x-auto mb-6">
            <h5 className="font-semibold mb-2">Phôi</h5>
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Chất lượng</th>
                  <th className="px-4 py-2">Từ trứng ID</th>
                  <th className="px-4 py-2">Trạng thái</th>
                  <th className="px-4 py-2">Có thể dùng</th>
                  <th className="px-4 py-2">Trữ</th>
                  <th className="px-4 py-2">Chuyển</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderReport.embryos.map((em) => (
                  <tr key={em.id} className="border-t">
                    <td className="px-4 py-2">{em.id}</td>
                    <td className="px-4 py-2">{em.embryoGrade}</td>
                    <td className="px-4 py-2">{em.eggId}</td>
                    <td className="px-4 py-2">{em.embryoStatus}</td>
                    <td className="px-4 py-2">{em.isViable ? "✔️" : "❌"}</td>
                    <td className="px-4 py-2">{em.isFrozen ? "✔️" : "❌"}</td>
                    <td className="px-4 py-2">
                      {em.isTransferred ? "✔️" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Embryo Transfer Table */}
          <div className="overflow-x-auto mb-6">
            <h5 className="font-semibold mb-2">Phôi đã chuyển</h5>
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">ID Phôi</th>
                  <th className="px-4 py-2">ID Trứng</th>
                  <th className="px-4 py-2">Chất lượng</th>
                  <th className="px-4 py-2">Ngày chuyển</th>
                  <th className="px-4 py-2">Loại chuyển</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderReport.embryosTransferred.map((et) => (
                  <tr key={et.id} className="border-t">
                    <td className="px-4 py-2">{et.id}</td>
                    <td className="px-4 py-2">{et.embryoId}</td>
                    <td className="px-4 py-2">{et.eggId}</td>
                    <td className="px-4 py-2">{et.embryoGrade}</td>
                    <td className="px-4 py-2">{et.transferDate}</td>
                    <td className="px-4 py-2">{et.transferType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary & Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold mb-2">📦 Thông tin đơn</h5>
              <p>
                <strong>ID:</strong> {selectedOrderReport.order.id}
              </p>
              <p>
                <strong>Gói:</strong>{" "}
                {selectedOrderReport.order.treatmentService?.name}
              </p>
              <p>
                <strong>Bác sĩ:</strong>{" "}
                {selectedOrderReport.order.doctor?.profile?.fullName}
              </p>
              <p>
                <strong>Bắt đầu:</strong> {selectedOrderReport.order.startDate}
              </p>
              <p>
                <strong>Kết thúc:</strong> {selectedOrderReport.order.endDate}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {selectedOrderReport.order.totalAmount?.toLocaleString()}₫
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-2">🔁 Các bước điều trị</h5>
              <div className="flex flex-wrap gap-2">
                {(selectedOrderReport.order.orderSteps ?? []).map((step, i) => (
                  <button
                    key={step.id}
                    onClick={() => setSelectedStepIndex(i)}
                    className={`px-4 py-2 rounded border text-sm ${
                      selectedStepIndex === i
                        ? "bg-indigo-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    Bước {step.treatmentStep.stepOrder}
                  </button>
                ))}
              </div>
              {selectedStepIndex !== null && (
                <div className="mt-4 border p-4 rounded">
                  <h6 className="font-semibold mb-2">
                    📌 Chi tiết bước{" "}
                    {
                      selectedOrderReport.order.orderSteps?.[selectedStepIndex]
                        .treatmentStep.stepOrder
                    }
                  </h6>
                  <p>
                    <strong>Tên bước:</strong>{" "}
                    {
                      selectedOrderReport.order.orderSteps?.[selectedStepIndex]
                        .treatmentStep.stepName
                    }
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    {
                      selectedOrderReport.order.orderSteps?.[selectedStepIndex]
                        .status
                    }
                  </p>
                  <p>
                    <strong>Thời gian:</strong>{" "}
                    {
                      selectedOrderReport.order.orderSteps?.[selectedStepIndex]
                        .startDate
                    }{" "}
                    →{" "}
                    {
                      selectedOrderReport.order.orderSteps?.[selectedStepIndex]
                        .endDate
                    }
                  </p>
                  <p>
                    <strong>Ghi chú:</strong>{" "}
                    {
                      selectedOrderReport.order.orderSteps?.[selectedStepIndex]
                        .note
                    }
                  </p>

                  <div className="mt-4">
                    <h6 className="font-semibold mb-2">📅 Cuộc hẹn</h6>
                    <ul className="list-disc list-inside">
                      {(
                        selectedOrderReport.order.orderSteps?.[
                          selectedStepIndex
                        ].appointments ?? []
                      ).map((appt) => (
                        <li key={appt.id}>
                          {appt.appointmentDate} - {appt.startTime} đến{" "}
                          {appt.endTime} với {appt.doctorName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
