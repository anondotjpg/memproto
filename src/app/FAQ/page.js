'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";

export default function FAQs() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      question: "How it works?",
      answer: "Meme Protocol allows users to launch tokens on pump.fun and guarentee all value remains within the Meme Ecosystem. This leads to healthier markets and tokens. 100% of creator fees get used to support the token and the overall Meme Ecosystem."
    },
    {
      question: "What happens with fees?",
      answer: "50% go to buying back the token and 50% go to buying $MEME which will then be strategically allocated to top performers. This creates a positive flywheel for the ecosystem."
    },
    {
      question: "Do I need to pay for launch?",
      answer: "No. As of current we will fund all platform launches. In the future there may be a small fee to combat spam/low quality launches."
    },
    {
      question: "Why we need this?",
      answer: "Most pump tokens get thousands of $$ extracted from their chart. With Meme Protocol 100% of value stays within the Meme Ecosystem strengthening all participants. It's simple really."
    },
    {
      question: "Who are we?",
      answer: "We are a small group of chad devs and traders who are sick of the mass extraction. We set out to build a quality product the trenches genuinely need."
    }
  ];

  return (
    <div className="min-h-screen bg-[#000] flex items-center justify-center p-6">
      <Link
        href="/"
        className="absolute top-[3%] left-[3%] px-4 py-2 text-gray-500"
      >
        <IoMdArrowRoundBack size={30} />
      </Link>
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FAQs
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#111] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between cursor-pointer"
              >
                <h3 className="text-white font-semibold text-lg pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <IoChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="pt-4">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}