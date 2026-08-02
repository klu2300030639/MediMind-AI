import type { ScreenId, UserProfile } from './types';
import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { UserDashboard } from './components/UserDashboard';
import { AIHealthChat } from './components/AIHealthChat';
import { SymptomChecker } from './components/SymptomChecker';
import { HealthAnalytics } from './components/HealthAnalytics';
import { MedicineReminder } from './components/MedicineReminder';
import { AppointmentManager } from './components/AppointmentManager';
import { ReportAnalyzer } from './components/ReportAnalyzer';
import { HealthProfile } from './components/HealthProfile';
import { EmergencySOS } from './components/EmergencySOS';
import { OnboardingModal } from './components/OnboardingModal';

const DEFAULT_DEMO_PROFILE: UserProfile = {
  name: 'Sarah Jenkins (Demo)',
  age: 32,
  gender: 'Female',
  bloodGroup: 'A+',
  allergies: ['Penicillin'],
  medicalId: '#MM-884920',
  emergencyContactName: 'David Jenkins (Spouse)',
  emergencyContactPhone: '+1 (555) 019-2834',
  primaryGoal: 'Symptom Diagnosis & Telehealth',
  connectedDevice: 'Apple Watch Series 9',
  isOnboarded: false,
};

export function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('medimind_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load profile from storage', e);
    }
    return DEFAULT_DEMO_PROFILE;
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    return userProfile.isOnboarded ? 'dashboard' : 'landing';
  });

  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    const updated = { ...newProfile, isOnboarded: true };
    setUserProfile(updated);
    try {
      localStorage.setItem('medimind_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save profile to storage', e);
    }
    setShowOnboarding(false);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentScreen} />;
      case 'dashboard':
        return (
          <UserDashboard 
            userProfile={userProfile} 
            onNavigate={setCurrentScreen} 
            onOpenOnboarding={() => setShowOnboarding(true)} 
          />
        );
      case 'chat':
        return <AIHealthChat onNavigate={setCurrentScreen} />;
      case 'symptoms':
        return <SymptomChecker onNavigate={setCurrentScreen} />;
      case 'analytics':
        return <HealthAnalytics onNavigate={setCurrentScreen} />;
      case 'medications':
        return <MedicineReminder onNavigate={setCurrentScreen} />;
      case 'appointments':
        return <AppointmentManager onNavigate={setCurrentScreen} />;
      case 'reports':
        return <ReportAnalyzer onNavigate={setCurrentScreen} />;
      case 'profile':
        return (
          <HealthProfile 
            userProfile={userProfile} 
            onNavigate={setCurrentScreen} 
            onOpenOnboarding={() => setShowOnboarding(true)} 
          />
        );
      case 'emergency':
        return <EmergencySOS onNavigate={setCurrentScreen} />;
      default:
        return <LandingPage onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {!userProfile.isOnboarded && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-white text-xs uppercase font-bold tracking-wider">Demo Mode</span>
            <span>You are exploring with sample data. Personalize with your own medical profile anytime.</span>
          </div>
          <button 
            onClick={() => setShowOnboarding(true)}
            className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-full font-semibold transition text-xs shadow"
          >
            Create My Profile
          </button>
        </div>
      )}

      <Navigation 
        currentScreen={currentScreen} 
        setCurrentScreen={setCurrentScreen} 
        userProfile={userProfile}
        onOpenOnboarding={() => setShowOnboarding(true)}
      />

      <main className="flex-1 transition-all animate-in fade-in duration-200">
        {renderScreen()}
      </main>

      {showOnboarding && (
        <OnboardingModal 
          onComplete={handleOnboardingComplete}
          onCancel={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}

export default App;
