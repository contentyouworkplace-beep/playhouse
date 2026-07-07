import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Playhouse Nursery UAE",
  description:
    "Read how Playhouse Nursery collects, uses, and protects personal information shared through our website, admissions enquiries, and branch communications.",
  path: "/privacy-policy",
  keywords: ["Playhouse Nursery privacy policy", "website privacy", "admissions data policy"],
});

const sections = [
  {
    title: "Information We Collect",
    body:
      "We collect the details you choose to share with us, such as your name, phone number, email address, preferred branch, and admissions enquiry information.",
  },
  {
    title: "How We Use Your Information",
    body:
      "We use your information to respond to enquiries, arrange visits, support admissions, improve our website experience, and communicate relevant nursery updates.",
  },
  {
    title: "How We Protect Data",
    body:
      "We limit access to enquiry information, use secure systems where possible, and review access to internal content tools to reduce unnecessary exposure of personal data.",
  },
  {
    title: "Third-Party Services",
    body:
      "Our website may link to third-party services such as WhatsApp, social media platforms, or external map tools. Their privacy policies apply when you use those services.",
  },
  {
    title: "Your Rights",
    body:
      "You can contact us to update, correct, or request deletion of information you have shared through our website, subject to any legal or operational requirements.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Privacy Policy</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 760, marginBottom: 24 }}>
            How Playhouse Nursery handles personal information
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.72)", maxWidth: 620, lineHeight: 1.85 }}>
            This page explains what information we collect through the website and how we use it to support families and admissions enquiries.
          </p>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ display: "grid", gap: 28 }}>
            {sections.map((section) => (
              <article key={section.title} style={{ border: "1px solid var(--border)", padding: "32px", background: "var(--off-white)" }}>
                <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "var(--dark)", marginBottom: 14 }}>{section.title}</h2>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-light)", margin: 0 }}>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
