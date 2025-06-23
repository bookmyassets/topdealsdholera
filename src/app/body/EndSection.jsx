"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Enquire from "../components/EnquireNow";

export default function EndSection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <>
      {/* Combined Row for Ready to Invest and Statistics - Reversed Order */}
      <div className="w-full pt-4 pb-4 bg-gradient-to-r from-[#d7b36c] to-[#c4a055]">
        <section className="max-w-7xl mx-auto px-4">
          {/* Ready to Invest Section - Now Second */}
          <div className=" p-6  rounded-lg text-black">
            <h3 className="text-2xl font-bold mb-3">
              Secure your plot in Westwyn County Today!
            </h3>
            <p className="mb-4 opacity-90">
              Limited AUDA-approved plots available near Dholera’s
              fastest-growing corridor. Don’t miss your chance to invest in
              India’s first smart city — our experts are here to guide you every
              step of the way.
            </p>
            <button
              
              onClick={openContactForm}
              className=" bg-white text-[#d7b36c] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Enquire Now
            </button>
          </div>
        </section>
      </div>
      {/* Contact Form Modal - Using AnimatePresence for animation */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactForm}
          >
            <motion.div
              className=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="">
                <div className="">

                  
                </div>
                <Enquire
                  title=""
                  buttonName="Talk To Investment Advisor"
                  onClose={closeContactForm}
                  id="faq-form"
                />
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
