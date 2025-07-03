import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../apis/AxiosInstance";

export default function PaymentReturnPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchUpdatePayment = async () => {
      const params = Object.fromEntries(searchParams.entries());

      try {
        const response = await axiosInstance.post("/payments/callback", params);
        const orderId =
          response.data.data?.extraData || searchParams.get("extraData");
            console.log(response.data.data)
        if (orderId) {
          window.location.href = `/patient/orders/progress?orderId=${orderId}`;
        } else {
          window.location.href = `/patient`;
        }
      } catch (error) {
        console.log(error);
        window.location.href = `/patient`;
      }
    };
    fetchUpdatePayment();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-xl font-semibold mb-2">
          🔄 Đang xác minh thanh toán...
        </div>
        <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  );
}
