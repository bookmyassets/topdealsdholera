"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoSlider() {
  const constantVideo = "https://www.youtube.com/embed/WrgJm1RzwWs?si=Q-D0aRHjoXqsMrz8";
  
  const sliderVideos = [
    "https://www.youtube.com/embed/_iDFQI2YYIQ?si=DcrUnnJhkb6Uw4Ah",
    "https://www.youtube.com/embed/-oRJh9RFqnU?si=1J_mjJXyTBnuCt8f",
    "https://www.youtube.com/embed/E9ucdEIHwA4?si=P3Pqdw1iV5qsULfz",
    "https://www.youtube.com/embed/pgkvnbUXwFA?si=Jy5M5kDSHD1oKCwO"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderVideos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sliderVideos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#deae3c' }}>
          Video Gallery
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Constant Video */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">Featured Video</h2>
            <div className="aspect-video rounded overflow-hidden" style={{ border: '3px solid #deae3c' }}>
              <iframe
                width="100%"
                height="100%"
                src={constantVideo}
                title="Featured Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Video Slider */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-black">More Videos</h2>
              <div className="flex gap-2">
                <button
                  onClick={prevVideo}
                  className="p-2 rounded-full bg-black text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#deae3c' }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextVideo}
                  className="p-2 rounded-full bg-black text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: '#deae3c' }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="aspect-video rounded overflow-hidden" style={{ border: '3px solid #deae3c' }}>
              <iframe
                width="100%"
                height="100%"
                src={sliderVideos[currentIndex]}
                title={`Video ${currentIndex + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {sliderVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    backgroundColor: currentIndex === index ? '#deae3c' : '#ffffff',
                    border: '2px solid #deae3c'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}