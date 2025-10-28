import React, { useState, useEffect } from "react";
import Image from "next/image";
import tata from "../assets/topdealsDholera.webp";

const dholeraInfo = [
  {
    id: 1,
    image: tata,
    data: "Tata semiconductor ₹91,000",
  },
  {
    id: 2,
    image: tata,
    data: "Tata semiconductor ₹91,000",
  },
  {
    id: 3,
    image: tata,
    data: "Tata semiconductor ₹91,000",
  },
  {
    id: 4,
    image: tata,
    data: "Tata semiconductor ₹91,000",
  },
  {
    id: 5,
    image: tata,
    data: "Tata semiconductor ₹91,000",
  },
  {
    id: 6,
    image: tata,
    data: "Tata semiconductor ₹91,000",
  },
];

export default function AboutDholera() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate through items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dholeraInfo.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentItem = dholeraInfo[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
<div className="flex flex-col-reverse md:flex-row gap-8">
        {/* Left side - Grid */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {dholeraInfo.map((item) => (
              <div 
                key={item.id} 
                className={`border rounded-lg p-3 transition-all duration-300 cursor-pointer ${
                  item.id === currentItem.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setCurrentIndex(item.id - 1)}
              >
                <div className="aspect-square mb-2 relative w-full max-w-[120px] mx-auto">
                  <Image 
                    src={item.image} 
                    alt="Tata Semiconductor" 
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 150px"
                  />
                </div>
                <div className="text-xs sm:text-sm font-medium text-center break-words">
                  {item.data}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Individual item display */}
        <div className="w-full md:w-1/2 max-sm:col-span-1 flex items-start md:items-center justify-center">
          <div className="w-full max-w-md border border-gray-200 rounded-lg p-6 shadow-lg">
            <div className="w-full max-w-[250px] mx-auto aspect-square mb-4 relative">
              <Image 
                src={currentItem.image} 
                alt="Tata Semiconductor" 
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 250px, 300px"
                priority
              />
            </div>
            
            <div className="text-lg sm:text-xl font-bold text-center mb-2">
              {currentItem.data}
            </div>
            
            {/* Add more content here */}
            <div className="text-sm text-gray-600 text-center mb-4">
              <p className="mb-2">Premium investment opportunity in Dholera Smart City</p>
              <ul className="text-left space-y-1 max-w-xs mx-auto">
                <li>• Strategic location near TATA facility</li>
                <li>• High growth potential</li>
                <li>• Modern infrastructure</li>
                <li>• Excellent connectivity</li>
              </ul>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {dholeraInfo.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Manual navigation buttons */}
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={() => setCurrentIndex((prev) => 
                  prev === 0 ? dholeraInfo.length - 1 : prev - 1
                )}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => 
                  (prev + 1) % dholeraInfo.length
                )}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}