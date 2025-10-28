"use client";
import { getblogs } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

// Related Blog Card Component
const RelatedBlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105">
      {/* Image */}
      <div className="relative w-full h-64">
        {blog.mainImage ? (
          <Image
            src={urlFor(blog.mainImage).url()}
            alt={blog.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <Link
          href={`/dholera-smart-city/dholera-sir-blogs/${blog.slug.current}`}
          className="w-full px-4 py-2 transition-all font-semibold border-white  hover:bg-[#deae3c] bg-white hover:text-black text-lg md:text-base text-[#deae3c] mt-auto space-y-3"
        >
          {/* Title */}
          <h3 className="text-xl font-semibold line-clamp-2 h-14">
            {blog.title}
          </h3>

          {/* Meta info */}
          <div className="text-sm text-gray-400">
            <time>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <div>
              Posted By{" "}
              <span className="font-medium text-black">Top Deals Dholera</span>
            </div>
          </div>

          {/* CTA */}
          <div className="underline underline-offset-4 text-lg">Read More</div>
        </Link>
      </div>
    </div>
  );
};

// Loading skeleton component
const BlogSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
    <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>
  </div>
);

export default function LatestUpdates() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const getUpdates = await getblogs();

        const safePosts = getUpdates.map((post) => ({
          ...post,
          author: post.author || "Dholera Times",
          mainImage: post.mainImage || null,
          slug: post.slug || { current: "#" },
        }));

        const trendingBlogs = safePosts
          .sort(
            (a, b) =>
              new Date(b.publishedAt || b._createdAt) -
              new Date(a.publishedAt || a._createdAt)
          )
          .slice(0, 4);

        setBlogs(trendingBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-4 md:py-16 px-4">
        <p className="text-[28px] font-semibold mb-6">Featured Blogs</p>
        <div className="text-center text-red-500">
          <p>Error loading blogs. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-4 md:py-16 px-4">
      <p className="text-[28px] font-semibold mb-6 text-center">
        Featured Blogs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <BlogSkeleton key={i} />)
          : blogs.length > 0
            ? blogs.map((blog) => (
                <RelatedBlogCard key={blog._id} blog={blog} />
              ))
            : Array(4)
                .fill(0)
                .map((_, i) => <BlogSkeleton key={i} />)}
      </div>
    </div>
  );
}
