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
  const {patientId} = useAuth();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get(`/patients/${patientId}/follow-appointment`);

        setAppointments(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetch()
  }, [patientId])

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bác sĩ & Chuyên môn
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày & Giờ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chi tiết điều trị
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chi phí phát sinh
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Doctor & Service */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.doctorName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.specialization}
                        </div>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.appointmentDate}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.startTime} - {appointment.endTime}
                        </div>
                      </div>
                    </td>

                    {/* Treatment Details */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {appointment.target}
                        </div>
                        <div className="text-sm text-gray-500">
                          Bước: {appointment.treatmentStepName}
                        </div>
                      </div>
                    </td>

                    {/* Fee */}
                    <td className="px-6 py-4 whitespace-nowrap">
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

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          appointment.appointmentStatus
                        )}`}
                      >
                        {getAppointmentStatus(appointment.appointmentStatus)}
                      </span>
                    </td>

                    {/* Notes */}
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
        </div>

        {/* Footer Stats
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">
              {
                sampleAppointments.filter(
                  (a) => a.appointmentStatus === "Booked"
                ).length
              }
            </div>
            <div className="text-sm text-gray-500">Booked</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {
                sampleAppointments.filter(
                  (a) => a.appointmentStatus === "Confirmed"
                ).length
              }
            </div>
            <div className="text-sm text-gray-500">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-600">
              {
                sampleAppointments.filter(
                  (a) => a.appointmentStatus === "Completed"
                ).length
              }
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-red-600">
              {
                sampleAppointments.filter(
                  (a) => a.appointmentStatus === "Cancelled"
                ).length
              }
            </div>
            <div className="text-sm text-gray-500">Cancelled</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AppointmentTable;
