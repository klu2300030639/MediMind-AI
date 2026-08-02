import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { 
  AlertTriangle, 
  MapPin, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2,
  X
} from 'lucide-react';

interface EmergencySOSProps {
  onNavigate: (screen: ScreenId) => void;
}

export const EmergencySOS: React.FC<EmergencySOSProps> = ({ onNavigate }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [dispatched, setDispatched] = useState(false);

  const startCountdown = () => {
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setDispatched(true);
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      
      <div className="glass-card p-6 rounded-3xl border-red-300 bg-red-50/30 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto sos-pulse shadow-xl">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-red-600">MediMind Emergency Dispatch</h1>
          <p className="text-xs text-slate-600 mt-1">Instant 911 Trigger & Location Broadcast System</p>
        </div>

        {/* SOS Countdown Button */}
        {dispatched ? (
          <div className="p-6 rounded-2xl bg-red-600 text-white space-y-3 animate-in zoom-in-95 shadow-2xl">
            <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
            <h2 className="text-xl font-black">EMERGENCY DISPATCHED</h2>
            <p className="text-xs text-red-100">
              Paramedics notified & GPS coordinates sent to David Jenkins (+1 555-019-2834).
            </p>
            <button 
              onClick={() => setDispatched(false)}
              className="px-4 py-2 rounded-xl bg-white text-red-600 font-extrabold text-xs"
            >
              Cancel Alert Signal
            </button>
          </div>
        ) : countdown !== null ? (
          <div className="p-6 rounded-2xl bg-red-600 text-white space-y-3 animate-pulse">
            <p className="text-sm font-bold">Dispatching Emergency Signal In...</p>
            <span className="text-6xl font-black block">{countdown}</span>
            <button 
              onClick={() => setCountdown(null)}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs"
            >
              Cancel Countdown
            </button>
          </div>
        ) : (
          <button 
            onClick={startCountdown}
            className="w-full max-w-sm py-4 rounded-2xl bg-red-600 text-white font-extrabold text-base shadow-2xl shadow-red-600/40 hover:bg-red-700 active:scale-95 transition-all"
          >
            HOLD 5 SECONDS TO TRIGGER SOS
          </button>
        )}
      </div>

      {/* GPS Location & ER Info */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-600" /> Current Broadcast GPS Location
        </h3>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <p className="font-bold text-slate-900">Coordinates: 37.7749° N, 122.4194° W</p>
          <p className="text-slate-500">San Francisco General Medical Center Area (0.4 miles away)</p>
        </div>

        <div className="flex justify-between items-center p-3 rounded-2xl bg-white border border-slate-200 text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-600" /> Direct 911 Ambulance Hotline
          </span>
          <a href="tel:911" className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold">Call 911</a>
        </div>
      </div>

    </div>
  );
};
