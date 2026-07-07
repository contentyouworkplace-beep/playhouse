"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Tab = "settings" | "pages" | "blogs" | "users";
type PageEditorType = "home" | "about" | "curriculum" | "staff" | "reviews" | "branch" | "custom" | null;

// Reusable Image Uploader Widget
function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok && result.url) {
        onChange(result.url);
      } else {
        alert(result.error || "Upload failed");
      }
    } catch {
      alert("An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      {value && <img src={value} alt="Uploaded Preview" className={styles.uploadPreview} />}
      {uploading ? (
        <div className={styles.uploadLoading}>
          <i className="fas fa-spinner fa-spin" /> Uploading...
        </div>
      ) : (
        <label className={styles.uploadBtn}>
          <i className="fas fa-cloud-upload-alt" /> Upload Image
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("pages");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Unified Pages Editor Sub-States
  const [activeEditor, setActiveEditor] = useState<PageEditorType>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  
  // Custom Page Editor states
  const [editingCustomPage, setEditingCustomPage] = useState<any | null>(null);
  const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(null);

  // CRUD Sub-states (nested list items)
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // Authentication check & Fetch content database
  useEffect(() => {
    async function checkAuthAndFetch() {
      try {
        const authRes = await fetch("/api/auth");
        if (!authRes.ok) {
          router.push("/admin/login");
          return;
        }

        const authData = await authRes.json();
        setCurrentUser(authData.user);

        // Default tab based on role
        if (authData.user.role === "Admin") {
          setActiveTab("settings");
        } else {
          setActiveTab("pages");
        }

        const dataRes = await fetch("/api/content");
        if (dataRes.ok) {
          const contentData = await dataRes.json();
          setData(contentData);
        } else {
          setMessage({ type: "error", text: "Failed to load content database." });
        }
      } catch {
        setMessage({ type: "error", text: "Failed to connect to server." });
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndFetch();
  }, [router]);

  // Save changes handler
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "All changes saved successfully!" });
      } else {
        const errData = await res.json();
        setMessage({ type: "error", text: errData.error || "Failed to save changes." });
      }
    } catch {
      setMessage({ type: "error", text: "Error saving changes. Check connection." });
    } finally {
      setSaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/admin/login");
    } catch {
      alert("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f9fa", fontFamily: "sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ border: "4px solid rgba(0,0,0,0.1)", borderLeftColor: "#FF6B35", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontWeight: 600, color: "#666" }}>Loading Playhouse CMS...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!data || !currentUser) return null;

  // Settings State Updaters
  const updateSettings = (key: string, value: string) => {
    setData({
      ...data,
      settings: {
        ...data.settings,
        [key]: value
      }
    });
  };

  // Hero State Updaters
  const updateHero = (key: string, value: string) => {
    setData({
      ...data,
      hero: {
        ...data.hero,
        [key]: value
      }
    });
  };

  // About Page State Updaters
  const updateAbout = (key: string, value: string) => {
    setData({
      ...data,
      about: {
        ...data.about,
        [key]: value
      }
    });
  };

  // Curriculum Page State Updaters
  const updateCurriculum = (key: string, value: string) => {
    setData({
      ...data,
      curriculum: {
        ...data.curriculum,
        [key]: value
      }
    });
  };

  // Branch State Updaters
  const updateBranchField = (branchId: string, key: string, value: any) => {
    const updatedBranches = data.branches.map((b: any) => {
      if (b.id === branchId) {
        return { ...b, [key]: value };
      }
      return b;
    });
    setData({ ...data, branches: updatedBranches });
  };

  // Programmes State Updaters
  const updateProgrammeField = (index: number, key: string, value: any) => {
    const updatedProgrammes = [...data.programmes];
    updatedProgrammes[index] = { ...updatedProgrammes[index], [key]: value };
    setData({ ...data, programmes: updatedProgrammes });
  };

  // Bullet Point Assurances Updaters
  const updateAssuranceItem = (category: "careAndComfort" | "healthAndSafety" | "teachingExcellence", index: number, value: string) => {
    const list = [...data.assurances[category]];
    list[index] = value;
    setData({
      ...data,
      assurances: {
        ...data.assurances,
        [category]: list
      }
    });
  };

  const addAssuranceItem = (category: "careAndComfort" | "healthAndSafety" | "teachingExcellence") => {
    setData({
      ...data,
      assurances: {
        ...data.assurances,
        [category]: [...data.assurances[category], "New point item"]
      }
    });
  };

  const removeAssuranceItem = (category: "careAndComfort" | "healthAndSafety" | "teachingExcellence", index: number) => {
    const list = data.assurances[category].filter((_: any, idx: number) => idx !== index);
    setData({
      ...data,
      assurances: {
        ...data.assurances,
        [category]: list
      }
    });
  };

  // ── BLOG CRUD HANDLERS ──
  const saveBlogForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedBlogs = [...data.blogs];
    if (editingBlog.id) {
      updatedBlogs = updatedBlogs.map((b) => (b.id === editingBlog.id ? editingBlog : b));
    } else {
      const newId = `blog-${Date.now()}`;
      updatedBlogs.unshift({ ...editingBlog, id: newId });
    }
    setData({ ...data, blogs: updatedBlogs });
    setEditingBlog(null);
  };

  const deleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updatedBlogs = data.blogs.filter((b: any) => b.id !== id);
      setData({ ...data, blogs: updatedBlogs });
    }
  };

  // ── REVIEWS CRUD HANDLERS ──
  const saveReviewForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedReviews = [...data.reviews];
    if (editingReview.index !== undefined) {
      updatedReviews[editingReview.index] = {
        name: editingReview.name,
        branch: editingReview.branch,
        rating: Number(editingReview.rating),
        text: editingReview.text,
        since: editingReview.since
      };
    } else {
      updatedReviews.unshift({
        name: editingReview.name,
        branch: editingReview.branch,
        rating: Number(editingReview.rating),
        text: editingReview.text,
        since: editingReview.since
      });
    }
    setData({ ...data, reviews: updatedReviews });
    setEditingReview(null);
  };

  const deleteReview = (index: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      const updatedReviews = data.reviews.filter((_: any, idx: number) => idx !== index);
      setData({ ...data, reviews: updatedReviews });
    }
  };

  // ── STAFF CRUD HANDLERS ──
  const saveStaffForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedStaff = [...data.staff];
    const qualArray = typeof editingStaff.quals === "string" 
      ? editingStaff.quals.split("\n").filter((q: string) => q.trim() !== "")
      : editingStaff.quals;

    const staffMember = { ...editingStaff, quals: qualArray };

    if (editingStaff.index !== undefined) {
      updatedStaff[editingStaff.index] = staffMember;
    } else {
      delete staffMember.index;
      updatedStaff.push(staffMember);
    }
    setData({ ...data, staff: updatedStaff });
    setEditingStaff(null);
  };

  const deleteStaff = (index: number) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      const updatedStaff = data.staff.filter((_: any, idx: number) => idx !== index);
      setData({ ...data, staff: updatedStaff });
    }
  };

  // ── VISUAL PAGE BUILDER REORDERING & SECTION UPDATERS ──
  const moveBlock = (index: number, direction: "up" | "down") => {
    if (!editingCustomPage.sections) return;
    const list = [...editingCustomPage.sections];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    
    // Swap items
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setEditingCustomPage({ ...editingCustomPage, sections: list });
    if (editingBlockIndex === index) setEditingBlockIndex(targetIdx);
    else if (editingBlockIndex === targetIdx) setEditingBlockIndex(index);
  };

  const addSectionBlock = (type: "Hero" | "TextContent" | "FeaturesGrid" | "CTA" | "ImageGallery") => {
    const list = [...(editingCustomPage.sections || [])];
    let newBlock: any = { type };

    if (type === "Hero") {
      newBlock = { type, title: "New Heading", subtitle: "Description text...", bgImage: "", buttonText: "", buttonLink: "" };
    } else if (type === "TextContent") {
      newBlock = { type, title: "Section Heading", content: "Write body copy here..." };
    } else if (type === "FeaturesGrid") {
      newBlock = { type, title: "Grid Services", cards: [{ title: "Feature Title", icon: "⭐", description: "Write feature copy." }] };
    } else if (type === "CTA") {
      newBlock = { type, title: "Call to Action", description: "Promotional slogan...", buttonText: "Click Here", buttonLink: "#", bgColor: "linear-gradient(135deg, #1A1A2E 0%, #FF6B35 100%)" };
    } else if (type === "ImageGallery") {
      newBlock = { type, title: "Gallery Album", images: [] };
    }

    list.push(newBlock);
    setEditingCustomPage({ ...editingCustomPage, sections: list });
    setEditingBlockIndex(list.length - 1);
  };

  const removeBlock = (index: number) => {
    if (confirm("Are you sure you want to remove this section block?")) {
      const list = editingCustomPage.sections.filter((_: any, idx: number) => idx !== index);
      setEditingCustomPage({ ...editingCustomPage, sections: list });
      setEditingBlockIndex(null);
    }
  };

  const updateBlockField = (blockIdx: number, key: string, value: any) => {
    const list = [...editingCustomPage.sections];
    list[blockIdx] = { ...list[blockIdx], [key]: value };
    setEditingCustomPage({ ...editingCustomPage, sections: list });
  };

  // Features Card Block helpers
  const addGridCard = (blockIdx: number) => {
    const list = [...editingCustomPage.sections];
    const cards = [...(list[blockIdx].cards || [])];
    cards.push({ title: "New Card Title", icon: "⭐", description: "Description..." });
    list[blockIdx] = { ...list[blockIdx], cards };
    setEditingCustomPage({ ...editingCustomPage, sections: list });
  };

  const removeGridCard = (blockIdx: number, cardIdx: number) => {
    const list = [...editingCustomPage.sections];
    const cards = list[blockIdx].cards.filter((_: any, idx: number) => idx !== cardIdx);
    list[blockIdx] = { ...list[blockIdx], cards };
    setEditingCustomPage({ ...editingCustomPage, sections: list });
  };

  const updateGridCardField = (blockIdx: number, cardIdx: number, key: string, value: string) => {
    const list = [...editingCustomPage.sections];
    const cards = [...list[blockIdx].cards];
    cards[cardIdx] = { ...cards[cardIdx], [key]: value };
    list[blockIdx] = { ...list[blockIdx], cards };
    setEditingCustomPage({ ...editingCustomPage, sections: list });
  };

  // Gallery Block helpers
  const addGalleryImage = (blockIdx: number, url: string) => {
    const list = [...editingCustomPage.sections];
    const images = [...(list[blockIdx].images || []), url];
    list[blockIdx] = { ...list[blockIdx], images };
    setEditingCustomPage({ ...editingCustomPage, sections: list });
  };

  const removeGalleryImage = (blockIdx: number, imgIdx: number) => {
    const list = [...editingCustomPage.sections];
    const images = list[blockIdx].images.filter((_: any, idx: number) => idx !== imgIdx);
    list[blockIdx] = { ...list[blockIdx], images };
    setEditingCustomPage({ ...editingCustomPage, sections: list });
  };

  // ── CUSTOM PAGES SAVE CRUD ──
  const saveCustomPageForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedPages = [...(data.pages || [])];
    let cleanSlug = editingCustomPage.slug.trim().toLowerCase().replace(/[^a-z0-9/-]+/g, "-").replace(/(^-|-$)/g, "");
    
    const pageData = {
      ...editingCustomPage,
      slug: cleanSlug,
      sections: editingCustomPage.sections || []
    };

    if (editingCustomPage.id) {
      updatedPages = updatedPages.map((p) => (p.id === editingCustomPage.id ? pageData : p));
    } else {
      const newId = `page-${Date.now()}`;
      updatedPages.unshift({ ...pageData, id: newId });
    }
    setData({ ...data, pages: updatedPages });
    setEditingCustomPage(null);
    setActiveEditor(null);
    setEditingBlockIndex(null);
  };

  const deleteCustomPage = (id: string) => {
    if (confirm("Are you sure you want to delete this custom page?")) {
      const updatedPages = (data.pages || []).filter((p: any) => p.id !== id);
      setData({ ...data, pages: updatedPages });
    }
  };

  // ── USERS CRUD HANDLERS (Admins Only) ──
  const saveUserForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedUsers = [...(data.users || [])];
    if (editingUser.index !== undefined) {
      updatedUsers[editingUser.index] = {
        email: editingUser.email,
        password: editingUser.password,
        role: editingUser.role,
        name: editingUser.name
      };
    } else {
      updatedUsers.push({
        email: editingUser.email,
        password: editingUser.password,
        role: editingUser.role,
        name: editingUser.name
      });
    }
    setData({ ...data, users: updatedUsers });
    setEditingUser(null);
  };

  const deleteUser = (index: number) => {
    const userToDelete = data.users[index];
    if (userToDelete.email.toLowerCase() === currentUser.email.toLowerCase()) {
      alert("You cannot delete your own active administrator account.");
      return;
    }
    if (confirm(`Are you sure you want to delete the user account for ${userToDelete.name}?`)) {
      const updatedUsers = data.users.filter((_: any, idx: number) => idx !== index);
      setData({ ...data, users: updatedUsers });
    }
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Playhouse <span>CMS</span></h2>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>
            Logged in as: <strong style={{ color: "white" }}>{currentUser.name} ({currentUser.role})</strong>
          </div>
        </div>
        <ul className={styles.sidebarMenu}>
          {currentUser.role === "Admin" && (
            <li className={`${styles.menuItem} ${activeTab === "settings" ? styles.menuItemActive : ""}`} onClick={() => { setActiveTab("settings"); setActiveEditor(null); setEditingBlog(null); setEditingReview(null); setEditingStaff(null); setEditingUser(null); }}>
              <i className="fas fa-cog" /> Settings
            </li>
          )}
          <li className={`${styles.menuItem} ${activeTab === "pages" ? styles.menuItemActive : ""}`} onClick={() => { setActiveTab("pages"); setActiveEditor(null); setEditingBlog(null); setEditingReview(null); setEditingStaff(null); setEditingUser(null); }}>
            <i className="fas fa-file-alt" /> Pages Directory
          </li>
          <li className={`${styles.menuItem} ${activeTab === "blogs" ? styles.menuItemActive : ""}`} onClick={() => { setActiveTab("blogs"); setActiveEditor(null); setEditingBlog(null); setEditingReview(null); setEditingStaff(null); setEditingUser(null); }}>
            <i className="fas fa-edit" /> Blog Posts
          </li>
          {currentUser.role === "Admin" && (
            <li className={`${styles.menuItem} ${activeTab === "users" ? styles.menuItemActive : ""}`} onClick={() => { setActiveTab("users"); setActiveEditor(null); setEditingBlog(null); setEditingReview(null); setEditingStaff(null); setEditingUser(null); }}>
              <i className="fas fa-user-shield" /> Users Manager
            </li>
          )}
        </ul>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>
            {activeTab === "settings" && "General Settings"}
            {activeTab === "blogs" && "Blog Creation & CMS"}
            {activeTab === "users" && "User Accounts Management"}
            {activeTab === "pages" && !activeEditor && "Website Pages Directory"}
            {activeTab === "pages" && activeEditor === "home" && "Edit Page: Home Page"}
            {activeTab === "pages" && activeEditor === "about" && "Edit Page: About Us"}
            {activeTab === "pages" && activeEditor === "curriculum" && "Edit Page: Our Curriculum"}
            {activeTab === "pages" && activeEditor === "staff" && "Edit Page: Our Team List"}
            {activeTab === "pages" && activeEditor === "reviews" && "Edit Page: Parents Reviews"}
            {activeTab === "pages" && activeEditor === "branch" && `Edit Page: ${data.branches.find((b: any) => b.id === selectedBranchId)?.name}`}
            {activeTab === "pages" && activeEditor === "custom" && (editingCustomPage?.id ? `Edit Custom Page: ${editingCustomPage.title}` : "Create Custom Dynamic Page")}
          </h1>
          <div className={styles.headerActions}>
            {message && (
              <span className={`${styles.statusIndicator} ${message.type === "success" ? styles.statusSuccess : styles.statusError}`}>
                <i className={`fas ${message.type === "success" ? "fa-check-circle" : "fa-exclamation-triangle"}`} />
                {message.text}
              </span>
            )}
            <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
              {saving ? "Saving Changes..." : "Save All Changes"}
            </button>
          </div>
        </header>

        <div className={styles.contentBody}>
          {/* ── TAB 1: GENERAL SETTINGS (Admins Only) ── */}
          {activeTab === "settings" && currentUser.role === "Admin" && (
            <div className={styles.card}>
              <h3><i className="fas fa-sliders-h" /> General Site Configurations</h3>
              
              <div className={styles.formGroup}>
                <label>Nursery Logo Image</label>
                <ImageUploader 
                  value={data.settings.logoUrl || ""} 
                  onChange={(url) => updateSettings("logoUrl", url)} 
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nursery Name</label>
                  <input type="text" value={data.settings.siteName} onChange={(e) => updateSettings("siteName", e.target.value)} />
                </div>
                <div className={styles.formRow} style={{ gap: "10px" }}>
                  <div className={styles.formGroup}>
                    <label>Logo Text Main</label>
                    <input type="text" value={data.settings.logoText} onChange={(e) => updateSettings("logoText", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Logo Text Accent</label>
                    <input type="text" value={data.settings.logoAccent} onChange={(e) => updateSettings("logoAccent", e.target.value)} />
                  </div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Global Contact Email</label>
                  <input type="email" value={data.settings.email} onChange={(e) => updateSettings("email", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Global Contact Phone (Primary)</label>
                  <input type="text" value={data.settings.phone} onChange={(e) => updateSettings("phone", e.target.value)} />
                </div>
              </div>
              
              {/* Extra Settings Requested by User */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Secondary Contact Phone</label>
                  <input 
                    type="text" 
                    value={data.settings.secondaryPhone || ""} 
                    onChange={(e) => updateSettings("secondaryPhone", e.target.value)} 
                    placeholder="e.g. +971 50 562 4547"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Meta SEO Keywords</label>
                  <input 
                    type="text" 
                    value={data.settings.metaKeywords || ""} 
                    onChange={(e) => updateSettings("metaKeywords", e.target.value)} 
                    placeholder="e.g. nursery Dubai, EYFS school, Abu Dhabi kindergarten"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Nursery Headquarters Address Line</label>
                <input 
                  type="text" 
                  value={data.settings.addressLine || ""} 
                  onChange={(e) => updateSettings("addressLine", e.target.value)} 
                  placeholder="e.g. Marina Square, Tala Tower, Abu Dhabi, UAE"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Footer Copyright text</label>
                <input 
                  type="text" 
                  value={data.settings.copyrightText || ""} 
                  onChange={(e) => updateSettings("copyrightText", e.target.value)} 
                  placeholder="e.g. © 2026 Playhouse Nursery Group. All rights reserved."
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Instagram URL</label>
                  <input type="text" value={data.settings.instagram} onChange={(e) => updateSettings("instagram", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Facebook URL</label>
                  <input type="text" value={data.settings.facebook} onChange={(e) => updateSettings("facebook", e.target.value)} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>YouTube URL</label>
                  <input type="text" value={data.settings.youtube} onChange={(e) => updateSettings("youtube", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>TikTok URL</label>
                  <input type="text" value={data.settings.tiktok} onChange={(e) => updateSettings("tiktok", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: UNIFIED PAGES DIRECTORY ── */}
          {activeTab === "pages" && !activeEditor && (
            <div className={styles.card}>
              <div className={styles.listHeader}>
                <h3><i className="fas fa-folder-open" /> Manage Site Pages &amp; Structures</h3>
                <button 
                  className={styles.addBtn} 
                  onClick={() => {
                    setActiveEditor("custom");
                    setEditingCustomPage({ title: "", slug: "", parent: "", sections: [], bannerImage: "/images/gallery/sensory-play.jpg", metaDescription: "" });
                  }}
                >
                  <i className="fas fa-plus" /> Create Custom Page
                </button>
              </div>
              
              <table className={styles.itemTable}>
                <thead>
                  <tr>
                    <th>Page Name</th>
                    <th>URL Path Slug</th>
                    <th>Page Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* System Core Pages */}
                  <tr>
                    <td style={{ fontWeight: 700 }}>Home Page</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>/</td>
                    <td><span style={{ fontSize: "0.8rem", background: "#E8EAF6", color: "#3F51B5", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>System</span></td>
                    <td>
                      <button className={styles.editBtn} onClick={() => setActiveEditor("home")}>
                        <i className="fas fa-edit" /> Edit Content
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>About Us</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>/about</td>
                    <td><span style={{ fontSize: "0.8rem", background: "#E8EAF6", color: "#3F51B5", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>System</span></td>
                    <td>
                      <button className={styles.editBtn} onClick={() => setActiveEditor("about")}>
                        <i className="fas fa-edit" /> Edit Content
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Our Curriculum</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>/curriculum</td>
                    <td><span style={{ fontSize: "0.8rem", background: "#E8EAF6", color: "#3F51B5", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>System</span></td>
                    <td>
                      <button className={styles.editBtn} onClick={() => setActiveEditor("curriculum")}>
                        <i className="fas fa-edit" /> Edit Content
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Our Team Profiles</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>/staff</td>
                    <td><span style={{ fontSize: "0.8rem", background: "#E8EAF6", color: "#3F51B5", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>System</span></td>
                    <td>
                      <button className={styles.editBtn} onClick={() => setActiveEditor("staff")}>
                        <i className="fas fa-edit" /> Manage Members
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>Parents Testimonials</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>/reviews</td>
                    <td><span style={{ fontSize: "0.8rem", background: "#E8EAF6", color: "#3F51B5", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>System</span></td>
                    <td>
                      <button className={styles.editBtn} onClick={() => setActiveEditor("reviews")}>
                        <i className="fas fa-edit" /> Manage Reviews
                      </button>
                    </td>
                  </tr>

                  {/* Branch Pages */}
                  {data.branches.map((b: any) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 700 }}>{b.name}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>/branches/{b.slug}</td>
                      <td><span style={{ fontSize: "0.8rem", background: "#E8F5E9", color: "#2E7D32", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>Branch</span></td>
                      <td>
                        <button className={styles.editBtn} onClick={() => { setActiveEditor("branch"); setSelectedBranchId(b.id); }}>
                          <i className="fas fa-edit" /> Edit Content
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Dynamic Custom Pages */}
                  {(data.pages || []).map((p: any) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 700 }}>{p.title}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>/{p.slug}</td>
                      <td><span style={{ fontSize: "0.8rem", background: "#FFF3E0", color: "#EF6C00", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>Custom</span></td>
                      <td>
                        <div className={styles.actionButtons}>
                          <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" className={styles.editBtn} style={{ background: "#E0F2F1", color: "#00796B" }}>
                            <i className="fas fa-eye" /> View
                          </a>
                          <button 
                            className={styles.editBtn} 
                            onClick={() => { 
                              setActiveEditor("custom"); 
                              setEditingCustomPage({ ...p, sections: p.sections || [] }); 
                              setEditingBlockIndex(null);
                            }}
                          >
                            <i className="fas fa-edit" /> Edit
                          </button>
                          <button className={styles.deleteBtn} onClick={() => deleteCustomPage(p.id)}>
                            <i className="fas fa-trash" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── EDITOR: HOME PAGE ── */}
          {activeTab === "pages" && activeEditor === "home" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <button className={styles.backBtn} onClick={() => setActiveEditor(null)}>
                  <i className="fas fa-arrow-left" /> Back to Pages Directory
                </button>
              </div>

              <div className={styles.card}>
                <h3>Hero Section Background &amp; Headings</h3>
                <div className={styles.formGroup}>
                  <label>Hero Background Image</label>
                  <ImageUploader 
                    value={data.hero.bgImage || "/images/gallery/outdoor-play.jpg"} 
                    onChange={(url) => updateHero("bgImage", url)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Hero Main Title</label>
                  <input type="text" value={data.hero.title} onChange={(e) => updateHero("title", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label>Hero Description Slogan</label>
                  <textarea rows={3} value={data.hero.subtitle} onChange={(e) => updateHero("subtitle", e.target.value)} />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Apply Now Button CTA</label>
                    <input type="text" value={data.hero.applyBtnText} onChange={(e) => updateHero("applyBtnText", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Book Visit Button CTA</label>
                    <input type="text" value={data.hero.tourBtnText} onChange={(e) => updateHero("tourBtnText", e.target.value)} />
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.listHeader}>
                  <h3>Homepage Programmes List</h3>
                </div>
                {data.programmes.map((p: any, idx: number) => (
                  <div key={idx} style={{ padding: "16px 0", borderBottom: "1px solid #eee", marginBottom: "16px" }}>
                    <strong>{p.title} ({p.badge})</strong>
                    <div className={styles.formRow} style={{ marginTop: "10px" }}>
                      <div className={styles.formGroup}>
                        <label>Badge</label>
                        <input type="text" value={p.badge} onChange={(e) => updateProgrammeField(idx, "badge", e.target.value)} />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Title</label>
                        <input type="text" value={p.title} onChange={(e) => updateProgrammeField(idx, "title", e.target.value)} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Description</label>
                      <textarea rows={2} value={p.description} onChange={(e) => updateProgrammeField(idx, "description", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.card}>
                <div className={styles.listHeader}>
                  <h3>Assurances Checklist</h3>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Care &amp; Comfort Points</label>
                    {data.assurances.careAndComfort.map((c: string, idx: number) => (
                      <div key={idx} className={styles.bulletItem} style={{ marginBottom: "8px" }}>
                        <input type="text" value={c} onChange={(e) => updateAssuranceItem("careAndComfort", idx, e.target.value)} />
                        <button className={styles.removeBulletBtn} onClick={() => removeAssuranceItem("careAndComfort", idx)}><i className="fas fa-times" /></button>
                      </div>
                    ))}
                    <button className={styles.addBtn} style={{ marginTop: "10px" }} onClick={() => addAssuranceItem("careAndComfort")}>+ Add</button>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Health &amp; Safety Points</label>
                    {data.assurances.healthAndSafety.map((h: string, idx: number) => (
                      <div key={idx} className={styles.bulletItem} style={{ marginBottom: "8px" }}>
                        <input type="text" value={h} onChange={(e) => updateAssuranceItem("healthAndSafety", idx, e.target.value)} />
                        <button className={styles.removeBulletBtn} onClick={() => removeAssuranceItem("healthAndSafety", idx)}><i className="fas fa-times" /></button>
                      </div>
                    ))}
                    <button className={styles.addBtn} style={{ marginTop: "10px" }} onClick={() => addAssuranceItem("healthAndSafety")}>+ Add</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── EDITOR: ABOUT US PAGE ── */}
          {activeTab === "pages" && activeEditor === "about" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <button className={styles.backBtn} onClick={() => setActiveEditor(null)}>
                  <i className="fas fa-arrow-left" /> Back to Pages Directory
                </button>
              </div>

              <div className={styles.card}>
                <h3>About Us Copy Content</h3>
                <div className={styles.formGroup}>
                  <label>Hero Heading</label>
                  <input 
                    type="text" 
                    value={data.about?.heroTitle || "A trusted name in early childhood education across the UAE"} 
                    onChange={(e) => updateAbout("heroTitle", e.target.value)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Hero Description</label>
                  <textarea 
                    rows={3} 
                    value={data.about?.heroSubtitle || "Founded with love and a vision..."} 
                    onChange={(e) => updateAbout("heroSubtitle", e.target.value)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Story Main Title</label>
                  <input 
                    type="text" 
                    value={data.about?.storyTitle || "Nurturing learning and play since 2011"} 
                    onChange={(e) => updateAbout("storyTitle", e.target.value)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Story Description Paragraph</label>
                  <textarea 
                    rows={6} 
                    value={data.about?.storyDescription || "Playhouse Nursery was founded with a single mission..."} 
                    onChange={(e) => updateAbout("storyDescription", e.target.value)} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── EDITOR: CURRICULUM PAGE ── */}
          {activeTab === "pages" && activeEditor === "curriculum" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <button className={styles.backBtn} onClick={() => setActiveEditor(null)}>
                  <i className="fas fa-arrow-left" /> Back to Pages Directory
                </button>
              </div>

              <div className={styles.card}>
                <h3>EYFS Curriculum Copy &amp; Catering Content</h3>
                <div className={styles.formGroup}>
                  <label>Curriculum Hero Title</label>
                  <input 
                    type="text" 
                    value={data.curriculum?.heroTitle || "A world-class curriculum, built for your child"} 
                    onChange={(e) => updateCurriculum("heroTitle", e.target.value)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Curriculum Hero Description</label>
                  <textarea 
                    rows={3} 
                    value={data.curriculum?.heroSubtitle || "We follow the British Early Years Foundation Stage..."} 
                    onChange={(e) => updateCurriculum("heroSubtitle", e.target.value)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Catering Section Title</label>
                  <input 
                    type="text" 
                    value={data.curriculum?.cateringTitle || "Nutritious Meals for Growing Children"} 
                    onChange={(e) => updateCurriculum("cateringTitle", e.target.value)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Catering Description</label>
                  <textarea 
                    rows={6} 
                    value={data.curriculum?.cateringDescription || "Playhouse Nursery offers an optional catering service..."} 
                    onChange={(e) => updateCurriculum("cateringDescription", e.target.value)} 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Catering Image</label>
                  <ImageUploader 
                    value={data.curriculum?.cateringImage || "/images/gallery/sensory-play.jpg"} 
                    onChange={(url) => updateCurriculum("cateringImage", url)} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── EDITOR: OUR TEAM LIST (System) ── */}
          {activeTab === "pages" && activeEditor === "staff" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <button className={styles.backBtn} onClick={() => setActiveEditor(null)}>
                  <i className="fas fa-arrow-left" /> Back to Pages Directory
                </button>
              </div>

              {!editingStaff ? (
                <div className={styles.card}>
                  <div className={styles.listHeader}>
                    <h3><i className="fas fa-users" /> Active Playhouse Staff ({data.staff.length})</h3>
                    <button className={styles.addBtn} onClick={() => setEditingStaff({ name: "", role: "", emoji: "👩‍🏫", photo: "", bg: "linear-gradient(135deg, #FFD1A9, #FFB07C)", quals: [] })}>
                      <i className="fas fa-plus" /> Add Staff Member
                    </button>
                  </div>
                  <table className={styles.itemTable}>
                    <thead>
                      <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Qualifications</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.staff.map((s: any, idx: number) => (
                        <tr key={idx}>
                          <td>
                            <div style={{ background: s.bg, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", overflow: "hidden" }}>
                              {s.photo ? (
                                <img src={s.photo} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              ) : (
                                s.emoji
                              )}
                            </div>
                          </td>
                          <td style={{ fontWeight: 700 }}>{s.name}</td>
                          <td><span className={styles.staffRole} style={{ margin: 0 }}>{s.role}</span></td>
                          <td>
                            <ul style={{ padding: 0, margin: 0, listStyle: "none", fontSize: "0.8rem", color: "#666" }}>
                              {s.quals.map((q: string) => <li key={q}>• {q}</li>)}
                            </ul>
                          </td>
                          <td>
                            <div className={styles.actionButtons}>
                              <button className={styles.editBtn} onClick={() => setEditingStaff({ ...s, index: idx, quals: s.quals.join("\n") })}>
                                <i className="fas fa-edit" /> Edit
                              </button>
                              <button className={styles.deleteBtn} onClick={() => deleteStaff(idx)}>
                                <i className="fas fa-trash" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.card}>
                  <div className={styles.modalHeader}>
                    <button className={styles.backBtn} onClick={() => setEditingStaff(null)}>
                      <i className="fas fa-arrow-left" /> Back
                    </button>
                    <h3>{editingStaff.index !== undefined ? "Edit Staff Member Details" : "Create New Staff Profile"}</h3>
                  </div>
                  <form onSubmit={saveStaffForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Member Name</label>
                        <input type="text" required value={editingStaff.name} onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })} placeholder="e.g. Ms. Omaya" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Role</label>
                        <input type="text" required value={editingStaff.role} onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })} placeholder="e.g. Lead Teacher / Nurse" />
                      </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Profile Photo (Optional - overrides Emoji)</label>
                      <ImageUploader 
                        value={editingStaff.photo || ""} 
                        onChange={(url) => setEditingStaff({ ...editingStaff, photo: url })} 
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Fallback Emoji Avatar</label>
                        <input type="text" required value={editingStaff.emoji} onChange={(e) => setEditingStaff({ ...editingStaff, emoji: e.target.value })} placeholder="e.g. 👩‍🏫" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>CSS Background Gradient</label>
                        <input type="text" required value={editingStaff.bg} onChange={(e) => setEditingStaff({ ...editingStaff, bg: e.target.value })} placeholder="e.g. linear-gradient(135deg, #C8E6C9, #A5D6A7)" />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Qualifications & Details (One per line)</label>
                      <textarea rows={4} value={editingStaff.quals} onChange={(e) => setEditingStaff({ ...editingStaff, quals: e.target.value })} placeholder="e.g. Cache Level 3&#10;7 years in early years" />
                    </div>
                    <button type="submit" className={styles.saveBtn} style={{ background: "#2EC4B6", boxShadow: "0 4px 12px rgba(46,196,182,0.2)" }}>
                      <i className="fas fa-save" /> Save Member Profile
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ── EDITOR: PARENTS REVIEWS (System) ── */}
          {activeTab === "pages" && activeEditor === "reviews" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <button className={styles.backBtn} onClick={() => setActiveEditor(null)}>
                  <i className="fas fa-arrow-left" /> Back to Pages Directory
                </button>
              </div>

              {!editingReview ? (
                <div className={styles.card}>
                  <div className={styles.listHeader}>
                    <h3><i className="fas fa-comment-dots" /> Parent Reviews &amp; Ratings ({data.reviews.length})</h3>
                    <button className={styles.addBtn} onClick={() => setEditingReview({ name: "", branch: "Al Reem", rating: 5, text: "", since: "Parent review" })}>
                      <i className="fas fa-plus" /> Add Testimonial
                    </button>
                  </div>
                  <table className={styles.itemTable}>
                    <thead>
                      <tr>
                        <th>Parent Name</th>
                        <th>Branch</th>
                        <th>Rating</th>
                        <th>Feedback Review Content</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.reviews.map((r: any, idx: number) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>
                            {r.name}
                            <span style={{ display: "block", fontSize: "0.75rem", fontWeight: "normal", color: "#888", marginTop: 2 }}>{r.since}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: "0.85rem", background: "#f0f0f0", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                              {r.branch}
                            </span>
                          </td>
                          <td style={{ color: "#F4B942", letterSpacing: "1px" }}>{"★".repeat(r.rating)}</td>
                          <td style={{ fontSize: "0.85rem", color: "#555", maxWidth: "350px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {r.text}
                          </td>
                          <td>
                            <div className={styles.actionButtons}>
                              <button className={styles.editBtn} onClick={() => setEditingReview({ ...r, index: idx })}>
                                <i className="fas fa-edit" /> Edit
                              </button>
                              <button className={styles.deleteBtn} onClick={() => deleteReview(idx)}>
                                <i className="fas fa-trash" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.card}>
                  <div className={styles.modalHeader}>
                    <button className={styles.backBtn} onClick={() => setEditingReview(null)}>
                      <i className="fas fa-arrow-left" /> Back
                    </button>
                    <h3>{editingReview.index !== undefined ? "Edit Parent Testimonial" : "Create New Testimonial"}</h3>
                  </div>
                  <form onSubmit={saveReviewForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Parent Name</label>
                        <input type="text" required value={editingReview.name} onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })} placeholder="e.g. Madhuri Bhardwaj" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Parent Since / Label</label>
                        <input type="text" required value={editingReview.since} onChange={(e) => setEditingReview({ ...editingReview, since: e.target.value })} placeholder="e.g. Parent review / Parent since 2022" />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Assigned Branch</label>
                        <select value={editingReview.branch} onChange={(e) => setEditingReview({ ...editingReview, branch: e.target.value })}>
                          <option value="Al Reem">Al Reem</option>
                          <option value="Khalidiya">Khalidiya</option>
                          <option value="Mirdif">Mirdif</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Rating Score</label>
                        <select value={editingReview.rating} onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}>
                          <option value={5}>5 Stars ★★★★★</option>
                          <option value={4}>4 Stars ★★★★</option>
                          <option value={3}>3 Stars ★★★</option>
                          <option value={2}>2 Stars ★★</option>
                          <option value={1}>1 Star ★</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Review Text Content</label>
                      <textarea rows={6} required value={editingReview.text} onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })} placeholder="Write the review from the parent here..." />
                    </div>
                    <button type="submit" className={styles.saveBtn} style={{ background: "#2EC4B6", boxShadow: "0 4px 12px rgba(46,196,182,0.2)" }}>
                      <i className="fas fa-save" /> Save Testimonial
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ── EDITOR: BRANCH DETAILS ── */}
          {activeTab === "pages" && activeEditor === "branch" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <button className={styles.backBtn} onClick={() => setActiveEditor(null)}>
                  <i className="fas fa-arrow-left" /> Back to Pages Directory
                </button>
              </div>

              {data.branches.filter((b: any) => b.id === selectedBranchId).map((branch: any) => (
                <div key={branch.id} className={styles.card}>
                  <h3><i className="fas fa-map-marker-alt" /> Edit {branch.name} Configuration</h3>
                  
                  <div className={styles.formGroup}>
                    <label>Branch Hero/Banner Image</label>
                    <ImageUploader 
                      value={branch.heroImg || ""} 
                      onChange={(url) => updateBranchField(branch.id, "heroImg", url)} 
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Branch Title</label>
                      <input type="text" value={branch.name} onChange={(e) => updateBranchField(branch.id, "name", e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Label Tag</label>
                      <input type="text" value={branch.label} onChange={(e) => updateBranchField(branch.id, "label", e.target.value)} />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Branch Phone</label>
                      <input type="text" value={branch.phone} onChange={(e) => updateBranchField(branch.id, "phone", e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Branch Email</label>
                      <input type="email" value={branch.email} onChange={(e) => updateBranchField(branch.id, "email", e.target.value)} />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Operating Hours</label>
                      <input type="text" value={branch.hours} onChange={(e) => updateBranchField(branch.id, "hours", e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>WhatsApp Link</label>
                      <input type="text" value={branch.whatsapp} onChange={(e) => updateBranchField(branch.id, "whatsapp", e.target.value)} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Physical Address</label>
                    <input type="text" value={branch.address} onChange={(e) => updateBranchField(branch.id, "address", e.target.value)} />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Branch Description Slogan</label>
                    <textarea rows={3} value={branch.description} onChange={(e) => updateBranchField(branch.id, "description", e.target.value)} />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Gallery Images List</label>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
                      {branch.galleryImages?.map((img: string, idx: number) => (
                        <div key={idx} style={{ position: "relative", width: "80px", height: "80px", border: "1px solid #ccc", borderRadius: "6px", overflow: "hidden" }}>
                          <img src={img} alt="Gallery item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <button 
                            type="button"
                            onClick={() => {
                              const filtered = branch.galleryImages.filter((_: any, i: number) => i !== idx);
                              updateBranchField(branch.id, "galleryImages", filtered);
                            }}
                            style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(239, 83, 80, 0.9)", color: "white", border: "none", borderRadius: "50%", width: "18px", height: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <ImageUploader 
                      value="" 
                      onChange={(url) => {
                        const updatedList = [...(branch.galleryImages || []), url];
                        updateBranchField(branch.id, "galleryImages", updatedList);
                      }} 
                    />
                    <span className={styles.formHelper}>Upload a new image to append to this branch&apos;s gallery strip.</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── EDITOR: CUSTOM DYNAMIC PAGES (Visual Block Builder) ── */}
          {activeTab === "pages" && activeEditor === "custom" && editingCustomPage && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <button className={styles.backBtn} onClick={() => { setActiveEditor(null); setEditingCustomPage(null); setEditingBlockIndex(null); }}>
                  <i className="fas fa-arrow-left" /> Back to Pages Directory
                </button>
              </div>

              <div className={styles.card}>
                <h3>{editingCustomPage.id ? "Edit Custom Page" : "Create Custom Page"}</h3>
                <form onSubmit={saveCustomPageForm}>
                  <div className={styles.formGroup}>
                    <label>Page Title</label>
                    <input 
                      type="text" 
                      required 
                      value={editingCustomPage.title} 
                      onChange={(e) => {
                        const title = e.target.value;
                        let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        if (editingCustomPage.parent) {
                          slug = `${editingCustomPage.parent}/${slug}`;
                        }
                        setEditingCustomPage({ ...editingCustomPage, title, slug });
                      }} 
                      placeholder="e.g. Safety Standards"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Parent Page Path Prefix</label>
                      <select 
                        value={editingCustomPage.parent || ""} 
                        onChange={(e) => {
                          const parent = e.target.value;
                          const titleSlug = editingCustomPage.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                          const slug = parent ? `${parent}/${titleSlug}` : titleSlug;
                          setEditingCustomPage({ ...editingCustomPage, parent, slug });
                        }}
                      >
                        <option value="">None (Root Page: e.g. /my-page)</option>
                        <option value="about">About Us (Nested: e.g. /about/my-page)</option>
                        <option value="curriculum">Curriculum (Nested: e.g. /curriculum/my-page)</option>
                        <option value="tours">Tours (Nested: e.g. /tours/my-page)</option>
                        <option value="branches">Branches (Nested: e.g. /branches/my-page)</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Final URL Path Slug</label>
                      <input 
                        type="text" 
                        required 
                        value={editingCustomPage.slug} 
                        onChange={(e) => setEditingCustomPage({ ...editingCustomPage, slug: e.target.value })} 
                        placeholder="e.g. about/safety-standards"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>SEO Meta Description</label>
                    <input 
                      type="text" 
                      value={editingCustomPage.metaDescription} 
                      onChange={(e) => setEditingCustomPage({ ...editingCustomPage, metaDescription: e.target.value })} 
                      placeholder="A concise summary of this page for search engines..." 
                    />
                  </div>

                  {/* 🛠️ VISUAL PAGE BUILDER SECTIONS 🛠️ */}
                  <div style={{ marginTop: "32px", borderTop: "2px solid #eee", paddingTop: "24px" }}>
                    <h4 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "6px" }}>Visual Page Builder Sections</h4>
                    <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "20px" }}>
                      Build your custom layout by adding, reordering, and editing visual section blocks.
                    </p>

                    {(!editingCustomPage.sections || editingCustomPage.sections.length === 0) ? (
                      <div style={{ padding: "40px", border: "2px dashed #ccc", borderRadius: "8px", textAlign: "center", background: "#fafafa" }}>
                        <p style={{ color: "#888", margin: 0 }}>No layout blocks added yet. Click a button below to add your first section!</p>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {editingCustomPage.sections.map((section: any, secIdx: number) => (
                          <div 
                            key={secIdx} 
                            style={{ 
                              border: "1px solid #ddd", 
                              borderRadius: "8px", 
                              background: "#fff", 
                              boxShadow: "0 2px 4px rgba(0,0,0,0.02)" 
                            }}
                          >
                            {/* Header / Reorder bar */}
                            <div 
                              style={{ 
                                padding: "12px 18px", 
                                background: "#fafafa", 
                                borderBottom: "1px solid #eee", 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center",
                                borderRadius: "8px 8px 0 0"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontSize: "0.75rem", background: "var(--primary)", color: "white", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                                  {section.type}
                                </span>
                                <strong style={{ fontSize: "0.95rem" }}>
                                  Block {secIdx + 1}: {section.title || "(Untitled Section)"}
                                </strong>
                              </div>
                              <div style={{ display: "flex", gap: "6px" }}>
                                <button 
                                  type="button" 
                                  onClick={() => moveBlock(secIdx, "up")}
                                  disabled={secIdx === 0}
                                  className={styles.editBtn} 
                                  style={{ padding: "4px 8px" }}
                                >
                                  <i className="fas fa-arrow-up" />
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => moveBlock(secIdx, "down")}
                                  disabled={secIdx === editingCustomPage.sections.length - 1}
                                  className={styles.editBtn} 
                                  style={{ padding: "4px 8px" }}
                                >
                                  <i className="fas fa-arrow-down" />
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => setEditingBlockIndex(editingBlockIndex === secIdx ? null : secIdx)}
                                  className={styles.editBtn} 
                                  style={{ padding: "4px 8px", background: "#E8F5E9", color: "#2E7D32" }}
                                >
                                  <i className="fas fa-edit" /> {editingBlockIndex === secIdx ? "Close Editor" : "Edit Section"}
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => removeBlock(secIdx)}
                                  className={styles.deleteBtn} 
                                  style={{ padding: "4px 8px" }}
                                >
                                  <i className="fas fa-trash" />
                                </button>
                              </div>
                            </div>

                            {/* Block Fields Editor */}
                            {editingBlockIndex === secIdx && (
                              <div style={{ padding: "20px" }}>
                                {section.type === "Hero" && (
                                  <>
                                    <div className={styles.formGroup}>
                                      <label>Hero Background Image</label>
                                      <ImageUploader 
                                        value={section.bgImage || ""} 
                                        onChange={(url) => updateBlockField(secIdx, "bgImage", url)} 
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <label>Section Heading</label>
                                      <input 
                                        type="text" 
                                        value={section.title || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "title", e.target.value)} 
                                        placeholder="e.g. Safety Standards at Playhouse"
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <label>Subtitle / Description</label>
                                      <input 
                                        type="text" 
                                        value={section.subtitle || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "subtitle", e.target.value)} 
                                      />
                                    </div>
                                    <div className={styles.formRow}>
                                      <div className={styles.formGroup}>
                                        <label>CTA Button Text</label>
                                        <input 
                                          type="text" 
                                          value={section.buttonText || ""} 
                                          onChange={(e) => updateBlockField(secIdx, "buttonText", e.target.value)} 
                                        />
                                      </div>
                                      <div className={styles.formGroup}>
                                        <label>CTA Button Link</label>
                                        <input 
                                          type="text" 
                                          value={section.buttonLink || ""} 
                                          onChange={(e) => updateBlockField(secIdx, "buttonLink", e.target.value)} 
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}

                                {section.type === "TextContent" && (
                                  <>
                                    <div className={styles.formGroup}>
                                      <label>Section Title</label>
                                      <input 
                                        type="text" 
                                        value={section.title || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "title", e.target.value)} 
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <label>Content Body (Markdown supported)</label>
                                      <textarea 
                                        rows={8} 
                                        value={section.content || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "content", e.target.value)} 
                                      />
                                    </div>
                                  </>
                                )}

                                {section.type === "FeaturesGrid" && (
                                  <>
                                    <div className={styles.formGroup}>
                                      <label>Section Title</label>
                                      <input 
                                        type="text" 
                                        value={section.title || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "title", e.target.value)} 
                                      />
                                    </div>
                                    
                                    {/* Nested cards */}
                                    <div style={{ marginTop: "12px" }}>
                                      <label style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "#666" }}>Grid Cards</label>
                                      {(section.cards || []).map((card: any, cardIdx: number) => (
                                        <div key={cardIdx} style={{ background: "#f9f9f9", border: "1px solid #eee", padding: "14px", borderRadius: 6, marginBottom: 10, position: "relative" }}>
                                          <button 
                                            type="button" 
                                            onClick={() => removeGridCard(secIdx, cardIdx)}
                                            style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", color: "#D32F2F", cursor: "pointer" }}
                                          >
                                            <i className="fas fa-times" />
                                          </button>
                                          <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                              <label>Card Title</label>
                                              <input 
                                                type="text" 
                                                value={card.title || ""} 
                                                onChange={(e) => updateGridCardField(secIdx, cardIdx, "title", e.target.value)} 
                                              />
                                            </div>
                                            <div className={styles.formGroup}>
                                              <label>Card Emoji / Icon</label>
                                              <input 
                                                type="text" 
                                                value={card.icon || ""} 
                                                onChange={(e) => updateGridCardField(secIdx, cardIdx, "icon", e.target.value)} 
                                              />
                                            </div>
                                          </div>
                                          <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                                            <label>Card Description</label>
                                            <input 
                                              type="text" 
                                              value={card.description || ""} 
                                              onChange={(e) => updateGridCardField(secIdx, cardIdx, "description", e.target.value)} 
                                            />
                                          </div>
                                        </div>
                                      ))}
                                      <button 
                                        type="button" 
                                        className={styles.addBtn} 
                                        style={{ marginTop: 6 }} 
                                        onClick={() => addGridCard(secIdx)}
                                      >
                                        + Add Card
                                      </button>
                                    </div>
                                  </>
                                )}

                                {section.type === "CTA" && (
                                  <>
                                    <div className={styles.formGroup}>
                                      <label>Section Title</label>
                                      <input 
                                        type="text" 
                                        value={section.title || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "title", e.target.value)} 
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <label>Description Slogan</label>
                                      <input 
                                        type="text" 
                                        value={section.description || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "description", e.target.value)} 
                                      />
                                    </div>
                                    <div className={styles.formRow}>
                                      <div className={styles.formGroup}>
                                        <label>Button Text</label>
                                        <input 
                                          type="text" 
                                          value={section.buttonText || ""} 
                                          onChange={(e) => updateBlockField(secIdx, "buttonText", e.target.value)} 
                                        />
                                      </div>
                                      <div className={styles.formGroup}>
                                        <label>Button Link</label>
                                        <input 
                                          type="text" 
                                          value={section.buttonLink || ""} 
                                          onChange={(e) => updateBlockField(secIdx, "buttonLink", e.target.value)} 
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}

                                {section.type === "ImageGallery" && (
                                  <>
                                    <div className={styles.formGroup}>
                                      <label>Section Title</label>
                                      <input 
                                        type="text" 
                                        value={section.title || ""} 
                                        onChange={(e) => updateBlockField(secIdx, "title", e.target.value)} 
                                      />
                                    </div>
                                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
                                      {(section.images || []).map((img: string, imgIdx: number) => (
                                        <div key={imgIdx} style={{ position: "relative", width: "80px", height: "80px", border: "1px solid #ccc", borderRadius: "6px", overflow: "hidden" }}>
                                          <img src={img} alt="Gallery item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                          <button 
                                            type="button"
                                            onClick={() => removeGalleryImage(secIdx, imgIdx)}
                                            style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(239, 83, 80, 0.9)", color: "white", border: "none", borderRadius: "50%", width: "18px", height: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}
                                          >
                                            ×
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                    <ImageUploader 
                                      value="" 
                                      onChange={(url) => addGalleryImage(secIdx, url)} 
                                    />
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Block buttons */}
                    <div style={{ marginTop: 24, display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button type="button" className={styles.addBtn} style={{ background: "#4A90E2" }} onClick={() => addSectionBlock("Hero")}>
                        <i className="fas fa-plus" /> + Add Hero Banner
                      </button>
                      <button type="button" className={styles.addBtn} style={{ background: "#4A90E2" }} onClick={() => addSectionBlock("TextContent")}>
                        <i className="fas fa-plus" /> + Add Text Column
                      </button>
                      <button type="button" className={styles.addBtn} style={{ background: "#4A90E2" }} onClick={() => addSectionBlock("FeaturesGrid")}>
                        <i className="fas fa-plus" /> + Add Cards Grid
                      </button>
                      <button type="button" className={styles.addBtn} style={{ background: "#4A90E2" }} onClick={() => addSectionBlock("CTA")}>
                        <i className="fas fa-plus" /> + Add Call to Action
                      </button>
                      <button type="button" className={styles.addBtn} style={{ background: "#4A90E2" }} onClick={() => addSectionBlock("ImageGallery")}>
                        <i className="fas fa-plus" /> + Add Image Gallery
                      </button>
                    </div>
                  </div>

                  <button type="submit" className={styles.saveBtn} style={{ background: "#2EC4B6", boxShadow: "0 4px 12px rgba(46,196,182,0.2)", marginTop: 32 }}>
                    <i className="fas fa-save" /> Save Custom Page
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── TAB 3: BLOGS CMS ── */}
          {activeTab === "blogs" && (
            <div>
              {!editingBlog ? (
                <div className={styles.card}>
                  <div className={styles.listHeader}>
                    <h3><i className="fas fa-book" /> Published Blog Posts ({data.blogs.length})</h3>
                    <button className={styles.addBtn} onClick={() => setEditingBlog({ title: "", slug: "", date: new Date().toISOString().split("T")[0], category: "Parenting", excerpt: "", content: "", coverImage: "/images/gallery/sensory-play.jpg" })}>
                      <i className="fas fa-plus" /> Create New Post
                    </button>
                  </div>
                  <table className={styles.itemTable}>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Publish Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.blogs.map((b: any) => (
                        <tr key={b.id}>
                          <td style={{ fontWeight: 700 }}>
                            {b.title}
                            <span style={{ display: "block", fontSize: "0.75rem", fontWeight: "normal", color: "#888", marginTop: 2 }}>/blog/{b.slug}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: "0.85rem", background: "#E0F2F1", color: "#00796B", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                              {b.category}
                            </span>
                          </td>
                          <td style={{ fontSize: "0.85rem", color: "#555" }}>{b.date}</td>
                          <td>
                            <div className={styles.actionButtons}>
                              <button className={styles.editBtn} onClick={() => setEditingBlog(b)}>
                                <i className="fas fa-edit" /> Edit
                              </button>
                              <button className={styles.deleteBtn} onClick={() => deleteBlog(b.id)}>
                                <i className="fas fa-trash" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.card}>
                  <div className={styles.modalHeader}>
                    <button className={styles.backBtn} onClick={() => setEditingBlog(null)}>
                      <i className="fas fa-arrow-left" /> Back
                    </button>
                    <h3>{editingBlog.id ? "Edit Blog Post" : "Create New Blog Post"}</h3>
                  </div>
                  <form onSubmit={saveBlogForm}>
                    <div className={styles.formGroup}>
                      <label>Article Title</label>
                      <input 
                        type="text" 
                        required 
                        value={editingBlog.title} 
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                          setEditingBlog({ ...editingBlog, title, slug });
                        }} 
                        placeholder="e.g. Benefits of Sensory Play"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Cover Image</label>
                      <ImageUploader 
                        value={editingBlog.coverImage} 
                        onChange={(url) => setEditingBlog({ ...editingBlog, coverImage: url })} 
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>URL Slug</label>
                        <input type="text" required value={editingBlog.slug} onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })} placeholder="e.g. benefits-of-sensory-play" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Category</label>
                        <select value={editingBlog.category} onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}>
                          <option value="Parenting">Parenting</option>
                          <option value="Education">Education</option>
                          <option value="Health">Health</option>
                          <option value="Nursery News">Nursery News</option>
                          <option value="Activities">Activities</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Publication Date</label>
                        <input type="date" required value={editingBlog.date} onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Excerpt / Summary (Appears in blog lists)</label>
                      <input type="text" required value={editingBlog.excerpt} onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} placeholder="A short one-sentence summary..." />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Full Article Content (Markdown format supported)</label>
                      <textarea rows={16} required value={editingBlog.content} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })} placeholder="Use Markdown for bold, headings, lists..." />
                    </div>
                    <button type="submit" className={styles.saveBtn} style={{ background: "#2EC4B6", boxShadow: "0 4px 12px rgba(46,196,182,0.2)" }}>
                      <i className="fas fa-paper-plane" /> Publish / Save Article
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 4: USERS (Admins Only) ── */}
          {activeTab === "users" && currentUser.role === "Admin" && (
            <div>
              {!editingUser ? (
                <div className={styles.card}>
                  <div className={styles.listHeader}>
                    <h3><i className="fas fa-user-shield" /> Registered User Accounts ({data.users.length})</h3>
                    <button className={styles.addBtn} onClick={() => setEditingUser({ name: "", email: "", password: "", role: "Manager" })}>
                      <i className="fas fa-plus" /> Create New User
                    </button>
                  </div>
                  <table className={styles.itemTable}>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Role Permissions</th>
                        <th>Password (Plain)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users.map((u: any, idx: number) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <span 
                              style={{ 
                                fontSize: "0.85rem", 
                                background: u.role === "Admin" ? "#E8EAF6" : "#ECEFF1", 
                                color: u.role === "Admin" ? "#3F51B5" : "#607D8B", 
                                padding: "4px 8px", 
                                borderRadius: "4px", 
                                fontWeight: "bold" 
                              }}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#666" }}>{u.password}</td>
                          <td>
                            <div className={styles.actionButtons}>
                              <button className={styles.editBtn} onClick={() => setEditingUser({ ...u, index: idx })}>
                                <i className="fas fa-edit" /> Edit
                              </button>
                              <button className={styles.deleteBtn} onClick={() => deleteUser(idx)}>
                                <i className="fas fa-trash" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={styles.card}>
                  <div className={styles.modalHeader}>
                    <button className={styles.backBtn} onClick={() => setEditingUser(null)}>
                      <i className="fas fa-arrow-left" /> Back
                    </button>
                    <h3>{editingUser.index !== undefined ? "Edit User Credentials" : "Create New User Account"}</h3>
                  </div>
                  <form onSubmit={saveUserForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>User Full Name</label>
                        <input type="text" required value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} placeholder="e.g. Saloni Rajput" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Role Permissions</label>
                        <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                          <option value="Manager">Manager (Edit content, staff, reviews, blogs)</option>
                          <option value="Admin">Admin (Full privileges + edit user accounts)</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input type="email" required value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} placeholder="e.g. editor@playhousenursery.ae" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="text" required value={editingUser.password} onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} placeholder="Password string..." />
                      </div>
                    </div>
                    <button type="submit" className={styles.saveBtn} style={{ background: "#2EC4B6", boxShadow: "0 4px 12px rgba(46,196,182,0.2)" }}>
                      <i className="fas fa-save" /> Save User Credentials
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
