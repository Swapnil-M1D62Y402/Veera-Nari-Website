"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const teamMembers = [
  {
    name: "Swapnil Chaki",
    role: "Product Manager",
    bio: "Passionate about creating seamless user experiences with 8+ years in product development."
  },
  {
    name: "Ansu Nanda",
    role: "Backend Engineer",
    bio: "Specializing in scalable architecture and performance optimization with 5+ years experience."
  },
  {
    name: "Tushit Roy",
    role: "UX Designer",
    bio: "Award-winning designer focused on accessibility and intuitive interfaces."
  },
  {
    name: "Debdeep Ghosh",
    role: "Frontend Engineer",
    bio: "React specialist creating beautiful, responsive interfaces with pixel-perfect precision."
  },
  {
    name: "Spandan Mukherjee",
    role: "Database Engineer",
    bio: "Database architect optimizing complex data systems for maximum reliability and performance."
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AboutComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 py-12 md:py-24 dark:from-gray-900 dark:to-gray-800">
        <div className="container space-y-16 px-4 md:px-6">
          {/* Hero Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                About Us
              </h1>
              <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
                Empowering safety through innovative technology - because everyone deserves to feel secure.
              </p>
            </div>
          </motion.div>

          {/* Story & Mission */}
          <div className="mx-auto grid max-w-3xl items-start gap-8 lg:max-w-5xl lg:grid-cols-2">
            <motion.div 
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col space-y-4 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Founded in 2025 by Visionary Team, Veera Nari began as a response to growing safety concerns for women and marginalized groups. 
                What started as a university project has now grown into a trusted safety platform serving thousands of users 
                across India with innovative protection solutions.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col space-y-4 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                To create a world where safety is accessible to all through technology that&apos;s simple, reliable, and empowering. We combine real-time protection with community support to help people live confidently and fearlessly.
              </p>
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="space-y-8">
            <motion.h2 
              variants={fadeIn}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Meet Our Team
            </motion.h2>
            
            <div className="grid max-w-sm gap-8 mx-auto sm:max-w-4xl sm:grid-cols-2 md:gap-8 lg:max-w-5xl lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-700 dark:text-gray-300">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400">{member.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <motion.div 
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-3xl mx-auto p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Get In Touch
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Our Office</h3>
                  <address className="text-sm not-italic text-gray-600 dark:text-gray-400">
                    123 Safety Tower, Bangalore<br />
                    Karnataka 560001, India
                  </address>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <Link href="tel:+911234567890" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    +91 12345 67890
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <Link href="mailto:contact@veeranari.com" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    contact@veeranari.com
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Working Hours</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mon-Fri: 9AM - 6PM<br />
                    Sat: 10AM - 4PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function Clock(props: React.SVGProps<SVGSVGElement>) {  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}