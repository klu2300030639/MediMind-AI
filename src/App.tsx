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

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  
  // Default Demo Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Sarah Jenkins',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A+',
    allergies: ['Penicillin'],
    medicalId: '#MM-884920',
    emergencyContactName: 'David Jenkins (Spouse)',
    emergencyContactPhone: '+1 (555) 019-2834',
    primaryGoal: 'Symptom Diagnosis & Telehealth',
    connectedDevice: 'Apple Watch Series 9',
    isOnboarded: true,
  });

  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
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
        return (
          <UserDashboard 
            userProfile={userProfile} 
            onNavigate={setCurrentScreen} 
            onOpenOnboarding={() => setShowOnboarding(true)} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
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
