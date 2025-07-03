import React, { useState } from "react";
import ScheduleHeader from "../../components/dashboard/doctor/ScheduleHeader";
import type { ScheduleItem } from "../../models/ScheduleItem";
import Calendar from "../../components/dashboard/doctor/Calendar";
import ScheduleModal from "../../components/dashboard/doctor/ScheduleModal";

const DoctorSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddSchedule = (item: ScheduleItem) => {
    setSchedules(prev => [...prev, item]);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <ScheduleHeader onOpenModal={() => setShowModal(true)} />
      <Calendar
        schedules={schedules}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setShowModal(true);
        }}
      />
      <ScheduleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddSchedule}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default DoctorSchedule;
