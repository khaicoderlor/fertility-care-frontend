import React, { useState } from "react";

interface DateNavigationProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DateNavigation: React.FC<DateNavigationProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysOfWeek = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
    onDateChange(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateChange(today);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateDate("prev")}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <i className="fas fa-chevron-left text-gray-600"></i>
          </button>
          <h3 className="text-xl font-semibold text-gray-800">
            {formatDate(currentDate)}
          </h3>
          <button
            onClick={() => navigateDate("next")}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <i className="fas fa-chevron-right text-gray-600"></i>
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-white text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Hôm nay
          </button>
          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg">
            Ngày
          </button>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {getDaysOfWeek().map((day, index) => {
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected = day.toDateString() === currentDate.toDateString();

          return (
            <div
              key={index}
              onClick={() => {
                setCurrentDate(day);
                onDateChange(day);
              }}
              className={`flex-shrink-0 text-center p-3 rounded-lg cursor-pointer transition-colors ${
                isSelected || isToday
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div
                className={`text-xs ${
                  isSelected || isToday ? "text-purple-100" : "text-gray-500"
                }`}
              >
                {day.toLocaleDateString("vi-VN", { weekday: "narrow" })}
              </div>
              <div className="text-sm font-medium">{day.getDate()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateNavigation;
