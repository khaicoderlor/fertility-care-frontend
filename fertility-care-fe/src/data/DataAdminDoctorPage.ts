// Data for Admin Doctor Dashboard Page

export interface DoctorStats {
  totalDoctors: number;
  activeDoctors: number;
  averageRating: number;
  totalPatients: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  totalPatients: number;
  status: 'active' | 'inactive' | 'busy';
  avatar?: string;
  experience: number;
  email: string;
  phone: string;
  reviewCount: number;
}

export interface ScheduleSlot {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftType: 'morning' | 'afternoon' | 'evening';
  status: 'available' | 'booked' | 'break';
}

export interface RatingData {
  doctorName: string;
  rating: number;
  reviewCount: number;
}

// Mock data
export const doctorStats: DoctorStats = {
  totalDoctors: 28,
  activeDoctors: 24,
  averageRating: 4.7,
  totalPatients: 1250
};

export const topDoctors: Doctor[] = [
  {
    id: '1',
    name: 'BS. Nguyễn A',
    specialty: 'Chuyên khoa IVF',
    rating: 4.9,
    totalPatients: 156,
    status: 'active',
    experience: 15,
    email: 'dr.nguyen@fertility.com',
    phone: '0901234567',
    reviewCount: 89
  },
  {
    id: '2',
    name: 'BS. Lê B',
    specialty: 'Chuyên khoa IUI',
    rating: 4.8,
    totalPatients: 142,
    status: 'active',
    experience: 12,
    email: 'dr.le@fertility.com',
    phone: '0901234568',
    reviewCount: 76
  },
  {
    id: '3',
    name: 'BS. Hoàng C',
    specialty: 'Sản phụ khoa',
    rating: 4.7,
    totalPatients: 138,
    status: 'active',
    experience: 18,
    email: 'dr.hoang@fertility.com',
    phone: '0901234569',
    reviewCount: 92
  },
  {
    id: '4',
    name: 'BS. Đặng D',
    specialty: 'Chuyên khoa IVF',
    rating: 4.6,
    totalPatients: 134,
    status: 'busy',
    experience: 10,
    email: 'dr.dang@fertility.com',
    phone: '0901234570',
    reviewCount: 68
  },
  {
    id: '5',
    name: 'BS. Phạm E',
    specialty: 'Nội tiết sinh sản',
    rating: 4.5,
    totalPatients: 129,
    status: 'active',
    experience: 14,
    email: 'dr.pham@fertility.com',
    phone: '0901234571',
    reviewCount: 84
  },
  {
    id: '6',
    name: 'BS. Trần F',
    specialty: 'Chuyên khoa IUI',
    rating: 4.4,
    totalPatients: 125,
    status: 'active',
    experience: 9,
    email: 'dr.tran@fertility.com',
    phone: '0901234572',
    reviewCount: 71
  },
  {
    id: '7',
    name: 'BS. Võ G',
    specialty: 'Sản phụ khoa',
    rating: 4.3,
    totalPatients: 121,
    status: 'active',
    experience: 16,
    email: 'dr.vo@fertility.com',
    phone: '0901234573',
    reviewCount: 88
  },
  {
    id: '8',
    name: 'BS. Lương H',
    specialty: 'Chuyên khoa IVF',
    rating: 4.2,
    totalPatients: 118,
    status: 'active',
    experience: 11,
    email: 'dr.luong@fertility.com',
    phone: '0901234574',
    reviewCount: 63
  },
  {
    id: '9',
    name: 'BS. Ngô I',
    specialty: 'Nội tiết sinh sản',
    rating: 4.1,
    totalPatients: 115,
    status: 'inactive',
    experience: 13,
    email: 'dr.ngo@fertility.com',
    phone: '0901234575',
    reviewCount: 79
  },
  {
    id: '10',
    name: 'BS. Đỗ K',
    specialty: 'Chuyên khoa IUI',
    rating: 4.0,
    totalPatients: 112,
    status: 'active',
    experience: 8,
    email: 'dr.do@fertility.com',
    phone: '0901234576',
    reviewCount: 56
  }
];

export const ratingChartData: RatingData[] = topDoctors.map(doctor => ({
  doctorName: doctor.name.replace('BS. ', ''),
  rating: doctor.rating,
  reviewCount: doctor.reviewCount
}));

export const scheduleData: ScheduleSlot[] = [
  // Tuần trước: 07-07 đến 13-07, 2025
  // Thứ 2 - 07/07/2025
  {
    id: 'prev-1',
    doctorId: '2',
    doctorName: 'BS. Lê B',
    date: '2025-07-07',
    startTime: '08:30',
    endTime: '11:00',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'prev-2',
    doctorId: '4',
    doctorName: 'BS. Đặng D',
    date: '2025-07-07',
    startTime: '14:30',
    endTime: '17:30',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 3 - 08/07/2025
  {
    id: 'prev-3',
    doctorId: '1',
    doctorName: 'BS. Nguyễn A',
    date: '2025-07-08',
    startTime: '07:30',
    endTime: '10:30',
    shiftType: 'morning',
    status: 'available'
  },
  
  // Thứ 4 - 09/07/2025
  {
    id: 'prev-4',
    doctorId: '3',
    doctorName: 'BS. Hoàng C',
    date: '2025-07-09',
    startTime: '13:30',
    endTime: '16:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  {
    id: 'prev-5',
    doctorId: '5',
    doctorName: 'BS. Phạm E',
    date: '2025-07-09',
    startTime: '18:30',
    endTime: '21:00',
    shiftType: 'evening',
    status: 'available'
  },
  
  // Thứ 5 - 10/07/2025
  {
    id: 'prev-6',
    doctorId: '2',
    doctorName: 'BS. Lê B',
    date: '2025-07-10',
    startTime: '09:00',
    endTime: '12:00',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'prev-7',
    doctorId: '1',
    doctorName: 'BS. Nguyễn A',
    date: '2025-07-10',
    startTime: '15:00',
    endTime: '18:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 6 - 11/07/2025
  {
    id: 'prev-8',
    doctorId: '4',
    doctorName: 'BS. Đặng D',
    date: '2025-07-11',
    startTime: '08:00',
    endTime: '11:30',
    shiftType: 'morning',
    status: 'available'
  },
  
  // Thứ 7 - 12/07/2025
  {
    id: 'prev-9',
    doctorId: '3',
    doctorName: 'BS. Hoàng C',
    date: '2025-07-12',
    startTime: '10:00',
    endTime: '12:00',
    shiftType: 'morning',
    status: 'available'
  },

  // Tuần hiện tại: 14-07 đến 20-07, 2025
  // Thứ 2 - 14/07/2025
  {
    id: '1',
    doctorId: '1',
    doctorName: 'BS. Nguyễn A',
    date: '2025-07-14',
    startTime: '08:00',
    endTime: '10:00',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'BS. Lê B',
    date: '2025-07-14',
    startTime: '14:00',
    endTime: '16:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 3 - 15/07/2025
  {
    id: '3',
    doctorId: '3',
    doctorName: 'BS. Hoàng C',
    date: '2025-07-15',
    startTime: '08:00',
    endTime: '10:00',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: '4',
    doctorId: '5',
    doctorName: 'BS. Phạm E',
    date: '2025-07-15',
    startTime: '17:30',
    endTime: '20:00',
    shiftType: 'evening',
    status: 'available'
  },
  
  // Thứ 4 - 16/07/2025
  {
    id: '5',
    doctorId: '4',
    doctorName: 'BS. Đặng D',
    date: '2025-07-16',
    startTime: '13:00',
    endTime: '15:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 5 - 17/07/2025
  {
    id: '6',
    doctorId: '1',
    doctorName: 'BS. Nguyễn A',
    date: '2025-07-17',
    startTime: '08:00',
    endTime: '10:00',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: '7',
    doctorId: '3',
    doctorName: 'BS. Hoàng C',
    date: '2025-07-17',
    startTime: '10:30',
    endTime: '12:30',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: '8',
    doctorId: '2',
    doctorName: 'BS. Lê B',
    date: '2025-07-17',
    startTime: '14:00',
    endTime: '17:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 6 - 18/07/2025
  {
    id: '9',
    doctorId: '4',
    doctorName: 'BS. Đặng D',
    date: '2025-07-18',
    startTime: '13:00',
    endTime: '16:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  {
    id: '10',
    doctorId: '5',
    doctorName: 'BS. Phạm E',
    date: '2025-07-18',
    startTime: '18:00',
    endTime: '20:00',
    shiftType: 'evening',
    status: 'available'
  },
  
  // Thứ 7 - 19/07/2025
  {
    id: '11',
    doctorId: '2',
    doctorName: 'BS. Lê B',
    date: '2025-07-19',
    startTime: '09:00',
    endTime: '11:00',
    shiftType: 'morning',
    status: 'available'
  },

  // Tuần sau: 21-07 đến 27-07, 2025
  // Thứ 2 - 21/07/2025
  {
    id: 'next-1',
    doctorId: '3',
    doctorName: 'BS. Hoàng C',
    date: '2025-07-21',
    startTime: '07:00',
    endTime: '09:30',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'next-2',
    doctorId: '1',
    doctorName: 'BS. Nguyễn A',
    date: '2025-07-21',
    startTime: '15:30',
    endTime: '18:30',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 3 - 22/07/2025
  {
    id: 'next-3',
    doctorId: '5',
    doctorName: 'BS. Phạm E',
    date: '2025-07-22',
    startTime: '08:30',
    endTime: '11:30',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'next-4',
    doctorId: '2',
    doctorName: 'BS. Lê B',
    date: '2025-07-22',
    startTime: '19:00',
    endTime: '21:30',
    shiftType: 'evening',
    status: 'available'
  },
  
  // Thứ 4 - 23/07/2025
  {
    id: 'next-5',
    doctorId: '4',
    doctorName: 'BS. Đặng D',
    date: '2025-07-23',
    startTime: '09:30',
    endTime: '12:30',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'next-6',
    doctorId: '3',
    doctorName: 'BS. Hoàng C',
    date: '2025-07-23',
    startTime: '14:30',
    endTime: '17:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 5 - 24/07/2025
  {
    id: 'next-7',
    doctorId: '1',
    doctorName: 'BS. Nguyễn A',
    date: '2025-07-24',
    startTime: '08:00',
    endTime: '11:00',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'next-8',
    doctorId: '5',
    doctorName: 'BS. Phạm E',
    date: '2025-07-24',
    startTime: '16:00',
    endTime: '19:00',
    shiftType: 'afternoon',
    status: 'available'
  },
  
  // Thứ 6 - 25/07/2025
  {
    id: 'next-9',
    doctorId: '2',
    doctorName: 'BS. Lê B',
    date: '2025-07-25',
    startTime: '10:00',
    endTime: '13:00',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'next-10',
    doctorId: '4',
    doctorName: 'BS. Đặng D',
    date: '2025-07-25',
    startTime: '17:30',
    endTime: '20:30',
    shiftType: 'evening',
    status: 'available'
  },
  
  // Thứ 7 - 26/07/2025
  {
    id: 'next-11',
    doctorId: '3',
    doctorName: 'BS. Hoàng C',
    date: '2025-07-26',
    startTime: '08:30',
    endTime: '10:30',
    shiftType: 'morning',
    status: 'available'
  },
  {
    id: 'next-12',
    doctorId: '1',
    doctorName: 'BS. Nguyễn A',
    date: '2025-07-26',
    startTime: '13:30',
    endTime: '15:30',
    shiftType: 'afternoon',
    status: 'available'
  }
];


// Chart colors
export const chartColors = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6'
};

export const shiftTypes = [
  { value: 'morning', label: 'Ca sáng (8:00-12:00)', color: 'green' },
  { value: 'afternoon', label: 'Ca chiều (13:00-17:00)', color: 'blue' },
  { value: 'evening', label: 'Ca tối (18:00-22:00)', color: 'purple' }
];

export const doctorSpecialties = [
  'Tất cả',
  'Chuyên khoa IVF',
  'Chuyên khoa IUI',
  'Sản phụ khoa',
  'Nội tiết sinh sản'
];
