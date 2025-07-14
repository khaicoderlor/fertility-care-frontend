import React, { useState } from "react";
import type { Doctor, ScheduleSlot } from "../../../data/DataAdminDoctorPage";
import { shiftTypes } from "../../../data/DataAdminDoctorPage";

interface ScheduleManagementProps {
  doctors: Doctor[];
  schedules: ScheduleSlot[];
  onAddSchedule?: (schedule: Omit<ScheduleSlot, "id">) => void;
}

const DoctorScheduleManagement: React.FC<ScheduleManagementProps> = ({
  doctors,
  schedules,
  onAddSchedule,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Modal form state
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    startTime: "",
    endTime: "",
    shiftType: "morning" as "morning" | "afternoon" | "evening",
  });

  // Generate week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust for Sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const getSchedulesForDate = (date: Date) => {
    const dateString = formatDate(date);
    return schedules.filter(
      (schedule) =>
        schedule.date === dateString &&
        (selectedDoctor === "" || schedule.doctorId === selectedDoctor)
    );
  };

  const getShiftColor = (shiftType: string) => {
    switch (shiftType) {
      case "morning":
        return "shift-morning";
      case "afternoon":
        return "shift-afternoon";
      case "evening":
        return "shift-evening";
      default:
        return "bg-gray-100";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.doctorId ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (formData.startTime >= formData.endTime) {
      alert("Giờ kết thúc phải sau giờ bắt đầu");
      return;
    }

    const doctor = doctors.find((d) => d.id === formData.doctorId);
    const newSchedule: Omit<ScheduleSlot, "id"> = {
      ...formData,
      doctorName: doctor?.name || "",
      status: "available",
    };

    onAddSchedule?.(newSchedule);
    setShowModal(false);
    setFormData({
      doctorId: "",
      date: "",
      startTime: "",
      endTime: "",
      shiftType: "morning",
    });
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(newDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Quản lý lịch làm việc bác sĩ
        </h3>
        <div className="flex gap-3">
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Tất cả bác sĩ</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Thêm lịch
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-700">
          Tuần {formatDisplayDate(weekDates[0])} -{" "}
          {formatDisplayDate(weekDates[6])}, {currentWeek.getFullYear()}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => navigateWeek("prev")}
            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => navigateWeek("next")}
            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {/* Header */}
        {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"].map(
          (day) => (
            <div
              key={day}
              className="bg-gray-100 p-3 text-center font-semibold text-gray-700"
            >
              {day}
            </div>
          )
        )}

        {/* Calendar Days */}
        {weekDates.map((date, index) => {
          const daySchedules = getSchedulesForDate(date);
          const isWeekend = index === 6;

          return (
            <div
              key={index}
              className={`border border-gray-200 p-2 calendar-day ${
                isWeekend ? "bg-red-50" : ""
              }`}
              onClick={() => {
                if (!isWeekend) {
                  setFormData((prev) => ({ ...prev, date: formatDate(date) }));
                  setShowModal(true);
                }
              }}
            >
              <div
                className={`text-sm font-medium mb-2 ${
                  isWeekend ? "text-red-600" : ""
                }`}
              >
                {date.getDate()}
              </div>

              {isWeekend ? (
                <div className="text-xs text-red-600 text-center mt-4">
                  Nghỉ Chủ nhật
                </div>
              ) : (
                <div className="space-y-1">
                  {daySchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className={`schedule-slot ${getShiftColor(
                        schedule.shiftType
                      )}`}
                    >
                      <div className="font-medium">
                        {schedule.startTime}-{schedule.endTime}
                      </div>
                      <div className="text-xs">
                        {schedule.doctorName.replace("BS. ", "")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        {shiftTypes.map((shift) => (
          <div key={shift.value} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 border rounded shift-${
                shift.color === "green"
                  ? "morning"
                  : shift.color === "blue"
                  ? "afternoon"
                  : "evening"
              }`}
            ></div>
            <span className="text-sm text-gray-600">{shift.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-sm text-gray-600">Nghỉ</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800">
                  Thêm lịch làm việc
                </h4>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bác sĩ *
                  </label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        doctorId: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Chọn bác sĩ</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giờ bắt đầu *
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          startTime: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giờ kết thúc *
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          endTime: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại ca
                  </label>
                  <select
                    value={formData.shiftType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shiftType: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {shiftTypes.map((shift) => (
                      <option key={shift.value} value={shift.value}>
                        {shift.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Thêm lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorScheduleManagement;
