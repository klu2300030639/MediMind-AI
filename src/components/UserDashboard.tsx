import type { ScreenId, UserProfile } from '../types';
import React from 'react';
import { 
  Heart, 
  Bot, 
  Activity, 
  Pill, 
  Calendar, 
  FileText, 
  Stethoscope, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Zap,
  TrendingUp,
  UserCheck
} from 'lucide-react';

interface UserDashboardProps {
  userProfile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenOnboarding: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ userProfile, onNavigate, onOpenOnboarding }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'NP';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Patient Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-600/20">
            {getInitials(userProfile.name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">Welcome, {userProfile.name}!</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                Health Score: 96/100
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              Medical ID: <span className="font-mono text-blue-600 font-bold">{userProfile.medicalId}</span> &bull; Blood Type: {userProfile.bloodGroup} &bull; Device: {userProfile.connectedDevice}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenOnboarding}
            className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs transition-colors"
          >
            Edit Profile
          </button>
          <button 
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md hover:bg-blue-700 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Consult AI Triage</span>
          </button>
          <button 
            onClick={() => onNavigate('emergency')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 font-semibold text-xs hover:bg-red-100 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>SOS</span>
          </button>
        </div>
      </div>

      {/* Vitals Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('analytics')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-blue-400 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Heart Rate</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">72 <span className="text-xs font-normal text-slate-500">bpm</span></p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Normal Resting Pace
          </p>
        </div>

        <div 
          onClick={() => onNavigate('analytics')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-blue-400 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Blood Pressure</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-500 group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">120/80 <span className="text-xs font-normal text-slate-500">mmHg</span></p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3 h-3" /> Optimal Range
          </p>
        </div>

        <div 
          onClick={() => onNavigate('medications')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-blue-400 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Meds Today</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-500 group-hover:scale-110 transition-transform">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">3 <span className="text-xs font-normal text-slate-500">of 4 taken</span></p>
          <p className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3" /> 1 Evening Dose Due
          </p>
        </div>

        <div 
          onClick={() => onNavigate('analytics')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-blue-400 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sleep Quality</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-500 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">7.8 <span className="text-xs font-normal text-slate-500">hrs</span></p>
          <p className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1 mt-1">
            85% Deep REM Sleep
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => onNavigate('symptoms')}
              className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white text-left shadow-lg hover:shadow-xl transition-all group"
            >
              <Stethoscope className="w-7 h-7 mb-3 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-base">Symptom Checker</h3>
              <p className="text-xs text-blue-100 mt-1">Instant AI Triage Assessment</p>
              <div className="mt-4 text-xs font-bold flex items-center gap-1">
                <span>Start Assessment</span> &rarr;
              </div>
            </button>

            <button 
              onClick={() => onNavigate('reports')}
              className="p-5 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 text-white text-left shadow-lg hover:shadow-xl transition-all group"
            >
              <FileText className="w-7 h-7 mb-3 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-base">Report Analyzer</h3>
              <p className="text-xs text-teal-100 mt-1">Scan Blood Test PDF</p>
              <div className="mt-4 text-xs font-bold flex items-center gap-1">
                <span>Upload Document</span> &rarr;
              </div>
            </button>

            <button 
              onClick={() => onNavigate('appointments')}
              className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-left shadow-lg hover:shadow-xl transition-all group"
            >
              <Calendar className="w-7 h-7 mb-3 opacity-90 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-base">Book Consult</h3>
              <p className="text-xs text-indigo-100 mt-1">Top Specialist Doctors</p>
              <div className="mt-4 text-xs font-bold flex items-center gap-1">
                <span>View Schedule</span> &rarr;
              </div>
            </button>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-lg text-slate-900">Today's Medication Schedule</h2>
              </div>
              <button 
                onClick={() => onNavigate('medications')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                View Cabinet &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Vitamin D3 (2000 IU)', time: '08:00 AM', slot: 'Morning', taken: true, refill: '28 days' },
                { name: 'Amoxicillin 500mg', time: '01:30 PM', slot: 'Noon', taken: true, refill: '4 days' },
                { name: 'Atorvastatin 10mg', time: '09:00 PM', slot: 'Bedtime', taken: false, refill: '12 days' },
              ].map((med, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    med.taken ? 'bg-slate-50/80 border-slate-200 opacity-75' : 'bg-white border-blue-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                      med.taken ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {med.taken ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${med.taken ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {med.name}
                      </p>
                      <p className="text-xs text-slate-500">{med.slot} &bull; {med.time} &bull; Refill: {med.refill}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate('medications')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      med.taken ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    }`}
                  >
                    {med.taken ? 'Completed' : 'Mark Taken'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Appointment</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">Confirmed</span>
            </div>

            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80" 
                alt="Dr. Elena Rostova" 
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">Dr. Elena Rostova</h4>
                <p className="text-xs text-slate-500">Neurology Specialist</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs space-y-1">
              <p className="font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-600" /> Tomorrow, Aug 3 &bull; 10:30 AM
              </p>
              <p className="text-slate-500 flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Video Consultation (HD)
              </p>
            </div>

            <button 
              onClick={() => onNavigate('appointments')}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              Join Appointment Room
            </button>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>MediMind AI Recommendation</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "Target focus area: {userProfile.primaryGoal}. Your telemetry is synchronized with {userProfile.connectedDevice}."
            </p>

            <button 
              onClick={() => onNavigate('chat')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              Open AI Chat History &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
