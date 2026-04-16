import Link from "next/link";
import Quiz from "@/components/Quiz";
import Counter from "@/components/Counter";
import HeroSlider from "@/components/HeroSlider";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className={styles.hero} id="home">
        <HeroSlider />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>KHDA Approved · British EYFS Curriculum</p>
          <h1 className={styles.heroTitle}>
            Where Every Child<br />
            <span className={styles.highlight}>Blossoms &amp; Thrives</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A nurturing, world-class nursery experience across 3 branches in the UAE.
            British &amp; EYFS curriculum designed to inspire young minds — ages 45 days to 6 years.
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.badge}><i className="fas fa-award" /> KHDA Approved</span>
            <span className={styles.badge}><i className="fas fa-globe" /> British Curriculum</span>
            <span className={styles.badge}><i className="fas fa-heart" /> Ages 45 days – 6 years</span>
            <span className={styles.badge}><i className="fas fa-map-marker-alt" /> 3 Branches in UAE</span>
          </div>
          <div className={styles.heroButtons}>
            <a href="#contact" className="btn btn-primary btn-lg">Book a Visit</a>
            <a href="/WELCOME TO PLAYHOUSE NURSERY brochure.pptx" download className="btn btn-outline btn-lg">
              <i className="fas fa-download" /> Download Brochure
            </a>
          </div>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,60 1440,50 L1440,100 L0,100 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}><Counter target={3} /></span>
              <span className={styles.statLabel}>Branches in UAE</span>
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

      {/* ========== CURRICULUM ========== */}
      <section className={styles.curriculumSection} id="curriculum">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Curriculum</span>
            <h2>A British EYFS Foundation for Life</h2>
            <p>We follow the UK Early Years Foundation Stage framework — a proven, play-based approach that develops the whole child across 7 areas of learning.</p>
          </div>
          <div className={styles.curriculumGrid}>
            {[
              { icon: "📚", title: "7 Areas of Learning", desc: "Communication, physical development, personal & social skills, literacy, maths, understanding the world, and expressive arts." },
              { icon: "🌱", title: "Play-Based Learning", desc: "Children learn best through play. Our child-led approach sparks curiosity, creativity, and a lifelong love of discovery." },
              { icon: "🌍", title: "Bilingual Environment", desc: "English as the primary language of instruction, with Arabic and French exposure woven throughout daily routines." },
              { icon: "👩‍🏫", title: "Qualified British Teachers", desc: "All lead educators hold UK Early Childhood qualifications or equivalent — passionate professionals deeply committed to your child." },
              { icon: "📱", title: "Daily Parent Reports", desc: "Stay connected with real-time updates, photos, and milestone tracking through our parent app — full transparency every day." },
              { icon: "🏅", title: "KHDA Approved", desc: "Fully licensed and inspected by the Knowledge and Human Development Authority, ensuring the highest standards of care and education." },
            ].map((c) => (
              <div key={c.title} className={styles.curriculumCard}>
                <div className={styles.curriculumIcon}>{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== QUIZ ========== */}
      <section className={styles.quizSection} id="quiz">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Find Your Fit</span>
            <h2>Which Playhouse Branch Is Right for You?</h2>
            <p>Answer a few quick questions and we&apos;ll recommend the best Playhouse branch and programme for your little one.</p>
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
                <span className={styles.parentName}>— Saloni, Parent at Playhouse Khalidiya</span>
              </div>
            </div>
          </div>
          <div className={styles.testimonialGrid}>
            {[
              { quote: "The best decision we made for our family. The care and attention at Playhouse is exceptional.", name: "Sarah A.", branch: "Mother of 2, Khalidiya Branch", initials: "SA" },
              { quote: "My son learned Arabic and English simultaneously. The bilingual program is outstanding.", name: "Mohammed K.", branch: "Father of 1, Al Reem Branch", initials: "MK" },
              { quote: "Safe, clean, and full of love. The CCTV access gives me peace of mind during work hours.", name: "Lina P.", branch: "Mother of 1, Mirdif Branch", initials: "LP" },
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
      <section className={styles.principal} id="awards">
        <div className="container">
          <div className={styles.principalGrid}>
            <div className={styles.principalVideo}>
              <div className={styles.videoPlaceholder} style={{ position: "relative" }}>
                <img src="/images/gallery/eid.jpg" alt="Playhouse Nursery" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div className={styles.playButton}><i className="fas fa-play" /></div>
              </div>
            </div>
            <div className={styles.principalContent}>
              <span className="section-tag">From Our Founder</span>
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
              { name: "Playhouse Khalidiya", loc: "Al Khalidiya St, Villa 11/8, Abu Dhabi", f1: "Main Campus", f1i: "fa-building", f2: "Outdoor Play Area", f2i: "fa-tree", slug: "khalidiya", img: "/images/gallery/outdoor-play.jpg" },
              { name: "Playhouse Al Reem", loc: "Al Reem Island, Tala Tower G-203", f1: "Art Studio", f1i: "fa-palette", f2: "Sensory Room", f2i: "fa-hand-sparkles", slug: "al-reem", img: "/images/gallery/sensory-play.jpg" },
              { name: "Playhouse Mirdif", loc: "Mirdif Hills Avenue Mall, Dubai", f1: "Nature Garden", f1i: "fa-seedling", f2: "Library Corner", f2i: "fa-book", slug: "mirdif", img: "/images/gallery/nature-garden.jpg" },
            ].map((b) => (
              <div key={b.slug} className={styles.tourCard}>
                <div className={styles.tourPreview} style={{ position: "relative" }}>
                  <img src={b.img} alt={b.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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
      <section className={styles.programs} id="programs">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Programmes</span>
            <h2>Tailored Learning for Every Age</h2>
            <p>From babies to kindergarten — each stage is thoughtfully designed around British EYFS principles.</p>
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
              { label: "Art & Craft", img: "/images/gallery/art-class.jpg" },
              { label: "Sensory Play", img: "/images/gallery/sensory-play.jpg" },
              { label: "Eid Celebration", img: "/images/gallery/eid.jpg" },
              { label: "Nature Garden", img: "/images/gallery/nature-garden.jpg" },
              { label: "National Day", img: "/images/gallery/national-day.jpg" },
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
              { name: "Playhouse Khalidiya", icon: "🏛️", color: "khalidiya", addr: "Al Khalidiya St, Villa 11/8, Abu Dhabi", phone: "+971 54 263 2235", email: "playhousekhalidiya@gmail.com", wa: "https://wa.me/971542632235?text=Hi%20Playhouse%20Khalidiya!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.", slug: "khalidiya" },
              { name: "Playhouse Al Reem", icon: "🏙️", color: "alreem", addr: "Al Reem Island, Marina Square, Tala Tower G-203", phone: "+971 50 562 4547", email: "playhousealreem@gmail.com", wa: "https://wa.me/971505624547?text=Hi%20Playhouse%20Al%20Reem!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.", slug: "al-reem" },
              { name: "Playhouse Mirdif", icon: "🌴", color: "mirdif", addr: "Mirdif Hills Avenue Mall, Dubai", phone: "+971 52 982 1105", email: "playhousemirdif@gmail.com", wa: "https://wa.me/971529821105?text=Hi%20Playhouse%20Mirdif!%20I'd%20like%20to%20know%20more%20about%20your%20nursery.", slug: "mirdif" },
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
