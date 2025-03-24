"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 py-12 md:py-24 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Contact Us
            </h1>
            <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Send us a message
              </h2>
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="dark:border-gray-700 dark:bg-gray-800/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      className="dark:border-gray-700 dark:bg-gray-800/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="subject">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="dark:border-gray-700 dark:bg-gray-800/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    className="dark:border-gray-700 dark:bg-gray-800/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Contact Information
                </h2>
                <div className="space-y-6">
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
                      <a href="tel:+911234567890" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        +91 12345 67890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                      <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Us</h3>
                      <a href="mailto:contact@veeranari.com" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        contact@veeranari.com
                      </a>
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
              </div>

              {/* Team Contact */}
              <div className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Contact Our Team
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center">
                      <span className="font-medium text-purple-600 dark:text-purple-300">SC</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Swapnil Chaki</h3>
                      <a href="mailto:swapnil@veeranari.com" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        swapnil@veeranari.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center">
                      <span className="font-medium text-purple-600 dark:text-purple-300">AN</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Ansu Nanda</h3>
                      <a href="mailto:ansu@veeranari.com" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                        ansu@veeranari.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}