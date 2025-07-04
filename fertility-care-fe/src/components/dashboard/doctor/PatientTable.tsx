import { useEffect, useState } from "react";
import { useCompetenceAuth } from "../../../contexts/CompetenceAuthContext";
import axiosInstance from "../../../apis/AxiosInstance";
import type { PatientDashboard } from "../../../models/PatientDashboard";
import { Link } from "react-router-dom";

export default function PatientTable() {
  const { doctorId } = useCompetenceAuth();
  const [patients, setPatients] = useState<PatientDashboard[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  const totalPages = Math.ceil((patients?.length || 0) / pageSize);

  useEffect(() => {
    const fetchPatients = async (dId: string) => {
      try {
        const response = await axiosInstance.get(`/doctors/${dId}/patients`);

        setPatients(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients(doctorId ?? "");
  }, [doctorId]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Bệnh nhân của tôi
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Danh sách bệnh nhân đang theo dõi
            </p>
          </div>

          <div className="flex gap-2 mt-4 justify-end">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Bệnh nhân
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Phác đồ điều trị
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Email
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Số điện thoại
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Ngày bắt đầu
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Ngày kết thúc
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Trạng thái
              </th>
                Lưu trữ lạnh
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Số trứng
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm">
                Số phôi
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-700 text-sm"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients && patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  className="hover:bg-gray-50 transition-colors duration-150"
                  key={patient.patientId}
                >
                  <td className="py-4 px-6">{patient.patientName}</td>
                  <td className="py-4 px-6">{patient.treatmentName}</td>
                  <td className="py-4 px-6">{patient.email}</td>
                  <td className="py-4 px-6">{patient.phone}</td>
                  <td className="py-4 px-6 text-sm">{patient.startDate}</td>
                  <td className="py-4 px-6 text-sm">
                    {patient.endDate ?? "-"}
                  </td>
                  <td className="py-4 px-6 text-sm">{patient.status}</td>
                  <td className="py-4 px-6 text-sm">{patient.isFrozen ? "Có" : "Không"}</td>
                  <td className="py-4 px-6 text-sm">{patient.totalEggs}</td>
                  <td className="py-4 px-6 text-sm">{patient.totalEmbryos}</td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/follow-up/patient/progress?patientId=${patient.patientId}&orderId=${patient.orderId}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                    >
                      <i className="fas fa-eye mr-2"></i>
                      Lộ trình
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-users text-gray-400 text-2xl"></i>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Chưa có bệnh nhân nào
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Danh sách bệnh nhân sẽ hiển thị ở đây
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
