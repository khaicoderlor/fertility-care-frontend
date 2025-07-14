import type OrderStep from "./OrderStep";
import type { Patient } from "./Patient";

export default interface OrderStepPayment {
    id: string

    patient: Patient

    treatmentServiceName: string

    orderStep: OrderStep

    paymentCode: string

    totalAmount: number

    paymentMethod: string

    transactionCode: string

    paymentDate: string

    paymentStatus: string

    gatewayResponseCode: string

    gatewayMessage: string
}