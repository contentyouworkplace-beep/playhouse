import Link from "next/link";
import Quiz from "@/components/Quiz";
import Counter from "@/components/Counter";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className={styles.hero} id="home">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Where Little Stars <span className={styles.highlight}>Shine Bright</span> in Dubai
          </h1>
          <p className={styles.heroSubtitle}>
            A nurturing, world-class nursery experience across 3 branches in Dubai. British &amp; EYFS curriculum designed to inspire young minds.
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.badge}><i className="fas fa-award" /> KHDA Approved</span>
            <span className={styles.badge}><i className="fas fa-globe" /> British Curriculum</span>
            <span className={styles.badge}><i className="fas fa-heart" /> Ages 45 days – 6 years</span>
          </div>
          <div className={styles.heroButtons}>
            <a href="#quiz" className="btn btn-primary btn-lg">Find the Best Fit for Your Child</a>
            <a href="#tours" className="btn btn-outline btn-lg">Take a Virtual Tour</a>
          </div>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}><Counter target={3} /></span>
              <span className={styles.statLabel}>Branches in Dubai</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}><Counter target={15} /></span>
              <span className={styles.statLabel}>Years of Excellence</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}><Counter target={500} suffix="+" /></span>
              <span className={styles.statLabel}>Happy Families</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}><Counter target={50} suffix="+" /></span>
              <span className={styles.statLabel}>Qualified Staff</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUIZ ========== */}
      <section className={styles.quizSection} id="quiz">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Personalized Experience</span>
            <h2>Find the Perfect Fit for Your Child</h2>
            <p>Answer a few quick questions and we&apos;ll recommend the best Playhouse branch and program for your little one.</p>
          </div>
          <Quiz />
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className={styles.testimonials} id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Happy Parents</span>
            <h2>Hear from Our Playhouse Families</h2>
            <p>Real parents, real stories — see why Dubai families choose Playhouse Nursery.</p>
          </div>
          <div className={styles.videoShowcase}>
            <div className={styles.videoCard}>
              <div className={styles.videoPlaceholder}>
                <video
                  src="/IMG_5275.MP4"
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  poster=""
                />
              </div>
              <div className={styles.videoInfo}>
                <h4>What Parents Say About Playhouse</h4>
                <p>&ldquo;Our daughter has thrived beyond our expectations. The teachers truly care about every child&apos;s individual journey.&rdquo;</p>
                <span className={styles.parentName}>— Saloni, Parent at Playhouse Marina</span>
              </div>
            </div>
          </div>
          <div className={styles.testimonialGrid}>
            {[
              { quote: "The best decision we made for our family. The care and attention at Playhouse is exceptional.", name: "Sarah A.", branch: "Mother of 2, Marina Branch", initials: "SA" },
              { quote: "My son learned Arabic and English simultaneously. The bilingual program is outstanding.", name: "Mohammed K.", branch: "Father of 1, Downtown Branch", initials: "MK" },
              { quote: "Safe, clean, and full of love. The CCTV access gives me peace of mind during work hours.", name: "Lina P.", branch: "Mother of 1, Jumeirah Branch", initials: "LP" },
            ].map((t) => (
              <div key={t.initials} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>★★★★★</div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.branch}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRINCIPAL ========== */}
      <section className={styles.principal}>
        <div className="container">
          <div className={styles.principalGrid}>
            <div className={styles.principalVideo}>
              <div className={styles.videoPlaceholder}>
                <div className={styles.playButton}><i className="fas fa-play" /></div>
              </div>
            </div>
            <div className={styles.principalContent}>
              <span className="section-tag">From Our Principal</span>
              <h2>A Message from Our Founder</h2>
              <p className={styles.principalQuote}>
                &ldquo;At Playhouse Nursery, we believe every child is unique and deserves an environment where they can explore, learn, and grow at their own pace. Our Dubai-based centers are designed to be homes away from home, where children build confidence, creativity, and a love for learning.&rdquo;
              </p>
              <div className={styles.principalInfo}>
                <div className={styles.principalAvatar}>👩‍🏫</div>
                <div>
                  <strong>Mrs. Saloni</strong>
                  <span>Founder &amp; Principal, Playhouse Nursery</span>
                </div>
              </div>
              <a href="#contact" className="btn btn-primary"><i className="fas fa-calendar" /> Schedule a Meeting</a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TOURS PREVIEW ========== */}
      <section className={styles.toursSection} id="tours">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore Our Spaces</span>
            <h2>360° Virtual Tours</h2>
            <p>Can&apos;t visit in person? Take an immersive virtual tour of all three Playhouse branches right from your device.</p>
          </div>
          <div className={styles.toursGrid}>
            {[
              { name: "Playhouse Marina", loc: "Dubai Marina, Al Sahab Tower", f1: "Rooftop Garden", f1i: "fa-tree", f2: "Splash Zone", f2i: "fa-swimming-pool", slug: "marina" },
              { name: "Playhouse Downtown", loc: "Business Bay, Executive Tower", f1: "Art Studio", f1i: "fa-palette", f2: "Music Room", f2i: "fa-music", slug: "downtown" },
              { name: "Playhouse Jumeirah", loc: "Jumeirah 1, Beach Road Villa", f1: "Nature Garden", f1i: "fa-seedling", f2: "Library Corner", f2i: "fa-book", slug: "jumeirah" },
            ].map((b) => (
              <div key={b.slug} className={styles.tourCard}>
                <div className={styles.tourPreview}>
                  <div className={styles.tour360Badge}><i className="fas fa-vr-cardboard" /> 360°</div>
                  <div className={styles.playButton}><i className="fas fa-play" /></div>
                </div>
                <div className={styles.tourInfo}>
                  <h4>{b.name}</h4>
                  <p><i className="fas fa-map-marker-alt" /> {b.loc}</p>
                  <div className={styles.tourFeatures}>
                    <span><i className={`fas ${b.f1i}`} /> {b.f1}</span>
                    <span><i className={`fas ${b.f2i}`} /> {b.f2}</span>
                  </div>
                  <Link href={`/tours#${b.slug}`} className="btn btn-outline btn-sm">Start Tour</Link>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.toursCta}>
            <Link href="/tours" className="btn btn-primary btn-lg"><i className="fas fa-vr-cardboard" /> View All Virtual Tours</Link>
          </div>
        </div>
      </section>

      {/* ========== PROGRAMS ========== */}
      <section className={styles.programs}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Programs</span>
            <h2>Tailored Learning for Every Age</h2>
          </div>
          <div className={styles.programsGrid}>
            {[
              { icon: "🍼", title: "Baby Nest", age: "45 days – 1 year", desc: "A safe, nurturing space for your littlest ones with sensory play, tummy time, and gentle routines." },
              { icon: "🧸", title: "Tiny Explorers", age: "1 – 2 years", desc: "Building confidence through discovery — first steps in social interaction, language, and motor skills." },
              { icon: "🎨", title: "Creative Stars", age: "2 – 4 years", desc: "EYFS-based curriculum blending creativity, numeracy, and literacy through hands-on activities." },
              { icon: "🎓", title: "School Readiness", age: "4 – 6 years", desc: "Preparing confident learners for primary school with phonics, math, and social-emotional skills." },
            ].map((p) => (
              <div key={p.title} className={styles.programCard}>
                <div className={styles.programIcon}>{p.icon}</div>
                <h4>{p.title}</h4>
                <span className={styles.programAge}>{p.age}</span>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GALLERY PREVIEW ========== */}
      <section className={styles.galleryPreview} id="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Life at Playhouse</span>
            <h2>Moments That Matter</h2>
          </div>
          <div className={styles.galleryGrid}>
            {[
              { label: "Outdoor Play Area", img: "/images/gallery/outdoor-play.jpg", large: true },
              { label: "Art Class", img: "/images/gallery/art-class.jpg" },
              { label: "Story Time", img: "/images/gallery/story-time.jpg" },
              { label: "Music & Dance", img: "/images/gallery/music-room.jpg" },
              { label: "Science Discovery", img: "/images/gallery/science.jpg" },
              { label: "Graduation Day", img: "/images/gallery/graduation.jpg" },
            ].map((g) => (
              <div key={g.label} className={`${styles.galleryItem} ${g.large ? styles.galleryItemLarge : ""}`}>
                <div className={styles.galleryPlaceholder} style={{ position: "relative", overflow: "hidden" }}>
                  <img src={g.img} alt={g.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <span style={{ position: "relative", zIndex: 1, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{g.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.galleryCta}>
            <Link href="/gallery" className="btn btn-primary btn-lg"><i className="fas fa-images" /> View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* ========== CONTACT / WHATSAPP ========== */}
      <section className={styles.contact} id="contact">
        <div className="container">
          <div className="section-header light">
            <span className="section-tag">Get In Touch</span>
            <h2>Visit Our Branches</h2>
            <p>Choose your nearest Playhouse branch and connect with us instantly via WhatsApp.</p>
          </div>
          <div className={styles.branchesGrid}>
            {[
              { name: "Playhouse Marina", icon: "🏙️", color: "marina", addr: "Al Sahab Tower, Dubai Marina", phone: "+971 4 XXX XXXX", email: "marina@playhousenursery.ae", wa: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Marina!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.", slug: "marina" },
              { name: "Playhouse Downtown", icon: "🏛️", color: "downtown", addr: "Executive Tower, Business Bay", phone: "+971 4 XXX XXXX", email: "downtown@playhousenursery.ae", wa: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Downtown!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.", slug: "downtown" },
              { name: "Playhouse Jumeirah", icon: "🌴", color: "jumeirah", addr: "Beach Road Villa, Jumeirah 1", phone: "+971 4 XXX XXXX", email: "jumeirah@playhousenursery.ae", wa: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Jumeirah!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.", slug: "jumeirah" },
            ].map((b) => (
              <div key={b.color} className={styles.branchCard}>
                <div className={`${styles.branchHeader} ${styles[b.color]}`}>
                  <span className={styles.branchIcon}>{b.icon}</span>
                  <h4>{b.name}</h4>
                </div>
                <div className={styles.branchBody}>
                  <ul className={styles.branchDetails}>
                    <li><i className="fas fa-map-marker-alt" /> {b.addr}</li>
                    <li><i className="fas fa-phone" /> {b.phone}</li>
                    <li><i className="fas fa-clock" /> Sun – Thu, 7:00 AM – 6:00 PM</li>
                    <li><i className="fas fa-envelope" /> {b.email}</li>
                  </ul>
                  <Link href={`/branches/${b.slug}`} className="btn btn-primary" style={{ marginBottom: 10, display: "block", textAlign: "center" }}>
                    <i className="fas fa-building" /> Visit Branch Page
                  </Link>
                  <a href={b.wa} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
