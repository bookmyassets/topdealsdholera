import { getUpdates, projectInfo } from "@/sanity/lib/api";
import hero from "@/app/assets/blogHero.webp";
import herom from "@/app/assets/dholeraSIRm.webp";
import Image from "next/image";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";

export default async function BlogsPage() {
  let posts = [];
  try {
    const postsData = await projectInfo();

    posts = Array.isArray(postsData) ? postsData : [];
    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching project info:", error);
  }

  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "TopDealsDholera",
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  // Fetch trending blogs
  let trendingBlogs = [];
  try {
    const updatesData = await getUpdates();
    trendingBlogs = Array.isArray(updatesData) ? updatesData.slice(0, 3) : [];
  } catch (error) {
    console.error("Error fetching updates:", error);
  }

  const canonicalUrl = `https://www.TopDealsDholera.com/dholera-smart-city/about-dholera-sir`;

  return (
    <>
      {/* Hero Section with Black Background */}
      <div className="bg-black text-white">
        <meta
          name="description"
          content="Explore Dholera SIR—India’s premier greenfield smart city. Get the latest infrastructure, connectivity, smart-tech & investment insights with TopDealsDholera."
        />
        <div className="px-4 relative">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
            <Image
              src={hero}
              alt="Dholera SIR"
              fill
              priority
              className="object-cover max-sm:hidden"
            />
            <Image
              src={herom}
              alt="Dholera SIR"
              fill
              priority
              className="object-cover h-full md:hidden"
            />
            <div className="absolute inset-0 max-w-6xl mx-auto flex items-center p-6 text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Dholera SIR
                <br />
                <span className="text-[#ddb954]">
                  Special Investment <br /> Region
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-12 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Trending Section - Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#FDB913] sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Latest Updates on Dholera
              </h2>
              {trendingBlogs.length > 0 ? (
                <div className="space-y-6">
                  {trendingBlogs.map((post) => (
                    <TrendingBlogItem key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No updates available at the moment.
                </p>
              )}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="lg:w-3/4">
            {safePosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safePosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Blog Posts Available
                </h3>
                <p className="text-gray-600">
                  Check back soon for information about Dholera SIR investment
                  opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get All the Updates</h2>
          <p className="text-lg text-gray-300 mb-8">
            Click the button below to chat directly with our investment advisor
            and get the latest updates, project details, and expert guidance.
          </p>
          <a
            href="https://wa.me/918130371647"
            className="bg-[#FDB913] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#C69C21] transition-colors shadow-lg"
          >
            Get Updates Now
          </a>
        </div>
      </div>
    </>
  );
}
