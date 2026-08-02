import type { ScreenId, UserProfile } from '../types';
import React from 'react';
import { 
  Heart, 
  Phone, 
  Lock,
  UserCheck
} from 'lucide-react';

interface HealthProfileProps {
  userProfile: UserProfile;
  onNavigate?: (screen: ScreenId) => void;
  onOpenOnboarding: () => void;
}

export const HealthProfile: React.FC<HealthProfileProps> = ({ userProfile, onOpenOnboarding }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      <div className="glass-card p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center border-2 border-blue-500 shadow-md">
            {userProfile.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{userProfile.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">Active Patient</span>
            </div>
            <p className="text-xs text-slate-500">Age: {userProfile.age} &bull; Gender: {userProfile.gender}</p>
            <p className="text-xs font-semibold text-slate-700">Digital Health Passport ID: <span className="text-blue-600 font-mono">{userProfile.medicalId}</span></p>
          </div>
        </div>

        <button 
          onClick={onOpenOnboarding}
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
        >
          Update Profile Info
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" /> Key Biometrics & Blood Group
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400">Blood Type</span>
              <p className="font-extrabold text-slate-900 text-sm">{userProfile.bloodGroup}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400">Known Allergies</span>
              <p className="font-extrabold text-red-600 text-sm">{userProfile.allergies.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" /> Emergency SOS Contacts
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800">{userProfile.emergencyContactName}</span>
              <span className="text-blue-600 font-mono">{userProfile.emergencyContactPhone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600" /> Privacy & HIPAA Encryption Controls
        </h3>
        
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div>
              <p className="font-bold text-slate-900">Share Telemetry with Assigned Physician</p>
              <p className="text-slate-500">Allows your clinical doctor to view continuous heart vitals</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div>
              <p className="font-bold text-slate-900">Anonymized Clinical AI Improvement</p>
              <p className="text-slate-500">Help train future MediMind diagnostic models</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
