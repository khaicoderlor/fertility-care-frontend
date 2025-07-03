import React, { useState } from "react";
import AppointmentHeader from "./AppointmentHeader";
import StatisticsCards from "./StatisticsCards";
import DateNavigation from "./DateNavigation";
import ScheduleList from "./ScheduleList";
import UpcomingAppointments from "./UpcomingAppointments";
import type { Appointment } from "./TimeSlot";

const AppointmentSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFilter, setShowFilter] = useState(false);

  // Mock data - replace with real data from your API
  const appointments: Appointment[] = [
    {
      id: "1",
      time: "08:00",
      patientName: "Nguyễn Thị A",
      treatmentType: "IUI",
      description: "IUI - Chu kỳ 1",
      status: "completed",
    },
    {
      id: "2",
      time: "08:30",
      patientName: "Trần Văn B",
      treatmentType: "IVF",
      description: "IVF - Theo dõi phôi",
      status: "completed",
    },
    {
      id: "3",
      time: "09:00",
      patientName: "Lê Thị C",
      treatmentType: "IVF",
      description: "IVF - Siêu âm theo dõi",
      status: "in-progress",
    },
    {
      id: "4",
      time: "09:30",
      patientName: "Phạm Thị D",
      treatmentType: "IUI",
      description: "IUI - Thụ tinh nhân tạo",
      status: "upcoming",
    },
    {
      id: "5",
      time: "10:30",
      patientName: "Vũ Văn E",
      treatmentType: "IVF",
      description: "IVF - Chuyển phôi",
      status: "upcoming",
    },
    {
      id: "6",
      time: "11:00",
      patientName: "Hoàng Thị F",
      treatmentType: "IUI",
      description: "IUI - Chu kỳ 2",
      status: "upcoming",
    },
  ];

  const stats = {
    totalToday: 20,
    iuiToday: 8,
    ivfToday: 12,
    completed: 15,
  };

  const handleAddAppointment = () => {
    console.log("Add new appointment");
    // Open appointment form modal
  };

  const handleViewAppointment = (appointment: Appointment) => {
    console.log("View appointment:", appointment);
    // Open appointment details modal
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="p-8">
      <AppointmentHeader onFilterClick={handleFilterClick} />

      <StatisticsCards stats={stats} />

      <DateNavigation
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ScheduleList
            appointments={appointments}
            onAddAppointment={handleAddAppointment}
            onViewAppointment={handleViewAppointment}
          />
        </div>

        <div className="space-y-6">
          <UpcomingAppointments
            appointments={appointments}
            onViewAppointment={handleViewAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedule;
