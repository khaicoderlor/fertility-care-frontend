// Base Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  status: 'active' | 'inactive' | 'treatment' | 'completed';
  treatment?: string;
  lastVisit?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  rating: number;
  patients: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'IUI' | 'IVF' | 'consultation';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: string;
  bgColor: string;
  iconColor: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    barPercentage?: number;
    tension?: number;
    fill?: boolean;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointBorderWidth?: number;
    pointRadius?: number;
    yAxisID?: string;
  }[];
}

export interface ChartConfig {
  title: string;
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: ChartData;
  options?: any;
}

export interface ChartTab {
  id: string;
  label: string;
  icon: string;
  config: ChartConfig;
}

// Component Props
export interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

export interface StatsCardProps {
  stat: StatCard;
}

export interface PatientTableProps {
  patients: Patient[];
  onEdit?: (patient: Patient) => void;
  onDelete?: (patientId: string) => void;
}

export interface DoctorTableProps {
  doctors: Doctor[];
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (doctorId: string) => void;
}

export interface AppointmentTableProps {
  appointments: Appointment[];
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointmentId: string) => void;
  onStatusChange?: (appointmentId: string, status: Appointment['status']) => void;
}

