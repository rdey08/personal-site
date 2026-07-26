import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  // Ship the optical-size axis so display sizes (hero, titles) render the
  // true display cut; font-optical-sizing is auto by default.
  axes: ["opsz"],
});

// Browser-chrome color follows the active scheme (paper light / paper dark).
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#131210" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rupak Dey · Researcher & Engineer",
    template: "%s · Rupak Dey",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Rupak Dey", url: SITE_URL }],
  creator: "Rupak Dey",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Rupak Dey · News" }],
    },
  },
  openGraph: {
    type: "website",
    siteName: "Rupak Dey",
    url: SITE_URL,
    title: "Rupak Dey · Researcher & Engineer",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rupak Dey · Researcher & Engineer",
    description: SITE_DESCRIPTION,
  },
};

// Runs before first paint: applies the theme so there is no flash of the wrong
// one on reload. Mirrors readMode + resolveMode in src/lib/theme.ts (an inline
// script cannot import), including the default "auto" mode: an explicit OS dark
// preference wins, otherwise the device clock decides (dark 18:00-06:00). When
// JS is off, data-theme stays unset and CSS prefers-color-scheme takes over.
const themeScript = `(function(){try{var m=localStorage.getItem('theme');if(m!=='light'&&m!=='dark'){m='auto';}var r=m;if(m==='auto'){var h=new Date().getHours();var night=h<6||h>=18;var osDark=matchMedia('(prefers-color-scheme: dark)').matches;r=(osDark||night)?'dark':'light';}var d=document.documentElement;d.setAttribute('data-theme',r);d.setAttribute('data-theme-mode',m);}catch(e){}})();`;

// First-visit intro veil (home page, once per session). Armed before first
// paint so the plain paper cover (globals.css, html.intro-veil::before) hides
// the page from the very first frame; it fades itself away after 3s as a
// failsafe if the JS bundle never arrives. Once hydrated, SiteAnimations
// (reading __introVeilAt) swaps the cover for the staged intro: name rises,
// accent stroke draws, paper slats lift. No-JS visitors never run this,
// reduced motion skips it, and a throwing sessionStorage (private modes)
// skips it rather than replay every load.
const introScript = `(function(){try{if(location.pathname!=='/'||sessionStorage.getItem('intro-veil')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;sessionStorage.setItem('intro-veil','1');document.documentElement.classList.add('intro-veil');window.__introVeilAt=Date.now();}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      {/* suppressHydrationWarning: extensions (Grammarly et al.) inject
          attributes onto <body> before hydration; one-element-deep suppress
          keeps that dev noise out without hiding child mismatches. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only rounded-sm bg-accent px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <Header />
        <SiteAnimations />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
