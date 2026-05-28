import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admissions | Playhouse Nursery Dubai — How to Enroll",
  description: "How to enroll your child at Playhouse Nursery. KHDA & ADEK approved British EYFS nursery. 4 simple steps to secure your child's place.",
};

const steps = [
  {
    num: "01",
    icon: "fa-comment-dots",
    title: "Contact Us",
    desc: "Reach out via WhatsApp, phone call, or our online enquiry form. Our admissions team will answer all your questions and help you choose the right programme for your child's age and needs.",
    action: { label: "WhatsApp Us", href: "https://wa.me/971542632235", icon: "fab fa-whatsapp" },
  },
  {
    num: "02",
    icon: "fa-building",
    title: "Book a Branch Visit",
    desc: "Schedule a free, no-obligation visit to your nearest branch. Meet our educators, see the classrooms, play areas, and facilities — and let your child experience the Playhouse environment first-hand.",
    action: { label: "Book a Visit", href: "/contact", icon: "fas fa-calendar-check" },
  },
  {
    num: "03",
    icon: "fa-file-alt",
    title: "Submit Documents",
    desc: "Once you're ready to proceed, submit the required documents: your child's passport copy, Emirates ID copy, vaccination records, and any relevant medical information. Our team will prepare your enrollment file.",
    action: null,
  },
  {
    num: "04",
    icon: "fa-pen-fancy",
    title: "Sign & Confirm",
    desc: "Review and sign your child's enrollment agreement. Once the registration fee is paid, your child's place is officially confirmed. We'll send you a welcome pack and onboarding details.",
    action: null,
  },
];

const docs = [
  "Passport copy (child + parent/guardian)",
  "Emirates ID copy (child + parent/guardian)",
  "Up-to-date vaccination card",
  "Birth certificate copy",
  "Any relevant medical reports or allergy information",
  "Passport-size photograph of the child",
];

const faqs = [
  { q: "When can I enroll?", a: "We accept enrollments year-round. However, places fill quickly — especially for our Baby Nest programme. We recommend contacting us at least 4–6 weeks before your desired start date." },
  { q: "Is there a registration fee?", a: "Yes, a one-time registration fee is payable upon signing the enrollment agreement. This secures your child's place and covers administrative processing." },
  { q: "What is the notice period for withdrawal?", a: "One calendar month's written notice is required for withdrawal. Please refer to your enrollment agreement for full terms." },
  { q: "Do you offer a trial period?", a: "Yes, we offer a complimentary settling-in session for all new children before their first official day, to help them feel comfortable in their new environment." },
  { q: "Are fees paid monthly?", a: "Tuition fees are invoiced monthly and payable in advance. We accept bank transfers and cheques. For more details, please contact your nearest branch." },
  { q: "Can I apply for multiple branches?", a: "Yes, you can apply to any or all of our branches simultaneously. Our team will help you find availability across Khalidiya, Al Reem, and Mirdif." },
];

const programmes = [
  { icon: "🍼", age: "45 days – 1 year", name: "Baby Nest" },
  { icon: "🧸", age: "1 – 2 years", name: "Tiny Explorers" },
  { icon: "🎨", age: "2 – 3 years", name: "Little Learners" },
  { icon: "⭐", age: "3 – 4 years", name: "Creative Stars" },
  { icon: "🎓", age: "4 – 5 years", name: "School Readiness" },
];

export default function AdmissionsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Admissions</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 700, marginBottom: 24 }}>
            Joining Playhouse is simple
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: 540, lineHeight: 1.85 }}>
            Four easy steps to secure your child&apos;s place at a KHDA &amp; ADEK approved British EYFS nursery across Abu Dhabi and Dubai.
          </p>
        </div>
      </section>

      {/* ── AGE GROUPS ── */}
      <section style={{ padding: "60px 0", background: "var(--off-white)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 20 }}>We Accept Children Aged</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, background: "var(--border)" }}>
            {programmes.map((p) => (
              <div key={p.name} style={{ background: "var(--white)", padding: "28px 20px", textAlign: "center" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: 10 }}>{p.icon}</span>
                <span style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: "var(--dark)", color: "var(--white)", padding: "4px 10px", borderRadius: 2, marginBottom: 8 }}>{p.age}</span>
                <span style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--dark)" }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <span className="section-label">Enrollment Process</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 60, lineHeight: 1.2 }}>
            4 steps to join Playhouse
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--border)" }}>
            {steps.map((s) => (
              <div key={s.num} style={{ background: "var(--white)", padding: "52px 32px" }}>
                <span style={{ display: "block", fontSize: "4rem", fontWeight: 700, color: "var(--border)", lineHeight: 1, marginBottom: 20 }}>{s.num}</span>
                <i className={`fas ${s.icon}`} style={{ fontSize: "1.6rem", color: "var(--dark)", marginBottom: 16, display: "block" }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontSize: "0.92rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: s.action ? 24 : 0 }}>{s.desc}</p>
                {s.action && (
                  <a href={s.action.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "var(--dark)", color: "var(--white)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "1px", textTransform: "uppercase", borderRadius: 2, textDecoration: "none" }}>
                    <i className={s.action.icon} /> {s.action.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <section style={{ padding: "80px 0", background: "var(--off-white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="section-label">Required Documents</span>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 20, lineHeight: 1.2 }}>
                What to bring for enrollment
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 32 }}>
                Please have the following ready when you come in to sign your enrollment agreement. Digital or printed copies are both accepted.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 2, background: "var(--border)" }}>
                {docs.map((d) => (
                  <li key={d} style={{ background: "var(--white)", padding: "16px 24px", display: "flex", alignItems: "center", gap: 14, fontSize: "0.95rem", color: "var(--text)" }}>
                    <i className="fas fa-check" style={{ color: "var(--dark)", fontWeight: 700, flexShrink: 0 }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="section-label">Important Notes</span>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 20, lineHeight: 1.2 }}>
                Things to know
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "fa-clock", title: "Enroll Early", desc: "Places, especially for Baby Nest (45 days – 1 year), are in high demand. We recommend reserving your spot as early as possible." },
                  { icon: "fa-heart", title: "Settling-In Period", desc: "All new children receive a complimentary settling-in session before their first official day to help ease the transition." },
                  { icon: "fa-globe", title: "All Nationalities Welcome", desc: "We welcome children from all nationalities and cultural backgrounds. Bilingual support is available in English and Arabic." },
                  { icon: "fa-award", title: "KHDA & ADEK Approved", desc: "All three branches are fully approved and regularly inspected by KHDA (Dubai) and ADEK (Abu Dhabi)." },
                ].map((n) => (
                  <div key={n.title} style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: "20px 24px", background: "var(--white)", border: "1px solid var(--border)" }}>
                    <i className={`fas ${n.icon}`} style={{ fontSize: "1.2rem", color: "var(--dark)", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--dark)", marginBottom: 6 }}>{n.title}</h4>
                      <p style={{ fontSize: "0.88rem", color: "var(--text-light)", lineHeight: 1.7 }}>{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 0", background: "var(--white)" }}>
        <div className="container">
          <span className="section-label">FAQ</span>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 48, lineHeight: 1.2 }}>
            Admissions questions answered
          </h2>
          <div style={{ borderTop: "1px solid var(--border)", maxWidth: 860 }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ borderBottom: "1px solid var(--border)", padding: "28px 0" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 12 }}>{f.q}</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-light)", lineHeight: 1.85 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0", background: "var(--dark)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 20 }}>
            Ready to secure your child&apos;s place?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", marginBottom: 40 }}>
            Contact our admissions team today — we&apos;re here to help every step of the way.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", background: "var(--white)", color: "var(--dark)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)" }}>
              <i className="fas fa-envelope" /> Contact Us
            </Link>
            <a href="https://wa.me/971542632235" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", background: "var(--whatsapp)", color: "var(--white)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--whatsapp)" }}>
              <i className="fab fa-whatsapp" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
