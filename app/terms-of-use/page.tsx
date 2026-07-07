import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use | Playhouse Nursery UAE",
  description:
    "Review the basic terms for using the Playhouse Nursery website, submitting enquiries, and accessing information published on our site.",
  path: "/terms-of-use",
  keywords: ["Playhouse Nursery terms", "website terms of use", "nursery website rules"],
});

const terms = [
  "Website content is provided for general information about Playhouse Nursery, our branches, programmes, and admissions process.",
  "Families should confirm final fees, schedules, programme availability, and branch-specific details directly with our admissions team.",
  "You agree not to misuse forms, submit false information, or attempt to access restricted areas of the website or admin systems.",
  "All branding, text, photos, and published materials on this website remain the property of Playhouse Nursery unless otherwise stated.",
  "We may update website content, service details, and these terms from time to time without separate notice.",
];

export default function TermsOfUsePage() {
  return (
    <>
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Terms of Use</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 760, marginBottom: 24 }}>
            Terms for using the Playhouse Nursery website
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.72)", maxWidth: 620, lineHeight: 1.85 }}>
            These terms help set expectations for how our website content and enquiry tools should be used.
          </p>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ background: "var(--white)", border: "1px solid var(--border)", padding: "36px" }}>
            <ol style={{ margin: 0, paddingLeft: 22, display: "grid", gap: 18 }}>
              {terms.map((term) => (
                <li key={term} style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-light)" }}>
                  {term}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
