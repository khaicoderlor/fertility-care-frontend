import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type { Doctor } from "../../models/Doctor";
import type { PatientDashboard } from "../../models/PatientDashboard";
import { Link } from "react-router-dom";
import "../../assets/css/DotorDashboardStyle.css"
import { convertFullName } from "../../functions/CommonFunction";

export default function DoctorDashboard() {
  // fetch all patient kem theo orderId doctor
  // xu li button click vao chuyen them du lieu patient, orderId

  const [doctorId, setDoctorId] = useState(
    "46BA90E4-C329-43DE-AC0C-F799822A5494"
  );
  const [doctor, setDoctor] = useState<Doctor>();
  const [patients, setPatients] = useState<PatientDashboard[]>();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axiosInstance.get(`doctors/${doctorId}`);
        setDoctor(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctor();
  }, [doctorId, setDoctorId]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get(
          `patients/doctors/${doctorId}`
        );

        setPatients(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
        {/* Header */}
        <div className="gradient-bg p-6">
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

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            <a
              href="#dashboard"
              className="sidebar-active flex items-center w-full px-4 py-3 text-white rounded-lg group"
            >
              <div className="flex items-center">
                <i className="fas fa-chart-line w-4 mr-3"></i>
                Dashboard
              </div>
            </a>

            <a
              href="#patients"
              className="flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
            >
              <div className="flex items-center">
                <i className="fas fa-users w-4 mr-3"></i>
                Bệnh nhân
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {patients?.length || 0}
              </span>
            </a>

            <a
              href="#doctors"
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
            >
              <div className="flex items-center">
                <i className="fas fa-user-md w-4 mr-3"></i>
                Bác sĩ
              </div>
            </a>

            <a
              href="#appointments"
              className="flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
            >
              <div className="flex items-center">
                <i className="fas fa-calendar-alt w-4 mr-3"></i>
                Lịch hẹn
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                24
              </span>
            </a>
          </div>
        </nav>

        {/* Doctor Profile */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40x40/667eea/ffffff?text=BS"
                className="w-10 h-10 rounded-full object-cover"
                alt="Doctor Avatar"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  Bs. {doctor?.profile ? convertFullName(doctor.profile) : "Đang tải..."}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  Chuyên khoa Sản phụ khoa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Chào mừng trở lại, Bác sĩ {doctor?.profile ?  convertFullName(doctor.profile) : ""}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hôm nay</p>
                <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng bệnh nhân</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{patients?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đang điều trị</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{patients?.filter(p => p.treatmentName).length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-heartbeat text-green-600 text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lịch hẹn hôm nay</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-check text-yellow-600 text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Thành công tháng này</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Patients Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Bệnh nhân của tôi
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Danh sách bệnh nhân đang theo dõi
                  </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Xem tất cả
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">
                      Bệnh nhân
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">
                      Phác đồ điều trị
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">
                      Ngày khám
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">
                      Trạng thái
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patients && patients.length > 0 ? (
                    patients.map((patient) => (
                      <tr
                        className="hover:bg-gray-50 transition-colors duration-150"
                        key={patient.patientId}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-700">
                                {patient.patientName?.charAt(0).toUpperCase() || "?"}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {patient.patientName || "Chưa có tên"}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: #{patient.patientId?.substring(0, 8) || "00000000"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            <i className="fas fa-microscope mr-1"></i>
                            {patient.treatmentName || "IVF"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {new Date().toLocaleDateString('vi-VN')}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                            Đang điều trị
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            to={`/follow-up/patient/progress?patientId=${patient.patientId}&orderId=${patient.orderId}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                          >
                            <i className="fas fa-eye mr-2"></i>
                            Xem chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-users text-gray-400 text-2xl"></i>
                          </div>
                          <p className="text-gray-500 text-sm">Chưa có bệnh nhân nào</p>
                          <p className="text-gray-400 text-xs mt-1">Danh sách bệnh nhân sẽ hiển thị ở đây</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}