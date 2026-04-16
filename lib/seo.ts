// lib/seo.ts — Shared SEO utilities for metadata and JSON-LD

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://playhousenursery.ae";

type MetaOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/images/het-logo.png",
  keywords = [],
}: MetaOptions) {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Playhouse Nursery",
      images: [{ url: `${BASE_URL}${image}`, width: 1200, height: 630, alt: title }],
      type: "website" as const,
      locale: "en_AE",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [`${BASE_URL}${image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1 },
    },
  };
}

// JSON-LD: Local Business schema
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Playhouse Nursery",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/logo.png`,
    description:
      "KHDA-approved British EYFS nursery in the UAE. 3 branches: Khalidiya, Al Reem & Mirdif. Ages 45 days to 6 years.",
    foundingDate: "2011",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Abu Dhabi",
    },
    areaServed: ["Abu Dhabi", "Dubai", "UAE"],
    sameAs: ["https://www.facebook.com/PlayhouseNurseryUAE/", "https://www.instagram.com/playhousenursery.alreem/"],
  };
}

// JSON-LD: BreadcrumbList schema
export type BreadcrumbItem = { name: string; item: string };

export function breadcrumbSchema(crumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item.startsWith("http") ? c.item : `${BASE_URL}${c.item}`,
    })),
  };
}

// JSON-LD: Service schema for service/branch pages
export function serviceSchema({
  name,
  description,
  url,
  areaServed,
}: {
  name: string;
  description: string;
  url: string;
  areaServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Playhouse Nursery",
      url: BASE_URL,
    },
    areaServed: areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };
}
