import type Profile from "../models/Profile";
import type { SlotSchedule } from "../models/SlotSchedule";
import {
  STEP_COMPLETED,
  STEP_FAILED,
  STEP_PROGRESS,
} from "../constants/StepStatus";
import type OrderStep from "../models/OrderStep";

export function ConvertFullName(profile: Profile): string {
  return profile.firstName + " " + profile.middleName + " " + profile.lastName;
}

export function ConvertSlotTime(slot: SlotSchedule): string {
  return slot.startTime + " - " + slot.endTime;
}