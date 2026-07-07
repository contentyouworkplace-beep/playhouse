import type { Metadata } from "next";
import styles from "./page.module.css";
import { buildMetadata } from "@/lib/seo";

import { getContent } from "@/lib/data/store";

export const revalidate = 0; // Ensure updates show up instantly

export const metadata: Metadata = buildMetadata({
  title: "Our Team | Playhouse Nursery UAE",
  description: "Meet the dedicated educators and staff behind Playhouse Nursery. Experienced early years professionals across our UAE branches.",
  path: "/staff",
  keywords: ["Playhouse Nursery team", "nursery teachers UAE", "early years educators"],
});

export default function StaffPage() {
  const data = getContent();
  const staff = data.staff || [];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Meet Our Amazing Team</h1>
          <p>Passionate, qualified educators dedicated to nurturing your child&apos;s growth across our UAE branches.</p>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* Team Grid */}
      <section className={styles.staffSection}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontStyle: "italic", fontSize: "1.2rem", color: "var(--text-light)", maxWidth: "850px", margin: "0 auto 24px", lineHeight: "1.8" }}>
              &ldquo;We believe every child plays, learns and grows in a safe, joyful and inspiring environment that nurtures curiosity, creativity and confidence.&rdquo;
            </p>
            <span className={styles.branchLabel} style={{ background: "var(--dark)" }}>Our Playhouse Team</span>
          </div>

          <div className={styles.staffGrid}>
            {staff.map((s: any) => (
              <div key={s.name} className={styles.staffCard}>
                <div className={styles.staffPhoto} style={{ background: s.bg }}>
                  <span className={styles.staffEmoji}>{s.emoji}</span>
                </div>
                <div className={styles.staffInfo}>
                  <h4>{s.name}</h4>
                  <span className={styles.staffRole}>{s.role}</span>
                  <div style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "12px", textAlign: "left" }}>
                    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                      {s.quals?.map((q: string) => (
                        <li key={q} style={{ fontSize: "0.82rem", color: "var(--text-light)", marginBottom: "6px", display: "flex", gap: "8px", alignItems: "flex-start", lineHeight: "1.4" }}>
                          <span style={{ color: "var(--primary)", fontWeight: "bold" }}>•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className={styles.joinCta}>
        <div className="container">
          <h2>Join Our Growing Family</h2>
          <p>We&apos;re always looking for passionate educators who love working with children. Send us your CV today!</p>
          <a href="mailto:careers@playhousenursery.ae" className="btn btn-lg" style={{ background: "white", color: "var(--primary)", borderColor: "white" }}>
            <i className="fas fa-envelope" /> careers@playhousenursery.ae
          </a>
        </div>
      </section>
    </>
  );
}

