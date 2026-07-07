import Link from "next/link";
import styles from "./Footer.module.css";
import { getContent, type Branch } from "@/lib/data/store";

export default function Footer() {
  const data = getContent();
  const settings = data.settings || {};
  const hero = data.hero || {};
  const branches = data.branches || [];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3>
              {settings.logoText || "Playhouse"}{" "}
              <span className={styles.accent}>{settings.logoAccent || "Nursery"}</span>
            </h3>
            <p>
              {hero.subtitle || "Where every child blossoms. KHDA & ADEK approved British EYFS nursery."}
            </p>
            <a
              href="/WELCOME TO PLAYHOUSE NURSERY brochure.pptx"
              download
              className={styles.brochureLink}
            >
              <i className="fas fa-download" /> Download Brochure
            </a>
            <div className={styles.social}>
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fab fa-youtube" />
                </a>
              )}
              {settings.tiktok && (
                <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <i className="fab fa-tiktok" />
                </a>
              )}
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/curriculum">Our Curriculum</Link></li>
              <li><Link href="/#programs">Our Programs</Link></li>
              <li><Link href="/tours">Our Facilities</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/staff">Our Team</Link></li>
              <li><Link href="/reviews">Parents Reviews</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Our Branches</h4>
            <ul>
              {branches.map((b: Branch) => (
                <li key={b.id}>
                  <Link href={`/branches/${b.slug}`}>{b.name}</Link>
                </li>
              ))}
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/admissions">Registration Steps</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Programs</h4>
            <ul>
              <li><Link href="/#programs">Baby Nest (45d – 1yr)</Link></li>
              <li><Link href="/#programs">Tiny Explorers (1 – 2yr)</Link></li>
              <li><Link href="/#programs">Creative Stars (2 – 4yr)</Link></li>
              <li><Link href="/#programs">School Readiness (4 – 5yr)</Link></li>
              <li><Link href="/#programs">After School Care</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            {settings.copyrightText || `© ${new Date().getFullYear()} ${settings.siteName || "Playhouse Nursery"}. All rights reserved.`} |{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-of-use">Terms of Use</Link> |{" "}
            <Link href="/about#awards">KHDA &amp; ADEK Approved</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
