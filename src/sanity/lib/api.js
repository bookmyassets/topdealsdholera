import { client } from './client';

const site = "top-deals-dholera";

/* Blog Posts */
export async function getPosts() {
  const query = `*[_type == "post" && "Project" in categories[]->title && site == $site ]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: 'no-store' });
}

export async function getSub() {
  const query = `*[_type == "post" && "Sub-Project" in categories[]->title && author->name == "TDD" && site == $site]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: 'no-store' });
}

export async function getblogs() {
  const query = `*[_type == "post" && "Blog" in categories[]->title && author->name == "TDD" && site == $site]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: 'no-store' });
}

export async function getUpdates() {
  const query = `*[_type == "post" && "Updates" in categories[]->title && author->name == "TDD" && site == $site]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: 'no-store' });
}

export async function getEvents() {
  const query = `*[_type == "post" && "Events" in categories[]->title && author->name == "TDD" && site == $site]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: 'no-store' });
}

/* Project Info */
export async function projectInfo() {
  const query = `*[_type == "post" && "project-Info" in categories[]->title && author->name == "TDD" && site == $site]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: 'no-store' });
}

export async function projectInfoX() {
  const posts = await projectInfo();
  return { relatedProjects: posts };
}

/* Documents */
export async function Inventory() {
  const query = `*[_type == "post" && author->name == "TDD" && "Sub-Project" in categories[]->title && site == $site] | order(publishedAt desc) {
    _id, title, publishedAt, mainImage,
    "pdfUrl": coalesce(pdfFile.asset->url, null),
    "categories": coalesce(categories[]->title, []),
    "author": coalesce(author->name, "Unknown"),
    "isSoldOut": "Sold Out" in categories[]->title
  }`;

  const posts = await client.fetch(query, { site }, { cache: 'no-store' });
  return posts.filter(post => post.pdfUrl);
}

export async function Brochure() {
  const query = `*[_type == "post" && author->name == "TDD" && "Brochure" in categories[]->title && site == $site] | order(publishedAt desc) [0..9] {
    _id, title, publishedAt, mainImage,
    "pdfUrl": coalesce(pdfFile.asset->url, null),
    "category": coalesce(categories[]->title, []),
    "author": coalesce(author->name, "Unknown")
  }`;

  const posts = await client.fetch(query, { site }, { cache: 'no-store' });
  return posts.filter(post => post.pdfUrl);
}

/* Single Post Fetching */
export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "TDD" && site == $site][0]{
    _id, title, metaTitle, metaDescription, "keywords": keywords[]->title, slug,
    mainImage { asset->{ _id, _ref, url, metadata{ dimensions, lqip } }, alt, caption, url },
    publishedAt, _createdAt,
    body[]{ ..., _type=="image"=>{..., asset->{ _id, _ref, url, metadata{ dimensions, lqip } }, "url": url }, markDefs[]{..., _type=="link"=>{"href":@.href}} },
    author->{ name, image }, categories[]->{ title, _id }, readingTime
  }`;
  return await client.fetch(query, { slug, site }, { cache: 'no-store' });
}

export async function getProjectBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "TDD" && site == $site][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title}, mainImage, location, investment, returns,
    "relatedProjects": *[
      _type == "post" && 
      author->name == "TDD" && 
      "Sub-Project" in categories[]->title &&
      site == $site &&
      !("Sold Out" in categories[]->title) &&
      slug.current != $slug
    ]{ title, "slug": slug.current, mainImage }
  }`;
  return await client.fetch(query, { slug, site }, { cache: 'no-store' });
}

export async function getProjectSOBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "TDD" && site == $site][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title}, mainImage, location, investment, returns,
    "relatedProjects": *[
      _type == "post" && 
      author->name == "TDD" && 
      "Sub-Project" in categories[]->title &&
      "Sold Out" in categories[]->title &&
      site == $site &&
      slug.current != $slug
    ]{ title, "slug": slug.current, mainImage }
  }`;
  return await client.fetch(query, { slug, site }, { cache: 'no-store' });
}

export async function getEventBySlug(slug) {
  const query = `*[_type == "event" && slug.current == $slug && site == $site][0]{
    _id, eventName, slug, mainImage, publishedAt, description,
    dateOfEvent, timeOfEvent, location, mapsLink,
    "eventMaterials": eventMaterials.asset->url,
    categories[]->{title, _id}
  }`;
  return await client.fetch(query, { slug, site }, { cache: 'no-store' });
}

/* Helper Functions */
export async function getAllSubProjects() {
  const query = `*[_type == "post" && "Sub-Project" in categories[]->title && author->name == "TDD" && site == $site]{
    title, "slug": slug.current, mainImage, categories[]->{title}
  }`;
  return await client.fetch(query, { site }, { cache: 'no-store' });
}

export async function getSubProjects(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "TDD" && site == $site][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title}, mainImage, location, investment, returns,
    "relatedProjects": *[
      _type == "post" && 
      author->name == "TDD" && 
      "Sub-Project" in categories[]->title && 
      slug.current != $slug &&
      site == $site
    ]{ title, "slug": slug.current, mainImage }
  }`;
  return await client.fetch(query, { slug, site }, { cache: 'no-store' });
}
