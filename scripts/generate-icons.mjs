// Renders the "R" monogram (brand serif on terracotta) to the PNG icon set:
//   public/icons/icon-192.png, public/icons/icon-512.png  (web app manifest)
//   src/app/apple-icon.png                                 (apple-touch-icon)
// Uses next/og's ImageResponse (satori) because it renders text with real
// fonts; sharp's SVG rasterizer drops <text> on this platform.
// PNGs are full-bleed squares: Apple and maskable contexts apply their own
// rounding; the in-tab favicon stays icon.svg.
//
// Run: npm run icons  (needs network once, for the Newsreader font)

import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og.js";

const ACCENT = "#b4552d";
const PAPER = "#fbfaf7";

async function loadGoogleFont(family, text) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  );
  if (!resource) throw new Error(`font fetch failed for ${family}`);
  const res = await fetch(resource[1]);
  if (!res.ok) throw new Error(`font download failed for ${family}`);
  return res.arrayBuffer();
}

function monogram(size) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ACCENT,
        color: PAPER,
        fontFamily: "Newsreader",
        fontWeight: 600,
        fontSize: size * 0.62,
        // Optical centering: serif caps sit a touch low in the em box.
        paddingBottom: size * 0.02,
      },
      children: "R",
    },
  };
}

async function render(font, size, outFile) {
  const image = new ImageResponse(monogram(size), {
    width: size,
    height: size,
    fonts: [{ name: "Newsreader", data: font, style: "normal", weight: 600 }],
  });
  const buf = Buffer.from(await image.arrayBuffer());
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, buf);
  console.log(`wrote ${outFile} (${buf.length} bytes)`);
}

const font = await loadGoogleFont("Newsreader:wght@600", "R");
await render(font, 192, "public/icons/icon-192.png");
await render(font, 512, "public/icons/icon-512.png");
await render(font, 180, "src/app/apple-icon.png");
