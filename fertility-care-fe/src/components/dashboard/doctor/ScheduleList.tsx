import React from "react";
import TimeSlot from "./TimeSlot";
import type { Appointment } from "./TimeSlot";

interface ScheduleListProps {
  appointments: Appointment[];
  onAddAppointment: () => void;
  onViewAppointment: (appointment: Appointment) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  appointments,
  onAddAppointment,
  onViewAppointment,
}) => {
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
  ];

  const getAppointmentForTime = (time: string) => {
    return appointments.find((apt) => apt.time === time);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Lịch trình IUI/IVF hôm nay
        </h3>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
            IUI
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
            IVF
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Hoàn thành
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {timeSlots.map((time) => {
          const appointment = getAppointmentForTime(time);
          return (
            <TimeSlot
              key={time}
              appointment={appointment}
              onAddAppointment={onAddAppointment}
              onViewDetails={onViewAppointment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleList;
