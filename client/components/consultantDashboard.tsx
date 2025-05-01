'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { SidebarNav } from './sidebar-nav';
import DashBoard_Navbar from './dashboard_navbar';
import { consultantService } from '@/app/api/api';

interface ConsultantProfile {
  id: number;
  specialty: string;
  experience: number;
  available: boolean;
}

interface Appointment {
  id: number;
  user: {
    username: string;
  };
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function ConsultantDashboard() {
  const [profile, setProfile] = useState<ConsultantProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState(0);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchAppointments();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await consultantService.getConsultantProfile();
      setProfile(data);
      setSpecialty(data.specialty);
      setExperience(data.experience);
      setAvailable(data.available);
    } catch (error) {
      toast.error('Failed to load profile');
      console.log(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await consultantService.getConsultantAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to load appointments');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await consultantService.updateProfile({
        specialty,
        experience,
        available
      });
      setEditing(false);
      toast.success('Profile updated successfully');
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
      console.log(error);
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId: number, status: string) => {
    try {
      await consultantService.updateAppointmentStatus(appointmentId, status);
      toast.success('Appointment status updated');
      fetchAppointments();
    } catch (error) {
      toast.error('Failed to update appointment status');
      console.log(error);
    }
  };

  const handleDeleteAppointment = async (appointmentId: number) => {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }
  
    try {
      console.log('Attempting to delete appointment:', appointmentId); // Add logging
      await consultantService.deleteAppointment(appointmentId);
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
      toast.success('Appointment deleted successfully');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Delete appointment error:', errorMessage); // Add logging
      toast.error(`Failed to delete appointment: ${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
      <SidebarNav className="w-full md:w-64" />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <DashBoard_Navbar />
        <h2 className="text-2xl font-bold text-white mb-4 mt-5">Consultant Dashboard</h2>
        
        {/* Profile Section */}
        <div className="bg-[#191919] rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Consultant Profile</h2>
          {editing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Specialty</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full p-2 bg-[#2A2A2A] text-white rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Experience (years)</label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(parseInt(e.target.value))}
                  className="w-full p-2 bg-[#2A2A2A] text-white rounded"
                  required
                />
              </div>
              <div className="flex items-center">
                <label className="text-gray-300 mr-4">Available</label>
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="text-gray-300">Specialty: {profile?.specialty}</p>
              <p className="text-gray-300">Experience: {profile?.experience} years</p>
              <p className="text-gray-300">Status: {profile?.available ? 'Available' : 'Not Available'}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Appointments Section */}
        <div className="bg-[#191919] rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Your Appointments</h2>
          {loading ? (
            <div className="text-center py-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-gray-400">No appointments yet</p>
          ) : (
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-[#232323] p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium">
                        Patient: {appointment.user.username}
                      </h3>
                      <p className="text-gray-400">
                        Date: {new Date(appointment.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-400">Time: {appointment.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={appointment.status}
                        onChange={(e) => handleUpdateAppointmentStatus(appointment.id, e.target.value)}
                        className="bg-[#2A2A2A] text-white rounded p-2"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}