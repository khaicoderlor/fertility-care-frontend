import type { SlotSchedule } from "../models/SlotSchedule";
import {
  STEP_COMPLETED,
  STEP_FAILED,
  STEP_PROGRESS,
  STEP_RETRANSFER,
} from "../constants/StepStatus";
import type Profile from "../models/Profile";
import type OrderStep from "../models/OrderStep";
import type { Appointment } from "../models/Appointment";

export function convertFullName(profile: Profile): string {
  return profile.firstName + " " + profile.middleName + " " + profile.lastName;
}

export function convertName(profile: Profile | null): string {
  return profile?.firstName + " " + profile?.lastName
}

export function convertSlotTime(slot: SlotSchedule): string {
  return slot.startTime + " - " + slot.endTime;
}

export const calculateCompletedPercentage = (steps: OrderStep[]): number => {
  if (!steps || steps.length === 0) return 0;
  const completedCount = steps.filter(
    (step) => step.status === STEP_COMPLETED
  ).length;
  const percentage = (completedCount / steps.length) * 100;
  return Math.floor(percentage);
};

export function getStepCardBg(status: string): string {
  switch (status) {
    case STEP_COMPLETED:
      return "bg-green-50";
    case STEP_PROGRESS:
      return "bg-blue-50";
    case STEP_FAILED:
      return "bg-red-50";
    case STEP_RETRANSFER:
      return "bg-pink-50";
    default:
      return "bg-white";
  }
}

export function getStepBySelectedStepDetail(
  steps: OrderStep[],
  selectedStepDetail: number
): OrderStep | undefined {
  return steps.find((x) => x.id === selectedStepDetail);
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const getTotalExtraFeeOfStep = (appointments: Appointment[]): number => {
  return appointments.reduce((total, x) => total + (x.extraFee || 0), 0)
}

export const convertDateToInputDate = (date: string): string => {
  const s: string[] = date.split("/");
  return `${s[2]}-${s[1]}-${s[0]}`;
}

export const convertToInputDate = (date: string): string => {
  const[dd,mm,yyyy] = date.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

export const convertToDisplayDate = (date: string): string => {
  const [yyyy, mm, dd] = date.split("-");
  return `${dd}/${mm}/${yyyy}`;
};

export const convertTimeAgoLabel = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/").map(Number);
  const inputDate = new Date(year, month - 1, day);

  const now = new Date();
  const diffMs = now.getTime() - inputDate.getTime();

  if (diffMs < 0) {
    return "Trong tương lai";
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return `${diffSeconds} giây trước`;
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffWeeks < 5) return `${diffWeeks} tuần trước`;
  if (diffMonths < 12) return `${diffMonths} tháng trước`;
  return `${diffYears} năm trước`;
};

