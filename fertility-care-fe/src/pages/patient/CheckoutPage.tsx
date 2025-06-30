import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type OrderStep from "../../models/OrderStep";
import type { Order } from "../../models/Order";
import { formatCurrency, getTotalExtraFeeOfStep } from "../../functions/CommonFunction";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../apis/AxiosInstance";
import MoMoLogo from "../../assets/image/MoMo_Logo.png";

export default function CheckoutPage() {
  const { patientId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { step, order } = location.state as { step: OrderStep; order: Order };

  const [paymentMethod, setPaymentMethod] = useState<"momo" | "card">("momo");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!step || !order) {
    navigate("/patient/progress", { replace: true });
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);

    const payload = {
      patientId,
      orderStepId: step.id,
      totalAmount: step.totalAmount,
      paymentMethod: "Momo",
      treatmentName: order.treatmentService?.name,
      orderInfo: `Thanh_toan_cho_dich_vu_${order.treatmentService?.name}`,
    };

    try {
      const res = await axiosInstance.post("/payments", payload);
      const { data, statusCode, message } = res.data;

      if (statusCode === 200 && data) {
        window.location.href = data; 
      } else {
        alert("Không thể tạo thanh toán: " + message);
      }
    } catch (err) {
      console.error(err);
      alert("Đã có lỗi xảy ra!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <p className="text-gray-600 mt-2">
            Hoàn tất thanh toán cho lịch hẹn điều trị của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Tóm tắt đơn hàng
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {step.treatmentStep.stepName}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4"></div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gía cơ bản</span>
                    <span>{formatCurrency(step.treatmentStep.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chi phí phát sinh</span>
                    <span>
                      {formatCurrency(
                        getTotalExtraFeeOfStep(step.appointments ?? [])
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4"></div>

                <div className="flex justify-between font-medium text-lg">
                  <span>Tổng cộng</span>
                  <span className="text-pink-600">
                    {formatCurrency(step.totalAmount ?? 0)}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg mt-4">
                  <p className="text-xs text-gray-600 text-center">
                    🔒 Thông tin thanh toán được bảo mật và mã hóa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Dịch vụ điều trị
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {step.treatmentStep.stepName}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {step.treatmentStep.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>
                            ⏱️ {step.startDate} - {step.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(step.totalAmount ?? 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Phương thức thanh toán
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Chọn phương thức thanh toán phù hợp
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    {/* MoMo Option */}
                    <div className="flex items-center space-x-3 p-4 border-2 border-pink-200 rounded-lg bg-pink-50">
                      <input
                        type="radio"
                        id="momo"
                        name="payment"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={() => setPaymentMethod("momo")}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                      />
                      <label
                        htmlFor="momo"
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                          <img src={MoMoLogo} alt="MoMo" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                          <p className="font-medium">MoMo (Ví điện tử)</p>
                          <p className="text-sm text-gray-500">
                            Thanh toán qua ví MoMo
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Card Option (disabled) */}
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg opacity-50">
                      <input
                        type="radio"
                        id="card"
                        name="payment"
                        value="card"
                        disabled
                        className="h-4 w-4 text-gray-400 border-gray-300"
                      />
                      <label
                        htmlFor="card"
                        className="flex items-center gap-3 cursor-not-allowed flex-1"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
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
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-400">
                            Thẻ tín dụng/ghi nợ
                          </p>
                          <p className="text-sm text-gray-400">Sắp ra mắt</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* MoMo Info */}
                  {paymentMethod === "momo" && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="bg-pink-50 p-4 rounded-lg mb-6">
                        <h4 className="font-medium text-pink-900 mb-2">
                          Thanh toán MoMo an toàn
                        </h4>
                        <p className="text-sm text-pink-700">
                          Bạn sẽ được chuyển sang ứng dụng MoMo hoặc quét mã QR để hoàn tất.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full h-12 text-lg font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                      isProcessing
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang xử lý...
                      </div>
                    ) : (
                      `Thanh toán`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
