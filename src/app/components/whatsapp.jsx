import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingButtons = () => {
  return (
    <>
      {/* Desktop View - Floating Buttons on Bottom Right */}
      

      {/* Mobile View - Fixed Box at Bottom */}
      <div className="fixed -bottom-4 left-0 w-full bg-white/10 backdrop-blur-xl shadow-md p-3 flex justify-around lg:hidden z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919871786251"
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-mobile"
          className="flex items-center justify-center text-green-500 text-lg font-semibold"
        >
          <FaWhatsapp size={24} className="mr-2" /> WhatsApp
        </a>
        {/* Call Button */}
        <a
          href="tel:+919871786251"
          className="flex items-center justify-center text-blue-500 text-lg font-semibold"
          id="call-now-mobile"
        >
          <FaPhoneAlt size={24} className="mr-2" /> Call
        </a>
      </div>
    </>
  );
};

export default FloatingButtons;