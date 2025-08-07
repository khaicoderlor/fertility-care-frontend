import type { EmbryoData } from "../../models/EmbryoData";
import type { Order } from "../../models/Order";
import { EMBRYO_AVAILABLE, EMBRYO_TRANSFERRED, EMBRYO_DISCARDED } from '../../constants/EmbryoStatus';

interface EmbryoDataCardProps {
  embryoData: EmbryoData[];
  order: Order;
}

export function EmbryoDataCard({ embryoData, order }: EmbryoDataCardProps) {
  const totalEmbryos = embryoData.length;

  const getStatusVi = (status: string) => {
    switch (status) {
      case EMBRYO_AVAILABLE:
        return "Có sẵn"
      case EMBRYO_TRANSFERRED:
        return "Đã chuyển phôi"
      case EMBRYO_DISCARDED:
        return "Đã hủy"
      default:
        return "-"    
    }
  }

  return (
    <div className="bg-gray-50 border-0 shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-blue-200">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          Kết quả thụ tinh & phôi
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-pink-500 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <span className="font-medium">Tổng số phôi thành công:</span>
            <span className="text-2xl font-bold">{totalEmbryos}</span>
          </div>
          <div className="text-sm">
            Tỷ lệ thành công:{" "}
            {(order.totalEgg ?? 0) > 0
              ? Math.round((totalEmbryos / (order.totalEgg ?? 1)) * 100)
              : 0}
            %
          </div>
        </div>

        <div className="overflow-x-auto max-h-72 overflow-y-auto">
          <table className="min-w-full text-sm text-gray-700 border-t border-gray-200">
            <thead>
              <tr className="text-left bg-pink-100 text-pink-700">
                <th className="py-2 px-3 font-semibold">Loại phôi</th>
                <th className="py-2 px-3 font-semibold">Loại trứng</th>
                <th className="py-2 px-3 font-semibold">Trạng thái</th>
                <th className="py-2 px-3 font-semibold">Đông lạnh</th>
              </tr>
            </thead>
            <tbody>
              {embryoData.map((data) => (
                <tr
                  key={data.id}
                  className="border-t border-gray-100 hover:bg-blue-50 transition-all"
                >
                  <td className="py-2 px-3">{data.embryoGrade}</td>
                  <td className="py-2 px-3">{data.eggGrade ?? "—"}</td>
                  <td className="py-2 px-3">{getStatusVi(data.status??"-")}</td>
                  <td className="py-2 px-3">
                    {data.isFrozen ? "Có" : "Không"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
