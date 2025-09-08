"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import img from "@/app/assets/contact.jpg"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

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
            setRecaptchaLoaded(true); // Still set as loaded so form submission can proceed as fallback
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true); // Still set as loaded as fallback
        }
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    // Prevent modal close when clicking inside
    const handleClickInside = (e) => {
      e.stopPropagation();
    };

    const formElement = document.getElementById("contact-form-container");
    if (formElement) {
      formElement.addEventListener("click", handleClickInside);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("click", handleClickInside);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill all required fields.",
      });
      return false;
    }

    // Phone validation (if phone is provided)
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      setSubmitStatus({
        type: "error",
        message:
          "Please enter a valid phone number (10-15 digits) or leave it blank.",
      });
      return false;
    }

    return true;
  };

  const checkSubmissionLimit = () => {
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    }

    if (submissionCount >= 3) {
      setSubmitStatus({
        type: "error",
        message:
          "You have reached the maximum submission limit. Try again after 24 hours.",
      });
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();

      // Send to TeleCRM
      const response = await fetch(
        `https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              subject: formData.subject,
              message: formData.message,
              source: "Top Deals Dholera",
            },
            source: "BookMyAssets Website",
            tags: ["Website Lead", "Contact Form", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit to TeleCRM");
      }

      // Success handling
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll contact you soon.",
      });
      setFormData({ name: "", email: "", subject: "", phone: "", message: "" });

      // Update submission count
      setSubmissionCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("formSubmissionCount", newCount.toString());
        localStorage.setItem("lastSubmissionTime", now.toString());
        return newCount;
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);

      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset(recaptchaRef.current);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    if (!validateForm() || !checkSubmissionLimit()) {
      setIsSubmitting(false);
      return;
    }

    // Execute reCAPTCHA - Fixed implementation
    if (window.grecaptcha && recaptchaLoaded) {
      try {
        // Always render fresh reCAPTCHA widget
        if (recaptchaRef.current) {
          // Clear previous widget
          recaptchaRef.current.innerHTML = "";

          // Render new widget
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        setSubmitStatus({
          type: "error",
          message: "Verification error. Please try again.",
        });
        setIsSubmitting(false);
      }
    } else {
      setSubmitStatus({
        type: "error",
        message: "Security verification not loaded. Please refresh the page.",
      });
      setIsSubmitting(false);
    }
  };

  const canonicalUrl = `https://www.bookmyassets.com/contact`;

  return (
    <div className="min-h-screen flex flex-col">
      <link rel="canonical" href={canonicalUrl} />

      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between py-16 mt-20 gap-10">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <Image
              src={img}
              alt="Contact us"
              className="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"
              width={490}
              height={290}
            />
          </div>

          {/* Text Content Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-black">
              Contact Us
            </h1>

            {/* Decorative Line with Star */}
            <div className="flex items-center justify-center md:justify-start mt-4">
              <div className="h-[2px] w-24 md:w-32 bg-[#FDB913]"></div>
              <span className="mx-2 text-[#FDB913] text-xl">★</span>
              <div className="h-[2px] w-24 md:w-32 bg-[#FDB913]"></div>
            </div>

            {/* Second Line */}
            <div className="flex items-center justify-center md:justify-start mt-2">
              <div className="h-[2px] w-20 bg-[#FDB913]"></div>
              <div className="h-[2px] w-20 bg-[#FDB913] ml-4"></div>
            </div>

            {/* Description Text */}
            <p className="text-black mt-6 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
              We welcome you to the world of sheer convenience where all your
              property and financing needs are made super easy.
            </p>
          </div>
        </div>
      </div>

      {/* Get In Touch Section with Dark Background */}
      <div className="bg-gray-900 py-10 text-center">
        <h2 className="text-4xl font-bold text-yellow-500">Get In Touch</h2>
        <div className="flex justify-center items-center mt-2">
          <span className="h-1 w-16 bg-yellow-500 mx-2"></span>
          <span className="text-yellow-500 text-xl">★</span>
          <span className="h-1 w-16 bg-yellow-500 mx-2"></span>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-10 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Info */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Contact Information
                </h2>

                <div className="flex items-start mb-4">
                  <div className="text-yellow-500 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      620, JMD MEGAPOLIS, Sohna Rd,
                    </p>
                    <p className="text-gray-700">
                      Sector 48 Gurugram, Haryana,
                    </p>
                    <p className="text-gray-700">India 122018</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="text-yellow-500 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <a
                    href="mailto:info@topdealsdholera.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@topdealsdholera.com
                  </a>
                </div>

                <div className="flex items-center mb-6">
                  <div className="text-yellow-500 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <a
                    href="tel:+919871786251"
                    className="text-blue-600 hover:underline"
                  >
                    +91 98 71 78 62 51
                  </a>
                </div>

                <div className="flex space-x-3">
                  <a
                    href="https://x.com/topdealsdh39259"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/topdeals.dholera/"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@Topdealsdholera"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="sr-only">YouTube</span>
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Google Map */}
              {/* <div className="h-56 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3508.9936422630562!2d77.0362407!3d28.4194487!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23d440cffedd%3A0x77e4afa67247493e!2sBookMyAssets!5e0!3m2!1sen!2sin!4v1741251280082!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location map"
                ></iframe>
              </div> */}
            </div>

            {/* Contact Form */}
            <div
              className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-8"
              id="contact-form-container"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>

              {submitStatus.message && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Your message"
                  />
                </div>

                {/* reCAPTCHA container - visible widget */}
                <div className="flex justify-center">
                  <div ref={recaptchaRef}></div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaLoaded}
                  className={`w-full py-3 px-6 text-white font-medium rounded-lg 
              ${
                isSubmitting || !recaptchaLoaded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } transition-colors duration-200`}
                >
                  {!recaptchaLoaded
                    ? "Loading security..."
                    : isSubmitting
                      ? "Sending..."
                      : "Send Message"}
                </button>

                {/* reCAPTCHA attribution */}
                <div className="text-xs text-gray-500 text-center mt-2">
                  This site is protected by reCAPTCHA
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
