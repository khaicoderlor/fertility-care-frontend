import type { Doctor } from "./Doctor";
import type { Patient } from "./Patient";

interface SecondFeedbackLatest {
    content: string

    rating: number

    createdAt: string

    patient: Patient
}

export interface FeedbackLatestSideManager {
    doctor: Doctor
    feedbacks: SecondFeedbackLatest[]
}