import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Playhouse Nursery Dubai",
  description: "Learn about Playhouse Nursery — a KHDA-approved British EYFS nursery with 3 branches across UAE. Our story, mission, values and team.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section style={{ background: "var(--dark)", padding: "160px 0 80px", marginTop: 0 }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>About Playhouse</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 700, marginBottom: 24 }}>
            A trusted name in early childhood education across the UAE
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: 560, lineHeight: 1.85 }}>
            Founded with love and a vision to give every child the very best start in life — Playhouse Nursery has been nurturing young minds across three thriving campuses.
          </p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="section-label">Our Story</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--dark)", marginBottom: 24, lineHeight: 1.2 }}>
                Where fun &amp; learning never ends
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20 }}>
                Playhouse Nursery was founded with a simple but powerful belief — that the earliest years of a child's life are the most important. Our founders, experienced educators with a passion for child development, set out to create a nursery that felt less like an institution and more like a second home.
              </p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20 }}>
                Starting with a single branch in Khalidiya, Abu Dhabi, Playhouse has grown to three thriving campuses — Khalidiya, Al Reem Island, and Mirdif Dubai — each carrying the same commitment to excellence, warmth, and child-led learning.
              </p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85 }}>
                We follow the British Early Years Foundation Stage (EYFS) curriculum — a proven, play-based framework recognised worldwide for producing curious, confident, and capable children.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--border)" }}>
              {[
                { num: "3", label: "UAE Branches" },
                { num: "45d", label: "Minimum Age" },
                { num: "KHDA", label: "Licensed & Approved" },
                { num: "15", label: "Max Class Size" },
                { num: "4", label: "Meals Per Day" },
                { num: "EYFS", label: "British Curriculum" },
              ].map((s) => (
                <div key={s.num} style={{ background: "var(--white)", padding: "36px 24px", textAlign: "center" }}>
                  <span style={{ display: "block", fontSize: "2.4rem", fontWeight: 700, color: "var(--dark)", lineHeight: 1, marginBottom: 10 }}>{s.num}</span>
                  <span style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-light)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ padding: "100px 0", background: "var(--off-white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, background: "var(--border)" }}>
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                text: "To provide an exceptional early learning environment that nurtures every child's potential, fosters a love of learning, and builds the foundation for lifelong success.",
              },
              {
                icon: "🌟",
                title: "Our Vision",
                text: "To be the leading nursery group in the UAE, recognised for excellence in British early years education, outstanding pastoral care, and empowering families.",
              },
              {
                icon: "💛",
                title: "Our Promise",
                text: "Every child in our care will be seen, heard, and celebrated. We commit to safety, creativity, joy, and the highest standards of education — every single day.",
              },
            ].map((item) => (
              <div key={item.title} style={{ background: "var(--white)", padding: "52px 36px" }}>
                <span style={{ fontSize: "2.4rem", display: "block", marginBottom: 20 }}>{item.icon}</span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--dark)", marginBottom: 16 }}>{item.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-light)", lineHeight: 1.85 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <span className="section-label">Our Values</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 52, maxWidth: 600, lineHeight: 1.2 }}>
            The principles that guide everything we do
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--border)" }}>
            {[
              { icon: "🔍", value: "Curiosity", desc: "We encourage children to question, explore, and discover." },
              { icon: "🤝", value: "Inclusion", desc: "Every child, regardless of background, belongs and thrives here." },
              { icon: "🛡️", value: "Safety", desc: "Physical, emotional, and psychological safety is never compromised." },
              { icon: "🌱", value: "Growth", desc: "We celebrate each child's unique journey and pace of development." },
              { icon: "🎨", value: "Creativity", desc: "Art, music, drama, and play are at the heart of our curriculum." },
              { icon: "🤗", value: "Warmth", desc: "We treat every child and family with genuine care and compassion." },
              { icon: "🏆", value: "Excellence", desc: "We hold ourselves to the highest standards of education and care." },
              { icon: "🌍", value: "Community", desc: "We build strong relationships with families, staff, and society." },
            ].map((v) => (
              <div key={v.value} style={{ background: "var(--white)", padding: "40px 28px" }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: 14 }}>{v.icon}</span>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 10 }}>{v.value}</h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-light)", lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section id="awards" style={{ padding: "100px 0", background: "var(--dark)" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Recognition</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#fff", marginBottom: 52, lineHeight: 1.2 }}>
            Awards &amp; Accreditations
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "rgba(255,255,255,0.08)" }}>
            {[
              { icon: "🇦🇪", title: "KHDA Approved", desc: "Fully licensed by the Knowledge and Human Development Authority, Dubai's leading education regulator." },
              { icon: "🇬🇧", title: "British EYFS Certified", desc: "Our curriculum is aligned with the UK's Early Years Foundation Stage — one of the world's most respected early education frameworks." },
              { icon: "✅", title: "Regular Inspections", desc: "We welcome regular third-party inspections and consistently maintain outstanding ratings across all branches." },
            ].map((a) => (
              <div key={a.title} style={{ padding: "52px 36px", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "2.4rem", display: "block", marginBottom: 20 }}>{a.icon}</span>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: 14 }}>{a.title}</h4>
                <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.85 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0", background: "var(--white)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 20 }}>
            Ready to give your child the best start?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-light)", marginBottom: 40 }}>
            Schedule a free visit to any of our three branches and see Playhouse for yourself.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#apply" className="btn btn-primary">Leave an Application</Link>
            <Link href="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
