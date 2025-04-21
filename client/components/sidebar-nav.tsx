import { Home, Calendar, MessageCircle, HelpCircle, Settings, Upload, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import type React from "react" // Added import for React
import Image from "next/image"
import Link from "next/link"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  link: string
}

function NavItem({ icon, label, active, link }: NavItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer",
        active ? "bg-[#6d08c3] text-white" : "text-gray-400 hover:bg-[#191919] hover:text-white",
      )}
    >
      <Link href={link} >
      {icon} <span className="text-sm font-medium">{label}</span>
      </Link>
    </div>
  )
}

export function SidebarNav() {
  return (
    <div className="w-[240px] bg-[#121212] h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2">
      </div>
      <nav className="mt-8 space-y-2">
        <NavItem icon={<Home size={20} />} link="/dashboard" label="Home" active />
        <NavItem icon={<Calendar size={20} />} link="/comments" label="Community" />
        <NavItem icon={<Store size={20} />} link="/marketplace" label="Marketplace" />
        <NavItem icon={<MessageCircle size={20} />} link="/chat" label="Chat" />
      </nav>
      <div className="mt-auto space-y-2">
        <NavItem icon={<HelpCircle size={20} />} link="/help" label="Help" />
        {/* <NavItem icon={<Settings size={20} />} link="/settings" label="Settings" /> */}
        <NavItem icon={<Upload size={20} />} link="/upgrade" label="Upgrade" />
      </div>
    </div>
  )
}

