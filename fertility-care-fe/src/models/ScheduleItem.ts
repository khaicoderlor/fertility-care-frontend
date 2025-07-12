export interface ScheduleItem {
  scheduleId: number
  workDate: string;
  startTime: string;
  endTime: string;
  doctorId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  shiftType: 'morning' | 'afternoon' | 'evening';
  isWorkingDay: boolean
}
