import { ImageResponse } from "next/og";

// Build-time OG card (prerendered to a static PNG for the static export).
// Site-wide default; applies to every page that doesn't define its own.

// Required for image routes under `output: export` — prerender to a file.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Rupak Dey — applied ML research and software engineering";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fbfaf7",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 90,
            height: 6,
            background: "#b4552d",
            borderRadius: 3,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 92,
            fontWeight: 600,
            color: "#1a1815",
            letterSpacing: "-0.02em",
          }}
        >
          Rupak Dey
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#6b6660",
            marginTop: 24,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Applied machine learning research · research-data software engineering
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
          color: "#918b83",
        }}
      >
        <span>NMSU KDD Lab · NASA Planetary Data System</span>
        <span style={{ color: "#b4552d" }}>rupakdey.com</span>
      </div>
    </div>,
    { ...size },
  );
}
