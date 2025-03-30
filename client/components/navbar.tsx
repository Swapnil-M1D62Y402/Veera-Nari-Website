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
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Mobile Menu Button */}
        <div className="flex md:hidden mr-4">
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
                <Link href="/marketplace" onClick={() => setOpen(false)} className="text-lg">
                  Marketplace
                </Link>
                <Link href="/community" onClick={() => setOpen(false)} className="text-lg">
                  Community
                </Link>
                <Link href="/about" onClick={() => setOpen(false)} className="text-lg">
                  About Us
                </Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="text-lg">
                  Contact Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

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

        <div className="flex items-center space-x-4">
          <Link href="https://github.com/Swapnil-M1D62Y402/Veera-Nari-Website" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="/login" className="flex gap-4">
            <Button variant="ghost" size="sm"> Sign in </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}