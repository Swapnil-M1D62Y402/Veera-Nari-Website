"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Shield, AlertTriangle, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const safetyProducts = [
  {
    id: 1,
    name: "Personal Safety Alarm",
    price: "₹899",
    rating: 4.8,
    description: "130dB emergency alarm with LED strobe light",
    verified: true,
    category: "wearable"
  },
  {
    id: 2,
    name: "Pepper Spray",
    price: "₹349",
    rating: 4.5,
    description: "Compact 50ml OC spray with safety lock",
    verified: true,
    category: "defense"
  },
  {
    id: 3,
    name: "Smart Ring",
    price: "₹2,499",
    rating: 4.2,
    description: "Discreet emergency alert with GPS tracking",
    verified: false,
    category: "wearable"
  },
  {
    id: 4,
    name: "Self-Defense Class",
    price: "₹1,200/session",
    rating: 4.9,
    description: "Women's self-defense workshop (4 weeks)",
    verified: true,
    category: "service"
  }
];

export default function MarketplacePage() {
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
              <Shield className="mr-2 h-4 w-4" />
              Verified Products
            </div>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Safety Marketplace
            </h1>
            <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
              Discover trusted safety products and services vetted by our community
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400">
              All Items
            </Button>
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Wearables
            </Button>
            <Button variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Defense Tools
            </Button>
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Safety Services
            </Button>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16"
          >
            {safetyProducts.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Verified Badge */}
                {product.verified && (
                  <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                )}

                {/* Product Image Placeholder */}
                <div className="bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 dark:text-gray-200">{product.name}</h3>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{product.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{product.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Safety Notice */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="p-6 bg-yellow-50/70 dark:bg-yellow-900/20 backdrop-blur-sm rounded-xl border border-yellow-200 dark:border-yellow-800/50 shadow-sm"
          >
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Safety Disclaimer</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  All products are verified by our team. However, please check local laws regarding self-defense items. 
                  Veera Nari is not responsible for misuse of any products.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Want to Sell Safety Products?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
              Join our verified seller program to reach thousands of safety-conscious customers
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8">
              Become a Seller
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}