import type { Metadata } from "next";
import styles from "./page.module.css";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Our Team | Playhouse Nursery UAE",
  description: "Meet the dedicated educators and staff behind Playhouse Nursery. Experienced early years professionals across our UAE branches.",
  path: "/staff",
  keywords: ["Playhouse Nursery team", "nursery teachers UAE", "early years educators"],
});


const branches = [
  {
    label: "Khalidiya Branch",
    color: "khalidiya" as const,
    staff: [
      { name: "Ms. Emily Richards", role: "Branch Head Teacher", emoji: "👩‍🏫", bg: "linear-gradient(135deg,#C8E6C9,#A5D6A7)", bio: "Leading the Khalidiya team with 10 years of experience in British early years education.", quals: ["PGCE Early Years"] },
      { name: "Ms. Priya Sharma", role: "Creative Arts Teacher", emoji: "👩‍🎨", bg: "linear-gradient(135deg,#F8BBD0,#F48FB1)", bio: "Inspiring creativity through art, music, and sensory play. Priya brings colour to every classroom.", quals: ["BA Fine Arts"] },
      { name: "Nurse Fatima Al Mazrouei", role: "School Nurse", emoji: "👩‍⚕️", bg: "linear-gradient(135deg,#D1C4E9,#B39DDB)", bio: "Ensuring the health and safety of every child with expert medical care and warmth.", quals: ["DHA Licensed"] },
      { name: "Ms. Huda Ibrahim", role: "Arabic & Islamic Studies", emoji: "🧕", bg: "linear-gradient(135deg,#FFECB3,#FFE082)", bio: "Teaching Arabic language and Islamic values with love, patience, and engaging activities.", quals: ["BA Arabic Education"] },
    ],
  },
  {
    label: "Al Reem Branch",
    color: "alreem" as const,
    staff: [
      { name: "Ms. Sophie Laurent", role: "Branch Head Teacher", emoji: "👩‍🏫", bg: "linear-gradient(135deg,#B3E5FC,#81D4FA)", bio: "Bilingual educator fluent in English and French with a passion for multilingual learning.", quals: ["M.Ed Bilingual Ed"] },
      { name: "Mr. James Okafor", role: "Music & Movement Teacher", emoji: "👨‍🎵", bg: "linear-gradient(135deg,#FFE0B2,#FFCC80)", bio: "Bringing rhythm and joy to early learning through music, dance, and performance.", quals: ["BMus Education"] },
      { name: "Ms. Aisha Khan", role: "STEM & Discovery Teacher", emoji: "👩‍🔬", bg: "linear-gradient(135deg,#C8E6C9,#A5D6A7)", bio: "Making science exciting for tiny minds through experiments, nature walks, and curiosity-led play.", quals: ["BSc Education"] },
      { name: "Nurse Maria Santos", role: "School Nurse", emoji: "👩‍⚕️", bg: "linear-gradient(135deg,#F8BBD0,#F48FB1)", bio: "Dedicated healthcare professional ensuring every child stays healthy, safe, and happy.", quals: ["DHA Licensed"] },
    ],
  },
  {
    label: "Mirdif Branch",
    color: "mirdif" as const,
    staff: [
      { name: "Ms. Charlotte Bennett", role: "Branch Head Teacher", emoji: "👩‍🏫", bg: "linear-gradient(135deg,#FFECB3,#FFE082)", bio: "Nature-based learning advocate with expertise in outdoor classroom environments.", quals: ["Forest School L3"] },
      { name: "Mr. Ravi Patel", role: "Physical Education & Yoga", emoji: "👨‍🏫", bg: "linear-gradient(135deg,#D1C4E9,#B39DDB)", bio: "Helping children develop coordination, strength, and mindfulness through fun movement activities.", quals: ["Kids Yoga Certified"] },
      { name: "Ms. Maryam Al Suwaidi", role: "Arabic & Cultural Studies", emoji: "🧕", bg: "linear-gradient(135deg,#C8E6C9,#A5D6A7)", bio: "Passionate about preserving Emirati heritage while fostering a love for Arabic language.", quals: ["BA Arabic Literature"] },
      { name: "Nurse Sarah Thompson", role: "School Nurse", emoji: "👩‍⚕️", bg: "linear-gradient(135deg,#B3E5FC,#81D4FA)", bio: "Experienced pediatric nurse providing compassionate healthcare and first aid support.", quals: ["DHA Licensed"] },
    ],
  },
];

export default function StaffPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Meet Our Amazing Team</h1>
          <p>Passionate, qualified educators dedicated to nurturing your child&apos;s growth across all three Dubai branches.</p>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* Branch Staff */}
      {branches.map((branch, idx) => (
        <section key={branch.color} className={`${styles.staffSection} ${idx % 2 === 0 ? styles.staffSectionAlt : ""}`}>
          <div className="container">
            <div className="section-header">
              <span className={`${styles.branchLabel} ${styles[branch.color]}`}>
                <i className="fas fa-map-marker-alt" /> {branch.label}
              </span>
              <h2>{branch.label} Team</h2>
            </div>
            <div className={styles.staffGrid}>
              {branch.staff.map((s) => (
                <div key={s.name} className={styles.staffCard}>
                  <div className={styles.staffPhoto} style={{ background: s.bg }}>
                    <span className={styles.staffEmoji}>{s.emoji}</span>
                  </div>
                  <div className={styles.staffInfo}>
                    <h4>{s.name}</h4>
                    <span className={styles.staffRole}>{s.role}</span>
                    <p>{s.bio}</p>
                    <div className={styles.staffQuals}>
                      {s.quals.map((q) => (
                        <span key={q} className={styles.staffQual}>{q}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

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
