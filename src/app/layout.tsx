import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
  // true display cut — font-optical-sizing is auto by default.
  axes: ["opsz"],
});

const SITE_URL = "https://rupakdey.com";
const DESCRIPTION =
  "Rupak Dey — applied machine learning research (NMSU KDD Lab) and research-data software engineering (NASA Planetary Data System).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rupak Dey",
    template: "%s · Rupak Dey",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Rupak Dey",
    url: SITE_URL,
    title: "Rupak Dey",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rupak Dey",
    description: DESCRIPTION,
  },
};

// Runs before first paint: applies the saved theme so there is no flash of the
// wrong theme on reload. When no preference is saved, CSS prefers-color-scheme
// handles it. Kept tiny and inlined into <head>.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

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
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-sm bg-accent px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
