import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Order } from "../../models/Order";
import axiosInstance from "../../apis/AxiosInstance";
import { convertFullName } from '../../functions/CommonFunction';

interface PrescriptionItem {
  id: number;
  medicationName: string;
  quantity: number;
  specialInstructions: string;
}

export interface Prescription {
  id: string;
  order: Order;
  prescriptionDate: string;
  prescriptionItems: PrescriptionItem[];
}

export const PrescriptionPage = () => {
  const { patientId } = useAuth();
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(prescriptions.length / pageSize);
  const currentPrescriptions = prescriptions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axiosInstance.get(`/prescriptions/${patientId}`);
        setPrescriptions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrescription();
  }, [patientId]);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded border ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Danh sách đơn thuốc</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left font-semibold">
            <tr>
              <th className="p-3 border-b">Mã đơn thuốc</th>
              <th className="p-3 border-b">Gói điều trị</th>
              <th className="p-3 border-b">Bác sĩ</th>
              <th className="p-3 border-b">Ngày tạo</th>
              <th className="p-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {currentPrescriptions.map((pre) => (
              <tr key={pre.id} className="border-b">
                <td className="p-3">{pre.id}</td>
                <td className="p-3">{pre.order.treatmentService?.name || "N/A"}</td>
                <td className="p-3">{convertFullName(pre.order.doctor?.profile ?? {}) || "N/A"}</td>
                <td className="p-3">{pre.prescriptionDate}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedPrescription(pre)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Trang trước
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-2">
              Chi tiết đơn thuốc: {selectedPrescription.id}
            </h3>
            <p><strong>Ngày kê đơn:</strong> {selectedPrescription.prescriptionDate}</p>
            <p><strong>Gói điều trị:</strong> {selectedPrescription.order.treatmentService?.name || "N/A"}</p>
            <p><strong>Bác sĩ:</strong> {convertFullName(selectedPrescription.order.doctor?.profile ?? {}) || "N/A"}</p>

            <table className="w-full mt-4 border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-left font-semibold">
                <tr>
                  <th className="p-2 border-b">Tên thuốc</th>
                  <th className="p-2 border-b">Số lượng</th>
                  <th className="p-2 border-b">Chỉ dẫn đặc biệt</th>
                </tr>
              </thead>
              <tbody>
                {selectedPrescription.prescriptionItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.medicationName}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.specialInstructions || "Không có"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setSelectedPrescription(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded mt-4 hover:bg-gray-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
