import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/AxiosInstance";
import type { EmbryoData } from "../../../models/EmbryoData";

interface TransferEmbryoFormProps {
  orderId: string;
  appointmentId: string | null;
  onClose: () => void;
}

export default function TransferEmbryoForm({
  orderId,
  appointmentId,
  onClose,
}: TransferEmbryoFormProps) {
  const [embryos, setEmbryos] = useState<EmbryoData[]>([]);
  const [embryoId, setEmbryoId] = useState("");
  const [isFrozenTransfer, setIsFrozenTransfer] = useState(false);
  //   const [transferDate, setTransferDate] = useState("");
  //   const [transferType, setTransferType] = useState("");

  useEffect(() => {
    const fetchEmbryos = async () => {
      try {
        const response = await axiosInstance.get(`/embryos/usable/${orderId}`);
        setEmbryos(response.data.data);
      } catch (error) {
        console.error("Lỗi fetch embryos:", error);
      }
    };
    fetchEmbryos();
  }, [orderId]);

  const handleSubmit = async () => {
    try {
      const payload = {
        orderId,
        appointmentId,
        embryoId,
      };

      await axiosInstance.post(`/transfers?isFrozen=${isFrozenTransfer}`, payload);
      onClose();
    } catch (error) {
      console.error("Lỗi tạo chuyển phôi:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Thêm dữ liệu chuyển phôi</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium">Chọn phôi</label>
          <select
            className="w-full border rounded p-2"
            value={embryoId}
            onChange={(e) => setEmbryoId(e.target.value)}
          >
            <option value="">-- Chọn phôi --</option>
            {embryos.map((e) => (
              <option key={e.id} value={e.id}>
                #{e.id} - {e.embryoGrade} - {e.isFrozen ? "Đông lạnh" : "Tươi"}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Chuyển từ phôi đông lạnh
          </label>
          <input
            type="checkbox"
            checked={isFrozenTransfer}
            onChange={(e) => setIsFrozenTransfer(e.target.checked)}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded"
          />
        </div>

        {/* <div className="mb-3">
          <label className="block text-sm font-medium">Ngày chuyển</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={transferDate}
            onChange={(e) => setTransferDate(e.target.value)}
          />
        </div> */}

        {/* <div className="mb-4">
          <label className="block text-sm font-medium">Loại chuyển</label>
          <select
            className="w-full border rounded p-2"
            value={transferType}
            onChange={(e) => setTransferType(e.target.value)}
          >
            <option value="">-- Chọn loại --</option>
            <option value="Tươi">Tươi</option>
            <option value="Đông lạnh">Đông lạnh</option>
          </select>
        </div> */}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
