"use client";
import { SidebarNav } from "@/components/sidebar-nav"
import { ProfileSection } from "@/components/profile-section"
import { BeltSystem } from "@/components/belt-system"
import { GameStats } from "@/components/game-stats"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, MapPin, HeartPulse, Bell, Settings, Loader2 } from "lucide-react"
import dynamic from 'next/dynamic'
import { useState, useEffect } from "react";

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
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search here"
              className="w-full pl-10 pr-4 py-2 bg-[#191919] rounded-lg text-white placeholder-gray-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>
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
                <Button variant="ghost" className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5" />
                  <span>Medical Info</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={triggerSOS}
                className="bg-red-600 hover:bg-red-700 text-white col-span-1 py-6 flex flex-col items-center gap-2"
              >
                <AlertTriangle className="w-8 h-8" />
                <span className="text-lg font-bold">SOS EMERGENCY</span>
              </Button>
              
              <div className="bg-[#121212] rounded-lg p-4 col-span-2">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Live Location Tracking
                </h3>
                <div className="h-64 rounded-lg overflow-hidden">
                    <div className="h-64 rounded-lg overflow-hidden">
                        {/* Always show loading state */}
                        <div className="h-full bg-gray-800 flex items-center justify-center text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mr-2" />
                            Loading map...
                        </div>
                        </div>
                    </div>
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