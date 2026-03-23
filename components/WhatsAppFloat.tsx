"use client";

import { useState } from "react";
import styles from "./WhatsAppFloat.module.css";

const branches = [
  { name: "Marina Branch", phone: "+971 XX XXX XXXX", link: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Marina!", color: "marina" },
  { name: "Downtown Branch", phone: "+971 XX XXX XXXX", link: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Downtown!", color: "downtown" },
  { name: "Jumeirah Branch", phone: "+971 XX XXX XXXX", link: "https://wa.me/971XXXXXXXXX?text=Hi%20Playhouse%20Jumeirah!", color: "jumeirah" },
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
