import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getContent, type BlogPost } from "@/lib/data/store";
import styles from "../page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getContent();
  const blog = (data.blogs || []).find((b: BlogPost) => b.slug === slug);

  if (!blog) {
    return {
      title: "Article Not Found | Playhouse Nursery",
    };
  }

  return buildMetadata({
    title: `${blog.title} | Playhouse Nursery Blog`,
    description: blog.excerpt || `Read ${blog.title} on the Playhouse Nursery blog.`,
    path: `/blog/${blog.slug}`,
    image: blog.coverImage || "/images/gallery/sensory-play.jpg",
    keywords: ["Playhouse Nursery blog", blog.title, blog.category || "nursery tips"],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getContent();
  const blog = (data.blogs || []).find((b: BlogPost) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const formattedContent = parseMarkdown(blog.content);

  return (
    <>
      <section className={styles.detailSection}>
        <div className="container">
          <Link href="/blog" className={styles.backButton}>
            <i className="fas fa-arrow-left" /> Back to Blog
          </Link>

          <div className={styles.detailLayout}>
            {/* Main content */}
            <article>
              <div className={styles.articleHeader}>
                <span className={styles.articleCategory}>{blog.category}</span>
                <h1>{blog.title}</h1>
                <div className={styles.articleMeta}>
                  <span>
                    <i className="far fa-calendar-alt" style={{ marginRight: "6px" }} />
                    {blog.date
                      ? new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                      : "Recently published"}
                  </span>
                  <span>
                    <i className="far fa-user" style={{ marginRight: "6px" }} />
                    By Playhouse Educators
                  </span>
                </div>
              </div>

              <div className={styles.detailCover}>
                <img src={blog.coverImage} alt={blog.title} />
              </div>

              <div 
                className={styles.articleBody}
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />
            </article>

            {/* Sidebar widget */}
            <aside>
              <div className={styles.sidebarWidget}>
                <h3>Book a Private Tour</h3>
                <p>Experience Playhouse Nursery firsthand. Walk through our classrooms, explore our play areas, and meet our staff.</p>
                <Link href="/tours" className="btn btn-primary" style={{ display: "inline-flex", width: "100%", justifyContent: "center" }}>
                  Book a Visit
                </Link>
                <a 
                  href="https://wa.me/971505624547" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp" 
                  style={{ display: "inline-flex", width: "100%", justifyContent: "center", marginTop: "12px" }}
                >
                  <i className="fab fa-whatsapp" style={{ marginRight: "6px" }} /> Chat via WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
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
