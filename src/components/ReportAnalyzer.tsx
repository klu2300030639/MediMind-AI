import React, { useState } from 'react';
import { ScreenId, LabResult } from '../types';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  FileCheck,
  ArrowRight
} from 'lucide-react';

interface ReportAnalyzerProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ReportAnalyzer: React.FC<ReportAnalyzerProps> = ({ onNavigate }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [reportLoaded, setReportLoaded] = useState(true);

  const [labResults] = useState<LabResult[]>([
    { parameter: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', range: '12.0 - 15.5', status: 'Normal' },
    { parameter: 'Total Cholesterol', value: '215', unit: 'mg/dL', range: '< 200', status: 'Elevated' },
    { parameter: 'Fasting Blood Sugar', value: '92', unit: 'mg/dL', range: '70 - 99', status: 'Normal' },
    { parameter: 'Glycated Hemoglobin (HbA1c)', value: '5.4', unit: '%', range: '< 5.7', status: 'Normal' },
    { parameter: 'Vitamin D (25-OH)', value: '28', unit: 'ng/mL', range: '30 - 100', status: 'Low' },
  ]);

  const handleSimulateUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setReportLoaded(true);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">AI Report Analyzer & OCR Triage</h1>
            <p className="text-xs text-slate-500">Automated lab PDF extraction & biomarker analysis</p>
          </div>
        </div>

        <button 
          onClick={handleSimulateUpload}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition-all shadow-md"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Lab PDF / Scan</span>
        </button>
      </div>

      {/* Upload Zone */}
      <div 
        onClick={handleSimulateUpload}
        className="glass-card p-8 rounded-3xl text-center border-dashed border-2 border-slate-300 hover:border-teal-500 cursor-pointer transition-all space-y-3"
      >
        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
          {analyzing ? <Sparkles className="w-8 h-8 animate-spin" /> : <UploadCloud className="w-8 h-8" />}
        </div>
        <h3 className="font-bold text-base text-slate-800">
          {analyzing ? 'MediMind OCR Extracting Biomarkers...' : 'Drag & Drop Blood Test or MRI PDF Here'}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Supports Quest Diagnostics, LabCorp, and standard clinical PDF formats with 99.2% parsing accuracy.
        </p>
      </div>

      {/* Analyzed Biomarkers Table */}
      {reportLoaded && (
        <div className="glass-card p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-600" />
              <h3 className="font-extrabold text-base text-slate-900">Comprehensive Metabolic Panel Findings</h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">Source: Quest Diagnostics (Aug 2026)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Biomarker Parameter</th>
                  <th className="p-3">Patient Value</th>
                  <th className="p-3">Reference Range</th>
                  <th className="p-3 rounded-r-xl">Diagnostic Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {labResults.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">{item.parameter}</td>
                    <td className="p-3 font-extrabold text-slate-900">{item.value} <span className="font-normal text-slate-500">{item.unit}</span></td>
                    <td className="p-3 text-slate-500">{item.range}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                        item.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Elevated' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status === 'Normal' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Clinical Summary */}
          <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>AI Physician Summary Note</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "Your overall metabolic panel is stable. Total cholesterol shows mild elevation (215 mg/dL). We recommend continuing low-saturated-fat dietary adjustments and supplementing Vitamin D3 (2000 IU daily)."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
