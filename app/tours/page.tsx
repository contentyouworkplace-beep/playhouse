import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Facilities | Playhouse Nursery UAE",
  description: "Explore the facilities at each Playhouse Nursery branch — classrooms, play areas, kitchens, and more. KHDA & ADEK approved.",
};

const branches = [
  {
    id: "khalidiya",
    name: "Playhouse Khalidiya",
    label: "Main Branch — Abu Dhabi",
    addr: "Al Khalidiya Street, Villa 11/8, Behind Sheraton Khalidiya Hotel, Abu Dhabi",
    phone: "+971 54 263 2235",
    email: "Mainbranch@playhousenursery.ae",
    hours: "Mon – Fri, 7:00 AM – 6:00 PM",
    wa: "https://wa.me/971542632235?text=Hi!%20I'd%20like%20to%20book%20a%20visit%20to%20Playhouse%20Khalidiya.",
    highlights: [
      { icon: "fa-building", label: "Spacious Main Campus" },
      { icon: "fa-tree", label: "Dedicated Outdoor Play Area" },
      { icon: "fa-utensils", label: "Nutritious Meals Option Available" },
      { icon: "fa-school", label: "Well-Equipped Classrooms" },
      { icon: "fa-shield-alt", label: "24/7 Security & CCTV" },
      { icon: "fa-baby", label: "Baby Sensory Room" },
      { icon: "fa-heartbeat", label: "On-Site Nurse" },
      { icon: "fa-sun", label: "Outdoor Garden & Sandpit" },
    ],
    desc: "Our flagship Khalidiya branch is a spacious, purpose-built nursery in the heart of Abu Dhabi. It features large classrooms, a dedicated baby wing, an outdoor play garden, and a full kitchen preparing four fresh meals daily.",
  },
  {
    id: "al-reem",
    name: "Playhouse Al Reem",
    label: "Al Reem Island — Abu Dhabi",
    addr: "Marina Square, Tala Tower, Unit G-203, Al Reem Island, Abu Dhabi",
    phone: "+971 50 562 4547",
    email: "playhousealreem@gmail.com",
    hours: "Mon – Fri, 7:00 AM – 6:00 PM",
    wa: "https://wa.me/971505624547?text=Hi!%20I'd%20like%20to%20book%20a%20visit%20to%20Playhouse%20Al%20Reem.",
    highlights: [
      { icon: "fa-tree", label: "Outdoor Play Area" },
      { icon: "fa-shapes", label: "Pretend Play Area" },
      { icon: "fa-globe", label: "Cultural Area" },
      { icon: "fa-language", label: "Arabic Class" },
      { icon: "fa-book-reader", label: "Reading Area" },
      { icon: "fa-school", label: "Well-Designed Classroom" },
    ],
    desc: "Nestled in the vibrant Marina Square on Al Reem Island, this branch combines premium early education with dedicated creative and STEM zones. Perfect for island families looking for world-class nursery education.",
  },
  {
    id: "mirdif",
    name: "Playhouse Mirdif",
    label: "Dubai Branch",
    addr: "Mirdif Hills Avenue Mall, Dubai, UAE",
    phone: "+971 52 982 1105",
    email: "Dubaibranch@playhousenursery.ae",
    hours: "Mon – Fri, 7:00 AM – 6:00 PM",
    wa: "https://wa.me/971529821105?text=Hi!%20I'd%20like%20to%20book%20a%20visit%20to%20Playhouse%20Mirdif.",
    highlights: [
      { icon: "fa-book", label: "Library & Reading Corner" },
      { icon: "fa-store", label: "Convenient Mall Location" },
      { icon: "fa-sun", label: "Natural Light Classrooms" },
      { icon: "fa-shield-alt", label: "24/7 Security & CCTV" },
      { icon: "fa-utensils", label: "Organic & Fresh Meals" },
      { icon: "fa-heartbeat", label: "On-Site Nurse" },
      { icon: "fa-running", label: "Movement & Yoga Studio" },
    ],
    desc: "Our Dubai branch inside Mirdif Hills Avenue Mall offers a nature-inspired learning environment with outdoor classrooms, a library corner, and easy mall access — making drop-off and pick-up effortless for busy families.",
  },
];

const whyVisit = [
  { icon: "fa-eye", title: "See It for Yourself", desc: "No website can replace the warmth you feel when you walk through our doors. Come and experience the Playhouse environment first-hand." },
  { icon: "fa-comments", title: "Ask Our Team", desc: "Our branch heads and educators are on hand to answer all your questions — from curriculum to daily routines to meal plans." },
  { icon: "fa-child", title: "Bring Your Child", desc: "We encourage families to bring their little ones on the visit. Children often give you the best feedback!" },
  { icon: "fa-calendar-check", title: "No Commitment Required", desc: "A visit is completely free and obligation-free. We want you to find the right fit for your family." },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Our Facilities</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 680, marginBottom: 24 }}>
            Book a free visit &amp; see Playhouse for yourself
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: 540, lineHeight: 1.85, marginBottom: 40 }}>
            Explore our three UAE branches — each designed to inspire curiosity, comfort, and creativity.
            KHDA &amp; ADEK approved.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#khalidiya" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", background: "var(--white)", color: "var(--dark)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)" }}>
              Khalidiya
            </a>
            <a href="#al-reem" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", background: "transparent", color: "var(--white)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid rgba(255,255,255,0.5)" }}>
              Al Reem
            </a>
            <a href="#mirdif" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", background: "transparent", color: "var(--white)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid rgba(255,255,255,0.5)" }}>
              Mirdif
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY VISIT ── */}
      <section style={{ padding: "80px 0", background: "var(--off-white)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="grid-4col" style={{ background: "var(--border)" }}>
            {whyVisit.map((w) => (
              <div key={w.title} style={{ background: "var(--white)", padding: "36px 28px" }}>
                <i className={`fas ${w.icon}`} style={{ fontSize: "1.6rem", color: "var(--dark)", marginBottom: 16, display: "block" }} />
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 10 }}>{w.title}</h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-light)", lineHeight: 1.75 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANCHES ── */}
      {branches.map((b, i) => (
        <section key={b.id} id={b.id} style={{ padding: "100px 0", background: i % 2 === 0 ? "var(--white)" : "var(--off-white)" }}>
          <div className="container">
            <div className="branch-section-grid">
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 8 }}>{b.label}</p>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 20, lineHeight: 1.2 }}>{b.name}</h2>
                <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 32 }}>{b.desc}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                  {[
                    { icon: "fa-map-marker-alt", text: b.addr },
                    { icon: "fa-phone", text: b.phone },
                    { icon: "fa-envelope", text: b.email },
                    { icon: "fa-clock", text: b.hours },
                  ].map((item) => (
                    <div key={item.icon} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <i className={`fas ${item.icon}`} style={{ color: "var(--text-light)", width: 16, marginTop: 4, flexShrink: 0, fontSize: "0.85rem" }} />
                      <span style={{ fontSize: "0.92rem", color: "var(--text)" }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                <a href={b.wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: "auto", display: "inline-flex" }}>
                  <i className="fab fa-whatsapp" /> Book a Visit
                </a>
              </div>

              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <h4 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 20 }}>Facilities & Highlights</h4>
                <div className="grid-2col" style={{ gap: 2, background: "var(--border)" }}>
                  {b.highlights.map((h) => (
                    <div key={h.label} style={{ background: "var(--white)", padding: "24px 20px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <i className={`fas ${h.icon}`} style={{ color: "var(--dark)", fontSize: "1.1rem", marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--dark)", lineHeight: 1.4 }}>{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── ACCREDITATION STRIP ── */}
      <section style={{ padding: "60px 0", background: "var(--dark)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Approvals & Accreditations</p>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                KHDA &amp; ADEK Approved · British EYFS · Ages 45 days – 5 years (Dubai) / 4 years (Abu Dhabi)
              </h3>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "14px 36px", background: "var(--white)", color: "var(--dark)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)" }}>
                Contact Us
              </Link>
              <Link href="/#apply" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", background: "transparent", color: "var(--white)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid rgba(255,255,255,0.5)" }}>
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
