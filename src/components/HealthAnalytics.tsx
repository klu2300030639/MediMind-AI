import React from 'react';
import { ScreenId } from '../types';
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  Watch, 
  Zap, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface HealthAnalyticsProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HealthAnalytics: React.FC<HealthAnalyticsProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Health Vitals & Analytics</h1>
            <p className="text-xs text-slate-500">Continuous telemetry & biometric tracking</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button className="px-3 py-1.5 rounded-xl bg-white text-blue-600 shadow-sm">Weekly</button>
          <button className="px-3 py-1.5 rounded-xl text-slate-600 hover:text-slate-900">Monthly</button>
        </div>
      </div>

      {/* Simulated Chart Container */}
      <div className="glass-card p-6 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Resting Heart Rate Variability</h3>
            <p className="text-xs text-slate-500">7-Day Average: 71 bpm (Optimal Range)</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full">
            Normal Rhythm
          </span>
        </div>

        {/* SVG Graphic Chart */}
        <div className="h-48 w-full bg-gradient-to-b from-blue-50/50 to-transparent rounded-2xl p-4 flex items-end justify-between gap-2 border border-slate-100 relative">
          {[
            { day: 'Mon', val: 68 },
            { day: 'Tue', val: 74 },
            { day: 'Wed', val: 71 },
            { day: 'Thu', val: 69 },
            { day: 'Fri', val: 75 },
            { day: 'Sat', val: 70 },
            { day: 'Sun', val: 72 },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-blue-600/80 rounded-t-xl group-hover:bg-blue-600 transition-all relative"
                style={{ height: `${(bar.val / 100) * 140}px` }}
              >
                <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                  {bar.val}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device Sync Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Connected Device</span>
            <Watch className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="font-bold text-slate-900">Apple Watch Series 9</h4>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Synced 2 mins ago
          </p>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Daily Activity</span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <h4 className="font-bold text-slate-900">8,420 / 10,000 Steps</h4>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[84%]"></div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Blood Oxygen</span>
            <Activity className="w-5 h-5 text-teal-600" />
          </div>
          <h4 className="font-bold text-slate-900">99% SpO2 Rate</h4>
          <p className="text-xs text-slate-500">Optimal blood oxygenation level</p>
        </div>
      </div>
    </div>
  );
};
