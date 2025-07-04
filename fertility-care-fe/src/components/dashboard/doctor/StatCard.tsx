import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center mt-2">
          <span
            className={`text-sm font-medium ${
              changeType === "increase" ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeType === "increase" ? "↗" : "↘"} {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
        </div>
      </div>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
