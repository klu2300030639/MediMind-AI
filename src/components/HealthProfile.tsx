import { useState } from 'react';
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
  CheckCircle2,
  X,
  Save,
  PhoneCall
} from 'lucide-react';

interface HealthProfileProps {
  userProfile: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onOpenOnboarding: () => void;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export function HealthProfile({ userProfile, onNavigate, onOpenOnboarding, onUpdateProfile }: HealthProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    } else {
      try {
        localStorage.setItem('medimind_active_patient_session', JSON.stringify(formData));
      } catch (err) {
        console.error(err);
      }
    }
    setIsEditing(false);
  };

  const isInsuranceNA = !userProfile.insuranceProvider || 
                        userProfile.insuranceProvider.toLowerCase().includes('not applicable') || 
                        userProfile.insuranceProvider.toLowerCase().includes('n/a') ||
                        userProfile.insuranceProvider.toLowerCase().includes('none');

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
              onClick={() => setIsEditing(true)}
              className="flex-1 md:flex-initial bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 backdrop-blur-md border border-white/10"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile Data
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Residential Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0066FF]" />
                Residential Address & Contact Details
              </h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                Edit Info
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Street Address</span>
                <p className="font-bold text-slate-800 text-sm">{userProfile.address || '123 Medical Plaza Way'}</p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">City, State, Zip & Country</span>
                <p className="font-bold text-slate-800 text-sm">
                  {userProfile.city || 'Guntur'}, {userProfile.state || 'Andhra Pradesh'} {userProfile.zipCode || '522502'}, {userProfile.country || 'India'}
                </p>
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Phone Number</span>
                <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                  {userProfile.phone || '+91 9876543210'}
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
                <p className="text-xs font-bold text-slate-900 mt-1">{userProfile.dateOfBirth || '1996-05-14'}</p>
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

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Insurance Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              Health Insurance Status
            </h2>

            <div className="space-y-3 text-xs">
              {isInsuranceNA ? (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-600 block">Insurance Provider</span>
                  <p className="font-extrabold text-slate-800 text-sm">N/A - Not Applicable</p>
                  <span className="text-[11px] text-slate-500 block pt-1">(Self-Pay Patient Record)</span>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Insurance Provider</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{userProfile.insuranceProvider}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Policy ID Number</span>
                    <p className="font-mono font-bold text-indigo-600 text-sm mt-0.5">{userProfile.policyNumber || 'N/A'}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className="bg-red-50/50 rounded-2xl p-6 border border-red-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-red-100 pb-2">
              <h2 className="text-base font-bold text-red-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Emergency Contact
              </h2>
              <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-red-700 hover:underline">
                Edit Contact
              </button>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-900">{userProfile.emergencyContactName}</p>
              <p className="text-red-700 font-mono font-bold">{userProfile.emergencyContactPhone}</p>
            </div>
          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#0066FF]" />
                Edit My Patient Profile & Emergency Contact
              </h3>
              <button onClick={() => setIsEditing(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Emergency Contact Edit Fields (REQ 3) */}
              <div className="bg-red-50/60 p-3 rounded-xl border border-red-200 space-y-2">
                <span className="font-bold text-red-900 block flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  Emergency Contact Settings
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      placeholder="David Jenkins (Spouse)"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state || ''}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={formData.zipCode || ''}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Insurance Provider (Or "Not Applicable")</label>
                <input
                  type="text"
                  value={formData.insuranceProvider || ''}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  placeholder="e.g. Not Applicable"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save All Profile & Contact Updates</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
