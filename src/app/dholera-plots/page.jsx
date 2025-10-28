import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroD from "../assets/projectsHero.webp";
import heroM from "../assets/projectsMhero.webp";
import { getPosts, getSub } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

export default async function Blogs() {
  // Get both regular posts and sub-projects
  const blogs = await getPosts();
  const subProjects = await getSub();

  const site = "top-deals-dholera";

  // Combine all projects
  const allProjects = [...blogs, ...subProjects];

  // Separate sold-out and available projects
  const availableProjects = allProjects.filter(
    (project) =>
      !project.categories?.some((category) => category.title === "Sold Out")
  );

  const soldOutProjects = allProjects.filter((project) =>
    project.categories?.some((category) => category.title === "Sold Out")
  );

  // Combine with available projects first, then sold-out projects
  const sortedProjects = [...availableProjects, ...soldOutProjects];

  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="flex flex-col w-full sm:h-[60vh] h-[50vh] relative overflow-hidden">
          <Image
            src={heroD}
            alt="bg image"
            width={1800}
            height={700}
            className="w-full h-full object-cover max-sm:hidden"
          />
          <Image
            src={heroM}
            alt="bg image"
            width={1800}
            height={700}
            className="w-full h-full object-cover md:hidden"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
            {/* Background Large Text */}
            <p className="text-5xl sm:text-7xl md:text-9xl font-black uppercase text-white/10 select-none">
              Dholera Projects
            </p>

            {/* Foreground Main Text */}
            <div className="absolute">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
                Premium Dholera Projects
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl px-4">
                Discover exclusive investment opportunities in India's first planned smart city
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 dark:from-gray-900 dark:via-slate-900 dark:to-emerald-950">
        <div className="container mx-auto px-4 py-16">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Explore our carefully curated selection of premium properties in Dholera SIR
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedProjects.map((project) => {
              const isSoldOut = project.categories?.some(
                (category) => category.title === "Sold Out"
              );

              const isNew = project.categories?.some(
                (category) => category.title === "New Launch"
              );

              return (
                <article
                  key={project._id}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 ${
                    isSoldOut ? "opacity-80" : "hover:border-green-200 dark:hover:border-green-700"
                  }`}
                >
                  {/* Status Badges */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    {isSoldOut && (
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🔴 SOLD OUT
                      </div>
                    )}
                    {isNew && !isSoldOut && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ✨ NEW LAUNCH
                      </div>
                    )}
                  </div>

                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    {project.mainImage ? (
                      <Image
                        src={urlFor(project.mainImage).url()}
                        alt={project.title}
                        width={500}
                        height={300}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isSoldOut 
                            ? "filter grayscale group-hover:grayscale-0" 
                            : "group-hover:scale-110"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-sm text-gray-500 dark:text-gray-400">No image</span>
                        </div>
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      isSoldOut 
                        ? "bg-gradient-to-t from-red-900/30 to-transparent" 
                        : "bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100"
                    }`}></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-3 line-clamp-2 transition-colors ${
                      isSoldOut
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400"
                    }`}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    {project.excerpt && (
                      <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
                        isSoldOut
                          ? "text-gray-400 dark:text-gray-500"
                          : "text-gray-600 dark:text-gray-300"
                      }`}>
                        {project.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {project.categories && project.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.categories
                          .filter(cat => cat.title !== "Sold Out" && cat.title !== "New Launch")
                          .slice(0, 2)
                          .map((category, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isSoldOut
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            }`}
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      {isSoldOut ? (
                        <button
                          disabled
                          className="w-full bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl cursor-not-allowed opacity-60"
                        >
                          🔒 Sold Out
                        </button>
                      ) : (
                        <Link href={`/dholera-plots/${project.slug?.current}`} className="flex-1">
                          <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                            View Details
                            <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        </Link>
                      )}
                    </div>

                    {/* Price or Status Info */}
                    {project.price && !isSoldOut && (
                      <div className="mt-3 text-center">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          Starting from ₹{project.price}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty State */}
          {sortedProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No projects available</h3>
                <p className="text-gray-500 dark:text-gray-500">Check back later for new project launches.</p>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Looking for Something Specific?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our experts can help you find the perfect investment opportunity in Dholera
            </p>
            <Link href="/contact">
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                Contact Our Team
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}