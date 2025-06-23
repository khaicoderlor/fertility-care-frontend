import type { Doctor } from "./Doctor";
import type OrderStep from "./OrderStep";
import type { Patient } from "./Patient";
import type { TreatmentService } from "./TreatmentService";

export interface Order {
    id?: string,
    
    patient?: Patient,

    doctor?: Doctor,

    startDate?: string,

    treatmentService?: TreatmentService,

    endDate?: string,

    totalAmount?: number,

    note?: string,

    totalEggs?: number,

    createdAt?: string,

    updatedAt?: string,

    orderSteps?: OrderStep[]

} 