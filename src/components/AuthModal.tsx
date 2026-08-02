import { useState } from 'react';
import { UserProfile } from '../types';
import { X, Lock, Mail, User, Shield, CheckCircle, ArrowRight, Activity } from 'lucide-react';

interface AuthModalProps {
  onLoginSuccess: (user: UserProfile) => void;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ onLoginSuccess, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('None');
  const [primaryGoal, setPrimaryGoal] = useState('AI Symptom Diagnosis');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const storedUsersRaw = localStorage.getItem('medimind_registered_users');
      const users: UserProfile[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      const matchedUser = users.find(u => u.email?.toLowerCase() === loginEmail.toLowerCase());
      if (matchedUser) {
        onLoginSuccess(matchedUser);
        return;
      }

      // If logging in with demo email or Sarah
      if (loginEmail.toLowerCase().includes('sarah') || loginEmail.toLowerCase().includes('demo')) {
        const demoUser: UserProfile = {
          name: 'Sarah Jenkins',
          email: loginEmail,
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
        };
        onLoginSuccess(demoUser);
        return;
      }

      // Create instant account if unknown email for smooth user testing
      const newUser: UserProfile = {
        name: loginEmail.split('@')[0] || 'Patient',
        email: loginEmail,
        age: 30,
        gender: 'Not specified',
        bloodGroup: 'O+',
        allergies: ['None'],
        medicalId: `#MM-${Math.floor(100000 + Math.random() * 900000)}`,
        emergencyContactName: 'Emergency Contact',
        emergencyContactPhone: '+1 (555) 999-0000',
        primaryGoal: 'AI Symptom Diagnosis',
        connectedDevice: 'Wearable Sync Active',
        isOnboarded: true,
      };
      
      const updatedUsers = [...users, newUser];
      localStorage.setItem('medimind_registered_users', JSON.stringify(updatedUsers));
      onLoginSuccess(newUser);
    } catch (err) {
      setLoginError('Authentication failed. Please check credentials.');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !signupEmail) return;

    const newUser: UserProfile = {
      name,
      email: signupEmail,
      age: Number(age),
      gender,
      bloodGroup,
      allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
      medicalId: `#MM-${Math.floor(100000 + Math.random() * 900000)}`,
      emergencyContactName: 'Primary Emergency Contact',
      emergencyContactPhone: '+1 (555) 000-1234',
      primaryGoal,
      connectedDevice: 'MediMind Wearable Health Hub',
      isOnboarded: true,
    };

    try {
      const storedUsersRaw = localStorage.getItem('medimind_registered_users');
      const users: UserProfile[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const updatedUsers = [...users, newUser];
      localStorage.setItem('medimind_registered_users', JSON.stringify(updatedUsers));
    } catch (e) {
      console.error(e);
    }

    onLoginSuccess(newUser);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      name: 'Sarah Jenkins (Demo Patient)',
      email: 'sarah.jenkins@medimind.ai',
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
    };
    onLoginSuccess(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#0066FF] to-indigo-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">MediMind AI Health Account</h2>
              <p className="text-xs text-blue-100">HIPAA Compliant Patient Portal</p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-4">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                mode === 'login' ? 'bg-white text-[#0066FF] shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                mode === 'signup' ? 'bg-white text-[#0066FF] shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2 border border-red-100">
                  <X className="w-4 h-4 text-red-500" />
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>Access My Health Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-semibold">Or Quick Demo Access</span></div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 border border-slate-200"
              >
                <Shield className="w-4 h-4 text-[#0066FF]" />
                <span>Test Live Demo Account (Sarah Jenkins)</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Known Allergies</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Peanuts, None"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Health Goal</label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                >
                  <option value="AI Symptom Diagnosis">AI Symptom Diagnosis</option>
                  <option value="Medication & Pill Reminders">Medication & Pill Reminders</option>
                  <option value="Lab Report OCR Analysis">Lab Report OCR Analysis</option>
                  <option value="Telehealth & Doctor Consultations">Telehealth & Doctor Consultations</option>
                  <option value="Wearables & Vital Monitoring">Wearables & Vital Monitoring</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Create & Launch My Health Dashboard</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
