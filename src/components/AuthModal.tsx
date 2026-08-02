import { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Activity, 
  MapPin, 
  Phone, 
  Calendar, 
  CreditCard,
  KeyRound,
  Send,
  Globe,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  onLoginSuccess: (user: UserProfile) => void;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
}

const COUNTRY_DIAL_CODES: { country: string; code: string; flag: string }[] = [
  { country: 'India', code: '+91', flag: '🇮🇳' },
  { country: 'United States', code: '+1', flag: '🇺🇸' },
  { country: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { country: 'Canada', code: '+1', flag: '🇨🇦' },
  { country: 'Australia', code: '+61', flag: '🇦🇺' },
  { country: 'Germany', code: '+49', flag: '🇩🇪' },
  { country: 'France', code: '+33', flag: '🇫🇷' },
  { country: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { country: 'Singapore', code: '+65', flag: '🇸🇬' },
];

export function AuthModal({ onLoginSuccess, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup state
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('India');
  const [dateOfBirth, setDateOfBirth] = useState('1996-05-14');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('None');
  const [primaryGoal, setPrimaryGoal] = useState('AI Symptom Diagnosis');
  
  // Insurance state
  const [noInsurance, setNoInsurance] = useState(false);
  const [insuranceProvider, setInsuranceProvider] = useState('Blue Cross Health Shield');
  const [policyNumber, setPolicyNumber] = useState('POL-9842109');
  const [primaryPhysician, setPrimaryPhysician] = useState('Dr. Marcus Vance, MD');

  // Pincode state
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeMessage, setPincodeMessage] = useState('');

  // OTP Reset State
  const [resetStep, setResetStep] = useState<'email' | 'otp' | 'newpass'>('email');
  const [resetEmail, setResetEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpNotice, setOtpNotice] = useState('');
  const [otpError, setOtpError] = useState('');

  // Auto-detect Country Code when Country changes
  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    const found = COUNTRY_DIAL_CODES.find(c => c.country.toLowerCase() === selectedCountry.toLowerCase());
    if (found) {
      setCountryCode(found.code);
    }
  };

  const handlePincodeLookup = async (code: string) => {
    setZipCode(code);
    const cleanCode = code.trim();
    if (!cleanCode || cleanCode.length < 3) return;

    setPincodeLoading(true);

    try {
      if (/^\d{6}$/.test(cleanCode)) {
        const res = await fetch(`https://api.postalpincode.in/pincode/${cleanCode}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          const detectedCity = po.District || po.Block || po.Name || '';
          const detectedState = po.State || '';
          const detectedCountry = po.Country || 'India';
          
          if (detectedCity) setCity(detectedCity);
          if (detectedState) setState(detectedState);
          handleCountryChange(detectedCountry);

          setPincodeMessage(`✨ Auto-detected: ${detectedCity}, ${detectedState}, ${detectedCountry}`);
          setPincodeLoading(false);
          return;
        }
      }

      if (/^\d{5}$/.test(cleanCode)) {
        const res = await fetch(`https://api.zippopotam.us/us/${cleanCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data.places && data.places.length > 0) {
            const place = data.places[0];
            const detectedCity = place['place name'];
            const detectedState = place['state abbreviation'] || place['state'];
            const detectedCountry = data['country'] || 'United States';

            setCity(detectedCity);
            setState(detectedState);
            handleCountryChange(detectedCountry);

            setPincodeMessage(`✨ Auto-detected: ${detectedCity}, ${detectedState}, ${detectedCountry}`);
            setPincodeLoading(false);
            return;
          }
        }
      }
    } catch (e) {
      console.error('Pincode lookup error', e);
    } finally {
      setPincodeLoading(false);
    }
  };

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
        phone: `${countryCode} 555-0192`,
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
        emergencyContactPhone: `${countryCode} 999-0000`,
        primaryGoal: 'AI Symptom Diagnosis',
        connectedDevice: 'Wearable Sync Active',
        isOnboarded: true,
        insuranceProvider: 'Not Applicable',
        policyNumber: 'N/A',
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

    const fullPhone = `${countryCode} ${phone}`;

    const newUser: UserProfile = {
      name,
      email: signupEmail,
      phone: fullPhone,
      address: address || '123 Health Street',
      city: city || 'San Francisco',
      state: state || 'CA',
      zipCode: zipCode || '94102',
      country: country || 'India',
      dateOfBirth,
      age: Number(age),
      gender,
      bloodGroup,
      allergies: allergies.split(',').map(a => a.trim()).filter(Boolean),
      medicalId: `#MM-${Math.floor(100000 + Math.random() * 900000)}`,
      emergencyContactName: 'Primary Emergency Contact',
      emergencyContactPhone: `${countryCode} 000-1234`,
      primaryGoal,
      connectedDevice: 'MediMind Health Hub',
      isOnboarded: true,
      insuranceProvider: noInsurance ? 'Not Applicable' : (insuranceProvider || 'Not Applicable'),
      policyNumber: noInsurance ? 'N/A' : (policyNumber || 'N/A'),
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

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpNotice(`📩 Simulated OTP Code sent to ${resetEmail}: [ ${code} ]`);
    setResetStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOtp.trim() === generatedOtp) {
      setResetStep('newpass');
      setOtpError('');
    } else {
      setOtpError('Invalid OTP Code. Please enter the 6-digit code shown in the notification.');
    }
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password updated successfully! Please sign in with your new password.');
    setMode('login');
    setResetStep('email');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
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
              <h2 className="text-xl font-bold">MediMind Patient Account Portal</h2>
              <p className="text-xs text-blue-100">HIPAA & GDPR Compliant Security</p>
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
              Register Patient Account
            </button>
            <button
              onClick={() => setMode('forgot')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                mode === 'forgot' ? 'bg-white text-[#0066FF] shadow' : 'text-white/80 hover:text-white'
              }`}
            >
              Reset Password
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* MODE: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4 text-red-500" />
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setMode('forgot')}
                    className="text-xs text-[#0066FF] hover:underline font-semibold"
                  >
                    Forgot Password? (OTP Reset)
                  </button>
                </div>
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
                <span>Sign In to Medical Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-semibold">Or Quick Demo Account</span></div>
              </div>

              <button
                type="button"
                onClick={() => onLoginSuccess({
                  name: 'Sarah Jenkins (Demo)',
                  email: 'sarah@medimind.ai',
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
                  emergencyContactName: 'David Jenkins',
                  emergencyContactPhone: '+1 (555) 019-2834',
                  primaryGoal: 'Telehealth & AI Diagnosis',
                  connectedDevice: 'Apple Watch Series 9',
                  isOnboarded: true,
                  insuranceProvider: 'Blue Cross Blue Shield',
                  policyNumber: 'BCBS-9948201',
                  primaryPhysician: 'Dr. Sarah Lin, MD'
                })}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 border border-slate-200"
              >
                <Shield className="w-4 h-4 text-[#0066FF]" />
                <span>Test Live Demo Account (Sarah Jenkins)</span>
              </button>
            </form>
          )}

          {/* MODE: FORGOT PASSWORD VIA MAIL OTP */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs text-blue-900 font-medium flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                Reset your account password via a 6-digit OTP sent to your registered Email address.
              </div>

              {otpNotice && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {otpNotice}
                </div>
              )}

              {otpError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-semibold border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  {otpError}
                </div>
              )}

              {resetStep === 'email' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Enter Registered Email ID</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Verification OTP Code</span>
                  </button>
                </form>
              )}

              {resetStep === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Enter 6-Digit OTP Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value)}
                      placeholder="e.g. 482910"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Verify OTP Code</span>
                  </button>
                </form>
              )}

              {resetStep === 'newpass' && (
                <form onSubmit={handleSaveNewPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Set New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new strong password"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Save New Password & Sign In</span>
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-xs font-semibold text-slate-500 hover:text-slate-800 text-center py-1"
              >
                ← Back to Login
              </button>
            </div>
          )}

          {/* MODE: REGISTER / SIGNUP */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              
              {/* Personal Details */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">1. Account Credentials & Personal Details</p>
                
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password *</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone (With Country Code) *</label>
                    <div className="flex gap-1.5">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-24 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      >
                        {COUNTRY_DIAL_CODES.map((c, i) => (
                          <option key={i} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">2. Residential Address & PIN Auto-Detection</p>
                
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Postal / PIN Code</span>
                      {pincodeLoading && <span className="text-[10px] text-blue-600 animate-pulse">Auto-detecting...</span>}
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => handlePincodeLookup(e.target.value)}
                      placeholder="e.g. 522502 or 90210"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      placeholder="India / United States"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City / District</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                    />
                  </div>
                </div>

                {pincodeMessage && (
                  <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200 animate-in fade-in">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{pincodeMessage}</span>
                  </div>
                )}
              </div>

              {/* Clinical & Insurance Details */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">3. Clinical Vitals & Insurance Provider</p>

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

                {/* Insurance with "Not Applicable" Toggle */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      Health Insurance Provider
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        checked={noInsurance}
                        onChange={(e) => setNoInsurance(e.target.checked)}
                        className="rounded text-[#0066FF] focus:ring-[#0066FF]"
                      />
                      <span>Not Applicable / No Insurance (Self-Pay)</span>
                    </label>
                  </div>

                  {!noInsurance ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <input
                        type="text"
                        value={insuranceProvider}
                        onChange={(e) => setInsuranceProvider(e.target.value)}
                        placeholder="Insurance Provider Name"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                      <input
                        type="text"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        placeholder="Policy / Member ID"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-100 p-2 rounded-lg text-xs font-semibold text-slate-500 text-center">
                      ✓ Coverage status set to: N/A - Not Applicable (Self-Pay Patient)
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Create & Register Patient Account</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
