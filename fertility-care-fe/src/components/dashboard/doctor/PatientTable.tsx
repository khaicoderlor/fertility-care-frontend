import { useEffect, useState } from "react";
import { useCompetenceAuth } from "../../../contexts/CompetenceAuthContext";
import axiosInstance from "../../../apis/AxiosInstance";
import type { PatientDashboard } from "../../../models/PatientDashboard";
import { Link } from "react-router-dom";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

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
        console.error(error);
      }
    };

    if (doctorId) fetchPatients(doctorId);
  }, [doctorId]);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const startIndex = (currentPage - 1) * pageSize;
  const displayedPatients = patients?.slice(startIndex, startIndex + pageSize) ?? [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Bệnh nhân của tôi</h3>
          <p className="text-sm text-gray-600 mt-1">Danh sách bệnh nhân đang theo dõi</p>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 mt-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Bệnh nhân</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Phác đồ</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Bắt đầu</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Kết thúc</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Lưu trữ lạnh</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Số trứng</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Số phôi</th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedPatients.length > 0 ? (
              displayedPatients.map((patient) => (
                <tr key={patient.patientId} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{patient.patientName}</td>
                  <td className="py-3 px-4">{patient.treatmentName}</td>
                  <td className="py-3 px-4">{patient.startDate}</td>
                  <td className="py-3 px-4">{patient.endDate ?? "-"}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 text-xs bg-gray-200 rounded">
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{patient.isFrozen ? "Có" : "Không"}</td>
                  <td className="py-3 px-4">{patient.totalEggs}</td>
                  <td className="py-3 px-4">{patient.totalEmbryos}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/follow-up/patient/progress?patientId=${patient.patientId}&orderId=${patient.orderId}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-4 h-4 mr-1" /> Lộ trình
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="py-12 text-center text-gray-500">
                  Chưa có bệnh nhân nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
