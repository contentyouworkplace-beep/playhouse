import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3>Playhouse <span className={styles.accent}>Nursery</span></h3>
            <p>
              Where every child blossoms. KHDA-approved British EYFS nursery
              across 3 branches in Dubai — Marina, Downtown &amp; Jumeirah.
              Ages 45 days to 6 years.
            </p>
            <a
              href="/WELCOME TO PLAYHOUSE NURSERY brochure.pptx"
              download
              className={styles.brochureLink}
            >
              <i className="fas fa-download" /> Download Brochure
            </a>
            <div className={styles.social}>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
              <a href="#" aria-label="TikTok"><i className="fab fa-tiktok" /></a>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#curriculum">Our Curriculum</Link></li>
              <li><Link href="/#programs">Our Programs</Link></li>
              <li><Link href="/tours">Virtual Tours</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/staff">Our Team</Link></li>
              <li><Link href="/#testimonials">Parents Reviews</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Our Branches</h4>
            <ul>
              <li><Link href="/branches/marina">Playhouse Marina</Link></li>
              <li><Link href="/branches/downtown">Playhouse Downtown</Link></li>
              <li><Link href="/branches/jumeirah">Playhouse Jumeirah</Link></li>
              <li><Link href="/#contact">Contact Us</Link></li>
              <li><Link href="/#contact">Registration Steps</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Programs</h4>
            <ul>
              <li><Link href="/#programs">Baby Nest (45d – 1yr)</Link></li>
              <li><Link href="/#programs">Tiny Explorers (1 – 2yr)</Link></li>
              <li><Link href="/#programs">Creative Stars (2 – 4yr)</Link></li>
              <li><Link href="/#programs">School Readiness (4 – 6yr)</Link></li>
              <li><Link href="/#programs">After School Care</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            &copy; 2026 Playhouse Nursery Dubai. All rights reserved. |{" "}
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a> |{" "}
            <a href="#">KHDA Approved</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
