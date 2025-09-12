"use client";
import React, { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "../assets/topdealsDholera.webp";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import GetinTouch from "./GetinTouch";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGetInTouchDropdownOpen, setIsGetInTouchDropdownOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  
  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const handleNavigation = (section) => {
    setIsMenuOpen(false);
    
    if (pathname === '/') {
      const element = document.getElementById(section.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/${section}`);
    }
  };

  const navigateToPage = (path) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const toggleGetInTouchDropdown = () => {
    setIsGetInTouchDropdownOpen(!isGetInTouchDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInTouchRef = useRef(null);
  const menuToggleRef = useRef(null);

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Navigation items - now with proper page paths
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/blogs", label: "Blogs" },
    { path: "/dholera-smart-city", label: "Dholera" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logo}
              height={50}
              width={50}
              alt="Logo"
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
            {navItems.map(({ path, label }) => (
              <Link
                key={label}
                href={path}
                className={`hover:text-[#FDB913] transition duration-300 relative group ${
                  pathname === path ? 'text-[#FDB913]' : ''
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#FDB913] transition-all duration-300 ${
                  pathname === path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
            
            <div ref={getInTouchRef} className="relative group">
              <button
                className="bg-[#FDB913] hover:bg-[#e1a908] text-black px-4 py-2 rounded-md cursor-pointer flex items-center gap-1 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={toggleGetInTouchDropdown}
                onMouseEnter={() => setIsGetInTouchDropdownOpen(true)}
                onMouseLeave={() => setIsGetInTouchDropdownOpen(false)}
              >
                Get in Touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-black transition-transform duration-300 ${
                    isGetInTouchDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isGetInTouchDropdownOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute left-0 top-12 bg-white rounded-md shadow-xl overflow-hidden z-50 w-48 border border-gray-200"
                    onMouseEnter={() => setIsGetInTouchDropdownOpen(true)}
                    onMouseLeave={() => setIsGetInTouchDropdownOpen(false)}
                  >
                    <div className="py-2">
                      <button
                        onClick={openContactForm}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                      >
                        Book A Free Site Visit
                      </button>
                      <a
                        href="tel:+919871786251"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                        id="call-now"
                      >
                        Call Now
                      </a>
                      <a
                        href="https://wa.me/919871786251"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="whatsapp-git"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu section */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative">
              <button
                className="bg-[#FDB913] text-black px-3 py-2 rounded-md cursor-pointer flex items-center gap-1 text-sm font-medium"
                onClick={toggleGetInTouchDropdown}
              >
                Contact
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-black transition-transform duration-300 ${
                    isGetInTouchDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isGetInTouchDropdownOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute right-0 top-12 bg-white rounded-md shadow-xl overflow-hidden z-50 w-48 border border-gray-200"
                  >
                    <div className="py-2">
                      <button
                        onClick={openContactForm}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                      >
                        Enquire Now
                      </button>
                      <a
                        href="tel:+919871786251"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                      >
                        Call Now
                      </a>
                      <a
                        href="https://wa.me/919871786251"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-medium"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={toggleMenu} 
              ref={menuToggleRef}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#FDB913]" />
              ) : (
                <Menu className="h-6 w-6 text-[#FDB913]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4 font-medium">
              {navItems.map(({ path, label }) => (
                <Link
                  key={label}
                  href={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-[#FDB913] transition duration-300 text-left py-2 border-b border-gray-700 last:border-b-0 ${
                    pathname === path ? 'text-[#FDB913]' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <GetinTouch
              title=""
              buttonName="Talk To Investment Advisor"
              onClose={() => setIsContactFormOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}