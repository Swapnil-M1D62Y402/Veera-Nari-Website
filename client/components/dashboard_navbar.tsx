'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner'


export default function DashBoard_Navbar() {

  const {logout} = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/logo_2.png"
            alt="logo"
            width={130}
            height={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/about" className="transition-colors hover:text-primary">
            About Us
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="https://github.com/Swapnil-M1D62Y402/Veera-Nari-Website" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleLogout}
              className="mt-auto"
            > 
              Logout 
            </Button>
        </div>
      </div>
    </header>
  )
}