import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/AxiosInstance";
import type { TreatmentService } from "../../../models/TreatmentService";
import type { TreatmentStep } from "../../../models/TreatmentStep";
import Swal from "sweetalert2";

export default function TreatmentServiceTable() {
  const [services, setServices] = useState<TreatmentService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingStep, setEditingStep] = useState<{serviceId: string, stepIndex: string} | null>(null);
  const [editFormData, setEditFormData] = useState<TreatmentStep | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/treatments");
        setServices(response.data.data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Không thể tải dữ liệu dịch vụ");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  const handleEditStep = (serviceId: string, stepIndex: string, step: TreatmentStep) => {
    setEditingStep({ serviceId, stepIndex });
    setEditFormData({ ...step });
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    setEditFormData(null);
  };

  const handleSaveStep = async () => {
    if (!editingStep || !editFormData) return;

    try {
      // Update local state
      setServices(prevServices => 
        prevServices.map(service => {
          if (service.id === editingStep.serviceId && service.treatmentSteps) {
            const updatedSteps = [...service.treatmentSteps];
            updatedSteps[Number(editingStep.stepIndex)] = editFormData;
            return {
              ...service,
              treatmentSteps: updatedSteps
            };
          }
          return service;
        })
      );
      const payload = {
        stepName: editFormData.stepName,
        description: editFormData.description,
        stepOrder: editFormData.stepOrder,
        estimatedDurationDays: editFormData.estimatedDurationDays,
        amount: editFormData.amount
      }
      const response = await axiosInstance.put(`/treatments/steps/${editingStep.stepIndex}`, payload)
      if(!response.data.data) {
        Swal.fire({
          title: "Có lỗi xảy ra!",
          text: "Hãy cập nhật lại sau",
          icon: "error"
        })
      }
      setEditingStep(null);
      setEditFormData(null);
    } catch (error) {
      console.error("Error saving step:", error);
      Swal.fire({
          title: "Có lỗi xảy ra!",
          text: "Hãy cập nhật lại sau",
          icon: "error"
        })
    }
  };

  const handleInputChange = (field: keyof TreatmentStep, value: string | number) => {
    if (!editFormData) return;
    
    setEditFormData({
      ...editFormData,
      [field]: value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bảng Dịch Vụ Điều Trị
          </h1>
          <p className="text-gray-600">Quản lý các dịch vụ hỗ trợ sinh sản</p>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          {services &&
            services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md border border-gray-200"
              >
                {/* Service Header */}
                <div className="p-6 border-b border-gray-200 bg-blue-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {service.name}
                      </h2>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
            
                  </div>
                </div>

                {/* Treatment Steps */}
                {service.treatmentSteps &&
                  service.treatmentSteps.length > 0 && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Chi tiết các bước điều trị
                      </h3>
                      <div className="space-y-4">
                        {service.treatmentSteps.map((step, index) => {
                          const isEditing = editingStep?.serviceId === service.id && editingStep?.stepIndex === step.id;
                          
                          return (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400"
                            >
                              {!isEditing ? (
                                // View Mode
                                <>
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {/* Step Info */}
                                    <div className="lg:col-span-2">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded">
                                          Bước {step.stepOrder}
                                        </span>
                                        <h4 className="font-semibold text-gray-800">
                                          {step.stepName}
                                        </h4>
                                      </div>
                                      <p className="text-gray-600 text-sm leading-relaxed">
                                        {step.description}
                                      </p>
                                    </div>

                                    {/* Step Details */}
                                    <div className="space-y-2">
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                          Chi phí:
                                        </span>
                                        <span className="font-bold text-green-600">
                                          {step.amount?.toLocaleString("vi-VN")} VNĐ
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                          Thời gian:
                                        </span>
                                        <span className="font-bold text-blue-600">
                                          {step.estimatedDurationDays} ngày
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Edit Button */}
                                  <div className="flex justify-end mt-4">
                                    <button
                                      onClick={() => handleEditStep(service.id, step.id, step)}
                                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                                    >
                                      ✏️ Chỉnh sửa
                                    </button>
                                  </div>
                                </>
                              ) : (
                                // Edit Mode
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Số thứ tự bước
                                        </label>
                                        <input
                                          type="number"
                                          value={editFormData?.stepOrder || ''}
                                          onChange={(e) => handleInputChange('stepOrder', parseInt(e.target.value))}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                      
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Tên bước
                                        </label>
                                        <input
                                          type="text"
                                          value={editFormData?.stepName || ''}
                                          onChange={(e) => handleInputChange('stepName', e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Mô tả
                                        </label>
                                        <textarea
                                          value={editFormData?.description || ''}
                                          onChange={(e) => handleInputChange('description', e.target.value)}
                                          rows={3}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Chi phí (VNĐ)
                                        </label>
                                        <input
                                          type="number"
                                          value={editFormData?.amount || ''}
                                          onChange={(e) => handleInputChange('amount', parseInt(e.target.value))}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                          Thời gian ước tính (ngày)
                                        </label>
                                        <input
                                          type="number"
                                          value={editFormData?.estimatedDurationDays || ''}
                                          onChange={(e) => handleInputChange('estimatedDurationDays', parseInt(e.target.value))}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                                    <button
                                      onClick={handleCancelEdit}
                                      className="px-4 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                                    >
                                      ❌ Hủy
                                    </button>
                                    <button
                                      onClick={handleSaveStep}
                                      className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                                    >
                                      ✅ Lưu
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Total Cost */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex justify-end">
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">
                              Tổng chi phí các bước:
                            </p>
                            <p className="text-xl font-bold text-green-600">
                              {service.treatmentSteps
                                .reduce(
                                  (total, step) => total + (step.amount || 0),
                                  0
                                )
                                .toLocaleString("vi-VN")}{" "}
                              VNĐ
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Chưa có dịch vụ nào
            </h3>
            <p className="text-gray-500">
              Hiện tại chưa có dịch vụ điều trị nào được tải lên hệ thống.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}