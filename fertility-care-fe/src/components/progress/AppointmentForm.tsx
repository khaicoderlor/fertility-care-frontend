import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import type { Order } from "../../models/Order";
import type { SlotSchedule } from "../../models/SlotSchedule";
import type OrderStep from "../../models/OrderStep";
import { convertSlotTime } from "../../functions/CommonFunction";
import axiosInstance from "../../apis/AxiosInstance";
import Swal from "sweetalert2";

interface AppointmentFormProps {
  order: Order;
  step: OrderStep;
}

export default function AppointmentForm({ order, step }: AppointmentFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState<SlotSchedule[]>([]);
  const [scheduleId, setScheduleId] = useState<number>();
  const [note, setNote] = useState("");

  useEffect(() => {
    const fetchTimeSlot = async () => {
      if (!selectedDate || !order.doctor?.id) return;         
      try {
        const { data } = await axiosInstance.get(
          `/doctor-schedules/slots/${order.doctor.id}`,
          { params: { date: selectedDate } }
        );
        setTimeSlots(data.data);
      } catch (error) {
        console.error(error);
        Swal.fire("Không lấy được khung giờ", "", "error");
      }
    };
    fetchTimeSlot();
  }, [selectedDate, order.doctor?.id]);

  const placeAppointment = async () => {
    if (!selectedDate || !scheduleId) {
      return Swal.fire("Vui lòng chọn ngày & giờ!", "", "warning");
    }

    try {
      const payload = {
        patientId: order.patient?.id,
        doctorId: order.doctor?.id,
        doctorScheduleId: scheduleId,
        appointmentDate: selectedDate,
        orderStepId: step.id,
        note,
      };

      await axiosInstance.post(`/appointments/${order.id}/embryo-transfers`, payload);
      Swal.fire("Đã thêm lịch hẹn!", "", "success");
      setIsOpen(false);
      resetForm();                                        
    } catch (error) {
      console.error(error);
      Swal.fire("Thêm lịch hẹn thất bại", "", "error");
    }
  };

  const resetForm = () => {
    setSelectedDate("");
    setTimeSlots([]);
    setScheduleId(undefined);
    setNote("");
  };

  return (
    <div className="rounded-lg border bg-indigo-50 p-4 shadow-lg">
      <p className="mb-4 text-sm text-gray-700">
        Đây là bước <span className="font-medium">chuyển phôi</span>, vui lòng đặt lịch hẹn để chúng tôi tiến hành.
      </p>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mb-2 inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
      >
        <MdOutlineDateRange className="mr-1 h-5 w-5" />
        Lên lịch hẹn
      </button>

      <div
        className={`grid overflow-hidden transition-all ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="space-y-4 rounded-md bg-white p-4 shadow-inner">
            <div>
              <label className="mb-1 text-sm font-medium text-gray-700">
                Chọn ngày
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pl-10 text-sm shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 text-sm font-medium text-gray-700">
                Chọn thời gian
              </label>

              {selectedDate ? (
                timeSlots.length ? (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
                    {timeSlots.map((slot) => {
                      const display = convertSlotTime(slot);
                      const active = scheduleId === slot.scheduleId;
                      return (
                        <button
                          key={slot.slotId}
                          onClick={() => setScheduleId(slot.scheduleId)}
                          className={`flex items-center justify-center rounded-md border py-2 text-xs font-medium transition-all 
                            ${active
                              ? "border-purple-600 bg-purple-600 text-white"
                              : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                        >
                          {display}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Không có slot trống.</p>
                )
              ) : (
                <p className="text-sm text-gray-500">Vui lòng chọn ngày trước.</p>
              )}
            </div>
            <div>
              <label className="mb-1 text-sm font-medium text-gray-700">
                Ghi chú cho bác sĩ
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={placeAppointment}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-700"
              >
                Lên lịch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
