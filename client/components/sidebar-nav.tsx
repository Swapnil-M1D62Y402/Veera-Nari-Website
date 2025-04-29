import { Home, Calendar, MessageCircle, HelpCircle, Store, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  link: string
}

interface SidebarNavProps {
  className?: string;
}

function NavItem({ icon, label, active, link, onClick }: NavItemProps & { onClick?: () => void }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer",
        active ? "bg-[#6d08c3] text-white" : "text-gray-400 hover:bg-[#191919] hover:text-white",
      )}
      onClick={onClick}
    >
      <Link href={link} className="flex items-center gap-3 w-full">
        {icon} <span className="text-sm font-medium">{label}</span>
      </Link>
    </div>
  )
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [open, setOpen] = useState(false)

  const navItems = [
    { icon: <Home size={20} />, link: "/dashboard", label: "Home", active: true },
    { icon: <Calendar size={20} />, link: "/comments", label: "Community" },
    { icon: <Store size={20} />, link: "/marketplace", label: "Marketplace" },
    { icon: <MessageCircle size={20} />, link: "/chat", label: "Chat" },
    { icon: <HelpCircle size={20} />, link: "/help", label: "Help" }
  ]

  return (
    <>
      {/* Mobile View */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="fixed top-4 left-4 z-[60] p-2 bg-[#191919] rounded-lg md:hidden">
          <Menu className="w-6 h-6 text-white" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] bg-[#121212] p-0 z-[70]">
          <SheetHeader className="p-4">
            <SheetTitle className="text-white">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full p-4">
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <NavItem 
                  key={index}
                  {...item}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop View */}
      <div className={cn(
        "hidden md:flex w-[240px] bg-[#121212] h-screen p-4 flex-col",
        className
      )}>
        <nav className="mt-8 space-y-2">
          {navItems.map((item, index) => (
            <NavItem 
              key={index}
              {...item}
            />
          ))}
        </nav>
      </div>
    </>
  )
}

