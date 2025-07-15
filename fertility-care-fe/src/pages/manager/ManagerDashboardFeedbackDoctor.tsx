import React, { useEffect, useState } from "react";
import ManagerSidebar from "../../components/dashboard/manager/ManagerSidebar";
import DoctorFeedbackManagement from "../../components/dashboard/manager/DoctorFeedbackManagement";
import "../../assets/css/StyleManagerFeedbackDoctor.css";
import type { Patient } from "../../models/Patient";
import type { Doctor } from "../../models/Doctor";
import type { TreatmentService } from "../../models/TreatmentService";
import type Feedback from "../../models/Feedback";
import axiosInstance from "../../apis/AxiosInstance";
import { convertFullName } from '../../functions/CommonFunction';
import { RiFeedbackFill } from "react-icons/ri";
import { TbAlarmAverage } from "react-icons/tb";

export interface FeedbackSideManager {
  patient: Patient;
  doctor: Doctor;
  treatmentService: TreatmentService;
  feedback: Feedback;
}

interface BestRateDoctor {
  doctor: Doctor
  rating: number
  totalFeedbacks: number
}

const ManagerDashboardFeedbackDoctor: React.FC = () => {
  const [feedbacksData, setFeedbacksData] = useState<FeedbackSideManager[]>([])
  const [bestRateDoctor, setBestRateDoctor] = useState<BestRateDoctor>()
  const totalFeedbacks = feedbacksData.length;
  const averageRating =
    feedbacksData.reduce((sum, feedback) => sum + feedback.feedback.rating, 0) /
    totalFeedbacks;

  const ratingCounts = {
    star5: feedbacksData.filter((f) => f.feedback.rating === 5).length,
    star4: feedbacksData.filter((f) => f.feedback.rating === 4).length,
    star3: feedbacksData.filter((f) => f.feedback.rating === 3).length,
    star2: feedbacksData.filter((f) => f.feedback.rating === 2).length,
    star1: feedbacksData.filter((f) => f.feedback.rating === 1).length,
  };

  useEffect(() => {
    const fetchBestRateDoctor = async () => {
      try {
        const response = await axiosInstance.get('/feedbacks/best-rate')

        setBestRateDoctor(response.data.data)
      } catch(error) {  
        console.log(error)
      }
    }

    fetchBestRateDoctor()
  }, [])

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axiosInstance.get("/feedbacks/full-details");

        setFeedbacksData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <div className="manager-dashboard">
      <ManagerSidebar />

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
                  <RiFeedbackFill className="w-5 h-5"/>
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
                  <TbAlarmAverage className="w-7 h-7"/>
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
              {bestRateDoctor ? (
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <img src={bestRateDoctor.doctor.profile.avatarUrl} className="rounded-full text-blue-600 text-xl"/>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {convertFullName(bestRateDoctor.doctor.profile)}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {bestRateDoctor.doctor.specialization}
                    </p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-yellow-600 mr-2">
                        {bestRateDoctor.rating.toFixed(1)}★
                      </span>
                      <span className="text-sm text-gray-600">
                        ({bestRateDoctor.totalFeedbacks} đánh giá)
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
            <DoctorFeedbackManagement feedbackData={feedbacksData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardFeedbackDoctor;
