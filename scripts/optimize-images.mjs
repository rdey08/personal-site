// Image pipeline (PLAN §2.1, §2.5).
//
// Drop original photos into assets-src/ (gitignored — originals may carry
// EXIF/GPS metadata and are never committed), then run `npm run images`.
// Each original is resized to 640w and 1280w WebP in public/images/, named
// <basename>-640.webp / <basename>-1280.webp. sharp strips metadata by
// default, so the committed copies are EXIF-free. Existing outputs are
// skipped; delete them to regenerate.
//
// UI screenshots go in assets-src/screenshots/<project-slug>/, one folder per
// project, and are rendered at 1280w and 1920w: 640 is useless for reading
// interface detail, and a screenshot shown at the full measure needs the 2x
// variant to stay crisp.
//
// The folder structure is mirrored into public/images/, so
//
//   assets-src/screenshots/pantry-ai/wall.png
//     -> public/images/pantry-ai/wall-1280.webp
//     -> public/images/pantry-ai/wall-1920.webp
//     -> <ScreenshotFigure src="pantry-ai/wall" />
//
// Keeping the project folder means two projects can both have a "wall.png"
// without colliding, and public/images/ stays navigable as the count grows.
// Use the project's slug as the folder name so the mapping needs no lookup.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = "assets-src";
const SHOTS = path.join(SRC, "screenshots");
const OUT = path.join("public", "images");
const PHOTO_WIDTHS = [640, 1280];
const SCREENSHOT_WIDTHS = [1280, 1920];
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

if (!fs.existsSync(SRC)) {
  console.log(`No ${SRC}/ directory — nothing to do.`);
  process.exit(0);
}
fs.mkdirSync(OUT, { recursive: true });

let made = 0;

const posix = (p) => p.split(path.sep).join("/");

/** Render every image directly inside `dir` into `OUT/subdir`. */
function render(dir, widths, subdir = "") {
  if (!fs.existsSync(dir)) return;
  const outDir = subdir ? path.join(OUT, subdir) : OUT;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) continue;
    const ext = path.extname(file).toLowerCase();
    if (!EXTS.has(ext)) continue;
    const base = path.basename(file, path.extname(file));
    fs.mkdirSync(outDir, { recursive: true });
    for (const w of widths) {
      const out = path.join(outDir, `${base}-${w}.webp`);
      if (fs.existsSync(out)) {
        console.log(`skip   ${out} (exists)`);
        continue;
      }
      // sharp-cli reads --input as a glob, where a backslash is an escape
      // character, so Windows separators silently match nothing ("No input
      // files"). Hand it POSIX separators on every platform.
      execFileSync(
        "npx",
        [
          "--yes",
          "sharp-cli",
          "--input",
          posix(full),
          "--output",
          posix(out),
          "resize",
          String(w),
        ],
        { stdio: "inherit", shell: process.platform === "win32" },
      );
      made++;
    }
  }
}

render(SRC, PHOTO_WIDTHS);

// One folder per project under screenshots/, mirrored into public/images/.
// Loose files sitting directly in screenshots/ still render to the root, so
// nothing that predates the per-project layout breaks.
render(SHOTS, SCREENSHOT_WIDTHS);
if (fs.existsSync(SHOTS)) {
  for (const entry of fs.readdirSync(SHOTS)) {
    const full = path.join(SHOTS, entry);
    if (!fs.statSync(full).isDirectory()) continue;
    render(full, SCREENSHOT_WIDTHS, entry);
  }
}

console.log(made ? `done — ${made} file(s) written.` : "done — nothing new.");
