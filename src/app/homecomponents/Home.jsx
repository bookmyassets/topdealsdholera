"use client";
import React, { useState, useEffect } from "react";
import LandingPage from "./HeroSlider";
import img1 from "../assets/landing/heroDesktop.webp";
import mimg1 from "../assets/landing/heroMobile.webp";

import TestimonialPagination from "./Testimonials";
import EndSection from "./EndSection";
import PopupForm from "../components/PopUpForm";
import DynamicScrollNavigation from "../components/Sidebar";

import WestWyn from "./homecomponents/WestWyn";
import CommonForm from "../components/CommonForm";
import LatestUpdates from "./homecomponents/FeaturedBlogs";
import VideoSlider from "./homecomponents/YouTube";
import FAQSection from "./homecomponents/FAQs";
import AboutDholera from "./AboutDholera";

// Define your sections with their corresponding IDs
const pageSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "westwyn-estate", label: "Westwyn Estate" },
  { id: "form", label: "Form" },
  { id: "why-dholera", label: "Latest Updates" },
  { id: "videos", label: "Dholera Drone Shots" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
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

      <div className="pt-16">
        {" "}
        {/* Add padding to account for fixed nav */}
        <div>
          <section id="hero">
            <LandingPage img1={img1} mimg1={mimg1} />
          </section>

          <section id="about">
            <AboutDholera />
          </section>

          <section id="westwyn-estate">
            <WestWyn />
          </section>

          <section id="form">
            <CommonForm title="Book A Free Site Visit" />
          </section>

          <section id="why-dholera">
            <LatestUpdates />
          </section>

          <section id="videos">
            <VideoSlider />
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
