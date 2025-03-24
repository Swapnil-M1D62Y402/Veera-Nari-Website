"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does Veera Nari ensure my privacy?",
      answer: "We use end-to-end encryption to protect your data and ensure complete privacy for all communications and location sharing."
    },
    {
      question: "Is Veera Nari free to use?",
      answer: "Yes, our core safety features are completely free. We offer optional premium upgrades for additional functionality."
    },
    {
      question: "Can I rely on Veera Nari for support in Emegency?",
      answer: "Yes, our app can send emergency alerts and store critical information when you need help. We also have a 24/7 support team."
    },
    {
      question: "How do I add emergency contacts?",
      answer: "Go to Settings > Emergency Contacts to add or edit your trusted network. You can assign different contact levels for different situations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#FFCDEA]">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="relative overflow-hidden rounded-lg"
          >
            {/* Blurred background layer */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md -z-10" />
            
            {/* Content */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <h3 className="text-lg font-medium text-[#FFCDEA]">
                {faq.question}
              </h3>
              {activeIndex === index ? (
                <ChevronUp className="h-5 w-5 text-[#FFCDEA]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#FFCDEA]" />
              )}
            </button>
            
            <div
              className={`px-6 pb-6 pt-0 transition-all duration-300 ${
                activeIndex === index ? 'block' : 'hidden'
              }`}
            >
              <p className="text-[#FFCDEA]/80">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;