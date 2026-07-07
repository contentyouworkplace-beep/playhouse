import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "lib/data/content.json");

export type ContentUser = {
  email: string;
  password: string;
  role: "Admin" | "Manager";
  name: string;
};

export type SiteSettings = {
  siteName?: string;
  logoText?: string;
  logoAccent?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  copyrightText?: string;
};

export type Branch = {
  id: string;
  name: string;
  label?: string;
  slug: string;
  color?: string;
  gradient?: string;
  heroImg?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  whatsapp?: string;
  description?: string;
  highlights?: Array<{ icon?: string; label: string }>;
  galleryImages?: string[];
  staff?: Array<{
    name: string;
    role: string;
    emoji?: string;
    bg?: string;
    quals?: string[];
  }>;
};

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  date?: string;
  coverImage?: string;
};

export type CustomPageSection =
  | {
      type: "Hero";
      title?: string;
      subtitle?: string;
      bgImage?: string;
      buttonText?: string;
      buttonLink?: string;
    }
  | {
      type: "TextContent";
      title?: string;
      content?: string;
    }
  | {
      type: "FeaturesGrid";
      title?: string;
      cards?: Array<{ title?: string; icon?: string; description?: string }>;
    }
  | {
      type: "CTA";
      title?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
      bgColor?: string;
    }
  | {
      type: "ImageGallery";
      title?: string;
      images?: string[];
    };

export type CustomPage = {
  title: string;
  slug: string;
  metaDescription?: string;
  bannerImage?: string;
  content?: string;
  sections?: CustomPageSection[];
};

export type Review = {
  name: string;
  text: string;
  since?: string;
  rating: number;
  branch?: string;
};

export type StaffMember = {
  name: string;
  role: string;
  emoji?: string;
  bg?: string;
  photo?: string;
  quals?: string[];
};

export type ContentData = {
  users?: ContentUser[];
  settings?: SiteSettings;
  hero?: Record<string, string>;
  branches?: Branch[];
  blogs?: BlogPost[];
  pages?: CustomPage[];
  reviews?: Review[];
  staff?: StaffMember[];
  programmes?: Array<{
    title: string;
    badge?: string;
    description?: string;
    features?: string[];
  }>;
  assurances?: {
    careAndComfort?: string[];
    healthAndSafety?: string[];
    teachingExcellence?: string[];
  };
  faqs?: Array<{ q: string; a: string }>;
};

export function getContent(): ContentData {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData) as ContentData;
  } catch (error) {
    console.error("Error reading content database:", error);
    return {};
  }
}

export function saveContent(content: ContentData) {
  try {
    // Ensure parent directories exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving content database:", error);
    return false;
  }
}
