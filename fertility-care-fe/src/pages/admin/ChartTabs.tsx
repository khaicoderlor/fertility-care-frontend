import React, { useState } from "react";
import ChartComponent from "./ChartComponent";
import type { ChartConfig } from "./ChartComponent";

export interface ChartTab {
  id: string;
  label: string;
  icon: string;
  config: ChartConfig;
}

export interface ChartTabsProps {
  tabs: ChartTab[];
  defaultTab?: string;
  className?: string;
}

const ChartTabs: React.FC<ChartTabsProps> = ({
  tabs,
  defaultTab = tabs[0]?.id,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [timeFilter, setTimeFilter] = useState("Tháng này");

  const activeTabConfig = tabs.find((tab) => tab.id === activeTab)?.config;

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
                    ? "chart-tab-active text-white"
                    : "chart-tab text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Chart */}
      {activeTabConfig && (
        <ChartComponent
          config={activeTabConfig}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />
      )}
    </div>
  );
};

export default ChartTabs;
