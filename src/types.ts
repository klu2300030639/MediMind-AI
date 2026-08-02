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
  | 'emergency'
  | 'about';

export interface UserProfile {
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
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
  sources?: any[];
  riskLevel?: 'Low' | 'Moderate' | 'High';
  isWarning?: boolean;
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
  frequency?: string;
  timeOfDay?: 'Morning' | 'Afternoon' | 'Evening' | 'Bedtime';
  time?: string;
  slot?: string;
  taken: boolean;
  refillRemaining?: number;
  refillLeft?: any;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  avatar?: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

export interface HealthMetric {
  date: string;
  heartRate: number;
  sysBP: number;
  diaBP: number;
  sleepHours: number;
  oxygenLevel: number;
}

export interface LabResult {
  id?: string;
  testName?: string;
  parameter?: string;
  value: string;
  unit: string;
  referenceRange?: string;
  range?: string;
  status: 'Normal' | 'Elevated' | 'Low' | 'Critical';
  category?: string;
}
