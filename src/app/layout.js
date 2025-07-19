"use client";
import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./hero/Footer";
import FloatingButtons from "./components/whatsapp";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts load karo pehle */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <style jsx global>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Raleway', sans-serif !important;
          }
          p, span, div {
            font-family: 'Inter', sans-serif !important;
          }
        `}</style>
        <Navbar />
        {children}
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}