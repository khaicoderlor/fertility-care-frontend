"use client";

import type { Doctor } from "../../models/Doctor";
import type { SlotSchedule } from "../../models/SlotSchedule";

import { IUI_ID } from "../../constants/ApplicationConstant";
import {
  convertFullName,
  convertSlotTime,
} from "../../functions/CommonFunction";
import { FaClock } from "react-icons/fa";

interface PartProps {
  selectedDoctor: Doctor | null;
  selectedTreatment: string;
  selectedDate: string;
  selectedTime: string;
  timeSlots: SlotSchedule[];
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onScheduleIdChange: (scheduleId: number) => void;
}

export default function PartFourBooking({
  selectedDoctor,
  selectedTreatment,
  selectedDate,
  selectedTime,
  timeSlots,
  onDateChange,
  onTimeChange,
  onScheduleIdChange,
}: PartProps) {
  return (
    <section id="schedule" className="scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Chọn thông tin cho lịch hẹn đầu tiên
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Chọn bác sĩ
            </h3>
            {selectedDoctor ? (
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      selectedDoctor.profile.avatarUrl ||
                      "/placeholder.svg?height=48&width=48"
                    }
                    alt={convertFullName(selectedDoctor.profile)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">
                    {convertFullName(selectedDoctor.profile)}
                  </p>
                  <p className="text-blue-600 text-sm">
                    {selectedTreatment === IUI_ID ? "IUI" : "IVF"} Dịch vụ
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Vui lòng chọn bác sĩ trước</p>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="appointmentDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Chọn ngày
              </label>
              <div className="relative">
                <input
                  id="appointmentDate"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => onDateChange(e.target.value)}
                  min={(() => {
                    const now = new Date();
                    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                    return now.toISOString().split("T")[0];
                  })()}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Các slot có sẵn
              </label>
              {selectedDate ? (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.slotId}
                      onClick={() => {
                        onTimeChange(convertSlotTime(slot));
                        onScheduleIdChange(slot.scheduleId);
                      }}
                      className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md border transition-colors duration-200 ${
                        selectedTime === convertSlotTime(slot)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <FaClock className="w-3 h-3 mr-1" />
                      {convertSlotTime(slot)}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  Chọn ngày trước khi làm các hành động khác
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
