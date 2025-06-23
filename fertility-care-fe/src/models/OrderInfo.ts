export interface OrderInfo {
    id: string,
    doctorName: string, 
    patientName: string,
    treatmentServiceName: string,
    startDate: string,
    endDate?: string
    status: string,
    isFrozen: boolean,
    totalEggs?: number,
    totalAmount?: number


}