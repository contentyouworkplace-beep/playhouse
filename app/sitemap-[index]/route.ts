// app/sitemap-[index]/route.ts — Individual sub-sitemap XML files
import { NextResponse } from "next/server";
import { getPageChunks } from "@/lib/seo-pages";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<Record<string, string>> };

export async function GET(_req: Request, { params }: RouteContext) {
  const { index } = await params;
  const chunkIndex = parseInt(index, 10) - 1;
  const chunks = getPageChunks(100);

  if (chunkIndex < 0 || chunkIndex >= chunks.length) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const pages = chunks[chunkIndex];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
