import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rupak Dey",
    short_name: "Rupak Dey",
    description:
      "Rupak Dey: applied machine learning research (NMSU KDD Lab) and research-data software engineering (NASA Planetary Data System).",
    start_url: "/",
    display: "browser",
    background_color: "#fbfaf7",
    theme_color: "#b4552d",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
