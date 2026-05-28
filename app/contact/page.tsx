"use client";

import { useState } from "react";

const branches = [
  {
    name: "Playhouse Khalidiya",
    label: "Main Branch — Abu Dhabi",
    addr: "Al Khalidiya Street, Villa 11/8, Behind Sheraton Khalidiya Hotel, Abu Dhabi",
    phone: "+971 54 263 2235",
    email: "Mainbranch@playhousenursery.ae",
    hours: "Sun – Thu, 7:00 AM – 6:00 PM",
    wa: "https://wa.me/971542632235?text=Hi%20Playhouse%20Khalidiya!",
  },
  {
    name: "Playhouse Al Reem",
    label: "Al Reem Island — Abu Dhabi",
    addr: "Marina Square, Tala Tower, Unit G-203, Al Reem Island, Abu Dhabi",
    phone: "+971 50 562 4547",
    email: "Branch1@playhousenursery.ae",
    hours: "Sun – Thu, 7:00 AM – 6:00 PM",
    wa: "https://wa.me/971505624547?text=Hi%20Playhouse%20Al%20Reem!",
  },
  {
    name: "Playhouse Mirdif",
    label: "Dubai Branch",
    addr: "Mirdif Hills Avenue Mall, Dubai, UAE",
    phone: "+971 52 982 1105",
    email: "Dubaibranch@playhousenursery.ae",
    hours: "Sun – Thu, 7:00 AM – 6:00 PM",
    wa: "https://wa.me/971529821105?text=Hi%20Playhouse%20Mirdif!",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", branch: "", message: "" });

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: "var(--dark)", padding: "160px 0 80px" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Get in Touch</span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, maxWidth: 640, marginBottom: 24 }}>
            We&apos;d love to hear from you
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: 520, lineHeight: 1.85 }}>
            Whether you have a question, want to book a visit, or are ready to enroll — our team is here to help, six days a week.
          </p>
        </div>
      </section>

      {/* ── BRANCH CONTACTS ── */}
      <section style={{ padding: "100px 0", background: "var(--white)" }}>
        <div className="container">
          <span className="section-label">Our Branches</span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 52, lineHeight: 1.2 }}>
            Find your nearest Playhouse
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--border)" }}>
            {branches.map((b) => (
              <div key={b.name} style={{ background: "var(--white)", padding: "48px 36px" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 8 }}>{b.label}</p>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--dark)", marginBottom: 28, paddingBottom: 18, borderBottom: "2px solid var(--dark)" }}>{b.name}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
                  {[
                    { icon: "fa-map-marker-alt", text: b.addr },
                    { icon: "fa-phone", text: b.phone },
                    { icon: "fa-envelope", text: b.email },
                    { icon: "fa-clock", text: b.hours },
                  ].map((item) => (
                    <li key={item.icon} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 0", borderBottom: "1px solid var(--border)", fontSize: "0.92rem", color: "var(--text)", lineHeight: 1.5 }}>
                      <i className={`fas ${item.icon}`} style={{ color: "var(--text-light)", width: 16, marginTop: 3, flexShrink: 0 }} />
                      {item.text}
                    </li>
                  ))}
                </ul>
                <a
                  href={b.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <i className="fab fa-whatsapp" /> Chat on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section style={{ padding: "100px 0", background: "var(--off-white)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="section-label">Send a Message</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--dark)", marginBottom: 20, lineHeight: 1.2 }}>
                Leave us a message &amp; we&apos;ll be in touch
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-light)", lineHeight: 1.85, marginBottom: 36 }}>
                Our admissions team responds within one business day. For urgent enquiries, please WhatsApp your nearest branch directly.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <i className="fas fa-phone" style={{ color: "var(--text-light)", width: 20 }} />
                  <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>+971 54 263 2235</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <i className="fas fa-envelope" style={{ color: "var(--text-light)", width: 20 }} />
                  <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Mainbranch@playhousenursery.ae</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <i className="fas fa-clock" style={{ color: "var(--text-light)", width: 20 }} />
                  <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>Sun – Thu, 7:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
            <form
              style={{ background: "var(--white)", padding: "48px 40px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 16 }}
              onSubmit={(e) => { e.preventDefault(); alert("Thank you! We'll contact you shortly."); setForm({ name: "", email: "", phone: "", branch: "", message: "" }); }}
            >
              {[
                { key: "name", placeholder: "Your full name", type: "text" },
                { key: "email", placeholder: "Email address", type: "email" },
                { key: "phone", placeholder: "Phone / WhatsApp number", type: "tel" },
              ].map((f) => (
                <input
                  key={f.key}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  required
                  style={{ width: "100%", padding: "16px 20px", border: "1px solid var(--border)", background: "var(--off-white)", fontSize: "1rem", fontFamily: "var(--font-main)", color: "var(--dark)", outline: "none" }}
                />
              ))}
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                style={{ width: "100%", padding: "16px 20px", border: "1px solid var(--border)", background: "var(--off-white)", fontSize: "1rem", fontFamily: "var(--font-main)", color: form.branch ? "var(--dark)" : "var(--text-light)", outline: "none" }}
              >
                <option value="">Preferred branch</option>
                <option>Playhouse Khalidiya</option>
                <option>Playhouse Al Reem</option>
                <option>Playhouse Mirdif</option>
              </select>
              <textarea
                placeholder="Your message or question..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                style={{ width: "100%", padding: "16px 20px", border: "1px solid var(--border)", background: "var(--off-white)", fontSize: "1rem", fontFamily: "var(--font-main)", color: "var(--dark)", outline: "none", resize: "vertical" }}
              />
              <button
                type="submit"
                style={{ padding: "16px 32px", background: "var(--dark)", color: "var(--white)", border: "2px solid var(--dark)", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-main)", cursor: "pointer" }}
              >
                Send Message
              </button>
              <p style={{ fontSize: "0.78rem", color: "var(--text-light)", lineHeight: 1.6, marginTop: 4 }}>
                By submitting, you agree to the processing of your personal data in accordance with our Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
