import React from 'react';
import { CheckCircle } from 'lucide-react';
import './AboutUsPage.css'; // Create this CSS file

const AboutUsPage = () => {
  return (
    <div className="about-container ">
      <div className="about-grid pt-20">
        <div className="about-content ">
          <h1 className="about-heading ">
            Investing in the Future of <span className="highlight">Dholera Smart City</span>
          </h1>
          
          <p className="about-text">
            Welcome to <strong>Top Deals Dholera</strong>, your trusted partner for buying plots in Dholera Smart City—India's first planned smart city and a dream project supported by the government.
          </p>
          
          <p className="about-text">
            We specialize in helping you find the best property deals in Dholera, particularly in our flagship project, <strong>WestWyn County</strong>. This premium township features approved residential plots, strategically located near key infrastructure including the upcoming Dholera International Airport, the expressway, and the ABCD building (Dholera's administrative center).
          </p>
        </div>
        
        <div className="trust-box">
          <h2 className="trust-heading">
            Why People Trust Us
          </h2>
          
          <div className="check-item">
            <CheckCircle className="check-icon" />
            <span>Premium plots in prime locations of Dholera</span>
          </div>
          
          <div className="check-item">
            <CheckCircle className="check-icon" />
            <span><strong>WestWyn County</strong> - High-return potential township</span>
          </div>
          
          <div className="check-item">
            <CheckCircle className="check-icon" />
            <span>Government-approved (RERA & AUDA) plots - fully legal and secure</span>
          </div>
          
          <div className="check-item">
            <CheckCircle className="check-icon" />
            <span>Trusted by buyers from Delhi, Noida, Punjab & NRIs</span>
          </div>
          
          <div className="check-item">
            <CheckCircle className="check-icon" />
            <span>Hassle-free process with end-to-end support</span>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2 className="cta-heading">
          Dholera is the Future. Be Part of It.
        </h2>
        <p className="cta-text">
          Start your smart investment journey today with Top Deals Dholera
        </p>
        <button className="cta-button">
          Contact Us Now
        </button>
      </div>
    </div>
  );
};

export default AboutUsPage;