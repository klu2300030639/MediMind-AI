import type { ScreenId } from '../types';
import React from 'react';
import { 
  Bot, 
  Stethoscope, 
  ShieldCheck, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  FileText, 
  Lock
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-20">
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Next-Gen Medical Intelligence Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Clinical Precision Powered by <span className="text-blue-600">MediMind AI</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Transforming patient outcomes through real-time symptom analysis, automated lab report parsing, medication tracking, and immediate emergency SOS dispatch.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:shadow-2xl active:scale-95 transition-all"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => onNavigate('chat')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
              >
                <Bot className="w-4 h-4 text-blue-600" />
                <span>Try AI Assistant v4.2</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>256-Bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>FDA Software Grade</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">MediMind Diagnostics</h3>
                    <p className="text-xs text-slate-500">Real-time Triage Score: 98.4%</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full">
                  LIVE ACTIVE
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Patient Vitals Sync</span>
                  <span className="text-blue-600 font-bold">Apple Watch Series 9</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium uppercase">Heart Rate</p>
                    <p className="text-base font-extrabold text-slate-900">72 <span className="text-[10px] font-normal">bpm</span></p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium uppercase">BP Level</p>
                    <p className="text-base font-extrabold text-slate-900">120/80</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium uppercase">SpO2</p>
                    <p className="text-base font-extrabold text-emerald-600">99%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => onNavigate('symptoms')}
                    className="p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs text-left flex items-center justify-between transition-colors"
                  >
                    <span>Check Symptoms</span>
                    <Stethoscope className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onNavigate('reports')}
                    className="p-3 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-xs text-left flex items-center justify-between transition-colors"
                  >
                    <span>Scan Lab Report</span>
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Designed for Clinical Excellence</h2>
          <p className="text-slate-600">Comprehensive suites built to bridge the gap between AI diagnostics and physical clinician workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => onNavigate('chat')} 
            className="glass-card p-6 rounded-3xl hover:border-blue-500 cursor-pointer transition-all hover:shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">AI Health Assistant</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Natural conversational triage engine with inline citation links to peer-reviewed Mayo Clinic and PubMed medical literature.
            </p>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Try Health Assistant &rarr;
            </span>
          </div>

          <div 
            onClick={() => onNavigate('reports')} 
            className="glass-card p-6 rounded-3xl hover:border-teal-500 cursor-pointer transition-all hover:shadow-xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">OCR Report Analyzer</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Upload blood work, MRI, or lab PDFs. Instant AI extraction flags elevated biomarkers with actionable clinical notes.
            </p>
            <span className="text-xs font-bold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Upload Test Report &rarr;
            </span>
          </div>

          <div 
            onClick={() => onNavigate('emergency')} 
            className="glass-card p-6 rounded-3xl hover:border-red-500 cursor-pointer transition-all hover:shadow-xl group border-red-100 bg-red-50/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Emergency SOS</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              One-tap panic trigger broadcasting GPS coordinates, medical records, and urgent dispatch alerts to emergency contacts.
            </p>
            <span className="text-xs font-bold text-red-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              View SOS Dispatch &rarr;
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
