import React, { useState } from 'react';
import { ScreenId, Medication } from '../types';
import { 
  Pill, 
  CheckCircle2, 
  Clock, 
  Plus, 
  AlertCircle, 
  RefreshCw,
  Calendar
} from 'lucide-react';

interface MedicineReminderProps {
  onNavigate: (screen: ScreenId) => void;
}

export const MedicineReminder: React.FC<MedicineReminderProps> = ({ onNavigate }) => {
  const [meds, setMeds] = useState<Medication[]>([
    { id: '1', name: 'Vitamin D3 (2000 IU)', dosage: '1 Capsule', time: '08:00 AM', slot: 'Morning', taken: true, refillLeft: 28 },
    { id: '2', name: 'Amoxicillin 500mg', dosage: '1 Tablet', time: '01:30 PM', slot: 'Noon', taken: true, refillLeft: 4 },
    { id: '3', name: 'Atorvastatin 10mg', dosage: '1 Pill', time: '09:00 PM', slot: 'Bedtime', taken: false, refillLeft: 12 },
    { id: '4', name: 'Omega-3 Fish Oil', dosage: '2 Softgels', time: '09:00 PM', slot: 'Bedtime', taken: false, refillLeft: 45 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedName, setNewMedName] = useState('');

  const toggleMed = (id: string) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const handleAddMed = () => {
    if (!newMedName) return;
    const newMed: Medication = {
      id: Date.now().toString(),
      name: newMedName,
      dosage: '1 Dose',
      time: '08:00 AM',
      slot: 'Morning',
      taken: false,
      refillLeft: 30
    };
    setMeds([...meds, newMed]);
    setNewMedName('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Medication Cabinet & Schedule</h1>
            <p className="text-xs text-slate-500">Track daily dosages & automated refill reminders</p>
          </div>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Prescription</span>
        </button>
      </div>

      {/* Medication List */}
      <div className="space-y-4">
        {['Morning', 'Noon', 'Bedtime'].map((slotName) => {
          const slotMeds = meds.filter(m => m.slot === slotName);
          if (slotMeds.length === 0) return null;

          return (
            <div key={slotName} className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> {slotName} Schedule
              </h3>

              <div className="space-y-3">
                {slotMeds.map((med) => (
                  <div 
                    key={med.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      med.taken ? 'bg-slate-50 border-slate-200' : 'bg-white border-blue-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleMed(med.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                          med.taken ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-blue-500'
                        }`}
                      >
                        {med.taken && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div>
                        <p className={`font-bold text-sm ${med.taken ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {med.name}
                        </p>
                        <p className="text-xs text-slate-500">{med.dosage} &bull; {med.time} &bull; Refills Left: {med.refillLeft}</p>
                      </div>
                    </div>

                    {med.refillLeft <= 5 && (
                      <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold text-[10px] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Low Refill
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-extrabold text-lg text-slate-900">Add New Medication</h3>
            <input 
              type="text" 
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
              placeholder="Medication Name (e.g. Metformin 500mg)"
              className="w-full p-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddMed}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
              >
                Save Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
