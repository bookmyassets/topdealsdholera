"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";


const faqs = [
  {
    question: "Why is Dholera Smart City the best investment option in India?",
    answer:
      "The Dholera Smart City Project is part of the ambitious Dholera project in Gujarat, offering world class infrastructure, government backed mega projects, and high appreciation potential, making it one of the best investment options in India.",
  },
  {
    question: "When will Dholera International Airport start operations?",
    answer:
      "The Dholera International Airport, a key milestone in the Dholera city development, is expected to start operations by December 2025, boosting passenger and cargo connectivity across India and abroad.",
  },
  {
    question: "When is the Ahmedabad Dholera Expressway inauguration?",
    answer:
      "The Ahmedabad Dholera Expressway, connecting Ahmedabad to Dholera Smart City in under an hour, is expected to be inaugurated by mid-2025, enhancing accessibility and investment appeal.",
  },
  {
    question: "What legal documents are required to buy plots in Dholera?",
    answer:
      "To buy plots in Dholera city, you need a sale deed, NA/NOC clearance, title deed, and valid identification proofs, ensuring secure ownership.",
  },
  {
    question: "How much do I need to invest in Dholera Smart City?",
    answer:
      "Investment in Dholera residential plots starts from around ₹8 lakhs, depending on plot size, location, and the stage of project development.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-2">
              More Questions about Dholera Smart City?
            </p>
            <div className="pt-4">
              <a className="px-2 py-3 bg-[#deae3c] rounded-md" href="tel:+918130371647">Give Us A Missed Call</a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4  md:mt-0 space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-gray-900 font-medium pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 transition-transform duration-200">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 px-0">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}
