import React from "react";

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
            className="flex items-center w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg group"
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
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group"
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

export default SideBarDoctor;
