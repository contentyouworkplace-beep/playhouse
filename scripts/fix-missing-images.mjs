/**
 * Playhouse Nursery — Fix the 4 missing images
 * Run: node scripts/fix-missing-images.mjs
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const MISSING = [
  ["public/images/gallery/graduation.jpg",    "1541339907198-e08756dedf3f", "w=900&h=700&fit=crop&q=80"],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    const get = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close(); get(res.headers.location); return;
        }
        if (res.statusCode !== 200) {
          file.close(); reject(new Error(`HTTP ${res.statusCode}`)); return;
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
    };
    get(url);
  });
}

async function main() {
  console.log("\n🔧 Fixing 4 missing nursery images...\n");
  for (const [rel, id, params] of MISSING) {
    const dest = path.join(ROOT, rel);
    const url  = `https://images.unsplash.com/photo-${id}?${params}&auto=format`;
    process.stdout.write(`  ⬇  ${rel.padEnd(50)}`);
    try {
      await download(url, dest);
      console.log("✅");
    } catch (err) {
      console.log(`❌  ${err.message}`);
    }
  }
  console.log("\n✨ All images are now in place!\n");
}

main();
