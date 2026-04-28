/**
 * Playhouse Nursery — Download nursery-specific images
 * Run: node scripts/download-nursery-images.mjs
 *
 * Downloads curated, nursery-appropriate photos from Unsplash
 * (children learning, playing, doing art — NO buildings or fruits)
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Each image: [destination path, Unsplash photo ID, crop params]
const IMAGES = [
  // ── Hero images (full-screen, wide) ─────────────────────────────
  ["public/images/hero/hero-1.jpg",         "1503676260728-1c00da094a0b", "w=1920&h=1080&fit=crop&q=85"], // children learning
  ["public/images/hero/hero-2.jpg",         "1503676382389-4809596d5290", "w=1920&h=1080&fit=crop&q=85"], // toddlers outdoor
  ["public/images/hero/hero-3.jpg",         "1560807707-8cc77767d783",    "w=1920&h=1080&fit=crop&q=85"], // kids art & craft

  // ── Gallery images ───────────────────────────────────────────────
  ["public/images/gallery/outdoor-play.jpg",  "1526634332515-d56c5fd16991", "w=900&h=700&fit=crop&q=80"], // playground / outdoor
  ["public/images/gallery/art-class.jpg",     "1513364776144-60967b0f800f", "w=900&h=700&fit=crop&q=80"], // kids painting
  ["public/images/gallery/sensory-play.jpg",  "1587654780291-39c9404d746b", "w=900&h=700&fit=crop&q=80"], // sand/sensory play
  ["public/images/gallery/nature-garden.jpg", "1476703993599-0035a21b17a9", "w=900&h=700&fit=crop&q=80"], // garden / nature
  ["public/images/gallery/national-day.jpg",  "1492684223066-81342ee5ff30", "w=900&h=700&fit=crop&q=80"], // celebration / festive
  ["public/images/gallery/music-room.jpg",    "1511671782779-c97d3d27a1d4", "w=900&h=700&fit=crop&q=80"], // kids music
  ["public/images/gallery/story-time.jpg",    "1535905557558-afc4877a26fc", "w=900&h=700&fit=crop&q=80"], // storytime / reading
  ["public/images/gallery/splash-zone.jpg",   "1560806887-1e4cd0b6cbd6",   "w=900&h=700&fit=crop&q=80"], // water play
  ["public/images/gallery/graduation.jpg",    "1523050854058-8df90110c9f1", "w=900&h=700&fit=crop&q=80"], // nursery graduation
  ["public/images/gallery/science.jpg",       "1594744803329-e58b31de8bf5", "w=900&h=700&fit=crop&q=80"], // kids science experiment
  ["public/images/gallery/yoga.jpg",          "1506126613408-eca07ce68773", "w=900&h=700&fit=crop&q=80"], // kids yoga / movement
  ["public/images/gallery/eid.jpg",           "1516450360452-9312f5e86fc7", "w=900&h=700&fit=crop&q=80"], // eid celebration

  // ── Branch images ────────────────────────────────────────────────
  ["public/images/branches/khalidiya.jpg", "1503676260728-1c00da094a0b", "w=1200&h=700&fit=crop&q=85"], // nursery classroom
  ["public/images/branches/al-reem.jpg",   "1560807707-8cc77767d783",    "w=1200&h=700&fit=crop&q=85"], // kids art
  ["public/images/branches/mirdif.jpg",    "1526634332515-d56c5fd16991", "w=1200&h=700&fit=crop&q=85"], // outdoor play

  // ── Staff placeholder ────────────────────────────────────────────
  ["public/images/staff/teacher-1.jpg", "1494790108377-be9c29b29330", "w=500&h=600&fit=crop&q=80"],
  ["public/images/staff/teacher-2.jpg", "1438761681033-6461ffad8d80", "w=500&h=600&fit=crop&q=80"],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(dest);
    const get = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          reject(new Error(`HTTP ${res.statusCode} for ${u}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
    };
    get(url);
  });
}

// Old wrong images in /public/gallery/ to remove
const CLEANUP = [
  "public/gallery/bodakdev-school.jpg",
  "public/gallery/nursery-class-india.jpg",
  "public/gallery/nursery-school-education.webp",
  "public/gallery/role-of-nursery-school-education.jpg",
  "public/gallery/The-Ultimate-Guide-to-Applying-for-Nursery-School-Admission-2025-26_11zon.jpg",
  "public/gallery/differences-between-playschool-and-nursery_orig.jpg",
  "public/gallery/wcp-2403191506-0783927030.jpg",
  "public/gallery/premium_photo-1681842143575-03bf1be4c11c.avif",
  "public/gallery/ec53b18b303e11d3a4decfa2f9276831-1024x683.jpg",
  "public/gallery/Nursery-School-Admission-in-Gurgaon.jpg",
  "public/gallery/istockphoto-998670532-612x612.jpg",
  "public/gallery/StartingPrimarySchool.png",
  "public/gallery/pexels-naomi-shi-374023-1001914.jpg",
  "public/gallery/importance-of-nursery-education.webp",
  "public/gallery/gettyimages-469802844-640x640.jpg",
  "public/gallery/Smart-Reasons-to-Start-Right-with-the-Right-Pre-Nursery-School.jpg",
];

async function main() {
  console.log(`\n🌿 Playhouse Nursery — Downloading ${IMAGES.length} nursery images...\n`);
  for (const [rel, id, params] of IMAGES) {
    const dest = path.join(ROOT, rel);
    const url  = `https://images.unsplash.com/photo-${id}?${params}&auto=format`;
    process.stdout.write(`  ⬇  ${rel.padEnd(55)}`);
    try {
      await download(url, dest);
      console.log("✅");
    } catch (err) {
      console.log(`❌  ${err.message}`);
    }
  }

  // Clean up wrong old images
  console.log("\n🗑  Removing old incorrect images...");
  for (const rel of CLEANUP) {
    const p = path.join(ROOT, rel);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`  🗑  Removed ${rel}`);
    }
  }
  // Remove old branch images with wrong names
  ["marina","jumeirah","downtown"].forEach(name => {
    const p = path.join(ROOT, `public/images/branches/${name}.jpg`);
    if (fs.existsSync(p)) { fs.unlinkSync(p); console.log(`  🗑  Removed branches/${name}.jpg`); }
  });

  console.log("\n✨ Done! All nursery-specific images are in place.\n");
}

main();
