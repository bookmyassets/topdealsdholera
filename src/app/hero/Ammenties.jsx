import { Dumbbell, ShieldCheck, Waves, Battery } from "lucide-react";

const amenities = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#d7b36c]" />,
    title: "24/7 CCTV Surveillance",
    description: "Round-the-clock security monitoring",
  },
  {
    icon: <Battery className="w-10 h-10 text-[#d7b36c]" />,
    title: "EV Charging Stations",
    description: "Future-ready infrastructure for electric vehicles",
  },
  {
    icon: <Dumbbell className="w-10 h-10 text-[#d7b36c]" />,
    title: "Yoga Center",
    description: "Dedicated space for wellness and meditation",
  },
  {
    icon: <Waves className="w-10 h-10 text-[#d7b36c]" />,
    title: "Swimming Pool",
    description: "Resort-style pool for recreation",
  },
];

export default function Ammenties() {
  
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 pt-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Premium Amenities
          </h2>
          <div className="bg-[#d7b36c] w-32 mx-auto h-1 mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury living with our exclusive amenities designed for
            comfort and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="amenity-item bg-white rounded-lg shadow-md p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {amenity.title}
              </h3>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          ))}
        </div>
      </section>

      
    </>
  );
}