import { TbListDetails } from "react-icons/tb";
import { IoBanOutline, IoFilterSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import type { Patient } from "../../../models/Patient";
import type { Order } from "../../../models/Order";
import { convertFullName, convertName, formatCurrency } from "../../../functions/CommonFunction";
import { getStatusOrder } from "../doctor/RecentPatientsTable";
import { FaUserAltSlash } from "react-icons/fa";

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

  const handleViewDetail = (pId: string) => {
    const res = patients.find((x) => x.patient.id === pId);
    setSelectedPatient(res);
  };

  const filtered = patients.filter((p) =>
    convertName(p.patient.profile ?? {})
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-800">
          📋 Danh sách bệnh nhân
        </h3>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm theo tên bệnh nhân..."
            className="border rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowFilter((s) => !s)}
            className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-100"
            title="Bộ lọc"
          >
            <IoFilterSharp className="w-5 h-5" />
            <span className="hidden sm:inline">Lọc</span>
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="border-b p-4 bg-gray-50 flex items-center justify-between flex-wrap gap-2">
          <span className="font-semibold text-sm">Bộ lọc (demo):</span>
          <button
            onClick={() => {
              setShowFilter(false);
            }}
            className="text-sm text-indigo-600 hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {[
                "ID",
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
                  className="px-4 py-3 text-left font-semibold text-gray-600 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((patient) => (
              <tr key={patient.patient.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{patient.patient.id}</td>

                <td className="px-4 py-3 font-medium">
                  {convertName(patient.patient.profile ?? {})}
                </td>

                <td className="px-4 py-3">
                  <div>{patient.emailContact}</div>
                  <div className="text-gray-500">{patient.phoneContact}</div>
                </td>

                <td className="px-4 py-3">
                  {patient.patient.profile?.dateOfBirth}
                </td>

                <td className="px-4 py-3">{patient.patient.partnerFullName}</td>

                <td className="px-4 py-3">
                  <div>{patient.patient.partnerEmail}</div>
                  <div className="text-gray-500">
                    {patient.patient.partnerPhone}
                  </div>
                </td>

                <td className="px-4 py-3">{patient.patient.medicalHistory}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewDetail(patient.patient.id ?? "")}
                      title="Chi tiết"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <TbListDetails className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => alert("Báo cáo/Analytics chưa xử lý")}
                      title="Báo cáo tiến trình điều trị"
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaUserAltSlash className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <div className="bg-gray-50 border-t p-6">
          <h4 className="text-lg font-semibold mb-4">
            📄 Thông tin chi tiết bệnh nhân
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Họ tên:</span>{" "}
              {convertName(selectedPatient.patient.profile ?? {})}
            </div>
            <div>
              <span className="font-semibold">Giới tính:</span>{" "}
              {selectedPatient.patient.profile?.gender}
            </div>
            <div>
              <span className="font-semibold">Ngày sinh:</span>{" "}
              {selectedPatient.patient.profile?.dateOfBirth}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Địa chỉ:</span>{" "}
              {selectedPatient.patient.profile?.address}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {selectedPatient.emailContact}
            </div>
            <div>
              <span className="font-semibold">SĐT:</span>{" "}
              {selectedPatient.phoneContact}
            </div>
            <div>
              <span className="font-semibold">Người thân:</span>{" "}
              {selectedPatient.patient.partnerFullName}
            </div>
            <div>
              <span className="font-semibold">Email người thân:</span>{" "}
              {selectedPatient.patient.partnerEmail}
            </div>
            <div>
              <span className="font-semibold">SĐT người thân:</span>{" "}
              {selectedPatient.patient.partnerPhone}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Tiền sử bệnh:</span>{" "}
              {selectedPatient.patient.medicalHistory}
            </div>
            <h5 className="text-md font-semibold mt-6 mb-2">
              🗂️ Lịch sử đơn điều trị
            </h5>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {[
                      "ID",
                      "Bác sĩ",
                      "Gói điều trị",
                      "Bắt đầu",
                      "Kết thúc",
                      "Tổng chi phí",
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
                  {(selectedPatient.orders ?? []).map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{o.id}</td>
                      <td className="px-4 py-3">Bs.{convertFullName(o.doctor?.profile ?? {})}</td>
                      <td className="px-4 py-3">{o.treatmentService?.name}</td>
                      <td className="px-4 py-3">{o.startDate}</td>
                      <td className="px-4 py-3">{o.endDate}</td>
                      <td className="px-4 py-3">
                        {formatCurrency(o.totalAmount??0)}₫
                      </td>
                      <td className="px-4 py-3">{getStatusOrder(o.status)}</td>
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
        </div>
      )}
    </div>
  );
};
