import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/AxiosInstance";
import type { EmbryoReportResponse } from "../../../models/EmbryoReportResponse";
import type { EggReportResponse } from "../../../models/EggReportResponse";
import type { EmbryoTransferredReportResponse } from "../../../models/EmbryoTransferredReportResponse";
import { TiTick } from "react-icons/ti";
import { MdDoNotDisturb } from "react-icons/md";
import type { Prescription } from "../../../pages/patient/PrescriptionPage";

interface TreatmentReportModalProps {
  orderId: string;
  onClose: () => void;
}

export default function TreatmentReportModal({
  orderId,
  onClose,
}: TreatmentReportModalProps) {
  const [embryos, setEmbryos] = useState<EmbryoReportResponse[]>([]);
  const [eggs, setEggs] = useState<EggReportResponse[]>([]);
  const [transfers, setTransfers] = useState<EmbryoTransferredReportResponse[]>(
    []
  );
  const [prescriptons, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [embryoRes, eggRes, transferRes, prescriptions] =
          await Promise.all([
            axiosInstance.get(`/embryos/${orderId}/report`),
            axiosInstance.get(`/eggs/${orderId}/report`),
            axiosInstance.get(`/transfers/${orderId}/report`),
            axiosInstance.get(`/prescriptions/${orderId}/by-order`),
          ]);

        setEmbryos(embryoRes.data.data);
        setEggs(eggRes.data.data);
        setTransfers(transferRes.data.data);
        setPrescriptions(prescriptions.data.data);
      } catch (error) {
        console.error("Error loading treatment reports:", error);
      }
    };
    fetchData();
  }, [orderId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Báo cáo quá trình điều trị</h2>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200"
            >
              Đóng
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Đơn thuốc</h3>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">
                      Mã đơn
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">
                      Ngày kê đơn
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">
                      Tổng số thuốc
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-red-800">
                      Chi tiết
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {prescriptons.map((prescription, index) => (
                    <tr
                      key={prescription.id}
                      className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{prescription.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {prescription.prescriptionDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {prescription.prescriptionItems.length}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-blue-600 hover:underline">
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedPrescription && (
              <div className="mt-6 border border-gray-200 rounded-xl shadow p-6 bg-gray-50">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Chi tiết đơn thuốc #{selectedPrescription.id}
                </h4>
                <ul className="space-y-3">
                  {selectedPrescription.prescriptionItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
                    >
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">
                          {item.medicationName}
                        </span>
                        {item.specialInstructions && (
                          <span className="text-gray-500">
                            {" "}
                            — {item.specialInstructions}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-700">
                        Số lượng: {item.quantity}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Eggs Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                Danh sách trứng
              </h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-800">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-800">
                      Loại
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-800">
                      Đạt tiểu chuẩn
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-800">
                      Ngày lấy trứng
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {eggs.map((egg, index) => (
                    <tr
                      key={egg.id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{egg.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {egg.grade}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {egg.isUsable ? (
                          <div className="flex justify-center">
                            <TiTick className="w-6 h-6 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <MdDoNotDisturb className="w-6 h-6 text-red-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {egg.dateGain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Embryos Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                Danh sách phôi
              </h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">
                      Loại phôi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">
                      Loại trứng
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-800">
                      Đạt tiêu chuẩn
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-800">
                      Lưu trữ lạnh
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-800">
                      Chuyển phôi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {embryos.map((e, index) => (
                    <tr
                      key={e.id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{e.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {e.embryoGrade}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {e.eggGrade}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {e.isViable ? (
                          <div className="flex justify-center">
                            <TiTick className="w-6 h-6 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <MdDoNotDisturb className="w-6 h-6 text-red-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {e.embryoStatus}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {e.isFrozen ? (
                          <div className="flex justify-center">
                            <TiTick className="w-6 h-6 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <MdDoNotDisturb className="w-6 h-6 text-red-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {e.isTransferred ? (
                          <div className="flex justify-center">
                            <TiTick className="w-6 h-6 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <MdDoNotDisturb className="w-6 h-6 text-red-500" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Transfer History Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                Lịch sử chuyển phôi
              </h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">
                      Loại phôi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">
                      Ngày chuyển
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">
                      Kiểu chuyển
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transfers.map((t, index) => (
                    <tr
                      key={t.id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{t.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {t.embryoGrade}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {t.transferDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {t.transferType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
