import React from "react";
import type { ScheduleItem } from "../../../models/ScheduleItem";

interface Props {
  schedules: ScheduleItem[];
  onSelectDate: (date: string) => void;
}

const Calendar: React.FC<Props> = ({ schedules, onSelectDate }) => {
  const weekDates = ["2024-12-16", "2024-12-17", "2024-12-18", "2024-12-19", "2024-12-20", "2024-12-21", "2024-12-22"];
  const dayLabels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

  const getShiftClass = (type: string) => {
    switch (type) {
      case "morning":
        return "bg-green-100 text-green-800";
      case "afternoon":
        return "bg-blue-100 text-blue-800";
      case "evening":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-7 gap-1 mb-6">
      {dayLabels.map((label) => (
        <div key={label} className="bg-gray-100 p-3 text-center font-semibold text-gray-700">
          {label}
        </div>
      ))}
      {weekDates.map(date => {
        const day = new Date(date).getDate();
        const daySchedules = schedules.filter(s => s.date === date);
        return (
          <div
            key={date}
            className="border border-gray-200 p-2 min-h-32 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectDate(date)}
          >
            <div className="text-sm font-medium mb-2">{day}</div>
            <div className="space-y-1">
              {daySchedules.map((item, index) => (
                <div key={index} className={`${getShiftClass(item.shiftType)} text-xs px-2 py-1 rounded`}>
                  <div className="font-medium">{item.startTime}-{item.endTime}</div>
                  <div className="text-xs">{item.doctorName}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
