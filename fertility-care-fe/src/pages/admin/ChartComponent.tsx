import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export interface ChartConfig {
  title: string;
  type: "bar" | "line" | "pie" | "doughnut";
  data: {
    labels: string[];
    datasets: any[];
  };
  options?: any;
}

export interface ChartComponentProps {
  config: ChartConfig;
  timeFilter?: string;
  onTimeFilterChange?: (filter: string) => void;
  className?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  config,
  timeFilter = "Tháng này",
  onTimeFilterChange,
  className = "",
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const timeOptions = ["Tháng này", "3 tháng", "6 tháng", "Năm nay"];

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstanceRef.current = new ChartJS(ctx, {
        type: config.type,
        data: config.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top" as const,
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              cornerRadius: 8,
              padding: 12,
            },
          },
          ...config.options,
        },
      });
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [config]);

  const handleTimeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    onTimeFilterChange?.(newFilter);
  };

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{config.title}</h3>
        <select
          value={timeFilter}
          onChange={handleTimeFilterChange}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {timeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full">
        <canvas ref={chartRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default ChartComponent;
