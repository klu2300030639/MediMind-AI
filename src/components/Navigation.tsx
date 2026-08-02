import { useState } from 'react';
import type { ScreenId, UserProfile } from '../types';
import { 
  Home, 
  Bot, 
  Stethoscope, 
  Activity, 
  Pill, 
  Calendar, 
  FileText, 
  User, 
  AlertTriangle,
  Menu,
  X,
  Bell,
  LogIn,
  ShieldCheck,
  UserPlus,
  LogOut
} from 'lucide-react';

interface NavigationProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  userProfile: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
}

export function Navigation({
  currentScreen,
  setCurrentScreen,
  userProfile,
  onOpenAuth,
  onLogout,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Overview', icon: <Home className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-4 h-4" /> },
    { id: 'chat', label: 'AI Health Assistant', icon: <Bot className="w-4 h-4" />, badge: 'v4.2' },
    { id: 'symptoms', label: 'Symptom Checker', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity className="w-4 h-4" /> },
    { id: 'medications', label: 'Medications', icon: <Pill className="w-4 h-4" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" /> },
    { id: 'reports', label: 'Report OCR', icon: <FileText className="w-4 h-4" /> },
    { id: 'profile', label: 'Medical Passport', icon: <User className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => setCurrentScreen('landing')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-indigo-600 p-2 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                  MediMind <span className="text-[#0066FF] font-extrabold">AI</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 status-pulse"></span>
                  <span className="text-[11px] font-medium text-slate-500">Clinical Precision Engine</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.slice(0, 7).map((item) => {
              const active = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active 
                      ? 'bg-white text-[#0066FF] shadow-sm border border-slate-200/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      active ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setCurrentScreen('emergency')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-semibold text-xs transition-all shadow-sm active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">SOS</span>
            </button>

            {userProfile ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-800 hidden md:inline">{userProfile.name}</span>
                  <div className="w-8 h-8 rounded-xl bg-[#0066FF] text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                    {userProfile.name.slice(0, 2).toUpperCase()}
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{userProfile.name}</p>
                      <p className="text-[11px] text-slate-500">{userProfile.medicalId}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentScreen('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      View Medical Passport
                    </button>
                    <button 
                      onClick={() => {
                        onLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-30 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-4/5 max-w-xs h-full border-r border-slate-200 p-5 space-y-2 overflow-y-auto shadow-2xl">
            <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MediMind Navigation</p>
            </div>
            {navItems.map((item) => {
              const active = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentScreen(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
