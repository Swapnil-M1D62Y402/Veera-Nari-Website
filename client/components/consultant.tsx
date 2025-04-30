'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { User } from 'lucide-react';
import { SidebarNav } from './sidebar-nav';
import DashBoard_Navbar from './dashboard_navbar';
import { consultantService } from '@/app/api/api';

// Define TypeScript interfaces
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AppointmentData {
  consultantId: number;
  date: string;
  time: string;
  status?: string;
}

interface Appointment {
  id: number;
  consultant: {
    user: {
      username: string;
    };
    specialty: string;
  };
  date: string;
  time: string;
  status: string;
}

export default function DoctorAppointment() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [loadingAppointments, setLoadingAppointments] = useState<boolean>(true);
  const [reason, setReason] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // const router = useRouter();


  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await consultantService.getAllConsultants();
      console.log('Received doctors data:', data);
      setDoctors(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);
      const data = await consultantService.getUserAppointments();
      console.log('User appointments:', data);
      setAppointments(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage);
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  // Handle doctor selection
  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSuccessMessage('');
  };

  // Handle appointment submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      setError('Please fill all required fields');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const appointmentData: AppointmentData = {
        consultantId: selectedDoctor.id,
        date: appointmentDate,
        time: appointmentTime,
        status: 'pending'
      };
      
      await consultantService.bookAppointment(appointmentData);

      setSuccessMessage(`Appointment booked successfully with ${selectedDoctor.name}`);
      toast.success(`Appointment booked successfully with ${selectedDoctor.name}`);

      // Reset form and show success message
      setSelectedDoctor(null);
      setAppointmentDate('');
      setAppointmentTime('');
      setReason('');
      
      // Reload appointments and doctors
      fetchDoctors();
      fetchAppointments();
    
      // Optional: Scroll to top
      window.scrollTo(0, 0);
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to book appointment: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
          <SidebarNav className="w-full md:w-64" />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <DashBoard_Navbar />
      <h1 className="text-2xl font-bold mb-6 mt-5">Book a Doctor Consultation</h1>
      
      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">Loading available doctors...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor listing */}
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>
            <div className="grid grid-cols-1 gap-4">
              {doctors.length === 0 ? (
                <p>No doctors available at the moment.</p>
              ) : (
                doctors.map((doctor) => (
                  <div 
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors bg-slate-500 ${
                      selectedDoctor?.id === doctor.id 
                        ? 'bg-blue-100 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden mr-4 flex items-center justify-center text-blue-500">
                        <User size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-black">Dr. {doctor.name}</h3>
                        <p className="text-sm text-black">{doctor.specialty}</p>
                        <p className="text-sm text-black">Experience: {doctor.experience} years</p>
                      </div>
                      {doctor.available && (
                        <span className="ml-auto px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Appointment form */}
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
            
            {selectedDoctor ? (
              <form onSubmit={handleSubmit} className="border rounded-lg p-6">
                <div className="mb-4">
                  <p className="font-medium">Selected Doctor</p>
                  <p>Dr. {selectedDoctor.name} - {selectedDoctor.specialty}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="date">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full p-2 border rounded text-gray-900"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="time">
                    Time *
                  </label>
                  <select
                    id="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  >
                    <option value="">Select a time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                
                {/* <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="reason">
                    Reason for Consultation
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2 border rounded text-gray-900"
                    rows={3}
                  ></textarea>
                </div> */}
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctor(null)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {submitting ? 'Booking...' : 'Book Appointment'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="border rounded-lg p-6 text-center bg-gray-50">
                <p className="text-gray-500">Please select a doctor from the list to book an appointment</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
            {loadingAppointments ? (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-2">Loading your appointments...</p>
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-gray-500">You have no appointments yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg bg-white shadow">
                    <h3 className="font-medium text-gray-800">
                      Appointment with Dr. {appointment.consultant.user.username}
                    </h3>
                    <p className="text-sm text-gray-600">Specialty: {appointment.consultant.specialty}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(appointment.date).toLocaleDateString()} | Time: {appointment.time}
                    </p>
                    <p className={`text-sm font-medium ${appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      Status: {appointment.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
      </main>
    </div>
  );
}