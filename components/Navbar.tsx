"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = `${styles.navbar} ${
    scrolled || !isHome ? styles.scrolled : ""
  }`;

  return (
    <nav className={navClass}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/het-logo.png"
            alt="HET - Hadeed Transport Logo"
            width={120}
            height={50}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>
        <button
          className={styles.navToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <ul
          className={`${styles.navLinks} ${menuOpen ? styles.navLinksActive : ""}`}
        >
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#quiz" onClick={() => setMenuOpen(false)}>
              Find Your Fit
            </Link>
          </li>
          <li>
            <Link href="/#testimonials" onClick={() => setMenuOpen(false)}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link href="/tours" onClick={() => setMenuOpen(false)}>
              Virtual Tours
            </Link>
          </li>
          <li>
            <Link href="/gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/staff" onClick={() => setMenuOpen(false)}>
              Our Team
            </Link>
          </li>
          <li>
            <Link href="/#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/#quiz"
              className={styles.navCta}
              onClick={() => setMenuOpen(false)}
            >
              Book a Visit
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
