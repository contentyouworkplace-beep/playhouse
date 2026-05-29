import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Curriculum | Playhouse Nursery Dubai — British EYFS",
  description: "Playhouse Nursery follows the British EYFS (Early Years Foundation Stage) curriculum. Discover our 7 areas of learning and age-based programmes.",
};

const areas = [
  { num: "01", title: "Communication & Language", icon: "💬", desc: "Building strong spoken language, listening skills, and the ability to express thoughts and feelings through rich conversation, stories, and song." },
  { num: "02", title: "Physical Development", icon: "🏃", desc: "Developing fine and gross motor skills through outdoor play, movement sessions, yoga, dance, and hands-on manipulative activities." },
  { num: "03", title: "Personal, Social & Emotional", icon: "🤗", desc: "Nurturing self-confidence, emotional resilience, empathy, and the ability to build healthy relationships with peers and adults." },
  { num: "04", title: "Literacy", icon: "📖", desc: "Introducing phonics, reading comprehension, and early writing through our structured Jolly Phonics programme and daily story sessions." },
  { num: "05", title: "Mathematics", icon: "🔢", desc: "Exploring numbers, shapes, patterns, measurement, and problem-solving through play-based maths activities and real-world experiences." },
  { num: "06", title: "Understanding the World", icon: "🌍", desc: "Discovering science, history, geography, technology, and cultural diversity through exploration, experiments, and community visits." },
  { num: "07", title: "Expressive Arts & Design", icon: "🎨", desc: "Unleashing creativity through painting, sculpture, music, drama, role play, and design — celebrating each child's unique artistic voice." },
];

const programmes = [
  { age: "45 days – 1 year", name: "Baby Nest", icon: "🍼", desc: "A calm, sensory-rich environment for your youngest. Our specially trained baby practitioners follow a homelike routine that prioritises attachment, comfort, and gentle stimulation.", features: ["1:3 carer-to-baby ratio", "Tummy time & sensory play", "Sleep & feeding support", "Daily parent app updates"] },
  { age: "1 – 2 years", name: "Tiny Explorers", icon: "🧸", desc: "Active, curious toddlers discover the world through movement, language, and social play. First words, first friendships, and first adventures begin here.", features: ["Language & early speech focus", "Structured social play", "Outdoor exploration daily", "Music & movement sessions"] },
  { age: "2 – 3 years", name: "Little Learners", icon: "🎨", desc: "Creative play meets structured learning as children build communication, emotional awareness, and early literacy skills in a nurturing bilingual environment.", features: ["Creative arts & sensory play", "Bilingual exposure (English/Arabic)", "Emotional intelligence focus", "Phonics introduction"] },
  { age: "3 – 4 years", name: "Creative Stars", icon: "⭐", desc: "Full EYFS curriculum delivered through projects, investigations, and joyful hands-on experiences. Children flourish academically and socially.", features: ["Jolly Phonics full programme", "Early numeracy & problem solving", "Science & discovery projects", "Drama & performing arts"] },
  { age: "4 – 5 years", name: "School Readiness", icon: "🎓", desc: "A structured, academically-rich programme that prepares children for confident entry into Year 1. Fully aligned with British primary school expectations.", features: ["Full phonics & reading programme", "Maths — addition, subtraction, shapes", "School uniform & structured day", "Graduation ceremony"] },
];

export default function CurriculumPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>British EYFS</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 700, marginBottom: 24 }}>
            A world-class curriculum, built for your child
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: 560, lineHeight: 1.85 }}>
            We follow the British Early Years Foundation Stage (EYFS) — a proven, play-based framework that develops the whole child across seven key areas of learning.
          </p>
        </div>
      </section>

      {/* ── EYFS OVERVIEW ── */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="section-label">What is EYFS?</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 24, lineHeight: 1.2 }}>
                The Early Years Foundation Stage
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20 }}>
                The EYFS is the statutory framework used in all schools and early years settings in England. It sets the standards that all early years providers must meet to ensure children learn and develop well and are kept healthy and safe.
              </p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20 }}>
                At Playhouse, we use this framework as the backbone of our teaching — enriched with bilingual elements, arts, mindfulness, and our unique outdoor learning programme.
              </p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85 }}>
                Children are assessed regularly through observations and developmental milestones, and parents receive detailed progress reports every term via our parent app.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "var(--border)" }}>
              {[
                { icon: "🎮", label: "Play-Based Learning", desc: "Children learn best through play. Every activity is purposefully designed to build skills." },
                { icon: "👁️", label: "Observation-Led", desc: "Educators continuously observe and adapt learning to each child's individual needs." },
                { icon: "🤝", label: "Partnership with Parents", desc: "Parents are our partners — we communicate daily through our dedicated parent app." },
                { icon: "📊", label: "Regular Assessment", desc: "Termly progress reports track each child's development across all 7 EYFS areas." },
              ].map((item) => (
                <div key={item.label} style={{ background: "var(--white)", padding: "28px 32px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 6 }}>{item.label}</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-light)", lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 AREAS ── */}
      <section style={{ padding: "100px 0", background: "var(--off-white)" }}>
        <div className="container">
          <span className="section-label">EYFS Framework</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 52, lineHeight: 1.2 }}>
            7 Areas of Learning &amp; Development
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--border)" }}>
            {areas.slice(0, 4).map((a) => (
              <div key={a.num} style={{ background: "var(--white)", padding: "44px 32px" }}>
                <span style={{ display: "block", fontSize: "3.5rem", fontWeight: 700, color: "var(--border)", lineHeight: 1, marginBottom: 16 }}>{a.num}</span>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: 16 }}>{a.icon}</span>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 12, lineHeight: 1.3 }}>{a.title}</h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-light)", lineHeight: 1.75 }}>{a.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--border)", marginTop: 2 }}>
            {areas.slice(4).map((a) => (
              <div key={a.num} style={{ background: "var(--white)", padding: "44px 32px" }}>
                <span style={{ display: "block", fontSize: "3.5rem", fontWeight: 700, color: "var(--border)", lineHeight: 1, marginBottom: 16 }}>{a.num}</span>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: 16 }}>{a.icon}</span>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark)", marginBottom: 12, lineHeight: 1.3 }}>{a.title}</h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-light)", lineHeight: 1.75 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMMES ── */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <span className="section-label">Age Groups</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 52, lineHeight: 1.2 }}>
            Tailored programmes for every stage
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "var(--border)" }}>
            {programmes.map((p, i) => (
              <div key={p.name} style={{ background: i % 2 === 0 ? "var(--white)" : "var(--off-white)", padding: "48px 40px", display: "grid", gridTemplateColumns: "200px 1fr", gap: 48, alignItems: "start" }}>
                <div>
                  <span style={{ fontSize: "2.4rem", display: "block", marginBottom: 12 }}>{p.icon}</span>
                  <span style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", background: "var(--dark)", color: "var(--white)", padding: "6px 14px", borderRadius: 2, marginBottom: 12 }}>{p.age}</span>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--dark)" }}>{p.name}</h3>
                </div>
                <div>
                  <p style={{ fontSize: "1rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20 }}>{p.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ fontSize: "0.9rem", color: "var(--text)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ color: "var(--dark)", fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0", background: "var(--dark)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 20 }}>
            Ready to start your child&apos;s learning journey?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", marginBottom: 40 }}>
            Book a free visit and see our curriculum in action.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#apply" style={{ display: "inline-flex", alignItems: "center", padding: "16px 40px", background: "var(--white)", color: "var(--dark)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid var(--white)" }}>
              Apply Now
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "16px 36px", background: "transparent", color: "var(--white)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRadius: 2, border: "2px solid rgba(255,255,255,0.5)" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
