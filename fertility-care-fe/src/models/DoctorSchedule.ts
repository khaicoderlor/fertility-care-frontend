import type { Slot } from "./Slot";

export interface DoctorSchedule {  
    id: number,
    doctorId: string,
    workDate: string,
    maxAppointments: number,
    isAcceptingPatients: boolean,
    note: string,
    createdAt: string,
    updatedAt: string
    slot: Slot

}