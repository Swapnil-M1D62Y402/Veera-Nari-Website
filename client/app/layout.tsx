import 'leaflet/dist/leaflet.css';
import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { Providers } from "@/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Veera Nari - Women Safety App",
  description: "Veera Nari offers solutions to safeguard Women Safety and Marketplace to buy Self-Defence Items",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin=""
        /> */}
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <MouseMoveEffect />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

