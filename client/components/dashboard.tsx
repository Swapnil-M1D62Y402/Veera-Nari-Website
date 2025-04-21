"use client";
// Remove unused imports
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, MapPin, HeartPulse, Settings, Loader2 } from "lucide-react"
import dynamic from 'next/dynamic'
import { useState, useEffect } from "react";
import LocationTracker from "./LocationTracker";
import DashBoard_Navbar from "./dashboard_navbar";

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import('@/components/live_map'), {
  ssr: false
})

export default function DashboardComponent() {
  const triggerSOS = () => {
    // Implement SOS functionality
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      alert(`SOS triggered! Your location: ${latitude}, ${longitude}`)
      // In a real app, send this to emergency contacts/API
    })
    }
    
    const [userLocation] = useState<[number, number]>([51.505, -0.09]); // London coordinate

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <SidebarNav />
      <main className="flex-1 p-6">
      <DashBoard_Navbar />

        <div className="space-y-6">
          {/* Emergency Section */}
          <div className="bg-[#191919] rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-10">Safety Tools</h2>
            <div className="flex justify-between items-center mb-4">
              
            <div className="bg-[#121212] rounded-lg p-4 w-full">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Live Location Tracking
                </h3>
                <div className="flex flex-col lg:flex-row h-[500px] w-full gap-4 rounded-lg overflow-hidden">
                  {/* Map Section */}
                  <div className="flex-1 w-[500]">
                    <LocationTracker />
                  </div>

                  {/* Quick Actions Section */}
                  <div className="bg-[#191919] rounded-lg p-4 flex-1 max-w-[400px]">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex flex-col h-20">
                        <span>Share Location</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-20">
                        <span>Check-in</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-20">
                        <span>Safety Tips</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-20">
                        <span>Contacts</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

          </div>
          </div>

        </div>
      </main>
    </div>
  )
}