import React from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

interface MonthlyStats {
  patientsThisMonth: number;
  visitsThisMonth: number;
  growth: number;
}

interface ChartData {
  label: string;
  patients: number;
  visits: number;
}

const MAX_Y = 80;

const PatientMonthlyStats: React.FC<{
  monthlyStats: MonthlyStats;
  chartData: ChartData[];
}> = ({ monthlyStats, chartData }) => (
  <div className="bg-white rounded-xl p-6 shadow flex-1">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-xl">Thống kê bệnh nhân theo tháng</h2>
      <span className="flex items-center gap-1 text-green-500 font-semibold">
        <ArrowTrendingUpIcon className="w-5 h-5" />+{monthlyStats.growth}%
      </span>
    </div>

    <div className="flex gap-8 mb-4">
      <div className="bg-blue-50 rounded-lg p-4 flex-1 text-center">
        <div className="text-3xl font-bold text-blue-600">
          {monthlyStats.patientsThisMonth}
        </div>
        <div className="text-gray-500">Bệnh nhân tháng này</div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 flex-1 text-center">
        <div className="text-3xl font-bold text-gray-700">
          {monthlyStats.visitsThisMonth}
        </div>
        <div className="text-gray-500">Lượt khám tháng này</div>
      </div>
    </div>

    {/* Chart với cột biểu đồ */}
    <div className="relative h-56 mt-4">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        {[0, 20, 40, 60, 80].map((y) => (
          <div
            key={y}
            className="absolute left-0 w-full border-t border-gray-200"
            style={{ bottom: `${(y / MAX_Y) * 100}%` }}
          >
            <span className="absolute -left-8 text-xs text-gray-400 -translate-y-1/2">
              {y}
            </span>
          </div>
        ))}
      </div>

      {/* Chart bars */}
      <div className="flex h-full items-end justify-center gap-4 pl-8">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className="flex gap-1 items-end mb-2"
              style={{ height: "200px" }}
            >
              {/* Cột bệnh nhân (màu cam) */}
              <div
                className="w-4 bg-orange-400 rounded-t-sm"
                style={{
                  height: `${(item.patients / MAX_Y) * 100}%`,
                  minHeight: "2px",
                }}
                title={`Bệnh nhân: ${item.patients}`}
              />
              {/* Cột lượt khám (màu xanh) */}
              <div
                className="w-4 bg-teal-500 rounded-t-sm"
                style={{
                  height: `${(item.visits / MAX_Y) * 100}%`,
                  minHeight: "2px",
                }}
                title={`Lượt khám: ${item.visits}`}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PatientMonthlyStats;
