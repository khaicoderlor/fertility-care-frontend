import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/AxiosInstance";
import type { EggOption, EmbryoInput } from "./OrderStepCard";

interface EmbryoInputFormProps {
  orderId: string;
  onClose: () => void;
  onSave: (data: EmbryoInput[]) => void;
}

const embryoTypes: string[] = ["A", "B", "C", "AA", "AB", "BB", "BC", "CC"];

export default function EmbryoInputForm({ orderId, onClose, onSave }: EmbryoInputFormProps) {
  const [availableEggs, setAvailableEggs] = useState<EggOption[]>([]);
  const [embryos, setEmbryos] = useState<EmbryoInput[]>([]);

  useEffect(() => {
    const fetchEggs = async (oId: string) => {
      try {
        const response = await axiosInstance.get(`/eggs/usable/${oId}`);
        setAvailableEggs(response.data.data); 
      } catch (error) {
        console.error("Lỗi fetch eggs:", error);
      }
    };
    fetchEggs(orderId);
  }, [orderId]);

  const handleChange = <K extends keyof EmbryoInput>(index: number, field: K, value: EmbryoInput[K]) => {
    const updated = [...embryos];
    updated[index][field] = value;
    setEmbryos(updated);
  };

  const handleAddRow = () => {
    setEmbryos([...embryos, { eggId: "", embryoGrade: "", isQualified: false }]);
  };

  const handleSubmit = () => {
    onSave(embryos);
    onClose();
  };

  const getAvailableEggs = (currentIndex: number): EggOption[] => {
    const selectedIds = embryos.map((e, i) => i !== currentIndex ? e.eggId : "").filter(Boolean);
    return availableEggs.filter((egg) => !selectedIds.includes(egg.id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-xl rounded bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Lưu thông tin phôi tạo thành</h2>

        {embryos.map((embryo, index) => (
          <div key={index} className="mb-4 flex items-center space-x-3">
            <select
              className="flex-1 border p-2 rounded"
              value={embryo.embryoGrade}
              onChange={(e) => handleChange(index, "embryoGrade", e.target.value)}
            >
              <option value="">Chọn loại phôi</option>
              {embryoTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              className="flex-1 border p-2 rounded"
              value={embryo.eggId}
              onChange={(e) => handleChange(index, "eggId", e.target.value)}
            >
              <option value="">Chọn trứng</option>
              {getAvailableEggs(index).map((egg) => (
                <option key={egg.id} value={egg.id}>{egg.grade}</option>
              ))}
            </select>

            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={embryo.isQualified}
                onChange={(e) => handleChange(index, "isQualified", e.target.checked)}
              />
              <span>Đạt</span>
            </label>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddRow}
            className="bg-blue-100 px-4 py-2 rounded text-sm hover:bg-blue-200"
          >
            + Thêm dòng
          </button>
          <div className="space-x-2">
            <button onClick={onClose} className="bg-gray-100 px-4 py-2 rounded text-sm hover:bg-gray-200">
              Hủy
            </button>
            <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
