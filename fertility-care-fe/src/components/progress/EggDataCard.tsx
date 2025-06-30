import type { EggData } from "../../models/EggData";
import type { Order } from "../../models/Order";

interface EggDataCardProps {
  order: Order;
  eggs: EggData[];
}

export function EggDataCard({ order, eggs }: EggDataCardProps) {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-0 shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-pink-200">
        <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">🥚</span>
          </div>
          Kết quả thu thập trứng
        </h3>
      </div>

      <div className="p-6">
        <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div className="flex flex-col items-center space-y-2 bg-gray-100 py-5 rounded-md">
            {/* Tổng số trứng */}
            Tổng số trứng
            <div className="text-4xl font-extrabold text-pink-600">
              {order.totalEgg ?? 0}
            </div>
            <div className="text-sm text-gray-500 font-medium">
              
            </div>
          </div>

          {/* Danh sách loại trứng */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-gray-700 border-t border-gray-200">
              <thead>
                <tr className="text-left bg-pink-100 text-pink-600">
                  <th className="py-2 px-3 font-semibold">Loại trứng</th>
                  <th className="py-2 px-3 font-semibold">Số lượng</th>
                  <th className="py-2 px-3 font-semibold">Số trứng thỏa điều kiện</th>
                </tr>
              </thead>
              <tbody>
                {eggs.map((egg, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-pink-50 transition">
                    <td className="py-2 px-3 text-center align-middle">{egg.grade}</td>
                    <td className="py-2 px-3 text-center align-middle">{egg.quantity}</td>
                    <td className="py-2 px-3 text-center align-middle">{egg.viableCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
