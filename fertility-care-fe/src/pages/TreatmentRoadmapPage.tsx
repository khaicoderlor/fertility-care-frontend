import React from "react";
import { FaFlask, FaHeart } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import TreatmentTimeline from "../components/TreatmentTimeline";
import { iuiStepsData, ivfStepsData } from "../data/DataTreatmentRoadmap";
import Header from "../components/Header";

const TreatmentRoadmapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <Header/>

      <div className="bg-white shadow-sm border-b mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <MdMedicalServices className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              Lộ Trình Điều Trị
            </h1>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi cung cấp hai phương pháp điều trị hỗ trợ sinh sản hàng
              đầu với quy trình chuyên nghiệp và tỷ lệ thành công cao. Hãy khám
              phá chi tiết từng bước điều trị.
            </p>
          </div>
        </div>
      </div>

      {/* Treatment Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* IVF Treatment - Steps on left, details on right */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                Thụ Tinh Trong Ống Nghiệm (IVF)
              </h2>
              <p className="text-gray-600">
                Phương pháp tiên tiến nhất trong hỗ trợ sinh sản
              </p>
            </div>
            <TreatmentTimeline
              title="Lộ Trình IVF"
              steps={ivfStepsData}
              icon={<FaFlask className="w-6 h-6" />}
              color="blue"
              layout="left"
            />
          </div>

          {/* IUI Treatment - Steps on right, details on left */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-2">
                Thụ Tinh Nhân Tạo (IUI)
              </h2>
              <p className="text-gray-600">
                Phương pháp đơn giản, ít xâm lấn với chi phí hợp lý
              </p>
            </div>
            <TreatmentTimeline
              title="Lộ Trình IUI"
              steps={iuiStepsData}
              icon={<FaHeart className="w-6 h-6" />}
              color="purple"
              layout="right"
            />
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            So Sánh Hai Phương Pháp Điều Trị
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <FaFlask className="w-6 h-6 text-blue-600" />
                <h4 className="text-xl font-bold text-blue-700">
                  IVF - Thụ Tinh Trong Ống Nghiệm
                </h4>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Tỷ lệ thành công cao (40-60%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Phù hợp với nhiều trường hợp vô sinh</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Thời gian điều trị: ~20 ngày</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Chi phí: 28.500.000 VNĐ</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <FaHeart className="w-6 h-6 text-purple-600" />
                <h4 className="text-xl font-bold text-purple-700">
                  IUI - Thụ Tinh Nhân Tạo
                </h4>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Ít xâm lấn, đơn giản hơn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Chi phí thấp hơn đáng kể</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Thời gian điều trị: ~9 ngày</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Chi phí: 6.200.000 VNĐ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Sẵn Sàng Bắt Đầu Hành Trình?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Đội ngũ chuyên gia của chúng tôi sẽ tư vấn và đồng hành cùng bạn
              trong suốt quá trình điều trị
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Đặt Lịch Tư Vấn
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Liên Hệ Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentRoadmapPage;
