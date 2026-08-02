export type ScreenId = 
  | 'landing'
  | 'dashboard'
  | 'chat'
  | 'symptoms'
  | 'analytics'
  | 'medications'
  | 'appointments'
  | 'reports'
  | 'profile'
  | 'emergency';

export interface UserProfile {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  medicalId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  primaryGoal: string;
  connectedDevice: string;
  isOnboarded: boolean;
  insuranceProvider?: string;
  policyNumber?: string;
  primaryPhysician?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
  riskLevel?: 'Low' | 'Moderate' | 'High';
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime';
  taken: boolean;
  refillRemaining: number;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Telehealth Video';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface HealthMetric {
  date: string;
  heartRate: number;
  sysBP: number;
  diaBP: number;
  sleepHours: number;
  oxygenLevel: number;
}
