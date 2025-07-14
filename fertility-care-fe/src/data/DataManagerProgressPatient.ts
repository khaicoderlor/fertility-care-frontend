import { STEP_COMPLETED, STEP_PROGRESS, STEP_PLANNED, STEP_FAILED } from "../constants/StepStatus";

export interface PatientProgress {
  id: string;
  patientName: string;
  doctorName: string;
  serviceName: string;
  currentStep: number;
  totalSteps: number;
  startDate: string;
  status: string;
}

// Mock data cho tiến trình bệnh nhân
export const patientProgressData: PatientProgress[] = [
  {
    id: "progress_001",
    patientName: "Nguyễn Thị Mai",
    doctorName: "BS. Nguyễn Văn A",
    serviceName: "IVF",
    currentStep: 3,
    totalSteps: 6,
    startDate: "2024-12-01",
    status: STEP_PROGRESS
  },
  {
    id: "progress_002",
    patientName: "Lê Thị Hoa",
    doctorName: "BS. Lê Thị B",
    serviceName: "IUI",
    currentStep: 6,
    totalSteps: 6,
    startDate: "2024-11-15",
    status: STEP_COMPLETED
  },
  {
    id: "progress_003",
    patientName: "Trần Thị Lan",
    doctorName: "BS. Hoàng Văn C",
    serviceName: "IVF",
    currentStep: 1,
    totalSteps: 6,
    startDate: "2025-01-10",
    status: STEP_PROGRESS
  },
  {
    id: "progress_004",
    patientName: "Phạm Thị Thu",
    doctorName: "BS. Đặng Thị D",
    serviceName: "IUI",
    currentStep: 4,
    totalSteps: 6,
    startDate: "2024-10-20",
    status: STEP_FAILED
  },
  {
    id: "progress_005",
    patientName: "Võ Thị Kim",
    doctorName: "BS. Phan Văn E",
    serviceName: "IVF",
    currentStep: 2,
    totalSteps: 6,
    startDate: "2025-01-05",
    status: STEP_PLANNED
  }
];

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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};
