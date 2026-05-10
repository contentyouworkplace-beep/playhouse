import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Virtual Tours | Playhouse Nursery UAE",
  description: "Take a virtual tour of Playhouse Nursery branches across UAE. Explore our classrooms, play areas, and facilities.",
  path: "/tours",
  keywords: ["virtual tour UAE", "nursery facility tour", "Playhouse Nursery branches"],
});

const branchTours = [
  {
    id: "khalidiya",
    badge: "Khalidiya Branch",
    color: "khalidiya" as const,
    name: "Playhouse Khalidiya",
    address: "Al Khalidiya Street, Villa 11/8, Behind Sheraton Khalidiya Hotel, Abu Dhabi",
    desc: "Our main Khalidiya branch features spacious classrooms and dedicated outdoor play areas in the heart of Abu Dhabi. Children enjoy a blend of indoor and outdoor learning experiences designed to spark curiosity and creativity.",
    highlights: [
      { icon: "fa-building", label: "Main Campus" },
      { icon: "fa-tree", label: "Outdoor Play Area" },
      { icon: "fa-utensils", label: "Nutritious Kitchen" },
      { icon: "fa-chalkboard-teacher", label: "Smart Classrooms" },
      { icon: "fa-video", label: "CCTV Access" },
      { icon: "fa-baby", label: "Baby Sensory Room" },
    ],
    wa: "https://wa.me/971542632235?text=Hi!%20I'd%20like%20to%20book%20a%20visit%20to%20Playhouse%20Khalidiya.",
    reverse: false,
  },
  {
    id: "al-reem",
    badge: "Al Reem Branch",
    color: "alreem" as const,
    name: "Playhouse Al Reem",
    address: "Al Reem Island, Marina Square, Tala Tower, Unit G-203, Abu Dhabi",
    desc: "Located on the vibrant Al Reem Island, our branch is designed for island families who want premium early education at their doorstep. Features dedicated creative and STEM zones.",
    highlights: [
      { icon: "fa-palette", label: "Art Studio" },
      { icon: "fa-music", label: "Music Room" },
      { icon: "fa-flask", label: "STEM Discovery Lab" },
      { icon: "fa-book-reader", label: "Reading Nook" },
      { icon: "fa-video", label: "CCTV Access" },
      { icon: "fa-parking", label: "Easy Parking" },
    ],
    wa: "https://wa.me/971505624547?text=Hi!%20I'd%20like%20to%20book%20a%20visit%20to%20Playhouse%20Al%20Reem.",
    reverse: true,
  },
  {
    id: "mirdif",
    badge: "Mirdif Branch",
    color: "mirdif" as const,
    name: "Playhouse Mirdif",
    address: "Mirdif Hills Avenue Mall, Dubai, UAE",
    desc: "Our Mirdif branch in Dubai offers modern facilities with nature-inspired play areas and convenient mall access. Children thrive in our nurturing environment with dedicated learning zones.",
    highlights: [
      { icon: "fa-seedling", label: "Nature Garden" },
      { icon: "fa-book", label: "Library Corner" },
      { icon: "fa-store", label: "Mall Location" },
      { icon: "fa-sun", label: "Outdoor Classrooms" },
      { icon: "fa-video", label: "CCTV Access" },
      { icon: "fa-utensils", label: "Organic Meals" },
    ],
    wa: "https://wa.me/971529821105?text=Hi!%20I'd%20like%20to%20book%20a%20visit%20to%20Playhouse%20Mirdif.",
    reverse: false,
  },
];

export default function ToursPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1><i className="fas fa-vr-cardboard" /> 360° Virtual Tours</h1>
          <p>Explore all three Playhouse branches from the comfort of your home. Click, drag, and discover every corner of our nurturing spaces.</p>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* Combined Tour */}
      <section className={styles.combinedTour}>
        <div className="container">
          <div className="section-header light">
            <span className="section-tag">All Branches</span>
            <h2>Complete Playhouse Experience</h2>
            <p>Watch our combined 360° tour covering all three branches — Khalidiya, Al Reem, and Mirdif — in one immersive experience.</p>
          </div>
          <div className={styles.combinedVideo}>
            <div className={styles.tourLabel}><i className="fas fa-vr-cardboard" /> 360° Combined Tour</div>
            <div className={styles.playButton}><i className="fas fa-play" /></div>
            <div className={styles.tourHint}><i className="fas fa-hand-pointer" /> Click to start immersive tour</div>
          </div>
        </div>
      </section>

      {/* Individual Branch Tours */}
      {branchTours.map((branch, idx) => (
        <section key={branch.id} id={branch.id} className={`${styles.tourSection} ${idx % 2 !== 0 ? styles.tourSectionAlt : ""}`}>
          <div className="container">
            <div className={`${styles.tourLayout} ${branch.reverse ? styles.tourLayoutReverse : ""}`}>
              <div className={styles.tourVideoArea}>
                <span className={styles.tourLabel}><i className="fas fa-vr-cardboard" /> 360° Tour</span>
                <div className={styles.playButton}><i className="fas fa-play" /></div>
                <div className={styles.tourHint}><i className="fas fa-hand-pointer" /> Drag to look around</div>
              </div>
              <div className={styles.tourDetails}>
                <span className={`${styles.branchBadge} ${styles[branch.color]}`}>
                  <i className="fas fa-map-marker-alt" /> {branch.badge}
                </span>
                <h2>{branch.name}</h2>
                <div className={styles.tourAddress}>
                  <i className="fas fa-map-marker-alt" />
                  <span>{branch.address}</span>
                </div>
                <p>{branch.desc}</p>
                <div className={styles.tourHighlights}>
                  {branch.highlights.map((h) => (
                    <div key={h.label} className={styles.tourHighlight}>
                      <i className={`fas ${h.icon}`} />
                      <span>{h.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.tourActions}>
                  <a href={branch.wa} className="btn btn-whatsapp" style={{ width: "auto" }} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp" /> Book a Visit
                  </a>
                  <Link href="/#contact" className="btn btn-outline">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Book In Person CTA */}
      <section className={styles.bookCta}>
        <div className="container">
          <h2>Ready to See It in Person?</h2>
          <p>Nothing beats an in-person visit. Book a tour at your nearest Playhouse branch and experience the magic firsthand.</p>
          <div className={styles.bookCtaButtons}>
            <a href="https://wa.me/971XXXXXXXXX?text=I'd%20like%20to%20book%20an%20in-person%20tour!" className="btn btn-lg" style={{ background: "white", color: "var(--primary)", borderColor: "white" }} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp" /> Book via WhatsApp
            </a>
            <Link href="/#contact" className="btn btn-lg" style={{ background: "transparent", color: "white", borderColor: "rgba(255,255,255,0.5)" }}>
              <i className="fas fa-phone" /> Call Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
