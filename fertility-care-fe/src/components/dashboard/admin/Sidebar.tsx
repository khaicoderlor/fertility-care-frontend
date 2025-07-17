import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineDashboard, MdPayment } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

const menuItems = [
  { id: "dashboard", label: "Tổng quan", icon: <MdOutlineDashboard className="w-5 h-5" /> },
  { id: "users", label: "Người dùng", icon: <FaUsers className="w-5 h-5" /> },
  { id: "patients", label: "Bệnh nhân", icon: <RiMentalHealthFill className="w-5 h-5" /> },
  { id: "doctors", label: "Bác sĩ", icon: <FaUserDoctor className="w-5 h-5" /> },
  { id: "reports-statistic", label: "Đơn điều trị", icon: <TbReportAnalytics className="w-5 h-5" /> },
  { id: "payments", label: "Thanh toán", icon: <MdPayment className="w-5 h-5" /> },
];

interface SideBarProps {
  activeItem: string;
  onItemClick: (id: string) => void;
}

const Sidebar = ({ activeItem = "dashboard", onItemClick }: SideBarProps) => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <i className="fas fa-heart text-purple-600 text-lg"></i>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Fertility Care</h1>
            <p className="text-purple-100 text-sm">Bảng điều khiển Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`
              flex items-center gap-3 w-full px-4 py-3 rounded-lg mb-2 transition-colors
              ${
                activeItem === item.id
                  ? "bg-indigo-600 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t">
        <div className="bg-purple-50 p-3 rounded-lg flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40x40/667eea/ffffff?text=AD"
            className="w-10 h-10 rounded-full"
            alt="Admin"
          />
          <div>
            <p className="text-xs text-gray-600">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
