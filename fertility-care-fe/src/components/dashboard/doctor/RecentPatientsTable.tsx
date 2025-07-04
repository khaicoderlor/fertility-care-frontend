import React from "react";

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: string;
}

interface RecentPatientsTableProps {
  patients: Patient[];
}

const RecentPatientsTable: React.FC<RecentPatientsTableProps> = ({
  patients,
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Đã khỏi":
        return "bg-green-100 text-green-800";
      case "Đang điều trị":
        return "bg-blue-100 text-blue-800";
      case "Tái khám":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Bệnh nhân gần đây
        </h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Xem tất cả
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Tên bệnh nhân
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Tuổi
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Tình trạng
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Lần khám cuối
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">
                    {patient.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{patient.age}</td>
                <td className="py-3 px-4 text-gray-600">{patient.condition}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(patient.lastVisit).toLocaleDateString("vi-VN")}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                      patient.status
                    )}`}
                  >
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatientsTable;
