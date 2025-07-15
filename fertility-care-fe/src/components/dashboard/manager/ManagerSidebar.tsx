import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../../../assets/css/ManagerSideBarStyle.css'
import { MdDateRange } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";

const menuItems = [
  {
    id: "schedules",
    label: "Lịch bác sĩ",
    icon: <MdDateRange className="w-4 h-4 mr-3"/>,
    path: "/manager/schedules",
  },
  {
    id: "patients",
    label: "Tiến trình bệnh nhân",
    icon: <FaUsers className="w-4 h-4 mr-3"/>,
    path: "/manager/patients",
  },
  {
    id: "feedbacks",
    label: "Đánh giá Bác sĩ",
    icon: <RiFeedbackFill className="w-4 h-4 mr-3"/>,
    path: "/manager/feedbacks",
  },
];

const ManagerSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
      {/* Header */}
      <div className="manager-gradient-bg p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <i className="fas fa-heart text-blue-600 text-lg"></i>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Fertility Care</h1>
            <p className="text-blue-100 text-sm">Trang quản lí</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center justify-between w-full px-4 py-3 rounded-lg group transition-all duration-200
                ${
                  isActive(item.path)
                    ? "manager-sidebar-active text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }
              `}
            >
              <div className="flex items-center">
                {item.icon}
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default ManagerSidebar;
