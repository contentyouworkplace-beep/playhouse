"use client";

import { useState } from "react";
import styles from "./page.module.css";

const galleryItems = [
  { label: "Outdoor Play Area",   img: "/images/gallery/outdoor-play.jpg",  bg: "linear-gradient(135deg,#EDF7F2,#C8E6C9)", category: "khalidiya outdoor", tag: "Khalidiya" },
  { label: "Art & Craft Session", img: "/images/gallery/art-class.jpg",     bg: "linear-gradient(135deg,#FEF6E8,#FFE082)", category: "al-reem art",        tag: "Al Reem"   },
  { label: "Nature Garden",       img: "/images/gallery/nature-garden.jpg", bg: "linear-gradient(135deg,#EDF7F2,#A5D6A7)", category: "mirdif outdoor",    tag: "Mirdif"    },
  { label: "Sensory Play",        img: "/images/gallery/sensory-play.jpg",  bg: "linear-gradient(135deg,#FEF0EE,#F48FB1)", category: "khalidiya art",     tag: "Khalidiya" },
  { label: "UAE National Day",    img: "/images/gallery/national-day.jpg",  bg: "linear-gradient(135deg,#E8F5E9,#00C853)", category: "events",             tag: "Events"    },
  { label: "Music & Dance",       img: "/images/gallery/music-room.jpg",    bg: "linear-gradient(135deg,#F3F0FD,#B39DDB)", category: "al-reem",           tag: "Al Reem"   },
  { label: "Story Time",          img: "/images/gallery/story-time.jpg",    bg: "linear-gradient(135deg,#FEF6E8,#FFE082)", category: "mirdif",            tag: "Mirdif"    },
  { label: "Splash Zone",         img: "/images/gallery/splash-zone.jpg",   bg: "linear-gradient(135deg,#EDF7F2,#4FC3F7)", category: "khalidiya outdoor", tag: "Khalidiya" },
  { label: "Graduation Day",      img: "/images/gallery/graduation.jpg",    bg: "linear-gradient(135deg,#FEF6E8,#FBC02D)", category: "events",             tag: "Events"    },
  { label: "Science Discovery",   img: "/images/gallery/science.jpg",       bg: "linear-gradient(135deg,#FEF6E8,#03A9F4)", category: "al-reem art",       tag: "Al Reem"   },
  { label: "Yoga & Mindfulness",  img: "/images/gallery/yoga.jpg",          bg: "linear-gradient(135deg,#EDF7F2,#66BB6A)", category: "mirdif outdoor",    tag: "Mirdif"    },
  { label: "Eid Celebration",     img: "/images/gallery/eid.jpg",           bg: "linear-gradient(135deg,#FEF0EE,#E91E63)", category: "events",             tag: "Events"    },
];

const filters = ["all", "khalidiya", "al-reem", "mirdif", "outdoor", "art", "events"];

export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<{ label: string; bg: string; img: string } | null>(null);

  const filtered = active === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category.includes(active));

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Our Gallery</h1>
          <p>Beautiful moments captured across all three Playhouse branches. See the magic of everyday learning!</p>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* Filters */}
      <div className="container">
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${active === f ? styles.filterBtnActive : ""}`}
              onClick={() => setActive(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryGrid}>
            {filtered.map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className={`${styles.galleryItem} ${i === 4 || i === 8 ? styles.galleryItemWide : ""}`}
                onClick={() => setLightbox(item)}
              >
                <div className={styles.galleryPlaceholder} style={{ background: item.bg, position: "relative" }}>
                  <img src={item.img} alt={item.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className={styles.galleryOverlay}>
                  <span>{item.label}</span>
                  <span className={styles.galleryTag}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>&times;</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImage} style={{ background: lightbox.bg, position: "relative" }}>
              <img src={lightbox.img} alt={lightbox.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-lg)" }} />
            </div>
            <p className={styles.lightboxCaption}>{lightbox.label}</p>
          </div>
        </div>
      )}
    </>
  );
}
