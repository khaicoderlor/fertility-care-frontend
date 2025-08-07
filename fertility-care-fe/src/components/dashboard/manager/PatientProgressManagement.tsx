import React, { useState, useMemo } from "react";
import type { PatientProgress } from "../../../data/DataManagerProgressPatient";
import {
  getStatusColor,
  getStatusText,
  statusFilterOptions,
} from "../../../data/DataManagerProgressPatient";
import { convertFullName } from "../../../functions/CommonFunction";

interface PatientProgressManagementProps {
  progressData: PatientProgress[];
  onViewDetails?: (progress: PatientProgress) => void;
}

const PatientProgressManagement: React.FC<PatientProgressManagementProps> = ({
  progressData,
  onViewDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique doctors for filter
  const doctors = useMemo(() => {
    const uniqueDoctors = progressData.reduce((acc, progress) => {
      const doctorName = convertFullName(progress.doctor.profile??{}) || "";
      if (doctorName && !acc.includes(doctorName)) {
        acc.push(doctorName);
      }
      return acc;
    }, [] as string[]);
    return uniqueDoctors.sort();
  }, [progressData]);

  // Filter data
  const filteredData = useMemo(() => {
    return progressData.filter((progress) => {
      const patientName = convertFullName(progress.patient.profile??{})?.toLowerCase() || "";
      const doctorName = convertFullName(progress.doctor.profile??{})?.toLowerCase() || "";
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        patientName.includes(searchLower) || doctorName.includes(searchLower);
      const matchesDoctor =
        !doctorFilter || doctorName.includes(doctorFilter.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || progress.status === statusFilter;

      return matchesSearch && matchesDoctor && matchesStatus;
    });
  }, [progressData, searchTerm, doctorFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  // const getProgressBarColor = (status: string) => {
  //   switch (status) {
  //     case "Completed":
  //       return "bg-green-500";
  //     case "InProgress":
  //       return "bg-blue-500";
  //     case "Planned":
  //       return "bg-yellow-500";
  //     case "Failed":
  //       return "bg-red-500";
  //     default:
  //       return "bg-gray-500";
  //   }
  // };

  return (
    <div className="patient-progress-management">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tiến trình điều trị bệnh nhân
          </h2>
          <p className="text-gray-600">
            Theo dõi và quản lý tiến trình điều trị của {filteredData.length}{" "}
            bệnh nhân
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm bệnh nhân/bác sĩ
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên bệnh nhân hoặc bác sĩ..."
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

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lọc theo trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Progress Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bệnh nhân
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bác sĩ phụ trách
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiến trình
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày kết thúc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
   
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((progress) => (
                <tr key={progress.order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                   
                        <div className="text-sm font-medium text-gray-900">
                          {convertFullName(progress.patient.profile??{})}
                        </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {convertFullName(progress.doctor.profile)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {progress.serviceName}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        Bước {progress.currentStep}/{progress.totalSteps}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressBarColor(
                            progress.status
                          )}`}
                          style={{
                            width: `${
                              (progress.currentStep / progress.totalSteps) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {(
                          (progress.currentStep / progress.totalSteps) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {progress.startDate}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {progress.endDate ?? " - "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        progress.status
                      )}`}
                    >
                      {getStatusText(progress.status)}
                    </span>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  đến{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}
                  </span>{" "}
                  trong tổng số{" "}
                  <span className="font-medium">{filteredData.length}</span> kết
                  quả
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Trước
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
                    Sau
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <i className="fas fa-clipboard-list text-6xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy tiến trình nào
          </h3>
          <p className="text-gray-500">
            Thử thay đổi bộ lọc để xem thêm kết quả.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientProgressManagement;
