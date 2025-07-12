import React, { useMemo } from "react";
import { parse, format, addDays, startOfWeek, isSameDay } from "date-fns";
import vi from "date-fns/locale/vi";
import type { ScheduleItem } from "../../../models/ScheduleItem";

interface Props {
  /** Lấy từ API đã map sẵn sang DD/MM/YYYY … */
  schedules: ScheduleItem[];
}

const dayLabels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

const getShiftClass = (type: string) => {
  switch (type) {
    case "morning":
      return "bg-green-100 text-green-800";
    case "afternoon":
      return "bg-blue-100 text-blue-800";
    case "evening":
      return "bg-purple-100 text-purple-800";
    case "off": 
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Calendar: React.FC<Props> = ({ schedules }) => {
  const weekDays = useMemo(() => {
    const first = schedules.length
      ? parse(schedules[0].workDate, "dd/MM/yyyy", new Date())
      : new Date();
    const start = startOfWeek(first, { weekStartsOn: 1 }); 
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [schedules]);

  const schedulesByDay = useMemo(
    () =>
      weekDays.map((day) =>
        schedules.filter((s) =>
          isSameDay(parse(s.workDate, "dd/MM/yyyy", new Date()), day)
        )
      ),
    [weekDays, schedules]
  );

  return (
    <>
      <div className="grid grid-cols-7 gap-1 mb-6">
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className="border border-gray-200 p-2 min-h-32 hover:bg-gray-50 cursor-pointer flex flex-col space-y-1"
          >
            {/* Tiêu đề ngày */}
            <div className="text-center font-semibold text-gray-700 mb-1">
              {dayLabels[idx]} <br />
              <span className="text-xs font-normal">
                {format(day, "dd/MM", { locale: vi })}
              </span>
            </div>

            {/* Ca trực (hoặc Nghỉ) */}
            {schedulesByDay[idx].length ? (
              schedulesByDay[idx].map((item) => (
                <div
                  key={item.scheduleId}
                  className={`${getShiftClass(
                    item.shiftType
                  )} text-sm px-2 py-3 rounded`}
                >
                  <div className="font-medium">
                    Bắt đầu: {item.startTime}
                  </div>
                  <div className="font-medium">
                    Kết thúc: {item.endTime}
                  </div>
                  <div className="font-bold">{`BS. ${item.middleName ?? ""} ${
                    item.lastName ?? ""
                  }`}</div>
                </div>
              ))
            ) : (
              <div
                className={`${getShiftClass(
                  "off"
                )} text-xs px-2 py-1 rounded text-center`}
              >
                Nghỉ
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        {[
          ["bg-green-100 border-green-300", "Ca sáng (8:00‑12:00)"],
          ["bg-blue-100 border-blue-300", "Ca chiều (13:00‑17:00)"],
          ["bg-purple-100 border-purple-300", "Ca tối (18:00‑22:00)"],
          ["bg-red-100 border-red-300", "Nghỉ"],
        ].map(([cls, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${cls} border rounded`} />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
