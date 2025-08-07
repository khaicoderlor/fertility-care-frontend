import axiosInstance from "../../apis/AxiosInstance";
import Swal from "sweetalert2";
import type { Order } from "../../models/Order";

interface AskAcceptFrozenOrderProps {
  order: Order;
}

export default function AskAcceptFrozenOrder({ order }: AskAcceptFrozenOrderProps) {
  const handleAcceptingFrozen = async (isAccept: boolean) => {
    try {
      await axiosInstance.put(`/transfers/${order.id}?isAccept=${isAccept}`);
      Swal.fire("Cập nhật thành công!", "", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Đã xảy ra lỗi", "Vui lòng thử lại sau.", "error");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Bạn có đồng ý lưu trữ phôi đông lạnh sau khi chuyển phôi lần đầu tiên không?
      </h2>

      <div className="flex gap-4">
        <button
          onClick={() => handleAcceptingFrozen(true)}
          className="px-5 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          Đồng ý
        </button>
        <button
          onClick={() => handleAcceptingFrozen(false)}
          className="px-5 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          Từ chối
        </button>
      </div>
    </div>
  );
}
