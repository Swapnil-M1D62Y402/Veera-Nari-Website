"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-backgroundt" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32"
      >
        {/* Animated headline */}
        <motion.div variants={item} className="space-y-4">
          <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Your Safety, Your Power!
            <br />
            <span className="text-purple-600">Veera Nari</span>
            <span className="text-[#BC7FCD]"> Visionary</span>
          </h1>

          {/* Typewriter effect for subtitle */}
          <motion.p variants={item} className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            <Typewriter
              words={[
                "Instant emergency alerts with one tap.",
                "Real-time location tracking.",
                "A safety community that cares.",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </motion.p>
        </motion.div>

        <div className="flex gap-4">
          <Link href="/community" className="relative group">
            <Button size="lg" className="relative overflow-hidden">
              {/* Background layer that will blur */}
              <div className="absolute inset-0 bg-current opacity-10 group-hover:backdrop-blur-sm transition-all duration-300" />
              
              {/* Text content (stays sharp) */}
              <span className="relative z-10 flex items-center">
                Explore Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </Link>

          <Link href="/login" className="relative group">
            <Button variant="outline" size="lg" className="relative overflow-hidden border-purple-300 text-purple-700">
              {/* Background layer that will blur */}
              <div className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-300" />
              
              {/* Text content (stays sharp) */}
              <span className="relative z-10">
                Get Started
              </span>
            </Button>
          </Link>
        </div>

        {/* Floating safety shield (decorative) */}
        <motion.div
          variants={item}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 hidden md:block"
        >
          <Shield className="h-16 w-16 text-purple-400/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

