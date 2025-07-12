export default interface DoctorStatisticOverall {
  totalPatients: number;
  totalAppointments: number;
  totalRate: number;

  comparingPatientsPreviousMonth: number;
  totalPatientsPreviousMonth: number;
  totalPatientsCurrentMonth: number;

  comparingAppointmentsPreviousMonth: number;
  totalAppointmentsPreviousMonth: number;

  comparingRatePreviousMonth: number;
  totalRatePreviousMonth: number;
}
