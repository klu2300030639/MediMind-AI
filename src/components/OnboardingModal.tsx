import type { UserProfile } from '../types';
import React, { useState } from 'react';
import { 
  Heart, 
  User, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Watch,
  Stethoscope
} from 'lucide-react';

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
  onCancel?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergiesInput, setAllergiesInput] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('Symptom Diagnosis & Telehealth');
  const [connectedDevice, setConnectedDevice] = useState('Apple Watch Series 9');

  const handleFinish = () => {
    const newProfile: UserProfile = {
      name: name.trim() || 'New Patient',
      age: age || 25,
      gender,
      bloodGroup,
      allergies: allergiesInput ? allergiesInput.split(',').map(s => s.trim()) : ['None Reported'],
      medicalId: `#MM-${Math.floor(100000 + Math.random() * 900000)}`,
      emergencyContactName: emergencyName.trim() || 'Primary Contact',
      emergencyContactPhone: emergencyPhone.trim() || '+1 (555) 019-2834',
      primaryGoal,
      connectedDevice,
      isOnboarded: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    onComplete(newProfile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 border border-slate-200 animate-in zoom-in-95">
        
        {/* Header Progress */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-current text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">New Patient Onboarding</h2>
              <p className="text-[11px] text-slate-500">Step {step} of 3 &bull; Personalized Health ID Setup</p>
            </div>
          </div>
          {onCancel && (
            <button onClick={onCancel} className="text-xs font-semibold text-slate-400 hover:text-slate-700">
              Skip & Use Demo
            </button>
          )}
        </div>

        {/* Step 1: Basic Profile Info */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name (e.g. Alex Morgan)"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Age</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Gender</label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Primary Health Focus</label>
              <select 
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
              >
                <option value="Symptom Diagnosis & Telehealth">Symptom Diagnosis & Telehealth</option>
                <option value="Daily Vitals & Heart Rate Telemetry">Daily Vitals & Heart Rate Telemetry</option>
                <option value="Prescription & Medication Tracking">Prescription & Medication Tracking</option>
                <option value="Lab Test & Report OCR Analysis">Lab Test & Report OCR Analysis</option>
              </select>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Continue to Medical History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Medical Baseline */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Blood Group</label>
              <div className="grid grid-cols-4 gap-2">
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBloodGroup(bg)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      bloodGroup === bg ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Known Allergies / Sensitivities</label>
              <input 
                type="text" 
                value={allergiesInput}
                onChange={(e) => setAllergiesInput(e.target.value)}
                placeholder="e.g. Penicillin, Peanuts, Dust (or leave blank)"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Connected Wearable Device</label>
              <select 
                value={connectedDevice}
                onChange={(e) => setConnectedDevice(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
              >
                <option value="Apple Watch Series 9">Apple Watch Series 9</option>
                <option value="Fitbit Charge 6">Fitbit Charge 6</option>
                <option value="Garmin Venu 3">Garmin Venu 3</option>
                <option value="Samsung Galaxy Watch 6">Samsung Galaxy Watch 6</option>
                <option value="None / Manual Input Only">None / Manual Input Only</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="flex-[2] py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <span>Continue to Emergency SOS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Emergency Contact & Confirmation */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs space-y-2">
              <p className="font-bold text-red-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-600" /> Emergency Contact Setup
              </p>
              <p className="text-red-700">
                This contact will receive your GPS location and medical passport when the SOS button is triggered.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Emergency Contact Name</label>
              <input 
                type="text" 
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="Name (e.g. Spouse / Parent / Relative)"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Emergency Phone Number</label>
              <input 
                type="tel" 
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Back
              </button>
              <button 
                onClick={handleFinish}
                className="flex-[2] py-3.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Initialize My Health Portal</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
