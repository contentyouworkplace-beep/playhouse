import type { Metadata } from "next";
import Link from "next/link";
import { getContent, type BlogPost } from "@/lib/data/store";
import styles from "./page.module.css";

export const revalidate = 0; // Ensure fresh data on visits

export const metadata: Metadata = {
  title: "Blog & Parenting Tips | Playhouse Nursery UAE",
  description: "Read early childhood education updates, parenting tips, and guides from the educators at Playhouse Nursery across Dubai & Abu Dhabi.",
};

export default function BlogArchivePage() {
  const data = getContent();
  const blogs = data.blogs || [];

  return (
    <>
      {/* Hero */}
      <section className={styles.blogHero}>
        <div className="container">
          <h1>Blog &amp; Parent Resources</h1>
          <p>Guides, insights, and advice from our educators to support your child&apos;s early learning journey.</p>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" fill="#f7f9fa" />
          </svg>
        </div>
      </section>

      {/* Grid */}
      <section className={styles.blogSection}>
        <div className="container">
          {blogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <i className="fas fa-book-open" style={{ fontSize: "3rem", color: "var(--gray-300)", marginBottom: "16px", display: "block" }} />
              <p style={{ fontSize: "1.1rem", color: "var(--text-light)" }}>No blog posts published yet. Stay tuned!</p>
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {blogs.map((b: BlogPost) => (
                <article key={b.id || b.slug} className={styles.blogCard}>
                  <div className={styles.coverWrapper}>
                    <img src={b.coverImage} alt={b.title} />
                    <span className={styles.categoryBadge}>{b.category}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <div>
                      <div className={styles.metaText}>
                        <i className="far fa-calendar-alt" />
                        <span>
                          {b.date
                            ? new Date(b.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                            : "Recently published"}
                        </span>
                      </div>
                      <h3>{b.title}</h3>
                      <p>{b.excerpt}</p>
                    </div>
                    <Link href={`/blog/${b.slug}`} className={styles.readMoreLink}>
                      Read Article <i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
