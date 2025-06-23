"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import priceBanner from "@/assests/landing/price-cut-banner.webp"
import priceBannerMobile from "@/assests/landing/Price-cut-mobile-banner.webp"
import Image from "next/image";
import BrochureDownload from "../components/BrochureDownload";
import InvestCalc from "../components/Investcalc";

export default function WhyInvest() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [investmentYear, setInvestmentYear] = useState(5);
  const [plotSize, setPlotSize] = useState(200);
  const [customYear, setCustomYear] = useState("");

  const baseRate = 9250; 
  const targetRate = 17000; 
  const annualGrowthRate = 0.05; 

  const calculateFutureValue = (years) => {
    
    if (years <= 5) {
      const incrementPerYear = (targetRate - baseRate) / 5;
      return baseRate + incrementPerYear * years;
    } else {
      return targetRate * Math.pow(1 + annualGrowthRate, years - 5);
    }
  };

  const calculateInvestment = () => {
    let years = investmentYear;
    if (customYear) {
      years = parseInt(customYear);
    }

    const futureRate = calculateFutureValue(years);
    const currentInvestment = baseRate * plotSize;
    const futureValue = futureRate * plotSize;
    const profit = futureValue - currentInvestment;
    const percentageGrowth = (futureValue / currentInvestment - 1) * 100;

    return {
      currentValue: currentInvestment,
      futureValue: futureValue,
      profit: profit,
      percentageGrowth: percentageGrowth,
      ratePerSqYard: futureRate,
    };
  };

  const investmentDetails = calculateInvestment();

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const downloadBrochure = () => {
    // Replace with your actual brochure URL
    const brochureUrl = "https://shorturl.at/t7uyU";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = "Dholera-Smart-City-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Initialize animation observers when component mounts
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document
      .querySelectorAll(
        ".fade-in-up, .feature-item, .project-image, .amenity-item, .investment-calculator"
      )
      .forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      // Ensure we clean up by enabling scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div>
        <style jsx global>
          {`
            .animate-shimmer {
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.8) 50%,
                rgba(255, 255, 255, 0) 100%
              );
              background-size: 200px 100%;
              animation: shimmer 2s infinite;
            }

            @keyframes shimmer {
              0% {
                background-position: -100px 0;
              }
              100% {
                background-position: 100px 0;
              }
            }

            .investment-calculator {
              opacity: 0;
              transform: translateY(30px);
              transition:
                opacity 0.8s ease,
                transform 0.8s ease;
              transition-delay: 0.3s;
            }

            .investment-calculator.animate-visible {
              opacity: 1;
              transform: translateY(0);
            }

            /* Modal styles */
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.7);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              padding: 1rem;
            }

            .modal-content {
              background: white;
              border-radius: 0.5rem;
              width: 100%;
              max-width: 500px;
              max-height: 90vh;
              overflow-y: auto;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }

            /* Add spacing between sections */
            .westwyn-container section {
              margin-bottom: 5rem;
            }

            .fade-in-up {
              opacity: 0;
              transform: translateY(30px);
              transition:
                opacity 0.6s ease,
                transform 0.6s ease;
            }

            .fade-in-up.animate-visible {
              opacity: 1;
              transform: translateY(0);
            }
          `}
        </style>
        <section id="WhyInvest" className=" py-8 bg-white">

  <section>
        <div className="relative mb-8">
          {/* Desktop Image */}
          <div className="hidden lg:block relative">
            <Image
              src={priceBanner}
              alt="Investment Opportunity"
              className="w-full"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
            
          </div>

          {/* Mobile Image */}
          <div className="block lg:hidden relative h-[300px]"> 
            <Image
              src={priceBannerMobile}
              alt="Investment Opportunity Mobile"
              fill
              className="object-contain w-full"
              priority
            />
            <div className="absolute inset-0"></div>
           
          </div>
        </div>
      </section>

          <div className="max-w-7xl mx-auto">
            {/* Investment Returns Section */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg p-8 animate-on-scroll">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 animate-on-scroll from-left">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 font-poppins mb-4">
                    Investment Returns
                  </h3>
                  <div className="w-20 h-1 bg-[#d7b36c] mb-6"></div>
                  <p className="text-lg md:text-xl text-gray-700 font-poppins mb-6">
                    With major investments pouring into aviation, electronics,
                    defense, and green energy, Dholera Smart City is poised to
                    become Gujarat’s industrial and innovation hub. Your
                    investment in WestWyn County offers not just land — but high
                    future returns, world-class infrastructure, and the
                    first-mover advantage in India’s most ambitious smart city.
                    Download our brochure to explore plot options, pricing, and
                    location insights.
                  </p>
                  <div className="flex flex-col md:text-xl sm:flex-row gap-4">
                    <button
                    
                      onClick={() => {
                        if (isFormSubmitted) {
                          downloadBrochure();
                        } else {
                          openContactForm();
                        }
                      }}
                      className={`inline-flex items-center px-6 py-3 ${isFormSubmitted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-[#d7b36c] hover:bg-[#c2a05e]"
                        } text-black font-bold rounded-lg transition duration-300 transform hover:scale-105 font-poppins shadow-md animate-float`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            isFormSubmitted
                              ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              : "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          }
                        />
                      </svg>
                      {isFormSubmitted ? "Download Brochure" : "Get Brochure"}
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2 animate-on-scroll from-right">
                  <div className="bg-white rounded-lg p-8 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-semibold text-gray-800">
                        ROI Projection
                      </div>
                      <div className="text-[#d7b36c] font-bold text-3xl">
                        10x
                      </div>
                    </div>
                    <div className="w-full bg-[#d7b36c] rounded-full h-3 mb-4">
                      <div
                        className="bg-[#d7b36c] h-3 rounded-full transition-all duration-1000 animate-shimmer"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-8">
                      <span>Current Value</span>
                      <span>Projected by 2030</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">
                          Starting From
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          ₹9,250/sq.ft
                        </div>

                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">
                          Investment Period
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          5-7 Years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    

      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="investment-calculator bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#d7b36c] p-6 text-black">
            <h2 className="text-2xl font-bold">Investment Calculator</h2>
            <p>See how your investment grows over time</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Plot Size (sq. yards)
                </label>
                <div className="flex space-x-4">
                  {[200, 300, 400].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPlotSize(size)}
                      className={`py-2 px-4 rounded-md ${plotSize === size
                        ? "bg-[#d7b36c] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Investment Duration
                </label>
                <div className="flex space-x-4 mb-4">
                  {[5, 7, 10].map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setInvestmentYear(year);
                        setCustomYear("");
                      }}
                      className={`py-2 px-4 rounded-md ${investmentYear === year && !customYear
                        ? "bg-[#d7b36c] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {year} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Your Investment Growth
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Current Price per sq. yard:
                  </span>
                  <span className="font-semibold">
                    ₹{baseRate.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Future Price per sq. yard:
                  </span>
                  <span className="font-semibold">
                    ₹
                    {Math.round(
                      investmentDetails.ratePerSqYard
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Current Investment:</span>
                  <span className="font-semibold">
                    ₹
                    {Math.round(
                      investmentDetails.currentValue
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-lg text-[#d7b36c]">
                  <span className="font-semibold">Future Value:</span>
                  <span className="font-bold">
                    ₹
                    {Math.round(investmentDetails.futureValue).toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potential Profit:</span>
                    <span className="font-semibold text-green-600">
                      ₹{Math.round(investmentDetails.profit).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth:</span>
                    <span className="font-semibold text-green-600">
                      {Math.round(investmentDetails.percentageGrowth)}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                id="  "
                onClick={openForm}
                className="mt-6 bg-[#d7b36c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c4a055] transition-colors w-full"
              >
                Talk To Our Expert Advisor
              </button>
              <p className="pt-4 text-gray-600 font-semibold">
                Disclaimer : Calculations are estimates and don't guarantee exact returns
              </p>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]">
            <BrochureDownload
              title=""
              buttonName="Get Brochure"
              onClose={closeContactForm}
              id="brochure"
            />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]">
            <InvestCalc
              title=""
              buttonName="Connect To Investment Advisor"
              onClose={closeForm}
              id="invest-calc"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
