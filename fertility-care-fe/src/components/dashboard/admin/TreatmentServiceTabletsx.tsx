import React, { useState } from "react";
import {
  FaFlask,
  FaHeart,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
  FaEye,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";

interface Step {
  stepName: string;
  description: string;
  stepOrder: number;
  estimatedDurationDays: number;
  amount: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "purple" | "white";
  steps: Step[];
}

const TreatmentServiceTabletsx: React.FC = () => {
  // Initialize with data from TreatmentRoadmap
  const [services, setServices] = useState<Service[]>([
    {
      id: "ivf",
      name: "Thụ Tinh Trong Ống Nghiệm (IVF)",
      description: "Phương pháp tiên tiến nhất trong hỗ trợ sinh sản",
      icon: <FaFlask className="w-6 h-6 text-white" />,
      color: "blue",
      steps: [
        {
          stepName: "Khám ban đầu & xét nghiệm",
          description:
            "Ở bước đầu tiên, hai vợ chồng sẽ đến khám tại cơ sở hỗ trợ sinh sản để được bác sĩ chuyên khoa khai thác tiền sử bệnh lý, thời gian mong con, các vấn đề về kinh nguyệt, tiền sử điều trị trước đó (nếu có) và tư vấn tổng quan về các phương pháp điều trị phù hợp.",
          stepOrder: 1,
          estimatedDurationDays: 1,
          amount: 1000000,
        },
        {
          stepName: "Kích thích buồng trứng",
          description:
            "Người vợ sẽ dùng thuốc kích trứng liên tục trong nhiều ngày. Bác sĩ sẽ theo dõi bằng siêu âm và xét nghiệm máu để điều chỉnh liều thuốc và xác định thời điểm chọc hút trứng.",
          stepOrder: 2,
          estimatedDurationDays: 10,
          amount: 8000000,
        },
        {
          stepName: "Chọc hút trứng & lấy tinh trùng",
          description:
            "Khi nang trứng đạt kích thước phù hợp, bác sĩ sẽ chọc hút trứng qua đường âm đạo dưới gây mê nhẹ. Đồng thời, người chồng sẽ lấy tinh trùng để chuẩn bị thụ tinh.",
          stepOrder: 3,
          estimatedDurationDays: 1,
          amount: 5000000,
        },
        {
          stepName: "Thụ tinh & nuôi cấy phôi",
          description:
            "Trứng sau khi lấy ra sẽ được kết hợp với tinh trùng trong phòng lab để thụ tinh. Phôi tạo thành được nuôi cấy từ 3–5 ngày để chọn ra phôi tốt nhất.",
          stepOrder: 4,
          estimatedDurationDays: 5,
          amount: 7000000,
        },
        {
          stepName: "Chuyển phôi",
          description:
            "Bác sĩ sẽ chuyển 1–2 phôi tốt nhất vào tử cung bằng catheter mềm, không gây đau. Các phôi dư được trữ lạnh cho lần sau nếu cần.",
          stepOrder: 5,
          estimatedDurationDays: 1,
          amount: 6000000,
        },
        {
          stepName: "Theo dõi kết quả",
          description:
            "Sau 12–14 ngày, người vợ sẽ xét nghiệm beta-hCG để kiểm tra có thai hay không. Nếu dương tính sẽ tiếp tục theo dõi thai kỳ; nếu không sẽ tư vấn hướng tiếp theo.",
          stepOrder: 6,
          estimatedDurationDays: 2,
          amount: 1500000,
        },
      ],
    },
    {
      id: "iui",
      name: "Thụ Tinh Nhân Tạo (IUI)",
      description: "Phương pháp đơn giản, ít xâm lấn với chi phí hợp lý",
      icon: <FaHeart className="w-6 h-6 text-red-500" />,
      color: "white",
      steps: [
        {
          stepName: "Khám ban đầu & xét nghiệm",
          description:
            "Bác sĩ thăm khám tổng quát, khai thác tiền sử sinh sản, chỉ định làm các xét nghiệm nội tiết, siêu âm và kiểm tra chất lượng tinh trùng.",
          stepOrder: 1,
          estimatedDurationDays: 1,
          amount: 700000,
        },
        {
          stepName: "Kích thích buồng trứng",
          description:
            "Người vợ được tiêm thuốc kích trứng nhẹ để tạo ra 1–2 nang trứng trưởng thành, được theo dõi bằng siêu âm định kỳ.",
          stepOrder: 2,
          estimatedDurationDays: 5,
          amount: 2000000,
        },
        {
          stepName: "Chuẩn bị tinh trùng & Bơm tinh trùng vào tử cung",
          description:
            "Tinh trùng được lọc rửa và cô đặc để chọn tinh trùng khỏe mạnh. Sau đó được bơm trực tiếp vào buồng tử cung vào đúng thời điểm rụng trứng.",
          stepOrder: 3,
          estimatedDurationDays: 1,
          amount: 2500000,
        },
        {
          stepName: "Theo dõi kết quả",
          description:
            "Khoảng 14 ngày sau bơm, người vợ sẽ được xét nghiệm beta-hCG để xác định có thai hay không và theo dõi các dấu hiệu sớm của thai kỳ.",
          stepOrder: 4,
          estimatedDurationDays: 2,
          amount: 1000000,
        },
      ],
    },
  ]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [editingService, setEditingService] = useState<boolean>(false);
  const [tempStepData, setTempStepData] = useState<Step | null>(null);
  const [tempServiceData, setTempServiceData] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDuration = (days: number) => {
    return days === 1 ? "1 ngày" : `${days} ngày`;
  };

  const getTotalAmount = (steps: Step[]) => {
    return steps.reduce((sum, step) => sum + step.amount, 0);
  };

  const getTotalDuration = (steps: Step[]) => {
    return steps.reduce((sum, step) => sum + step.estimatedDurationDays, 0);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setEditingStep(null);
    setEditingService(false);
  };

  const handleEditStep = (step: Step) => {
    setEditingStep(step.stepOrder);
    setTempStepData({ ...step });
  };

  const handleSaveStep = () => {
    if (!tempStepData || !selectedService) return;

    const updatedServices = services.map((service) => {
      if (service.id === selectedService.id) {
        const updatedSteps = service.steps.map((step) =>
          step.stepOrder === tempStepData.stepOrder ? tempStepData : step
        );
        const updatedService = { ...service, steps: updatedSteps };
        setSelectedService(updatedService);
        return updatedService;
      }
      return service;
    });

    setServices(updatedServices);
    setEditingStep(null);
    setTempStepData(null);
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    setEditingService(false);
    setTempStepData(null);
    setTempServiceData(null);
  };

  const handleEditService = () => {
    if (!selectedService) return;
    setEditingService(true);
    setTempServiceData({
      name: selectedService.name,
      description: selectedService.description,
    });
  };

  const handleSaveService = () => {
    if (!tempServiceData || !selectedService) return;

    const updatedServices = services.map((service) => {
      if (service.id === selectedService.id) {
        const updatedService = {
          ...service,
          name: tempServiceData.name,
          description: tempServiceData.description,
        };
        setSelectedService(updatedService);
        return updatedService;
      }
      return service;
    });

    setServices(updatedServices);
    setEditingService(false);
    setTempServiceData(null);
  };

  const handleAddStep = () => {
    if (!selectedService) return;

    const newStepOrder = selectedService.steps.length + 1;
    const newStep: Step = {
      stepName: "Bước mới",
      description: "Mô tả bước mới",
      stepOrder: newStepOrder,
      estimatedDurationDays: 1,
      amount: 0,
    };

    const updatedService = {
      ...selectedService,
      steps: [...selectedService.steps, newStep],
    };

    const updatedServices = services.map((service) =>
      service.id === selectedService.id ? updatedService : service
    );

    setServices(updatedServices);
    setSelectedService(updatedService);
    setEditingStep(newStepOrder);
    setTempStepData(newStep);
  };

  const handleDeleteStep = (stepOrder: number) => {
    if (!selectedService) return;

    const updatedSteps = selectedService.steps
      .filter((step) => step.stepOrder !== stepOrder)
      .map((step, index) => ({ ...step, stepOrder: index + 1 }));

    const updatedService = { ...selectedService, steps: updatedSteps };
    const updatedServices = services.map((service) =>
      service.id === selectedService.id ? updatedService : service
    );

    setServices(updatedServices);
    setSelectedService(updatedService);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setEditingStep(null);
    setEditingService(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <MdMedicalServices className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Quản Lý Dịch Vụ
                </h1>
                <p className="text-gray-600">
                  Xem và chỉnh sửa thông tin các dịch vụ điều trị
                </p>
              </div>
            </div>
            {selectedService && (
              <button
                onClick={handleBackToServices}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaEye className="w-4 h-4" />
                Xem tất cả dịch vụ
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedService ? (
          // Services List View
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 cursor-pointer transition-all hover:shadow-xl ${
                  service.color === "blue"
                    ? "border-blue-200 hover:border-blue-300"
                    : "border-purple-200 hover:border-purple-300"
                }`}
                onClick={() => handleServiceClick(service)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      service.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold ${
                        service.color === "blue"
                          ? "text-blue-700"
                          : "text-purple-700"
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <FaClock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Thời gian</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatDuration(getTotalDuration(service.steps))}
                    </span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <FaMoneyBillWave className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Chi phí</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(getTotalAmount(service.steps))}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-sm text-red-500">
                    {service.steps.length} bước điều trị
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Service Detail View
          <div className="bg-white rounded-2xl shadow-lg">
            {/* Service Header */}
            <div
              className={`p-6 rounded-t-2xl ${
                selectedService.color === "blue"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700"
                  : "bg-gradient-to-r from-purple-600 to-purple-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    {selectedService.icon}
                  </div>
                  <div className="text-white">
                    {editingService ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={tempServiceData?.name || ""}
                          onChange={(e) =>
                            setTempServiceData((prev) =>
                              prev ? { ...prev, name: e.target.value } : null
                            )
                          }
                          className="text-2xl font-bold bg-white/20 border border-white/30 rounded px-3 py-1 text-white placeholder-white/70"
                        />
                        <input
                          type="text"
                          value={tempServiceData?.description || ""}
                          onChange={(e) =>
                            setTempServiceData((prev) =>
                              prev
                                ? { ...prev, description: e.target.value }
                                : null
                            )
                          }
                          className="text-lg bg-white/20 border border-white/30 rounded px-3 py-1 text-white placeholder-white/70 w-full"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">
                          {selectedService.name}
                        </h2>
                        <p className="text-lg opacity-90">
                          {selectedService.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {editingService ? (
                    <>
                      <button
                        onClick={handleSaveService}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <FaSave className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <FaTimes className="w-5 h-5 text-white" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditService}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <FaEdit className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Service Summary */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-white/10 rounded-lg ">
                  <div className="text-2xl font-bold text-white">
                    {selectedService.steps.length}
                  </div>
                  <div className="text-sm opacity-80 text-white font-bold">
                    Bước điều trị
                  </div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg font-bold">
                  <div className="text-2xl font-bold text-white">
                    {formatDuration(getTotalDuration(selectedService.steps))}
                  </div>
                  <div className="text-sm opacity-80 text-white">
                    Tổng thời gian
                  </div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(getTotalAmount(selectedService.steps))}
                  </div>
                  <div className="text-sm font-bold opacity-80 text-white">
                    Tổng chi phí
                  </div>
                </div>
              </div>
            </div>

            {/* Steps List */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Chi Tiết Các Bước Điều Trị
                </h3>
                <button
                  onClick={handleAddStep}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedService.color === "blue"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm bước
                </button>
              </div>

              <div className="space-y-4">
                {selectedService.steps.map((step) => (
                  <div
                    key={step.stepOrder}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    {editingStep === step.stepOrder ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                selectedService.color === "blue"
                                  ? "bg-blue-600"
                                  : "bg-purple-600"
                              }`}
                            >
                              {step.stepOrder}
                            </div>
                            <input
                              type="text"
                              value={tempStepData?.stepName || ""}
                              onChange={(e) =>
                                setTempStepData((prev) =>
                                  prev
                                    ? { ...prev, stepName: e.target.value }
                                    : null
                                )
                              }
                              className="text-lg font-semibold border border-gray-300 rounded px-3 py-2 flex-1"
                              placeholder="Tên bước"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleSaveStep}
                              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                              <FaSave className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStep(step.stepOrder)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <textarea
                          value={tempStepData?.description || ""}
                          onChange={(e) =>
                            setTempStepData((prev) =>
                              prev
                                ? { ...prev, description: e.target.value }
                                : null
                            )
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none"
                          placeholder="Mô tả chi tiết"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Thời gian (ngày)
                            </label>
                            <input
                              type="number"
                              value={tempStepData?.estimatedDurationDays || 0}
                              onChange={(e) =>
                                setTempStepData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        estimatedDurationDays: parseInt(
                                          e.target.value
                                        ),
                                      }
                                    : null
                                )
                              }
                              className="w-full border border-gray-300 rounded px-3 py-2"
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Chi phí (VNĐ)
                            </label>
                            <input
                              type="number"
                              value={tempStepData?.amount || 0}
                              onChange={(e) =>
                                setTempStepData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        amount: parseInt(e.target.value),
                                      }
                                    : null
                                )
                              }
                              className="w-full border border-gray-300 rounded px-3 py-2"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                selectedService.color === "blue"
                                  ? "bg-blue-600"
                                  : "bg-purple-600"
                              }`}
                            >
                              {step.stepOrder}
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {step.stepName}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditStep(step)}
                              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStep(step.stepOrder)}
                              className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <FaClock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">
                              Thời gian:{" "}
                              {formatDuration(step.estimatedDurationDays)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaMoneyBillWave className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">
                              Chi phí: {formatCurrency(step.amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentServiceTabletsx;
