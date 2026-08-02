import { useState, useEffect } from 'react';
import { ScreenId, UserProfile } from '../types';
import { Calendar, MapPin, Star, Video, Clock, CheckCircle, Navigation, Stethoscope, Phone, ShieldCheck } from 'lucide-react';

interface AppointmentManagerProps {
  onNavigate: (screen: ScreenId) => void;
  userProfile?: UserProfile | null;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  clinicAddress: string;
  distanceKm: number;
  availableTime: string;
  fee: string;
  image: string;
}

export function AppointmentManager({ onNavigate, userProfile }: AppointmentManagerProps) {
  const [userLocation, setUserLocation] = useState<string>(
    userProfile?.city && userProfile?.state 
      ? `${userProfile.city}, ${userProfile.state}, ${userProfile.country || 'India'}`
      : 'Guntur, Andhra Pradesh, India'
  );
  
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsNotice, setGpsNotice] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Sharma, MD',
      specialty: 'Neurology & Headache Specialist',
      rating: 4.9,
      clinicAddress: `Apollo Specialty Hospital, ${userLocation}`,
      distanceKm: 1.2,
      availableTime: 'Today, 04:30 PM',
      fee: '$50 / ₹500',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      name: 'Dr. Ananya Reddy, MD',
      specialty: 'General Physician & Internal Medicine',
      rating: 4.8,
      clinicAddress: `MediCare Healthcare Hub, ${userLocation}`,
      distanceKm: 2.4,
      availableTime: 'Today, 06:00 PM',
      fee: '$40 / ₹400',
      image: 'https://images.unsplash.com/photo-1594824813566-88855ce78347?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      name: 'Dr. Vikram Patel, MS',
      specialty: 'Orthopedics & Spine Specialist',
      rating: 4.9,
      clinicAddress: `City Ortho Clinic, ${userLocation}`,
      distanceKm: 4.1,
      availableTime: 'Tomorrow, 10:00 AM',
      fee: '$60 / ₹600',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      setGpsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);
          setUserLocation(`Live GPS Location (${lat}, ${lon})`);
          setGpsNotice(`📍 Live GPS detected! Specialists filtered within 5.0 km radius of your coordinates.`);
          setGpsLoading(false);
        },
        (error) => {
          console.error(error);
          setGpsNotice(`📍 Location set to your registered address: ${userLocation}`);
          setGpsLoading(false);
        }
      );
    } else {
      setGpsNotice(`📍 Location set to: ${userLocation}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 animate-in fade-in">
      
      {/* Top Location Bar (REQ 6) */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-4 h-4 text-emerald-400" />
            Location-Based Specialist Finder
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold flex items-center gap-2">
            Specialists Near: <span className="text-blue-300 underline">{userLocation}</span>
          </h1>
          <p className="text-xs text-blue-100">Showing top rated doctors within a 5 km radius of your current location</p>
        </div>

        <button
          onClick={handleDetectGPS}
          disabled={gpsLoading}
          className="bg-white hover:bg-blue-50 text-blue-900 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow flex items-center gap-2"
        >
          <MapPin className="w-4 h-4 text-red-500" />
          <span>{gpsLoading ? 'Detecting GPS...' : 'Detect Live GPS Location'}</span>
        </button>
      </div>

      {gpsNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{gpsNotice}</span>
        </div>
      )}

      {/* Doctor Directory */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#0066FF]" />
          Available Doctors Near You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-2xl object-cover shadow" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{doc.name}</h3>
                    <p className="text-xs text-blue-600 font-medium">{doc.specialty}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{doc.rating} Rating</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {doc.clinicAddress}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 mt-1">
                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">{doc.distanceKm} km away</span>
                    <span className="font-bold text-slate-900">{doc.fee}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedDoctor(doc);
                  setBookingSuccess(true);
                }}
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment ({doc.availableTime})</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {bookingSuccess && selectedDoctor && (
        <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-emerald-200" />
            <div>
              <p className="font-bold text-sm">Appointment Booked Successfully!</p>
              <p className="text-xs text-emerald-100">Scheduled with {selectedDoctor.name} at {selectedDoctor.clinicAddress} for {selectedDoctor.availableTime}.</p>
            </div>
          </div>
          <button onClick={() => setBookingSuccess(false)} className="text-xs bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-xl">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
