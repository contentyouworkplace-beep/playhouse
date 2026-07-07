import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getContent, type CustomPage } from "@/lib/data/store";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const data = getContent();
  const page = (data.pages || []).find(
    (p: CustomPage) => p.slug.replace(/(^\/|\/$)/g, "") === path
  );

  if (!page) {
    return {
      title: "Page Not Found | Playhouse Nursery",
    };
  }

  return buildMetadata({
    title: `${page.title} | Playhouse Nursery UAE`,
    description: page.metaDescription || `${page.title} details page at Playhouse Nursery.`,
    path: `/${path}`,
    image: page.bannerImage || "/images/gallery/outdoor-play.jpg",
    keywords: ["Playhouse Nursery", page.title],
  });
}

export default async function DynamicCustomPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");
  const data = getContent();
  const page = (data.pages || []).find(
    (p: CustomPage) => p.slug.replace(/(^\/|\/$)/g, "") === path
  );

  if (!page) {
    notFound();
  }

  // Fallback to old single-content layout if no sections exist
  if (!page.sections || page.sections.length === 0) {
    const formattedContent = parseMarkdown(page.content || "");
    const heroStyle = page.bannerImage
      ? { backgroundImage: `url(${page.bannerImage})` }
      : { background: "linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #FF6B35 100%)" };

    return (
      <>
        <section className={styles.heroBlock} style={heroStyle}>
          <div className={styles.heroOverlay} />
          <div className="container">
            <div className={styles.heroContent}>
              <h1>{page.title}</h1>
              {page.metaDescription && <p>{page.metaDescription}</p>}
            </div>
          </div>
        </section>

        <section className={styles.textBlock}>
          <div className="container" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "48px" }}>
            <article>
              <div 
                className={styles.textBody}
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </article>

            <aside>
              <div style={{ background: "var(--off-white)", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px", textAlign: "center", position: "sticky", top: "100px" }}>
                <h3>Need Information?</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-light)", margin: "12px 0 24px" }}>Chat with our branch representatives or schedule a tour to meet our teachers in person.</p>
                <Link href="/admissions" className="btn btn-primary" style={{ display: "inline-flex", width: "100%", justifyContent: "center" }}>
                  Book a Visit
                </Link>
                <a 
                  href="https://wa.me/971505624547" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp" 
                  style={{ display: "inline-flex", width: "100%", justifyContent: "center", marginTop: "12px" }}
                >
                  <i className="fab fa-whatsapp" style={{ marginRight: "6px" }} /> Chat on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </section>
      </>
    );
  }

  // Dynamic visual sections renderer
  return (
    <>
      {page.sections.map((section, index: number) => {
        switch (section.type) {
          case "Hero": {
            const heroBg = section.bgImage 
              ? { backgroundImage: `url(${section.bgImage})` } 
              : { background: "linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #FF6B35 100%)" };
            return (
              <section key={index} className={styles.heroBlock} style={heroBg}>
                <div className={styles.heroOverlay} />
                <div className="container">
                  <div className={styles.heroContent}>
                    <h1>{section.title}</h1>
                    {section.subtitle && <p>{section.subtitle}</p>}
                    {section.buttonText && (
                      <Link href={section.buttonLink || "#"} className="btn btn-primary">
                        {section.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          case "TextContent":
            return (
              <section key={index} className={styles.textBlock}>
                <div className="container">
                  <div className={styles.textContainer}>
                    {section.title && <h2>{section.title}</h2>}
                    <div 
                      className={styles.textBody}
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(section.content || "") }}
                    />
                  </div>
                </div>
              </section>
            );

          case "FeaturesGrid":
            return (
              <section key={index} className={styles.gridBlock}>
                <div className="container">
                  {section.title && (
                    <div className={styles.gridHeader}>
                      <h2>{section.title}</h2>
                    </div>
                  )}
                  <div className={styles.featuresGrid}>
                    {(section.cards || []).map((card, cardIdx: number) => (
                      <div key={cardIdx} className={styles.featureCard}>
                        {card.icon && <span className={styles.featureIcon}>{card.icon}</span>}
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "CTA":
            return (
              <section key={index} className={styles.ctaBlock} style={section.bgColor ? { background: section.bgColor } : {}}>
                <div className="container">
                  <div className={styles.ctaContent}>
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                    {section.buttonText && (
                      <Link href={section.buttonLink || "#"} className="btn btn-primary" style={{ background: "white", color: "var(--dark)", border: "none" }}>
                        {section.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            );

          case "ImageGallery":
            return (
              <section key={index} className={styles.galleryBlock}>
                <div className="container">
                  {section.title && (
                    <div className={styles.gridHeader}>
                      <h2>{section.title}</h2>
                    </div>
                  )}
                  <div className={styles.galleryGrid}>
                    {(section.images || []).map((img: string, imgIdx: number) => (
                      <div key={imgIdx} className={styles.galleryItem}>
                        <Image
                          src={img}
                          alt="Gallery block visual"
                          width={640}
                          height={420}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

function parseMarkdown(text: string) {
  if (!text) return "";
  const lines = text.split("\n");
  let html = "";
  let inList = false;

  for (let line of lines) {
    line = line.trim();
    if (!line) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      continue;
    }

    if (line.startsWith("### ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h3>${line.slice(4)}</h3>`;
    } else if (line.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h2>${line.slice(3)}</h2>`;
    } else if (line.startsWith("# ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h1>${line.slice(2)}</h1>`;
    } else if (line.startsWith("* ") || line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      let content = line.slice(2);
      content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      html += `<li>${content}</li>`;
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      let content = line;
      content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      html += `<p>${content}</p>`;
    }
  }

  if (inList) {
    html += "</ul>";
  }

  return html;
}
