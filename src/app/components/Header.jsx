"use client";
import React, { useState } from "react";
import logo from "../assets/topdealsDholera.webp";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const labelName = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const navItems = [
    {
      path: "/residential-projects",
      label: "Residential",
      dropdown: [
        { path: "/dholera-plots/westwyn-estate", label: "WestWyn Estate" },
        { path: "/dholera-plots/westwyn-county", label: "WestWyn County" },
        { path: "/dholera-plots/paradise-1", label: "Paradise 1" },
        { path: "/dholera-plots/paradise-2", label: "Paradise 2" },
        { path: "/dholera-plots/orchid", label: "Orchid" },
        { path: "/dholera-plots/marina-bay", label: "Marina bay" },
        { path: "/dholera-plots/maple", label: "Maple" },
        { path: "/dholera-plots/pride", label: "Pride" },
      ],
    },
    {
      path: "/dholera-smart-city",
      label: "Dholera",
      dropdown: [
        {
          path: "/dholera-smart-city/about-dholera-sir",
          label: "About Dholera SIR",
        },
        {
          path: "/dholera-smart-city/dholera-sir-blogs",
          label: "Dholera SIR Blogs",
        },
        {
          path: "/dholera-smart-city/dholera-sir-updates",
          label: "Dholera SIR Updates",
        },
      ],
    },
    { path: "/gallery", label: "Gallery" },
  ];

  const hamburgerItems = [
    { path: "/about", label: "About" },
    { path: "/channel-partner", label: "Channel Partner" },
  ];

  const allMobileItems = [...navItems, ...hamburgerItems.map(item => ({ ...item, dropdown: null }))];

  const toggleMobileDropdown = (label) => {
    setMobileDropdown(mobileDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src={logo}
                alt="TopDealsDholera Logo"
                height={50}
                width={50}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10 text-lg font-medium">
              {navItems.map(({ path, label, dropdown }) => (
                <div
                  key={label}
                  className="relative group"
                  onMouseEnter={() => dropdown && setOpenDropdown(label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link href={path}>
                    <div className="hover:text-[#FDB913] transition duration-300 relative cursor-pointer flex items-center gap-1">
                      {label}
                      {dropdown && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            openDropdown === label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#FDB913] transition-all duration-300 ${
                          labelName === path
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </div>
                  </Link>

                  {dropdown && openDropdown === label && (
                    <div className="absolute top-full left-0 mt-0 w-52 bg-gray-800 rounded-md shadow-xl py-2 border border-gray-700 z-50">
                      {dropdown.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <div className="px-4 py-2 hover:bg-gray-700 hover:text-[#FDB913] transition duration-200 cursor-pointer">
                            {item.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="relative">
                <Link href="/contact">
                  <button className="text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-1 transition-all duration-300 shadow-md hover:shadow-lg">
                    Contact Us
                  </button>
                </Link>
              </div>

              {/* Hamburger Menu Icon with Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="hover:text-[#FDB913] transition duration-300 cursor-pointer flex items-center gap-1">
                  <Menu size={24} />
                </div>

                {isMenuOpen && (
                  <div className="absolute top-full right-0 mt-0 w-52 bg-gray-800 rounded-md shadow-xl py-2 border border-gray-700 z-50">
                    {hamburgerItems.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <div className="px-4 py-2 hover:bg-gray-700 hover:text-[#FDB913] transition duration-200 cursor-pointer">
                          {item.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-700 transition duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            {allMobileItems.map(({ path, label, dropdown }) => (
              <div key={label} className="border-b border-gray-700 pb-2 last:border-b-0">
                {dropdown ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between text-left hover:text-[#FDB913] transition duration-200 py-2"
                      onClick={() => toggleMobileDropdown(label)}
                    >
                      <span className="text-lg font-medium">{label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          mobileDropdown === label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        mobileDropdown === label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 py-2 space-y-2 border-l-2 border-gray-600 ml-2">
                        {dropdown.map((item) => (
                          <Link key={item.path} href={item.path} onClick={closeMobileMenu}>
                            <div className="py-2 px-3 hover:bg-gray-700 hover:text-[#FDB913] rounded-md transition duration-200 cursor-pointer">
                              {item.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={path} onClick={closeMobileMenu}>
                    <div className="text-lg font-medium hover:text-[#FDB913] transition duration-200 py-2 cursor-pointer">
                      {label}
                    </div>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Contact Button */}
            <div className="pt-4 border-t border-gray-700">
              <Link href="/contact" onClick={closeMobileMenu}>
                <button className="w-full bg-[#FDB913] text-gray-900 font-semibold py-3 px-4 rounded-md hover:bg-yellow-500 transition duration-300 cursor-pointer text-center">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}