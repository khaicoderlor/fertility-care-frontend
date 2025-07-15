import { useState } from "react"
import type OrderStepPayment from "../../../models/OrderStepPayment"
import { FaFilter } from "react-icons/fa"
import { convertName, convertFullName, formatCurrency } from '../../../functions/CommonFunction';
import { PAYMENT_COMPLETED, PAYMENT_PENDING } from "../../../constants/PaymentStatus";
import { TbListDetails } from "react-icons/tb";
import type { Appointment } from "../../../models/Appointment";

interface PaymentTableProps {
    payments: OrderStepPayment[]
}

export const PaymentTable = ({ payments }: PaymentTableProps) => {
  const [selectedPayment, setSelectedPayment] = useState<OrderStepPayment>();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = payments.filter((p) =>
    p.patient.profile?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    p.treatmentServiceName.toLowerCase().includes(search.toLowerCase()) ||
    p.patient.profile?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    p.paymentCode.toLowerCase().includes(search.toLowerCase())
  );

  const sumExtraFeeByOrderStep = (appointments: Appointment[]) => {
    return appointments.map(x => x.extraFee ?? 0).reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-bold text-gray-800">💳 Danh sách thanh toán</h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm tên bệnh nhân / mã thanh toán..."
            className="border rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowFilter((s) => !s)}
            className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-100"
          >
            <FaFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Lọc</span>
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="border p-4 mb-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Bộ lọc nâng cao (demo) — Thêm checkbox, dropdown...</p>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {[
                "ID",
                "Bệnh nhân",
                "Gói điều trị",
                "Bước",
                "Tổng tiền",
                "Phương thức",
                "Ngày thanh toán",
                "Trạng thái",
                "Thao tác",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((pay) => (
              <tr key={pay.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{pay.id}</td>
                <td className="px-4 py-3">{convertName(pay.patient.profile??{})}</td>
                <td className="px-4 py-3">{pay.treatmentServiceName}</td>
                <td className="px-4 py-3">{pay.orderStep.treatmentStep.stepName}</td>
                <td className="px-4 py-3">{pay.totalAmount.toLocaleString()}₫</td>
                <td className="px-4 py-3">{pay.paymentMethod}</td>
                <td className="px-4 py-3">{pay.paymentDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      pay.paymentStatus === PAYMENT_COMPLETED
                        ? "bg-green-100 text-green-700"
                        : pay.paymentStatus === PAYMENT_PENDING
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {pay.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedPayment(pay)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Chi tiết"
                  >
                    <TbListDetails className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL CARD */}
      {selectedPayment && (
        <div className="mt-8 bg-gray-50 border rounded p-6">
          <h4 className="text-lg font-semibold mb-4">📄 Chi tiết thanh toán</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><strong>ID:</strong> {selectedPayment.id}</div>
            <div><strong>Bệnh nhân:</strong> {convertFullName(selectedPayment.patient.profile??{})}</div>
            <div><strong>Gói điều trị:</strong> {selectedPayment.treatmentServiceName}</div>
            <div><strong>Bước:</strong> {selectedPayment.orderStep.treatmentStep.stepOrder} - {selectedPayment.orderStep.treatmentStep.stepName}</div>
            <div><strong>Mã thanh toán:</strong> {selectedPayment.paymentCode}</div>
            <div><strong>Mã giao dịch:</strong> {selectedPayment.transactionCode}</div>
            <div><strong>Tổng tiền:</strong> {formatCurrency(selectedPayment.totalAmount)}</div>
            <div><strong>Giá cơ bản:</strong> {formatCurrency(selectedPayment.orderStep.treatmentStep.amount)}</div>
            <div><strong>Chi phí thêm:</strong> {formatCurrency(sumExtraFeeByOrderStep(selectedPayment.orderStep.appointments??[]))}</div>
            <div><strong>Phương thức:</strong> {selectedPayment.paymentMethod}</div>
            <div><strong>Ngày thanh toán:</strong> {selectedPayment.paymentDate}</div>
            <div><strong>Trạng thái:</strong> {selectedPayment.paymentStatus}</div>
            <div><strong>Gateway Code:</strong> {selectedPayment.gatewayResponseCode}</div>
            <div><strong>Gateway Message:</strong> {selectedPayment.gatewayMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};
