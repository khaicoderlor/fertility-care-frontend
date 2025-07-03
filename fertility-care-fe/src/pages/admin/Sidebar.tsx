import React from "react";
import type { SidebarProps } from "./Admin";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "fas fa-chart-line" },
  { id: "patients", label: "Bệnh nhân", icon: "fas fa-users" },
  { id: "doctors", label: "Bác sĩ", icon: "fas fa-user-md" },
  { id: "appointments", label: "Lịch hẹn", icon: "fas fa-calendar-alt" },
  { id: "treatments", label: "Điều trị", icon: "fas fa-stethoscope" },
  { id: "reports", label: "Báo cáo", icon: "fas fa-chart-bar" },
  { id: "settings", label: "Cài đặt", icon: "fas fa-cog" },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "dashboard",
  onItemClick,
}) => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
      {/* Header */}
      <div className="gradient-bg p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <i className="fas fa-heart text-purple-600 text-lg"></i>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">FertilityCare</h1>
            <p className="text-purple-100 text-sm">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={`
                flex items-center w-full px-4 py-3 rounded-lg group transition-colors
                ${
                  activeItem === item.id
                    ? "sidebar-active text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <div className="flex items-center">
                <i className={`${item.icon} w-4 mr-3`}></i>
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/40x40/667eea/ffffff?text=AD"
              className="w-10 h-10 rounded-full"
              alt="Admin"
            />
            <div>
              <p className="font-semibold text-gray-800">Dr. Nguyễn Văn A</p>
              <p className="text-sm text-gray-600">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
