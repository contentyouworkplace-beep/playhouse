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
              across 3 branches in the UAE — Khalidiya, Al Reem &amp; Mirdif.
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
              <a href="https://www.instagram.com/playhousenursery.alreem/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="https://www.facebook.com/PlayhouseNurseryUAE/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.youtube.com/@playhouseuae" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube" /></a>
              <a href="https://www.tiktok.com/@playhouseuae" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok" /></a>
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
              <li><Link href="/branches/khalidiya">Playhouse Khalidiya</Link></li>
              <li><Link href="/branches/al-reem">Playhouse Al Reem</Link></li>
              <li><Link href="/branches/mirdif">Playhouse Mirdif</Link></li>
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
