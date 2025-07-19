"use client"
import bgImg from "@/assests/landing/bgIMG.webp"
import Image from 'next/image'
import semiconductor from "@/assests/landing/tata_semiconductor_plant.webp";
import rail from "@/assests/landing/mono_rail_connectivity.webp";
import airport from "@/assests/landing/dholera_international_airport.webp";
import expressway from "@/assests/landing/expressway_landing.webp";
import solar from "@/assests/landing/renewable_solar.webp";
import mega from "@/assests/landing/freight.webp";

const cardsData = [
  {
    image: airport,
    title: "International Airport",
    backTitle: "International Airport",
    description:
      "A world-class international airport facilitating global connectivity for businesses and residents, making Dholera a gateway to international markets.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    image: expressway,
    title: "Dholera - Ahmedabad Expressway",
    backTitle: "Dholera - Ahmedabad Expressway",
    description:
      "A high-speed expressway connecting Dholera to Ahmedabad, reducing travel time significantly and improving regional connectivity for commerce and tourism.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    image: rail,
    title: "Monorail Project",
    backTitle: "Advanced Monorail System",
    description:
      "A modern transportation network connecting Dholera with major cities, enhancing accessibility and reducing travel time for residents and businesses.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    image: semiconductor,
    title: "Tata Semiconductor",
    backTitle: "Tata Semiconductor Plant",
    description:
      "A state-of-the-art semiconductor manufacturing facility bringing thousands of jobs and cutting-edge technology to the region, boosting economic growth.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },

  {
    image: solar,
    title: "Dholera Solar Power Plant",
    backTitle: "Dholera Solar Power Plant",
    description:
      "A massive renewable energy project providing clean power to the city and industries, establishing Dholera as a sustainable smart city of the future.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    image: mega,
    title: "Dholera Freight Coridor",
    backTitle: "Dholera Freight Coridor",
    description:
      "A vast industrial development zone attracting global manufacturers with world-class infrastructure and business-friendly policies.",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
];


export default function WhyDholera() {

  return (
    <div id='WhyDholera' className="relative">
        <style jsx global>{`
            .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-inner {
          transition: transform 0.7s;
        }

        /* Remove conflicting styles */
        .group:hover .group-hover\:opacity-0,
        .group:hover .group-hover\:opacity-100 {
          opacity: 1 !important;
        }

          /* Animation when visible */
        .animate-visible {
          opacity: 1;
          transform: translate(0, 0) !important; /* Override all transforms */
        }

        .animate-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Staggered children animation */
        .stagger-children > * {
          opacity: 0;
          transform: translateY(15px);
          transition:
            opacity 0.4s ease,
            transform 0.4s ease;
        }

        .stagger-children.animate-visible > *:nth-child(1) {
          transition-delay: 0.1s;
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-children.animate-visible > *:nth-child(2) {
          transition-delay: 0.2s;
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-children.animate-visible > *:nth-child(3) {
          transition-delay: 0.3s;
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-children.animate-visible > *:nth-child(4) {
          transition-delay: 0.4s;
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-children.animate-visible > *:nth-child(5) {
          transition-delay: 0.4s;
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-children.animate-visible > *:nth-child(6) {
          transition-delay: 0.4s;
          opacity: 1;
          transform: translateY(0);
        }

        /* Flip card animation */
        .flip-card {
          perspective: 1000px;
        }

        .flip-card-inner {
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 2rem;
        }
        `}
        </style>
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
              src={bgImg}
              alt='background'
              fill
              className="object-cover"
              priority
          />
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content on top of background */}
        <section id="why-invest" className="relative z-10 px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight font-poppins tracking-tight mb-4 text-white drop-shadow-lg">
                Westwyn County Mega Projects
                
              </h2>
              <div className="w-24 h-1 bg-[#d7b36c] mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {cardsData.map((card, index) => (
                <div
                  key={index}
                  className="flip-card h-80 max-sm:h-64 w-full perspective-1000" // Added perspective here
                >
                  <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d">
                    {/* Front Side */}
                    <div className="flip-card-front absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col">
                      <div className="h-36 md:h-48 relative flex-shrink-0">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center mb-4">
                          <div className="bg-[#d7b36c] p-2 rounded-full">
                            {card.icon}
                          </div>
                          <h3 className="ml-3 text-lg md:text-xl font-extrabold text-gray-800">
                            {card.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="flip-card-back absolute w-full h-full backface-hidden bg-[#d7b36c] text-white rounded-lg p-6 flex flex-col justify-center transform-rotate-y-180">
                      <h3 className="text-2xl font-bold mb-4">
                        {card.backTitle}
                      </h3>
                      <p className="text-lg">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

    </div>
  )
}