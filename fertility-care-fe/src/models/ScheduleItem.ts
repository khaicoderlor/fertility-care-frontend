export interface ScheduleItem {
  date: string;
  startTime: string;
  endTime: string;
  doctorId: string;
  doctorName: string;
  shiftType: 'morning' | 'afternoon' | 'evening';
  note?: string;
}
