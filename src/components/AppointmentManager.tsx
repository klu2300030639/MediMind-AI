import React, { useState } from 'react';
import { ScreenId, Appointment } from '../types';
import { 
  Calendar, 
  Clock, 
  Video, 
  UserCheck, 
  Star, 
  Plus, 
  Search, 
  CheckCircle2 
} from 'lucide-react';

interface AppointmentManagerProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AppointmentManager: React.FC<AppointmentManagerProps> = ({ onNavigate }) => {
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Elena Rostova',
      specialty: 'Neurology Specialist',
      date: 'Tomorrow, Aug 3',
      time: '10:30 AM',
      type: 'Video Call',
      status: 'Confirmed',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      doctorName: 'Dr. Marcus Vance',
      specialty: 'Cardiologist',
      date: 'Friday, Aug 7',
      time: '02:00 PM',
      type: 'In-Person',
      status: 'Confirmed',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  const [bookingModal, setBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const doctorsList = [
    { name: 'Dr. Elena Rostova', specialty: 'Neurologist', rating: '4.9', reviews: 124, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80' },
    { name: 'Dr. Marcus Vance', specialty: 'Cardiologist', rating: '4.8', reviews: 98, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Dr. Priya Sharma', specialty: 'General Practitioner', rating: '5.0', reviews: 210, img: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?w=150&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Appointment Manager</h1>
            <p className="text-xs text-slate-500">Book consultations & access live telehealth rooms</p>
          </div>
        </div>

        <button 
          onClick={() => setBookingModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Book Specialist Doctor</span>
        </button>
      </div>

      {/* Upcoming Consultations Section */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Your Scheduled Consultations</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((apt) => (
            <div key={apt.id} className="glass-card p-6 rounded-3xl space-y-4 border-blue-200">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                  {apt.status}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-blue-600" /> {apt.type}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img 
                  src={apt.avatar} 
                  alt={apt.doctorName} 
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-base text-slate-900">{apt.doctorName}</h4>
                  <p className="text-xs text-slate-500">{apt.specialty}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs flex items-center justify-between font-semibold text-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{apt.time}</span>
                </div>
              </div>

              <button 
                onClick={() => alert(`Entering telehealth video room for ${apt.doctorName}...`)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
              >
                Join Video Telehealth Room
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Directory Section */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">Featured Clinical Specialists</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctorsList.map((doc, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-3">
                <img src={doc.img} alt={doc.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-sm text-slate-900">{doc.name}</p>
                  <p className="text-xs text-slate-500">{doc.specialty}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" /> {doc.rating} ({doc.reviews})
                </span>
                <button 
                  onClick={() => {
                    setSelectedDoctor(doc.name);
                    setBookingModal(true);
                  }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-extrabold text-lg text-slate-900">Schedule Consultation</h3>
            <p className="text-xs text-slate-500">Selecting slot for {selectedDoctor || 'Dr. Elena Rostova'}</p>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">Select Date:</label>
              <input type="date" defaultValue="2026-08-04" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">Available Times:</label>
              <div className="grid grid-cols-3 gap-2">
                {['09:00 AM', '11:30 AM', '03:00 PM'].map((t) => (
                  <button key={t} className="p-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setBookingModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={() => {
                alert("Consultation booked! Added to your calendar.");
                setBookingModal(false);
              }} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
