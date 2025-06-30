import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../../apis/AxiosInstance";

export default function MomoCallbackPage() {
  // const location = useLocation();
  // const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  // const [message, setMessage] = useState("");
  // const [orderId, setOrderId] = useState<string | null>(null);

  // useEffect(() => {
  //   const callBackend = async () => {
  //     try {
  //       const res = await axiosInstance(`/api/v1/payments/callback${location.search}`);
  //       const result = res.data.data;

  //       if (result.statusCode == 200) {
  //         setStatus("success");
  //         setOrderId(result.orderId ?? null);
  //       } else {
  //         setStatus("error");
  //         setMessage(result.message || "Không xác minh được thanh toán.");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setStatus("error");
  //       setMessage("Lỗi kết nối máy chủ.");
  //     }
  //   };

  //   callBackend();
  // }, [location.search]);

  // 
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">if (status === "loading") {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
  //       Đang xác minh thanh toán...
  //     </div>
  //   );
  // }

  // if (status === "error") {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center text-center text-red-600 text-lg">
  //       ⚠️ {message}
  //     </div>
  //   );
  // }

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">Thanh toán thành công!</h2>
                <p className="text-gray-600 mt-2">
                  Lịch hẹn điều trị của bạn đã được xác nhận và thanh toán.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Bước tiếp theo:</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Bạn sẽ nhận được email xác nhận trong giây lát</li>
                  <li>• SMS nhắc nhở sẽ được gửi trước 24 giờ</li>
                  <li>• Vui lòng đến sớm 15 phút để làm thủ tục</li>
                </ul>
              </div>

              <div className="flex gap-3 justify-center">
                <Link
                  to="/"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Về trang chủ
                </Link>
                {orderId && (
                  <Link
                    to={`/progress?orderId=${orderId}`}
                    className="px-4 py-2 bg-pink-600 text-white rounded-md text-sm font-medium hover:bg-pink-700"
                  >
                    Xem lịch hẹn
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
