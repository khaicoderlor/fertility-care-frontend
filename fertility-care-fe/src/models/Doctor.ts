import type { DoctorSchedule } from "./DoctorSchedule";
import type Profile from "./Profile";

export interface Doctor {
    id: string,
    profile: Profile,
    degree: string,
    specialization: string,
    yearsOfExperience: number,
    biography: string,
    rating: number,
    patientsServed: string,
    createdAt: string, 
    updatedAt: string,
    doctorSchedules: DoctorSchedule[] 
}