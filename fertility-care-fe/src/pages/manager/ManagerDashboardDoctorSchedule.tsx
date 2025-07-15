import React, { useEffect, useState } from "react";
import ManagerSidebar from "../../components/dashboard/manager/ManagerSidebar";
import DoctorScheduleManagement, {
  type DoctorScheduleSideManager,
} from "../../components/dashboard/manager/DoctorScheduleManagement";
import "../../assets/css/StyleManagerDashboardDoctorSchedule.css";
import { MdDateRange } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import type { Doctor } from "../../models/Doctor";
import axiosInstance from "../../apis/AxiosInstance";

const ManagerDashboardDoctorSchedule: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorsSchedules, setDoctorsSchedules] = useState<
    DoctorScheduleSideManager[]
  >([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("/doctors");

        setDoctors(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchDoctorSchedules = async () => {
      try {
        const response = await axiosInstance.get(
          "/doctor-schedules/manager-sides"
        );

        setDoctorsSchedules(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctorSchedules();
  }, []);

  return (
    <div className="manager-dashboard">
      <ManagerSidebar />

      <div className="manager-main-content">
        <div className="manager-dashboard-header">
          <div className="manager-header-info">
            <h1 className="page-title">Quản lý lịch làm việc bác sĩ</h1>
            <p className="page-subtitle">
              Theo dõi và sắp xếp lịch làm việc của các bác sĩ trong hệ thống
            </p>
          </div>
        </div>

        <div className="manager-dashboard-content">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng bác sĩ
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {doctors.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaUserDoctor className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Lịch hôm nay
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {
                      doctorsSchedules
                        .flatMap((entry) => entry.schedules)
                        .filter((s) => {
                          const today = new Date().toISOString().split("T")[0];
                          return s.workDate === today;
                        }).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <MdDateRange className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Schedule Management */}
          <DoctorScheduleManagement
            doctors={doctors}
            doctorSchedules={doctorsSchedules}
            setDoctorSchedules={setDoctorsSchedules}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardDoctorSchedule;
