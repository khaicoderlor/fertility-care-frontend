import type { FormEvent } from "react";
import type { SlotSchedule } from "../../../models/SlotSchedule";
import type { CreateAppointmentDailyRequest } from "../../../pages/doctor/FollowUpPatientProgressPage";
import { convertSlotTime } from "../../../functions/CommonFunction";
import { FaClock } from "react-icons/fa";

interface AppointmentFormProps {
  newAppointment: CreateAppointmentDailyRequest;
  setNewAppointment: (data: CreateAppointmentDailyRequest) => void;
  timeSlots: SlotSchedule[];
  selectedTime: string;
  setSelectedTime: (value: string) => void;
  onCancel: () => void;
  handleSubmitNewAppointment: (
    e: FormEvent<HTMLFormElement>,
    data: CreateAppointmentDailyRequest
  ) => void;
}

export default function AppointmentForm({
  newAppointment,
  setNewAppointment,
  timeSlots,
  selectedTime,
  setSelectedTime,
  onCancel,
  handleSubmitNewAppointment,
}: AppointmentFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-50 bg-opacity-10 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b p-4">
          <h4 className="font-medium">Thêm lịch hẹn mới</h4>
        </div>
        <div className="p-4">
          <form
            className="space-y-3"
            onSubmit={(e) => handleSubmitNewAppointment(e, newAppointment)}
          >
            <div>
              <label className="mb-1 block text-sm font-medium">Ngày</label>
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    date: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>
            {newAppointment.date ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.slotId}
                    onClick={() => {
                      setSelectedTime(convertSlotTime(slot));
                      setNewAppointment({
                        ...newAppointment,
                        doctorScheduleId: slot.scheduleId,
                      });
                    }}
                    className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md border transition-colors duration-200 ${
                      selectedTime === convertSlotTime(slot)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <FaClock className="w-3 h-3 mr-1" />
                    {convertSlotTime(slot)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Select a date first</p>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Loại cuộc hẹn
              </label>
              <select
                value={newAppointment.type}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    type: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
              >
                <option value="None">-- Chọn loại cuộc hẹn --</option>
                <option value="InitialConsultation">Tư vấn</option>
                <option value="Check">Kiểm tra</option>
                <option value="Treatment">Điều trị</option>
                <option value="FollowUp">Theo dõi</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Chi phí thêm (nếu có)
              </label>
              <input
                type="number"
                value={newAppointment.extraFee}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    extraFee: Number(e.target.value),
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Ghi chú</label>
              <textarea
                value={newAppointment.note}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    note: e.target.value,
                  })
                }
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                placeholder="Ghi chú thêm"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={onCancel}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-md bg-purple-600 px-3 py-1.5 text-sm text-white"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
