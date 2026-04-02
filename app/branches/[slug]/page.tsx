import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { buildMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";

export const revalidate = 3600;

const branches: Record<string, {
  name: string;
  tagline: string;
  icon: string;
  color: string;
  gradient: string;
  heroImg: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  description: string;
  highlights: { icon: string; label: string }[];
  galleryImages: string[];
}> = {
  marina: {
    name: "Playhouse Marina",
    tagline: "Modern facilities with stunning views in the heart of Dubai Marina",
    icon: "🏙️",
    color: "#0EA5E9",
    gradient: "linear-gradient(135deg, #0EA5E9, #0284C7)",
    heroImg: "/images/branches/marina.jpg",
    address: "Al Sahab Tower, Dubai Marina, Dubai, UAE",
    phone: "+971 4 XXX XXXX",
    email: "marina@playhousenursery.ae",
    hours: "Sun – Thu, 7:00 AM – 6:00 PM",
    whatsapp: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Marina!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.",
    description: "Our flagship Marina branch features modern, purpose-built facilities with stunning views. Children enjoy a blend of indoor and outdoor learning experiences designed to spark curiosity and creativity. Located in the iconic Al Sahab Tower, we offer easy access for families in JBR, Marina Walk, and surrounding communities.",
    highlights: [
      { icon: "fa-tree", label: "Rooftop Garden" },
      { icon: "fa-swimming-pool", label: "Splash Zone" },
      { icon: "fa-utensils", label: "Nutritious Kitchen" },
      { icon: "fa-chalkboard-teacher", label: "Smart Classrooms" },
      { icon: "fa-video", label: "CCTV Access" },
      { icon: "fa-baby", label: "Baby Sensory Room" },
    ],
    galleryImages: [
      "/images/gallery/outdoor-play.jpg",
      "/images/gallery/sensory-play.jpg",
      "/images/gallery/splash-zone.jpg",
      "/images/gallery/art-class.jpg",
    ],
  },
  downtown: {
    name: "Playhouse Downtown",
    tagline: "Premium early education in the bustling heart of Business Bay",
    icon: "🏛️",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    heroImg: "/images/branches/downtown.jpg",
    address: "Executive Tower, Business Bay, Dubai, UAE",
    phone: "+971 4 XXX XXXX",
    email: "downtown@playhousenursery.ae",
    hours: "Sun – Thu, 7:00 AM – 6:00 PM",
    whatsapp: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Downtown!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.",
    description: "Located in the bustling heart of Business Bay, our Downtown branch is designed for busy families who want premium early education at their doorstep. Features dedicated creative and STEM zones, plus a bilingual Arabic-English program that prepares children for a multicultural world.",
    highlights: [
      { icon: "fa-palette", label: "Art Studio" },
      { icon: "fa-music", label: "Music Room" },
      { icon: "fa-flask", label: "STEM Discovery Lab" },
      { icon: "fa-book-reader", label: "Reading Nook" },
      { icon: "fa-video", label: "CCTV Access" },
      { icon: "fa-parking", label: "Easy Parking" },
    ],
    galleryImages: [
      "/images/gallery/art-class.jpg",
      "/images/gallery/music-room.jpg",
      "/images/gallery/science.jpg",
      "/images/gallery/graduation.jpg",
    ],
  },
  jumeirah: {
    name: "Playhouse Jumeirah",
    tagline: "A charming villa setting focused on nature-based learning",
    icon: "🌴",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    heroImg: "/images/branches/jumeirah.jpg",
    address: "Beach Road Villa, Jumeirah 1, Dubai, UAE",
    phone: "+971 4 XXX XXXX",
    email: "jumeirah@playhousenursery.ae",
    hours: "Sun – Thu, 7:00 AM – 6:00 PM",
    whatsapp: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Jumeirah!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.",
    description: "Our charming Jumeirah villa offers a home-like atmosphere with expansive outdoor spaces. Children thrive in our nature-focused environment with a dedicated garden, library corner, and open-air classrooms. Set along Beach Road, it's the perfect nurturing environment for families in Jumeirah and Al Wasl.",
    highlights: [
      { icon: "fa-seedling", label: "Nature Garden" },
      { icon: "fa-book", label: "Library Corner" },
      { icon: "fa-home", label: "Villa Setting" },
      { icon: "fa-sun", label: "Outdoor Classrooms" },
      { icon: "fa-video", label: "CCTV Access" },
      { icon: "fa-utensils", label: "Organic Meals" },
    ],
    galleryImages: [
      "/images/gallery/nature-garden.jpg",
      "/images/gallery/story-time.jpg",
      "/images/gallery/yoga.jpg",
      "/images/gallery/national-day.jpg",
    ],
  },
};

const programs = [
  { icon: "🍼", title: "Baby Nest", age: "45 days – 1 year", desc: "A safe, nurturing space for your littlest ones with sensory play, tummy time, and gentle routines." },
  { icon: "🧸", title: "Tiny Explorers", age: "1 – 2 years", desc: "Building confidence through discovery — first steps in social interaction, language, and motor skills." },
  { icon: "🎨", title: "Creative Stars", age: "2 – 4 years", desc: "EYFS-based curriculum blending creativity, numeracy, and literacy through hands-on activities." },
  { icon: "🎓", title: "School Readiness", age: "4 – 6 years", desc: "Preparing confident learners for primary school with phonics, math, and social-emotional skills." },
];

export async function generateStaticParams() {
  return [{ slug: "marina" }, { slug: "downtown" }, { slug: "jumeirah" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const branch = branches[slug];
  if (!branch) return { title: "Branch Not Found" };
  return buildMetadata({
    title: `${branch.name} | Transport & Logistics UAE`,
    description: `${branch.tagline} — Hadeed Transport serves the UAE with reliable logistics, equipment rental, and transport solutions.`,
    path: `/branches/${slug}`,
    keywords: ["transport UAE", "logistics", branch.name, slug, "Hadeed Transport", "equipment rental UAE"],
  });
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = branches[slug];
  if (!branch) notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hadeed-transport.com";
  const breadcrumb = breadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Branches", item: "/branches" },
    { name: branch.name, item: `/branches/${slug}` },
  ]);
  const service = serviceSchema({
    name: branch.name,
    description: branch.tagline,
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
      <section className={styles.infoSection}>
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
                {branch.highlights.map((h) => (
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
                  <i className="fas fa-vr-cardboard" /> Virtual Tour
                </Link>
              </div>
            </div>
            <div className={styles.detailsCard}>
              <div className={styles.detailsHeader} style={{ background: branch.gradient }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: 8 }}>{branch.icon}</span>
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
            {programs.map((p) => (
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
      <section className={styles.galleryStrip}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Gallery</span>
            <h2>Life at {branch.name}</h2>
          </div>
          <div className={styles.galleryGrid}>
            {branch.galleryImages.map((src) => (
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

      {/* ========== 360° TOUR ========== */}
      <section className={styles.tourSection}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>360° Tour</span>
            <h2 style={{ color: "white" }}>Explore {branch.name}</h2>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>Take an immersive virtual tour from your device.</p>
          </div>
          <div className={styles.tourEmbed}>
            <span className={styles.tourLabel}><i className="fas fa-vr-cardboard" /> 360° Tour</span>
            <div className={styles.playButton}><i className="fas fa-play" /></div>
          </div>
        </div>
      </section>

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
              href="/#contact"
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
