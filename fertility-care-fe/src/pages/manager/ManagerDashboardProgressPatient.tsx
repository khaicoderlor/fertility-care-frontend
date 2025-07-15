import React, { useEffect, useState } from "react";
import ManagerSidebar from "../../components/dashboard/manager/ManagerSidebar";
import PatientProgressManagement from "../../components/dashboard/manager/PatientProgressManagement";
import type { PatientProgress } from "../../data/DataManagerProgressPatient";
import "../../assets/css/StyleManagerProgressPatient.css";
import axiosInstance from "../../apis/AxiosInstance";
import { FaUsers } from "react-icons/fa";
import { GrInProgress, GrPlan } from "react-icons/gr";
import { MdDone } from "react-icons/md";

interface ManagerStatOverall {
  totalPatients: number
  totalInProgressOrder: number
  totalCompleteOrder: number
  totalPlannedOrder: number
}

const ManagerDashboardProgressPatient: React.FC = () => {
  const [patientsProgress, setPatientsProgress] = useState<PatientProgress[]>([])
  const [managerStatOverall, setManagerStatOverall] = useState<ManagerStatOverall>()

  useEffect(() => {
    const fetchPatientsProgress = async () => {
      try {
        const response = await axiosInstance.get('/patients/progress/manager-sides')
        setPatientsProgress(response.data.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchPatientsProgress()
  }, [])

  useEffect(() => {
    const fetchManagerStat = async () => {
      try {
        const response = await axiosInstance.get('/statistics/manager-sides')
        setManagerStatOverall(response.data.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchManagerStat()
  }, [])

  const handleViewDetails = (progress: PatientProgress) => {
    console.log("Viewing details for:", progress);
    // TODO: Implement view details functionality
  };

  return (
    <div className="manager-dashboard">
      <ManagerSidebar/>

      <div className="manager-main-content">
        <div className="manager-dashboard-header">
          <div className="manager-header-info">
            <h1 className="page-title">Tiến trình điều trị bệnh nhân</h1>
            <p className="page-subtitle">
              Theo dõi và quản lý tiến trình điều trị của các bệnh nhân trong hệ
              thống
            </p>
          </div>
        </div>

        <div className="manager-dashboard-content">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng bệnh nhân
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {managerStatOverall?.totalPatients}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaUsers className="w-6 h-6"/>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Đang điều trị
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {managerStatOverall?.totalInProgressOrder}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GrInProgress className="w-6 h-6"/>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Hoàn thành
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {managerStatOverall?.totalCompleteOrder}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MdDone className="w-6 h-6"/>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Đã lên kế hoạch
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {managerStatOverall?.totalPlannedOrder}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                 <GrPlan className="w-6 h-6"/>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-management-container">
            <PatientProgressManagement
              progressData={patientsProgress}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardProgressPatient;
