import Image from "next/image";
import React from "react";
import sample1 from "../assets/residential/westwyn-estate.webp";
import Link from "next/link";

export default function WestWyn() {
  return (
    <>
      <div className="bg-gray-100">
        <div className="flex flex-col max-sm:flex-col-reverse max-w-7xl mx-auto pt-8 md:flex-row px-4 py-12 gap-8 overflow-hidden">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 max-w-2xl mx-auto md:pt-4 pl-4 pr-4">
            <div className="w-full h-full">
              <Image src={sample1} alt="sample1" />
            </div>
            <div className="pt-4 max-sm:flex max-sm:justify-center max-sm:items-center md:hidden">
              <a
                href="/dholera-plots/westwyn-estate"
                className="text-lg hover:bg-[#deae3c] hover:text-white p-4 border-2 border-[#deae3c] rounded-lg bg-black text-[#deae3c]"
              >
                About WestWyn Estate
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4  md:mt-0 ">
            <h3 className="text-[32px] font-semibold text-black">
              Westwyn Estate
            </h3>
            <h2 className="text-xl font-semibold text-[#deae3c] ">
              The Next Chapter in Dholera’s Growth Story
            </h2>
            <div className="space-y-6 pt-4">
              <div className="">
                <p className="text-lg mb-2 "></p>
                <p className="text-gray-600 ">
                  After the success of WestWyn estate,TopDealsDholera proudly
                  introduces WestWyn Estate - a new benchmark in trust,
                  transparency, and value-driven development. Strategically
                  located on the Vadhela–Navda Highway, right at the entrance of
                  Dholera SIR (0 KM) and near TP5, WestWyn Estate offers
                  unmatched connectivity and high appreciation potential. Each
                  plot is registry-ready, NA / NOC approved, and title clear,
                  plan pass ensuring a secure and future-ready investment.
                  Whether you’re investing for long-term returns or planning
                  your dream space in Dholera Smart City, WestWyn Estate by
                  TopDealsDholera places you at the heart of
                  opportunity and growth.
                </p>
              </div>
            </div>
            <div className="md:pt-12 max-sm:hidden">
              <Link
                href="/dholera-plots/westwyn-estate"
                className="bg-[#deae3c] text-black px-6 py-3 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md"
              >
                About WestWyn Estate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
