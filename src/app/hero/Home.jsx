"use client";
import React, { useState, useEffect } from "react";
import LandingPage from "./HeroSlider";
import img1 from "../assets/landing/heroDesktop.webp";
import mimg1 from "../assets/landing/heroMobile.webp";
import WhyInvest from "./WhyInvest";
import WhyDholera from "./WhyDholera";
import Westwyn from "./Westwyn";
import FAQSection from "./FAQ";
import About from "./About";
import TestimonialPagination from "./Testimonials";
import Ammenties from "./Ammenties";
import EndSection from "./EndSection";
import PopupForm from "../components/PopUpForm";
import DynamicScrollNavigation from "../components/Sidebar";

// Define your sections with their corresponding IDs
const pageSections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'westwyn-county', label: 'Westwyn County' },
  { id: 'why-invest', label: 'Why Invest' },
  { id: 'why-dholera', label: 'Why Dholera' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
];

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Add the DynamicScrollNavigation component */}
      <div className="">
        <div className="container mx-auto px-4">
          <DynamicScrollNavigation sections={pageSections} />
        </div>
      </div>

      <div className="pt-16"> {/* Add padding to account for fixed nav */}
        <div>
          <section id="hero">
            <LandingPage
              img1={img1}
              mimg1={mimg1}
              openForm={() => setShowForm(true)}
            />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="westwyn-county">
            <Westwyn />
          </section>
          
          <section id="why-invest">
            <WhyInvest />
          </section>
          
          <section id="why-dholera">
            <WhyDholera />
          </section>
          
          <section>
            <Ammenties />
          </section>
          
          <section id="testimonials">
            <TestimonialPagination />
          </section>
          
          <section id="faq">
            <FAQSection />
          </section>
          
          <EndSection />
        </div>
      </div>
      
      {showForm && (
        <PopupForm
          onClose={() => setShowForm(false)}
          title={`Exclusive Deal: Own a plot at ₹9,250/sq. yard — hurry, limited units! –  left`}
          buttonName="Speak with a Plot Specialist"
          className="font-medium"
        />
      )}
    </>
  );
}