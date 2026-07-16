import { ImageResponse } from "next/og";

// Build-time OG card (prerendered to a static PNG for the static export).
// Site-wide default; applies to every page that doesn't define its own.
// Brand-matched: warm paper, hairline print-mat frame, Newsreader display
// name (font fetched at build time and subset to the glyphs used).

// Required for image routes under `output: export` — prerender to a file.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Rupak Dey — applied ML research and software engineering";

const NAME = "Rupak Dey";

// Fetch a TTF for the given css2 family spec, subset to `text`. Runs once at
// build time; fails the build loudly if the font can't be resolved.
async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  );
  if (!resource) throw new Error(`OG font fetch failed for ${family}`);
  const res = await fetch(resource[1]);
  if (!res.ok) throw new Error(`OG font download failed for ${family}`);
  return res.arrayBuffer();
}

export default async function OgImage() {
  const newsreader = await loadGoogleFont("Newsreader:wght@500", NAME);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#fbfaf7",
        padding: "44px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Print-mat frame — the site's editorial print motif. */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #cfc9bd",
          borderRadius: 4,
          background: "#ffffff",
          padding: "64px 72px",
          boxShadow: "0 16px 40px -24px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 90,
              height: 6,
              background: "#b4552d",
              borderRadius: 3,
              marginBottom: 36,
            }}
          />
          <div
            style={{
              fontSize: 96,
              fontFamily: "Newsreader",
              fontWeight: 500,
              color: "#1a1815",
              letterSpacing: "-0.02em",
            }}
          >
            {NAME}
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#6b6660",
              marginTop: 24,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            Applied machine learning research · research-data software
            engineering
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: "1px solid #e2ddd3",
            paddingTop: 28,
            fontSize: 27,
            color: "#767065",
          }}
        >
          <span>NMSU KDD Lab · NASA Planetary Data System</span>
          <span style={{ color: "#b4552d", fontWeight: 600 }}>
            rupakdey.com
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: newsreader,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
