"use client";
import React, { useState, useEffect } from "react";
//import LandingPage from "./body/HeroSlider";
import LandingPage from "./body/HeroSlider";
import img1 from "@/assests/landing/heroDesktop.webp";
import mimg1 from "@/assests/landing/heroMobile.webp";
import WhyInvest from "./body/WhyInvest";
import WhyDholera from "./body/WhyDholera";
import Westwyn from "./body/Westwyn";
import FAQSection from "./body/FAQ";
import About from "./body/About";
import TestimonialPagination from "./body/Testimonials";
import Ammenties from "./body/Ammenties";
import EndSection from "./body/EndSection";
import PopupForm from "./components/PopUpForm";

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div>
        <section>
          <LandingPage
            img1={img1}
            mimg1={mimg1}
            openForm={() => setShowForm(true)}
          />
        </section>
        <About />
        <Westwyn />
        <WhyInvest />
        <WhyDholera />
        <Ammenties />
        <TestimonialPagination />
        <FAQSection />
        <EndSection />
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