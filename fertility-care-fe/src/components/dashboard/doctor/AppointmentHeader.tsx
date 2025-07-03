import React from "react";

interface AppointmentHeaderProps {
  onFilterClick: () => void;
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  onFilterClick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Lịch hẹn IUI/IVF</h2>
          <p className="text-gray-600 mt-1">
            Lịch hẹn điều trị IUI và IVF hàng ngày
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onFilterClick}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="fas fa-filter mr-2"></i>
            Lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHeader;
