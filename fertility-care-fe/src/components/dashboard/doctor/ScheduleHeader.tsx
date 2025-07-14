import React from "react";
import { useLocation } from "react-router-dom";
import type { Doctor } from "../../../models/Doctor";
import { convertFullName } from "../../../functions/CommonFunction";

// interface Props {
//   onOpenModal: () => void;
// }

export default function ScheduleHeader() {
  const location = useLocation();
  const doctor = location.state as Doctor



  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Lịch làm việc bác sĩ</h3>
      <div className="flex gap-3">
        <h2
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          BS. {convertFullName(doctor.profile)}
        </h2>
      </div>
    </div>
  );
};

