"use client";
import { motion } from "framer-motion";
import { Users, Shield, MessageSquare, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CommunityPage() {
  const safetyTips = [
    "Share your live location with trusted contacts when traveling",
    "Use code words in messages to discreetly signal distress",
    "Verify community members through the app before meeting",
    "Report any suspicious activity immediately"
  ];

  const recentActivity = [
    { user: "Priya K.", action: "shared a safety tip", time: "2h ago" },
    { user: "Community", action: "alert: Crowd reported near MG Road", time: "5h ago" },
    { user: "Rahul M.", action: "organized a group commute", time: "1d ago" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 py-12 md:py-24 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-4">
              <Users className="mr-2 h-4 w-4" />
              Safe Together
            </div>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Veera Nari Community
            </h1>
            <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
              Connect with verified users, share safety alerts, and build a protective network in your area.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 mr-4">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Verified Network</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                All members are identity-verified to ensure a safe community environment with strict privacy controls.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 mr-4">
                  <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Alerts</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Receive instant notifications about safety concerns in your vicinity from trusted community reports.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.6 }}
              className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 mr-4">
                  <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Safe Zones</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Discover community-verified safe locations and businesses in your city with user ratings.
              </p>
            </motion.div>
          </div>

          {/* Community Content */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Safety Tips */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Community Safety Tips
              </h2>
              <ul className="space-y-4">
                {safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="h-2 w-2 rounded-full bg-purple-600" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{tip}</p>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Share Your Tip
              </Button>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Recent Activity
              </h2>
              <div className="space-y-6">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-600 dark:text-purple-300">
                          {item.user.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {item.user} <span className="font-normal text-gray-600 dark:text-gray-400">{item.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400">
                View All Activity
              </Button>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Ready to Join Our Safety Network?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
              Connect with verified users in your area and contribute to building safer communities together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8">
                Sign Up Now
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 px-8">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}