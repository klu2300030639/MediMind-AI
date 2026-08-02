import type { ScreenId, UserProfile } from '../types';
import React, { useState } from 'react';
import { 
  Heart, 
  Bot, 
  Activity, 
  Pill, 
  Calendar, 
  FileText, 
  User, 
  AlertTriangle, 
  Home, 
  Stethoscope, 
  Bell, 
  Menu, 
  X,
  UserPlus
} from 'lucide-react';

interface NavigationProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  userProfile: UserProfile;
  onOpenOnboarding: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentScreen, 
  setCurrentScreen, 
  userProfile, 
  onOpenOnboarding 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
    { id: 'chat', label: 'AI Health Chat', icon: <Bot className="w-5 h-5" />, badge: 'AI 4.2' },
    { id: 'symptoms', label: 'Symptom Checker', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'analytics', label: 'Health Vitals', icon: <Heart className="w-5 h-5" /> },
    { id: 'medications', label: 'Medications', icon: <Pill className="w-5 h-5" />, badge: '2 Due' },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
    { id: 'reports', label: 'Report Analyzer', icon: <FileText className="w-5 h-5" /> },
    { id: 'profile', label: 'My Health ID', icon: <User className="w-5 h-5" /> },
    { id: 'emergency', label: 'Emergency SOS', icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 fill-current text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                  MediMind <span className="text-blue-600 font-extrabold">AI</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 status-pulse"></span>
                  <span className="text-[11px] font-medium text-slate-500">Clinical Engine Active</span>
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
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' 
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
            {/* New User Setup Button */}
            <button 
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-bold text-xs transition-all shadow-sm"
              title="Setup New Patient Profile"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden md:inline">New Patient Setup</span>
            </button>

            <button 
              onClick={() => setCurrentScreen('emergency')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-semibold text-xs transition-all shadow-sm active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">SOS</span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-800">Notifications</span>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50 text-xs">
                      <p className="font-semibold text-slate-900">Welcome to MediMind AI</p>
                      <p className="text-slate-500">Patient profile for {userProfile.name} is initialized.</p>
                      <span className="text-[10px] text-slate-400">Just now</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setCurrentScreen('profile')}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              title={userProfile.name}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-xs overflow-hidden flex items-center justify-center shadow-sm">
                {userProfile.name.slice(0, 2).toUpperCase()}
              </div>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-30 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-4/5 max-w-xs h-full border-r border-slate-200 p-5 space-y-2 overflow-y-auto shadow-2xl">
            <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation Menu</p>
              <button 
                onClick={onOpenOnboarding}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                + New Patient
              </button>
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
                    active ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {[
          { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
          { id: 'chat', label: 'AI Chat', icon: <Bot className="w-5 h-5" /> },
          { id: 'symptoms', label: 'Check', icon: <Stethoscope className="w-5 h-5" /> },
          { id: 'medications', label: 'Rx', icon: <Pill className="w-5 h-5" /> },
          { id: 'emergency', label: 'SOS', icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
        ].map((tab) => {
          const active = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentScreen(tab.id as ScreenId)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                active ? 'text-blue-600 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
