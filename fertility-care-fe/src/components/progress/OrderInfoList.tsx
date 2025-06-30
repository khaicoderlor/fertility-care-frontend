import type { OrderInfo } from "../../models/OrderInfo";
import { ORDER_CANCELLED, ORDER_COMPLETED, ORDER_PROGRESS, ORDER_CLOSED } from '../../constants/OrderStatus';
import { Link } from "react-router-dom";

export default function OrderInfoList({ ordersInfo }: { ordersInfo: OrderInfo[] }) {
  const getStatusVi = (status: string): string => {
    switch (status) {
      case ORDER_PROGRESS:
        return "Đang thực hiện";
      case ORDER_COMPLETED:
        return "Đã hoàn thành";
      case ORDER_CANCELLED:
        return "Đã hủy";
      case ORDER_CLOSED:
        return "Đã đóng lại";
      default:
        return "Không rõ";
    }
  };

  const getStatusStyle = (status: string): string => {
    switch (status) {
      case ORDER_PROGRESS:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case ORDER_COMPLETED:
        return "bg-green-100 text-green-800 border-green-200";
      case ORDER_CANCELLED:
        return "bg-red-100 text-red-800 border-red-200";
      case ORDER_CLOSED:
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wide">
                Gói điều trị
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wide">
                Bác sĩ
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wide">
                Bệnh nhân
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wide">
                Ngày bắt đầu
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wide">
                Ngày kết thúc
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800 tracking-wide">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800 tracking-wide">
                Lưu trữ phôi lạnh
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800 tracking-wide">
                Tổng số trứng
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800 tracking-wide">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ordersInfo.length > 0 ? (
              ordersInfo.map((order, index) => (
                <tr 
                  key={order.id} 
                  className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-900">
                        #{order.treatmentServiceName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        Dr
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {order.doctorName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                        {order.patientName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {order.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="bg-gray-100 px-3 py-1 rounded-lg text-center font-mono">
                      {order.startDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="bg-gray-100 px-3 py-1 rounded-lg text-center font-mono">
                      {order.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                      {getStatusVi(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      order.isFrozen 
                        ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {order.isFrozen ? "❄️ Có" : "🚫 Không"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center bg-orange-50 border border-orange-200 px-3 py-1 rounded-lg">
                      <span className="text-orange-600 font-bold text-lg mr-1">🥚</span>
                      <span className="text-sm font-semibold text-orange-800">
                        {order.totalEggs}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {/* Replace with actual Link component */}
                    <Link
                      to={`/patient/orders/progress?orderId=${order.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Không có dữ liệu
                      </h3>
                      <p className="text-sm text-gray-500">
                        Hiện tại chưa có đơn điều trị nào được tạo
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}