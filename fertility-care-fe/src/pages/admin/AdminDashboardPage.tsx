import React, { useState } from "react";
import Sidebar from "./Sidebar";
import StatsCard from "./StatsCard";
import PatientTable from "./PatientTable";
import DoctorTable from "./DoctorTable";
import AppointmentTable from "./AppointmentTable";
import type { StatCard, Patient, Doctor, Appointment } from "./Admin";
import SimpleChart from "./SimpleChart";
import RecentPatients from "./RecentPatients";
import "../../assets/css/StyleAdminDashboard.css";

// Mock data
const mockStats: StatCard[] = [
  {
    title: "Tổng bệnh nhân",
    value: 247,
    change: "+12% tháng này",
    changeType: "increase",
    icon: "fas fa-users",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Tổng dịch vụ",
    value: 89,
    icon: "fas fa-heart",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Thành công",
    value: "67%",
    icon: "fas fa-check-circle",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Doanh thu tháng",
    value: "2.4B VNĐ",
    change: "+8% so với tháng trước",
    changeType: "increase",
    icon: "fas fa-dollar-sign",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Nguyễn Thị A",
    email: "nguyenthia@email.com",
    phone: "0901234567",
    age: 28,
    status: "treatment",
    treatment: "IVF",
    lastVisit: "2025-07-01",
  },
  {
    id: "P002",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0902345678",
    age: 32,
    status: "completed",
    treatment: "IUI",
    lastVisit: "2025-06-28",
  },
];

const mockDoctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Nguyễn Văn X",
    specialty: "Sản phụ khoa",
    email: "drnguyenx@clinic.com",
    phone: "0911234567",
    rating: 4.8,
    patients: 45,
    status: "active",
  },
  {
    id: "D002",
    name: "Dr. Lê Thị Y",
    specialty: "IVF Specialist",
    email: "drlethiy@clinic.com",
    phone: "0912345678",
    rating: 4.9,
    patients: 38,
    status: "active",
  },
];

const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    doctorId: "D001",
    patientName: "Nguyễn Thị A",
    doctorName: "Dr. Nguyễn Văn X",
    date: "2025-07-03",
    time: "09:00",
    type: "IVF",
    status: "scheduled",
  },
  {
    id: "A002",
    patientId: "P002",
    doctorId: "D002",
    patientName: "Trần Thị B",
    doctorName: "Dr. Lê Thị Y",
    date: "2025-07-03",
    time: "10:30",
    type: "consultation",
    status: "scheduled",
  },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleEdit = (item: any) => {
    console.log("Edit:", item);
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-600 mt-1">
                Tổng quan hoạt động phòng khám
              </p>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStats.map((stat, index) => (
                <StatsCard key={index} stat={stat} />
              ))}
            </div>{" "}
            {/* Chart Section */}
            <SimpleChart />
            {/* Recent Patients Section */}
            <RecentPatients />
          </div>
        );

      case "patients":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Bệnh nhân</h2>
              <p className="text-gray-600 mt-1">Quản lý thông tin bệnh nhân</p>
            </div>
            <PatientTable
              patients={mockPatients}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );

      case "doctors":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Bác sĩ</h2>
              <p className="text-gray-600 mt-1">Quản lý thông tin bác sĩ</p>
            </div>
            <DoctorTable
              doctors={mockDoctors}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );

      case "appointments":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Lịch hẹn</h2>
              <p className="text-gray-600 mt-1">Quản lý lịch hẹn bệnh nhân</p>
            </div>
            <AppointmentTable
              appointments={mockAppointments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">
              Tính năng đang được phát triển
            </h3>
            <p className="text-gray-500 mt-2">Vui lòng quay lại sau</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar activeItem={activeTab} onItemClick={setActiveTab} />

      <div className="ml-64 p-8">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
