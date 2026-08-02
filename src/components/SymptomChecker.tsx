import React, { useState } from 'react';
import { ScreenId } from '../types';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  Activity, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SymptomCheckerProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onNavigate }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<'head' | 'chest' | 'abdomen' | 'limbs'>('head');
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState('4-8 hours');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Throbbing Pain', 'Light Sensitivity']);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const symptomOptions = {
    head: ['Throbbing Pain', 'Light Sensitivity', 'Dizziness', 'Blurry Vision', 'Nausea'],
    chest: ['Tightness', 'Shortness of Breath', 'Palpitations', 'Sharp Pain on Inhale'],
    abdomen: ['Cramping', 'Bloating', 'Indigestion', 'Lower Right Pain'],
    limbs: ['Joint Stiffness', 'Numbness in Fingers', 'Swelling', 'Muscle Ache']
  };

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      
      <div className="glass-card p-6 rounded-3xl space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">AI Symptom Assessment</h1>
            <p className="text-xs text-slate-500">Interactive body mapping & triage risk analysis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Controls */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl space-y-6">
          
          {/* Step 1: Body Part */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step 1: Select Affected Region
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'head', label: 'Head & Neck', icon: '🧠' },
                { id: 'chest', label: 'Chest', icon: '🫀' },
                { id: 'abdomen', label: 'Abdomen', icon: '🩺' },
                { id: 'limbs', label: 'Arms & Legs', icon: '🦴' },
              ].map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedBodyPart(part.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedBodyPart === part.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl block mb-1">{part.icon}</span>
                  <span className="text-xs">{part.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Specific Symptoms */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step 2: Check Experienced Symptoms
            </label>
            <div className="flex flex-wrap gap-2">
              {symptomOptions[selectedBodyPart].map((sym) => {
                const active = selectedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    onClick={() => toggleSymptom(sym)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-blue-100 border-blue-300 text-blue-700 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}{sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Severity Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-400 uppercase tracking-wider">
                Step 3: Pain Intensity ({severity}/10)
              </label>
              <span className={`font-bold ${severity > 7 ? 'text-red-600' : 'text-blue-600'}`}>
                {severity <= 3 ? 'Mild' : severity <= 7 ? 'Moderate' : 'Severe Risk'}
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <button 
            onClick={() => setIsAnalyzed(true)}
            className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold text-sm shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Triage Report</span>
          </button>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-4">
          {isAnalyzed ? (
            <div className="glass-card p-6 rounded-3xl space-y-6 border-blue-300 bg-gradient-to-b from-blue-50/50 to-white animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Diagnostic Triage</span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-xs">
                  Moderate Concern
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">Vascular / Migraine Headache</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Based on throbbing pain and photophobia with severity level {severity}/10. 84% clinical match with primary migraine presentation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                <p className="text-xs font-bold text-slate-900">Recommended Steps:</p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Dim ambient room lighting</li>
                  <li>Hydrate with electrolytes</li>
                  <li>Consult Neurologist if pain escalates</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => onNavigate('chat')}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Chat with AI</span> &rarr;
                </button>
                <button 
                  onClick={() => onNavigate('appointments')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Book Doctor
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-3xl text-center space-y-4 border-dashed border-slate-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">Complete Steps 1-3</h3>
              <p className="text-xs text-slate-500">
                Select your symptoms and click "Generate AI Triage Report" to view instant risk scores.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
