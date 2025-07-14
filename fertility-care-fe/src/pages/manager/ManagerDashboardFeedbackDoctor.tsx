import React, { useState } from "react";
import ManagerSidebar from "../../components/dashboard/manager/ManagerSidebar";
import DoctorFeedbackManagement from "../../components/dashboard/manager/DoctorFeedbackManagement";
import {
  doctorFeedbackData,
  getDoctorFeedbackSummary,
} from "../../data/DataManagerFeedbackDoctor";
import type { DoctorFeedback } from "../../data/DataManagerFeedbackDoctor";
import "../../assets/css/StyleManagerFeedbackDoctor.css";

const ManagerDashboardFeedbackDoctor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("doctor-feedback");
  const summaryData = getDoctorFeedbackSummary();

  const handleViewDetails = (feedback: DoctorFeedback) => {
    console.log("Viewing feedback details:", feedback);
    // TODO: Implement view details functionality (modal, detail page, etc.)
  };

  const handleVerifyFeedback = (feedbackId: string) => {
    console.log("Verifying feedback:", feedbackId);
    // TODO: Implement feedback verification functionality
  };

  // Calculate overall stats
  const totalFeedbacks = doctorFeedbackData.length;
  const averageRating =
    doctorFeedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) /
    totalFeedbacks;
  const verifiedCount = doctorFeedbackData.filter((f) => f.isVerified).length;
  const unverifiedCount = doctorFeedbackData.filter(
    (f) => !f.isVerified
  ).length;

  const ratingCounts = {
    star5: doctorFeedbackData.filter((f) => f.rating === 5).length,
    star4: doctorFeedbackData.filter((f) => f.rating === 4).length,
    star3: doctorFeedbackData.filter((f) => f.rating === 3).length,
    star2: doctorFeedbackData.filter((f) => f.rating === 2).length,
    star1: doctorFeedbackData.filter((f) => f.rating === 1).length,
  };

  const topRatedDoctor = summaryData.length > 0 ? summaryData[0] : null;

  return (
    <div className="manager-dashboard">
      <ManagerSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="manager-main-content">
        <div className="manager-dashboard-header">
          <div className="manager-header-info">
            <h1 className="page-title">Đánh giá bác sĩ</h1>
            <p className="page-subtitle">
              Quản lý và theo dõi đánh giá của bệnh nhân về các bác sĩ trong hệ
              thống
            </p>
          </div>
        </div>

        <div className="manager-dashboard-content">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tổng đánh giá
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalFeedbacks}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-star text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Đánh giá trung bình
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {averageRating.toFixed(1)}★
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-yellow-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Đã xác thực
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {verifiedCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-green-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Chờ xác thực
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {unverifiedCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-orange-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Rating Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Phân bố đánh giá
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count =
                    ratingCounts[`star${star}` as keyof typeof ratingCounts];
                  const percentage =
                    totalFeedbacks > 0 ? (count / totalFeedbacks) * 100 : 0;

                  return (
                    <div key={star} className="flex items-center">
                      <span className="w-12 text-sm font-medium">
                        {star} sao
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-gray-600 text-right">
                        {count}
                      </span>
                      <span className="w-12 text-xs text-gray-500 text-right ml-2">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Rated Doctor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Bác sĩ được đánh giá cao nhất
              </h3>
              {topRatedDoctor ? (
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-user-md text-blue-600 text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {topRatedDoctor.doctorName}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {topRatedDoctor.specialization}
                    </p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-yellow-600 mr-2">
                        {topRatedDoctor.averageRating.toFixed(1)}★
                      </span>
                      <span className="text-sm text-gray-600">
                        ({topRatedDoctor.totalFeedbacks} đánh giá)
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Chưa có dữ liệu</p>
              )}
            </div>
          </div>

          {/* Feedback Management */}
          <div className="feedback-management-container">
            <DoctorFeedbackManagement
              feedbackData={doctorFeedbackData}
              summaryData={summaryData}
              onViewDetails={handleViewDetails}
              onVerifyFeedback={handleVerifyFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardFeedbackDoctor;
