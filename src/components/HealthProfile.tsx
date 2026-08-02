import { UserProfile, ScreenId } from '../types';
import { 
  ShieldCheck, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  Stethoscope, 
  Heart, 
  AlertCircle, 
  Edit3, 
  FileCheck, 
  Lock,
  Download,
  Share2,
  CheckCircle2
} from 'lucide-react';

interface HealthProfileProps {
  userProfile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenOnboarding: () => void;
}

export function HealthProfile({ userProfile, onNavigate, onOpenOnboarding }: HealthProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200 pb-20">
      
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl border border-blue-900/30">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-indigo-500 p-1 shadow-lg shadow-blue-500/30 flex items-center justify-center font-extrabold text-2xl text-white">
              {userProfile.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{userProfile.name}</h1>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Verified Medical Passport
                </span>
              </div>
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <span>Medical ID: <strong className="text-white">{userProfile.medicalId}</strong></span>
                <span>•</span>
                <span>Blood Group: <strong className="text-emerald-400 font-bold">{userProfile.bloodGroup}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenOnboarding}
              className="flex-1 md:flex-initial bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 backdrop-blur-md border border-white/10"
            >
              <Edit3 className="w-4 h-4" />
              Edit Information
            </button>
            <button
              className="flex-1 md:flex-initial bg-[#0066FF] hover:bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <Download className="w-4 h-4" />
              Export Passport PDF
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Contact & Address Details */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Residential & Contact Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0066FF]" />
                Residential Address & Contact Information
              </h2>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Verified Address
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Street Address</span>
                <p className="font-bold text-slate-800 text-sm">{userProfile.address || '742 Evergreen Terrace'}</p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">City, State, Zip & Country</span>
                <p className="font-bold text-slate-800 text-sm">
                  {userProfile.city || 'Springfield'}, {userProfile.state || 'IL'} {userProfile.zipCode || '62704'}, {userProfile.country || 'United States'}
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Phone Number</span>
                <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                  {userProfile.phone || '+1 (555) 234-5678'}
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Email Address</span>
                <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0066FF]" />
                  {userProfile.email || 'patient@medimind.ai'}
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Vital Specifications Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Clinical Vitals & Medical Profile
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600">Age</span>
                <p className="text-lg font-black text-slate-900">{userProfile.age} yrs</p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">Gender</span>
                <p className="text-lg font-black text-slate-900">{userProfile.gender}</p>
              </div>

              <div className="bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600">Blood Type</span>
                <p className="text-lg font-black text-slate-900">{userProfile.bloodGroup}</p>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 p-3.5 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600">Date of Birth</span>
                <p className="text-xs font-bold text-slate-900 mt-1">{userProfile.dateOfBirth || '1992-08-14'}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700">Drug & Food Allergy Alerts</span>
              <div className="flex flex-wrap gap-2">
                {userProfile.allergies && userProfile.allergies.length > 0 ? (
                  userProfile.allergies.map((allergy, i) => (
                    <span key={i} className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      {allergy}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No known drug allergies reported.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Insurance & Primary Care Doctor */}
        <div className="space-y-6">
          
          {/* Insurance & Coverage Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              Insurance & Coverage
            </h2>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Insurance Provider</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{userProfile.insuranceProvider || 'Blue Cross Blue Shield'}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Policy ID Number</span>
                <p className="font-mono font-bold text-indigo-600 text-sm mt-0.5">{userProfile.policyNumber || 'BCBS-9948201'}</p>
              </div>
            </div>
          </div>

          {/* Primary Care Physician Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Stethoscope className="w-5 h-5 text-[#0066FF]" />
              Primary Care Physician
            </h2>

            <div className="flex items-center gap-3 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
                MD
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900 text-sm">{userProfile.primaryPhysician || 'Dr. Sarah Lin, MD'}</p>
                <p className="text-slate-500">Internal Medicine & Primary Care</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className="bg-red-50/40 rounded-2xl p-6 border border-red-200/60 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-red-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Emergency Contact
            </h2>

            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-900">{userProfile.emergencyContactName}</p>
              <p className="text-red-700 font-mono font-bold">{userProfile.emergencyContactPhone}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
