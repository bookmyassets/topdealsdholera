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
    <title>Dholera: A New Era of Sustainable City Living in India</title>
    <meta name="description" content="Invest in Dholera Smart City – a government-backed smart city with premium plots, industrial zones, and rapid infrastructure development. Secure high ROI with early investment today" />
    <meta name="keywords" content="Dholera Smart City, Dholera plot for sale, Dholera real estate, Invest in Dholera, Residential plots in Dholera, Commercial plots in Dholera, Buy land in Dholera, Dholera investment opportunity, Dholera Smart City project, Dholera SIR plots, Dholera property prices, Dholera smart city real estate investment, Government approved plots in Dholera, Dholera international airport, Dholera expressway connectivity, Dholera industrial zone plots" />

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