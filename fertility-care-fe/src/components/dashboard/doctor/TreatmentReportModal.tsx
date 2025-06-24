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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Báo cáo quá trình điều trị</h2>
          <button
            onClick={onClose}
            className="text-sm text-red-600 hover:underline"
          >
            Đóng
          </button>
        </div>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Danh sách trứng</h3>
          <table className="w-full table-auto border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Loại</th>
                <th className="border px-2 py-1">Đạt tiểu chuẩn</th>
                <th className="border px-2 py-1">Ngày lấy trứng</th>
              </tr>
            </thead>
            <tbody>
              {eggs.map((egg) => (
                <tr key={egg.id}>
                  <td className="border px-2 py-1">#{egg.id}</td>
                  <td className="border px-2 py-1">{egg.grade}</td>
                  <td className="border px-2 py-1">
                    {egg.isUsable ? (
                      <TiTick className="px-2 py-1 text-green-500" />
                    ) : (
                      <MdDoNotDisturb className="px-2 py-1 text-red-500" />
                    )}
                  </td>
                  <td className="border px-2 py-1">{egg.dateGain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-6">
          z<h3 className="text-lg font-semibold mb-2">Danh sách phôi</h3>
          <table className="w-full table-auto border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Loại phôi</th>
                <th className="border px-2 py-1">loại trứng</th>
                <th className="border px-2 py-1">Đạt tiêu chuẩn</th>
                <th className="border px-2 py-1">Trạng thái</th>
                <th className="border px-2 py-1">Lưu trữ lạnh</th>
                <th className="border px-2 py-1">Chuyển phôi</th>
              </tr>
            </thead>
            <tbody>
              {embryos.map((e) => (
                <tr key={e.id}>
                  <td className="border px-2 py-1">#{e.id}</td>
                  <td className="border px-2 py-1">{e.embryoGrade}</td>
                  <td className="border px-2 py-1">{e.eggGrade}</td>
                  <td className="border px-2 py-1">
                    {e.isViable ? (
                      <TiTick className="px-2 py-1 text-green-500" />
                    ) : (
                      <MdDoNotDisturb className="px-2 py-1 text-red-500" />
                    )}
                  </td>
                  <td className="border px-2 py-1">{e.embryoStatus}</td>
                  <td className="border px-2 py-1">
                    {e.isFrozen ? (
                      <TiTick className="px-2 py-1 text-green-500" />
                    ) : (
                      <MdDoNotDisturb className="px-2 py-1 text-red-500" />
                    )}
                  </td>
                  <td className="border px-2 py-1">
                    {e.isTransferred ? (
                      <TiTick className="px-2 py-1 text-green-500" />
                    ) : (
                      <MdDoNotDisturb className="px-2 py-1 text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Lịch sử chuyển phôi</h3>
          <table className="w-full table-auto border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Loại phôi</th>
                <th className="border px-2 py-1">Ngày chuyển</th>
                <th className="border px-2 py-1">Kiểu chuyển</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((t) => (
                <tr key={t.id}>
                  <td className="border px-2 py-1">#{t.id}</td>
                  <td className="border px-2 py-1">{t.embryoGrade}</td>
                  <td className="border px-2 py-1">{t.transferDate}</td>
                  <td className="border px-2 py-1">{t.transferType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
