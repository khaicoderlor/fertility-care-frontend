import React from "react";

interface Stat {
  label: string;
  value: string | number;
  trend: number;
  unit: string;
}

const DashboardStats: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    {stats.map((item, idx) => (
      <div key={idx} className="bg-white rounded-xl p-4 shadow flex flex-col">
        <div className="text-gray-500 text-sm">{item.label}</div>
        <div className="text-2xl font-bold">{item.value}</div>
        <div
          className={`text-xs mt-1 ${
            item.trend > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {item.trend > 0 ? "+" : ""}
          {item.trend}
          {item.unit} so với tháng trước
        </div>
      </div>
    ))}
  </div>
);

export default DashboardStats;
