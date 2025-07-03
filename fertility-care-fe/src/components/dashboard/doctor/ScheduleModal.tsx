import React, { useState, useEffect } from "react";
import type { ScheduleItem } from "../../../models/ScheduleItem";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (item: ScheduleItem) => void;
  selectedDate: string | null;
}

const ScheduleModal: React.FC<Props> = ({ open, onClose, onSave, selectedDate }) => {
  const [form, setForm] = useState<Omit<ScheduleItem, "doctorName">>({
    doctorId: "",
    date: "",
    startTime: "",
    endTime: "",
    shiftType: "morning",
    note: "",
  });

  useEffect(() => {
    if (selectedDate) {
      setForm(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  const handleSubmit = () => {
    if (!form.doctorId || !form.date || !form.startTime || !form.endTime) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (form.startTime >= form.endTime) {
      alert("Giờ kết thúc phải sau giờ bắt đầu");
      return;
    }

    const doctorName = {
      "1": "BS. Nguyễn Văn A",
      "2": "BS. Lê Thị B",
      "3": "BS. Hoàng Văn C",
    }[form.doctorId] || "BS. Khác";

    onSave({ ...form, doctorName });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thêm lịch làm việc</h3>
        <div className="mb-3">
          <label className="text-sm font-medium mb-1 block">Bác sĩ</label>
          <select
            value={form.doctorId}
            onChange={e => setForm({ ...form, doctorId: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Chọn bác sĩ</option>
            <option value="1">BS. Nguyễn Văn A</option>
            <option value="2">BS. Lê Thị B</option>
            <option value="3">BS. Hoàng Văn C</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="text-sm font-medium mb-1 block">Ngày</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-sm">Giờ bắt đầu</label>
            <input
              type="time"
              value={form.startTime}
              onChange={e => setForm({ ...form, startTime: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Giờ kết thúc</label>
            <input
              type="time"
              value={form.endTime}
              onChange={e => setForm({ ...form, endTime: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="text-sm font-medium mb-1 block">Ca</label>
          <select
            value={form.shiftType}
            onChange={e => setForm({ ...form, shiftType: e.target.value as "morning" | "afternoon" | "evening" })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="morning">Ca sáng</option>
            <option value="afternoon">Ca chiều</option>
            <option value="evening">Ca tối</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-sm">Ghi chú</label>
          <textarea
            rows={2}
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 border px-4 py-2 rounded" onClick={onClose}>
            Hủy
          </button>
          <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
