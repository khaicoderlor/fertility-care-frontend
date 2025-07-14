import React, { useState } from "react";
import ManagerSidebar from "../../components/dashboard/manager/ManagerSidebar";
import DoctorScheduleManagement from "../../components/dashboard/admin/DoctorScheduleManagement";
import { allDoctors, scheduleData } from "../../data/DataAdminDoctorPage";
import type { ScheduleSlot } from "../../data/DataAdminDoctorPage";
import "../../assets/css/StyleManagerDashboardDoctorSchedule.css";

const ManagerDashboardDoctorSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("doctor-schedule");
  const [schedules, setSchedules] = useState<ScheduleSlot[]>(scheduleData);

  const handleAddSchedule = (newSchedule: Omit<ScheduleSlot, "id">) => {
    const scheduleWithId: ScheduleSlot = {
      ...newSchedule,
      id: `schedule_${Date.now()}`,
    };
    setSchedules((prev) => [...prev, scheduleWithId]);
    console.log("Added new schedule:", scheduleWithId);
  };

  return (
    <div className="manager-dashboard">
      <ManagerSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="manager-main-content">
        <div className="manager-dashboard-header">
          <div className="manager-header-info">
            <h1 className="page-title">Quản lý lịch làm việc bác sĩ</h1>
            <p className="page-subtitle">
              Theo dõi và sắp xếp lịch làm việc của các bác sĩ trong hệ thống
            </p>
          </div>
        </div>

        <div className="manager-dashboard-content">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng bác sĩ
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {allDoctors.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user-md text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Đang hoạt động
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {allDoctors.filter((d) => d.status === "active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-green-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Lịch hôm nay
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {
                      schedules.filter((s) => {
                        const today = new Date().toISOString().split("T")[0];
                        return s.date === today;
                      }).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-day text-yellow-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tuần này</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {
                      schedules.filter((s) => {
                        const scheduleDate = new Date(s.date);
                        const today = new Date();
                        const startOfWeek = new Date(today);
                        const day = today.getDay();
                        const diff =
                          today.getDate() - day + (day === 0 ? -6 : 1);
                        startOfWeek.setDate(diff);
                        startOfWeek.setHours(0, 0, 0, 0);

                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 6);
                        endOfWeek.setHours(23, 59, 59, 999);

                        return (
                          scheduleDate >= startOfWeek &&
                          scheduleDate <= endOfWeek
                        );
                      }).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-week text-purple-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Schedule Management */}
          <div className="schedule-management-container">
            <DoctorScheduleManagement
              doctors={allDoctors}
              schedules={schedules}
              onAddSchedule={handleAddSchedule}
            />
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Hoạt động gần đây
              </h3>
              <button className="btn btn-outline">
                <i className="fas fa-external-link-alt"></i>
                Xem tất cả
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-calendar-plus text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>BS. Nguyễn A</strong> đã thêm lịch làm việc
                  </p>
                  <p className="text-sm text-gray-600">
                    Ca sáng 15/01/2024 - 2 giờ trước
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user-check text-green-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>BS. Lê B</strong> đã hoàn thành ca làm việc
                  </p>
                  <p className="text-sm text-gray-600">
                    Ca chiều 14/01/2024 - 4 giờ trước
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-calendar-edit text-yellow-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>BS. Hoàng C</strong> đã thay đổi lịch làm việc
                  </p>
                  <p className="text-sm text-gray-600">
                    Ca tối 16/01/2024 - 6 giờ trước
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-calendar-times text-red-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>BS. Đặng D</strong> đã hủy lịch làm việc
                  </p>
                  <p className="text-sm text-gray-600">
                    Ca sáng 17/01/2024 - 8 giờ trước
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardDoctorSchedule;
