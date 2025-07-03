import React from "react";

export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  treatmentType: "IUI" | "IVF";
  description: string;
  status: "completed" | "in-progress" | "upcoming";
}

interface TimeSlotProps {
  appointment?: Appointment;
  onAddAppointment?: () => void;
  onViewDetails?: (appointment: Appointment) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  appointment,
  onAddAppointment,
  onViewDetails,
}) => {
  if (!appointment) {
    return (
      <div className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-500 w-16">--:--</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-plus text-gray-400 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Thời gian trống</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onAddAppointment}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            + Thêm lịch hẹn
          </button>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bgClass: "bg-green-50 border-green-200",
          statusBadge: "bg-green-100 text-green-700",
          statusText: "Hoàn thành",
        };
      case "in-progress":
        return {
          bgClass: "bg-yellow-50 border-yellow-200",
          statusBadge: "bg-yellow-100 text-yellow-700",
          statusText: "Đang diễn ra",
        };
      case "upcoming":
        return {
          bgClass: "bg-blue-50 border-blue-200",
          statusBadge: "bg-blue-100 text-blue-700",
          statusText: "Sắp tới",
        };
      default:
        return {
          bgClass: "bg-gray-50 border-gray-200",
          statusBadge: "bg-gray-100 text-gray-700",
          statusText: "Không xác định",
        };
    }
  };

  const getTreatmentConfig = (type: string) => {
    return type === "IUI"
      ? {
          icon: "fas fa-syringe",
          bgClass: "bg-purple-100",
          iconClass: "text-purple-600",
          badgeClass: "bg-purple-100 text-purple-700",
        }
      : {
          icon: "fas fa-microscope",
          bgClass: "bg-blue-100",
          iconClass: "text-blue-600",
          badgeClass: "bg-blue-100 text-blue-700",
        };
  };

  const statusConfig = getStatusConfig(appointment.status);
  const treatmentConfig = getTreatmentConfig(appointment.treatmentType);

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${statusConfig.bgClass}`}
      onClick={() => onViewDetails?.(appointment)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-gray-500 w-16">
            {appointment.time}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${treatmentConfig.bgClass}`}
              >
                <i
                  className={`${treatmentConfig.icon} ${treatmentConfig.iconClass} text-sm`}
                ></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {appointment.patientName}
                </h4>
                <p className="text-sm text-gray-600">
                  {appointment.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.statusBadge}`}
          >
            {statusConfig.statusText}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${treatmentConfig.badgeClass}`}
          >
            {appointment.treatmentType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
