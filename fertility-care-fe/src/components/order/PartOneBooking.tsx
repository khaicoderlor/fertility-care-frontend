"use client";

import { FaCheck } from "react-icons/fa";
import { CheckIcon } from "@heroicons/react/24/outline";
import { IUI_ID, IVF_ID } from "../../constants/ApplicationConstant";

interface PartProps {
  selectedTreatment: string;
  onTreatmentSelect: (treatment: string) => void;
}

export default function PartOneBooking({
  selectedTreatment,
  onTreatmentSelect,
}: PartProps) {
  return (
    <div id="treatment-type" className="scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Chọn phương pháp điều trị của bạn
          </h2>
          <p className="text-lg text-gray-600">
            Chọn phương pháp điều trị vô sinh phù hợp nhất với nhu cầu của bạn.
            Các chuyên gia của chúng tôi sẽ hướng dẫn bạn trong suốt quá trình.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className={`bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTreatment === IUI_ID ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onTreatmentSelect(IUI_ID)} // IUI
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Gói điều trị IUI
              </h3>
              <p className="text-gray-600 mb-4">
                Thụ tinh nhân tạo trong tử cung (IUI) là một phương pháp điều
                trị hiếm muộn ít xâm lấn hơn, trong đó tinh trùng được đưa trực
                tiếp vào tử cung trong quá trình rụng trứng.
              </p>
            </div>
            <div className="px-6 pb-6">
              <ul className="space-y-2">
                <li className="flex items-center text-green-600">
                  <FaCheck className="w-4 h-4 mr-2" />
                  Thủ tục đơn giản
                </li>
                <li className="flex items-center text-green-600">
                  <FaCheck className="w-4 h-4 mr-2" />
                   Giảm thiểu tối chi phí
                </li>
                <li className="flex items-center text-green-600">
                  <FaCheck className="w-4 h-4 mr-2" />
                  Thời gian điều trị ngắn
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`bg-white rounded-lg shadow-md border cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTreatment === IVF_ID ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => onTreatmentSelect(IVF_ID)} // IVF
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Gói điêu trị IVF
              </h3>
              <p className="text-gray-600 mb-4">
                Thụ tinh trong ống nghiệm (IVF) là một phương pháp điều trị vô sinh toàn diện, trong đó trứng được thụ tinh bên ngoài cơ thể và sau đó được chuyển vào tử cung.
              </p>
            </div>
            <div className="px-6 pb-6">
              <ul className="space-y-2">
                <li className="flex items-center text-green-600">
                  <FaCheck className="w-4 h-4 mr-2" />
                  Tỉ lệ thành công cao
                </li>
                <li className="flex items-center text-green-600">
                  <FaCheck className="w-4 h-4 mr-2" />Genetic testing available
                  
                </li>
                <li className="flex items-center text-green-600">
                  <FaCheck className="w-4 h-4 mr-2" />
                  Đa dạng sự lựa chọn
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
