"use client";

import type React from "react";
import {
  UsersIcon,
  CalendarDaysIcon,
  StarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import StatCard from "./StatCard";
import FeedbackChart from "./FeedbackChart";
import PatientAppointmentChart from "./PatientAppointmentChart";
import PatientStatusChart from "./PatientStatusChart";
import RecentPatientsTable from "./RecentPatientsTable";
import QuickActions from "./QuickActions";

// Mock data - replace with actual API calls
const monthlyFeedbackData = [
  { month: "Jan", rating: 4.2, reviews: 15 },
  { month: "Feb", rating: 4.5, reviews: 22 },
  { month: "Mar", rating: 4.3, reviews: 18 },
  { month: "Apr", rating: 4.7, reviews: 25 },
  { month: "May", rating: 4.4, reviews: 20 },
  { month: "Jun", rating: 4.6, reviews: 28 },
  { month: "Jul", rating: 4.8, reviews: 32 },
  { month: "Aug", rating: 4.5, reviews: 24 },
  { month: "Sep", rating: 4.7, reviews: 30 },
  { month: "Oct", rating: 4.6, reviews: 26 },
  { month: "Nov", rating: 4.9, reviews: 35 },
  { month: "Dec", rating: 4.8, reviews: 40 },
];

const monthlyPatientData = [
  { month: "Jan", patients: 45, appointments: 120 },
  { month: "Feb", patients: 52, appointments: 135 },
  { month: "Mar", patients: 48, appointments: 128 },
  { month: "Apr", patients: 65, appointments: 165 },
  { month: "May", patients: 58, appointments: 145 },
  { month: "Jun", patients: 72, appointments: 180 },
  { month: "Jul", patients: 68, appointments: 175 },
  { month: "Aug", patients: 55, appointments: 140 },
  { month: "Sep", patients: 62, appointments: 155 },
  { month: "Oct", patients: 70, appointments: 170 },
  { month: "Nov", patients: 75, appointments: 190 },
  { month: "Dec", patients: 80, appointments: 200 },
];

const patientStatusData = [
  { name: "Đang điều trị", value: 45, color: "#3B82F6" },
  { name: "Đã khỏi", value: 120, color: "#10B981" },
  { name: "Tái khám", value: 35, color: "#F59E0B" },
  { name: "Chờ kết quả", value: 20, color: "#EF4444" },
];

const recentPatients = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 35,
    condition: "Cao huyết áp",
    lastVisit: "2024-01-15",
    status: "Đang điều trị",
  },
  {
    id: 2,
    name: "Trần Thị B",
    age: 42,
    condition: "Tiểu đường",
    lastVisit: "2024-01-14",
    status: "Tái khám",
  },
  {
    id: 3,
    name: "Lê Văn C",
    age: 28,
    condition: "Viêm họng",
    lastVisit: "2024-01-13",
    status: "Đã khỏi",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    age: 55,
    condition: "Đau khớp",
    lastVisit: "2024-01-12",
    status: "Đang điều trị",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    age: 38,
    condition: "Dạ dày",
    lastVisit: "2024-01-11",
    status: "Chờ kết quả",
  },
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng bệnh nhân"
          value="220"
          change="+12%"
          changeType="increase"
          icon={<UsersIcon className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />

        <StatCard
          title="Cuộc hẹn tháng này"
          value="85"
          change="+8%"
          changeType="increase"
          icon={<CalendarDaysIcon className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />

        <StatCard
          title="Đánh giá trung bình"
          value="4.8"
          change="+0.2"
          changeType="increase"
          icon={<StarIcon className="w-6 h-6 text-white" />}
          color="bg-yellow-500"
        />

        <StatCard
          title="Doanh thu tháng"
          value="₫45.2M"
          change="+15%"
          changeType="increase"
          icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackChart data={monthlyFeedbackData} />
        <PatientAppointmentChart data={monthlyPatientData} />
      </div>

      {/* Patient Status and Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PatientStatusChart data={patientStatusData} />
        <RecentPatientsTable patients={recentPatients} />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
