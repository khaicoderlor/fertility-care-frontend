import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../apis/AxiosInstance";
import {
  PAYMENT_CANCELLED,
  PAYMENT_COMPLETED,
} from "../../constants/PaymentStatus";

interface OrderStepPayment {
  treatmentName: string;
  doctorName: string;
  orderStepName: string;
  stepOrder: number;
  paymentCode?: string;
  totalAmount: number;
  paymentMethod: string;
  paymentDate: string;
  status: string;
  gatewayMessage?: string;
}

export default function PaymentHistoriesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [orderStepPayments, setOrderStepPayments] = useState<
    OrderStepPayment[]
  >([]);

  const { patientId } = useAuth();

  useEffect(() => {
    const s = async () => {
      try {
        const data = await axiosInstance.get(
          `/patients/${patientId}/payment-histories`
        );
        setOrderStepPayments(data.data.data);
        console.log(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    s();
  }, [patientId]);

  const totalPages = Math.ceil(orderStepPayments.length / itemsPerPage);
  const paginatedPayments = orderStepPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 rounded-2xl shadow-lg border border-gray-200 bg-white overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Lịch sử thanh toán
      </h2>
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-600">
              Gói điều trị
            </th>
            <th className="px-4 py-3 font-medium text-gray-600">Bác sĩ</th>
            <th className="px-4 py-3 font-medium text-gray-600">Bước</th>
            <th className="px-4 py-3 font-medium text-gray-600">Thứ tự</th>
            <th className="px-4 py-3 font-medium text-gray-600">
              Mã thanh toán
            </th>
            <th className="px-4 py-3 font-medium text-gray-600">
              Số tiền (VND)
            </th>
            <th className="px-4 py-3 font-medium text-gray-600">Phương thức</th>
            <th className="px-4 py-3 font-medium text-gray-600">
              Ngày thanh toán
            </th>
            <th className="px-4 py-3 font-medium text-gray-600">Trạng thái</th>
            <th className="px-4 py-3 font-medium text-gray-600">Ghi chú</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {paginatedPayments.length > 0 ? (
            paginatedPayments.map((payment, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{payment.treatmentName}</td>
                <td className="px-4 py-3">{payment.doctorName}</td>
                <td className="px-4 py-3">{payment.orderStepName}</td>
                <td className="px-4 py-3">{payment.stepOrder}</td>
                <td className="px-4 py-3">{payment.paymentCode || "-"}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  {payment.totalAmount.toLocaleString("vi-VN")} ₫
                </td>
                <td className="px-4 py-3">{payment.paymentMethod}</td>
                <td className="px-4 py-3">{payment.paymentDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === PAYMENT_COMPLETED
                        ? "bg-green-100 text-green-700"
                        : payment.status === PAYMENT_CANCELLED
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3">{payment.gatewayMessage || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-6 text-center text-gray-500 italic"
              >
                Không có bản ghi thanh toán nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Trang trước
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}
