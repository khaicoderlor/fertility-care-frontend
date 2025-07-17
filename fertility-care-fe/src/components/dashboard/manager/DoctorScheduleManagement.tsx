/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { shiftTypes } from "../../../data/DataAdminDoctorPage";
import { MdDateRange } from "react-icons/md";
import type { Doctor } from "../../../models/Doctor";
import { convertFullName } from "../../../functions/CommonFunction";
import { FaHeartCircleXmark } from "react-icons/fa6";
import axiosInstance from "../../../apis/AxiosInstance";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { DoctorSchedule } from "../../../models/DoctorSchedule";
import type { Slot } from "../../../models/Slot";

interface ScheduleManagementProps {
  doctors: Doctor[];
  doctorSchedules: DoctorScheduleSideManager[];
  setDoctorSchedules: React.Dispatch<
    React.SetStateAction<DoctorScheduleSideManager[]>
  >;
}

export interface DoctorScheduleSideManager {
  doctor: Doctor;
  schedules: DoctorSchedule[];
}

const DoctorScheduleManagement: React.FC<ScheduleManagementProps> = ({
  doctors,
  doctorSchedules,
  setDoctorSchedules,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    startTime: "",
    endTime: "",
    maxAppointment: 0,
    note: "",
    shiftType: "morning" as "morning" | "afternoon" | "evening",
  });

  const getWeekDates = (date: Date) => {
    const week: Date[] = [];
    const temp = new Date(date);
    const day = temp.getDay();

    const monday = new Date(temp);
    monday.setDate(temp.getDate() - (day === 0 ? 6 : day - 1));

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(new Date(d.getFullYear(), d.getMonth(), d.getDate())); 
    }

    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-CA"); 
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const getShiftTypeFromSlot = (
    slot: Slot
  ): "morning" | "afternoon" | "evening" => {
    const hour = slot.startTime.split(":")[0];
    switch (hour) {
      case "08":
        return "morning";
      case "13":
        return "afternoon";
      case "18":
        return "evening";
      default:
        return "morning";
    }
  };

  const getSchedulesForDate = (date: Date) => {
    const dateString = formatDate(date);

    return doctorSchedules
      .filter(
        (entry) => selectedDoctor === "" || entry.doctor.id === selectedDoctor
      )
      .flatMap((entry) =>
        entry.schedules
          .filter((schedule) => schedule.workDate === dateString)
          .map((schedule) => ({
            ...schedule,
            doctorName: convertFullName(entry.doctor.profile),
            shiftType: getShiftTypeFromSlot(schedule.slot),
          }))
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

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const handleCreateSchedule = async () => {
    try {
      let startTime = "";
      let endTime = "";

      switch (formData.shiftType) {
        case "morning":
          startTime = "08:00:00.0000000";
          endTime = "12:00:00.0000000";
          break;
        case "afternoon":
          startTime = "13:00:00.0000000";
          endTime = "17:00:00.0000000";
          break;
        case "evening":
          startTime = "18:00:00.0000000";
          endTime = "22:00:00.0000000";
          break;
      }

      const payload = {
        doctorId: formData.doctorId,
        date: formData.date,
        startTime,
        endTime,
        maxAppointment: formData.maxAppointment,
        note: formData.note,
      };

      console.log(payload);
      const response = await axiosInstance.post("/doctor-schedules", payload);
      const res: DoctorSchedule = response.data.data;

      const updatedSchedules = doctorSchedules.map((entry) => {
        if (entry.doctor.id === res.doctorId) {
          return {
            ...entry,
            schedules: [...entry.schedules, res],
          };
        }
        return entry;
      });

      console.log(updatedSchedules);

      setDoctorSchedules(updatedSchedules);
      setFormData({
        doctorId: "",
        date: "",
        startTime: "",
        endTime: "",
        maxAppointment: 0,
        note: "",
        shiftType: "morning" as "morning" | "afternoon" | "evening",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create schedule:", error);
    }
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
            className=" border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Tất cả bác sĩ</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Bs.{convertFullName(doctor.profile)}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors items-center flex justify-evenly"
          >
            <MdDateRange className="w-6 h-6" /> Thêm lịch
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-700">
          {formatDisplayDate(weekDates[0])} - {formatDisplayDate(weekDates[6])},{" "}
          {currentWeek.getFullYear()}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => navigateWeek("prev")}
            className="px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateWeek("next")}
            className="px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <FaChevronRight className="w-4 h-4" />
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
                      <div className="font-medium text-sm">
                        {schedule.slot.startTime.slice(0, 5)} -{" "}
                        {schedule.slot.endTime.slice(0, 5)}
                      </div>
                      <div className="text-xs truncate">
                        {schedule.doctorName}
                        <br />
                        {schedule.workDate}
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
                  <FaHeartCircleXmark className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {" "}
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
                        {convertFullName(doctor.profile)}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số bệnh nhân tối đa
                  </label>
                  <input
                    type="number"
                    value={formData.maxAppointment}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxAppointment: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú cho bác sĩ (nếu có)
                  </label>
                  <input
                    type="text"
                    value={formData.note}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        note: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
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
                  type="button"
                  onClick={() => handleCreateSchedule()}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 items-center flex justify-evenly"
                >
                  <MdDateRange className="w-6 h-6" /> Thêm lịch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorScheduleManagement;
