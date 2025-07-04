import React from "react";
import {
  PlusIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Thao tác nhanh
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
          <div className="text-center">
            <PlusIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Thêm bệnh nhân mới
            </span>
          </div>
        </button>

        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200">
          <div className="text-center">
            <CalendarDaysIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Đặt lịch hẹn
            </span>
          </div>
        </button>

        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200">
          <div className="text-center">
            <DocumentTextIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Tạo đơn thuốc
            </span>
          </div>
        </button>

        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors duration-200">
          <div className="text-center">
            <ChartBarIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Xem báo cáo
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
