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
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: { title: string; url: string }[];
  isWarning?: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  slot: 'Morning' | 'Noon' | 'Evening' | 'Bedtime';
  taken: boolean;
  refillLeft: number;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Call';
  status: 'Confirmed' | 'Completed' | 'Pending';
  avatar: string;
}

export interface LabResult {
  parameter: string;
  value: string;
  unit: string;
  range: string;
  status: 'Normal' | 'Elevated' | 'Low' | 'High';
}

export interface SymptomAssessment {
  category: string;
  symptoms: string[];
  severity: number;
  duration: string;
}
