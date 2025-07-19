import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const site = "bookmyassets";
  const post = await getPostBySlug(slug, site);

  if (!post) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.metaDescription,
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const site = "bookmyassets";
  const post = await getPostBySlug(slug, site);

  if (!post || !post.slug?.current) {
    notFound();
  }

  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;

        // Use the asset URL directly if urlFor is not working
        const imageUrl =
          value.asset.url || urlFor(value).width(1200).height(800).url();

        const imageNode = (
          <img
            src={imageUrl}
            alt={value.alt || ""}
            className="w-full h-full rounded-lg my-6"
            loading="lazy"
          />
        );

        return (
          <figure className="my-6">
            {value.url ? (
              <a
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity cursor-pointer"
              >
                {imageNode}
              </a>
            ) : (
              imageNode
            )}
            {value.caption && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      htmlTableBlock: ({ value }) => {
        if (!value?.html) return null;

        return (
          <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <div
              className="[&_table]:w-full [&_table]:border-collapse [&_table]:bg-white 
              [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-700 
              [&_th]:bg-gray-50 [&_th]:border-b [&_th]:border-gray-200
              [&_td]:px-6 [&_td]:py-4 [&_td]:text-gray-600 [&_td]:border-b [&_td]:border-gray-200
              [&_tr:last-child_td]:border-b-0
              [&_tr:hover]:bg-gray-50/50
              [&_th:first-child]:rounded-tl-lg [&_th:last-child]:rounded-tr-lg
              [&_tr:last-child_td:first-child]:rounded-bl-lg [&_tr:last-child_td:last-child]:rounded-br-lg"
              dangerouslySetInnerHTML={{ __html: value.html }}
            />
          </div>
        );
      },

      table: ({ value }) => {
        if (!value?.rows || !Array.isArray(value.rows)) {
          return null;
        }

        return (
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <tbody>
                {value.rows.map((row, i) => {
                  if (!row?.cells || !Array.isArray(row.cells)) {
                    return null;
                  }

                  return (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      {row.cells.map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-3 border border-gray-200 text-gray-700"
                        >
                          {cell || ""}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      },

      code: ({ value }) => (
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          <code className="font-mono text-sm">{value.code}</code>
        </pre>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        return (
          <Link
            href={value.href}
            rel="noopener noreferrer"
            className="text-[#C69C21] hover:text-[#FDB913] underline decoration-[#FDB913]/30 hover:decoration-[#FDB913] transition-colors"
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-800">{children}</em>
      ),
      underline: ({ children }) => (
        <u className="underline decoration-gray-400">{children}</u>
      ),
      code: ({ children }) => (
        <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800">
          {children}
        </code>
      ),
      "strike-through": ({ children }) => (
        <del className="line-through text-gray-500">{children}</del>
      ),
      textColor: ({ children, value }) => (
        <span style={{ color: value?.color || "inherit" }}>{children}</span>
      ),
      textBackground: ({ children, value }) => (
        <span style={{ backgroundColor: value?.color || "transparent" }}>
          {children}
        </span>
      ),
      button: ({ children, value }) => {
        const getButtonClasses = () => {
          switch (value.style) {
            case "secondary":
              return "bg-gray-600 hover:bg-gray-700";
            case "outline":
              return "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50";
            default:
              return "bg-blue-600 hover:bg-blue-700";
          }
        };

        return (
          <Link
            href={value.href}
            className={`inline-block px-6 py-2 rounded-lg text-white font-medium transition-colors ${getButtonClasses()}`}
          >
            {value.text || children}
          </Link>
        );
      },
    },

    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-20 mb-8 text-gray-900 border-b border-gray-200 pb-3">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-16 mb-6 text-gray-800 border-b border-gray-200 pb-2">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-lg font-semibold mt-6 mb-2 text-gray-800">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="text-base font-semibold mt-4 mb-2 text-gray-800">
          {children}
        </h6>
      ),
      normal: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-yellow-500 pl-6 my-8 italic text-gray-700 py-2 bg-gray-50 rounded-r-lg shadow-sm">
          {children}
        </blockquote>
      ),
      leftAlign: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-left">
          {children}
        </p>
      ),
      centerAlign: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-center">
          {children}
        </p>
      ),
      rightAlign: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-right">
          {children}
        </p>
      ),
      justify: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-justify">
          {children}
        </p>
      ),
      small: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-base">
          {children}
        </p>
      ),
      medium: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
      ),
      large: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-xl">{children}</p>
      ),
      xlarge: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-2xl">
          {children}
        </p>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
      number: ({ children }) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
    },
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post?.title,
    alternativeHeadline: post.altHeadline || post.title,
    image: post.mainImage?.url,
    author: {
      "@type": "Organization",
      name: "BookMyAssets",
    },
    editor: "BookMyAssets Editorial Team",
    genre: post.genre || "General",
    keywords: post.keywords?.join(", "),
    wordcount: post.wordCount?.toString() || "1000",
    publisher: {
      "@type": "Organization",
      name: "BookMyAssets",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bookmyassets.com/assets/images/logo.png",
      },
    },
    url: `https://www.bookmyassets.com/dholera-sir/${post.slug.current}`,
    mainEntityOfPage: `https://www.bookmyassets.com/dholera-sir/${post.slug.current}`,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    description: post.metaDescription,
  };

  const canonicalUrl = `https://www.bookmyassets.com/dholera-sir/${post.slug.current}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <title>{post.metaTitle}</title>
      <meta name="description" content={post.metaDescription} />
      <meta name="keywords" content={post.keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hero Section with Image */}

      <div className="max-w-7xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        {/* Featured Image Card */}
        {post.mainImage && (
          <div className="mb-10 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl pt-0.5">
          <div className="max-w-4xl mx-auto px-6 md:px-12 ">
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} components={components} />
            </div>

            {/* Tags Section */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h4 className="text-sm uppercase tracking-wider font-semibold text-gray-500 mb-4">
                Related Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.bookmyassets.com/blogs/why-invest-in-dholera-india-first-greenfield-smart-city"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  Greenfield City Project
                </a>
                <a
                  href="https://www.bookmyassets.com/blogs/how-tata-semiconductor-fab-dholera-impact-plot-prices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  TATA Semiconductor Fab Dholera
                </a>
                <a
                  href="https://www.bookmyassets.com/blogs/dholera-solar-power-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  Solar Power Plant
                </a>
                <a
                  href="https://www.bookmyassets.com/projects/dholera/westwyn-county-wc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  WestWyn County by BookMyAssets
                </a>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Want to learn more?
              </h3>
              <p className="text-gray-600 mb-6">
                Discover more investment opportunities with BookMyAssets™
                today.
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Space */}
      <div className="py-16"></div>
    </div>
  );
}
