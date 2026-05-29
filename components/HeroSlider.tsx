"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./HeroSlider.module.css";

const slides = [
  { src: "/images/hero/hero-1.jpg", alt: "Children joyfully learning at Playhouse Nursery" },
  { src: "/images/hero/hero-2.jpg", alt: "Kids exploring and playing outdoors at Playhouse" },
  { src: "/images/hero/hero-3.jpg", alt: "Toddler doing creative art and craft at Playhouse Nursery" },
];

export default function HeroSlider() {
  // Start at 0 — first image is visible immediately, no animation
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className={styles.slider}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`${styles.slide} ${i === current ? styles.slideActive : ""}`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 30%",
              filter: "brightness(0.82) saturate(0.9)",
            }}
          />
        </div>
      ))}

      {/* Pill dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
