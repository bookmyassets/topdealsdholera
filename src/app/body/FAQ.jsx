"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import bg from "@/assests/pexels2.jpg";
import clickBaitm from "@/assests/dholeraClickBaitm.webp";
import clickBait from "@/assests/dholeraClickBait.webp";

import Link from "next/link";


const faqs = [
  {
    question: "Is Dholera Smart City completed?",
    answer:
      "Dholera Smart City is still under development. India’s first greenfield smart city under DMIC, Dholera is rapidly developing with key infrastructure in progress and full completion expected by 2040.",
  },
  {
    question: "What are the top companies investing in Dholera? ",
    answer:
      "Tata, Adani, Foxconn, Wipro, IBM, Reliance Communications, Vedanta, Cisco and many more" },
  {
    question: "How far is Westwyn County from key locations?",
    answer:
      "20 mins from Dholera International Airport, close to ABCD Building, with direct highway access.",
  },
  {
    question: "What plot sizes are available?",
    answer:
      "From 200 sq. yards to 400 sq. yards suitable for both investment and home building.",
  },
  {
    question: "Can I build on my plot?",
    answer:
      "Yes, you can construct a home as per AUDA regulations.",
  },
  {
    question: "How do I book or visit?",
    answer:
      "Fill out the contact us form or call us to book your plot or schedule a site visit.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const colors = {
    black: "#000000",
    gold: "#FDB913",
    darkGold: "#C69C21",
    white: "#FFFFFF",
  };

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  return (
    <>
      <div id="Faqs" className="relative p-8">
        <Image
        src={bg}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 "
      />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-extrabold text-black text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 relative">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="border rounded-lg p-4 shadow-2xl bg-gray-900 bg-opacity-80"
              >
                <button
                  className="w-full flex justify-between items-center text-[#edc46b] text-left text-lg font-bold"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 text-lg text-[#f6d99a] overflow-hidden border-t-2 border-[#edc46b] border-opacity-50 py-5"
                    >
                      {Array.isArray(faq.answer) ? (
                        <ul className="list-disc pl-2 ">
                          {faq.answer.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{faq.answer}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
    {/*   <div className="block md:hidden relative w-full">
        <Image
          src={clickBait}
          alt="clickbait mobile"
          className=" h-auto"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 px-4">
          <button
            onClick={openBrochureForm}
            className="bg-gray-800 text-white text-center px-4 py-2 rounded-lg flex-1"
          >
            Free Site Visit
          </button>
          <Link href="/infopack" className="bg-gray-800 text-white text-center px-4 py-2 rounded-lg flex-1">
            Project Info
          </Link>
        </div>
      </div> */}

      {/* Desktop Version */}
  {/*     <div className="hidden md:block relative w-full">
        <Image
          src={clickBaitm}
          alt="clickbait desktop"
          className="w-full h-auto"
        />
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6 px-8">
          <button
            onClick={openBrochureForm}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg text-2xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Free Site Visit
          </button>
          <Link href="/infopack" className="bg-gray-800 text-white px-6 py-3 rounded-lg text-2xl font-semibold hover:bg-gray-900 transition-colors">
            Project Info
          </Link>
        </div>
      </div> */}

      {/* <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]">
            <ContactForm
              title="Free Site Visit"
              buttonName="Submit"
              onClose={closeBrochureForm}
              onSuccess={() => setIsFormSubmitted(true)}
            />
          </div>
        )}
      </AnimatePresence> */}
    </>
  );
}
