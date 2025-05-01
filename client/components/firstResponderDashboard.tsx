"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DashBoard_Navbar from "@/components/dashboard_navbar";
import { SidebarNav } from "@/components/sidebar-nav";
import { toast } from "sonner";

interface SOSMessage {
  id: string;
  message: string;
  type: string;
  createdAt: string;
  youth: {
    username: string;
    email: string;
  };
  location: {
    latitude: number;
    longitude: number;
    createdAt: string;
  };
}

export default function FirstResponderDashboard() {
  const [messages, setMessages] = useState<SOSMessage[]>([]);
  const [selected, setSelected] = useState<SOSMessage | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/first-responder/sos`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch SOS messages");
        return res.json();
      })
      .then(setMessages)
      .catch((err) => toast.error(err.message));
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
          <SidebarNav className="w-full md:w-64" />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <DashBoard_Navbar />
      <h1 className="text-2xl font-bold mb-6 mt-5">First Responder Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl text-white mb-4">SOS Message History</h2>
            <ul className="space-y-3">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className="bg-[#232323] p-4 rounded cursor-pointer hover:bg-[#2A2A2A]"
                  onClick={() => setSelected(msg)}
                >
                  <div className="text-white font-semibold">{msg.message}</div>
                  <div className="text-gray-400 text-xs">
                    From: {msg.youth.username} ({msg.youth.email}) | {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selected ? (
              <div className="bg-[#232323] p-6 rounded">
                <h3 className="text-lg font-bold text-white mb-2">SOS Details</h3>
                <div className="text-gray-200 mb-2">
                  <strong>Message:</strong> {selected.message}
                </div>
                <div className="text-gray-200 mb-2">
                  <strong>Type:</strong> {selected.type}
                </div>
                <div className="text-gray-200 mb-2">
                  <strong>User:</strong> {selected.youth.username} ({selected.youth.email})
                </div>
                <div className="text-gray-200 mb-2">
                  <strong>Time:</strong> {new Date(selected.createdAt).toLocaleString()}
                </div>
                <div className="text-gray-200 mb-2">
                  <strong>Location:</strong>{" "}
                  <a
                    href={`https://www.google.com/maps?q=${selected.location.latitude},${selected.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    {selected.location.latitude}, {selected.location.longitude}
                  </a>
                  <div className="text-xs text-gray-400">
                    Last updated: {new Date(selected.location.createdAt).toLocaleString()}
                  </div>
                </div>
                <Button className="mt-4" onClick={() => setSelected(null)}>
                  Close
                </Button>
              </div>
            ) : (
              <div className="text-gray-400">Select a message to view details</div>
            )}
          </div>

        </div>
        </main>
      
    </div>
  );
}