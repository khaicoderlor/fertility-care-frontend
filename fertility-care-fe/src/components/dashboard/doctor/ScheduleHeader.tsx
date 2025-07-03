import React from "react";

interface Props {
  onOpenModal: () => void;
}

const ScheduleHeader: React.FC<Props> = ({ onOpenModal }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Lịch làm việc bác sĩ</h3>
      <div className="flex gap-3">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Chọn bác sĩ</option>
          <option value="1">BS. Nguyễn Văn A</option>
          <option value="2">BS. Lê Thị B</option>
          <option value="3">BS. Hoàng Văn C</option>
        </select>
        <button
          onClick={onOpenModal}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <i className="fas fa-plus mr-2"></i>Thêm lịch
        </button>
      </div>
    </div>
  );
};

export default ScheduleHeader;
