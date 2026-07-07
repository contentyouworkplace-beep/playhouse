import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllPages();
}
