import React, { useState } from "react";
import Sidebar from "../../components/dashboard/admin/Sidebar";
import StatsCard from "../../components/dashboard/admin/StatsCard";
import SimpleChart from "../../components/dashboard/admin/SimpleChart";
import "../../assets/css/StyleAdminDashboard.css";
import { PatientTable } from "../../components/dashboard/admin/PatientTable";
import { DoctorTable } from "../../components/dashboard/admin/DoctorTable";
import AppointmentTable from "../../components/progress/AppointmentTable";

interface StatCard {
  title: string;
  value: number;
  change: string;
  changeType: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [statCards, setStatCards] = useState<StatCard[]>([]) 

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
              {statCards.map((stat, index) => (
                <StatsCard key={index} stat={stat} />
              ))}
            </div>{" "}
            {/* Chart Section */}
            <SimpleChart />
          </div>
        );

      case "patients":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Bệnh nhân</h2>
              <p className="text-gray-600 mt-1">Quản lý thông tin bệnh nhân</p>
            </div>
            <PatientTable />
          </div>
        );

      case "doctors":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Bác sĩ</h2>
              <p className="text-gray-600 mt-1">Quản lý thông tin bác sĩ</p>
            </div>
            <DoctorTable />
          </div>
        );

      case "reports-statistic":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Lịch hẹn</h2>
              <p className="text-gray-600 mt-1">Quản lý lịch hẹn bệnh nhân</p>
            </div>
            <AppointmentTable />
          </div>
        );

      case "payments":
         return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Thanh toán</h2>
              <p className="text-gray-600 mt-1">Quản lý lịch hẹn bệnh nhân</p>
            </div>
            <AppointmentTable />
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
