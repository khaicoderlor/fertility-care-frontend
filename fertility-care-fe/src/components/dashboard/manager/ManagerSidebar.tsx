import React from "react";

interface ManagerSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const ManagerSidebar: React.FC<ManagerSidebarProps> = ({
  activeTab = "dashboard",
  onTabChange,
}) => {
  const menuItems = [
    {
      id: "doctor-schedule",
      label: "Lịch bác sĩ",
      icon: "fas fa-calendar-alt",
    },
    {
      id: "progress-patient",
      label: "Tiến trình bệnh nhân",
      icon: "fas fa-tasks",
    },
    { id: "feefbackDoctor", label: "Đánh giá Bác sĩ", icon: "fas fa-user-md" },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
      {/* Header */}
      <div className="manager-gradient-bg p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <i className="fas fa-heart text-blue-600 text-lg"></i>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">FertilityCare</h1>
            <p className="text-blue-100 text-sm">Manager Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`
                flex items-center justify-between w-full px-4 py-3 rounded-lg group transition-all duration-200
                ${
                  activeTab === item.id
                    ? "manager-sidebar-active text-white"
                    : "text-gray-700 hover:bg-gray-300"
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

      {/* User Profile */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 manager-avatar rounded-full">MG</div>
            <div>
              <p className="font-semibold text-gray-800">
                Manager Nguyễn Văn B
              </p>
              <p className="text-sm text-gray-600">Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSidebar;
