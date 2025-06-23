import type { Appointment } from "./Appointment"
import type { TreatmentStep } from "./TreatmentStep"

export default interface OrderStep {

    id?: number,

    status?: string,

    treatmentStep: TreatmentStep,

    note?: string,

    startDate?: string,

    paymentStatus?: string,

    totalAmount?: number,

    endDate?: string,

    appointments?: Appointment[]

    createdAt?: string,

    updatedAt?: string
}

