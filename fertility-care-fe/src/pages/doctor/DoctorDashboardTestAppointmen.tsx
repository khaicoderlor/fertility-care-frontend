import React, { useState } from "react";

// Types
export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  treatmentType: "IUI" | "IVF";
  description: string;
  status: "completed" | "in-progress" | "upcoming";
}

// SideBarDoctor Component
const SideBarDoctor: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <i className="fas fa-heart text-purple-600 text-lg"></i>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">FertilityCare</h1>
            <p className="text-purple-100 text-sm">Doctor Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-4">
        <div className="space-y-2">
          <a
            href="#dashboard"
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group"
          >
            <div className="flex items-center">
              <i className="fas fa-chart-line w-4 mr-3"></i>
              Dashboard
            </div>
          </a>

          <a
            href="#patients"
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group"
          >
            <div className="flex items-center">
              <i className="fas fa-users w-4 mr-3"></i>
              Bệnh nhân
            </div>
          </a>

          <a
            href="#doctors"
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group"
          >
            <div className="flex items-center">
              <i className="fas fa-user-md w-4 mr-3"></i>
              Bác sĩ
            </div>
          </a>

          <a
            href="#appointments"
            className="flex items-center w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg group"
          >
            <div className="flex items-center">
              <i className="fas fa-calendar-alt w-4 mr-3"></i>
              Lịch hẹn
            </div>
          </a>
        </div>
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/40x40/667eea/ffffff?text=AD"
              className="w-10 h-10 rounded-full"
              alt="Admin Avatar"
            />
            <div>
              <p className="font-semibold text-gray-800">Dr. Nguyễn Văn A</p>
              <p className="text-sm text-gray-600">Doctor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AppointmentHeader Component
interface AppointmentHeaderProps {
  onFilterClick: () => void;
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  onFilterClick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Lịch hẹn IUI/IVF</h2>
          <p className="text-gray-600 mt-1">
            Lịch hẹn điều trị IUI và IVF hàng ngày
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onFilterClick}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className="fas fa-filter mr-2"></i>
            Lọc
          </button>
        </div>
      </div>
    </div>
  );
};

// StatisticsCards Component
interface StatisticsCardsProps {
  stats: {
    totalToday: number;
    iuiToday: number;
    ivfToday: number;
    completed: number;
  };
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Tổng ca hôm nay",
      value: stats.totalToday,
      subtitle: "IUI + IVF",
      color: "blue",
      icon: "fas fa-calendar-check",
    },
    {
      title: "IUI hôm nay",
      value: stats.iuiToday,
      subtitle: `${Math.round(
        (stats.iuiToday / stats.totalToday) * 100
      )}% tổng ca`,
      color: "purple",
      icon: "fas fa-syringe",
    },
    {
      title: "IVF hôm nay",
      value: stats.ivfToday,
      subtitle: `${Math.round(
        (stats.ivfToday / stats.totalToday) * 100
      )}% tổng ca`,
      color: "blue",
      icon: "fas fa-microscope",
    },
    {
      title: "Hoàn thành",
      value: stats.completed,
      subtitle: `${Math.round(
        (stats.completed / stats.totalToday) * 100
      )}% tiến độ`,
      color: "green",
      icon: "fas fa-check-circle",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-${card.color}-500`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className={`text-2xl font-bold text-${card.color}-600`}>
                {card.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </div>
            <div
              className={`w-12 h-12 bg-${card.color}-100 rounded-full flex items-center justify-center`}
            >
              <i className={`${card.icon} text-${card.color}-600 text-lg`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// DateNavigation Component
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

// TimeSlot Component
interface TimeSlotProps {
  appointment?: Appointment;
  onAddAppointment?: () => void;
  onViewDetails?: (appointment: Appointment) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  appointment,
  onAddAppointment,
  onViewDetails,
}) => {
  if (!appointment) {
    return (
      <div className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-500 w-16">--:--</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-plus text-gray-400 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Thời gian trống</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onAddAppointment}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            + Thêm lịch hẹn
          </button>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bgClass: "bg-green-50 border-green-200",
          statusBadge: "bg-green-100 text-green-700",
          statusText: "Hoàn thành",
        };
      case "in-progress":
        return {
          bgClass: "bg-yellow-50 border-yellow-200",
          statusBadge: "bg-yellow-100 text-yellow-700",
          statusText: "Đang diễn ra",
        };
      case "upcoming":
        return {
          bgClass: "bg-blue-50 border-blue-200",
          statusBadge: "bg-blue-100 text-blue-700",
          statusText: "Sắp tới",
        };
      default:
        return {
          bgClass: "bg-gray-50 border-gray-200",
          statusBadge: "bg-gray-100 text-gray-700",
          statusText: "Không xác định",
        };
    }
  };

  const getTreatmentConfig = (type: string) => {
    return type === "IUI"
      ? {
          icon: "fas fa-syringe",
          bgClass: "bg-purple-100",
          iconClass: "text-purple-600",
          badgeClass: "bg-purple-100 text-purple-700",
        }
      : {
          icon: "fas fa-microscope",
          bgClass: "bg-blue-100",
          iconClass: "text-blue-600",
          badgeClass: "bg-blue-100 text-blue-700",
        };
  };

  const statusConfig = getStatusConfig(appointment.status);
  const treatmentConfig = getTreatmentConfig(appointment.treatmentType);

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${statusConfig.bgClass}`}
      onClick={() => onViewDetails?.(appointment)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-gray-500 w-16">
            {appointment.time}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${treatmentConfig.bgClass}`}
              >
                <i
                  className={`${treatmentConfig.icon} ${treatmentConfig.iconClass} text-sm`}
                ></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {appointment.patientName}
                </h4>
                <p className="text-sm text-gray-600">
                  {appointment.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.statusBadge}`}
          >
            {statusConfig.statusText}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${treatmentConfig.badgeClass}`}
          >
            {appointment.treatmentType}
          </span>
        </div>
      </div>
    </div>
  );
};

// ScheduleList Component
interface ScheduleListProps {
  appointments: Appointment[];
  onAddAppointment: () => void;
  onViewAppointment: (appointment: Appointment) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  appointments,
  onAddAppointment,
  onViewAppointment,
}) => {
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
  ];

  const getAppointmentForTime = (time: string) => {
    return appointments.find((apt) => apt.time === time);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Lịch trình IUI/IVF hôm nay
        </h3>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
            IUI
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
            IVF
          </span>
          <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Hoàn thành
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {timeSlots.map((time) => {
          const appointment = getAppointmentForTime(time);
          return (
            <TimeSlot
              key={time}
              appointment={appointment}
              onAddAppointment={onAddAppointment}
              onViewDetails={onViewAppointment}
            />
          );
        })}
      </div>
    </div>
  );
};

// UpcomingAppointments Component
interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onViewAppointment: (appointment: Appointment) => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
  onViewAppointment,
}) => {
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Lịch hẹn sắp tới
      </h3>
      <div className="space-y-3">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => onViewAppointment(appointment)}
            className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-8 rounded-full ${
                  appointment.treatmentType === "IUI"
                    ? "bg-purple-400"
                    : "bg-blue-400"
                }`}
              ></div>
              <div className="flex-1">
                <p className="font-medium text-sm">
                  {appointment.time} - {appointment.patientName}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.description}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  appointment.treatmentType === "IUI"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {appointment.treatmentType}
              </span>
            </div>
          </div>
        ))}

        {upcomingAppointments.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-calendar-plus text-gray-400 text-2xl"></i>
            </div>
            <p className="text-gray-500 text-sm">Không có lịch hẹn sắp tới</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const DoctorDashboardTestAppointmen: React.FC = () => {
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideBarDoctor />

      {/* Main Content */}
      <div className="flex-1 ml-64">
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
      </div>
    </div>
  );
};

export default DoctorDashboardTestAppointmen;
