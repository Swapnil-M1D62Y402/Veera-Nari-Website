'use client';

import { useState } from 'react';
import { SidebarNav } from './sidebar-nav';
import DashBoard_Navbar from './dashboard_navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Bell, Mail, MessageCircle, Newspaper, Hospital, Shield, Calendar } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
      <SidebarNav className="w-full md:w-64" />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <DashBoard_Navbar />
        <h1 className="text-3xl font-bold text-white mb-6 mt-5">Help Guide</h1>

        <Tabs defaultValue="youth" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="youth">Youth Guide</TabsTrigger>
            <TabsTrigger value="trusted">Trusted Contact Guide</TabsTrigger>
            <TabsTrigger value="responder">First Responder Guide</TabsTrigger>
            <TabsTrigger value="consultant">Consultant Guide</TabsTrigger>
          </TabsList>

          {/* Youth Guide */}
          <TabsContent value="youth" className="space-y-6">
            <div className="bg-[#191919] rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Youth User Guide</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Bell className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">SOS Feature</h3>
                    <p className="text-gray-300">In emergencies, use the SOS button to:</p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                      <li>Send immediate alerts to trusted contacts</li>
                      <li>Share your location with first responders</li>
                      <li>Get quick access to emergency services</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Trusted Contacts</h3>
                    <p className="text-gray-300">Add and manage trusted contacts who will:</p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                      <li>Receive your SOS alerts</li>
                      <li>Get email notifications in emergencies</li>
                      <li>Be able to track your location when needed</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Chat Support</h3>
                    <p className="text-gray-300">Access our chat feature to:</p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                      <li>Connect with support professionals</li>
                      <li>Join community discussions</li>
                      <li>Get real-time assistance</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Hospital className="w-6 h-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Consultant Appointments</h3>
                    <p className="text-gray-300">Book appointments with consultants:</p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                      <li>Choose from available specialists</li>
                      <li>Select convenient time slots</li>
                      <li>Track appointment status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Trusted Contact Guide */}
          <TabsContent value="trusted" className="space-y-6">
            <div className="bg-[#191919] rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Trusted Contact Guide</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Bell className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">SOS Notifications</h3>
                    <p className="text-gray-300">When you receive an SOS alert:</p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                      <li>Immediate email notifications with location details</li>
                      <li>Direct access to emergency contact information</li>
                      <li>Step-by-step guidance for emergency response</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* First Responder Guide */}
          <TabsContent value="responder" className="space-y-6">
            <div className="bg-[#191919] rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">First Responder Guide</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Dashboard Management</h3>
                    <p className="text-gray-300">Using the responder dashboard:</p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                      <li>Monitor real-time SOS alerts</li>
                      <li>Access detailed location information</li>
                      <li>Mark cases as resolved</li>
                      <li>Track emergency response history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Consultant Guide */}
          <TabsContent value="consultant" className="space-y-6">
            <div className="bg-[#191919] rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Consultant Guide</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Profile & Appointments</h3>
                    <p className="text-gray-300">Managing your consultant profile:</p>
                    <ul className="list-disc list-inside text-gray-300 ml-4">
                      <li>Update your specialty and experience</li>
                      <li>Set your availability status</li>
                      <li>View and manage appointments</li>
                      <li>Update appointment status (confirm/cancel)</li>
                      <li>Mark completed appointments as done</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}