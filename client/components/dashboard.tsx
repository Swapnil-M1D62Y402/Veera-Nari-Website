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

// Add this near the top of your dashboard.tsx file after imports
const EMERGENCY_MESSAGES = [
  { id: 'following', text: 'Someone is following me' },
  { id: 'stalking', text: 'Someone is stalking me, send help' },
  { id: 'accident', text: 'I am in an accident' },
  { id: 'medical', text: 'I need medical assistance' },
  {id: 'custom', text: 'Custom message'}
] as const;

export default function DashboardComponent() {
  const [trustedEmail, setTrustedEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmergency, setSelectedEmergency] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');

  const handleShareLocation = async () => {
    if (!trustedEmail) {
      toast.error("Please set a trusted email contact first");
      setIsEditing(true);
      return;
    }

    try {

      const message = selectedEmergency === 'custom'
        ? customMessage
        : EMERGENCY_MESSAGES.find(msg => msg.id == selectedEmergency)?.text || '';

      await sosService.sendSOS({
          message: message || 'Emergency Alert!',
          type: selectedEmergency || 'general'
        });
      console.log("Sos Successfully Sent");
      toast.success("Emergency SOS sent successfully");
    } catch (error) {
      toast.error("Failed to send Emergency SOS");
      console.error("SOS Error: ", error);
    }
  };

  const handleUpdateTrustedEmail = async () => {
    if (!trustedEmail || !trustedEmail.includes("@")) {
      toast.error("Please enter a valid email address");
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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
      <SidebarNav className="w-full md:w-64" />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        <DashBoard_Navbar />

        <div className="space-y-4 md:space-y-6">
          {/* Safety Tools Section */}
          <div className="bg-[#191919] rounded-lg p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-10">
              Safety Tools
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Map Container */}
              <div className="w-full lg:flex-1 bg-[#121212] rounded-lg p-3 md:p-4">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2 text-sm md:text-base">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  Live Location Tracking
                </h3>
                <div className="h-[300px] md:h-[500px] w-full relative z-0">
                  <LocationTracker />
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="w-full lg:w-[300px] bg-[#191919] rounded-lg p-3 md:p-4">
                <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <div className="flex flex-col gap-2">
                    <select
                      value={selectedEmergency}
                      onChange={(e) => setSelectedEmergency(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600 focus:border-blue-500"
                    >
                      <option value="">Select emergency type</option>
                      {EMERGENCY_MESSAGES.map((msg) => (
                        <option key={msg.id} value={msg.id}>
                          {msg.text}
                        </option>
                      ))}
                    </select>

                    {selectedEmergency === 'custom' && (
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Type your custom message..."
                        className="w-full p-2 rounded-lg bg-[#2A2A2A] text-white border border-gray-600 focus:border-blue-500 min-h-[80px]"
                      />
                    )}

                    <Button
                      variant="outline"
                      className="flex flex-col h-16 md:h-20 bg-red-400 w-full text-white hover:bg-red-500"
                      onClick={handleShareLocation}
                      disabled={!trustedEmail || (selectedEmergency === 'custom' && !customMessage)}
                    >
                      <span className="text-sm md:text-base">
                        {selectedEmergency ? 'Send Emergency Alert' : 'Share Location'}
                      </span>
                    </Button>
                  </div>

                  {/* Trusted Email Section */}
                  <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-[#232323] p-3 md:p-4 rounded-lg mt-2 md:mt-4">
                    <h3 className="text-white font-medium mb-2 text-sm md:text-base">
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

          {/* Emergency Contacts Section */}
          <div className="bg-[#191919] rounded-lg p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              Emergency Contacts
            </h2>
            <div className="bg-[#121212] rounded-lg p-3 md:p-4">
              <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex justify-between items-center p-2 md:p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-xs md:text-sm">Police</span>
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 text-xs md:text-sm px-2"
                    onClick={() => window.location.href = "tel:100"}
                  >
                    100
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 md:p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-xs md:text-sm">
                    Women Helpline
                  </span>
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 text-xs md:text-sm px-2"
                    onClick={() => window.location.href = "tel:1091"}
                  >
                    1091
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 md:p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-xs md:text-sm">
                    Ambulance
                  </span>
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 text-xs md:text-sm px-2"
                    onClick={() => window.location.href = "tel:102"}
                  >
                    102
                  </Button>
                </div>
                <div className="flex justify-between items-center p-2 md:p-3 bg-[#232323] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                  <span className="text-gray-300 text-xs md:text-sm truncate mr-2">
                    Central Kolkata Hospital
                  </span>
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 text-xs md:text-sm whitespace-nowrap px-2"
                    onClick={() => window.location.href = "tel:+913322040101"}
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
