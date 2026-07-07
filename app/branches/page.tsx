import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getContent } from "@/lib/data/store";

export const metadata: Metadata = buildMetadata({
  title: "Our Branches | Playhouse Nursery UAE",
  description:
    "Explore Playhouse Nursery branches in Khalidiya, Al Reem, and Mirdif. Find locations, facilities, and contact details for each branch.",
  path: "/branches",
  keywords: ["Playhouse Nursery branches", "nursery Abu Dhabi", "nursery Dubai", "EYFS nursery UAE"],
});

export default function BranchesPage() {
  const data = getContent();
  const branches = data.branches || [];

  return (
    <>
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Our Branches</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 720, marginBottom: 24 }}>
            Three welcoming nurseries across Abu Dhabi and Dubai
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", maxWidth: 620, lineHeight: 1.85 }}>
            Choose the Playhouse branch that fits your family best, then book a visit to meet the team and explore the learning environment in person.
          </p>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: "var(--off-white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {branches.map((branch) => (
              <article
                key={branch.slug}
                style={{ background: "var(--white)", border: "1px solid var(--border)", padding: "36px", display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>
                    {branch.label || branch.name}
                  </p>
                  <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--dark)", marginBottom: 12 }}>
                    {branch.name}
                  </h2>
                  <p style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--text-light)" }}>
                    {branch.description}
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18, display: "grid", gap: 10 }}>
                  <p style={{ margin: 0, color: "var(--text)" }}><strong>Address:</strong> {branch.address}</p>
                  <p style={{ margin: 0, color: "var(--text)" }}><strong>Hours:</strong> {branch.hours}</p>
                  <p style={{ margin: 0, color: "var(--text)" }}><strong>Phone:</strong> {branch.phone}</p>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: "auto", flexWrap: "wrap" }}>
                  <Link href={`/branches/${branch.slug}`} className="btn btn-primary">
                    View Branch
                  </Link>
                  <Link href="/contact" className="btn btn-outline">
                    Contact Us
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
