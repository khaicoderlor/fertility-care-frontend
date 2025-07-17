import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../apis/AxiosInstance";
import type { Patient } from "../models/Patient";
import { convertFullName } from "../functions/CommonFunction";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, patientId } = useAuth();
  const [patient, setPatient] = useState<Patient>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async (pId: string) => {
      try {
        const response = await axiosInstance.get(`/patients/${pId}`);
        setPatient(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatient(patientId ?? "");
  }, [patientId]);

  return (
    <div className="relative px-4 md:px-12 h-20 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          className="flex items-center cursor-pointer select-none hover:scale-105 transition-transform"
        >
          <h1 className="text-xl md:text-2xl font-bold font-serif">
            <span className="bg-gradient-to-r from-[#a06ad9] to-[#6a4fcf] text-transparent bg-clip-text">
              Fertility
            </span>
            <span className="bg-gradient-to-r from-[#5cc6f5] to-[#3b82f6] text-transparent bg-clip-text">
              Care
            </span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block flex-1">
          <ul className="flex justify-center space-x-6 text-sm font-medium text-gray-800">
            <li>
              <a href="/home" className="hover:text-purple-600">
                Trang chủ
              </a>
            </li>
            <li>
              <Link to="/services" className="hover:text-purple-600">
                Dịch vụ
              </Link>
            </li>
            <li>
              <a href="/profile" className="hover:text-purple-600">
                Lộ trình điều trị
              </a>
            </li>
            {/* <li>
              <a href="/blog" className="hover:text-purple-600">
                Tìm bác sĩ
              </a>
            </li> */}
            {/* <li>
              <a href="/blog" className="hover:text-purple-600">
                Kết nối yêu thương
              </a>
            </li> */}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/messenger" className="hover:text-purple-600">
                    Tin nhắn
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Avatar và hành động */}
        <div className="flex items-center gap-3 md:gap-6">
          {isAuthenticated && (
            <div
              onClick={() => navigate("/patient")}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 hover:shadow-md transition cursor-pointer group max-w-[180px]"
            >
              <div className="relative">
                <img
                  src={patient?.profile?.avatarUrl}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover shadow ring-2 ring-white group-hover:ring-purple-200 transition"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[11px] text-gray-500 font-medium leading-none">
                  Xin chào
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 truncate">
                  {convertFullName(patient?.profile ?? {})}
                </span>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <a
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              Đăng nhập
            </a>
          )}

          <div className="hidden sm:block w-px h-6 bg-gray-200" />

          <a
            href="/order"
            className="px-4 py-2 text-sm font-semibold border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-md transition"
          >
            Đặt lịch ngay
          </a>
        </div>
      </div>
    </div>
  );
}
