import { STEP_COMPLETED, STEP_PROGRESS, STEP_PLANNED, STEP_FAILED } from "../constants/StepStatus";
import type { Doctor } from "../models/Doctor";
import type { Order } from "../models/Order";
import type { Patient } from "../models/Patient";

export interface PatientProgress {
  patient: Patient;
  doctor: Doctor;
  order: Order;
  serviceName: string;
  currentStep: number;
  totalSteps: number;
  startDate: string;
  endDate?: string;
  status: string;
}

// Filter options
export const statusFilterOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: STEP_PROGRESS, label: "Đang tiến hành" },
  { value: STEP_COMPLETED, label: "Hoàn thành" },
  { value: STEP_PLANNED, label: "Đã lên kế hoạch" },
  { value: STEP_FAILED, label: "Tạm dừng" }
];

// Helper functions
export const getStatusColor = (status: string) => {
  switch (status) {
    case STEP_COMPLETED:
      return "text-green-600 bg-green-100";
    case STEP_PROGRESS:
      return "text-blue-600 bg-blue-100";
    case STEP_PLANNED:
      return "text-yellow-600 bg-yellow-100";
    case STEP_FAILED:
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case STEP_COMPLETED:
      return "Hoàn thành";
    case STEP_PROGRESS:
      return "Đang tiến hành";
    case STEP_PLANNED:
      return "Đã lên kế hoạch";
    case STEP_FAILED:
      return "Tạm dừng";
    default:
      return "Không xác định";
  }
};
