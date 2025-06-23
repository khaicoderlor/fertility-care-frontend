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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Gói điều trị</th>
            <th className="px-4 py-2 border">Bác sĩ</th>
            <th className="px-4 py-2 border">Bệnh nhân</th>
            <th className="px-4 py-2 border">Ngày bắt đầu</th>
            <th className="px-4 py-2 border">Ngày kết thúc</th>
            <th className="px-4 py-2 border">Trạng thái</th>
            <th className="px-4 py-2 border">Lưu trữ phôi lạnh</th>
            <th className="px-4 py-2 border">Tổng số trứng</th>
            <th className="px-4 py-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {ordersInfo.length > 0 ? (
            ordersInfo.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2 border">#{order.treatmentServiceName}</td>
                <td className="px-4 py-2 border">Dr. {order.doctorName}</td>
                <td className="px-4 py-2 border">{order.patientName}</td>
                <td className="px-4 py-2 border">{order.startDate}</td>
                <td className="px-4 py-2 border">{order.endDate}</td>
                <td className="px-4 py-2 border">{getStatusVi(order.status)}</td>
                <td className="px-4 py-2 border">{order.isFrozen ? "Có" : "Không"}</td>
                <td className="px-4 py-2 border">{order.totalEggs} trứng</td>
                <td className="px-4 py-2 border text-blue-600 underline">
                  <Link to={`/progress?orderId=${order.id}`}>Chi tiết</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center py-4 text-gray-500">
                Không có dữ liệu đơn điều trị
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
