import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Veera Nari</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
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
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

