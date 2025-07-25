import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroD from "../assets/projectsHero.webp";
import heroM from "../assets/projectsMhero.webp";
import { getblogs } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

export default async function Blogs() {
  // Get blog posts
  const blogs = await getblogs();

  const site = "top-deals-dholera";

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
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
            {/* Background Large Text */}
            <p className="text-5xl sm:text-7xl md:text-9xl font-black uppercase text-white/10 select-none">
              Blog Posts
            </p>

            {/* Foreground Main Text */}
            <div className="absolute">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
                Our Latest Blogs
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl px-4">
                Discover insights, trends, and expert knowledge in real estate and development
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Articles
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogs.map((blog) => {
              const isFeatured = blog.categories?.some(
                (category) => category.title === "Featured"
              );

              return (
                <article
                  key={blog._id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transform hover:-translate-y-2"
                >
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg">
                      ⭐ FEATURED
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    {blog.mainImage ? (
                      <Image
                        src={urlFor(blog.mainImage).url()}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-500 dark:text-gray-400">No image</span>
                        </div>
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    {blog.excerpt && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {blog.categories && blog.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.categories.slice(0, 2).map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Button */}
                    <div className="flex items-center justify-between">
                      <Link href={`/blogs/${blog.slug?.current}`} className="flex-1">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                          Read Article
                          <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No blogs available</h3>
                <p className="text-gray-500 dark:text-gray-500">Check back later for new articles and insights.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}