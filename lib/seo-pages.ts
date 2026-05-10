// lib/seo-pages.ts
// Central registry of all pages for sitemap generation

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

// Static pages
const staticPages: SeoPage[] = [
  { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE_URL}/branches`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/tours`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/staff`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
];

// Dynamic branch slugs
const branchSlugs = ["marina", "downtown", "jumeirah"];
const branchPages: SeoPage[] = branchSlugs.map((slug) => ({
  url: `${BASE_URL}/branches/${slug}`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
}));

// Combine and export all pages
export function getAllPages(): SeoPage[] {
  return [...staticPages, ...branchPages];
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
