import type React from "react";
import {
  APPOINTMENT_BOOKED,
  APPOINTMENT_COMPLETED,
  APPOINTMENT_CANCELLED,
  APPOINTMENT_CONFIRMED,
} from "../../constants/AppointmentStatus";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import { formatCurrency } from "../../functions/CommonFunction";
import { ITEMS_PER_PAGE } from "../../constants/ApplicationConstant";

interface AppointmentData {
  id: string;
  doctorName: string;
  specialization: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  treatmentServiceName: string;
  target: string;
  treatmentStepName: string;
  extraFee: number;
  note: string;
  appointmentStatus: string;
}

const AppointmentTable: React.FC = () => {
  const { patientId } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get(
          `/patients/${patientId}/follow-appointment`
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [patientId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case APPOINTMENT_BOOKED:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case APPOINTMENT_COMPLETED:
        return "bg-green-100 text-green-800 border-green-200";
      case APPOINTMENT_CONFIRMED:
        return "bg-gray-100 text-gray-800 border-gray-200";
      case APPOINTMENT_CANCELLED:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAppointmentStatus = (status: string): string => {
    switch (status) {
      case APPOINTMENT_BOOKED:
        return "Đã lên lịch";
      case APPOINTMENT_COMPLETED:
        return "Hoàn thành";
      case APPOINTMENT_CANCELLED:
        return "Bị hủy";
      default:
        return "Xác nhận";
    }
  };

  const convertAppointmentType = (status: string): string => {
    switch (status) {
      case "InitialConsultation":
        return "Khám ban đầu";
      case "FollowUp":
        return "Theo dõi";
      case "Treatment":
        return "Điều trị";
      case "Check":
        return "Kiểm tra";
      default:
        return "Khác";
    }
  };

  // Tính toán phân trang
  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = appointments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Theo dõi lịch hẹn
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi tất cả các cuộc hẹn khám bệnh
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-base font-medium text-gray-500">
                    Bác sĩ & Chuyên môn
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-gray-500">
                    Ngày & Giờ
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-gray-500">
                    Chi tiết điều trị
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-gray-500">
                    Chi phí phát sinh
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-gray-500">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-base font-medium text-gray-500">
                    Ghi chú
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.doctorName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.specialization}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.appointmentDate}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.startTime} - {appointment.endTime}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {convertAppointmentType(appointment.target)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Bước: {appointment.treatmentStepName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`text-sm font-medium ${
                          appointment.extraFee > 0
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {formatCurrency(appointment.extraFee)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          appointment.appointmentStatus
                        )}`}
                      >
                        {getAppointmentStatus(appointment.appointmentStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-500 max-w-xs truncate"
                        title={appointment.note}
                      >
                        {appointment.note}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-4 bg-gray-50 border-t flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Trang trước
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Trang sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
