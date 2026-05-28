"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

const faqs = [
  { q: "What is the class size?", a: "We keep classes small — a maximum of 15 children per classroom — so every child receives individual attention and care." },
  { q: "Do you have outdoor play areas?", a: "Yes. Each branch has dedicated outdoor play areas including gardens, sandboxes, climbing structures and splash zones (seasonal)." },
  { q: "Can you accommodate dietary requirements?", a: "Absolutely. We cater to all dietary needs including allergies, religious requirements and personal preferences. Parents are consulted during enrollment." },
  { q: "What are the sleep arrangements?", a: "We have dedicated nap rooms for younger children from 1:00 PM to 3:00 PM. Bedding is washed weekly and children have their own labelled sheets." },
  { q: "What is the minimum age for enrollment?", a: "We accept children from 45 days old in our Baby Nest programme, up to 5 years in our School Readiness programme." },
  { q: "Are meals included?", a: "Yes — four nutritious meals per day are included: breakfast, morning snack, lunch, and afternoon snack. All food is freshly prepared on-site." },
];

const schedule = [
  { time: "7:00", label: "Welcome & Free Play" },
  { time: "8:00", label: "Morning Exercise" },
  { time: "8:30", label: "Breakfast" },
  { time: "9:00", label: "Circle Time & Speech Development" },
  { time: "9:45", label: "Arts, Crafts & Sensory Play" },
  { time: "10:30", label: "Morning Snack" },
  { time: "10:45", label: "Outdoor Play" },
  { time: "12:00", label: "Lunch" },
  { time: "12:30", label: "Nap Time" },
  { time: "14:30", label: "Music & Movement" },
  { time: "15:00", label: "Afternoon Snack" },
  { time: "15:30", label: "Learning Activities" },
  { time: "16:30", label: "Free Play & Pickup" },
  { time: "18:00", label: "Close" },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", age: "", phone: "" });

  return (
    <>
      {/* ========== HERO ========== */}
      <section className={styles.hero} id="home">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>KHDA & ADEK Approved · British EYFS · 3 UAE Branches</p>
              <h1 className={styles.heroTitle}>
                Where Every Child<br />Blossoms &amp; Thrives
              </h1>
              <p className={styles.heroSub}>
                A world-class early learning environment for children aged 45 days to 5 years,
                across three branches in the UAE.
              </p>
              <div className={styles.heroActions}>
                <a href="#apply" className={styles.heroCta}>Submit your application</a>
                <a href="tel:+971542632235" className={styles.heroCall}>
                  <i className="fas fa-phone" /> Call us
                </a>
              </div>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src="/images/gallery/outdoor-play.jpg"
                alt="Children playing at Playhouse Nursery"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className={styles.about} id="about">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.sectionLabel}>About Us</span>
              <h2>Playhouse Nursery — a trusted name in early childhood education in the UAE</h2>
              <p>
                Founded with a passion for giving every child the very best start in life, Playhouse Nursery
                has grown to three thriving campuses across Abu Dhabi and Dubai. We follow the British EYFS
                (Early Years Foundation Stage) curriculum — a proven, play-based framework that develops the
                whole child across seven key areas of learning.
              </p>
              <p>
                Our team of qualified British and bilingual educators creates a warm, stimulating environment
                where children feel safe to explore, ask questions, and grow at their own pace.
                We are fully licensed and approved by KHDA and ADEK.
              </p>
              <a href="#apply" className={styles.aboutBtn}>Leave an application</a>
            </div>
            <div className={styles.aboutFacts}>
              <div className={styles.factCard}>
                <span className={styles.factNum}>3</span>
                <span className={styles.factLabel}>Branches in the UAE</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factNum}>45d</span>
                <span className={styles.factLabel}>Minimum age accepted</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factNum}>4</span>
                <span className={styles.factLabel}>Meals per day, included</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factNum}>15</span>
                <span className={styles.factLabel}>Max children per class</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factNum}>12</span>
                <span className={styles.factLabel}>Months open per year</span>
              </div>
              <div className={styles.factCard}>
                <span className={styles.factNum}>KHDA</span>
                <span className={styles.factLabel}>& ADEK Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUALITIES ========== */}
      <section className={styles.qualities} id="values">
        <div className="container">
          <span className={styles.sectionLabel}>Our Values</span>
          <h2 className={styles.qualitiesTitle}>At Playhouse, a child develops and nurtures qualities, such as:</h2>
          <div className={styles.qualitiesGrid}>
            {[
              { icon: "🔍", label: "Curiosity" },
              { icon: "🧠", label: "Critical thinking" },
              { icon: "🔗", label: "Systematic thinking" },
              { icon: "🎨", label: "Creativity" },
              { icon: "😊", label: "Emotional comfort" },
              { icon: "🎯", label: "Focus on results" },
              { icon: "🌍", label: "Willingness to explore" },
            ].map((q) => (
              <div key={q.label} className={styles.qualityItem}>
                <span className={styles.qualityIcon}>{q.icon}</span>
                <span className={styles.qualityLabel}>{q.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WE ASSURE ========== */}
      <section className={styles.assure} id="we-assure">
        <div className="container">
          <span className={styles.sectionLabelLight}>We Assure</span>
          <h2 className={styles.assureTitle}>Playhouse graduates are distinguished by:</h2>
          <div className={styles.assureGrid}>
            {[
              { icon: "🇬🇧", label: "Fluency in English", desc: "All children develop strong spoken and written English through our British EYFS framework." },
              { icon: "🧩", label: "Critical & creative thinking", desc: "Our inquiry-based approach builds children who ask questions, solve problems and think independently." },
              { icon: "📚", label: "High academic readiness", desc: "Graduates transition confidently into primary school with strong literacy, numeracy and social skills." },
              { icon: "💚", label: "Emotional maturity", desc: "We nurture emotional intelligence through structured social activities, mindfulness, and peer interaction." },
            ].map((a) => (
              <div key={a.label} className={styles.assureCard}>
                <span className={styles.assureIcon}>{a.icon}</span>
                <h4>{a.label}</h4>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ASSURANCES ========== */}
      <section className={styles.assurances} id="assurances">
        <div className="container">
          <div className={styles.assurancesHeader}>
            <span className={styles.sectionLabel}>What we provide</span>
            <h2>At Playhouse we ensure:</h2>
          </div>
          <div className={styles.assurancesGrid}>
            <div className={styles.assuranceBlock}>
              <h3>Care &amp; Comfort</h3>
              <ul>
                <li>Electronic entry systems &amp; 24/7 on-site security</li>
                <li>Full CCTV coverage — parents can request access</li>
                <li>Air filtration and regular deep cleaning</li>
                <li>Dedicated rest rooms with individual bedding</li>
                <li>Parent relaxation lounge at each branch</li>
              </ul>
            </div>
            <div className={styles.assuranceBlock}>
              <h3>Health &amp; Safety</h3>
              <ul>
                <li>Qualified nurse on-site at all times</li>
                <li>Four freshly prepared meals per day</li>
                <li>No frying — baked, steamed and grilled only</li>
                <li>Full allergy and dietary accommodation</li>
                <li>Table etiquette taught from age 2</li>
              </ul>
            </div>
            <div className={styles.assuranceBlock}>
              <h3>Teaching Excellence</h3>
              <ul>
                <li>Native English-speaking lead educators</li>
                <li>All teachers hold CACHE Level 3 or equivalent</li>
                <li>Bilingual staff (Arabic, English, French)</li>
                <li>Maximum 15 children per class</li>
                <li>Daily parent reports via our parent app</li>
              </ul>
            </div>
            <div className={styles.assuranceBlock}>
              <h3>Psychologist Support</h3>
              <ul>
                <li>On-site clinical psychologist</li>
                <li>Regular child development assessments</li>
                <li>Parent consultations available</li>
                <li>Gentle transitions for new children</li>
                <li>Behaviour support when needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROGRAMMES ========== */}
      <section className={styles.programmes} id="programs">
        <div className="container">
          <div className={styles.programmesHeader}>
            <span className={styles.sectionLabel}>Our Programmes</span>
            <h2>Tailored learning for every age</h2>
            <p>From babies to kindergarten — each stage follows British EYFS principles and your child's natural curiosity.</p>
          </div>
          <div className={styles.programmesGrid}>
            <div className={styles.programmeCard}>
              <span className={styles.programmeBadge}>45 days – 1 year</span>
              <h3>Baby Nest</h3>
              <p>A safe, nurturing space for your littlest ones with sensory play, tummy time, and gentle routines that mirror home.</p>
              <ul className={styles.programmeList}>
                <li>1:3 carer-to-baby ratio</li>
                <li>Sensory development focus</li>
                <li>Daily photo updates to parents</li>
              </ul>
            </div>
            <div className={styles.programmeCard}>
              <span className={styles.programmeBadge}>1 – 2 years</span>
              <h3>Tiny Explorers</h3>
              <p>Building confidence through discovery — first steps in social interaction, language, and fine motor development.</p>
              <ul className={styles.programmeList}>
                <li>First words & language play</li>
                <li>Social skill foundations</li>
                <li>Outdoor exploration daily</li>
              </ul>
            </div>
            <div className={styles.programmeCard}>
              <span className={styles.programmeBadge}>2 – 3 years</span>
              <h3>Little Learners</h3>
              <p>A creative play-based environment that builds confidence, curiosity and early communication through structured fun.</p>
              <ul className={styles.programmeList}>
                <li>Creative arts & sensory play</li>
                <li>Early social skills</li>
                <li>Bilingual exposure</li>
              </ul>
            </div>
            <div className={styles.programmeCard}>
              <span className={styles.programmeBadge}>3 – 4 years</span>
              <h3>Creative Stars</h3>
              <p>EYFS curriculum blending creativity, numeracy, and early literacy through hands-on, joyful activities.</p>
              <ul className={styles.programmeList}>
                <li>Early phonics & literacy</li>
                <li>Numeracy through play</li>
                <li>Arts, music, and drama</li>
              </ul>
            </div>
            <div className={styles.programmeCard}>
              <span className={styles.programmeBadge}>4 – 5 years</span>
              <h3>School Readiness</h3>
              <p>Preparing confident, happy learners for primary school with phonics, maths, and social-emotional skills.</p>
              <ul className={styles.programmeList}>
                <li>Full phonics programme</li>
                <li>Maths & problem solving</li>
                <li>School uniform, structured day</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DAILY SCHEDULE ========== */}
      <section className={styles.scheduleSection} id="schedule">
        <div className="container">
          <div className={styles.scheduleHeader}>
            <span className={styles.sectionLabel}>A day at Playhouse</span>
            <h2>Sample Daily Schedule</h2>
            <p>A structured, nurturing day that balances learning, play, meals, and rest.</p>
          </div>
          <div className={styles.scheduleList}>
            {schedule.map((s, i) => (
              <div key={i} className={styles.scheduleRow}>
                <span className={styles.scheduleTime}>{s.time}</span>
                <span className={styles.scheduleDot} />
                <span className={styles.scheduleActivity}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ADMISSION ========== */}
      <section className={styles.admission} id="admission">
        <div className="container">
          <div className={styles.admissionHeader}>
            <span className={styles.sectionLabel}>How to enroll</span>
            <h2>Admission Process</h2>
            <p>Joining Playhouse is simple. Follow these four steps to secure your child's place.</p>
          </div>
          <div className={styles.admissionGrid}>
            {[
              { num: "01", title: "Contact us", desc: "Reach out via WhatsApp, phone, or our contact form. Our team will answer all your questions and guide you through next steps." },
              { num: "02", title: "Visit our branch", desc: "Schedule a free tour of your nearest Playhouse branch. Meet our team and see the facilities for yourself." },
              { num: "03", title: "Submit documents", desc: "Provide your child's passport copy, vaccination records, and any medical information. We'll prepare your enrollment file." },
              { num: "04", title: "Sign the contract", desc: "Review and sign the enrollment agreement. Pay the registration fee and your child's place is confirmed." },
            ].map((s) => (
              <div key={s.num} className={styles.admissionStep}>
                <span className={styles.stepNum}>{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className={styles.faqSection} id="faq">
        <div className="container">
          <div className={styles.faqHeader}>
            <span className={styles.sectionLabel}>FAQ</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <span className={styles.faqChevron}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== APPLY FORM ========== */}
      <section className={styles.applySection} id="apply">
        <div className="container">
          <div className={styles.applyGrid}>
            <div className={styles.applyInfo}>
              <span className={styles.sectionLabel}>Get in touch</span>
              <h2>Leave an application</h2>
              <p>Fill in your details and our team will contact you within one business day to discuss your child's enrollment.</p>
              <div className={styles.contactDetails}>
                <a href="tel:+971542632235"><i className="fas fa-phone" /> +971 54 263 2235</a>
                <a href="https://wa.me/971542632235" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /> WhatsApp us</a>
                <span><i className="fas fa-clock" /> Sun – Thu, 7:00 AM – 6:00 PM</span>
              </div>
            </div>
            <form
              className={styles.applyForm}
              onSubmit={(e) => { e.preventDefault(); alert("Thank you! We will contact you shortly."); setForm({ name: "", age: "", phone: "" }); }}
            >
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className={styles.formInput}
              />
              <input
                type="text"
                placeholder="Child's age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
                className={styles.formInput}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className={styles.formInput}
              />
              <button type="submit" className={styles.formSubmit}>Submit your application</button>
              <p className={styles.formNote}>By submitting you agree to the processing of personal data.</p>
            </form>
          </div>
        </div>
      </section>

      {/* ========== BRANCHES ========== */}
      <section className={styles.branches} id="contact">
        <div className="container">
          <div className={styles.branchesHeader}>
            <span className={styles.sectionLabel}>Find us</span>
            <h2>Our Branches</h2>
          </div>
          <div className={styles.branchesGrid}>
            {[
              { name: "Playhouse Khalidiya", addr: "Al Khalidiya St, Villa 11/8, Abu Dhabi", phone: "+971 54 263 2235", email: "Mainbranch@playhousenursery.ae", wa: "https://wa.me/971542632235" },
              { name: "Playhouse Al Reem", addr: "Al Reem Island, Marina Square, Tala Tower G-203", phone: "+971 50 562 4547", email: "Branch1@playhousenursery.ae", wa: "https://wa.me/971505624547" },
              { name: "Playhouse Mirdif", addr: "Mirdif Hills Avenue Mall, Dubai", phone: "+971 52 982 1105", email: "Dubaibranch@playhousenursery.ae", wa: "https://wa.me/971529821105" },
            ].map((b) => (
              <div key={b.name} className={styles.branchItem}>
                <h4>{b.name}</h4>
                <ul className={styles.branchInfo}>
                  <li><i className="fas fa-map-marker-alt" /> {b.addr}</li>
                  <li><i className="fas fa-phone" /> {b.phone}</li>
                  <li><i className="fas fa-clock" /> Sun – Thu, 7:00 AM – 6:00 PM</li>
                  <li><i className="fas fa-envelope" /> {b.email}</li>
                </ul>
                <a href={b.wa} className={styles.branchWa} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp" /> Chat on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
