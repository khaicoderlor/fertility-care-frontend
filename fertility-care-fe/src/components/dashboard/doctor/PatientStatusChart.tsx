import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ORDER_CLOSED,
  ORDER_COMPLETED,
  ORDER_PROGRESS,
} from "../../../constants/OrderStatus";

export interface PatientStatusData {
  name: string;
  value: number;
  color: string;
}

interface PatientStatusChartProps {
  data: PatientStatusData[];
}

const PatientStatusChart: React.FC<PatientStatusChartProps> = ({ data }) => {
  const getStatusOrder = (status: string) => {
    switch (status) {
      case ORDER_COMPLETED:
        return "Hoàn thành";
      case ORDER_PROGRESS:
        return "Đang tiến hành";
      case ORDER_CLOSED:
        return "Đã đóng";
      default:
        return "Bị hủy";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Tình trạng điều trị của bệnh nhân
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">
                {getStatusOrder(item.name)}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientStatusChart;
