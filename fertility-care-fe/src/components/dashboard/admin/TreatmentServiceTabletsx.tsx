import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaEye,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import axiosInstance from "../../../apis/AxiosInstance";
import type { TreatmentService } from "../../../models/TreatmentService";
import type { TreatmentStep } from "../../../models/TreatmentStep";
import { RiServiceFill } from "react-icons/ri";

const TreatmentServiceTable: React.FC = () => {
  // Initialize with data from TreatmentRoadmap
  const [services, setServices] = useState<TreatmentService[]>([]);
  const [selectedService, setSelectedService] =
    useState<TreatmentService | null>(null);
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [editingService, setEditingService] = useState<boolean>(false);
  const [tempStepData, setTempStepData] = useState<TreatmentStep | null>(null);
  const [tempServiceData, setTempServiceData] = useState<{
    name: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("/treatments");
        setServices(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDuration = (days: number) => {
    return days === 1 ? "1 ngày" : `${days} ngày`;
  };

  const getTotalAmount = (steps: TreatmentStep[]) => {
    return steps.reduce((sum, step) => sum + step.amount, 0);
  };

  const getTotalDuration = (steps: TreatmentStep[]) => {
    return steps.reduce((sum, step) => sum + step.estimatedDurationDays, 0);
  };

  const handleServiceClick = (service: TreatmentService) => {
    setSelectedService(service);
    setEditingStep(null);
    setEditingService(false);
  };

  const handleEditStep = (step: TreatmentStep) => {
    setEditingStep(step.stepOrder);
    setTempStepData({ ...step });
  };

  const handleSaveStep = async () => {
    if (!tempStepData || !selectedService) return;

    try {
      await axiosInstance.put(`/steps/${tempStepData.id}`, {
        stepName: tempStepData.stepName,
        description: tempStepData.description,
        stepOrder: tempStepData.stepOrder,
        estimatedDurationDays: tempStepData.estimatedDurationDays,
        amount: tempStepData.amount
      });

      const updatedServices = services.map((service) => {
        if (service.id === selectedService.id) {
          const updatedSteps = service.treatmentSteps?.map((step) =>
            step.stepOrder === tempStepData.stepOrder ? tempStepData : step
          );
          const updatedService = { ...service, treatmentSteps: updatedSteps };
          setSelectedService(updatedService);
          return updatedService;
        }
        return service;
      });

      setServices(updatedServices);
      setEditingStep(null);
      setTempStepData(null);
    } catch (error) {
      console.error("Error updating step:", error);
    }
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
      description: selectedService.description ?? "",
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

  // const handleAddStep = () => {
  //   if (!selectedService) return;

  //   const newStepOrder = selectedService.treatmentSteps.length + 1;
  //   const newStep: Step = {
  //     stepName: "Bước mới",
  //     description: "Mô tả bước mới",
  //     stepOrder: newStepOrder,
  //     estimatedDurationDays: 1,
  //     amount: 0,
  //   };

  //   const updatedService = {
  //     ...selectedService,
  //     steps: [...selectedService.steps, newStep],
  //   };

  //   const updatedServices = services.map((service) =>
  //     service.id === selectedService.id ? updatedService : service
  //   );

  //   setServices(updatedServices);
  //   setSelectedService(updatedService);
  //   setEditingStep(newStepOrder);
  //   setTempStepData(newStep);
  // };

  // const handleDeleteStep = (stepOrder: number) => {
  //   if (!selectedService) return;

  //   const updatedSteps = selectedService.steps
  //     .filter((step) => step.stepOrder !== stepOrder)
  //     .map((step, index) => ({ ...step, stepOrder: index + 1 }));

  //   const updatedService = { ...selectedService, steps: updatedSteps };
  //   const updatedServices = services.map((service) =>
  //     service.id === selectedService.id ? updatedService : service
  //   );

  //   setServices(updatedServices);
  //   setSelectedService(updatedService);
  // };

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
                  service.name == "IVF"
                    ? "border-blue-200 hover:border-blue-300"
                    : "border-purple-200 hover:border-purple-300"
                }`}
                onClick={() => handleServiceClick(service)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      service.name == "IVF"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    <RiServiceFill className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold ${
                        service.name == "IVF"
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
                      {formatDuration(
                        getTotalDuration(service.treatmentSteps ?? [])
                      )}
                    </span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <FaMoneyBillWave className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Chi phí</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(
                        getTotalAmount(service.treatmentSteps ?? [])
                      )}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-sm text-red-500">
                    {service.treatmentSteps?.length} bước điều trị
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
                selectedService.name == "IVF"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700"
                  : "bg-gradient-to-r from-purple-600 to-purple-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <RiServiceFill className="w-8 h-8" />
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
                    {selectedService.treatmentSteps?.length}
                  </div>
                  <div className="text-sm opacity-80 text-white font-bold">
                    Bước điều trị
                  </div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg font-bold">
                  <div className="text-2xl font-bold text-white">
                    {formatDuration(
                      getTotalDuration(selectedService.treatmentSteps ?? [])
                    )}
                  </div>
                  <div className="text-sm opacity-80 text-white">
                    Tổng thời gian
                  </div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="text-lg font-bold text-white">
                    {formatCurrency(
                      getTotalAmount(selectedService.treatmentSteps ?? [])
                    )}
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
                {/* <button
                  onClick={handleAddStep}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedService.color === "blue"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  <FaPlus className="w-4 h-4" />
                  Thêm bước
                </button> */}
              </div>

              <div className="space-y-4">
                {selectedService.treatmentSteps?.map((step) => (
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
                                selectedService.name == "IVF"
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
                                selectedService.name === "IVF"
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

export default TreatmentServiceTable;
