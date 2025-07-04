import React from "react";
import type { ScheduleItem } from "../../../models/ScheduleItem";

interface Props {
  schedules: ScheduleItem[];
}

const Calendar: React.FC<Props> = ({ schedules }) => {
  const dayLabels = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];

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
        <div
          key={label}
          className="bg-gray-100 p-3 text-center font-semibold text-gray-700"
        >
          {label}
        </div>
      ))}
      <div className="border border-gray-200 p-2 min-h-32 hover:bg-gray-50 cursor-pointer">
        {schedules.map((item) => (
          <div>
            <div className="text-sm font-medium mb-2">{item.workDate}</div>
            <div className="space-y-1">
              <div
                key={item.scheduleId}
                className={`${getShiftClass(
                  item.shiftType
                )} text-xs px-2 py-1 rounded`}
              >
                <div className="font-medium">
                  {item.startTime}-{item.endTime}
                </div>
                <div className="text-xs">{`BS. ${item.middleName} ${item.lastName}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
