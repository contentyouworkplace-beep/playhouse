import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { buildMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { getContent, type Branch, type Review, type StaffMember } from "@/lib/data/store";


const programs = [
  { icon: "🍼", title: "Baby Nest", age: "45 days – 1 year", desc: "A safe, nurturing space for your littlest ones with sensory play, tummy time, and gentle routines." },
  { icon: "🧸", title: "Tiny Explorers", age: "1 – 2 years", desc: "Building confidence through discovery — first steps in social interaction, language, and motor skills." },
  { icon: "🎨", title: "Little Learners", age: "2 – 3 years", desc: "Creative play meets structured learning — communication, emotional awareness, and early literacy." },
  { icon: "⭐", title: "Creative Stars", age: "3 – 4 years", desc: "EYFS-based curriculum blending creativity, numeracy, and literacy through hands-on activities." },
  { icon: "🎓", title: "School Readiness", age: "4 – 5 years", desc: "Preparing confident learners for primary school with phonics, math, and social-emotional skills." },
];

export async function generateStaticParams() {
  return [{ slug: "khalidiya" }, { slug: "al-reem" }, { slug: "mirdif" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getContent();
  const foundBranch = (data.branches || []).find((b: Branch) => b.slug === slug);
  if (!foundBranch) return { title: "Branch Not Found" };
  const branch = { ...foundBranch, tagline: foundBranch.description };
  const maxAge = (slug === "al-reem" || slug === "khalidiya") ? "4 years" : "5 years";
  return buildMetadata({
    title: `${branch.name} | Playhouse Nursery UAE`,
    description: `${branch.tagline} — Playhouse Nursery offers KHDA & ADEK approved British EYFS early education for ages 45 days to ${maxAge}.`,
    path: `/branches/${slug}`,
    keywords: ["nursery UAE", "EYFS nursery", branch.name, slug, "Playhouse Nursery", "British curriculum"],
  });
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getContent();
  const foundBranch = (data.branches || []).find((b: Branch) => b.slug === slug);
  if (!foundBranch) notFound();

  const branchKey = slug === "khalidiya" ? "Khalidiya" : slug === "al-reem" ? "Al Reem" : "Mirdif";
  const branchReviews = (data.reviews || []).filter((r: Review) => r.branch === branchKey);

  let branchStaff: StaffMember[] | null = null;
  if (slug === "al-reem") {
    branchStaff = data.staff || [];
  }

  const branch = {
    ...foundBranch,
    tagline: foundBranch.description,
    staff: branchStaff
  };
  const breadcrumb = breadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Branches", item: "/branches" },
    { name: branch.name, item: `/branches/${slug}` },
  ]);
  const service = serviceSchema({
    name: branch.name,
    description: branch.tagline || branch.description || `${branch.name} branch information`,
    url: `/branches/${slug}`,
    areaServed: ["Dubai", "UAE"],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      {/* ========== HERO ========== */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${branch.heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className={styles.heroContent}>
          <span className={styles.heroBadge} style={{ background: branch.color }}>
            <i className="fas fa-map-marker-alt" /> {branch.name}
          </span>
          <h1>{branch.name}</h1>
          <p>{branch.tagline}</p>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ========== INFO ========== */}
      <section className={styles.infoSection} id="contact">
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoContent}>
              <h2>About {branch.name}</h2>
              <div className={styles.address}>
                <i className="fas fa-map-marker-alt" />
                <span>{branch.address}</span>
              </div>
              <p>{branch.description}</p>
              <div className={styles.highlights}>
                {branch.highlights?.map((h) => (
                  <div key={h.label} className={styles.highlight}>
                    <i className={`fas ${h.icon}`} />
                    <span>{h.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.actions}>
                <a
                  href={branch.whatsapp}
                  className="btn btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "auto" }}
                >
                  <i className="fab fa-whatsapp" /> Book a Visit
                </a>
                <Link href="/tours" className="btn btn-outline">
                  <i className="fas fa-school" /> Our Facilities
                </Link>
              </div>
            </div>
            <div className={styles.detailsCard}>
              <div className={styles.detailsHeader} style={{ background: branch.gradient }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: 8 }}>📍</span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>{branch.name}</h3>
              </div>
              <div className={styles.detailsBody}>
                <ul className={styles.detailsList}>
                  <li><i className="fas fa-map-marker-alt" /> {branch.address}</li>
                  <li><i className="fas fa-phone" /> {branch.phone}</li>
                  <li><i className="fas fa-clock" /> {branch.hours}</li>
                  <li><i className="fas fa-envelope" /> {branch.email}</li>
                </ul>
                <a
                  href={branch.whatsapp}
                  className="btn btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROGRAMS ========== */}
      <section className={styles.programsSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Programs</span>
            <h2>Programs at {branch.name}</h2>
            <p>Tailored learning for every age, following the British EYFS curriculum.</p>
          </div>
          <div className={styles.programsGrid}>
            {programs
              .filter((p) => {
                if ((slug === "al-reem" || slug === "khalidiya") && p.title === "School Readiness") {
                  return false;
                }
                return true;
              })
              .map((p) => (
                <div key={p.title} className={styles.programCard}>
                  <div className={styles.programIcon}>{p.icon}</div>
                  <h4>{p.title}</h4>
                  <span className={styles.programAge}>{p.age}</span>
                  <p>{p.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ========== GALLERY STRIP ========== */}
      <section className={styles.galleryStrip} id="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Gallery</span>
            <h2>Life at {branch.name}</h2>
          </div>
          <div className={styles.galleryGrid}>
            {branch.galleryImages?.map((src: string) => (
              <div key={src} className={styles.galleryItem}>
                <img src={src} alt={`${branch.name} gallery`} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Link href="/gallery" className="btn btn-primary">
              <i className="fas fa-images" /> View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MEET THE TEAM ========== */}
      {branch.staff && (
        <section className={styles.staffSection}>
          <div className="container">
            <div className="section-header" style={{ textAlign: "center" }}>
              <span className="section-tag">Our Educators</span>
              <h2>Meet the {branch.name} Team</h2>
            </div>
            <div className={styles.staffGrid}>
              {branch.staff?.map((s) => (
                <div key={s.name} className={styles.staffCard}>
                  <div className={styles.staffPhoto} style={{ background: s.bg }}>
                    <span className={styles.staffEmoji}>{s.emoji}</span>
                  </div>
                  <div className={styles.staffInfo}>
                    <h4>{s.name}</h4>
                    <span className={styles.staffRole}>{s.role}</span>
                    <div style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "12px", textAlign: "left" }}>
                      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                        {s.quals?.map((q: string) => (
                          <li key={q} style={{ fontSize: "0.82rem", color: "var(--text-light)", marginBottom: "6px", display: "flex", gap: "8px", alignItems: "flex-start", lineHeight: "1.4" }}>
                            <span style={{ color: branch.color, fontWeight: "bold" }}>•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== TESTIMONIALS ========== */}
      {branchReviews.length > 0 && (
        <section className={styles.testimonialsSection}>
          <div className="container">
            <div className="section-header" style={{ textAlign: "center" }}>
              <span className="section-tag">What Parents Say</span>
              <h2>Reviews from {branch.name} Parents</h2>
            </div>
            <div className={styles.testimonialsGrid}>
              {branchReviews.map((r) => (
                <div key={r.name} className={styles.testimonialCard}>
                  <div>
                    <div className={styles.stars}>
                      {Array.from({ length: r.rating }).map((_, i: number) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p>&ldquo;{r.text}&rdquo;</p>
                  </div>
                  <div className={styles.author}>
                    <strong>{r.name}</strong>
                    <span>{r.since}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== CTA ========== */}
      <section className={styles.ctaSection} style={{ background: branch.gradient }}>
        <div className="container">
          <h2>Ready to Visit {branch.name}?</h2>
          <p>Book an in-person tour and experience the Playhouse magic firsthand.</p>
          <div className={styles.ctaButtons}>
            <a
              href={branch.whatsapp}
              className="btn btn-lg"
              style={{ background: "white", color: branch.color, borderColor: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp" /> Book via WhatsApp
            </a>
            <Link
              href="/contact"
              className="btn btn-lg"
              style={{ background: "transparent", color: "white", borderColor: "rgba(255,255,255,0.5)" }}
            >
              <i className="fas fa-phone" /> Call Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
