"use client";
import React, { useState, useEffect, useRef } from "react";
import Orchid from "@/assests/landing/Orchid.webp";
import paradise from "@/assests/landing/Paradise.webp";
import paradise2 from "@/assests/landing/Paradise-2.webp";
import marina from "@/assests/landing/marinaBay.webp";
import maple from "@/assests/landing/maple.webp";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Project data with names and descriptions
const projects = [
  {
    id: 1,
    name: "Orchid",
    description: "Premium residential plots with modern amenities",
    image: Orchid,
    status: "Sold Out",
  },
  {
    id: 2,
    name: "Paradise 2",
    description: "Elevated lifestyle with panoramic views",
    image: paradise2,
    status: "Sold Out",
  },
  {
    id: 3,
    name: "Marina Bay",
    description: "Waterfront properties with exclusive access",
    image: marina,
    status: "Sold Out",
  },
  {
    id: 4,
    name: "Maple",
    description: "Nature-inspired community living",
    image: maple,
    status: "Sold Out",
  },
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef(null);
  const slideDuration = 5000; // 5 seconds per slide

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Go to a specific slide
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Start auto-swiping
  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, slideDuration);
  };

  useEffect(() => {
    startAutoSlide();

    // Clean up interval on component unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPaused]);

  return (
    <div id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="relative">
              <div className="h-1 w-20 bg-[#d7b36c] absolute -top-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Dholera's Premier <br /> 
                <span className="text-[#d7b36c]"> Real Estate Developer</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 ">
                At Dholera Consultants, we don't just offer land—we offer a vision of the future. 
                Multiple projects successfully sold in Dholera Smart City. <br />
                <span className="font-semibold">WestWyn County is yet another step toward your smarter future.</span>
                <br/>
                
              </p>
              <div className="mt-8">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-1 bg-[#d7b36c]"></div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      See Why 
                    </h3>
                    <p className="text-xl text-[#d7b36c] font-bold">1000+ Investors Trusted Us</p>
                  </div>
                </div>
              </div>

              {/* Project Navigator */}
              <div className="mt-10 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex space-x-3">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full border border-gray-300 hover:bg-[#d7b36c] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full border border-gray-300 hover:bg-[#d7b36c] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex space-x-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === index
                          ? "w-8 bg-[#d7b36c]"
                          : "w-2 bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Project Carousel */}
          <div
            className="relative overflow-hidden rounded-xl h-96 md:h-[500px] shadow-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel slides */}
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-full h-full flex-shrink-0 relative"
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />

                  {/* Project Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                    
                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-200 mb-4">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Left/Right Navigation Buttons (for larger screens) */}
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md hidden md:block"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md hidden md:block"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
