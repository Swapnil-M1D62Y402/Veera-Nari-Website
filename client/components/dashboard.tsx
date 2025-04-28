"use client";
import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import LocationTracker from "./LocationTracker";
import DashBoard_Navbar from "./dashboard_navbar";
import { useState, useEffect } from "react";
import { sosService } from "@/app/api/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function DashboardComponent() {
  const [trustedEmail, setTrustedEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleShareLocation = async () => {
    if (!trustedEmail) {
      toast.error('Please set a trusted email contact first');
      setIsEditing(true);
      return;
    }

    try {
      await sosService.sendSOS();
      console.log("Sos Successfully Sent");
      toast.success("Emergency SOS sent successfully");
    } catch (error) {
      toast.error("Failed to send Emergency SOS");
      console.error("SOS Error: ", error);
    }
  };

  const handleUpdateTrustedEmail = async () => {
    if (!trustedEmail || !trustedEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await sosService.updateTrustedEmail(trustedEmail);
      setIsEditing(false);
      toast.success("Trusted email updated successfully");
    } catch (error) {
      toast.error("Failed to update trusted email");
      console.error("Update Error: ", error);
    }
  };

  useEffect(() => {
    const fetchTrustedEmail = async () => {
      try {
        const data = await sosService.getTrustedEmail();
        // Only set email if it exists
        if (data && data.trustedEmail) {
          setTrustedEmail(data.trustedEmail);
        }
      } catch (error) {
        console.error("Failed to fetch trusted email:", error);
        //toast.error("Failed to load trusted contact information");  //dont show toast error if trusted email doesnt exists for new user
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrustedEmail();
  }, []);

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
                <div className="flex lg:flex-row h-[500px] w-full gap-4">
                  {/* Map Section - Fixed height container */}
                  <div className="flex-1 h-full">
                    <LocationTracker />
                  </div>

                  {/* Quick Actions Section - Fixed position */}
                  <div className="bg-[#191919] rounded-lg p-4 w-[300px]">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex flex-col h-20 bg-red-400"
                        onClick={handleShareLocation}
                      >
                        <span>Share Location</span>
                      </Button>

                      {/* Trusted Email Section */}
                      <div className="col-span-2 bg-[#232323] p-4 rounded-lg mt-4">
                        <h3 className="text-white font-medium mb-2">
                          Trusted Contact Email
                        </h3>
                        {isLoading ? (
                          <div className="text-gray-400">Loading...</div>
                        ) : isEditing ? (
                          <div className="flex flex-col gap-2">
                            <Input
                              type="email"
                              value={trustedEmail}
                              onChange={(e) => setTrustedEmail(e.target.value)}
                              className="w-full text-white bg-[#2A2A2A] border-gray-600 focus:border-blue-500"
                              placeholder="Enter trusted email"
                            />
                            <div className="flex gap-2">
                              <Button 
                                onClick={handleUpdateTrustedEmail}
                                className="flex-1"
                              >
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <span className="text-gray-300 break-all">
                              {trustedEmail || "No trusted email set"}
                            </span>
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(true)}
                              className="w-full"
                            >
                              Edit
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="bg-[#191919] rounded-lg p-4 mt-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              Emergency Contacts
            </h2>
            <div className="bg-[#121212] rounded-lg p-4">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex justify-between items-center p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-sm sm:text-base">Police</span>
                  <Button 
                    variant="link" 
                    className="text-blue-400 hover:text-blue-300 text-sm sm:text-base px-2"
                    onClick={() => window.location.href = 'tel:100'}
                  >
                    100
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-sm sm:text-base">Women Helpline</span>
                  <Button 
                    variant="link" 
                    className="text-blue-400 hover:text-blue-300 text-sm sm:text-base px-2"
                    onClick={() => window.location.href = 'tel:1091'}
                  >
                    1091
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-sm sm:text-base">Ambulance</span>
                  <Button 
                    variant="link" 
                    className="text-blue-400 hover:text-blue-300 text-sm sm:text-base px-2"
                    onClick={() => window.location.href = 'tel:102'}
                  >
                    102
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-sm sm:text-base truncate mr-2">Central Kolkata Hospital</span>
                  <Button 
                    variant="link" 
                    className="text-blue-400 hover:text-blue-300 text-sm sm:text-base whitespace-nowrap px-2"
                    onClick={() => window.location.href = 'tel:+913322040101'}
                  >
                    033-2204-0101
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
