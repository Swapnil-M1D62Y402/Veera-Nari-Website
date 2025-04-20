"use client";
// Remove unused imports
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, MapPin, HeartPulse, Settings, Loader2 } from "lucide-react"
import dynamic from 'next/dynamic'
import { useState, useEffect } from "react";
import LocationTracker from "./LocationTracker";

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
        <div className="flex items-center justify-end gap-4 mb-2">
          <div className="flex items-center gap-4">
            <Button variant="outline">Logout</Button>
            <div className="w-10 h-10 rounded-full bg-[#191919] flex items-center justify-center">
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Emergency Section */}
          <div className="bg-[#191919] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Safety Tools</h2>
              <div className="flex gap-2">
              </div>
            </div>
          </div>

          <div className="bg-[#121212] rounded-lg p-4 col-span-2">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Live Location Tracking
                </h3>
                <div className="h-80 rounded-lg overflow-hidden">
                    <div className="h-64 rounded-lg overflow-hidden">
                    <LocationTracker />
                    </div>
                </div>
            </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#191919] rounded-lg p-4">
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                {/* Activity timeline component would go here */}
                <div className="text-gray-400 text-center py-8">
                  Activity feed coming soon
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#191919] rounded-lg p-4">
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
      </main>
    </div>
  )
}