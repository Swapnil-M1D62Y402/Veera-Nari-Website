'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-6 mx-auto flex h-14 items-center justify-between max-w-7xl">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-6 pt-6">
                  {/* Mobile menu links */}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo_2.png"
              alt="logo"
              width={130}
              height={100}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/marketplace" className="transition-colors hover:text-primary">
            Marketplace
          </Link>
          <Link href="/community" className="transition-colors hover:text-primary">
            Community
          </Link>
          <Link href="/about" className="transition-colors hover:text-primary">
            About Us
          </Link>
          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact Us
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link href="https://github.com/Swapnil-M1D62Y402/Veera-Nari-Website" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}