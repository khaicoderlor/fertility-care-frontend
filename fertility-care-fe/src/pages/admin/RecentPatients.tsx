import React from "react";

interface RecentPatient {
  id: string;
  name: string;
  age: number;
  treatment: string;
  treatmentDetail: string;
  status: "treatment" | "waiting" | "success";
  date: string;
  avatar: string;
}

interface RecentPatientsProps {
  patients?: RecentPatient[];
  onView?: (patient: RecentPatient) => void;
  onEdit?: (patient: RecentPatient) => void;
  onViewAll?: () => void;
}

const mockRecentPatients: RecentPatient[] = [
  {
    id: "P001",
    name: "Nguyễn Thị Hoa",
    age: 32,
    treatment: "IVF Chu kỳ 2",
    treatmentDetail: "Kích thích buồng trứng",
    status: "treatment",
    date: "15/06/2025",
    avatar: "https://via.placeholder.com/40x40/667eea/ffffff?text=NT",
  },
  {
    id: "P002",
    name: "Trần Văn Nam",
    age: 35,
    treatment: "IUI",
    treatmentDetail: "Thụ tinh nhân tạo",
    status: "waiting",
    date: "14/06/2025",
    avatar: "https://via.placeholder.com/40x40/764ba2/ffffff?text=TV",
  },
  {
    id: "P003",
    name: "Lê Thị Mai",
    age: 28,
    treatment: "IVF",
    treatmentDetail: "Chuyển phôi",
    status: "success",
    date: "12/06/2025",
    avatar: "https://via.placeholder.com/40x40/10b981/ffffff?text=LT",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "treatment":
      return (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Đang điều trị
        </span>
      );
    case "waiting":
      return (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Chờ kết quả
        </span>
      );
    case "success":
      return (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          Thành công
        </span>
      );
    default:
      return (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          Không xác định
        </span>
      );
  }
};

const RecentPatients: React.FC<RecentPatientsProps> = ({
  patients = mockRecentPatients,
  onView,
  onEdit,
  onViewAll,
}) => {
  const handleView = (patient: RecentPatient) => {
    if (onView) {
      onView(patient);
    } else {
      console.log("View patient:", patient);
    }
  };

  const handleEdit = (patient: RecentPatient) => {
    if (onEdit) {
      onEdit(patient);
    } else {
      console.log("Edit patient:", patient);
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      console.log("View all patients");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Bệnh nhân gần đây
          </h3>
          <button
            onClick={handleViewAll}
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            Xem tất cả
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bệnh nhân
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điều trị
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={patient.avatar}
                      alt={patient.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.age} tuổi
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {patient.treatment}
                  </div>
                  <div className="text-sm text-gray-500">
                    {patient.treatmentDetail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(patient.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleView(patient)}
                    className="text-purple-600 hover:text-purple-900 mr-3 transition-colors"
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => handleEdit(patient)}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
