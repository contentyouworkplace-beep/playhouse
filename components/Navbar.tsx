"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const branches = [
  { name: "Playhouse Khalidiya", slug: "khalidiya", addr: "Al Khalidiya St, Villa 11/8, Abu Dhabi" },
  { name: "Playhouse Al Reem", slug: "al-reem", addr: "Al Reem Island, Marina Square, Tala Tower G-203" },
  { name: "Playhouse Mirdif", slug: "mirdif", addr: "Mirdif Hills Avenue Mall, Dubai" },
];

const services = [
  { label: "Our Curriculum", href: "/curriculum", icon: "fa-book-open" },
  { label: "Baby Nest (45d – 1yr)", href: "/#programs", icon: "fa-baby" },
  { label: "Tiny Explorers (1 – 2yr)", href: "/#programs", icon: "fa-child" },
  { label: "Little Learners (2 – 3yr)", href: "/#programs", icon: "fa-paint-brush" },
  { label: "Creative Stars (3 – 4yr)", href: "/#programs", icon: "fa-star" },
  { label: "School Readiness (4 – 5yr)", href: "/#programs", icon: "fa-graduation-cap" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDrop, setActiveDrop] = useState<string | null>(null);
  const pathname = usePathname();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setActiveDrop(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDrop = (key: string) =>
    setActiveDrop((prev) => (prev === key ? null : key));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} ref={dropRef}>
      {/* ── TOP BAR ── */}
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          {/* Branch links */}
          <nav className={styles.topLinks}>
            {branches.map((b) => (
              <div key={b.slug} className={styles.topDropWrap}>
                <button
                  className={styles.topDropBtn}
                  onClick={() => toggleDrop(b.slug)}
                  aria-expanded={activeDrop === b.slug}
                >
                  {b.name} <i className="fas fa-chevron-down" />
                </button>
                {activeDrop === b.slug && (
                  <div className={styles.topDropMenu}>
                    <Link href={`/branches/${b.slug}`} onClick={() => setActiveDrop(null)}>
                      <i className="fas fa-map-marker-alt" /> {b.addr}
                    </Link>
                    <Link href={`/branches/${b.slug}#gallery`} onClick={() => setActiveDrop(null)}>
                      <i className="fas fa-images" /> Branch Gallery
                    </Link>
                    <Link href={`/branches/${b.slug}#contact`} onClick={() => setActiveDrop(null)}>
                      <i className="fab fa-whatsapp" /> WhatsApp Branch
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <Link href="/#admission" className={styles.topLink}>Admissions</Link>
            <Link href="/contact" className={styles.topLink}>Contact Us</Link>
          </nav>

          {/* Right side: socials + brochure */}
          <div className={styles.topRight}>
            <a href="https://www.facebook.com/PlayhouseNurseryUAE/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}><i className="fab fa-facebook-f" /></a>
            <a href="https://www.instagram.com/playhousenursery.alreem/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}><i className="fab fa-instagram" /></a>
            <a href="https://www.youtube.com/@playhouseuae" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialIcon}><i className="fab fa-youtube" /></a>
            <a
              href="/WELCOME TO PLAYHOUSE NURSERY brochure.pptx"
              download
              className={styles.brochureBtn}
            >
              <i className="fas fa-download" /> Download Brochure
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <div className={styles.mainNav}>
        <div className={styles.mainInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/siteicon.png"
              alt="Playhouse Nursery Dubai — Where Fun & Learning Never Ends"
              width={160}
              height={65}
              priority
              style={{ objectFit: "contain" }}
            />
            <span className={styles.logoText}>Playhouse Nursery</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span className={menuOpen ? styles.barOpen : ""} />
            <span className={menuOpen ? styles.barOpen : ""} />
            <span className={menuOpen ? styles.barOpen : ""} />
          </button>

          {/* Nav links */}
          <ul className={`${styles.navLinks} ${menuOpen ? styles.mobileOpen : ""}`}>
            <li>
              <Link href="/" className={pathname === "/" ? styles.active : ""} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            {/* About Us dropdown */}
            <li className={styles.dropItem}>
              <button className={styles.dropTrigger} onClick={() => toggleDrop("about")}>
                About Us <i className="fas fa-chevron-down" />
              </button>
              {activeDrop === "about" && (
                <div className={styles.dropMenu}>
                  <Link href="/about" onClick={() => { setMenuOpen(false); setActiveDrop(null); }}><i className="fas fa-heart" /> Our Story</Link>
                  <Link href="/staff" onClick={() => { setMenuOpen(false); setActiveDrop(null); }}><i className="fas fa-users" /> Our Team</Link>
                  <Link href="/about#awards" onClick={() => { setMenuOpen(false); setActiveDrop(null); }}><i className="fas fa-award" /> Awards & KHDA</Link>
                </div>
              )}
            </li>

            {/* Our Services dropdown */}
            <li className={styles.dropItem}>
              <button className={styles.dropTrigger} onClick={() => toggleDrop("services")}>
                Our Services <i className="fas fa-chevron-down" />
              </button>
              {activeDrop === "services" && (
                <div className={styles.dropMenu}>
                  {services.map((s, i) => (
                    <Link key={s.label} href={s.href} onClick={() => { setMenuOpen(false); setActiveDrop(null); }}
                      style={i === 0 ? { borderBottom: "2px solid var(--border)", marginBottom: "4px" } : {}}>
                      <i className={`fas ${s.icon}`} /> {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Explore dropdown */}
            <li className={styles.dropItem}>
              <button className={styles.dropTrigger} onClick={() => toggleDrop("explore")}>
                Explore <i className="fas fa-chevron-down" />
              </button>
              {activeDrop === "explore" && (
                <div className={styles.dropMenu}>
                  <Link href="/gallery" onClick={() => { setMenuOpen(false); setActiveDrop(null); }}>
                    <i className="fas fa-images" /> Gallery
                  </Link>
                  <Link href="/tours" onClick={() => { setMenuOpen(false); setActiveDrop(null); }}>
                    <i className="fas fa-vr-cardboard" /> Virtual Tours
                  </Link>
                  <Link href="/#testimonials" onClick={() => { setMenuOpen(false); setActiveDrop(null); }}>
                    <i className="fas fa-star" /> Parents Review
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link href="/#contact" className={styles.ctaBtn} onClick={() => setMenuOpen(false)}>
                Book a Visit
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
