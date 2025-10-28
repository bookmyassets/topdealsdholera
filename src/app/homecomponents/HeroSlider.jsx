"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { Home, MapPin, TrendingUp, IndianRupee, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "../assets/topdealsDholera.webp";

// Separate component for feature cards
const FeatureCard = ({ icon: Icon, title, value, subtitle, onClick, isButton }) => (
  <div className="p-4 text-center hover:bg-orange-50 transition-colors duration-300">
    <div className="w-10 h-10 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-2">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-lg font-bold text-[#deae3c]">{value}</p>
    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    {isButton && (
      <button
        onClick={onClick}
        className="bg-[#deae3c] hover:bg-[#f3bb39] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm mt-1"
      >
        Download Now
      </button>
    )}
  </div>
);

// Separate component for mobile feature items
const MobileFeatureItem = ({ icon: Icon, title, value, subtitle }) => (
  <div className="p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#deae3c] rounded-full flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="text-xs font-semibold text-gray-600">{title}</h3>
        <p className="text-base font-bold text-[#deae3c]">{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  </div>
);

// Form input component
const FormInput = ({ icon: Icon, name, type = "text", placeholder, value, onChange, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="relative"
  >
    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
    />
  </motion.div>
);

// Thank you screen component
const ThankYouScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-gradient-to-br from-green-900 to-green-800 flex justify-center items-center z-[1001]"
  >
    <motion.div
      initial={{ scale: 0.5, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.5, y: 50 }}
      className="text-center text-white px-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Thank You!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl"
      >
        Your request has been submitted successfully.
      </motion.p>
    </motion.div>
  </motion.div>
);



// Constants
const FEATURES = [
  { icon: Home, title: "Land Size", value: "150 Sq.Yd.", subtitle: null },
  { icon: MapPin, title: "Type", value: "Residential Plots", subtitle: null },
  { icon: TrendingUp, title: "High ROI", value: "5x in 5 yrs.", subtitle: null },
  { icon: IndianRupee, title: "Price", value: "₹15 Lacs*", subtitle: "*Terms & conditions apply" },
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  },
  button: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } },
    hover: {
      scale: 1.05,
      backgroundColor: "#FDB913",
      color: "#000",
      transition: { duration: 0.3 },
    },
  },
};

const PHONE_REGEX = /^\d{10,15}$/;
const POPUP_DELAY = 2000;
const THANK_YOU_DURATION = 2000;
const SUBMIT_DELAY = 1000;

export default function LandingPage({ img1, mimg1, openForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [isDownload, setIsDownload] = useState(false);

  const openBrochure = () => {
    setIsDownload(true);
  }

  const closeBrochure = () => {
    setIsDownload(false);
  }

  // Setup popup triggers
  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA script");
            setRecaptchaLoaded(true); // Fallback
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true); // Fallback
        }
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    // Handle Escape key press
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();

      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.phone,
              source: "TopDealsDholera",
            },
            source: "TopDealsDholera",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });

        // Show thank you popup for 2 seconds
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          handleClose();

          // Get current pathname for return URL
          const currentPath = pathname || window.location.pathname;

          // Push to thank-you route with return URL
          router.push(`/thankyou`);
        }, 2000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again."
      );
    } finally {
      setIsLoading(false);
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset(recaptchaRef.current);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // If reCAPTCHA is loaded, render it in the ref
    if (window.grecaptcha && recaptchaLoaded) {
      try {
        if (recaptchaRef.current && !recaptchaRef.current.innerHTML) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
          });
        } else {
          window.grecaptcha.reset();
          window.grecaptcha.execute();
        }
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  const handleFormPopupToggle = useCallback(() => {
    setShowFormPopup((prev) => !prev);
  }, []);

  return (
    <div className="h-screen bg-gray-50">
      {/* Hero Section */}
      <div id="hero" className="relative h-[60vh] md:h-[79vh]">
        {/* Desktop Image */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src={img1}
            alt="Investment Opportunity"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-20" />
        </div>

        {/* Mobile Image */}
        <div className="absolute inset-0 block lg:hidden">
          <Image
            src={mimg1}
            alt="Investment Opportunity Mobile"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Hero Text */}
        <div className="absolute max-w-7xl mx-auto inset-0 z-10 font-semibold text-xl md:text-5xl max-sm:translate-y-40 text-gray-200 flex lg:items-center justify-center lg:justify-start px-4">
          <p className="text-center md:text-left">
            Premium, Registry-Ready <br /> Plot in Dholera <br /> Built for
            Smart Investors
          </p>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center items-center pb-2 max-sm:pb-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.container}
          >
            <motion.div variants={ANIMATION_VARIANTS.button}>
              <motion.button
                whileHover="hover"
                
                className="font-semibold px-8 py-3 border border-white rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black text-sm md:text-base shadow-lg"
              >
                C
              </motion.button>
            </motion.div>
          </motion.div>
        </div> */}
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4">
          {/* Desktop Features */}
          <div className="hidden md:grid md:grid-cols-5 divide-x divide-gray-200">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
            <FeatureCard
              icon={Download}
              title="Download Brochure"
              value=""
              isButton
              onClick={handleFormPopupToggle}
            />
          </div>

          {/* Mobile Features */}
          <div className="md:hidden divide-y divide-gray-200">
            <div className="grid grid-cols-2">
              {FEATURES.map((feature, index) => (
                <MobileFeatureItem key={index} {...feature} />
              ))}
            </div>
            <div className="p-4">
              <button
                onClick={handleFormPopupToggle}
                className="w-full bg-[#deae3c] hover:bg-[#f3bb39] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Full Screen */}
      <AnimatePresence>
        {showThankYou && <ThankYouScreen />}
      </AnimatePresence>

      {/* Form Popup */}
      <AnimatePresence>
        {showFormPopup && !showThankYou && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4 z-[1000]"
            onClick={(e) =>
              e.target === e.currentTarget && setShowFormPopup(false)
            }
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFormPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full p-1 transition-all duration-200 hover:bg-gray-700 z-10"
                aria-label="Close form"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black p-2 rounded-full shadow-lg"
                >
                  <Image
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Form Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-6 pt-4"
              >
                <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
              </motion.div>

              {/* Success Message or Form */}
              {showPopup ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-4 inline-block"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-300">
                    Your request has been submitted successfully. We'll contact
                    you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <FormInput
                    icon={FaUser}
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    delay={0.4}
                  />

                  <FormInput
                    icon={FaPhoneAlt}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    delay={0.5}
                  />

                  <div className="flex justify-center">
                    <div ref={recaptchaRef}></div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Submitting..." : "Claim Offer"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    <AnimatePresence>
        {isDownload && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Get the Dholera Brochure"
              buttonName="Download Brochure"
              onClose={() => closeBrochure()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
    
  );
}