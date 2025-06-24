import { useState } from "react";
import type { EggDataInput } from "./OrderStepCard";

interface EggInputFormProps {
  onClose: () => void;
  onSave: (eggs: EggDataInput[]) => void;
}

const eggTypeOptions = ["M2", "M1", "GV"];

export default function EggInputForm({ onClose, onSave }: EggInputFormProps) {
  const [eggs, setEggs] = useState<EggDataInput[]>([
    { grade: "", isQualified: false },
  ]);

  const handleChange = <K extends keyof EggDataInput>(
    index: number,
    field: K,
    value: EggDataInput[K]
  ) => {
    const updated = [...eggs];
    updated[index][field] = value;
    setEggs(updated);
  };

  const handleAddRow = () => {
    setEggs([...eggs, { grade: "", isQualified: false }]);
  };

  const handleSubmit = () => {
    const hasEmptyGrade = eggs.some((e) => !e.grade);
    if (hasEmptyGrade) {
      alert("Vui lòng chọn loại trứng cho tất cả dòng!");
      return;
    }
    onSave(eggs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">Nhập thông tin trứng</h2>
        <div className="space-y-4">
          {eggs.map((egg, index) => (
            <div key={index} className="flex items-center space-x-4">
              <select
                className="flex-1 rounded border border-gray-300 p-2"
                value={egg.grade}
                onChange={(e) => handleChange(index, "grade", e.target.value)}
              >
                <option value="">Chọn loại trứng</option>
                {eggTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={egg.isQualified}
                  onChange={(e) =>
                    handleChange(index, "isQualified", e.target.checked)
                  }
                />
                <span>Đạt tiêu chuẩn</span>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleAddRow}
            className="rounded bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
          >
            + Thêm dòng
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="rounded bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="rounded bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
