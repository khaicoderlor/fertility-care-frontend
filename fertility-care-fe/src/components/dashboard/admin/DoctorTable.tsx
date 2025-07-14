import {
  TbListDetails
} from "react-icons/tb";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { IoBanOutline } from "react-icons/io5";
import { useState } from "react";
import { convertName } from "../../../functions/CommonFunction";
import type { Doctor } from "../../../models/Doctor";
import type { Order } from "../../../models/Order";

export interface DoctorSideAdminPage {
  doctor: Doctor;
  orders: Order[];
  doctorEmail: string;
  doctorPhone: string;
}

interface DoctorTableProps {
  doctors: DoctorSideAdminPage[];
}

export const DoctorTable = ({ doctors }: DoctorTableProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorSideAdminPage>();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const renderRating = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`fas fa-star text-sm ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  );

  const filtered = doctors.filter((d) =>
    convertName(d.doctor.profile)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* ===== Title + Search ===== */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-800">🩺 Danh sách bác sĩ</h3>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm bác sĩ..."
            className="border rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowFilter((s) => !s)}
            className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-100"
          >
            <IoFilterSharp className="w-5 h-5" />
            <span className="hidden sm:inline">Lọc</span>
          </button>
        </div>
      </div>

      {/* ===== Filter demo ===== */}
      {showFilter && (
        <div className="border-b p-4 bg-gray-50 flex items-center justify-between flex-wrap gap-2">
          <span className="font-semibold text-sm">Bộ lọc (demo):</span>
          <button
            onClick={() => setShowFilter(false)}
            className="text-sm text-indigo-600 hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* ===== Table ===== */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Bác sĩ",
                "Chuyên khoa",
                "Đánh giá",
                "Liên hệ",
                "Bệnh nhân đã điều trị",
                "Thao tác",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-gray-600 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((doc) => (
              <tr key={doc.doctor.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{doc.doctor.id}</td>
                <td className="px-4 py-3 font-medium">
                  {convertName(doc.doctor.profile)}
                </td>
                <td className="px-4 py-3">{doc.doctor.specialization}</td>
                <td className="px-4 py-3">{renderRating(doc.doctor.rating)}</td>
                <td className="px-4 py-3">
                  <div>{doc.doctorEmail}</div>
                  <div className="text-gray-500">{doc.doctorPhone}</div>
                </td>
                <td className="px-4 py-3">{doc.doctor.patientsServed}</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    title="Chi tiết"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <TbListDetails className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Detail card ===== */}
      {selectedDoctor && (
        <div className="bg-gray-50 border-t p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={selectedDoctor.doctor.profile.avatarUrl}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h4 className="text-lg font-bold">
                {convertName(selectedDoctor.doctor.profile)}
              </h4>
              <p className="text-sm text-gray-600">
                {selectedDoctor.doctor.degree} •{" "}
                {selectedDoctor.doctor.specialization}
              </p>
              <p className="text-sm text-gray-600">
                Kinh nghiệm: {selectedDoctor.doctor.yearsOfExperience} năm
              </p>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-8">
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {selectedDoctor.doctorEmail}
            </div>
            <div>
              <span className="font-semibold">SĐT:</span>{" "}
              {selectedDoctor.doctorPhone}
            </div>
            <div>
              <span className="font-semibold">Tổng bệnh nhân:</span>{" "}
              {selectedDoctor.doctor.patientsServed}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Tiểu sử:</span>{" "}
              {selectedDoctor.doctor.biography}
            </div>
          </div>

          {/* Orders table */}
          <h5 className="text-md font-semibold mb-2">🗂️ Các đơn điều trị</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "ID",
                    "Bệnh nhân",
                    "Gói",
                    "Bắt đầu",
                    "Kết thúc",
                    "Tổng phí",
                    "Trạng thái",
                    "Trữ phôi",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold text-gray-600 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {selectedDoctor.orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{o.id}</td>
                    <td className="px-4 py-3">
                      {convertName(o.patient?.profile ?? {})}
                    </td>
                    <td className="px-4 py-3">
                      {o.treatmentService?.name ?? "-"}
                    </td>
                    <td className="px-4 py-3">{o.startDate}</td>
                    <td className="px-4 py-3">{o.endDate}</td>
                    <td className="px-4 py-3">
                      {o.totalAmount?.toLocaleString()}₫
                    </td>
                    <td className="px-4 py-3">{o.status}</td>
                    <td className="px-4 py-3">
                      {o.isFrozen ? (
                        <IoMdCheckmark className="w-4 h-4 text-green-600" />
                      ) : (
                        <IoBanOutline className="w-4 h-4 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
