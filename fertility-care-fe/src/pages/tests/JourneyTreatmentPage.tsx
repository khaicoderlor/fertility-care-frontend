import { useEffect, useState } from "react";
import type { TreatmentService } from "../../models/TreatmentService";
import axiosInstance from "../../apis/AxiosInstance";
import { formatCurrency } from "../../functions/CommonFunction";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { TbClockHour4 } from "react-icons/tb";
import Footer from "../../components/Footer";
import Header from "./Header";

export default function JourneyTreatmentPage() {
  const [treatmentServices, setTreatmentServices] = useState<TreatmentService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("/treatments");
        setTreatmentServices(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Tiêu đề chính */}
      <div className="text-center mt-10 mb-6 px-4">
        <h1 className="text-3xl font-bold text-pink-600">Hành Trình Điều Trị Vô Sinh Hiếm Muộn</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Tại đây bạn có thể khám phá chi tiết các phác đồ điều trị như IVF, IUI được xây dựng bởi đội ngũ chuyên môn của chúng tôi nhằm cá nhân hóa hành trình làm cha mẹ của bạn.
        </p>
      </div>

      {/* Danh sách phác đồ */}
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        {treatmentServices.map((service) => (
          <div key={service.id} className="bg-gray-50 rounded-xl shadow-md p-6 space-y-4">
            {/* Thông tin phác đồ */}
            <div>
              <p className="text-2xl font-semibold text-blue-700">Phác đồ {service.name}</p>
              <p className="text-gray-700 text-sm mt-1">{service.description}</p>
              <p className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <FaMoneyCheckAlt className="text-green-500" />
                <span>Chi phí ước tính: {formatCurrency(service.estimatePrice ?? 0)}</span>
              </p>
            </div>

            {/* Các bước điều trị */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.treatmentSteps?.map((step) => (
                <div
                  key={step.id}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {step.stepOrder}
                    </div>
                    <p className="font-medium text-lg text-gray-800">{step.stepName}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-2">
                      <TbClockHour4 className="text-blue-500" />
                      {step.estimatedDurationDays} ngày thực hiện
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMoneyCheckAlt className="text-green-500" />
                      Chi phí: {formatCurrency(step.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="my-16" />
      <Footer />
    </div>
  );
}
