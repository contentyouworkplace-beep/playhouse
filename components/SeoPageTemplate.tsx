// components/SeoPageTemplate.tsx
// Reusable template for service/location SEO pages

import Link from "next/link";
import { breadcrumbSchema, serviceSchema, localBusinessSchema } from "@/lib/seo";

type InternalLink = { label: string; href: string };

type SeoPageTemplateProps = {
  serviceName: string;
  location: string;
  niche: string;
  keywords: string[];
  description: string;
  heroImage?: string;
  pageUrl: string;
  breadcrumbs: { name: string; item: string }[];
  relatedLinks?: InternalLink[];
};

export default function SeoPageTemplate({
  serviceName,
  location,
  niche,
  keywords,
  description,
  heroImage,
  pageUrl,
  breadcrumbs,
  relatedLinks = [],
}: SeoPageTemplateProps) {
  const breadcrumb = breadcrumbSchema(breadcrumbs);
  const service = serviceSchema({
    name: `${serviceName} in ${location}`,
    description,
    url: pageUrl,
    areaServed: [location, "UAE"],
  });
  const business = localBusinessSchema();

  // Default internal links
  const defaultLinks: InternalLink[] = [
    { label: "Home", href: "/" },
    { label: "Our Branches", href: "/branches" },
    { label: "Virtual Tours", href: "/tours" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Team", href: "/staff" },
  ];
  const allLinks = [...defaultLinks, ...relatedLinks];

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />

      <main style={{ paddingTop: "80px", maxWidth: "1100px", margin: "0 auto", padding: "100px 20px 60px" }}>
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "24px", fontSize: "0.875rem", color: "#6b7280" }}>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.item}>
              {i > 0 && <span style={{ margin: "0 8px" }}>›</span>}
              {i === breadcrumbs.length - 1 ? (
                <span>{crumb.name}</span>
              ) : (
                <Link href={crumb.item} style={{ color: "#EAB308", textDecoration: "none" }}>
                  {crumb.name}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Hero */}
        {heroImage && (
          <div style={{ marginBottom: "32px", borderRadius: "16px", overflow: "hidden", maxHeight: "400px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={`${serviceName} in ${location}`} style={{ width: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          <span style={{ background: "#FEF9C3", color: "#713F12", padding: "4px 12px", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600 }}>
            {niche}
          </span>
          <span style={{ background: "#F0FDF4", color: "#166534", padding: "4px 12px", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600 }}>
            {location}
          </span>
        </div>

        {/* Title & Description */}
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "16px", color: "#111827" }}>
          {serviceName} in {location} | Playhouse Nursery
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "#374151", marginBottom: "32px" }}>
          {description}
        </p>

        {/* Keywords */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "48px" }}>
          {keywords.map((kw) => (
            <span
              key={kw}
              style={{ background: "#F3F4F6", color: "#4B5563", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem" }}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Internal Linking Section */}
        <section style={{ borderTop: "1px solid #E5E7EB", paddingTop: "32px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "16px", color: "#111827" }}>
            Explore More Services
          </h2>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "12px", listStyle: "none", padding: 0 }}>
            {allLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    display: "inline-block",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    background: "#FEF9C3",
                    color: "#713F12",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    border: "1px solid #FDE047",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
