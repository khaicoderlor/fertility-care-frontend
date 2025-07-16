import React, { useState } from "react";
import { XCircle } from "lucide-react";

interface PrescriptionItem {
  medicationName: string;
  quantity: number | null;
  specialInstructions?: string;
}

interface PrescriptionFormProps {
  orderId: string;
  onClose: () => void;
  onSave: (data: {
    orderId: string;
    prescriptionItems: PrescriptionItem[];
  }) => void;
}

export default function PrescriptionForm({
  orderId,
  onClose,
  onSave,
}: PrescriptionFormProps) {
  const [items, setItems] = useState<PrescriptionItem[]>([
    { medicationName: "", quantity: null, specialInstructions: "" },
  ]);

  const handleChange = <K extends keyof PrescriptionItem>(
    index: number,
    field: K,
    value: PrescriptionItem[K]
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddRow = () => {
    setItems([
      ...items,
      { medicationName: "", quantity: null, specialInstructions: "" },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const filteredItems = items.filter(
      (item) =>
        item.medicationName.trim() !== "" &&
        item.quantity !== null &&
        item.quantity > 0
    );

    onSave({
      orderId,
      prescriptionItems: filteredItems,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-purple-700">
          📋 Đơn thuốc cho điều trị
        </h2>

        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-3 font-semibold text-gray-600 text-sm border-b pb-2 mb-2">
          <div className="col-span-4">Tên thuốc *</div>
          <div className="col-span-2">Số lượng *</div>
          <div className="col-span-5">Hướng dẫn đặc biệt</div>
          <div className="col-span-1 text-center">Xoá</div>
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3"
          >
            <input
              type="text"
              placeholder="Tên thuốc"
              value={item.medicationName}
              onChange={(e) =>
                handleChange(index, "medicationName", e.target.value)
              }
              className="col-span-4 border rounded-lg px-3 py-2 text-sm"
              required
            />

            <input
              type="number"
              placeholder="Số lượng"
              min={1}
              value={item.quantity ?? ""}
              onChange={(e) =>
                handleChange(index, "quantity", Number(e.target.value))
              }
              className="col-span-2 border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="text"
              placeholder="Hướng dẫn đặc biệt"
              value={item.specialInstructions}
              onChange={(e) =>
                handleChange(index, "specialInstructions", e.target.value)
              }
              className="col-span-5 border rounded-lg px-3 py-2 text-sm"
            />

            <div className="col-span-1 flex justify-center items-center">
              <button
                onClick={() => handleRemoveRow(index)}
                className="text-red-500 hover:text-red-700"
                title="Xoá dòng"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleAddRow}
            className="bg-blue-100 px-4 py-2 rounded text-sm hover:bg-blue-200"
          >
            + Thêm dòng thuốc
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-100 px-4 py-2 rounded text-sm hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-6 py-2 rounded text-sm hover:bg-purple-700"
            >
              💾 Lưu đơn thuốc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
