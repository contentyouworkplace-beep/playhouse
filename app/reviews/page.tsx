import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parents Reviews | Playhouse Nursery Dubai",
  description: "Read what Playhouse Nursery parents say about us. Trusted by hundreds of UAE families. KHDA & ADEK approved British EYFS nursery.",
};

const reviews = [
  { name: "Sara Al Mansoori", branch: "Khalidiya", rating: 5, text: "Playhouse Khalidiya has been an incredible experience for our daughter. The teachers are warm, patient, and genuinely passionate about early education. She started at 10 months and has flourished in every way.", since: "Parent since 2022" },
  { name: "David & Emma Thompson", branch: "Al Reem", rating: 5, text: "Moving to Abu Dhabi, we were worried about finding a nursery that matched British standards. Playhouse Al Reem exceeded every expectation. The EYFS curriculum, the communication with parents, and the team are exceptional.", since: "Parent since 2021" },
  { name: "Fatima Khalid", branch: "Mirdif", rating: 5, text: "My son used to cry every morning before nursery at his old school. Since joining Playhouse Mirdif, he wakes up excited to go. The nature garden and outdoor learning are fantastic.", since: "Parent since 2023" },
  { name: "Ravi & Priya Nair", branch: "Khalidiya", rating: 5, text: "The level of care and attention our twins receive is extraordinary. Four fresh meals a day, a qualified nurse on-site, and constant updates via the parent app — we feel completely at ease.", since: "Parent since 2022" },
  { name: "Aisha Mohammed", branch: "Al Reem", rating: 5, text: "The bilingual environment at Al Reem is exactly what we wanted for our daughter. She now speaks confidently in both English and Arabic at just 3 years old. The music and arts programme is also superb.", since: "Parent since 2023" },
  { name: "James & Claire Bennett", branch: "Mirdif", rating: 5, text: "The mall location makes daily drop-off so convenient. But more importantly, the quality of teaching is outstanding. Our son graduated from Playhouse Mirdif ready for Year 1 and thrived from day one.", since: "Parent since 2020" },
  { name: "Noura Al Hamdan", branch: "Khalidiya", rating: 5, text: "What sets Playhouse apart is the genuine warmth of the staff. They remember every child's preferences, their mood patterns, and celebrate every small milestone. It feels like a real family.", since: "Parent since 2021" },
  { name: "Michael O'Brien", branch: "Al Reem", rating: 5, text: "As a parent from Ireland, finding a nursery with British EYFS was essential. The Al Reem branch delivers at the highest level — organised, caring, professional. Our daughter absolutely loves it.", since: "Parent since 2023" },
  { name: "Hana Al Shehhi", branch: "Mirdif", rating: 5, text: "We enrolled our son at 45 days in the Baby Nest programme and have watched him grow into a confident, curious 4-year-old. Playhouse has been part of his journey from the very beginning.", since: "Parent since 2020" },
];

const stats = [
  { num: "500+", label: "Happy Families" },
  { num: "4.9", label: "Average Rating" },
  { num: "3", label: "UAE Branches" },
  { num: "5+", label: "Years of Excellence" },
];

export default function ReviewsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Parents Reviews</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 680, marginBottom: 24 }}>
            Trusted by hundreds of UAE families
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: 520, lineHeight: 1.85 }}>
            Read what parents say about Playhouse Nursery — KHDA &amp; ADEK approved, British EYFS, across 3 branches.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "0 0 0", background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {stats.map((s, i) => (
              <div key={s.num} style={{ textAlign: "center", padding: "52px 24px", borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
                <span style={{ display: "block", fontSize: "3rem", fontWeight: 700, color: "var(--dark)", lineHeight: 1, marginBottom: 10 }}>{s.num}</span>
                <span style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-light)", letterSpacing: "0.5px" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS GRID ── */}
      <section style={{ padding: "100px 0", background: "var(--off-white)" }}>
        <div className="container">
          <span className="section-label">What Parents Say</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 52, lineHeight: 1.2 }}>
            Real stories from real families
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--border)" }}>
            {reviews.map((r) => (
              <div key={r.name} style={{ background: "var(--white)", padding: "44px 36px" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} style={{ color: "#F4B942", fontSize: "1.1rem" }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.98rem", color: "var(--text)", lineHeight: 1.85, marginBottom: 28, fontStyle: "italic" }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, color: "var(--dark)" }}>{r.name}</span>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)" }}>{r.since}</span>
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", background: "var(--dark)", color: "var(--white)", padding: "5px 12px", borderRadius: 2 }}>{r.branch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0", background: "var(--white)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 20 }}>
            Join our growing Playhouse family
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-light)", marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Book a free visit to see why hundreds of UAE families trust Playhouse for their child&apos;s early education.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/admissions" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", background: "var(--dark)", color: "var(--white)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--dark)" }}>
              Start Enrollment
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", background: "transparent", color: "var(--dark)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--dark)" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
