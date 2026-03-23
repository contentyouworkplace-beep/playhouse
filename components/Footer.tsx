import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3>🏠 Playhouse<span className={styles.accent}>Nursery</span></h3>
            <p>
              Where little stars shine bright in the heart of Dubai. KHDA
              approved nursery providing world-class early childhood education.
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook" /></a>
              <a href="#" aria-label="TikTok"><i className="fab fa-tiktok" /></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#quiz">Find Your Fit</Link></li>
              <li><Link href="/tours">Virtual Tours</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/staff">Our Team</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Our Branches</h4>
            <ul>
              <li><Link href="/#contact">Playhouse Marina</Link></li>
              <li><Link href="/#contact">Playhouse Downtown</Link></li>
              <li><Link href="/#contact">Playhouse Jumeirah</Link></li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Programs</h4>
            <ul>
              <li><a href="#">Baby Nest (45d – 1yr)</a></li>
              <li><a href="#">Tiny Explorers (1 – 2yr)</a></li>
              <li><a href="#">Creative Stars (2 – 4yr)</a></li>
              <li><a href="#">School Readiness (4 – 6yr)</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            &copy; 2026 Playhouse Nursery Dubai. All rights reserved. |{" "}
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
