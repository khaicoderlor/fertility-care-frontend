import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type { Doctor } from "../../models/Doctor";
import type { PatientDashboard } from "../../models/PatientDashboard";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../../assets/css/DotorDashboardStyle.css";
import { convertFullName } from "../../functions/CommonFunction";
import { useCompetenceAuth } from "../../contexts/CompetenceAuthContext";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdFeedback, MdSpaceDashboard } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { BsCalendarDateFill, BsFillPostcardHeartFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

export default function DoctorDashboard() {
  const { doctorId } = useCompetenceAuth();
  const [doctor, setDoctor] = useState<Doctor>();
  const [patients, setPatients] = useState<PatientDashboard[]>();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const fetchDoctor = async (dId: string) => {
      try {
        const response = await axiosInstance.get(`doctors/${dId}`);
        setDoctor(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctor(doctorId ?? "");
  }, [doctorId]);

  useEffect(() => {
    const fetchPatients = async (dId: string) => {
      try {
        const response = await axiosInstance.get(`/doctors/${dId}/patients`);

        setPatients(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients(doctorId ?? "");
  }, [doctorId]);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl">
        {/* Header */}
        <div className="gradient-bg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <img src={doctor?.profile.avatarUrl} className="rounded-full" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">
                Dr.{doctor?.profile.lastName}
              </h1>
              <p className="text-purple-100 text-sm">Tổng quan của bác sĩ</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            <Link
              to="/doctor"
              className={`flex items-center w-full px-4 py-3 text-white rounded-lg group ${
                isActive("/doctor") ? "sidebar-active" : ""
              }`}
            >
              <div className="flex items-center">
                <MdSpaceDashboard className="w-6 mr-3 font-bold" />
                Tổng quan
              </div>
            </Link>

            <Link
              to="/doctor/my-patients"
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200 ${
                isActive("/doctor/my-patients") ? "sidebar-active" : ""
              }`}
            >
              <div className="flex items-center">
                <PiUsersThreeFill className="w-6 mr-3 font-bold" />
                Bệnh nhân
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {patients?.length || 0}
              </span>
            </Link>

            <Link
              to="/doctor/my-profile"
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200 ${
                isActive("/doctor/my-profile") ? "sidebar-active" : ""
              }`}
            >
              <div className="flex items-center">
                <RiProfileFill className="w-6 mr-3 font-bold" />
                Hồ sơ
              </div>
            </Link>

            <Link
              to="/doctor/work-schedules"
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200 ${
                isActive("/doctor/work-schedules") ? "sidebar-active" : ""
              }`}
            >
              <div className="flex items-center">
                <BsCalendarDateFill className="w-6 mr-3 font-bold" />
                Lịch làm việc
              </div>
            </Link>

            <Link
              to="/doctor/my-feedback"
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200 ${
                isActive("/doctor/my-feedback") ? "sidebar-active" : ""
              }`}
            >
              <div className="flex items-center">
                <MdFeedback className="w-6 mr-3 font-bold" />
                Đánh giá
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                24
              </span>
            </Link>

            <Link
              to="/doctor/my-posts"
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200 ${
                isActive("/doctor/my-posts") ? "sidebar-active" : ""
              }`}
            >
              <div className="flex items-center">
                <BsFillPostcardHeartFill className="w-6 mr-3 font-bold" />
                Blogs của tôi
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                24
              </span>
            </Link>
          </div>
        </nav>
        {/* Doctor Profile */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 group transition-colors duration-200"
          >
            <div className="flex items-center">
              <BiLogOut className="w-6 mr-3 font-bold" />
              Đăng xuất
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bảng theo dõi
                </h1>
                <p className="text-gray-600 mt-1">
                  Chào mừng trở lại, Dr.{" "}
                  {doctor?.profile ? convertFullName(doctor.profile) : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hôm nay</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
