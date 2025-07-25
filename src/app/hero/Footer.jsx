import React from "react";
import Link from "next/link";

import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Building, Users, Award, Shield } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Pre-Footer Stats Section */}
      <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-orange-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="flex justify-center mb-2">
                <Users size={32} />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">1000+</div>
              <div className="text-sm md:text-base opacity-90">Happy Investors</div>
            </div>
            <div className="text-white">
              <div className="flex justify-center mb-2">
                <Building size={32} />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">50+</div>
              <div className="text-sm md:text-base opacity-90">Projects Listed</div>
            </div>
            <div className="text-white">
              <div className="flex justify-center mb-2">
                <Award size={32} />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">5+</div>
              <div className="text-sm md:text-base opacity-90">Years Experience</div>
            </div>
            <div className="text-white">
              <div className="flex justify-center mb-2">
                <Shield size={32} />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">100%</div>
              <div className="text-sm md:text-base opacity-90">AUDA Approved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer id="footer" className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              
              {/* About Us Column */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Top Deals Dholera
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  Top Deals Dholera delivers verified, AUDA-approved projects in Dholera — trusted by 1000+ investors for transparent, expert-led investments in India's first planned smart city.
                </p>
                
                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Shield size={16} className="text-yellow-500 mr-2 flex-shrink-0" />
                    AUDA Approved
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Award size={16} className="text-yellow-500 mr-2 flex-shrink-0" />
                    Expert Guidance
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Users size={16} className="text-yellow-500 mr-2 flex-shrink-0" />
                    1000+ Investors
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Building size={16} className="text-yellow-500 mr-2 flex-shrink-0" />
                    Premium Projects
                  </div>
                </div>
                
                {/* Social Media */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                  <div className="flex space-x-3">
                    <a 
                      href="https://www.facebook.com/share/1AXGEEX1M8/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Facebook size={20} className="text-gray-400 group-hover:text-white" />
                    </a>
                    <a 
                      href="https://x.com/BookMyAssets" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gray-800 hover:bg-sky-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Twitter size={20} className="text-gray-400 group-hover:text-white" />
                    </a>
                    <a 
                      href="https://www.instagram.com/bookmyassets/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gray-800 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Instagram size={20} className="text-gray-400 group-hover:text-white" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/bookmyassetss" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gray-800 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Linkedin size={20} className="text-gray-400 group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links Column */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Quick Links</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/projects"
                      className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 text-yellow-500 group-hover:translate-x-1 transition-transform">›</span> 
                      Our Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blogs"
                      className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 text-yellow-500 group-hover:translate-x-1 transition-transform">›</span> 
                      Blog & News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 text-yellow-500 group-hover:translate-x-1 transition-transform">›</span> 
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 text-yellow-500 group-hover:translate-x-1 transition-transform">›</span> 
                      Contact Us
                    </Link>
                  </li>
                </ul>

                {/* Policies Section */}
                <div className="mt-8">
                  <h4 className="text-white font-semibold mb-3">Legal</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/policy/privacy"
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="mr-2 text-yellow-500 group-hover:translate-x-1 transition-transform">›</span> 
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/terms"
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="mr-2 text-yellow-500 group-hover:translate-x-1 transition-transform">›</span> 
                        Terms of Use
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policy/refund-and-cancellation"
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="mr-2 text-yellow-500 group-hover:translate-x-1 transition-transform">›</span> 
                        Refund Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Column */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Get In Touch</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-yellow-500/10 p-2 rounded-lg mr-3 group-hover:bg-yellow-500/20 transition-colors">
                      <MapPin size={18} className="text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Head Office</h4>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        620, JMD Megapolis, Sohna Rd, Sector 48, Gurugram, India 122018
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="flex-shrink-0 bg-yellow-500/10 p-2 rounded-lg mr-3 group-hover:bg-yellow-500/20 transition-colors">
                      <Mail size={18} className="text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <a
                        href="mailto:info@topdealsdholera.com"
                        className="text-gray-300 hover:text-yellow-500 transition-colors text-sm"
                      >
                        info@topdealsdholera.com
                      </a>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <Link href="/contact">
                      <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Contact Our Team
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} <span className="text-yellow-500 font-semibold">Top Deals Dholera™</span>. All rights reserved.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Proudly serving investors in India's first smart city
                  </p>
                </div>
                
                {/* Back to Top Button */}
                <button
                  onClick={scrollToTop}
                  className="group bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Back to top"
                >
                  <ArrowUp size={20} className="text-white group-hover:animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;