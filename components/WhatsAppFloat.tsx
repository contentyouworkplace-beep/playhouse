"use client";

import { useState } from "react";
import styles from "./WhatsAppFloat.module.css";

const branches = [
  { name: "Khalidiya Branch", phone: "+971 54 263 2235", link: "https://wa.me/971542632235?text=Hi%20Playhouse%20Khalidiya!", color: "khalidiya" },
  { name: "Al Reem Branch", phone: "+971 50 562 4547", link: "https://wa.me/971505624547?text=Hi%20Playhouse%20Al%20Reem!", color: "alreem" },
  { name: "Mirdif Branch", phone: "+971 52 982 1105", link: "https://wa.me/971529821105?text=Hi%20Playhouse%20Mirdif!", color: "mirdif" },
];

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.float}>
      <button
        className={styles.toggle}
        onClick={() => setOpen(!open)}
        aria-label="Contact us on WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </button>
      <div className={`${styles.popup} ${open ? styles.popupActive : ""}`}>
        <div className={styles.popupHeader}>
          <h5>Chat with Playhouse</h5>
          <p>Choose your nearest branch</p>
        </div>
        {branches.map((b) => (
          <a
            key={b.color}
            href={b.link}
            className={styles.branch}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={`${styles.dot} ${styles[b.color]}`} />
            <div>
              <strong>{b.name}</strong>
              <small>{b.phone}</small>
            </div>
            <i className="fab fa-whatsapp" />
          </a>
        ))}
      </div>
    </div>
  );
}
