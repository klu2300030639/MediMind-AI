import { useState } from 'react';
import { UserProfile } from '../types';
import { X, Lock, Mail, User, Shield, CheckCircle, ArrowRight, Activity, MapPin, Phone, Calendar, CreditCard } from 'lucide-react';

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
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [dateOfBirth, setDateOfBirth] = useState('1996-05-14');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('None');
  const [primaryGoal, setPrimaryGoal] = useState('AI Symptom Diagnosis');
  const [insuranceProvider, setInsuranceProvider] = useState('Blue Cross Health Shield');
  const [policyNumber, setPolicyNumber] = useState('POL-9842109');
  const [primaryPhysician, setPrimaryPhysician] = useState('Dr. Marcus Vance, MD');

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

      if (loginEmail.toLowerCase().includes('sarah') || loginEmail.toLowerCase().includes('demo')) {
        const demoUser: UserProfile = {
          name: 'Sarah Jenkins',
          email: loginEmail,
          phone: '+1 (555) 234-5678',
          address: '742 Evergreen Terrace',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62704',
          country: 'United States',
          dateOfBirth: '1992-08-14',
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
          insuranceProvider: 'Blue Cross Blue Shield',
          policyNumber: 'BCBS-9948201',
          primaryPhysician: 'Dr. Sarah Lin, MD',
        };
        onLoginSuccess(demoUser);
        return;
      }

      const newUser: UserProfile = {
        name: loginEmail.split('@')[0] || 'Patient',
        email: loginEmail,
        phone: '+1 (555) 100-2000',
        address: '100 Medical Plaza Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        dateOfBirth: '1995-01-01',
        age: 30,
        gender: 'Patient',
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
      phone: phone || '+1 (555) 000-0000',
      address: address || '123 Health Street',
      city: city || 'San Francisco',
      state: state || 'CA',
      zipCode: zipCode || '94102',
      country: country || 'United States',
      dateOfBirth,
      age: Number(age),
      gender,
      bloodGroup,
      allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
      medicalId: `#MM-${Math.floor(100000 + Math.random() * 900000)}`,
      emergencyContactName: 'Primary Emergency Contact',
      emergencyContactPhone: '+1 (555) 000-1234',
      primaryGoal,
      connectedDevice: 'MediMind Health Hub',
      isOnboarded: true,
      insuranceProvider,
      policyNumber,
      primaryPhysician,
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
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
          country: 'United States',
      dateOfBirth: '1992-08-14',
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
      insuranceProvider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS-9948201',
      primaryPhysician: 'Dr. Sarah Lin, MD',
    };
    onLoginSuccess(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 relative max-h-[90vh] flex flex-col">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#0066FF] to-indigo-600 p-5 text-white relative flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">MediMind Patient Registration</h2>
              <p className="text-xs text-blue-100">HIPAA & GDPR Compliant Medical Passport</p>
            </div>
          </div>

          <div className="flex bg-black/20 p-1 rounded-xl mt-3">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                mode === 'login' ? 'bg-white text-[#0066FF] shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                mode === 'signup' ? 'bg-white text-[#0066FF] shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              Register Full Patient Account
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
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
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-semibold">Or Demo Access</span></div>
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
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-xs text-blue-800 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0066FF]" />
                Please complete your full contact & address details for verified medical passport tracking.
              </div>

              {/* Personal Information */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">1. Personal & Contact Information</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
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

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">2. Residential Address</p>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Medical Center Drive, Suite 400"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="New York"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="NY"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Postal / Zip Code</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="10001"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Country *</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United States / India / UK"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">3. Clinical Vitals & Insurance</p>

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
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
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

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Insurance Provider</label>
                    <input
                      type="text"
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      placeholder="e.g. Aetna, Cigna"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Policy ID Number</label>
                    <input
                      type="text"
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value)}
                      placeholder="POL-8841029"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Save Full Medical Profile & Launch Portal</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
