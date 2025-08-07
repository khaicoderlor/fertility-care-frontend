"use client";

import { TbListDetails } from "react-icons/tb";
import { IoBanOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { useEffect, useState } from "react";
import type { Patient } from "../../../models/Patient";
import type { Order } from "../../../models/Order";
import {
  convertFullName,
  convertName,
} from "../../../functions/CommonFunction";
import { ITEMS_PER_PAGE } from "../../../constants/ApplicationConstant";

export interface PatientSideAdminPage {
  emailContact: string;
  phoneContact: string;
  patient: Patient;
  orders?: Order[];
}

interface PatientTableProps {
  patients: PatientSideAdminPage[];
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  const [selectedPatient, setSelectedPatient] =
    useState<PatientSideAdminPage>();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleViewDetail = (pId: string) => {
    const res = patients.find((x) => x.patient.id === pId);
    setSelectedPatient(res);
  };

  const filtered = patients.filter((p) =>
    convertName(p.patient.profile ?? {})
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [filtered]);

  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getGenderBadge = (gender: string) => {
    const genderConfig = {
      male: "bg-blue-100 text-blue-800 border-blue-200",
      female: "bg-pink-100 text-pink-800 border-pink-200",
      nam: "bg-blue-100 text-blue-800 border-blue-200",
      nữ: "bg-pink-100 text-pink-800 border-pink-200",
    };

    const className =
      genderConfig[gender?.toLowerCase() as keyof typeof genderConfig] ||
      "bg-gray-100 text-gray-800 border-gray-200";

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
      >
        {gender}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
      active: "bg-blue-100 text-blue-800 border-blue-200",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };

    const className =
      statusConfig[status?.toLowerCase() as keyof typeof statusConfig] ||
      "bg-gray-100 text-gray-800 border-gray-200";

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
      >
        {status}
      </span>
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* ===== Header Section ===== */}
      <div className="bg-gray-100 p-8 border-b border-gray-100">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Quản lý bệnh nhân
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Tổng cộng {patients.length} bệnh nhân
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bệnh nhân..."
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Filter Section ===== */}
      {showFilter && (
        <div className="bg-gray-50 border-b border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">
                Bộ lọc nâng cao:
              </span>
              <div className="flex gap-2">
                <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Tất cả giới tính</option>
                </select>
                <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Tất cả trạng thái</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="text-sm text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
            >
              Đóng bộ lọc
            </button>
          </div>
        </div>
      )}

      {/* ===== Main Table ===== */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {[
                "Bệnh nhân",
                "Liên lạc",
                "Ngày sinh",
                "Người thân",
                "Liên hệ người thân",
                "Tiền sử bệnh",
                "Thao tác",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {paginatedData.map((patient, index) => (
              <tr
                key={patient.patient.id}
                className={`hover:bg-green-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold text-gray-900 text-base">
                        {convertName(patient.patient.profile ?? {})}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getGenderBadge(
                          patient.patient.profile?.gender || "Chưa xác định"
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">
                      {patient.emailContact}
                    </div>
                    <div className="text-sm text-gray-600">
                      {patient.phoneContact}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-gray-900">
                    {patient.patient.profile?.dateOfBirth || "Chưa cập nhật"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium text-gray-900">
                    {patient.patient.partnerFullName || "Chưa có thông tin"}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">
                      {patient.patient.partnerEmail || "Chưa có"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {patient.patient.partnerPhone || "Chưa có"}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="max-w-xs">
                    <p
                      className="text-sm text-gray-700 truncate"
                      title={patient.patient.medicalHistory}
                    >
                      {patient.patient.medicalHistory ||
                        "Không có tiền sử bệnh"}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetail(patient.patient.id ?? "")}
                      title="Xem chi tiết"
                      className="inline-flex items-center text-blue-500 hover:text-blue-800 justify-center rounded-full transition-all duration-200 "
                    >
                      <TbListDetails className="w-4 h-4 mr-1" /> Chi tiết
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 flex items-center justify-between border-t bg-gray-50">
          <p className="text-sm text-gray-500">
            Trang {currentPage} / {totalPages}
          </p>
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-3 py-2 text-sm font-medium rounded-lg border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              ← Trước
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border ${
                    currentPage === page
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`px-3 py-2 text-sm font-medium rounded-lg border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Sau →
            </button>
          </div>
        </div>
      </div>

      {/* ===== Detail Section ===== */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gray-50 border-t border-gray-100 rounded-xl shadow-xl">
            {/* Patient Profile Header */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg border-4 border-white">
                    <img
                      src={selectedPatient.patient.profile?.avatarUrl}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {convertName(selectedPatient.patient.profile ?? {})}
                      </h4>
                      <div className="flex items-center gap-4 mb-3">
                        {getGenderBadge(
                          selectedPatient.patient.profile?.gender ||
                            "Chưa xác định"
                        )}
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          ID: {selectedPatient.patient.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Ngày sinh:</span>
                          <span className="font-semibold text-gray-900">
                            {selectedPatient.patient.profile?.dateOfBirth ||
                              "Chưa cập nhật"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            Tổng đơn điều trị:
                          </span>
                          <span className="font-bold text-green-600">
                            {selectedPatient.orders?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPatient(undefined)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Patient Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-3">
                    Thông tin cá nhân
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPatient.emailContact}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Điện thoại:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPatient.phoneContact}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span className="text-gray-600">Địa chỉ:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPatient.patient.profile?.address ||
                          "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-3">
                    Người thân
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Họ tên:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPatient.patient.partnerFullName ||
                          "Chưa có thông tin"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPatient.patient.partnerEmail || "Chưa có"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Điện thoại:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPatient.patient.partnerPhone || "Chưa có"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h5 className="font-semibold text-gray-900 mb-3">
                    Tiền sử bệnh
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedPatient.patient.medicalHistory ||
                      "Không có tiền sử bệnh đặc biệt"}
                  </p>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🗂️</span>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-gray-900">
                    Lịch sử điều trị
                  </h5>
                  <p className="text-sm text-gray-600">
                    Tổng cộng {selectedPatient.orders?.length || 0} đơn điều trị
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "ID",
                          "Bác sĩ điều trị",
                          "Gói điều trị",
                          "Thời gian",
                          "Trạng thái",
                          "Trữ phôi",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {(selectedPatient.orders ?? []).map((o, index) => (
                        <tr
                          key={o.id}
                          className={`hover:bg-green-50 transition-colors duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center justify-center  bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                              {o.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                BS
                              </div>
                              <div className="font-medium text-gray-900">
                                Bs.{convertFullName(o.doctor?.profile ?? {})}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                              {o.treatmentService?.name || "Chưa xác định"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {o.startDate}
                              </div>
                              <div className="text-gray-600">
                                đến {o.endDate}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            {getStatusBadge(o.status)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              {o.isFrozen ? (
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <IoMdCheckmark className="w-5 h-5 text-green-600" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                  <IoBanOutline className="w-5 h-5 text-red-500" />
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
