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


