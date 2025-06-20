export interface Appointment {
  id?: string;

  patientId?: string;

  patientName?: string;

  appointmentDate?: string;

  slot?: number,

  startTime?: string;

  type?: string;

  endTime?: string;

  doctorName?: string;

  status?: string;

  doctorId?: string;

  paymentStatus?: string;

  extraFee?: number;

  note?: string;
}
