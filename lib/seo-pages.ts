// lib/seo-pages.ts
// Central registry of all indexable pages for sitemap generation

import { getContent } from "@/lib/data/store";

export type SeoPage = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://playhousenursery.ae";

export function getAllPages(): SeoPage[] {
  const now = new Date();
  const content = getContent();

  const staticPages: SeoPage[] = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/admissions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/branches`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/curriculum`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/staff`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/tours`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const branchPages: SeoPage[] = (content.branches || []).map((branch) => ({
    url: `${BASE_URL}/branches/${branch.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: SeoPage[] = (content.blogs || []).map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const customPages: SeoPage[] = (content.pages || []).map((page) => ({
    url: `${BASE_URL}/${page.slug.replace(/(^\/|\/$)/g, "")}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...branchPages, ...blogPages, ...customPages];
}

// Split pages into chunks of 100 for individual sitemaps
export function getPageChunks(chunkSize = 100): SeoPage[][] {
  const all = getAllPages();
  const chunks: SeoPage[][] = [];
  for (let i = 0; i < all.length; i += chunkSize) {
    chunks.push(all.slice(i, i + chunkSize));
  }
  return chunks;
}

export { BASE_URL };
