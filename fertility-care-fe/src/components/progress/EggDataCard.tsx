import type { Order } from "../../models/Order";

interface EggDataCardProps {
  order: Order;
}

export function EggDataCard({ order }: EggDataCardProps) {
  return (
    <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-0 shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-pink-200">
        <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🥚</span>
          </div>
          Kết quả thu thập trứng
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-pink-600">
              {order.totalEggs ?? 0}
            </div>
            <div className="text-sm text-gray-600">Tổng số trứng</div>
          </div>
          {/* {eggData.matureEggs && (
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-pink-600">
                {eggData.matureEggs}
              </div>
              <div className="text-sm text-gray-600">Trứng chín</div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
