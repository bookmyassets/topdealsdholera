"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, compass } from "lucide-react";

const DynamicScrollNavigation = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [showTOC, setShowTOC] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, isHomePage]);

  const scrollToSection = (sectionId) => {
    setShowTOC(false);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      {/* Table of Contents Toggle Button */}
      <button
        onClick={() => setShowTOC(!showTOC)}
        className="bg-[#FDB913] text-black p-2 rounded-full shadow-lg hover:bg-[#e1a908] transition-colors"
      >
        {showTOC ? <X size={20} /> : <Compass size={20} />}
      </button>

      {/* Table of Contents Panel */}
      <AnimatePresence>
        {showTOC && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-12 top-0 bg-white rounded-md shadow-xl p-4 w-64"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Table of Contents
            </h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === section.id && isHomePage
                        ? "bg-[#FDB913] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicScrollNavigation;
