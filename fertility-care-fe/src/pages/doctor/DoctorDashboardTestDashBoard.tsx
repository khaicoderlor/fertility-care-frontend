import React from "react";
import DashboardStats from "../../components/dashboard/doctor/DashboardStats";
import PatientMonthlyStats from "../../components/dashboard/doctor/PatientMonthlyStats";
import PatientReviewStats from "../../components/dashboard/doctor/PatientReviewStats";
import SideBarDoctor from "../../components/dashboard/doctor/SideBarDoctor";

const DoctorDashboardTestDashBoard: React.FC = () => {
  // Mock data
  const stats = [
    { label: "Tổng bệnh nhân", value: 248, trend: 12, unit: "%" },
    { label: "Lịch hẹn hôm nay", value: 18, trend: 3, unit: "" },
    { label: "Đánh giá trung bình", value: 4.8, trend: 0.2, unit: "" },
    { label: "Tăng trưởng tháng", value: "15%", trend: 5, unit: "%" },
  ];
  const monthlyStats = {
    patientsThisMonth: 72,
    visitsThisMonth: 185,
    growth: 7.5,
  };
  const chartData = [
    { label: "T7", patients: 40, visits: 45 },
    { label: "T8", patients: 50, visits: 44 },
    { label: "T9", patients: 45, visits: 46 },
    { label: "T10", patients: 60, visits: 48 },
    { label: "T11", patients: 50, visits: 55 },
    { label: "T12", patients: 65, visits: 58 },
    { label: "T1", patients: 70, visits: 62 },
  ];
  const reviewStats = {
    avg: 4.8,
    total: 156,
    growth: 12,
    stars: [98, 42, 12, 3, 1],
    latest: {
      name: "Nguyễn Thị Mai",
      comment: "Bác sĩ rất tận tâm và chuyên nghiệp. Cảm ơn bác sĩ!",
      stars: 5,
      date: "16/1/2024",
    },
  };

  return (
    <div className="flex">
      <SideBarDoctor />
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
        <DashboardStats stats={stats} />
        <div className="flex gap-6">
          <PatientMonthlyStats
            monthlyStats={monthlyStats}
            chartData={chartData}
          />
          <PatientReviewStats reviewStats={reviewStats} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardTestDashBoard;
