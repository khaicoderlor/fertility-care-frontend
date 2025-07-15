import type { Doctor } from "./Doctor";
import type { Patient } from "./Patient";
import type { TreatmentService } from "./TreatmentService";

export default interface Feedback {
    id: string

    patient: Patient

    doctor: Doctor

    treatmentService: TreatmentService

    status: boolean

    rating: number

    comment: string

    createdAt: string

    updatedAt: string

}