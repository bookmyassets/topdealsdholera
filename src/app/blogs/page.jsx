import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroD from "../assets/projectsHero.webp";
import heroM from "../assets/projectsMhero.webp";
import { getblogs, getPosts, getSub } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";


export default async function Blogs() {
  // Get both regular posts and sub-projects
  const blogs = await getblogs();
  const subProjects = await getSub();

  const site = "top-deals-dholera"

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
        <section className="flex flex-col w-full sm:h-[50vh] h-[50vh] relative">
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
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            {/* Background Large Text */}
            <p className="text-5xl sm:text-7xl md:text-9xl font-black uppercase text-white/10">
              Dholera Projects
            </p>

            {/* Foreground Main Text */}
            <p className="absolute text-lg sm:text-2xl md:text-4xl font-bold text-white">
              Dholera Projects
            </p>
          </div>
        </section>
      </div>

      <div className="pt-6 sm:pt-10 px-4 relative bg-gradient-to-br from-green-700 via-green-900">
        <div className="absolute inset-0"></div>
        <section className="relative flex flex-col justify-center items-center space-x-8">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sortedProjects.map((project) => {
              const isSoldOut = project.categories?.some(
                (category) => category.title === "Sold Out"
              );

              return (
                <div
                  key={project._id}
                  className={`bg-white shadow-xl ${
                    isSoldOut
                      ? "shadow-red-400 dark:shadow-red-900 opacity-75"
                      : "shadow-green-400 dark:shadow-green-900"
                  } dark:bg-gray-900 mb-6 rounded-lg w-full max-w-xs sm:max-w-none relative`}
                >
                  {isSoldOut && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
                      SOLD OUT
                    </div>
                  )}

                  <div className={`${isSoldOut ? "filter grayscale" : ""}`}>
                    <Image
                      src={urlFor(project.mainImage).url()}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="block object-cover w-full h-[180px] sm:h-[250px]"
                    />
                  </div>

                  <div className="p-3 sm:p-6">
                    <h3
                      className={`text-md sm:text-lg font-semibold ${
                        isSoldOut
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <div className="mt-3 sm:mt-4">
                      {isSoldOut ? (
                        <button
                          disabled
                          className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed text-sm sm:text-base"
                        >
                          Sold Out
                        </button>
                      ) : (
                        <Link
                          href={`/projects/${project.slug?.current}`}
                          passHref
                        >
                          <button className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
                            View Details
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
       
      </div>
    </>
  );
}
