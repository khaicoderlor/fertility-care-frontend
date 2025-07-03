import React, { useState } from "react";

interface SimpleChartProps {
  className?: string;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("success");

  const tabs = [
    {
      id: "success",
      label: "Tỷ lệ thành công IUI vs IVF",
      icon: "fas fa-chart-pie",
    },
    {
      id: "revenue",
      label: "Doanh thu trong tháng",
      icon: "fas fa-dollar-sign",
    },
    {
      id: "doctors",
      label: "Bác sĩ có tỷ lệ rate & booking cao nhất",
      icon: "fas fa-star",
    },
  ];

  const renderChart = () => {
    switch (activeTab) {
      case "success":
        return (
          <div className="h-64 bg-white rounded-lg p-6 relative">
            {/* Legend */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <div className="w-4 h-3 bg-purple-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">
                  Tỷ lệ thành công (%)
                </span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-48 w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>100%</span>
                <span>90%</span>
                <span>80%</span>
                <span>70%</span>
                <span>60%</span>
                <span>50%</span>
                <span>40%</span>
                <span>30%</span>
                <span>20%</span>
                <span>10%</span>
                <span>0%</span>
              </div>

              {/* Grid lines */}
              <div className="absolute left-12 top-0 right-0 h-full">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${(i / 10) * 100}%` }}
                  />
                ))}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full border-l border-gray-200"
                    style={{ left: `${(i / 2) * 100}%` }}
                  />
                ))}
              </div>

              {/* Bar Chart */}
              <div className="absolute left-12 top-0 right-0 bottom-8 h-full flex items-end justify-center space-x-20">
                {/* IVF Bar */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 bg-purple-500 transition-all duration-1000 ease-out shadow-lg"
                    style={{ height: `${(72 / 100) * 160}px` }}
                  />
                  <span className="text-sm text-gray-700 mt-3 font-medium">
                    IVF
                  </span>
                </div>

                {/* IUI Bar */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 bg-blue-500 transition-all duration-1000 ease-out shadow-lg"
                    style={{ height: `${(45 / 100) * 160}px` }}
                  />
                  <span className="text-sm text-gray-700 mt-3 font-medium">
                    IUI
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "revenue":
        return (
          <div className="h-64 bg-white rounded-lg p-6 relative">
            {/* Legend */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <div className="w-4 h-3 bg-green-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">Doanh thu (VND)</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-48 w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>800M VND</span>
                <span>700M VND</span>
                <span>600M VND</span>
                <span>500M VND</span>
                <span>400M VND</span>
                <span>300M VND</span>
                <span>200M VND</span>
                <span>100M VND</span>
                <span>0M VND</span>
              </div>

              {/* Grid lines */}
              <div className="absolute left-16 top-0 right-0 h-full">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${(i / 8) * 100}%` }}
                  />
                ))}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full border-l border-gray-200"
                    style={{ left: `${(i / 3) * 100}%` }}
                  />
                ))}
              </div>

              {/* Line Chart */}
              <div className="absolute left-16 top-0 right-0 bottom-8 h-full">
                <svg
                  viewBox="0 0 400 180"
                  className="w-full h-full"
                  style={{ overflow: "visible" }}
                >
                  {/* Area fill */}
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity="0.05"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 0 135 L 133 68 L 266 77 L 400 32 L 400 180 L 0 180 Z"
                    fill="url(#areaGradient)"
                    className="transition-all duration-1000 ease-out"
                  />

                  {/* Line */}
                  <path
                    d="M 0 135 L 133 68 L 266 77 L 400 32"
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />

                  {/* Data points */}
                  {[
                    { x: 0, y: 135, value: 450 },
                    { x: 133, y: 68, value: 620 },
                    { x: 266, y: 77, value: 580 },
                    { x: 400, y: 32, value: 740 },
                  ].map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#10b981"
                      className="transition-all duration-1000 ease-out hover:r-6"
                    />
                  ))}
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-16 right-0 flex justify-between text-xs text-gray-500 px-1">
                <span>Tuần 1</span>
                <span>Tuần 2</span>
                <span>Tuần 3</span>
                <span>Tuần 4</span>
              </div>
            </div>

            {/* Summary Box */}
            <div className="absolute top-6 right-6 bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  2.4B
                </div>
                <div className="text-sm text-gray-600 mb-2">Tổng doanh thu</div>
                <div className="flex items-center justify-center text-sm text-green-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">+8%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "doctors":
        return (
          <div className="h-64 bg-white rounded-lg p-6 relative">
            {/* Legend */}
            <div className="flex items-center mb-4 space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-3 bg-orange-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">
                  Tỷ lệ rating (sao)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-3 bg-blue-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">Số lượng booking</span>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-48 w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>5 ⭐</span>
                <span>4.5 ⭐</span>
                <span>4 ⭐</span>
                <span>3.5 ⭐</span>
                <span>3 ⭐</span>
                <span>2.5 ⭐</span>
                <span>2 ⭐</span>
                <span>1.5 ⭐</span>
                <span>1 ⭐</span>
                <span>0.5 ⭐</span>
                <span>0 ⭐</span>
              </div>

              {/* Right Y-axis labels for bookings */}
              <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>50 booking</span>
                <span>45 booking</span>
                <span>40 booking</span>
                <span>35 booking</span>
                <span>30 booking</span>
                <span>25 booking</span>
                <span>20 booking</span>
                <span>15 booking</span>
                <span>10 booking</span>
                <span>5 booking</span>
                <span>0 booking</span>
              </div>

              {/* Grid lines */}
              <div className="absolute left-12 top-0 right-16 h-full">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-t border-gray-200"
                    style={{ top: `${(i / 10) * 100}%` }}
                  />
                ))}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full border-l border-gray-200"
                    style={{ left: `${(i / 5) * 100}%` }}
                  />
                ))}
              </div>

              {/* Grouped Bar Chart */}
              <div className="absolute left-12 top-0 right-16 bottom-8 h-full flex items-end justify-between px-4">
                {[
                  {
                    name: "BS. Nguyễn A",
                    shortName: "BS. Nguyễn A",
                    rating: 4.6,
                    bookings: 45,
                  },
                  {
                    name: "BS. Trần B",
                    shortName: "BS. Trần B",
                    rating: 4.5,
                    bookings: 38,
                  },
                  {
                    name: "BS. Lê C",
                    shortName: "BS. Lê C",
                    rating: 4.6,
                    bookings: 42,
                  },
                  {
                    name: "BS. Phạm D",
                    shortName: "BS. Phạm D",
                    rating: 4.4,
                    bookings: 35,
                  },
                  {
                    name: "BS. Hoàng E",
                    shortName: "BS. Hoàng E",
                    rating: 4.8,
                    bookings: 47,
                  },
                ].map((doctor, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group relative"
                  >
                    {/* Grouped Bars */}
                    <div className="flex items-end space-x-1 mb-2">
                      {/* Rating Bar */}
                      <div className="relative">
                        <div
                          className="w-6 bg-orange-500 transition-all duration-300 ease-out hover:bg-orange-600 cursor-pointer shadow-sm"
                          style={{ height: `${(doctor.rating / 5) * 140}px` }}
                        />
                      </div>

                      {/* Booking Bar */}
                      <div className="relative">
                        <div
                          className="w-6 bg-blue-500 transition-all duration-300 ease-out hover:bg-blue-600 cursor-pointer shadow-sm"
                          style={{
                            height: `${(doctor.bookings / 50) * 140}px`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Doctor Name */}
                    <span className="text-xs text-gray-700 font-medium text-center leading-tight">
                      {doctor.shortName}
                    </span>

                    {/* Single tooltip for the entire group */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 shadow-xl pointer-events-none">
                      <div className="font-semibold text-center mb-1">
                        {doctor.name}
                      </div>
                      <div className="text-center">
                        <div>⭐ Rating: {doctor.rating}</div>
                        <div>📅 Bookings: {doctor.bookings}</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tab Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Biểu đồ thống kê
        </h3>
        <div className="flex space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h3>
          <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Tháng này</option>
            <option>3 tháng</option>
            <option>6 tháng</option>
            <option>Năm nay</option>
          </select>
        </div>
        {renderChart()}
      </div>
    </div>
  );
};

export default SimpleChart;
