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
import { AboutSection } from './components/AboutSection';
import { AuthModal } from './components/AuthModal';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('medimind_active_patient_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    return currentUser ? 'dashboard' : 'landing';
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('medimind_active_patient_session', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    setShowAuthModal(false);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('medimind_active_patient_session');
    } catch (e) {
      console.error(e);
    }
    setCurrentScreen('landing');
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setCurrentUser(updated);
    try {
      localStorage.setItem('medimind_active_patient_session', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const renderScreen = () => {
    // REQ 5: STRICT AUTHENTICATION GATE
    // If not logged in, force Landing Page or Auth Modal
    if (!currentUser) {
      return (
        <LandingPage 
          onNavigate={(screen) => {
            handleOpenAuth('login');
          }} 
        />
      );
    }

    // User is Logged In: Render personalized dashboard and modules
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentScreen} />;
      case 'dashboard':
        return (
          <UserDashboard 
            userProfile={currentUser} 
            onNavigate={setCurrentScreen} 
            onOpenOnboarding={() => handleOpenAuth('signup')} 
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
        return <AppointmentManager onNavigate={setCurrentScreen} userProfile={currentUser} />;
      case 'reports':
        return <ReportAnalyzer onNavigate={setCurrentScreen} />;
      case 'profile':
        return (
          <HealthProfile 
            userProfile={currentUser} 
            onNavigate={setCurrentScreen} 
            onOpenOnboarding={() => handleOpenAuth('signup')} 
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'emergency':
        return <EmergencySOS onNavigate={setCurrentScreen} />;
      case 'about':
        return <AboutSection onNavigate={setCurrentScreen} onOpenAuth={handleOpenAuth} />;
      default:
        return (
          <UserDashboard 
            userProfile={currentUser} 
            onNavigate={setCurrentScreen} 
            onOpenOnboarding={() => handleOpenAuth('signup')} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {!currentUser && (
        <div className="bg-gradient-to-r from-[#0066FF] to-indigo-600 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-white text-xs uppercase font-bold tracking-wider">Authentication Portal</span>
            <span>Please sign in or create an account to view your medical dashboard and health records.</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleOpenAuth('login')}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full font-semibold transition text-xs"
            >
              Sign In
            </button>
            <button 
              onClick={() => handleOpenAuth('signup')}
              className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-full font-semibold transition text-xs shadow"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      <Navigation 
        currentScreen={currentScreen} 
        setCurrentScreen={(screen) => {
          if (!currentUser && screen !== 'landing') {
            handleOpenAuth('login');
          } else {
            setCurrentScreen(screen);
          }
        }} 
        userProfile={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <main className="flex-1 transition-all animate-in fade-in duration-200">
        {renderScreen()}
      </main>

      {showAuthModal && (
        <AuthModal 
          initialMode={authMode}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

export default App;
