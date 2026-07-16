// Image pipeline (PLAN §2.1, §2.5).
//
// Drop original photos into assets-src/ (gitignored — originals may carry
// EXIF/GPS metadata and are never committed), then run `npm run images`.
// Each original is resized to 640w and 1280w WebP in public/images/, named
// <basename>-640.webp / <basename>-1280.webp. sharp strips metadata by
// default, so the committed copies are EXIF-free. Existing outputs are
// skipped; delete them to regenerate.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = "assets-src";
const OUT = path.join("public", "images");
const WIDTHS = [640, 1280];
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

if (!fs.existsSync(SRC)) {
  console.log(`No ${SRC}/ directory — nothing to do.`);
  process.exit(0);
}
fs.mkdirSync(OUT, { recursive: true });

let made = 0;
for (const file of fs.readdirSync(SRC)) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;
  const base = path.basename(file, path.extname(file));
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    if (fs.existsSync(out)) {
      console.log(`skip   ${out} (exists)`);
      continue;
    }
    execFileSync(
      "npx",
      [
        "--yes",
        "sharp-cli",
        "--input",
        path.join(SRC, file),
        "--output",
        out,
        "resize",
        String(w),
      ],
      { stdio: "inherit", shell: process.platform === "win32" },
    );
    made++;
  }
}
console.log(made ? `done — ${made} file(s) written.` : "done — nothing new.");
