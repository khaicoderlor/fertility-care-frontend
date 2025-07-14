import React, { useState } from "react";
import ManagerSidebar from "../../components/dashboard/manager/ManagerSidebar";
import PatientProgressManagement from "../../components/dashboard/manager/PatientProgressManagement";
import { patientProgressData } from "../../data/DataManagerProgressPatient";
import type { PatientProgress } from "../../data/DataManagerProgressPatient";
import {
  STEP_COMPLETED,
  STEP_PROGRESS,
  STEP_PLANNED,
  STEP_FAILED,
} from "../../constants/StepStatus";
import "../../assets/css/StyleManagerProgressPatient.css";

const ManagerDashboardProgressPatient: React.FC = () => {
  const [activeTab, setActiveTab] = useState("patient-progress");

  const handleViewDetails = (progress: PatientProgress) => {
    console.log("Viewing details for:", progress);
    // TODO: Implement view details functionality
  };

  // Calculate stats
  const totalPatients = patientProgressData.length;
  const inProgressCount = patientProgressData.filter(
    (p) => p.status === STEP_PROGRESS
  ).length;
  const completedCount = patientProgressData.filter(
    (p) => p.status === STEP_COMPLETED
  ).length;
  const plannedCount = patientProgressData.filter(
    (p) => p.status === STEP_PLANNED
  ).length;
  const failedCount = patientProgressData.filter(
    (p) => p.status === STEP_FAILED
  ).length;

  return (
    <div className="manager-dashboard">
      <ManagerSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="manager-main-content">
        <div className="manager-dashboard-header">
          <div className="manager-header-info">
            <h1 className="page-title">Tiến trình điều trị bệnh nhân</h1>
            <p className="page-subtitle">
              Theo dõi và quản lý tiến trình điều trị của các bệnh nhân trong hệ
              thống
            </p>
          </div>
        </div>

        <div className="manager-dashboard-content">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng bệnh nhân
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalPatients}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Đang điều trị
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {inProgressCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-spinner text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Hoàn thành
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {completedCount}
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
                    Đã lên kế hoạch
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {plannedCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-alt text-yellow-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tạm dừng</p>
                  <p className="text-2xl font-bold text-red-600">
                    {failedCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-pause-circle text-red-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Progress Management */}
          <div className="progress-management-container">
            <PatientProgressManagement
              progressData={patientProgressData}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
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
                  <i className="fas fa-user-plus text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>Nguyễn Thị Mai</strong> đã bắt đầu quá trình IVF
                  </p>
                  <p className="text-sm text-gray-600">
                    Bác sĩ phụ trách: BS. Nguyễn Văn A - 2 giờ trước
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-check text-green-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>Lê Thị Hoa</strong> đã hoàn thành quá trình IUI
                  </p>
                  <p className="text-sm text-gray-600">
                    Bác sĩ phụ trách: BS. Lê Thị B - 4 giờ trước
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-calendar-check text-yellow-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>Trần Thị Lan</strong> đã lên lịch tái khám
                  </p>
                  <p className="text-sm text-gray-600">
                    Bác sĩ phụ trách: BS. Hoàng Văn C - 6 giờ trước
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-exclamation-triangle text-red-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    <strong>Phạm Thị Thu</strong> cần đánh giá lại quá trình
                    điều trị
                  </p>
                  <p className="text-sm text-gray-600">
                    Bác sĩ phụ trách: BS. Đặng Thị D - 8 giờ trước
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

export default ManagerDashboardProgressPatient;
