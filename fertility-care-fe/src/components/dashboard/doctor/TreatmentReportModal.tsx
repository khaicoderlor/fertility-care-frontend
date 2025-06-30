import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/AxiosInstance";
import type { EmbryoReportResponse } from "../../../models/EmbryoReportResponse";
import type { EggReportResponse } from "../../../models/EggReportResponse";
import type { EmbryoTransferredReportResponse } from "../../../models/EmbryoTransferredReportResponse";
import { TiTick } from "react-icons/ti";
import { MdDoNotDisturb } from "react-icons/md";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [embryoRes, eggRes, transferRes] = await Promise.all([
          axiosInstance.get(`/embryos/${orderId}/report`),
          axiosInstance.get(`/eggs/${orderId}/report`),
          axiosInstance.get(`/transfers/${orderId}/report`),
        ]);

        setEmbryos(embryoRes.data.data);
        setEggs(eggRes.data.data);
        setTransfers(transferRes.data.data);
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
          {/* Eggs Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Danh sách trứng</h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-800">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-800">Loại</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-800">Đạt tiểu chuẩn</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-800">Ngày lấy trứng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {eggs.map((egg, index) => (
                    <tr key={egg.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{egg.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{egg.grade}</td>
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
                      <td className="px-6 py-4 text-sm text-gray-700">{egg.dateGain}</td>
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
              <h3 className="text-2xl font-bold text-gray-800">Danh sách phôi</h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">Loại phôi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">Loại trứng</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-800">Đạt tiêu chuẩn</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-purple-800">Trạng thái</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-800">Lưu trữ lạnh</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-800">Chuyển phôi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {embryos.map((e, index) => (
                    <tr key={e.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{e.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{e.embryoGrade}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{e.eggGrade}</td>
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
                      <td className="px-6 py-4 text-sm text-gray-700">{e.embryoStatus}</td>
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
              <h3 className="text-2xl font-bold text-gray-800">Lịch sử chuyển phôi</h3>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Loại phôi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Ngày chuyển</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Kiểu chuyển</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transfers.map((t, index) => (
                    <tr key={t.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{t.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{t.embryoGrade}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{t.transferDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{t.transferType}</td>
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