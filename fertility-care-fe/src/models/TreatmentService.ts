import type { TreatmentStep } from "./TreatmentStep";


export interface TreatmentService {
  id: string;
  name: string;
  description?: string;
  estimatePrice?: number;
  duration?: number;
  successRate?: number;
  recommendedFor?: string;
  contraindications?: string;
  createdAt: string;
  updatedAt?: string;
  treatmentSteps?: TreatmentStep[];
}