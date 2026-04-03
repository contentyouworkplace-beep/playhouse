"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./HeroSlider.module.css";

const slides = [
  { src: "/images/hero/hero-1.jpg", alt: "Children in nursery classroom at Playhouse Nursery Dubai" },
  { src: "/images/hero/hero-2.jpg", alt: "Kids playing outdoors at Playhouse Nursery" },
  { src: "/images/hero/hero-3.jpg", alt: "Toddler doing art and craft at Playhouse Nursery" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className={styles.slider}>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={styles.slide}
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 0, visibility: i === current ? 'visible' : 'hidden' }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      {/* Dots */}
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
