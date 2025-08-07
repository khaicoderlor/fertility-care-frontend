import type { EggData } from "../../models/EggData";
import type { Order } from "../../models/Order";

interface EggDataCardProps {
  order: Order;
  eggs: EggData[];
}

export function EggDataCard({ order, eggs }: EggDataCardProps) {
  return (
    <div className="bg-gray-50 border-0 shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-pink-200">
        <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          Kết quả thu thập trứng
        </p>
      </div>

      <div className="p-6">
        <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div className="flex flex-col items-center space-y-2 bg-gray-100 py-5 rounded-md">
            Tổng số trứng
            <div className="text-4xl font-extrabold text-pink-600">
              {order.totalEgg ?? 0}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border-t border-gray-200">
              <thead>
                <tr className="text-left bg-pink-100 text-pink-600">
                  <th className="py-2 px-3 font-semibold">Loại trứng</th>
                  <th className="py-2 px-3 font-semibold">Số lượng</th>
                  <th className="py-2 px-3 font-semibold">
                    Số trứng thỏa điều kiện
                  </th>
                </tr>
              </thead>
              <tbody>
                {eggs.map((egg, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-pink-50 transition-all"
                  >
                    <td className="py-2 px-3 text-center align-middle">
                      {egg.grade}
                    </td>
                    <td className="py-2 px-3 text-center align-middle">
                      {egg.quantity}
                    </td>
                    <td className="py-2 px-3 text-center align-middle">
                      {egg.viableCount}
                    </td>
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
