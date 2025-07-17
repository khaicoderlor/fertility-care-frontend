"use client"

import { TbListDetails } from "react-icons/tb"
import { IoFilterSharp } from "react-icons/io5"
import { IoMdCheckmark } from "react-icons/io"
import { IoBanOutline } from "react-icons/io5"
import { IoClose, IoSearch } from "react-icons/io5"
import { FaStar, FaRegStar } from "react-icons/fa"
import { useState } from "react"
import { convertFullName, convertName } from "../../../functions/CommonFunction"
import type { Doctor } from "../../../models/Doctor"
import type { Order } from "../../../models/Order"

export interface DoctorSideAdminPage {
  doctor: Doctor
  orders: Order[]
  doctorEmail: string
  doctorPhone: string
}

interface DoctorTableProps {
  doctors: DoctorSideAdminPage[]
}

export const DoctorTable = ({ doctors }: DoctorTableProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorSideAdminPage>()
  const [search, setSearch] = useState("")
  const [showFilter, setShowFilter] = useState(false)

  const renderRating = (rating: number) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <FaStar key={i} className="w-4 h-4 text-amber-400" />
        ) : (
          <FaRegStar key={i} className="w-4 h-4 text-gray-300" />
        ),
      )}
      <span className="ml-2 text-sm font-medium text-gray-600">({rating})</span>
    </div>
  )

  const getStatusBadge = (status: string) => {
    const statusColors = {
      completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      active: "bg-blue-100 text-blue-800 border-blue-200",
    }

    const colorClass =
      statusColors[status.toLowerCase() as keyof typeof statusColors] || "bg-gray-100 text-gray-800 border-gray-200"

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
        {status}
      </span>
    )
  }

  const filtered = doctors.filter((d) => convertName(d.doctor.profile).toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* ===== Header Section ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🩺</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Danh sách bác sĩ</h3>
              <p className="text-blue-100 text-sm">Quản lý thông tin bác sĩ và đơn điều trị</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bác sĩ..."
                className="pl-10 pr-4 py-3 w-80 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm text-gray-700 placeholder-gray-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilter((s) => !s)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                showFilter ? "bg-white text-blue-600 shadow-sm" : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <IoFilterSharp className="w-5 h-5" />
              <span className="hidden sm:inline">Bộ lọc</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Filter Section ===== */}
      {showFilter && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Bộ lọc:</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Tất cả chuyên khoa
                </button>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Đánh giá cao
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <IoClose className="w-4 h-4" />
              <span className="text-sm">Đóng</span>
            </button>
          </div>
        </div>
      )}

      {/* ===== Table Section ===== */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {["Bác sĩ", "Chuyên khoa", "Đánh giá", "Liên hệ", "Bệnh nhân đã điều trị", "Thao tác"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((doc, index) => (
              <tr
                key={doc.doctor.id}
                className={`hover:bg-blue-50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 text-base">{convertName(doc.doctor.profile)}</div>
                  <div className="text-sm text-gray-500">{doc.doctor.degree}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {doc.doctor.specialization}
                  </span>
                </td>
                <td className="px-6 py-4">{renderRating(doc.doctor.rating)}</td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">{doc.doctorEmail}</div>
                    <div className="text-sm text-gray-500">{doc.doctorPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-semibold text-gray-900">{doc.doctor.patientsServed}</span>
                    <span className="text-sm text-gray-500">bệnh nhân</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    title="Xem chi tiết"
                    className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <TbListDetails className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Detail Card ===== */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-8 relative">
              <button
                onClick={() => setSelectedDoctor(undefined)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 text-white"
              >
                <IoClose className="w-6 h-6" />
              </button>

              <div className="flex items-start gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl">
                    <img
                      src={selectedDoctor.doctor.profile.avatarUrl || "/placeholder.svg"}
                      alt="Doctor Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1 text-white">
                  <h4 className="text-3xl font-bold mb-3">{convertFullName(selectedDoctor.doctor.profile)}</h4>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm">
                      {selectedDoctor.doctor.degree}
                    </span>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm">
                      {selectedDoctor.doctor.specialization}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-xl">⭐</span>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Đánh giá</div>
                        <div className="font-semibold">{selectedDoctor.doctor.rating}/5</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-xl">🎓</span>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Kinh nghiệm</div>
                        <div className="font-semibold">{selectedDoctor.doctor.yearsOfExperience} năm</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-xl">👥</span>
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Bệnh nhân</div>
                        <div className="font-semibold">{selectedDoctor.doctor.patientsServed}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <span>ID:</span>
                    <span className="font-mono font-semibold">#{selectedDoctor.doctor.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {/* Contact & Biography */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <h5 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">📞</span>
                    Thông tin liên hệ
                  </h5>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xl">📧</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-blue-700 mb-1">Email</div>
                          <div className="font-semibold text-gray-900">{selectedDoctor.doctorEmail}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xl">📱</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-1">Điện thoại</div>
                          <div className="font-semibold text-gray-900">{selectedDoctor.doctorPhone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-6">
                  <h5 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    Tiểu sử bác sĩ
                  </h5>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <p className="text-gray-700 leading-relaxed text-sm">{selectedDoctor.doctor.biography}</p>
                  </div>
                </div>
              </div>

              {/* Orders Section */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">📋</span>
                    </div>
                    Lịch sử đơn điều trị
                  </h5>
                  <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {selectedDoctor.orders.length} đơn
                  </span>
                </div>

                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                          {[
                           
                            "Bệnh nhân",
                            "Gói điều trị",
                            "Ngày bắt đầu",
                            "Tổng phí",
                            "Trạng thái",
                            "Trữ phôi",
                          ].map((header) => (
                            <th
                              key={header}
                              className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {selectedDoctor.orders.map((order, index) => (
                          <tr
                            key={order.id}
                            className={`hover:bg-blue-50 transition-colors duration-150 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }`}
                          >
     
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-900">
                                {convertName(order.patient?.profile ?? {})}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300">
                                {order.treatmentService?.name ?? "-"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">{order.startDate}</td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-green-600 text-lg">
                                {order.totalAmount?.toLocaleString()}₫
                              </span>
                            </td>
                            <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center">
                                {order.isFrozen ? (
                                  <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                                    <IoMdCheckmark className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-green-700 font-semibold">Có</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 bg-red-100 px-3 py-1.5 rounded-full">
                                    <IoBanOutline className="w-4 h-4 text-red-500" />
                                    <span className="text-xs text-red-600 font-semibold">Không</span>
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
        </div>
      )}
    </div>
  )
}
