// app/sitemap.ts — Sitemap index pointing to all sub-sitemaps
import type { MetadataRoute } from "next";
import { getPageChunks, BASE_URL } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const chunks = getPageChunks(100);
  // Return index entries pointing to each sub-sitemap
  return chunks.map((_, index) => ({
    url: `${BASE_URL}/sitemap-${index + 1}.xml`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));
}
