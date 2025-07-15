import React, { useState, useMemo, useEffect } from "react";
import {
  renderStars,
  getRatingColor,
  ratingFilterOptions,
} from "../../../data/DataManagerFeedbackDoctor";
import type { FeedbackLatestSideManager } from "../../../models/FeedbackLatest";
import axiosInstance from "../../../apis/AxiosInstance";
import { convertFullName } from "../../../functions/CommonFunction";
import { TbListDetails } from "react-icons/tb";
import type { FeedbackSideManager } from "../../../pages/manager/ManagerDashboardFeedbackDoctor";
import { IoSearch } from "react-icons/io5";

interface DoctorFeedbackManagementProps {
  feedbackData: FeedbackSideManager[];
}

const DoctorFeedbackManagement: React.FC<DoctorFeedbackManagementProps> = ({
  feedbackData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackSideManager | null>(null);
  const [doctorFilter, setDoctorFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"summary" | "detailed">("summary");
  const [feedbacksLatest, setFeedbacksLatest] = useState<
    FeedbackLatestSideManager[]
  >([]);
  const itemsPerPage = 10;

  const doctors = useMemo(() => {
    const uniqueDoctors = feedbackData
      .map((x) => x.doctor)
      .reduce((acc, doctor) => {
        if (!acc.includes(convertFullName(doctor.profile))) {
          acc.push(convertFullName(doctor.profile));
        }
        return acc;
      }, [] as string[]);
    return uniqueDoctors.sort();
  }, [feedbackData]);

  // Filter data for detailed view
  const filteredFeedbacks = useMemo(() => {
    return feedbackData.filter((feedback) => {
      const doctorName = convertFullName(feedback.doctor.profile).toLowerCase();
      const patientName = convertFullName(
        feedback.patient.profile ?? {}
      ).toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        doctorName.includes(searchLower) || patientName.includes(searchLower);
      const matchesDoctor =
        !doctorFilter || doctorName.includes(doctorFilter.toLowerCase());
      const matchesRating =
        ratingFilter === "all" ||
        feedback.feedback.rating.toString() === ratingFilter;

      return matchesSearch && matchesDoctor && matchesRating;
    });
  }, [feedbackData, searchTerm, doctorFilter, ratingFilter]);

  // Filter summary data
  const filteredSummary = useMemo(() => {
    return feedbacksLatest.filter((summary) => {
      const doctorName = convertFullName(summary.doctor.profile).toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch = doctorName.includes(searchLower);
      const matchesDoctor =
        !doctorFilter || doctorName.includes(doctorFilter.toLowerCase());

      return matchesSearch && matchesDoctor;
    });
  }, [feedbacksLatest, searchTerm, doctorFilter]);

  // Pagination for detailed view
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (feedback: FeedbackSideManager) => {
    setSelectedFeedback(feedback);
  };

  useEffect(() => {
    const fetchFeedbacksLatest = async () => {
      try {
        const response = await axiosInstance.get(
          "/feedbacks/second/latest/manager-sides"
        );
        setFeedbacksLatest(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedbacksLatest();
  }, []);

  return (
    <div className="doctor-feedback-management">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đánh giá bác sĩ
          </h2>
          <p className="text-gray-600">
            Quản lý và theo dõi đánh giá của bệnh nhân về các bác sĩ
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setViewMode("summary")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "summary"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setViewMode("detailed")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "detailed"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Chi tiết
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div
          className={`grid gap-4 ${
            viewMode === "detailed"
              ? "grid-cols-1 md:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  viewMode === "summary"
                    ? "Tên bác sĩ..."
                    : "Tên bác sĩ hoặc bệnh nhân..."
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <IoSearch className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            </div>
          </div>

          {/* Doctor Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lọc theo bác sĩ
            </label>
            <select
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả bác sĩ</option>
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter - Only show in detailed view */}
          {viewMode === "detailed" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lọc theo đánh giá
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ratingFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === "summary" ? (
        /* Summary View */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSummary.map((summary) => (
            <div
              key={summary.doctor.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Doctor Info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <img src={summary.doctor.profile.avatarUrl} className="rounded-full"/>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {convertFullName(summary.doctor.profile)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {summary.doctor.specialization}
                  </p>
                </div>
              </div>

              {/* Rating Summary */}
              <div className="mb-4">
                {/* Average rating: Tính từ feedbacks */}
                <div className="flex items-center mb-2">
                  {(() => {
                    const total = summary.feedbacks.length;
                    const avg =
                      total > 0
                        ? summary.feedbacks.reduce(
                            (sum, f) => sum + f.rating,
                            0
                          ) / total
                        : 0;
                    return (
                      <>
                        <span
                          className={`text-2xl font-bold ${getRatingColor(
                            avg
                          )} mr-2`}
                        >
                          {avg.toFixed(1)}
                        </span>
                        <div className="text-yellow-400 text-lg mr-2">
                          {renderStars(Math.round(avg))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({total} đánh giá)
                        </span>
                      </>
                    );
                  })()}
                </div>

                {/* Rating distribution */}
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = summary.feedbacks.filter(
                      (f) => Math.round(f.rating) === star
                    ).length;
                    const total = summary.feedbacks.length;
                    const percentage = total > 0 ? (count / total) * 100 : 0;

                    return (
                      <div key={star} className="flex items-center text-sm">
                        <span className="w-8">{star}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="w-8 text-right text-gray-600">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Feedbacks */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Đánh giá gần đây
                </h4>
                <div className="space-y-2">
                  {summary.feedbacks.slice(0, 2).map((feedback, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-yellow-400 text-sm">
                          {renderStars(feedback.rating)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {feedback.createdAt}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {feedback.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        - {convertFullName(feedback.patient.profile ?? {})}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Detailed View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bác sĩ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bệnh nhân
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đánh giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhận xét
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đánh giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedFeedbacks.map((feedback) => (
                  <tr key={feedback.feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {convertFullName(feedback.doctor.profile)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {feedback.doctor.specialization}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900">
                          {convertFullName(feedback.patient.profile ?? {})}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`text-lg font-semibold ${getRatingColor(
                            feedback.feedback.rating
                          )} mr-2`}
                        >
                          {feedback.feedback.rating}
                        </span>
                        <span className="text-yellow-400">
                          {renderStars(feedback.feedback.rating)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {feedback.treatmentService.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {feedback.feedback.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {feedback.feedback.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(feedback)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <TbListDetails className="w-3 h-3" /> Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Trước
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    đến{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredFeedbacks.length
                      )}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="font-medium">
                      {filteredFeedbacks.length}
                    </span>{" "}
                    kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              X
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Chi tiết đánh giá
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Bác sĩ:</p>
                <p className="font-medium text-gray-900">
                  {convertFullName(selectedFeedback.doctor.profile)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bệnh nhân:</p>
                <p className="font-medium text-gray-900">
                  {convertFullName(selectedFeedback.patient.profile ?? {})}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dịch vụ điều trị:</p>
                <p className="font-medium text-gray-900">
                  {selectedFeedback.treatmentService.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Đánh giá:</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold ${getRatingColor(
                      selectedFeedback.feedback.rating
                    )}`}
                  >
                    {selectedFeedback.feedback.rating}
                  </span>
                  <span className="text-yellow-400">
                    {renderStars(selectedFeedback.feedback.rating)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nhận xét:</p>
                <p className="text-gray-800">
                  {selectedFeedback.feedback.comment}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày đánh giá:</p>
                <p className="text-gray-800">
                  {selectedFeedback.feedback.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {((viewMode === "summary" && filteredSummary.length === 0) ||
        (viewMode === "detailed" && filteredFeedbacks.length === 0)) && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <i className="fas fa-star text-6xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy đánh giá nào
          </h3>
          <p className="text-gray-500">
            Thử thay đổi bộ lọc để xem thêm kết quả.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorFeedbackManagement;
