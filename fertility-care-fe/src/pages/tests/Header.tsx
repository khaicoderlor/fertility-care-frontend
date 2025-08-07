import { Link, useNavigate } from "react-router-dom";
import FCLogo from "../../assets/image/Logo_Daxoaphongnen.png";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/AxiosInstance";
import type { Patient } from "../../models/Patient";
import { convertFullName } from "../../functions/CommonFunction";

export default function Header() {
  const navigate = useNavigate();
  const { patientId, isAuthenticated } = useAuth();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axiosInstance.get(`/patients/${patientId}`);
        setPatient(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatient();
  }, [patientId]);

  return (
    <>
      <header className="flex justify-between items-center bg-gray-50 shadow-sm rounded-b-sm">
        <div>
          <img src={FCLogo} alt="" className="max-w-24 max-h-20" />
        </div>
        <div className="max-w-full">
          <div className="flex gap-x-4 items-center justify-around">
            <Link
              to="/"
              className="hover:border-b-4 hover:border-orange-500 transition-all"
            >
              Trang chủ
            </Link>
            <Link
              to="/services"
              className="hover:border-b-4 hover:border-orange-500 transition-all"
            >
              Dịch vụ
            </Link>
            <Link
              to="/journey"
              className="hover:border-b-4 hover:border-orange-500 transition-all"
            >
              Lộ trình điều trị
            </Link>
            <Link
              to="/blogs"
              className="hover:border-b-4 hover:border-orange-500 transition-all"
            >
              Cộng đồng
            </Link>
            
          </div>
        </div>
        <div className="max-w-full">
          {isAuthenticated ? (
            <div className="flex items-center mr-4 gap-x-3">
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
            </div>
          ) : (
            <div className="flex items-center mr-4 gap-x-3">
              <button onClick={() => navigate("/login")} className="border-orange-400 border-2 p-3 flex items-center hover:bg-orange-600 hover:text-white transition-all">
                Đăng nhập
              </button>
              <button className="bg-orange-500 border-2 border-orange-500 hover:bg-orange-600 transition-all text-white p-3 items-center">
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
