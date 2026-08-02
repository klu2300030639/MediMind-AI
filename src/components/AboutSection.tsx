import { ScreenId } from '../types';
import { 
  ShieldCheck, 
  Activity, 
  Bot, 
  Stethoscope, 
  FileText, 
  HeartPulse, 
  Lock, 
  Globe, 
  Award, 
  Users, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  MapPin,
  AlertTriangle
} from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export function AboutSection({ onNavigate, onOpenAuth }: AboutSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12 animate-in fade-in duration-200 pb-24">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-blue-900/40 text-center space-y-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Clinical Precision AI Healthcare Platform</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
          Predicting Health Before <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            It Predicts You
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          MediMind AI is an advanced clinical intelligence ecosystem that combines real-time vital telemetry, medical OCR document parsing, 3D symptom analysis, and instant OTC medicine recommendations to empower proactive patient care worldwide.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenAuth ? onOpenAuth('signup') : onNavigate('chat')}
            className="bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl text-sm transition shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            <span>Explore Platform Features</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Core Mission Pillars */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Our Core Mission & Values</h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto">
            Delivering medical-grade diagnostic insights with uncompromising patient privacy and global accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Clinical AI Engine (v4.2)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trained on extensive medical literature to provide symptom analysis, non-pharmacological care advice, and safe over-the-counter medicine suggestions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">HIPAA & GDPR Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              End-to-end encrypted medical passports with strict per-patient client-side data isolation, ensuring zero unauthorized data access.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Geolocation Care Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic PIN code location detection and live GPS distance calculations to match patients with nearby medical specialists in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Capabilities Bento Grid */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 text-center">Comprehensive Healthcare Capabilities</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Stethoscope className="w-4 h-4 text-[#0066FF]" />
              Symptom Checker
            </div>
            <p className="text-slate-500">Interactive 3D body mapping with pain severity sliders (1-10) and instant risk triage.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <FileText className="w-4 h-4 text-indigo-600" />
              Document OCR
            </div>
            <p className="text-slate-500">Drag & drop lab report PDF parser extracting Hemoglobin, HbA1c, and cholesterol flags.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <HeartPulse className="w-4 h-4 text-red-500" />
              Vital Telemetry
            </div>
            <p className="text-slate-500">Real-time sync with Apple Watch, Fitbit, and wearable health monitors for HRV charts.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Emergency Panic SOS
            </div>
            <p className="text-slate-500">5-second countdown panic trigger broadcasting live GPS coordinates to emergency dispatch.</p>
          </div>
        </div>
      </div>

      {/* Ethical Medical Disclaimer */}
      <div className="bg-amber-50/60 border border-amber-200/80 p-6 rounded-2xl text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          Medical Disclaimer & Clinical Ethics
        </div>
        <p className="leading-relaxed">
          MediMind AI is designed as a clinical decision support tool and health intelligence assistant. It does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for severe or persistent medical conditions.
        </p>
      </div>

    </div>
  );
}
