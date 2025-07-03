import React from "react";
import type { Appointment } from "./TimeSlot";

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onViewAppointment: (appointment: Appointment) => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
  onViewAppointment,
}) => {
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Lịch hẹn sắp tới
      </h3>
      <div className="space-y-3">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => onViewAppointment(appointment)}
            className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-8 rounded-full ${
                  appointment.treatmentType === "IUI"
                    ? "bg-purple-400"
                    : "bg-blue-400"
                }`}
              ></div>
              <div className="flex-1">
                <p className="font-medium text-sm">
                  {appointment.time} - {appointment.patientName}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.description}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  appointment.treatmentType === "IUI"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {appointment.treatmentType}
              </span>
            </div>
          </div>
        ))}

        {upcomingAppointments.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-calendar-plus text-gray-400 text-2xl"></i>
            </div>
            <p className="text-gray-500 text-sm">Không có lịch hẹn sắp tới</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
