import React, { useState, useMemo } from "react";
import type {
  DoctorFeedback,
  DoctorFeedbackSummary,
} from "../../../data/DataManagerFeedbackDoctor";
import {
  formatDate,
  renderStars,
  getRatingColor,
  ratingFilterOptions,
  verificationFilterOptions,
} from "../../../data/DataManagerFeedbackDoctor";

interface DoctorFeedbackManagementProps {
  feedbackData: DoctorFeedback[];
  summaryData: DoctorFeedbackSummary[];
  onViewDetails?: (feedback: DoctorFeedback) => void;
  onVerifyFeedback?: (feedbackId: string) => void;
}

const DoctorFeedbackManagement: React.FC<DoctorFeedbackManagementProps> = ({
  feedbackData,
  summaryData,
  onViewDetails,
  onVerifyFeedback,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"summary" | "detailed">("summary");
  const itemsPerPage = 10;

  // Get unique doctors for filter
  const doctors = useMemo(() => {
    const uniqueDoctors = feedbackData.reduce((acc, feedback) => {
      if (!acc.includes(feedback.doctorName)) {
        acc.push(feedback.doctorName);
      }
      return acc;
    }, [] as string[]);
    return uniqueDoctors.sort();
  }, [feedbackData]);

  // Filter data for detailed view
  const filteredFeedbacks = useMemo(() => {
    return feedbackData.filter((feedback) => {
      const doctorName = feedback.doctorName.toLowerCase();
      const patientName = feedback.patientName.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        doctorName.includes(searchLower) || patientName.includes(searchLower);
      const matchesDoctor =
        !doctorFilter || doctorName.includes(doctorFilter.toLowerCase());
      const matchesRating =
        ratingFilter === "all" || feedback.rating.toString() === ratingFilter;
      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified" && feedback.isVerified) ||
        (verificationFilter === "unverified" && !feedback.isVerified);

      return (
        matchesSearch && matchesDoctor && matchesRating && matchesVerification
      );
    });
  }, [
    feedbackData,
    searchTerm,
    doctorFilter,
    ratingFilter,
    verificationFilter,
  ]);

  // Filter summary data
  const filteredSummary = useMemo(() => {
    return summaryData.filter((summary) => {
      const doctorName = summary.doctorName.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch = doctorName.includes(searchLower);
      const matchesDoctor =
        !doctorFilter || doctorName.includes(doctorFilter.toLowerCase());

      return matchesSearch && matchesDoctor;
    });
  }, [summaryData, searchTerm, doctorFilter]);

  // Pagination for detailed view
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (feedback: DoctorFeedback) => {
    if (onViewDetails) {
      onViewDetails(feedback);
    }
  };

  const handleVerifyFeedback = (feedbackId: string) => {
    if (onVerifyFeedback) {
      onVerifyFeedback(feedbackId);
    }
  };

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
            <i className="fas fa-chart-bar mr-2"></i>
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
            <i className="fas fa-list mr-2"></i>
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
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
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

          {/* Verification Filter - Only show in detailed view */}
          {viewMode === "detailed" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái xác thực
              </label>
              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {verificationFilterOptions.map((option) => (
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
              key={summary.doctorId}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Doctor Info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user-md text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {summary.doctorName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {summary.specialization}
                  </p>
                </div>
              </div>

              {/* Rating Summary */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span
                    className={`text-2xl font-bold ${getRatingColor(
                      summary.averageRating
                    )} mr-2`}
                  >
                    {summary.averageRating.toFixed(1)}
                  </span>
                  <div className="text-yellow-400 text-lg mr-2">
                    {renderStars(Math.round(summary.averageRating))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({summary.totalFeedbacks} đánh giá)
                  </span>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count =
                      summary.ratingDistribution[
                        `star${star}` as keyof typeof summary.ratingDistribution
                      ];
                    const percentage =
                      summary.totalFeedbacks > 0
                        ? (count / summary.totalFeedbacks) * 100
                        : 0;

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
                  {summary.recentFeedbacks.slice(0, 2).map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-gray-50 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-yellow-400 text-sm">
                          {renderStars(feedback.rating)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(feedback.feedbackDate)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {feedback.comment}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        - {feedback.patientName}
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
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {feedback.doctorName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {feedback.doctorSpecialization}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {feedback.isAnonymous && (
                          <i className="fas fa-user-secret text-gray-400 mr-2"></i>
                        )}
                        <div className="text-sm text-gray-900">
                          {feedback.patientName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`text-lg font-semibold ${getRatingColor(
                            feedback.rating
                          )} mr-2`}
                        >
                          {feedback.rating}
                        </span>
                        <span className="text-yellow-400">
                          {renderStars(feedback.rating)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {feedback.treatmentType}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {feedback.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(feedback.feedbackDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(feedback)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <i className="fas fa-eye"></i> Xem
                      </button>
                      {!feedback.isVerified && (
                        <button
                          onClick={() => handleVerifyFeedback(feedback.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <i className="fas fa-check"></i> Xác thực
                        </button>
                      )}
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
