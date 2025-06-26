import React from "react";
import Link from "next/link";

import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-600 mb-4 border-b border-yellow-200 pb-2">
              About Us
            </h3>
            <p className="text-white mb-4">
            Top Deals Dholera delivers verified, AUDA-approved projects in Dholera — trusted by 1000+ investors for transparent, expert-led investments.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/share/1AXGEEX1M8/" className="text-gray-500 hover:text-yellow-600 transition">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/BookMyAssets" className="text-gray-500 hover:text-yellow-600 transition">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/bookmyassets/" className="text-gray-500 hover:text-yellow-600 transition">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/bookmyassetss" className="text-gray-500 hover:text-yellow-600 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Policies Column */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-600 mb-4 border-b border-yellow-200 pb-2">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/policy/copyright"
                  className="text-white hover:text-yellow-600 transition flex items-center"
                >
                  <span className="mr-2">›</span> Copyright Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/terms"
                  className="text-white hover:text-yellow-600 transition flex items-center"
                >
                  <span className="mr-2">›</span> Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/privacy"
                  className="text-white hover:text-yellow-600 transition flex items-center"
                >
                  <span className="mr-2">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/refund-and-cancellation"
                  className="text-white hover:text-yellow-600 transition flex items-center"
                >
                  <span className="mr-2">›</span> Refund & Cancellation Policy
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-600 mb-4 border-b border-yellow-200 pb-2">
              Reach Our Head office
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 text-yellow-500 mr-3 mt-1">
                  <MapPin size={18} />
                </div>
                <span className="text-white">
                  620, JMD Megapolis, Sohna Rd, Sector 48, Gurugram, India
                  122018
                </span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 text-yellow-500 mr-3">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:info@bookmyassets.com"
                  className="text-white hover:text-yellow-600 transition"
                >
                  info@bookmyassets.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Top Deals Dholera™. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;