import { BeakerIcon } from "@heroicons/react/24/outline";
import type { EmbryoData } from "../../models/EmbryoData";
import { useState } from "react";
import type { Order } from "../../models/Order";

interface EmbryoDataCardProps {
  embryoData: EmbryoData[];
  order: Order
}

export function EmbryoDataCard({ embryoData, order }: EmbryoDataCardProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleDetail = (index: number) => {
    setOpenIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  const totalEmbryos = embryoData.reduce(
    (sum, d) => sum + (d.embryoQuantity ?? 0),
    0
  );

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <BeakerIcon className="w-5 h-5 text-white" />
          </div>
          Kết quả thụ tinh & phôi
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {/* Egg Summary */}
        {/* <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Tổng số trứng sử dụng:
            </span>
            <span className="text-lg font-bold text-blue-600">
              {totalEggUsed}
            </span>
          </div>
        </div> */}

        {/* Embryo Types */}
        <div className="space-y-3">
          <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
            {embryoData.map((data, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border-l-4 border-blue-400"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    Chất lượng: {data.embryoGrade}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">
                      {data.embryoQuantity}
                    </span>
                    <button
                      onClick={() => toggleDetail(index)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      {openIndexes.has(index) ? "▲" : "▼"}
                    </button>
                  </div>
                </div>

                {/* {openIndexes.has(index) && (
                  <div className="text-sm text-gray-600 mt-2 pl-2">
                    {data.eggMap ? (
                      <ul className="list-disc list-inside">
                        {Array.from(data.eggMap.entries()).map(
                          ([key, value]) => (
                            <li key={key}>
                              Loại {key}: {value} trứng
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>Không có dữ liệu trứng</p>
                    )}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <span className="font-medium">Tổng số phôi thành công:</span>
            <span className="text-2xl font-bold">{totalEmbryos}</span>
          </div>
          <div className="text-sm opacity-90 mt-1">
            Tỷ lệ thành công:{" "}
            {(order.totalEggs ?? 0) > 0 ? Math.round((totalEmbryos / (order.totalEggs ?? 1)) * 100) : 0}%
          </div>
        </div>
      </div>
    </div>
  );
}
